import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Maximize2 } from "lucide-react";
import StateDetailMap from "../components/StateDetailMap";

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
            data: "https://raw.githubusercontent.com/datta07/INDIAN-SHAPEFILES/master/INDIA/INDIA_STATES.geojson",
          });

          map.current?.addLayer({
            id: "india-fill",
            type: "fill",
            source: indiaSourceId,
            paint: {
              "fill-color": "#F0EEF0",
              "fill-opacity": 1,
            },
          });

          map.current?.addLayer({
            id: "india-border-line",
            type: "line",
            source: indiaSourceId,
            paint: {
              "line-color": "#B7B9BF",
              "line-width": 1,
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
