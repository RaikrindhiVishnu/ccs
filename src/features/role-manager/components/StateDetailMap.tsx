import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";
import pako from "pako";
import { Buffer } from "buffer";
import { useCreateRegionMutation } from "../api/regionSelectionApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface StateDetailMapProps {
  feature: any;
  onBack: () => void;
}

const getFeatureBounds = (feature: any): maplibregl.LngLatBoundsLike => {
  const bounds = new maplibregl.LngLatBounds();
  const geometry = feature.geometry;

  const extendBounds = (coords: any[]) => {
    coords.forEach((coord) => {
      if (Array.isArray(coord[0])) {
        extendBounds(coord);
      } else {
        bounds.extend(coord as [number, number]);
      }
    });
  };

  if (geometry.type === "Polygon") {
    extendBounds(geometry.coordinates);
  } else if (geometry.type === "MultiPolygon") {
    geometry.coordinates.forEach((polygon: any) => extendBounds(polygon));
  }

  return bounds;
};

const StateDetailMap: React.FC<StateDetailMapProps> = ({ feature, onBack }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const [selectedDistricts, setSelectedDistricts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regionName, setRegionName] = useState("");
  const [regionCode, setRegionCode] = useState("");
  console.log(feature, "insideDetails");
  const stateName = (
    feature?.properties?.STNAME ||
    feature?.properties?.name ||
    "Selected State"
  ).toUpperCase();
  const stateId = feature?.properties?.id || 1;
  const encodedStateName = encodeURIComponent(stateName);

  const [createRegion, { isLoading: isCreating }] = useCreateRegionMutation();

  // TEMPORARY: Commented out failing API
  // const { data: districtsData } = useGetDistrictsByStateIdQuery({ state_id: stateId });
  const districtsData: any = null; // Placeholder for now

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: {
          version: 8,
          sources: {},
          layers: [
            {
              id: "background",
              type: "background",
              paint: {
                "background-color": "#F8FAFC",
              },
            },
          ],
        },
        center: [78.9629, 20.5937],
        zoom: 4,
      });

      map.current = mapInstance;

      map.current.on("style.load", async () => {
        setMapReady(true);

        try {
          // Add the specific state feature passed as a prop (from your API)
          map.current?.addSource("selected-state", {
            type: "geojson",
            data: feature,
          });

          // Add fill layer
          map.current?.addLayer({
            id: "state-fill",
            type: "fill",
            source: "selected-state",
            paint: {
              "fill-color": "#3B82F6",
              "fill-opacity": 0.08,
            },
          });

          // Add border layer
          map.current?.addLayer({
            id: "state-border",
            type: "line",
            source: "selected-state",
            paint: {
              "line-color": "#2563EB",
              "line-width": 2.5,
            },
          });

          // Fit bounds to the passed feature
          const bounds = getFeatureBounds(feature);
          map.current?.fitBounds(bounds, {
            padding: 80,
            duration: 1200,
          });

          setIsLoading(false);
        } catch (error) {
          console.error("Error setting state border:", error);
          setIsLoading(false);
        }
      });
    } catch (err) {
      console.error("Failed to initialize state map:", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [feature, stateName]);

  // TEMPORARY: Fallback to GitHub for Districts while API is failing
  useEffect(() => {
    if (map.current && mapReady) {
      const fetchDistrictsFromGithub = async () => {
        try {
          const url = `https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/${encodedStateName}/${encodedStateName}_DISTRICTS.geojson`;
          const response = await fetch(url);
          if (!response.ok) throw new Error("GitHub Districts not found");
          const githubDistrictsData = await response.json();

          if (!map.current?.getSource("districts-source")) {
            map.current?.addSource("districts-source", {
              type: "geojson",
              data: githubDistrictsData,
              generateId: true, // Required for hover effects
            });

            // 1. Add Fill Layer for Interaction & Hover Effect
            map.current?.addLayer(
              {
                id: "districts-fill",
                type: "fill",
                source: "districts-source",
                paint: {
                  "fill-color": [
                    "case",
                    ["boolean", ["feature-state", "selected"], false],
                    "#3b82f6", // Selected color
                    "#3b82f6", // Normal color
                  ],
                  "fill-opacity": [
                    "case",
                    ["boolean", ["feature-state", "selected"], false],
                    0.35, // Selected opacity
                    ["boolean", ["feature-state", "hover"], false],
                    0.15, // Hover opacity
                    0, // Transparent normally
                  ],
                },
              },
              "state-border",
            );

            // 2. Add District Boundaries
            map.current?.addLayer(
              {
                id: "districts-layer",
                type: "line",
                source: "districts-source",
                paint: {
                  "line-color": "#3b82f6",
                  "line-width": 0.8,
                  "line-dasharray": [2, 1],
                  "line-opacity": 0.6,
                },
              },
              "state-border",
            );

            // 3. Interactivity Listeners
            let hoveredDistrictId: string | number | null = null;

            map.current?.on("mousemove", "districts-fill", (e) => {
              if (e.features && e.features.length > 0) {
                const newId = e.features[0].id;

                if (hoveredDistrictId !== null) {
                  map.current?.setFeatureState(
                    { source: "districts-source", id: hoveredDistrictId },
                    { hover: false },
                  );
                }

                // Fix: check for undefined/null explicitly to allow ID 0
                hoveredDistrictId =
                  newId !== undefined && newId !== null ? newId : null;

                if (hoveredDistrictId !== null) {
                  map.current?.setFeatureState(
                    { source: "districts-source", id: hoveredDistrictId },
                    { hover: true },
                  );
                }
                if (map.current)
                  map.current.getCanvas().style.cursor = "pointer";
              }
            });

            map.current?.on("mouseleave", "districts-fill", () => {
              if (hoveredDistrictId !== null) {
                map.current?.setFeatureState(
                  { source: "districts-source", id: hoveredDistrictId },
                  { hover: false },
                );
              }
              hoveredDistrictId = null;
              if (map.current) map.current.getCanvas().style.cursor = "";
            });

            map.current?.on("click", "districts-fill", (e) => {
              if (e.features && e.features.length > 0) {
                const districtFeature = e.features[0];
                const districtData = districtFeature.properties;
                const dtCode =
                  districtData.dtcode11 ||
                  districtData.dtcode ||
                  districtFeature.id;

                setSelectedDistricts((prev) => {
                  const isAlreadySelected = prev.find(
                    (d) => (d.dtcode11 || d.dtcode || d.id) === dtCode,
                  );

                  if (isAlreadySelected) {
                    // Unselect
                    map.current?.setFeatureState(
                      { source: "districts-source", id: districtFeature.id },
                      { selected: false },
                    );
                    return prev.filter(
                      (d) => (d.dtcode11 || d.dtcode || d.id) !== dtCode,
                    );
                  } else {
                    // Select
                    map.current?.setFeatureState(
                      { source: "districts-source", id: districtFeature.id },
                      { selected: true },
                    );
                    return [
                      ...prev,
                      { ...districtData, id: districtFeature.id },
                    ];
                  }
                });
              }
            });
          }
        } catch (err) {
          console.error("Fallback Districts failed:", err);
        }
      };

      fetchDistrictsFromGithub();
    }
  }, [mapReady, encodedStateName, stateName]);

  const handleCreateRegion = async () => {
    if (!regionName || !regionCode) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const districtIds = selectedDistricts.map((d) =>
        Number(d.dtcode11 || d.dtcode),
      );

      await createRegion({
        regionName,
        regionCode,
        regionalOfficerId: 1, // Hardcoded as requested
        inteligenceOfficerId: 2, // Hardcoded as requested
        district_ids: districtIds,
        stateId: Number(stateId),
      }).unwrap();

      toast.success("Region created successfully!");

      // Cleanup: Clear selection and keep on map as requested
      selectedDistricts.forEach((d) => {
        if (d.id !== undefined) {
          map.current?.setFeatureState(
            { source: "districts-source", id: d.id },
            { selected: false },
          );
        }
      });
      setSelectedDistricts([]);
      setIsModalOpen(false);
      setRegionName("");
      setRegionCode("");
    } catch (err) {
      console.error("Failed to create region:", err);
      toast.error("Failed to create region");
    }
  };

  // Handle Districts Data Rendering (Kept for when API is fixed)
  useEffect(() => {
    if (map.current && mapReady && districtsData) {
      try {
        let finalData = null;

        // 1. Map the API response structure (same as India/States)
        if (districtsData.type === "FeatureCollection") {
          finalData = districtsData;
        } else if (districtsData.data?.type === "FeatureCollection") {
          finalData = districtsData.data;
        } else if (typeof districtsData.data === "string") {
          const binaryData = Buffer.from(districtsData.data, "base64");
          const decompressedData = pako.ungzip(binaryData);
          const decompressedString = new TextDecoder().decode(decompressedData);
          finalData = JSON.parse(decompressedString);
        } else if (districtsData.data?.geo_json_data) {
          const rawData = districtsData.data.geo_json_data;
          const binaryData = Buffer.from(rawData, "base64");
          const decompressedData = pako.ungzip(binaryData);
          const decompressedString = new TextDecoder().decode(decompressedData);
          finalData = JSON.parse(decompressedString);
        } else if (districtsData.data) {
          finalData = districtsData.data;
        }

        if (finalData) {
          // Add Districts Source if not exists
          if (!map.current.getSource("districts-source")) {
            map.current.addSource("districts-source", {
              type: "geojson",
              data: finalData,
            });

            // Add internal district boundaries (rendered UNDER the main state border)
            map.current.addLayer(
              {
                id: "districts-layer",
                type: "line",
                source: "districts-source",
                paint: {
                  "line-color": "#3b82f6",
                  "line-width": 0.8,
                  "line-dasharray": [2, 1],
                  "line-opacity": 0.6,
                },
              },
              "state-border",
            ); // Insert before state-border to keep state outline on top
          } else {
            const source = map.current.getSource(
              "districts-source",
            ) as maplibregl.GeoJSONSource;
            source.setData(finalData);
          }
        }
      } catch (err) {
        console.error("Error rendering districts:", err);
      }
    }
  }, [districtsData, mapReady, stateId]);

  return (
    <div className="flex flex-col h-full p-8 gap-6 overflow-hidden bg-slate-50/50 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm",
              "text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-95",
            )}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-semibold text-sm">Back to India Map</span>
          </button>

          <div className="h-8 w-px bg-slate-200 mx-2" />

          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">
              District View
            </span>
            <Typography
              variant="h2"
              className="text-2xl font-black text-slate-800 tracking-tight"
            >
              {stateName}
            </Typography>
          </div>
        </div>

        {selectedDistricts.length > 0 && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-2xl bg-slate-900 text-white px-6 py-6 shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <Plus className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-wider">
                Create Region
              </span>
              <span className="text-[10px] opacity-70">
                {selectedDistricts.length} Selected
              </span>
            </div>
          </Button>
        )}
      </div>

      <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl bg-white">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-slate-50/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 animate-in fade-in duration-300">
            <div className="relative">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
              <div className="absolute inset-0 w-10 h-10 border-4 border-blue-100 rounded-full" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Typography
                variant="span"
                className="text-sm font-bold text-slate-800 tracking-tight"
              >
                Fetching Boundaries
              </Typography>
              <Typography
                variant="span"
                className="text-[10px] font-medium text-slate-500 uppercase tracking-widest"
              >
                Loading detailed {stateName} shapefile
              </Typography>
            </div>
          </div>
        )}

        {/* Custom Modal Implementation */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 p-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="flex flex-col gap-1 mb-8">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">
                  New Configuration
                </span>
                <Typography
                  variant="h2"
                  className="text-2xl font-black text-slate-800 tracking-tight"
                >
                  Create New Region
                </Typography>
              </div>

              <div className="flex flex-col gap-6 mb-8">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Region Name
                  </label>
                  <Input
                    placeholder="e.g. North Coastal Region"
                    value={regionName}
                    onChange={(e) => setRegionName(e.target.value)}
                    className="rounded-2xl border-slate-200 h-14 px-5 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                    Region Code
                  </label>
                  <Input
                    placeholder="e.g. NCR-001"
                    value={regionCode}
                    onChange={(e) => setRegionCode(e.target.value)}
                    className="rounded-2xl border-slate-200 h-14 px-5 focus:ring-blue-500"
                  />
                </div>

                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                    Selected Districts
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedDistricts.map((d, i) => (
                      <div
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-[10px] font-bold shadow-sm"
                      >
                        {d.dtname || d.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                disabled={isCreating}
                onClick={handleCreateRegion}
                className="w-full rounded-2xl bg-slate-900 py-7 text-white font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all active:scale-95 shadow-xl"
              >
                {isCreating && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
                Confirm & Create Region
              </Button>
            </div>
          </div>
        )}

        {/* Detail Overlay */}
        {!isLoading && (
          <div className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl max-w-xs animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-black text-slate-800 leading-tight">
                {stateName}
              </h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateDetailMap;
