import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const RegionSelection: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    try {
      console.log("Initializing MapLibre...");
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
                "background-color": "#D4E6F3" // Figma Water Color
              }
            }
          ]
        },
        center: [78.9629, 20.5937],
        zoom: 2,
      });

      map.current = mapInstance;

      map.current.addControl(new maplibregl.NavigationControl(), "top-right");

      map.current.on("style.load", () => {
        console.log("Style loaded successfully");
        
        // Enable 3D Globe Projection
        // @ts-ignore
        map.current?.setProjection({ type: "globe" });
        
        // 1. Add World Land (Background) - Using a slightly better source
        map.current?.addSource("world-land", {
          type: "geojson",
          data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson"
        });

        map.current?.addLayer({
          id: "world-land-fill",
          type: "fill",
          source: "world-land",
          paint: {
            "fill-color": "#FFFFFF",
            "fill-opacity": 1
          }
        });

        // 2. Add India GeoJSON (Detailed) - Use for both Fill and Line to ensure perfect alignment
        const indiaSourceId = "india-border";
        if (!map.current?.getSource(indiaSourceId)) {
          map.current?.addSource(indiaSourceId, {
            type: "geojson",
            data: "https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson"
          });

          // Fill India with solid white (this will sit on top of world-land and align with borders)
          map.current?.addLayer({
            id: "india-fill",
            type: "fill",
            source: indiaSourceId,
            paint: {
              "fill-color": "#FFFFFF",
              "fill-opacity": 1
            }
          });

          // Add India Borders
          map.current?.addLayer({
            id: "india-border-line",
            type: "line",
            source: indiaSourceId,
            paint: {
              "line-color": "#E1E5EF",
              "line-width": 1,
              "line-opacity": 1
            }
          });
        }

        map.current?.on("sourcedata", (e) => {
          if (e.sourceId === indiaSourceId && e.isSourceLoaded) {
            console.log("India border data loaded successfully");
          }
        });

        map.current?.resize();

        // Smoothly zoom to India as a center
        map.current?.flyTo({
          center: [78.9629, 20.5937],
          zoom: 3.5,
          duration: 3000, // 3 seconds for a smooth entry
          essential: true
        });
      });

      map.current.on("error", (e) => {
        console.error("MapLibre error:", e);
      });
    } catch (err) {
      console.error("Failed to initialize map:", err);
    }

    return () => {
      if (map.current) {
        console.log("Removing map instance");
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col h-full p-8 gap-6 overflow-hidden">
      <div className="flex-1 relative rounded-3xl overflow-hidden border border-(--border) shadow-sm bg-slate-100">
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
};

export default RegionSelection;
