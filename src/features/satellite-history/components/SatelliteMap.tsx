import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useSatelliteLayer } from '../hooks/useSatelliteLayer';

interface SatelliteMapProps {
  tileUrl: string;
  coords: { lat: number; lon: number } | null;
  maxzoom?: number;
  interactive?: boolean;
  polygon?: any;
  label?: string; // Text to display in the center of the polygon
}

export interface SatelliteMapHandle {
  flyTo: (lat: number, lon: number, bbox?: [string, string, string, string]) => void;
  recenterPolygon: () => void;
}

// Google Satellite base style — fast, high-quality, no ArcGIS
const GOOGLE_SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'google-satellite': {
      type: 'raster',
      tiles: [
        'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      ],
      tileSize: 256,
      maxzoom: 20,
      attribution: '© Google',
    },
    'google-labels': {
      type: 'raster',
      tiles: [
        'https://mt0.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
        'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}',
      ],
      tileSize: 256,
      maxzoom: 20,
      attribution: '© Google',
    },
  },
  layers: [
    {
      id: 'google-satellite',
      type: 'raster',
      source: 'google-satellite',
    },
    {
      id: 'google-labels',
      type: 'raster',
      source: 'google-labels',
    },
  ],
};

export const SatelliteMap = forwardRef<SatelliteMapHandle, SatelliteMapProps>(
  ({ tileUrl, coords, interactive = true, polygon, label }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markerRef = useRef<maplibregl.Marker | null>(null);
    const recenterPolygonRef = useRef<(() => void) | null>(null);

    // Initialise map
    useEffect(() => {
      if (!containerRef.current || mapRef.current) return;

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: GOOGLE_SATELLITE_STYLE,
        center: coords ? [coords.lon, coords.lat] : [78.9629, 20.5937],
        zoom: coords ? 14 : 5,
        attributionControl: false,
        interactive: interactive,
      });

      if (interactive) {
        map.addControl(new maplibregl.NavigationControl(), 'top-right');
      }
      map.addControl(
        new maplibregl.AttributionControl({ compact: true }),
        'bottom-right'
      );

      if (coords) {
        markerRef.current = new maplibregl.Marker({ color: '#60a5fa' })
          .setLngLat([coords.lon, coords.lat])
          .addTo(map);
      }

      mapRef.current = map;

      // Keep ResizeObserver for window resizing and layout changes
      const resizeObserver = new ResizeObserver(() => {
        if (mapRef.current) {
          mapRef.current.resize();
        }
      });
      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
        map.remove();
        mapRef.current = null;
      };
    }, [interactive]);

    // Expose flyTo for parent
    useImperativeHandle(ref, () => ({
      flyTo(lat: number, lon: number, bbox?: [string, string, string, string]) {
        const map = mapRef.current;
        if (!map) return;

        if (bbox) {
          const [minLat, maxLat, minLon, maxLon] = bbox.map(Number);
          map.fitBounds(
            [
              [minLon, minLat],
              [maxLon, maxLat],
            ],
            { padding: 60, duration: 1500, maxZoom: 12 }
          );
        } else {
          map.flyTo({ center: [lon, lat], zoom: 11, duration: 1500 });
        }

        // Update/place marker
        if (markerRef.current) {
          markerRef.current.setLngLat([lon, lat]);
        } else {
          markerRef.current = new maplibregl.Marker({ color: '#60a5fa' })
            .setLngLat([lon, lat])
            .addTo(map);
        }
      },
      recenterPolygon() {
        if (recenterPolygonRef.current) {
          recenterPolygonRef.current();
        }
      }
    }));

    // Fly to new coords when they change
    useEffect(() => {
      if (!coords || !mapRef.current) return;
      const map = mapRef.current;
      const currentCenter = map.getCenter();

      // Only animate if the coordinates actually changed
      if (Math.abs(currentCenter.lat - coords.lat) > 0.0001 || Math.abs(currentCenter.lng - coords.lon) > 0.0001) {
        map.flyTo({ center: [coords.lon, coords.lat], zoom: 14, duration: 1500 });
      }
    }, [coords?.lat, coords?.lon]);

    // Update polygon if it changes or when map style loads
    useEffect(() => {
      const map = mapRef.current;
      if (!map || !polygon) return;

      // Ensure polygon is an object in case it was returned as a JSON string from backend
      let polyObj = polygon;
      if (typeof polygon === 'string') {
        try {
          polyObj = JSON.parse(polygon);
        } catch (e) {
          console.error("Failed to parse polygon string:", e);
          return;
        }
      }

      const renderPolygon = () => {
        const source = map.getSource('polygon-source') as maplibregl.GeoJSONSource;

        // Handle both raw Geometry and Feature objects
        const geom = polyObj.type === 'Feature' ? polyObj.geometry : polyObj;

        // Extract vertices to draw dots at the edges
        let vertexCoords: any[] = [];
        if (geom && geom.coordinates) {
          if (geom.type === 'Polygon' && geom.coordinates.length > 0) {
            // Remove the last coordinate if it's identical to the first (closed ring)
            // to avoid rendering two overlapping dots at the start/end point.
            const ring = geom.coordinates[0];
            vertexCoords = [...ring];
            if (vertexCoords.length > 1 &&
              vertexCoords[0][0] === vertexCoords[vertexCoords.length - 1][0] &&
              vertexCoords[0][1] === vertexCoords[vertexCoords.length - 1][1]) {
              vertexCoords.pop();
            }
          } else if (geom.type === 'MultiPolygon' && geom.coordinates.length > 0 && geom.coordinates[0].length > 0) {
            vertexCoords = [...geom.coordinates[0][0]];
            if (vertexCoords.length > 1 &&
              vertexCoords[0][0] === vertexCoords[vertexCoords.length - 1][0] &&
              vertexCoords[0][1] === vertexCoords[vertexCoords.length - 1][1]) {
              vertexCoords.pop();
            }
          }
        }

        const geojsonData: any = {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                label: label || ''
              },
              geometry: geom
            },
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'MultiPoint',
                coordinates: vertexCoords
              }
            }
          ]
        };

        if (source) {
          source.setData(geojsonData);
        } else if (map.isStyleLoaded()) {
          map.addSource('polygon-source', {
            type: 'geojson',
            data: geojsonData
          });
          map.addLayer({
            id: 'polygon-fill',
            type: 'fill',
            source: 'polygon-source',
            filter: ['==', '$type', 'Polygon'], // Only fill the polygon
            paint: {
              'fill-color': '#16a34a', // Solid green
              'fill-opacity': 0.4
            }
          });
          map.addLayer({
            id: 'polygon-outline',
            type: 'line',
            source: 'polygon-source',
            filter: ['==', '$type', 'Polygon'], // Only outline the polygon
            paint: {
              'line-color': '#ffffff', // Solid white
              'line-width': 2.5,
              'line-dasharray': [2, 2] // Dotted boundary
            }
          });
          map.addLayer({
            id: 'polygon-vertices',
            type: 'circle',
            source: 'polygon-source',
            filter: ['==', '$type', 'Point'], // MapLibre treats MultiPoint features as Point in filters
            paint: {
              'circle-radius': 5,
              'circle-color': '#ffffff' // Solid white dots
            }
          });
          map.addLayer({
            id: 'polygon-label',
            type: 'symbol',
            source: 'polygon-source',
            filter: ['==', '$type', 'Polygon'], // Attach to the polygon centroid
            layout: {
              'text-field': ['get', 'label'],
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
              'text-size': 14,
              'text-anchor': 'center'
            },
            paint: {
              'text-color': '#ffffff',
              'text-halo-color': 'rgba(0, 0, 0, 0.4)',
              'text-halo-width': 2
            }
          });
        }

        // Auto-fit to polygon bounds with padding for the right panel
        if (geom && geom.coordinates && geom.coordinates[0] && geom.coordinates[0].length > 0) {
          const coords = geom.coordinates[0];
          const bounds = new maplibregl.LngLatBounds(coords[0], coords[0]);
          for (const coord of coords) {
            bounds.extend(coord);
          }

          // Calculate safe padding to prevent MapLibre from throwing if padding > canvas width
          const mapWidth = map.getContainer().clientWidth;
          const mapHeight = map.getContainer().clientHeight;
          
          const safeRightPadding = Math.max(0, Math.min(500, mapWidth - 150));
          const safeLeftPadding = Math.max(0, Math.min(60, mapWidth / 2 - 20));
          const safeTopPadding = Math.max(0, Math.min(60, mapHeight / 2 - 20));
          const safeBottomPadding = Math.max(0, Math.min(60, mapHeight / 2 - 20));

          const fit = () => {
            try {
              map.fitBounds(bounds, {
                padding: { top: safeTopPadding, bottom: safeBottomPadding, left: safeLeftPadding, right: safeRightPadding },
                duration: 1500
              });
            } catch (e) {
              console.warn("fitBounds failed, possibly due to container size:", e);
              // Fallback to flyTo center if fitBounds fails
              map.flyTo({ center: bounds.getCenter(), zoom: 15 });
            }
          };

          fit();
          recenterPolygonRef.current = fit;
        }
      };

      if (map.loaded()) {
        renderPolygon();
      } else {
        map.once('load', renderPolygon);
      }

      return () => {
        map.off('load', renderPolygon);
      };
    }, [polygon]);

    // Satellite raster layer management
    useSatelliteLayer({ map: mapRef.current, tileUrl });

    return (
      <div className="satellite-map-container relative">
        <div ref={containerRef} className="satellite-map-canvas" />

        {!polygon && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="bg-[#131600]/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
              <span className="text-white/90 font-['Plus_Jakarta_Sans'] font-medium text-sm">
                No historical boundary available for this period
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

SatelliteMap.displayName = 'SatelliteMap';
