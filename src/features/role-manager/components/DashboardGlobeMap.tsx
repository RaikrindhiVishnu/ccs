import React, { useEffect, useRef, useState, useMemo } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { decompressGeoJSON } from "../utils/utils";
import { getRegionColors, getAreaColors } from "../utils/colorPalette";
import { Loader2, ChevronLeft } from "lucide-react";
import {
  useGetAllGeoJsonDataQuery,
  useGetRegionsByCountryIdQuery,
  useGetAllAreasByRegionIdQuery,
} from "../api/regionSelectionApi";

// ─── Types (copied from RegionSelection.tsx) ─
interface GeoMasterItem { c: string; d: string; g: { type: string; coordinates: any[] }; i: number; }
interface MandalItem extends GeoMasterItem { district_id?: number; }
interface DistrictItem extends GeoMasterItem { mandals: MandalItem[]; }
interface StateItem extends GeoMasterItem { districts: DistrictItem[]; }
interface CountryItem extends GeoMasterItem { states: StateItem[]; }
interface GeoMasterData { countries: CountryItem[]; }

// ─── GeoJSON Helpers ────────────────────────
function toFeatureCollection(items: GeoMasterItem[], extraProps?: (item: GeoMasterItem) => Record<string, any>): GeoJSON.FeatureCollection {
  return { type: "FeatureCollection", features: items.map((item) => ({ type: "Feature", id: item.i, geometry: item.g as GeoJSON.Geometry, properties: { id: item.i, code: item.c, name: item.d, ...(extraProps ? extraProps(item) : {}) } })) };
}
function extractCountriesGeoJSON(data: GeoMasterData): GeoJSON.FeatureCollection { return toFeatureCollection(data.countries); }
function extractStatesGeoJSON(data: GeoMasterData): GeoJSON.FeatureCollection { return toFeatureCollection(data.countries.flatMap((c) => c.states ?? [])); }

