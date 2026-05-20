import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { decompressGeoJSON } from "../utils/utils";
import { Maximize2, ChevronLeft, Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useCreateRegionMutation,
  useCreateAreaMutation,
  useGetAllGeoJsonDataQuery,
  useGetRegionsByCountryIdQuery,
  useGetAllAreasByRegionIdQuery,
} from "../api/regionSelectionApi";

// ─── Constants ──────────────────────────────────────────────────────────────
const AREA_COLORS = [
  "#3b82f6", // Premium Blue
  "#10b981", // Premium Emerald
  "#f59e0b", // Premium Amber
  "#ef4444", // Premium Red
  "#8b5cf6", // Premium Violet
  "#ec4899", // Premium Pink
  "#06b6d4", // Premium Cyan
  "#f97316", // Premium Orange
  "#14b8a6", // Premium Teal
  "#6366f1", // Premium Indigo
];

// ─── Types ──────────────────────────────────────────────────────────────────
interface GeoMasterItem {
  c: string; // code
  d: string; // description / name
  g: { type: string; coordinates: any[] }; // geometry
  i: number; // id
}

interface MandalItem extends GeoMasterItem {
  district_id?: number;
}

interface DistrictItem extends GeoMasterItem {
  mandals: MandalItem[];
}

interface StateItem extends GeoMasterItem {
  districts: DistrictItem[];
}

interface CountryItem extends GeoMasterItem {
  states: StateItem[];
}

interface GeoMasterData {
  countries: CountryItem[];
}

// ─── GeoJSON Parser Helpers ──────────────────────────────────────────────────

/** Convert compact master items to a standard GeoJSON FeatureCollection */
function toFeatureCollection(
  items: GeoMasterItem[],
  extraProps?: (item: GeoMasterItem) => Record<string, any>,
): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: items.map((item) => ({
      type: "Feature",
      id: item.i,
      geometry: item.g as GeoJSON.Geometry,
      properties: {
        id: item.i,
        code: item.c,
        name: item.d,
        ...(extraProps ? extraProps(item) : {}),
      },
    })),
  };
}

/** Extract a FeatureCollection of all countries */
function extractCountriesGeoJSON(
  data: GeoMasterData,
): GeoJSON.FeatureCollection {
  return toFeatureCollection(data.countries);
}

/** Extract a FeatureCollection of all states (flattened across countries) */
function extractStatesGeoJSON(data: GeoMasterData): GeoJSON.FeatureCollection {
  const allStates: StateItem[] = data.countries.flatMap(
    (country) => country.states ?? [],
  );
  return toFeatureCollection(allStates);
}

/** Extract a FeatureCollection of districts for a specific state ID and tag assigned ones */
function extractDistrictsGeoJSON(
  data: GeoMasterData,
  stateId: number,
  assignedIds: Set<number>,
): GeoJSON.FeatureCollection {
  const state = data.countries
    .flatMap((c) => c.states ?? [])
    .find((s) => s.i === stateId);

  if (!state) return { type: "FeatureCollection", features: [] };
  return toFeatureCollection(state.districts ?? [], (item) => ({
    isAssigned: assignedIds.has(item.i),
  }));
}

/** Extract a FeatureCollection of mandals for a list of district IDs and tag assigned ones with dynamic colors per area */
function extractMandalsGeoJSON(
  data: GeoMasterData,
  districtIds: number[],
  areasList: any[] = [],
): GeoJSON.FeatureCollection {
  const allMandals: MandalItem[] = [];

  data.countries.forEach((country) => {
    country.states?.forEach((state) => {
      state.districts?.forEach((district) => {
        if (districtIds.includes(district.i)) {
          if (district.mandals) {
            const mappedMandals = district.mandals.map(m => ({ ...m, district_id: district.i }));
            mappedMandals.forEach(m => {
              if (!allMandals.some(existing => existing.i === m.i)) {
                allMandals.push(m);
              }
            });
          }
        }
      });
    });
  });

  const assignedMandalMap = new Map<number, { color: string; areaName: string }>();
  if (Array.isArray(areasList)) {
    areasList.forEach((area, idx) => {
      const color = AREA_COLORS[idx % AREA_COLORS.length];
      if (Array.isArray(area.mandal_ids)) {
        area.mandal_ids.forEach((mId: any) => {
          const idNum = Number(mId);
          if (!isNaN(idNum)) {
            assignedMandalMap.set(idNum, { color, areaName: area.area_name || area.areaName || "" });
          }
        });
      }
    });
  }

  return toFeatureCollection(allMandals, (item) => {
    const info = assignedMandalMap.get(item.i);
    return { 
      district_id: (item as MandalItem).district_id,
      isAssigned: !!info,
      areaColor: info?.color || "",
      areaName: info?.areaName || "",
    };
  });
}

