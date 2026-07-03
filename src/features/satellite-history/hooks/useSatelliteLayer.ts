import { useEffect, useRef } from 'react';
import type maplibregl from 'maplibre-gl';

const SOURCE_ID = 'gee-satellite-source';
const LAYER_ID = 'gee-satellite-layer';

interface UseSatelliteLayerOptions {
  map: maplibregl.Map | null;
  tileUrl: string;
  maxzoom?: number;
  tileSize?: number;
}

/**
 * Manages the GEE historical raster layer on a MapLibre GL map.
 *
 * - On first call with a tileUrl: adds source + layer below the labels.
 * - On tileUrl change: removes old, creates new for a clean swap.
 * - On unmount: removes source + layer.
 */
export function useSatelliteLayer({
  map,
  tileUrl,
  maxzoom = 18,
  tileSize = 256,
}: UseSatelliteLayerOptions): void {
  const renderedUrlRef = useRef<string | null>(null);
  const layerIdsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!map || !tileUrl) return;

    const applyLayer = () => {
      // Skip if already rendered this exact URL
      if (renderedUrlRef.current === tileUrl) return;

      const uniqueId = Date.now().toString();
      const currentSourceId = `${SOURCE_ID}-${uniqueId}`;
      const currentLayerId = `${LAYER_ID}-${uniqueId}`;

      // Add fresh raster source
      map.addSource(currentSourceId, {
        type: 'raster',
        tiles: [tileUrl],
        tileSize,
        maxzoom,
        attribution: '© Google Earth Engine',
      });

      // Add raster layer below labels, with a fade transition
      map.addLayer(
        {
          id: currentLayerId,
          type: 'raster',
          source: currentSourceId,
          minzoom: 0,
          maxzoom: 22,
          paint: {
            'raster-opacity': 0,
            'raster-opacity-transition': { duration: 600, delay: 0 }
          },
        },
        getFirstLabelLayerId(map)
      );

      // Trigger fade in on the next frame
      requestAnimationFrame(() => {
        if (map.getLayer(currentLayerId)) {
          map.setPaintProperty(currentLayerId, 'raster-opacity', 1);
        }
      });

      // Keep track of the new layer
      const previousLayers = [...layerIdsRef.current];
      layerIdsRef.current = [currentLayerId];
      renderedUrlRef.current = tileUrl;

      // Clean up previous layers after the crossfade completes (e.g. 1000ms)
      setTimeout(() => {
        previousLayers.forEach((id) => {
          try {
            if (map.getLayer(id)) map.removeLayer(id);
            const srcId = id.replace(LAYER_ID, SOURCE_ID);
            if (map.getSource(srcId)) map.removeSource(srcId);
          } catch {
            // Silently ignore
          }
        });
      }, 1000);
    };

    if (map.loaded()) {
      applyLayer();
    } else {
      map.once('load', applyLayer);
    }

    return () => {
      map.off('load', applyLayer);
    };
  }, [map, tileUrl, maxzoom, tileSize]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!map) return;
      layerIdsRef.current.forEach((id) => {
        try {
          if (map.getLayer(id)) map.removeLayer(id);
          const srcId = id.replace(LAYER_ID, SOURCE_ID);
          if (map.getSource(srcId)) map.removeSource(srcId);
        } catch {
          /* ignore */
        }
      });
    };
  }, [map]);
}

/**
 * Returns the ID of the first label layer so we can insert imagery below it.
 */
function getFirstLabelLayerId(map: maplibregl.Map): string | undefined {
  const layers = map.getStyle()?.layers ?? [];

  // Our Google labels layer
  if (layers.find((l) => l.id === 'google-labels')) return 'google-labels';

  // Fallback: first symbol layer
  for (const layer of layers) {
    if (layer.type === 'symbol') return layer.id;
  }

  return undefined;
}
