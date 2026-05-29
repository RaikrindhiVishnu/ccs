import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/BackButton";
import { toast } from "sonner";
import {
  useAssignOfficersMutation,
  useGetAllGeoJsonDataQuery,
} from "../api/regionSelectionApi";
import {
  useGetAllRegionalOfficersMutation,
  useGetAllIntelligenceOfficersMutation,
} from "../api/roleManagerApi";

// Helper to calculate bounds of geometry
const getFeatureBounds = (features: any[]): maplibregl.LngLatBoundsLike => {
  const bounds = new maplibregl.LngLatBounds();
  
  const extendBounds = (coords: any[]) => {
    coords.forEach((coord) => {
      if (Array.isArray(coord[0])) {
        extendBounds(coord);
      } else {
        bounds.extend(coord as [number, number]);
      }
    });
  };

  features.forEach((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return;
    if (geometry.type === "GeometryCollection") {
      (geometry.geometries as any[]).forEach((g: any) => {
        if (g?.coordinates) extendBounds(g.coordinates);
      });
    } else if (geometry.coordinates) {
      extendBounds(geometry.coordinates);
    }
  });

  return bounds;
};

const AssignOfficers: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // Retrieve state passed from the Success Card
  const regionState = useMemo(() => {
    const defaultData = {
      regionId: 1,
      regionName: "Godavari",
      assignedId: "GLC R00012",
      createdDate: new Date().toLocaleDateString(),
      createdTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      selectedDistricts: [] as any[],
      stateId: 1,
    };
    return {
      ...defaultData,
      ...(location.state || {}),
    };
  }, [location.state]);

  const [regionalOfficers, setRegionalOfficers] = useState<any[]>([]);
  const [intelligenceOfficers, setIntelligenceOfficers] = useState<any[]>([]);
  const [selectedRegionalOfficerId, setSelectedRegionalOfficerId] = useState<number | null>(null);
  const [selectedIntelligenceOfficerId, setSelectedIntelligenceOfficerId] = useState<number | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Mutation and Query Hooks
  const [assignOfficers, { isLoading: isAssigning }] = useAssignOfficersMutation();
  const [getAllRegionalOfficers, { isLoading: loadingReg }] = useGetAllRegionalOfficersMutation();
  const [getAllIntelligenceOfficers, { isLoading: loadingIntel }] = useGetAllIntelligenceOfficersMutation();
  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();

  const [geoMasterData, setGeoMasterData] = useState<any | null>(null);

  // Fetch Officers list on mount
  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        const regionalResult = await getAllRegionalOfficers().unwrap();
        const regionalList = Array.isArray(regionalResult?.data)
          ? regionalResult.data
          : Array.isArray(regionalResult)
          ? regionalResult
          : [];
        setRegionalOfficers(regionalList);
      } catch (err) {
        console.error("Failed to load regional officers:", err);
      }

      try {
        const intelligenceResult = await getAllIntelligenceOfficers().unwrap();
        const intelligenceList = Array.isArray(intelligenceResult?.data)
          ? intelligenceResult.data
          : Array.isArray(intelligenceResult)
          ? intelligenceResult
          : [];
        setIntelligenceOfficers(intelligenceList);
      } catch (err) {
        console.error("Failed to load intelligence officers:", err);
      }
    };

    fetchOfficers();
  }, [getAllRegionalOfficers, getAllIntelligenceOfficers]);

  // Fetch Full GeoJSON master data to resolve geometry outlines
  useEffect(() => {
    if (!allGeoJsonData?.success || !allGeoJsonData?.data) return;

    const fetchGeoData = async () => {
      try {
        const response = await fetch(allGeoJsonData.data);
        if (response.ok) {
          const parsed = await response.json();
          setGeoMasterData(parsed);
        }
      } catch (err) {
        console.error("Failed to fetch Master GeoJSON data:", err);
      }
    };
    fetchGeoData();
  }, [allGeoJsonData]);

  // Construct FeatureCollection of the region's districts to draw on the mini-map
  const regionGeoJSON = useMemo(() => {
    if (!geoMasterData) return { type: "FeatureCollection", features: [] } as any;

    const selectedIds = new Set(
      regionState.selectedDistricts.map((d: any) => Number(d.id ?? d.featureId))
    );

    const matchedDistricts: any[] = [];
    geoMasterData.countries.forEach((country: any) => {
      country.states?.forEach((state: any) => {
        if (Number(state.i) === Number(regionState.stateId)) {
          state.districts?.forEach((district: any) => {
            if (selectedIds.has(Number(district.i))) {
              matchedDistricts.push({
                type: "Feature",
                id: district.i,
                geometry: district.g,
                properties: {
                  id: district.i,
                  name: district.d,
                  code: district.c,
                },
              });
            }
          });
        }
      });
    });

    return {
      type: "FeatureCollection",
      features: matchedDistricts,
    };
  }, [geoMasterData, regionState]);

  // Initialize MapLibre Mini Map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

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
      interactive: false, // Make it a clean visual display
    });

    map.current = mapInstance;

    map.current.on("style.load", () => {
      setIsMapReady(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map source & fit bounds when data is ready
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    const features = regionGeoJSON.features;
    if (features.length === 0) return;

    try {
      // Add or update districts source
      if (!map.current.getSource("selected-region-districts")) {
        map.current.addSource("selected-region-districts", {
          type: "geojson",
          data: regionGeoJSON as any,
        });

        // Fill Layer
        map.current.addLayer({
          id: "districts-fill",
          type: "fill",
          source: "selected-region-districts",
          paint: {
            "fill-color": "#3b82f6",
            "fill-opacity": 0.35,
          },
        });

        // Border Line Layer
        map.current.addLayer({
          id: "districts-border",
          type: "line",
          source: "selected-region-districts",
          paint: {
            "line-color": "#1d4ed8",
            "line-width": 1.5,
          },
        });
      } else {
        const source = map.current.getSource("selected-region-districts") as maplibregl.GeoJSONSource;
        source.setData(regionGeoJSON as any);
      }

      // Fit map view to the selected districts bounds
      const bounds = getFeatureBounds(features);
      map.current.fitBounds(bounds, {
        padding: 40,
        animate: false,
      });
    } catch (err) {
      console.error("Error setting region bounds on mini-map:", err);
    }
  }, [regionGeoJSON, isMapReady]);

  // Submit Assign Officers handler
  const handleAssign = async () => {
    if (!selectedRegionalOfficerId) {
      toast.error("Please select a Regional Officer");
      return;
    }

    try {
      await assignOfficers({
        region_id: Number(regionState.regionId),
        regionalOfficerId: Number(selectedRegionalOfficerId),
        inteligenceOfficerId: selectedIntelligenceOfficerId ? Number(selectedIntelligenceOfficerId) : undefined,
      }).unwrap();

      toast.success("Officers assigned successfully!");
      // Redirect back to Dashboard
      navigate("/role-manager/region-area-dashboard");
    } catch (err) {
      console.error("Failed to assign officers:", err);
      toast.error("Failed to assign officers. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-[#F3F4F6] font-sans p-6 sm:p-10 relative">
      {/* Back Button */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-8">
        <BackButton
          onClick={() => navigate("/role-manager/region-area-dashboard")}
          size="sm"
          label="Go back to dashboard"
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
        
        {/* Title */}
        <h1 className="text-[22px] sm:text-[28px] font-black text-slate-900 tracking-tight text-center leading-snug mb-2 font-heading">
          Assign Intelligence and Regional Officers For The Region
        </h1>

        {/* Dual Panel Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-2">
          
          {/* LEFT PANEL - Region Details Card */}
          <div className="w-full flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-md p-6 sm:p-8 justify-between">
            {/* Map Container */}
            <div className="w-full aspect-[220/190] sm:h-[260px] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative mb-6">
              <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
              {(!isMapReady || !geoMasterData) && (
                <div className="absolute inset-0 z-10 bg-slate-50 flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  <span className="text-xs font-semibold text-slate-400">Loading Map Geometry...</span>
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="w-full bg-[#F9FAFB] p-5 sm:p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Region Name
                </span>
                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                  {regionState.regionName}
                </span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Assigned ID
                </span>
                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                  {regionState.assignedId}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Created Date
                </span>
                <span className="text-sm font-extrabold text-slate-800">
                  {regionState.createdDate}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Created Time
                </span>
                <span className="text-sm font-extrabold text-slate-800 uppercase">
                  {regionState.createdTime}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Assignment Form Card (Matches border & shadows of Left card) */}
          <div className="w-full flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-md p-6 sm:p-8 justify-between relative overflow-hidden">
            
            {/* Form Fields */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                  Assign Officers
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Assign the officers for the region created
                </p>
              </div>

              <div className="h-px bg-slate-100 my-1 w-full" />

              {/* Regional Officer Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                  Enter Regional Officer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center h-12 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <select
                    value={selectedRegionalOfficerId ?? ""}
                    onChange={(e) => setSelectedRegionalOfficerId(e.target.value ? Number(e.target.value) : null)}
                    className="w-full h-full border-none outline-none bg-transparent px-4 text-slate-800 text-sm font-semibold cursor-pointer"
                  >
                    <option value="">Select Regional Officer</option>
                    {regionalOfficers.map((officer, index) => {
                      const id = officer.id ?? officer.i ?? officer.user_id;
                      const fullName = `${officer.first_name || officer.fname || ""} ${officer.last_name || officer.lname || ""}`.trim();
                      const label = fullName || officer.name || officer.d || officer.username || officer.email || `Regional Officer ${index + 1}`;
                      return (
                        <option key={id ?? index} value={id ?? index}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Intelligence Officer Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                  Enter Intelligence Officer Name <span className="text-[10px] text-slate-400 normal-case capitalize tracking-normal">(Optional)</span>
                </label>
                <div className="relative flex items-center h-12 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <select
                    value={selectedIntelligenceOfficerId ?? ""}
                    onChange={(e) => setSelectedIntelligenceOfficerId(e.target.value ? Number(e.target.value) : null)}
                    className="w-full h-full border-none outline-none bg-transparent px-4 text-slate-800 text-sm font-semibold cursor-pointer"
                  >
                    <option value="">Select Intelligence Officer</option>
                    {intelligenceOfficers.map((officer, index) => {
                      const id = officer.id ?? officer.i ?? officer.user_id;
                      const fullName = `${officer.first_name || officer.fname || ""} ${officer.last_name || officer.lname || ""}`.trim();
                      const label = fullName || officer.name || officer.d || officer.username || officer.email || `Intelligence Officer ${index + 1}`;
                      return (
                        <option key={id ?? index} value={id ?? index}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-8 sm:mt-12 w-full">
              <Button
                variant="primary"
                onClick={handleAssign}
                loading={isAssigning}
                disabled={loadingReg || loadingIntel}
                fullWidth
              >
                Assign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignOfficers;
