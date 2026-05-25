import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { decompressGeoJSON } from "../utils/utils";
import { getRegionColors } from "../utils/colorPalette";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  useGetAllGeoJsonDataQuery,
  useGetRegionsByCountryIdQuery,
} from "../api/regionSelectionApi";

// ─── Types (copied from RegionSelection.tsx, do not modify RegionSelection.tsx) ─
interface GeoMasterItem { c: string; d: string; g: { type: string; coordinates: any[] }; i: number; }
interface MandalItem extends GeoMasterItem { district_id?: number; }
interface DistrictItem extends GeoMasterItem { mandals: MandalItem[]; }
interface StateItem extends GeoMasterItem { districts: DistrictItem[]; }
interface CountryItem extends GeoMasterItem { states: StateItem[]; }
interface GeoMasterData { countries: CountryItem[]; }

// ─── GeoJSON Helpers (copied from RegionSelection.tsx) ────────────────────────
function toFeatureCollection(items: GeoMasterItem[], extraProps?: (item: GeoMasterItem) => Record<string, any>): GeoJSON.FeatureCollection {
  return { type: "FeatureCollection", features: items.map((item) => ({ type: "Feature", id: item.i, geometry: item.g as GeoJSON.Geometry, properties: { id: item.i, code: item.c, name: item.d, ...(extraProps ? extraProps(item) : {}) } })) };
}
function extractCountriesGeoJSON(data: GeoMasterData): GeoJSON.FeatureCollection { return toFeatureCollection(data.countries); }
function extractStatesGeoJSON(data: GeoMasterData): GeoJSON.FeatureCollection { return toFeatureCollection(data.countries.flatMap((c) => c.states ?? [])); }

const getDistrictIdsFromRegion = (feature: any, masterData: GeoMasterData | null): number[] => {
  const props = feature?.properties || {};
  if (Array.isArray(props.districts)) { const ids = props.districts.map((d: any) => Number(d.id || d.i || d.district_id)).filter((id: number) => !isNaN(id) && id > 0); if (ids.length > 0) return ids; }
  if (Array.isArray(props.district_ids)) { const ids = props.district_ids.map(Number).filter((id: number) => !isNaN(id) && id > 0); if (ids.length > 0) return ids; }
  if (typeof props.all_districts === "string" && props.all_districts.trim() !== "" && masterData) {
    const targetNames = props.all_districts.split(",").map((n: string) => n.trim().toLowerCase());
    const matched: number[] = [];
    masterData.countries.forEach((c) => c.states?.forEach((s) => s.districts?.forEach((d) => { if (targetNames.includes(d.d.toLowerCase())) matched.push(d.i); })));
    return matched;
  }
  return [];
};

const buildRegionFeatureFromDistricts = (rawFeature: any, masterData: GeoMasterData): GeoJSON.Feature | null => {
  const props = rawFeature.properties || {};
  const stateId = Number(props.state_id);
  const districtIds = getDistrictIdsFromRegion(rawFeature, masterData);
  if (districtIds.length === 0) return null;
  const stateObj = masterData.countries.flatMap((c) => c.states ?? []).find((s) => s.i === stateId);
  if (!stateObj) return null;
  const geometries: any[] = districtIds.map((id) => stateObj.districts?.find((d) => d.i === id)?.g).filter((g: any) => !!g && !!g.type);
  if (geometries.length === 0) return null;
  return { type: "Feature", id: props.region_id ?? rawFeature.id, geometry: { type: "GeometryCollection", geometries } as any, properties: props };
};

const buildRegionsGeoJSON = (rawApiData: any, masterData: GeoMasterData): GeoJSON.FeatureCollection => {
  try {
    const raw = decompressGeoJSON(rawApiData);
    if (!raw?.features) return { type: "FeatureCollection", features: [] };
    const features: GeoJSON.Feature[] = raw.features.map((f: any) => {
      const synthesized = f.geometry && f.geometry.type ? f : buildRegionFeatureFromDistricts(f, masterData);
      if (synthesized) { const regionId = synthesized.properties?.region_id || synthesized.id || 1; const colors = getRegionColors(regionId); synthesized.properties = { ...synthesized.properties, regionColor: colors.fill, regionBorderColor: colors.border }; }
      return synthesized as GeoJSON.Feature;
    }).filter((f: any): f is GeoJSON.Feature => !!f);
    return { type: "FeatureCollection", features };
  } catch { return { type: "FeatureCollection", features: [] }; }
};

