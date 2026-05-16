import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import pako from "pako";
import { Buffer } from "buffer";
import { Maximize2 } from "lucide-react";
import StateDetailMap from "../components/StateDetailMap";
import { useGetCountryByIdQuery, useGetStatesByCountryIdQuery } from "../api/regionSelectionApi";

// Helper to calculate bounds for a GeoJSON feature
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

  extendBounds(geometry.coordinates);
  return bounds;
};

const RegionSelection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [isZoomed, setIsZooming] = useState(false);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(0); // Counter to trigger data re-application

  const { data: countryData } = useGetCountryByIdQuery({ country_id: 1 });
  const { data: statesData } = useGetStatesByCountryIdQuery({ country_id: 1 });


  useEffect(() => {
    if (map.current && statesData) {
      try {
        let finalData = null;

        // 1. Check if the root object is the FeatureCollection
        if (statesData.type === "FeatureCollection") {
          finalData = statesData;
        }
        // 2. Check if it's wrapped in a .data property
        else if (statesData.data?.type === "FeatureCollection") {
          finalData = statesData.data;
        }
        // 3. Fallback: Check if it's a compressed string
        else if (typeof statesData.data === "string") {
          const binaryData = Buffer.from(statesData.data, "base64");
          const decompressedData = pako.ungzip(binaryData);
          const decompressedString = new TextDecoder().decode(decompressedData);
          finalData = JSON.parse(decompressedString);
        } else if (statesData.data?.geo_json_data) {
          const rawData = statesData.data.geo_json_data;
          const binaryData = Buffer.from(rawData, "base64");
          const decompressedData = pako.ungzip(binaryData);
          const decompressedString = new TextDecoder().decode(decompressedData);
          finalData = JSON.parse(decompressedString);
        } else if (statesData.data) {
          finalData = statesData.data;
        }

        const source = map.current.getSource("india-states") as maplibregl.GeoJSONSource;
        if (source && finalData) {
          source.setData(finalData);
          console.log("🏙️ States Source Updated:", finalData);
        }
      } catch (err) {
        console.error("Error updating map with states data:", err);
      }
    }
  }, [statesData, mapLoaded]);

  const resetView = () => {
    map.current?.flyTo({
      center: [78.9629, 20.5937],
      zoom: 3.5,
      duration: 1500,
      essential: true,
    });
    setIsZooming(false);
  };

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
                "background-color": "#D6E6FF",
              },
            },
          ],
        },
        center: [78.9629, 20.5937],
        zoom: 2,
      });

      map.current = mapInstance;

      map.current.addControl(new maplibregl.NavigationControl(), "top-right");

      map.current.on("style.load", () => {
        // @ts-ignore
        map.current?.setProjection({ type: "globe" });

        map.current?.addSource("world-land", {
          type: "geojson",
          data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson",
        });

        map.current?.addLayer({
          id: "world-land-fill",
          type: "fill",
          source: "world-land",
          paint: {
            "fill-color": "#F0EEF0",
            "fill-opacity": 1,
          },
        });

        const indiaSourceId = "india-border";
        if (!map.current?.getSource(indiaSourceId)) {
          map.current?.addSource(indiaSourceId, {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] },
          });

          // Layer 1: Base India Fill
          map.current?.addLayer({
            id: "india-fill",
            type: "fill",
            source: indiaSourceId,
            paint: {
              "fill-color": "#F0EEF0",
              "fill-opacity": 1,
            },
          });

          // Layer 2: Internal State Borders (Middle)
          const statesSourceId = "india-states";
          map.current?.addSource(statesSourceId, {
            type: "geojson",
            data: { type: "FeatureCollection", features: [] },
          });

          map.current?.addLayer({
            id: "states-border-line",
            type: "line",
            source: statesSourceId,
            paint: {
              "line-color": "#475569", // Darker Slate-600 for prominent state lines
              "line-width": 1.5,
            },
          });

          // Layer 3: Main Country Outer Border (Top)
          map.current?.addLayer({
            id: "india-border-line",
            type: "line",
            source: indiaSourceId,
            paint: {
              "line-color": "#94a3b8", // Lighter Slate-400 for outer boundary
              "line-width": 1.2,
              "line-opacity": 1,
            },
          });

          // Updated Click Handler: Set selected state for separate view
          map.current?.on("click", "india-fill", (e) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              // Store only the serializable parts of the feature
              setSelectedState({
                type: "Feature",
                geometry: feature.geometry,
                properties: feature.properties,
              });
            }
          });

          map.current?.on("mouseenter", "india-fill", () => {
            if (map.current) map.current.getCanvas().style.cursor = "pointer";
          });

          map.current?.on("mouseleave", "india-fill", () => {
            if (map.current) map.current.getCanvas().style.cursor = "";
          });
        }

        map.current?.resize();

        // Signal that map is ready for data
        setMapLoaded((prev) => prev + 1);

        map.current?.flyTo({
          center: [78.9629, 20.5937],
          zoom: 3.5,
          duration: 3000,
          essential: true,
        });

        // Ensure map fills container correctly after mount
        setTimeout(() => {
          map.current?.resize();
        }, 100);
      });
    } catch (err) {
      console.error("Failed to initialize map:", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [selectedState]);

  useEffect(() => {
    if (map.current && countryData) {
      try {
        let finalData = null;

        // 1. Check if the root object is the FeatureCollection (matches screenshot)
        if (countryData.type === "FeatureCollection") {
          finalData = countryData;
        }
        // 2. Check if it's wrapped in a .data property
        else if (countryData.data?.type === "FeatureCollection") {
          finalData = countryData.data;
        }
        // 3. Fallback: Check if it's a compressed string (like other master APIs)
        else if (typeof countryData.data === "string") {
          const binaryData = Buffer.from(countryData.data, "base64");
          const decompressedData = pako.ungzip(binaryData);
          const decompressedString = new TextDecoder().decode(decompressedData);
          finalData = JSON.parse(decompressedString);
        } else if (countryData.data?.geo_json_data) {
          const rawData = countryData.data.geo_json_data;
          const binaryData = Buffer.from(rawData, "base64");
          const decompressedData = pako.ungzip(binaryData);
          const decompressedString = new TextDecoder().decode(decompressedData);
          finalData = JSON.parse(decompressedString);
        } else if (countryData.data) {
          finalData = countryData.data;
        }

        const source = map.current.getSource("india-border") as maplibregl.GeoJSONSource;
        if (source && finalData) {
          source.setData(finalData);
          console.log("🗺️ Map Source Updated with API Data:", finalData);
        }
      } catch (err) {
        console.error("Error updating map data from API:", err);
      }
    }
  }, [countryData, mapLoaded]);

  if (selectedState) {
    return (
      <StateDetailMap
        feature={selectedState}
        onBack={() => setSelectedState(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full p-8 gap-6 overflow-hidden bg-slate-50/50">
      <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-(--border) shadow-sm bg-slate-100">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

        {/* Simple UI Overlays */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-4 pointer-events-none">
          {/* <div className="bg-white/80 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/50 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 pointer-events-auto">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">Region Selector</span>
            <p className="text-base font-black text-slate-800 tracking-tight">India Interactive Map</p>
          </div> */}

          {isZoomed && (
            <button
              onClick={resetView}
              className="bg-slate-900/90 backdrop-blur-xl px-4 py-2 rounded-xl border border-slate-700 shadow-2xl flex items-center gap-2 text-white hover:bg-slate-800 transition-all active:scale-95 pointer-events-auto w-fit"
            >
              <Maximize2 className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Reset View
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionSelection;