const getDistrictIdsFromRegion = (feature: any, masterData: GeoMasterData | null): number[] => {
  const props = feature?.properties || {};
  
  let districts = props.districts;
  if (typeof districts === "string") {
    try { districts = JSON.parse(districts); } catch (e) {}
  }
  if (Array.isArray(districts)) {
    const ids = districts.map((d: any) => Number(d.id || d.i || d.district_id)).filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }

  let district_ids = props.district_ids;
  if (typeof district_ids === "string") {
    try { district_ids = JSON.parse(district_ids); } catch (e) {}
  }
  if (Array.isArray(district_ids)) {
    const ids = district_ids.map(Number).filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }

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

const extractAllAreasGeoJSON = (data: GeoMasterData | null, areasList: any[], districtIds: number[]): GeoJSON.FeatureCollection => {
  if (!data || districtIds.length === 0) return { type: "FeatureCollection", features: [] };
  const allMandals: MandalItem[] = [];
  data.countries.forEach((country) => {
    country.states?.forEach((state) => {
      state.districts?.forEach((district) => {
        if (districtIds.includes(district.i) && district.mandals) {
          district.mandals.forEach((m) => allMandals.push({ ...m, district_id: district.i }));
        }
      });
    });
  });

  const assignedMandalMap = new Map<number, { color: string; areaName: string }>();
  if (areasList && areasList.length > 0) {
    areasList.forEach((area, idx) => {
      const color = getAreaColors(area.region_id || area.regionId || 1, idx);
      let mIds = area.mandal_ids || area.mandalIds || [];
      if (typeof mIds === "string") {
        try { mIds = JSON.parse(mIds); } catch (e) { mIds = []; }
      }
      if (Array.isArray(mIds)) {
        mIds.forEach((mId: any) => {
          const idNum = Number(mId);
          if (!isNaN(idNum)) assignedMandalMap.set(idNum, { color, areaName: area.area_name || area.areaName || "" });
        });
      }
      
      if (Array.isArray(area.assignments)) {
        area.assignments.forEach((assignment: any) => {
          const idNum = Number(assignment.mandal_id || assignment.mandalId);
          if (!isNaN(idNum)) assignedMandalMap.set(idNum, { color, areaName: area.area_name || area.areaName || "" });
        });
      }
    });
  }

  const features = allMandals.map((m) => {
    const info = assignedMandalMap.get(m.i);
    return {
      type: "Feature",
      id: m.i,
      geometry: m.g as GeoJSON.Geometry,
      properties: {
        id: m.i,
        name: m.d,
        areaName: info?.areaName,
        areaColor: info?.color,
        isAssigned: !!info,
      },
    };
  });
  return { type: "FeatureCollection", features: features as any };
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
const DashboardGlobeMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(0);
  const [geoMasterData, setGeoMasterData] = useState<GeoMasterData | null>(null);
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoveredRegionName, setHoveredRegionName] = useState<string | null>(null);
  const [hoveredMandalName, setHoveredMandalName] = useState<string | null>(null);

  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();
  const { data: regionsByCountryData } = useGetRegionsByCountryIdQuery(
    { country_id: 1 },
    { refetchOnMountOrArgChange: true },
  );
  const regionIdForQuery = useMemo(() => {
    if (!selectedRegion) return 0;
    return Number(selectedRegion.properties?.region_id || selectedRegion.properties?.regionId || selectedRegion.properties?.id || selectedRegion.id);
  }, [selectedRegion]);

  const { data: areasByRegionData } = useGetAllAreasByRegionIdQuery(
    { region_id: regionIdForQuery },
    { skip: !regionIdForQuery }
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

  // Render region overlays when state selected, and update areas
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

  const stateAreasData = useMemo(() => {
    if (!selectedRegion || !geoMasterData) return { type: "FeatureCollection" as const, features: [] };
    const areasList = (areasByRegionData && Array.isArray(areasByRegionData.data)) ? areasByRegionData.data : (Array.isArray(areasByRegionData) ? areasByRegionData : []);
    const districtIds = getDistrictIdsFromRegion(selectedRegion, geoMasterData);
    return extractAllAreasGeoJSON(geoMasterData, areasList, districtIds);
  }, [selectedRegion, areasByRegionData, geoMasterData]);

  useEffect(() => {
    if (map.current?.getSource("regions-source")) {
      (map.current.getSource("regions-source") as maplibregl.GeoJSONSource).setData(stateRegionsData);
    }
    if (map.current?.getSource("areas-source")) {
      (map.current.getSource("areas-source") as maplibregl.GeoJSONSource).setData(stateAreasData);
    }
  }, [stateRegionsData, stateAreasData]);

  // Initialize MapLibre
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
        map.current?.addLayer({ id: "regions-fill", type: "fill", source: "regions-source", paint: { "fill-color": ["coalesce", ["get", "regionColor"], "#0ea5e9"], "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.8, ["case", ["boolean", ["feature-state", "selected"], false], 0.1, 0.6]] } }, "states-border-line");
        map.current?.addLayer({ id: "regions-line", type: "line", source: "regions-source", paint: { "line-color": ["coalesce", ["get", "regionBorderColor"], "#059669"], "line-width": 2, "line-opacity": 0.6 } }, "states-border-line");

        map.current?.addSource("areas-source", { type: "geojson", data: { type: "FeatureCollection", features: [] }, generateId: true });
        map.current?.addLayer({ id: "areas-fill", type: "fill", source: "areas-source", paint: { "fill-color": ["case", ["boolean", ["get", "isAssigned"], false], ["coalesce", ["get", "areaColor"], "#3b82f6"], ["case", ["boolean", ["feature-state", "hover"], false], "rgba(255,255,255,0.4)", "rgba(255,255,255,0.01)"]], "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.9, 0.7] } }, "states-border-line");
        map.current?.addLayer({ id: "areas-line", type: "line", source: "areas-source", paint: { "line-color": ["case", ["boolean", ["get", "isAssigned"], false], "#ffffff", "#0891b2"], "line-width": ["case", ["boolean", ["get", "isAssigned"], false], 1.5, 1.2], "line-opacity": ["case", ["boolean", ["get", "isAssigned"], false], 0.8, 0.6] } }, "states-border-line");

        // State click → zoom in
        map.current?.on("click", "states-fill", (e) => {
          if (e.features && e.features.length > 0 && !selectedState) {
            const feature = e.features[0];
            const state = { type: "Feature", geometry: feature.geometry, properties: feature.properties };
            setSelectedState(state);
            map.current?.fitBounds(getFeatureBounds(feature), { padding: 100, duration: 1200 });
            setIsZoomed(true);
          }
        });

        // Region click → zoom in and show areas
        let activeRegionId: any = null;
        map.current?.on("click", "regions-fill", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const region = { type: "Feature", geometry: feature.geometry, properties: feature.properties, id: feature.id };
            
            if (activeRegionId !== null) {
               map.current?.setFeatureState({ source: "regions-source", id: activeRegionId }, { selected: false });
            }
            activeRegionId = feature.id;
            if (activeRegionId !== null) {
               map.current?.setFeatureState({ source: "regions-source", id: activeRegionId }, { selected: true });
            }

            setSelectedRegion(region);
            map.current?.fitBounds(getFeatureBounds(feature), { padding: 80, duration: 1200 });
          }
        });

        // Region/Area hover tooltip
        let hoveredRegionId: any = null;
        let hoveredAreaId: any = null;

        const showTooltip = (e: any, type: "region" | "area") => {
          if (!e.features || e.features.length === 0) return;
          const feature = e.features[0];
          const props = feature.properties || {};
          
          if (type === "region") {
            if (hoveredRegionId !== null) map.current?.setFeatureState({ source: "regions-source", id: hoveredRegionId }, { hover: false });
            hoveredRegionId = feature.id ?? null;
            if (hoveredRegionId !== null) map.current?.setFeatureState({ source: "regions-source", id: hoveredRegionId }, { hover: true });
          } else {
            if (hoveredAreaId !== null) map.current?.setFeatureState({ source: "areas-source", id: hoveredAreaId }, { hover: false });
            hoveredAreaId = feature.id ?? null;
            if (hoveredAreaId !== null) map.current?.setFeatureState({ source: "areas-source", id: hoveredAreaId }, { hover: true });
          }

          if (map.current && popup.current) {
            if (type === "area") {
              const title = props.isAssigned ? (props.areaName || props.area_name || "Area") : "Unassigned";
              const subtitle = props.name || "Mandal";
              setHoveredMandalName(subtitle);
              setHoveredRegionName(null);
              popup.current.setLngLat(e.lngLat).setHTML(`<div style="font-family:sans-serif;line-height:1.3"><div style="font-weight:700;font-size:13px;color:#0f172a">${title}</div><div style="font-size:11px;color:#475569;margin-top:4px">${subtitle}</div></div>`).addTo(map.current);
            } else {
              const regionName = props.region_name || props.regionName || props.name || "Region";
              const subtitle = Array.isArray(props.districts) ? props.districts.map((d: any) => d?.name || d?.d || "").filter(Boolean).join(", ") : props.all_districts || "";
              setHoveredRegionName(regionName);
              setHoveredMandalName(null);
              popup.current.setLngLat(e.lngLat).setHTML(`<div style="font-family:sans-serif;line-height:1.3"><div style="font-weight:700;font-size:13px;color:#0f172a">${regionName}</div>${subtitle ? `<div style="font-size:11px;color:#475569;margin-top:4px">${subtitle}</div>` : ""}</div>`).addTo(map.current);
            }
          }
          if (map.current) map.current.getCanvas().style.cursor = "pointer";
        };

        const hideTooltip = (type: "region" | "area") => {
          if (type === "region" && hoveredRegionId !== null) {
            map.current?.setFeatureState({ source: "regions-source", id: hoveredRegionId }, { hover: false });
            hoveredRegionId = null;
          } else if (type === "area" && hoveredAreaId !== null) {
            map.current?.setFeatureState({ source: "areas-source", id: hoveredAreaId }, { hover: false });
            hoveredAreaId = null;
          }
          if (hoveredRegionId === null && hoveredAreaId === null) {
            popup.current?.remove();
            if (map.current) map.current.getCanvas().style.cursor = "";
          }
        };

        map.current?.on("mousemove", (e) => {
          if (!map.current) return;
          const areas = map.current.queryRenderedFeatures(e.point, { layers: ["areas-fill"] });
          if (areas.length > 0) {
            hideTooltip("region");
            showTooltip({ features: areas, lngLat: e.lngLat }, "area");
            return;
          }
          const regions = map.current.queryRenderedFeatures(e.point, { layers: ["regions-fill"] });
          if (regions.length > 0) {
            hideTooltip("area");
            showTooltip({ features: regions, lngLat: e.lngLat }, "region");
            return;
          }
          hideTooltip("area");
          hideTooltip("region");
        });

        const resetTooltipHoverState = () => {
          setHoveredMandalName(null);
          setHoveredRegionName(null);
        };
        map.current?.on("mouseleave", "areas-fill", resetTooltipHoverState);
        map.current?.on("mouseleave", "regions-fill", resetTooltipHoverState);

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
    setSelectedRegion(null);
    (map.current?.getSource("regions-source") as maplibregl.GeoJSONSource)?.setData({ type: "FeatureCollection", features: [] });
    (map.current?.getSource("areas-source") as maplibregl.GeoJSONSource)?.setData({ type: "FeatureCollection", features: [] });
    // Note: the activeRegionId will reset when regions-source is cleared
  };

  return (
    <div className="relative w-full h-full bg-[#D6E6FF] overflow-hidden">
      {/* Dynamic Header / Breadcrumbs */}
      <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          {isZoomed && (
            <button
              onClick={resetView}
              className="p-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white/90 hover:scale-105 active:scale-95 transition-all flex items-center justify-center mr-1 cursor-pointer"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700" />
            </button>
          )}

          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/60 shadow-md flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.18em] block leading-none mb-0.5">
              Dashboard
            </span>
            <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-none uppercase">
              Regions & Areas
            </p>
          </div>

          {selectedState && !selectedRegion && (
            <div className="bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-blue-500/30 shadow-md animate-in slide-in-from-left-4 duration-500 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-blue-700 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Viewing State
              </span>
              <p className="text-sm font-extrabold text-blue-900 tracking-tight leading-none uppercase">
                {selectedState.properties?.name || selectedState.properties?.STNAME || "State"}
              </p>
            </div>
          )}

          {selectedRegion && (
            <div className="bg-purple-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-purple-500/30 shadow-md animate-in slide-in-from-left-4 duration-500 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-purple-700 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Viewing Region
              </span>
              <p className="text-sm font-extrabold text-purple-900 tracking-tight leading-none uppercase">
                {selectedRegion.properties?.region_name || selectedRegion.properties?.name || "Region"}
              </p>
            </div>
          )}

          {hoveredRegionName && !selectedRegion && (
            <div className="bg-purple-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-purple-500/30 shadow-md animate-in slide-in-from-left-4 duration-300 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-purple-700 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Hovering Region
              </span>
              <p className="text-sm font-extrabold text-purple-900 tracking-tight leading-none uppercase">
                {hoveredRegionName}
              </p>
            </div>
          )}

          {hoveredMandalName && (
            <div className="bg-teal-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-teal-500/30 shadow-md animate-in slide-in-from-left-4 duration-300 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-teal-700 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Hovering Mandal
              </span>
              <p className="text-sm font-extrabold text-teal-900 tracking-tight leading-none uppercase">
                {hoveredMandalName}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {isLoadingGeoData && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white rounded-full px-4 h-10 shadow-md text-sm text-slate-600">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          Loading map data...
        </div>
      )}

      {/* Info hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
        {!isZoomed && (
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md text-sm text-slate-600 font-medium">
            Click on a state to view its regions and areas
          </div>
        )}
      </div>

      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default DashboardGlobeMap;