/** Robustly extract district IDs from a region feature using optimal keys and fallback name matching */
const getDistrictIdsFromRegion = (
  regionFeature: any,
  masterData: GeoMasterData | null,
): number[] => {
  const props = regionFeature?.properties || {};

  // Case 1: Array of district objects (New optimal backend structure)
  if (Array.isArray(props.districts)) {
    const ids = props.districts
      .map((d: any) => Number(d.id || d.i || d.district_id))
      .filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }

  // Case 2: Array of raw IDs (Alternative structured field)
  if (Array.isArray(props.district_ids)) {
    const ids = props.district_ids
      .map(Number)
      .filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }

  // Case 3: Comma-separated names fallback (Enables immediate compatibility)
  if (
    typeof props.all_districts === "string" &&
    props.all_districts.trim() !== "" &&
    masterData
  ) {
    const targetNames = props.all_districts
      .split(",")
      .map((name: string) => name.trim().toLowerCase());

    const matchedIds: number[] = [];
    masterData.countries.forEach((country) => {
      country.states?.forEach((state) => {
        state.districts?.forEach((district) => {
          if (targetNames.includes(district.d.toLowerCase())) {
            matchedIds.push(district.i);
          }
        });
      });
    });
    return matchedIds;
  }

  return [];
};

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
  const popup = useRef<maplibregl.Popup | null>(null);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "region";

  const [isZoomed, setIsZooming] = useState(false);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(0);
  const [geoMasterData, setGeoMasterData] = useState<GeoMasterData | null>(
    null,
  );
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);

  // Region Creation States
  const [selectedDistricts, setSelectedDistricts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regionName, setRegionName] = useState("");
  const [regionCode, setRegionCode] = useState("");
  const [hoveredDistrictName, setHoveredDistrictName] = useState<string | null>(null);

  // Area Creation States
  const [selectedMandals, setSelectedMandals] = useState<any[]>([]);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [hoveredMandalName, setHoveredMandalName] = useState<string | null>(null);

  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();
  const regionsQuery = useGetRegionsByCountryIdQuery({ country_id: 1 }, { refetchOnMountOrArgChange: true });
  const regionsByCountryData = regionsQuery.data;

  useEffect(() => {
    console.log("regionsByCountryQuery status:", {
      isLoading: regionsQuery.isLoading,
      isError: regionsQuery.isError,
      error: regionsQuery.error,
      isSuccess: regionsQuery.isSuccess,
      data: regionsQuery.data
    });
  }, [regionsQuery]);

  const assignedDistrictIds = useMemo(() => {
    const assigned = new Set<number>();
    if (!regionsByCountryData || !geoMasterData) return assigned;

    try {
      const decompressed = decompressGeoJSON(regionsByCountryData);
      if (decompressed && decompressed.features) {
        decompressed.features.forEach((feature: any) => {
          const ids = getDistrictIdsFromRegion(feature, geoMasterData);
          ids.forEach((id) => assigned.add(id));
        });
      }
    } catch (err) {
      console.error("Failed to parse assigned district IDs from country regions:", err);
    }
    return assigned;
  }, [regionsByCountryData, geoMasterData]);

  const selectedRegionId = selectedRegion?.properties?.region_id ?? selectedRegion?.properties?.id ?? selectedRegion?.id;
  const { data: areasData, refetch: refetchAreas } = useGetAllAreasByRegionIdQuery(
    { region_id: Number(selectedRegionId) },
    { skip: !selectedRegionId }
  );

  // Filter country regions for selected state to render emerald overlays in Region Mode
  const stateRegionsData = useMemo(() => {
    const selectedStateId = selectedState?.properties?.id;
    if (!selectedStateId || !regionsByCountryData || !geoMasterData) {
      return { type: "FeatureCollection" as const, features: [] };
    }

    try {
      const decompressed = decompressGeoJSON(regionsByCountryData);
      if (!decompressed || !decompressed.features) {
        return { type: "FeatureCollection" as const, features: [] };
      }

      // Gather all district IDs of the selected state
      const stateDistrictIds = new Set<number>();
      const stateObj = geoMasterData.countries
        .flatMap((c) => c.states ?? [])
        .find((s) => s.i === selectedStateId);
      if (stateObj && stateObj.districts) {
        stateObj.districts.forEach((d) => stateDistrictIds.add(d.i));
      }

      // Filter regions containing at least one district of this state
      const filtered = decompressed.features.filter((feature: any) => {
        const regionIds = getDistrictIdsFromRegion(feature, geoMasterData);
        return regionIds.some((id) => stateDistrictIds.has(id));
      });

      return { type: "FeatureCollection" as const, features: filtered };
    } catch (err) {
      console.error("Failed to parse state regions data:", err);
      return { type: "FeatureCollection" as const, features: [] };
    }
  }, [selectedState, regionsByCountryData, geoMasterData]);

  const [createRegion, { isLoading: isCreating }] = useCreateRegionMutation();
  const [createArea, { isLoading: isCreatingArea }] = useCreateAreaMutation();


  const selectedStateId: number | undefined = selectedState?.properties?.id;

  useEffect(() => {
    console.log("regionsByCountryData hook result:", regionsByCountryData);
  }, [regionsByCountryData]);

  // ── Task 2: Fetch S3 URL → parse nested master data ──────────────────────
  useEffect(() => {
    if (!allGeoJsonData?.success || !allGeoJsonData?.data) return;

    const fetchAndParse = async () => {
      setIsLoadingGeoData(true);
      try {
        const response = await fetch(allGeoJsonData.data);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const parsed: GeoMasterData = await response.json();
        console.log("Geo Master Data (parsed):", parsed);
        setGeoMasterData(parsed);
      } catch (error) {
        console.error("Error fetching Geo Master Data:", error);
      } finally {
        setIsLoadingGeoData(false);
      }
    };

    fetchAndParse();
  }, [allGeoJsonData]);



  // ── Task 3: Inject country + state GeoJSON when map and data are both ready ─
  useEffect(() => {
    if (!map.current || !geoMasterData || mapLoaded === 0) return;

    try {
      const countriesGeoJSON = extractCountriesGeoJSON(geoMasterData);
      const statesGeoJSON = extractStatesGeoJSON(geoMasterData);

      const countrySource = map.current.getSource(
        "india-border",
      ) as maplibregl.GeoJSONSource;
      if (countrySource) countrySource.setData(countriesGeoJSON);

      const statesSource = map.current.getSource(
        "india-states",
      ) as maplibregl.GeoJSONSource;
      if (statesSource) statesSource.setData(statesGeoJSON);
    } catch (err) {
      console.error("Error injecting master GeoJSON into map:", err);
    }
  }, [geoMasterData, mapLoaded]);

  const resetView = () => {
    map.current?.flyTo({
      center: [78.9629, 20.5937],
      zoom: 3.5,
      duration: 1500,
      essential: true,
    });
    setIsZooming(false);
    setSelectedState(null);
    setSelectedRegion(null);
    setHoveredMandalName(null);
    setSelectedDistricts([]);

    // Clear district data from map
    if (map.current?.getSource("districts-source")) {
      const source = map.current.getSource(
        "districts-source",
      ) as maplibregl.GeoJSONSource;
      source.setData({ type: "FeatureCollection", features: [] });
    }

    // Clear regions data from map
    if (map.current?.getSource("regions-source")) {
      const source = map.current.getSource(
        "regions-source",
      ) as maplibregl.GeoJSONSource;
      source.setData({ type: "FeatureCollection", features: [] });
    }

    // Clear mandals data from map
    if (map.current?.getSource("mandals-source")) {
      const source = map.current.getSource(
        "mandals-source",
      ) as maplibregl.GeoJSONSource;
      source.setData({ type: "FeatureCollection", features: [] });
    }
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

      popup.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "custom-district-popup",
      });

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

          // Add States Fill for interaction
          map.current?.addLayer({
            id: "states-fill",
            type: "fill",
            source: statesSourceId,
            paint: {
              "fill-color": "transparent",
            },
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

          // Updated Click Handler: Only trigger on actual states
          map.current?.on("click", "states-fill", (e) => {
            if (mode === "area") return; // Disable state zoom in Area Mode
            if (e.features && e.features.length > 0 && !selectedState) {
              const feature = e.features[0];
              setSelectedState({
                type: "Feature",
                geometry: feature.geometry,
                properties: feature.properties,
              });

              // Fit bounds to the clicked state
              const bounds = getFeatureBounds(feature);
              map.current?.fitBounds(bounds, {
                padding: 100,
                duration: 1200,
              });
              setIsZooming(true);
            }
          });

          // District Click Handler (Multi-select)
          map.current?.on("click", "districts-fill", (e) => {
            if (mode === "area") return; // Block selection in Area Mode
            if (e.features && e.features.length > 0) {
              const districtFeature = e.features[0];
              const districtData = districtFeature.properties;

              if (districtData?.isAssigned) {
                toast.warning(`${districtData.name || districtData.d || districtData.description || "This district"} is already part of an existing region.`);
                return;
              }

              // New parser gives us `id` directly as a numeric property
              const dtId = districtData?.id ?? districtFeature.id;

              setSelectedDistricts((prev) => {
                const isAlreadySelected = prev.find(
                  (d) => (d.id ?? d.featureId) === dtId,
                );

                if (isAlreadySelected) {
                  map.current?.setFeatureState(
                     { source: "districts-source", id: districtFeature.id },
                     { selected: false },
                  );
                  return prev.filter((d) => (d.id ?? d.featureId) !== dtId);
                } else {
                  map.current?.setFeatureState(
                     { source: "districts-source", id: districtFeature.id },
                     { selected: true },
                  );
                  return [
                    ...prev,
                    { ...districtData, featureId: districtFeature.id },
                  ];
                }
              });
            }
          });

          map.current?.on("mouseenter", "states-fill", () => {
            if (mode === "area") return; // Disable cursor change in Area Mode
            if (map.current && !selectedState)
              map.current.getCanvas().style.cursor = "pointer";
          });

          map.current?.on("mouseleave", "states-fill", () => {
            if (mode === "area") return; // Disable cursor change in Area Mode
            if (map.current && !selectedState)
              map.current.getCanvas().style.cursor = "";
          });

          map.current?.on("mouseenter", "districts-fill", (e) => {
            if (map.current && selectedState) {
              const isAssigned = e.features && e.features.length > 0 ? e.features[0].properties?.isAssigned : false;
              map.current.getCanvas().style.cursor = isAssigned ? "not-allowed" : "pointer";
            }
          });

          map.current?.on("mouseleave", "districts-fill", () => {
            if (map.current && selectedState)
              map.current.getCanvas().style.cursor = "";
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
  }, []);

  // Handle Zoom Out transition when returning to India view
  useEffect(() => {
    if (!selectedState && mapLoaded > 0 && isZoomed) {
      resetView();
    }
  }, [selectedState]);

  // ── Task 5: Dynamic district rendering when a state is selected ──────────
  useEffect(() => {
    if (!map.current || !geoMasterData || !selectedState) return;

    try {
      const districtsGeoJSON = extractDistrictsGeoJSON(
        geoMasterData,
        selectedStateId!,
        assignedDistrictIds
      );

      if (!map.current.getSource("districts-source")) {
        map.current.addSource("districts-source", {
          type: "geojson",
          data: districtsGeoJSON,
          generateId: true,
        });

        map.current.addLayer(
          {
            id: "districts-fill",
            type: "fill",
            source: "districts-source",
            paint: {
              "fill-color": [
                "case",
                ["boolean", ["get", "isAssigned"], false],
                "#94a3b8",
                "#3b82f6",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["get", "isAssigned"], false],
                0.2,
                ["boolean", ["feature-state", "selected"], false],
                0.35,
                ["boolean", ["feature-state", "hover"], false],
                0.15,
                0,
              ],
            },
          },
          "states-border-line",
        );

        map.current.addLayer(
          {
            id: "districts-line",
            type: "line",
            source: "districts-source",
            paint: {
              "line-color": [
                "case",
                ["boolean", ["get", "isAssigned"], false],
                "#64748b",
                "#3b82f6",
              ],
              "line-width": 0.8,
              "line-dasharray": [2, 1],
              "line-opacity": 0.6,
            },
          },
          "states-border-line",
        );

        // District hover effect
        let hoveredDistrictId: number | string | null = null;
        map.current.on("mousemove", "districts-fill", (e) => {
          if (mode === "area") return; // Disable hover in Area Mode
          if (e.features && e.features.length > 0) {
            const newId = e.features[0].id;
            const dName = e.features[0].properties?.d || e.features[0].properties?.name || e.features[0].properties?.description || "";
            setHoveredDistrictName(dName || null);

            if (dName && map.current && popup.current) {
              popup.current
                .setLngLat(e.lngLat)
                .setHTML(`<div style="font-weight: 700; color: #1e293b;">${dName}</div>`)
                .addTo(map.current);
            }

            if (hoveredDistrictId !== null) {
              map.current?.setFeatureState(
                { source: "districts-source", id: hoveredDistrictId },
                { hover: false },
              );
            }
            hoveredDistrictId =
              newId !== undefined && newId !== null
                ? (newId as number | string)
                : null;
            if (hoveredDistrictId !== null) {
              map.current?.setFeatureState(
                { source: "districts-source", id: hoveredDistrictId },
                { hover: true },
              );
            }
          }
        });
        map.current.on("mouseleave", "districts-fill", () => {
          if (mode === "area") return; // Disable hover in Area Mode
          setHoveredDistrictName(null);
          if (popup.current) {
            popup.current.remove();
          }

          if (hoveredDistrictId !== null) {
            map.current?.setFeatureState(
              { source: "districts-source", id: hoveredDistrictId },
              { hover: false },
            );
          }
          hoveredDistrictId = null;
        });
      } else {
        // Source already exists — just update data
        const source = map.current.getSource(
          "districts-source",
        ) as maplibregl.GeoJSONSource;
        source.setData(districtsGeoJSON);
      }
    } catch (err) {
      console.error("Failed to render districts:", err);
    }
  }, [selectedState, geoMasterData, mapLoaded]);

  // Effect to process and render regions dynamically from country-wide state filter
  useEffect(() => {
    if (map.current && selectedState && stateRegionsData.features.length > 0) {
      try {
        if (!map.current?.getSource("regions-source")) {
          map.current?.addSource("regions-source", {
            type: "geojson",
            data: stateRegionsData,
            generateId: true,
          });

          // Fill Layer for Regions (emerald/teal transparent overlay)
          map.current?.addLayer(
            {
              id: "regions-fill",
              type: "fill",
              source: "regions-source",
              paint: {
                "fill-color": "#10b981", // Beautiful Emerald Green for existing regions
                "fill-opacity": [
                  "case",
                  ["boolean", ["feature-state", "hover"], false],
                  0.35,
                  0.2,
                ],
              },
            },
            "states-border-line",
          );

          // Line Layer for Region borders
          map.current?.addLayer(
            {
              id: "regions-line",
              type: "line",
              source: "regions-source",
              paint: {
                "line-color": "#059669", // Darker Emerald Green
                "line-width": 1.8,
              },
            },
            "states-border-line",
          );

          // Hover effect for regions
          let hoveredRegionId: any = null;
          map.current?.on("mousemove", "regions-fill", (e) => {
            if (e.features && e.features.length > 0) {
              const newId = e.features[0].id;
              if (hoveredRegionId !== null) {
                map.current?.setFeatureState(
                  { source: "regions-source", id: hoveredRegionId },
                  { hover: false },
                );
              }
              hoveredRegionId =
                newId !== undefined && newId !== null ? newId : null;
              if (hoveredRegionId !== null) {
                map.current?.setFeatureState(
                  { source: "regions-source", id: hoveredRegionId },
                  { hover: true },
                );
              }
            }
          });

          map.current?.on("mouseleave", "regions-fill", () => {
            if (hoveredRegionId !== null) {
              map.current?.setFeatureState(
                { source: "regions-source", id: hoveredRegionId },
                { hover: false },
              );
            }
            hoveredRegionId = null;
          });
        } else {
          const source = map.current.getSource(
            "regions-source",
          ) as maplibregl.GeoJSONSource;
          source.setData(stateRegionsData);
        }
      } catch (err) {
        console.error("Failed to render regions from filtered state data:", err);
      }
    } else if (map.current?.getSource("regions-source")) {
      const source = map.current.getSource("regions-source") as maplibregl.GeoJSONSource;
      source.setData({ type: "FeatureCollection", features: [] });
    }
  }, [selectedState, stateRegionsData, mapLoaded]);

  // Effect to dynamically update (or create) mandals-source when areasData or selectedRegion updates
  useEffect(() => {
    if (!map.current || !geoMasterData || !selectedRegion) return;

    try {
      const districtIds = getDistrictIdsFromRegion(selectedRegion, geoMasterData);
      if (districtIds.length === 0) return;

      const areasList = areasData?.data || [];
      const mandalsGeoJSON = extractMandalsGeoJSON(geoMasterData, districtIds, areasList);

      const existingSource = map.current.getSource("mandals-source") as maplibregl.GeoJSONSource | undefined;

      if (existingSource) {
        // Source already exists — just refresh the data
        existingSource.setData(mandalsGeoJSON);
      } else {
        // Source doesn't exist yet — create source + layers + events from scratch
        map.current.addSource("mandals-source", {
          type: "geojson",
          data: mandalsGeoJSON,
          generateId: true,
        });

        // Fill layer with dynamic area colors
        map.current.addLayer(
          {
            id: "mandals-fill",
            type: "fill",
            source: "mandals-source",
            paint: {
              "fill-color": [
                "case",
                ["boolean", ["get", "isAssigned"], false],
                ["coalesce", ["get", "areaColor"], "#94a3b8"],
                ["boolean", ["feature-state", "selected"], false],
                "#0284c7",
                "#38bdf8",
              ],
              "fill-opacity": [
                "case",
                ["boolean", ["get", "isAssigned"], false],
                0.4,
                ["boolean", ["feature-state", "selected"], false],
                0.55,
                ["boolean", ["feature-state", "hover"], false],
                0.45,
                0.25,
              ],
            },
          },
          "states-border-line",
        );

        // Teal outline
        map.current.addLayer(
          {
            id: "mandals-line",
            type: "line",
            source: "mandals-source",
            paint: {
              "line-color": "#0d9488",
              "line-width": 1.2,
            },
          },
          "states-border-line",
        );

        // Hover / click events
        let hoveredMandalId: any = null;

        map.current.on("mouseenter", "mandals-fill", (e) => {
          if (map.current) {
            const isAssigned = e.features && e.features.length > 0 ? e.features[0].properties?.isAssigned : false;
            map.current.getCanvas().style.cursor = isAssigned ? "not-allowed" : "pointer";
          }
        });

        map.current.on("click", "mandals-fill", (ev) => {
          if (ev.features && ev.features.length > 0) {
            const feature = ev.features[0];
            const mData = feature.properties;
            const mId = mData?.id ?? feature.id;

            if (mData?.isAssigned) {
              const nameText = mData.areaName ? `assigned to Area "${mData.areaName}"` : "assigned to an existing area";
              toast.warning(`${mData.name || "This mandal"} is already ${nameText}.`);
              return;
            }

            setSelectedMandals((prev) => {
              const isAlreadySelected = prev.find((m) => (m.id ?? m.featureId) === mId);
              if (isAlreadySelected) {
                map.current?.setFeatureState({ source: "mandals-source", id: feature.id }, { selected: false });
                return prev.filter((m) => (m.id ?? m.featureId) !== mId);
              } else {
                map.current?.setFeatureState({ source: "mandals-source", id: feature.id }, { selected: true });
                return [...prev, { ...mData, featureId: feature.id }];
              }
            });
          }
        });

        map.current.on("mousemove", "mandals-fill", (ev) => {
          if (ev.features && ev.features.length > 0) {
            const mId = ev.features[0].id;
            const props = ev.features[0].properties || {};
            const mName = props.name || props.d || "";
            const isAssigned: boolean = !!props.isAssigned;
            const areaName: string = props.areaName || "";
            const areaColor: string = props.areaColor || "#64748b";

            setHoveredMandalName(mName || null);

            if (map.current && popup.current) {
              const areaTag = isAssigned && areaName
                ? `<div style="
                    display:inline-flex;align-items:center;gap:5px;
                    margin-top:5px;padding:2px 8px;border-radius:999px;
                    background:${areaColor}22;border:1.5px solid ${areaColor};
                    font-size:10px;font-weight:700;color:${areaColor};letter-spacing:0.05em;
                    white-space:nowrap;
                  ">
                    <span style="width:7px;height:7px;border-radius:50%;background:${areaColor};display:inline-block;flex-shrink:0;"></span>
                    ${areaName}
                  </div>`
                : "";

              const html = `
                <div style="
                  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
                  background:white;border-radius:10px;padding:9px 12px;
                  box-shadow:0 4px 20px rgba(0,0,0,0.15);min-width:120px;
                  border:1px solid #e2e8f0;
                ">
                  <div style="font-weight:700;font-size:13px;color:#0f172a;line-height:1.3;">${mName}</div>
                  ${areaTag}
                </div>`;

              popup.current.setLngLat(ev.lngLat).setHTML(html).addTo(map.current);
            }

            if (hoveredMandalId !== null) {
              map.current?.setFeatureState({ source: "mandals-source", id: hoveredMandalId }, { hover: false });
            }
            hoveredMandalId = mId !== undefined && mId !== null ? mId : null;
            if (hoveredMandalId !== null) {
              map.current?.setFeatureState({ source: "mandals-source", id: hoveredMandalId }, { hover: true });
            }
          }
        });

        map.current.on("mouseleave", "mandals-fill", () => {
          if (map.current) map.current.getCanvas().style.cursor = "";
          setHoveredMandalName(null);
          popup.current?.remove();
          if (hoveredMandalId !== null) {
            map.current?.setFeatureState({ source: "mandals-source", id: hoveredMandalId }, { hover: false });
          }
          hoveredMandalId = null;
        });
      }
    } catch (err) {
      console.error("Failed to dynamically update mandals data:", err);
    }
  }, [areasData, selectedRegion, geoMasterData, mapLoaded]);

  // Effect to process and render country-wide regions when in India map view
  useEffect(() => {
    if (map.current && regionsByCountryData) {
      try {
        const finalData = decompressGeoJSON(regionsByCountryData);

        if (finalData && finalData.features) {
          finalData.features.forEach((feature: any) => {
            const props = feature.properties || {};
            // Enrich with district IDs resolved from names in all_districts if needed
            if (!props.districts && !props.district_ids) {
              const matchedIds: number[] = [];
              if (props.all_districts && geoMasterData) {
                const names = props.all_districts.split(",").map((n: string) => n.trim().toLowerCase());
                geoMasterData.countries.forEach((country) => {
                  country.states?.forEach((state) => {
                    state.districts?.forEach((dist) => {
                      if (names.includes(dist.d.toLowerCase())) {
                        matchedIds.push(dist.i);
                      }
                    });
                  });
                });
              }
              props.district_ids = matchedIds.length > 0 ? matchedIds : [11, 12, 13];
            }
            if (!props.state_id) props.state_id = 1;
            if (!props.state_name) props.state_name = "Andhra Pradesh";
          });
        }

        if (finalData) {
          if (!map.current?.getSource("country-regions-source")) {
            map.current?.addSource("country-regions-source", {
              type: "geojson",
              data: finalData,
              generateId: true,
            });

            // Fill Layer for Country Regions (Beautiful Violet transparent overlay)
            map.current?.addLayer(
              {
                id: "country-regions-fill",
                type: "fill",
                source: "country-regions-source",
                paint: {
                  "fill-color": "#8b5cf6", // Premium violet color
                  "fill-opacity": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    0.4,
                    0.2,
                  ],
                },
              },
              "states-border-line",
            ); // Insert below state borders

            // Line Layer for Country Region borders
            map.current?.addLayer(
              {
                id: "country-regions-line",
                type: "line",
                source: "country-regions-source",
                paint: {
                  "line-color": "#6d28d9", // Darker violet
                  "line-width": 1.5,
                },
              },
              "states-border-line",
            );

            // Click Handler for dynamic zoom & mandals rendering in Area Mode
            map.current?.on("click", "country-regions-fill", (e) => {
              if (mode !== "area") return;
              if (e.features && e.features.length > 0 && !selectedRegion) {
                const feature = e.features[0];
                setSelectedRegion(feature);

                // Zoom smoothly into the region bounds
                const bounds = getFeatureBounds(feature);
                map.current?.fitBounds(bounds, {
                  padding: 120,
                  duration: 1500,
                });
                setIsZooming(true);

                // Note: mandals-source and layers are created/updated by the useEffect
                // reacting to [areasData, selectedRegion, geoMasterData]
                console.log("Region clicked in Area Mode. District IDs will be resolved by the useEffect.");
              }
            });

            // Hover effect for country regions
            let hoveredRegionId: any = null;
            map.current?.on("mousemove", "country-regions-fill", (e) => {
              if (hoveredRegionId !== null) {
                map.current?.setFeatureState(
                  { source: "country-regions-source", id: hoveredRegionId },
                  { hover: false },
                );
              }
              if (e.features && e.features.length > 0) {
                const newId = e.features[0].id;
                hoveredRegionId =
                  newId !== undefined && newId !== null ? newId : null;
                if (hoveredRegionId !== null) {
                  map.current?.setFeatureState(
                    { source: "country-regions-source", id: hoveredRegionId },
                    { hover: true },
                  );
                }
              }
            });

            map.current?.on("mouseleave", "country-regions-fill", () => {
              if (hoveredRegionId !== null) {
                map.current?.setFeatureState(
                  { source: "country-regions-source", id: hoveredRegionId },
                  { hover: false },
                );
              }
              hoveredRegionId = null;
            });
          } else {
            const source = map.current.getSource(
              "country-regions-source",
            ) as maplibregl.GeoJSONSource;
            source.setData(finalData);
          }
        }
      } catch (err) {
        console.error("Failed to render country regions from API:", err);
      }
    }
  }, [regionsByCountryData, mapLoaded, geoMasterData, mode, selectedRegion]);

  // Effect to manage country regions visibility depending on mode and selection
  useEffect(() => {
    if (map.current) {
      try {
        const fillLayer = map.current.getLayer("country-regions-fill");
        const lineLayer = map.current.getLayer("country-regions-line");

        // Hide country regions in region mode if a state is selected (to avoid blocking district selection)
        const visibility = (mode === "region" && selectedState) ? "none" : "visible";

        if (fillLayer) {
          map.current.setLayoutProperty(
            "country-regions-fill",
            "visibility",
            visibility,
          );
        }
        if (lineLayer) {
          map.current.setLayoutProperty(
            "country-regions-line",
            "visibility",
            visibility,
          );
        }
      } catch (err) {
        // Safe check for early renders
      }
    }
  }, [selectedState, regionsByCountryData, mode]);

  const handleCreateRegion = async () => {
    if (!regionName || !regionCode) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const districtIds = selectedDistricts.map((d) =>
        Number(d.id ?? d.featureId),
      );

      await createRegion({
        regionName,
        regionCode,
        regionalOfficerId: 1,
        inteligenceOfficerId: 2,
        district_ids: districtIds,
        stateId: Number(selectedStateId),
      }).unwrap();
      toast.success("Region created successfully!");
      
      // Refetch country-wide regions to instantly update the map state and UI blocks
      regionsQuery.refetch();

      selectedDistricts.forEach((d) => {
        const featId = d.featureId !== undefined ? d.featureId : d.id;
        if (featId !== undefined) {
          map.current?.setFeatureState(
            { source: "districts-source", id: featId },
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
  const handleCreateArea = async () => {
    if (!areaName || !areaCode) {
      toast.error("Please fill in all area fields");
      return;
    }

    try {
      const assignments = selectedMandals.map((m) => ({
        district_id: Number(m.district_id || 5), // Injected district_id fallback to 5
        mandal_id: Number(m.id ?? m.featureId),
      }));

      await createArea({
        areaName,
        area_code: areaCode,
        field_officer_id: 115, // Hardcoded per user request
        assignments,
      }).unwrap();
      
      toast.success("Area created successfully!");
      
      try {
        if (typeof refetchAreas === "function") {
          refetchAreas();
        }
      } catch (refetchErr) {
        console.warn("Failed to trigger areas query refetch:", refetchErr);
      }

      selectedMandals.forEach((m) => {
        const featId = m.featureId !== undefined ? m.featureId : m.id;
        if (featId !== undefined) {
          map.current?.setFeatureState(
            { source: "mandals-source", id: featId },
            { selected: false },
          );
        }
      });
      setSelectedMandals([]);
      setIsAreaModalOpen(false);
      setAreaName("");
      setAreaCode("");
    } catch (err) {
      console.error("Failed to create area:", err);
      toast.error("Failed to create area");
    }
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-slate-50/50 relative">
      {/* Dynamic Header */}
      <div className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          {selectedState || selectedRegion ? (
            <button
              onClick={resetView}
              className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xl hover:bg-slate-50 transition-all active:scale-95 group"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-3xl border border-white/50 shadow-2xl">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] block mb-0.5">
                Selection Mode
              </span>
              <p className="text-lg font-black text-slate-800 tracking-tight">
                {mode === "area" ? "Area Dashboard" : "Regional Dashboard"}
              </p>
            </div>
          )}

          {mode === "region" && selectedState && (
            <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-[1.5rem] border border-white/50 shadow-2xl animate-in slide-in-from-left-4 duration-500">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] block mb-0.5">
                Viewing State
              </span>
              <p className="text-lg font-black text-slate-800 tracking-tight uppercase">
                {selectedState.properties?.name ||
                  selectedState.properties?.STNAME ||
                  ""}
              </p>
            </div>
          )}

          {mode === "region" && selectedState && hoveredDistrictName && (
            <div className="bg-blue-600/90 backdrop-blur-xl px-6 py-3 rounded-[1.5rem] border border-blue-500/50 shadow-2xl animate-in slide-in-from-left-4 duration-300">
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] block mb-0.5">
                Hovering District
              </span>
              <p className="text-lg font-black text-white tracking-tight uppercase">
                {hoveredDistrictName}
              </p>
            </div>
          )}

          {mode === "area" && selectedState && !selectedRegion && (
            <div className="bg-white/90 backdrop-blur-xl px-6 py-3 rounded-[1.5rem] border border-white/50 shadow-2xl animate-in slide-in-from-left-4 duration-500">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] block mb-0.5">
                Viewing State
              </span>
              <p className="text-lg font-black text-slate-800 tracking-tight uppercase">
                {selectedState.properties?.name ||
                  selectedState.properties?.STNAME ||
                  ""}
              </p>
            </div>
          )}

          {mode === "area" && selectedRegion && (
            <div className="bg-purple-600/90 backdrop-blur-xl px-6 py-3 rounded-[1.5rem] border border-purple-500/50 shadow-2xl animate-in slide-in-from-left-4 duration-500">
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] block mb-0.5">
                Viewing Region
              </span>
              <p className="text-lg font-black text-white tracking-tight uppercase">
                {selectedRegion.properties?.region_name || "Operational Region"}
              </p>
            </div>
          )}

          {mode === "area" && selectedRegion && hoveredMandalName && (
            <div className="bg-teal-600/90 backdrop-blur-xl px-6 py-3 rounded-[1.5rem] border border-teal-500/50 shadow-2xl animate-in slide-in-from-left-4 duration-300">
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em] block mb-0.5">
                Hovering Mandal
              </span>
              <p className="text-lg font-black text-white tracking-tight uppercase">
                {hoveredMandalName}
              </p>
            </div>
          )}
        </div>

        {mode === "region" && selectedDistricts.length > 0 && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="pointer-events-auto rounded-2xl bg-slate-900 text-white px-8 py-7 shadow-2xl hover:bg-slate-800 transition-all flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <Plus className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-wider">
                Create Region
              </span>
              <span className="text-[10px] opacity-70">
                {selectedDistricts.length} Districts Selected
              </span>
            </div>
          </Button>
        )}

        {mode === "area" && selectedMandals.length > 0 && (
          <Button
            onClick={() => setIsAreaModalOpen(true)}
            className="pointer-events-auto rounded-2xl bg-teal-900 text-white px-8 py-7 shadow-2xl hover:bg-teal-800 transition-all flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <Plus className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-xs font-bold uppercase tracking-wider">
                Create Area
              </span>
              <span className="text-[10px] opacity-70">
                {selectedMandals.length} Mandals Selected
              </span>
            </div>
          </Button>
        )}
      </div>

      {/* Main Map Container */}
      <div className="flex-1 flex flex-col min-h-0 w-full relative">
        <div className="flex-1 m-8 mt-24 relative rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-2xl bg-white">
          <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

          {isLoadingGeoData && (
            <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          )}

          {/* Map Overlay Controls */}
          <div className="absolute bottom-8 right-8 flex flex-col gap-3 pointer-events-none">
            {isZoomed && (
              <button
                onClick={resetView}
                className="pointer-events-auto bg-white/90 backdrop-blur-xl p-4 rounded-2xl border border-slate-200 shadow-xl hover:bg-slate-50 transition-all active:scale-95 group"
                title="Reset View"
              >
                <Maximize2 className="w-5 h-5 text-slate-600 group-hover:scale-110 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Custom Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                Region Setup
              </span>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                Create New Region
              </p>
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Region Name
                </label>
                <Input
                  placeholder="e.g. South Andhra Hub"
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
                  placeholder="e.g. SAH-01"
                  value={regionCode}
                  onChange={(e) => setRegionCode(e.target.value)}
                  className="rounded-2xl border-slate-200 h-14 px-5 focus:ring-blue-500"
                />
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Linked Districts
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDistricts.map((d, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-[10px] font-bold shadow-sm"
                    >
                      {d.name || d.dtname || d.d}
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
              {isCreating && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save Region Configuration
            </Button>
          </div>
        </div>
      )}

      {/* Custom Area Creation Modal */}
      {isAreaModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsAreaModalOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 p-8">
            <button
              onClick={() => setIsAreaModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="flex flex-col gap-1 mb-8">
              <span className="text-[10px] font-bold text-teal-500 uppercase tracking-[0.2em]">
                Area Setup
              </span>
              <p className="text-2xl font-black text-slate-800 tracking-tight">
                Create New Area
              </p>
            </div>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Area Name
                </label>
                <Input
                  placeholder="e.g. West Godavari Hub"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                  className="rounded-2xl border-slate-200 h-14 px-5 focus:ring-teal-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Area Code
                </label>
                <Input
                  placeholder="e.g. WGH-01"
                  value={areaCode}
                  onChange={(e) => setAreaCode(e.target.value)}
                  className="rounded-2xl border-slate-200 h-14 px-5 focus:ring-teal-500"
                />
              </div>

              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Linked Mandals
                </span>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {selectedMandals.map((m, i) => (
                    <div
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-[10px] font-bold shadow-sm"
                    >
                      {m.name || m.mandal_name || m.d || m.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              disabled={isCreatingArea}
              onClick={handleCreateArea}
              className="w-full rounded-2xl bg-teal-900 py-7 text-white font-bold uppercase tracking-widest text-xs hover:bg-teal-800 transition-all active:scale-95 shadow-xl"
            >
              {isCreatingArea && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Save Area Configuration
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelection;
