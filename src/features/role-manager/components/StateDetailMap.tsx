import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const stateName = (feature?.properties?.STNAME || feature?.properties?.name || "Selected State").toUpperCase();

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    // Construct the URL for the specific state from Indian Shapefiles repo
    // Example: https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/MAHARASHTRA/MAHARASHTRA_STATE.geojson
    const encodedStateName = encodeURIComponent(stateName);
    const stateGeoJsonUrl = `https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/STATES/${encodedStateName}/${encodedStateName}_STATE.geojson`;

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
        try {
          // Fetch the high-fidelity state GeoJSON from GitHub
          const response = await fetch(stateGeoJsonUrl);
          if (!response.ok) throw new Error("Failed to fetch state GeoJSON");
          const stateGeoJson = await response.json();

          // Add the specific state feature as a source
          map.current?.addSource("selected-state", {
            type: "geojson",
            data: stateGeoJson,
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

          // Fit bounds to the detailed state GeoJSON
          const bounds = getFeatureBounds(stateGeoJson.features ? stateGeoJson.features[0] : stateGeoJson);
          map.current?.fitBounds(bounds, {
            padding: 80,
            duration: 1200,
          });

          setIsLoading(false);
        } catch (error) {
          console.error("Error loading high-fidelity GeoJSON:", error);
          setIsLoading(false);
          
          // Fallback to the passed feature if fetch fails
          if (feature) {
            map.current?.addSource("selected-state", {
              type: "geojson",
              data: feature,
            });
            map.current?.addLayer({
              id: "state-border",
              type: "line",
              source: "selected-state",
              paint: { "line-color": "#2563EB", "line-width": 2 },
            });
            const bounds = getFeatureBounds(feature);
            map.current?.fitBounds(bounds, { padding: 50 });
          }
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

  return (
    <div className="flex flex-col h-full p-8 gap-6 overflow-hidden bg-slate-50/50">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm",
            "text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-95"
          )}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Back to India Map</span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-2" />
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
              <Typography variant="span" className="text-sm font-bold text-slate-800 tracking-tight">
                Fetching Boundaries
              </Typography>
              <Typography variant="span" className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">
                Loading detailed {stateName} shapefile
              </Typography>
            </div>
          </div>
        )}

        {/* Detail Overlay */}
        {!isLoading && (
          <div className="absolute top-8 left-8 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl max-w-xs animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-black text-slate-800 leading-tight">{stateName}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateDetailMap;