const getFeatureBounds = (feature: any): maplibregl.LngLatBoundsLike => {
  const bounds = new maplibregl.LngLatBounds();
  const extendBounds = (coords: any[]) => { coords.forEach((c) => { if (Array.isArray(c[0])) extendBounds(c); else bounds.extend(c as [number, number]); }); };
  const g = feature.geometry;
  if (g.type === "GeometryCollection") (g.geometries as any[]).forEach((geo: any) => { if (geo?.coordinates) extendBounds(geo.coordinates); });
  else extendBounds(g.coordinates);
  return bounds;
};

// ─── Component ────────────────────────────────────────────────────────────────
const RegionViewMap: React.FC = () => {
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(0);
  const [geoMasterData, setGeoMasterData] = useState<GeoMasterData | null>(null);
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();
  const { data: regionsByCountryData } = useGetRegionsByCountryIdQuery(
    { country_id: 1 },
    { refetchOnMountOrArgChange: true },
  );

  // Fetch S3 GeoJSON master data
  useEffect(() => {
    if (!allGeoJsonData?.success || !allGeoJsonData?.data) return;
    const fetchAndParse = async () => {
      setIsLoadingGeoData(true);
      try {
        const res = await fetch(allGeoJsonData.data);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setGeoMasterData(await res.json());
      } catch (err) { console.error("Failed to fetch geo master data:", err); }
      finally { setIsLoadingGeoData(false); }
    };
    fetchAndParse();
  }, [allGeoJsonData]);

  // Inject country + state geometry into map
  useEffect(() => {
    if (!map.current || !geoMasterData || mapLoaded === 0) return;
    try {
      (map.current.getSource("india-border") as maplibregl.GeoJSONSource)?.setData(extractCountriesGeoJSON(geoMasterData));
      (map.current.getSource("india-states") as maplibregl.GeoJSONSource)?.setData(extractStatesGeoJSON(geoMasterData));
    } catch (err) { console.error("Error injecting GeoJSON:", err); }
  }, [geoMasterData, mapLoaded]);

  // Render region overlays when state selected
  const stateRegionsData = useMemo(() => {
    if (!selectedState || !regionsByCountryData || !geoMasterData) return { type: "FeatureCollection" as const, features: [] };
    try {
      const selectedStateId = selectedState?.properties?.id;
      const allRegions = buildRegionsGeoJSON(regionsByCountryData, geoMasterData);
      const stateDistrictIds = new Set<number>();
      const stateObj = geoMasterData.countries.flatMap((c) => c.states ?? []).find((s) => s.i === selectedStateId);
      stateObj?.districts?.forEach((d) => stateDistrictIds.add(d.i));
      const filtered = allRegions.features.filter((f: any) => getDistrictIdsFromRegion(f, geoMasterData).some((id) => stateDistrictIds.has(id)));
      return { type: "FeatureCollection" as const, features: filtered };
    } catch { return { type: "FeatureCollection" as const, features: [] }; }
  }, [selectedState, regionsByCountryData, geoMasterData]);

  useEffect(() => {
    if (map.current?.getSource("regions-source")) {
      (map.current.getSource("regions-source") as maplibregl.GeoJSONSource).setData(stateRegionsData);
    }
  }, [stateRegionsData]);

  // Initialize MapLibre (read-only — no district/mandal selection)
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: { version: 8, sources: {}, layers: [{ id: "background", type: "background", paint: { "background-color": "#D6E6FF" } }] },
        center: [78.9629, 20.5937],
        zoom: 2,
      });
      map.current = mapInstance;
      popup.current = new maplibregl.Popup({ closeButton: false, closeOnClick: false, className: "custom-district-popup" });
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");

      map.current.on("style.load", () => {
        // @ts-ignore
        map.current?.setProjection({ type: "globe" });

        map.current?.addSource("world-land", { type: "geojson", data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson" });
        map.current?.addLayer({ id: "world-land-fill", type: "fill", source: "world-land", paint: { "fill-color": "#F0EEF0", "fill-opacity": 1 } });

        map.current?.addSource("india-border", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.current?.addLayer({ id: "india-fill", type: "fill", source: "india-border", paint: { "fill-color": "#F0EEF0", "fill-opacity": 1 } });
        map.current?.addLayer({ id: "india-border-line", type: "line", source: "india-border", paint: { "line-color": "#94a3b8", "line-width": 1.2 } });

        map.current?.addSource("india-states", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        map.current?.addLayer({ id: "states-fill", type: "fill", source: "india-states", paint: { "fill-color": "transparent" } });
        map.current?.addLayer({ id: "states-border-line", type: "line", source: "india-states", paint: { "line-color": "#475569", "line-width": 1.5 } });

        map.current?.addSource("regions-source", { type: "geojson", data: { type: "FeatureCollection", features: [] }, generateId: true });
        map.current?.addLayer({ id: "regions-fill", type: "fill", source: "regions-source", paint: { "fill-color": ["coalesce", ["get", "regionColor"], "#10b981"], "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.45, 0.25] } }, "states-border-line");
        map.current?.addLayer({ id: "regions-line", type: "line", source: "regions-source", paint: { "line-color": ["coalesce", ["get", "regionBorderColor"], "#059669"], "line-width": 2 } }, "states-border-line");

        // State click → zoom in and show regions (view only, no selection)
        map.current?.on("click", "states-fill", (e) => {
          if (e.features && e.features.length > 0 && !selectedState) {
            const feature = e.features[0];
            const state = { type: "Feature", geometry: feature.geometry, properties: feature.properties };
            setSelectedState(state);
            map.current?.fitBounds(getFeatureBounds(feature), { padding: 100, duration: 1200 });
            setIsZoomed(true);
          }
        });

        // Region hover tooltip (read-only)
        let hoveredRegionId: any = null;
        map.current?.on("mousemove", "regions-fill", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const props = feature.properties || {};
            if (hoveredRegionId !== null) map.current?.setFeatureState({ source: "regions-source", id: hoveredRegionId }, { hover: false });
            hoveredRegionId = feature.id ?? null;
            if (hoveredRegionId !== null) map.current?.setFeatureState({ source: "regions-source", id: hoveredRegionId }, { hover: true });
            const regionName = props.region_name || props.regionName || props.name || "Region";
            const districtLabel = Array.isArray(props.districts) ? props.districts.map((d: any) => d?.name || d?.d || "").filter(Boolean).join(", ") : props.all_districts || "";
            if (map.current && popup.current) {
              popup.current.setLngLat(e.lngLat).setHTML(`<div style="font-family:sans-serif;line-height:1.3"><div style="font-weight:700;font-size:13px;color:#0f172a">${regionName}</div>${districtLabel ? `<div style="font-size:11px;color:#475569;margin-top:4px">${districtLabel}</div>` : ""}</div>`).addTo(map.current);
            }
            if (map.current) map.current.getCanvas().style.cursor = "pointer";
          }
        });
        map.current?.on("mouseleave", "regions-fill", () => {
          if (hoveredRegionId !== null) map.current?.setFeatureState({ source: "regions-source", id: hoveredRegionId }, { hover: false });
          hoveredRegionId = null;
          popup.current?.remove();
          if (map.current) map.current.getCanvas().style.cursor = "";
        });

        // State hover cursor
        map.current?.on("mouseenter", "states-fill", () => { if (map.current && !selectedState) map.current.getCanvas().style.cursor = "pointer"; });
        map.current?.on("mouseleave", "states-fill", () => { if (map.current) map.current.getCanvas().style.cursor = ""; });

        setMapLoaded((p) => p + 1);
        map.current?.flyTo({ center: [78.9629, 20.5937], zoom: 3.5, duration: 3000, essential: true });
        setTimeout(() => map.current?.resize(), 100);
      });
    } catch (err) { console.error("Failed to initialize map:", err); }
    return () => { if (map.current) { map.current.remove(); map.current = null; } };
  }, []);

  const resetView = () => {
    map.current?.flyTo({ center: [78.9629, 20.5937], zoom: 3.5, duration: 1500, essential: true });
    setIsZoomed(false);
    setSelectedState(null);
    (map.current?.getSource("regions-source") as maplibregl.GeoJSONSource)?.setData({ type: "FeatureCollection", features: [] });
  };

  return (
    <div className="relative w-full h-screen bg-[#D6E6FF] overflow-hidden">
      {/* Back button */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <button
          onClick={() => navigate("/role-manager/create-regions-and-areas?mode=view")}
          className="flex items-center gap-2 bg-white rounded-full px-4 h-10 shadow-md text-sm font-medium text-slate-700 hover:opacity-80 transition cursor-pointer border-0"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        {isZoomed && (
          <button
            onClick={resetView}
            className="flex items-center gap-2 bg-white rounded-full px-4 h-10 shadow-md text-sm font-medium text-slate-700 hover:opacity-80 transition cursor-pointer border-0"
          >
            <ChevronLeft className="w-4 h-4" />
            All States
          </button>
        )}
      </div>

      {/* Loading indicator */}
      {isLoadingGeoData && (
        <div className="absolute top-4 right-16 z-20 flex items-center gap-2 bg-white rounded-full px-4 h-10 shadow-md text-sm text-slate-600">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          Loading map data...
        </div>
      )}

      {/* Info hint */}
      {!isZoomed && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md text-sm text-slate-600">
          Click on a state to view its regions
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default RegionViewMap;
