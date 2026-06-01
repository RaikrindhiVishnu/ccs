import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Successcard from "@/components/ui/Successcard";
import { useAppSelector } from "@/core/hooks";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { decompressGeoJSON } from "../utils/utils";
import { getRegionColors, getAreaColors } from "../utils/colorPalette";
import { Maximize2, ChevronLeft, X, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCreatedArea } from "../store/roleManagerSlice";

import {
  useCreateRegionMutation,
  useCreateAreaMutation,
  useGetAllGeoJsonDataQuery,
  useGetRegionsByCountryIdQuery,
  useGetAllAreasByRegionIdQuery,
} from "../api/regionSelectionApi";

import { useGetRegionOfficerDetailsQuery } from "../api/userDirectoryApi";

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
  regionId: number | string = 1,
): GeoJSON.FeatureCollection {
  const allMandals: MandalItem[] = [];

  data.countries.forEach((country) => {
    country.states?.forEach((state) => {
      state.districts?.forEach((district) => {
        if (districtIds.includes(district.i)) {
          if (district.mandals) {
            const mappedMandals = district.mandals.map((m) => ({
              ...m,
              district_id: district.i,
            }));
            mappedMandals.forEach((m) => {
              if (!allMandals.some((existing) => existing.i === m.i)) {
                allMandals.push(m);
              }
            });
          }
        }
      });
    });
  });

  const assignedMandalMap = new Map<
    number,
    { color: string; areaName: string }
  >();
  if (Array.isArray(areasList)) {
    areasList.forEach((area, idx) => {
      const color = getAreaColors(regionId, idx);
      if (Array.isArray(area.mandal_ids)) {
        area.mandal_ids.forEach((mId: any) => {
          const idNum = Number(mId);
          if (!isNaN(idNum)) {
            assignedMandalMap.set(idNum, {
              color,
              areaName: area.area_name || area.areaName || "",
            });
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

const buildRegionFeatureFromDistricts = (
  rawFeature: any,
  masterData: GeoMasterData,
): GeoJSON.Feature | null => {
  const props = rawFeature.properties || {};
  const stateId = Number(props.state_id);
  const districtIds = getDistrictIdsFromRegion(rawFeature, masterData);
  if (districtIds.length === 0) return null;

  const stateObj = masterData.countries
    .flatMap((c) => c.states ?? [])
    .find((s) => s.i === stateId);
  if (!stateObj) return null;

  const geometries: any[] = districtIds
    .map((id) => stateObj.districts?.find((d) => d.i === id)?.g)
    .filter((g: any) => !!g && !!g.type);

  if (geometries.length === 0) return null;

  return {
    type: "Feature",
    id: props.region_id ?? rawFeature.id,
    geometry: { type: "GeometryCollection", geometries } as any,
    properties: props,
  };
};

/** Build a valid FeatureCollection for regions — synthesizes geometry from district master data when geometry is null (backward-compatible) */
const buildRegionsGeoJSON = (
  rawApiData: any,
  masterData: GeoMasterData,
): GeoJSON.FeatureCollection => {
  try {
    const raw = decompressGeoJSON(rawApiData);
    if (!raw?.features) return { type: "FeatureCollection", features: [] };

    const features: GeoJSON.Feature[] = raw.features
      .map((f: any) => {
        const synthesized =
          f.geometry && f.geometry.type
            ? f
            : buildRegionFeatureFromDistricts(f, masterData);
        if (synthesized) {
          const regionId =
            synthesized.properties?.region_id || synthesized.id || 1;
          const colors = getRegionColors(regionId);
          synthesized.properties = {
            ...synthesized.properties,
            regionColor: colors.fill,
            regionBorderColor: colors.border,
          };
        }
        return synthesized as GeoJSON.Feature;
      })
      .filter((f: any): f is GeoJSON.Feature => !!f);

    return { type: "FeatureCollection", features };
  } catch (err) {
    console.error("Failed to build regions GeoJSON:", err);
    return { type: "FeatureCollection", features: [] };
  }
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

  if (geometry.type === "GeometryCollection") {
    (geometry.geometries as any[]).forEach((g: any) => {
      if (g?.coordinates) extendBounds(g.coordinates);
    });
  } else {
    extendBounds(geometry.coordinates);
  }
  return bounds;
};

const RegionSelection: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);
  const selectedRegionIdRef = useRef<any>(null);

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "region";

  const navigate = useNavigate();
  const [successCardProps, setSuccessCardProps] = useState<any | null>(null);

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
  const [hoveredDistrictName, setHoveredDistrictName] = useState<string | null>(
    null,
  );
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [districtSearchQuery, setDistrictSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formErrors, setFormErrors] = useState<{ regionName?: string; regionCode?: string; districts?: string; general?: string }>({});

  // Area Creation States
  const [selectedMandals, setSelectedMandals] = useState<any[]>([]);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);
  const [areaName, setAreaName] = useState("");
  const [areaCode, setAreaCode] = useState("");

  const [formAreaErrors, setFormAreaErrors] = useState<{ areaName?: string; areaCode?: string; mandals?: string; general?: string }>({});
  const [hoveredMandalName, setHoveredMandalName] = useState<string | null>(
    null,
  );

  // Automatically open/close modals based on selections
  useEffect(() => {
    setIsModalOpen(selectedDistricts.length > 0);
    if (selectedDistricts.length === 0) setFormErrors({});
  }, [selectedDistricts.length]);

  // Click outside to close district dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDistrictDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsAreaModalOpen(selectedMandals.length > 0);
    if (selectedMandals.length === 0) setFormAreaErrors({});
  }, [selectedMandals.length]);

  useEffect(() => {
    selectedRegionIdRef.current =
      selectedRegion?.properties?.region_id ??
      selectedRegion?.properties?.id ??
      selectedRegion?.id ??
      null;
  }, [selectedRegion]);

  const handleRemoveMandal = (mandal: any) => {
    const featId = mandal.id ?? mandal.featureId;
    setSelectedMandals((prev) =>
      prev.filter((m) => (m.id ?? m.featureId) !== featId),
    );
    if (mandal.featureId !== undefined && map.current) {
      map.current.setFeatureState(
        { source: "mandals-source", id: mandal.featureId },
        { selected: false },
      );
    }
  };

  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();
  const regionsQuery = useGetRegionsByCountryIdQuery(
    { country_id: 1 },
    { refetchOnMountOrArgChange: true },
  );
  const regionsByCountryData = regionsQuery.data;

  useEffect(() => {
    console.log("regionsByCountryQuery status:", {
      isLoading: regionsQuery.isLoading,
      isError: regionsQuery.isError,
      error: regionsQuery.error,
      isSuccess: regionsQuery.isSuccess,
      data: regionsQuery.data,
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
      console.error(
        "Failed to parse assigned district IDs from country regions:",
        err,
      );
    }
    return assigned;
  }, [regionsByCountryData, geoMasterData]);

  const selectedRegionId =
    selectedRegion?.properties?.region_id ??
    selectedRegion?.properties?.id ??
    selectedRegion?.id;
  const { data: areasData, refetch: refetchAreas } =
    useGetAllAreasByRegionIdQuery(
      { region_id: Number(selectedRegionId) },
      { skip: !selectedRegionId },
    );

  // Filter country regions for selected state to render emerald overlays in Region Mode
  const stateRegionsData = useMemo(() => {
    const selectedStateId = selectedState?.properties?.id;
    if (!selectedStateId || !regionsByCountryData || !geoMasterData) {
      return { type: "FeatureCollection" as const, features: [] };
    }

    try {
      // Build with synthesized geometry from district master data
      const allRegionsGeoJSON = buildRegionsGeoJSON(
        regionsByCountryData,
        geoMasterData,
      );

      // Gather all district IDs of the selected state
      const stateDistrictIds = new Set<number>();
      const stateObj = geoMasterData.countries
        .flatMap((c) => c.states ?? [])
        .find((s) => s.i === selectedStateId);
      if (stateObj?.districts) {
        stateObj.districts.forEach((d) => stateDistrictIds.add(d.i));
      }

      // Filter regions containing at least one district of this state
      const filtered = allRegionsGeoJSON.features.filter((feature: any) => {
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

  const selectedStateId: number | undefined =
    selectedState?.properties?.id ??
    (selectedRegion?.properties?.state_id
      ? Number(selectedRegion.properties.state_id)
      : undefined) ??
    (selectedRegion?.properties?.stateId
      ? Number(selectedRegion.properties.stateId)
      : undefined);

  const filteredDistricts = useMemo(() => {
    if (!geoMasterData || !selectedStateId) return [];
    const stateObj = geoMasterData.countries
      .flatMap((c) => c.states ?? [])
      .find((s) => s.i === selectedStateId);

    if (!stateObj || !stateObj.districts) return [];

    const districts = stateObj.districts;
    if (!districtSearchQuery.trim()) return districts;

    return districts.filter((d) =>
      d.d.toLowerCase().includes(districtSearchQuery.toLowerCase())
    );
  }, [geoMasterData, selectedStateId, districtSearchQuery]);

  const toggleDistrictSelection = (district: any) => {
    const dtId = district.i;
    const isAssigned = assignedDistrictIds.has(dtId);
    if (isAssigned) {
      toast.warning(`${district.d} is already part of an existing region.`);
      return;
    }

    setSelectedDistricts((prev) => {
      const isAlreadySelected = prev.find(
        (d) => (d.id ?? d.featureId) === dtId
      );

      if (isAlreadySelected) {
        if (map.current) {
          map.current.setFeatureState(
            { source: "districts-source", id: dtId },
            { selected: false }
          );
        }
        return prev.filter((d) => (d.id ?? d.featureId) !== dtId);
      } else {
        if (map.current) {
          map.current.setFeatureState(
            { source: "districts-source", id: dtId },
            { selected: true }
          );
        }
        return [
          ...prev,
          {
            id: dtId,
            code: district.c,
            name: district.d,
            featureId: dtId,
            isAssigned: false,
          },
        ];
      }
    });
  };

  const { data: regionOfficerDetailsRes } = useGetRegionOfficerDetailsQuery(
    {
      state_id: selectedStateId ? String(selectedStateId) : "",
      region_id: selectedRegionId ? String(selectedRegionId) : "",
    },
    {
      skip: !selectedStateId || !selectedRegionId,
    },
  );

  useEffect(() => {
    console.log(
      "RegionSelection Debug - selectedStateId:",
      selectedStateId,
      "selectedRegionId:",
      selectedRegionId,
      "regionOfficerDetails:",
      regionOfficerDetailsRes,
    );
  }, [selectedStateId, selectedRegionId, regionOfficerDetailsRes]);

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
    setDistrictSearchQuery("");
    setDistrictDropdownOpen(false);

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
                toast.warning(
                  `${districtData.name || districtData.d || districtData.description || "This district"} is already part of an existing region.`,
                );
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
              const isAssigned =
                e.features && e.features.length > 0
                  ? e.features[0].properties?.isAssigned
                  : false;
              map.current.getCanvas().style.cursor = isAssigned
                ? "not-allowed"
                : "pointer";
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
        assignedDistrictIds,
      );

      if (!map.current.getSource("districts-source")) {
        map.current.addSource("districts-source", {
          type: "geojson",
          data: districtsGeoJSON,
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
            const dName =
              e.features[0].properties?.d ||
              e.features[0].properties?.name ||
              e.features[0].properties?.description ||
              "";
            setHoveredDistrictName(dName || null);

            if (dName && map.current && popup.current) {
              popup.current
                .setLngLat(e.lngLat)
                .setHTML(
                  `<div style="font-weight: 700; color: #1e293b;">${dName}</div>`,
                )
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
                "fill-color": ["coalesce", ["get", "regionColor"], "#10b981"],
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
                "line-color": [
                  "coalesce",
                  ["get", "regionBorderColor"],
                  "#059669",
                ],
                "line-width": 1.8,
              },
            },
            "states-border-line",
          );

          // Hover effect for regions
          let hoveredRegionId: any = null;
          map.current?.on("mousemove", "regions-fill", (e) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              const props = feature.properties || {};
              const newId = feature.id;
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

              const regionName =
                props.region_name || props.regionName || props.name || "Region";
              let districtLabel = "";
              if (Array.isArray(props.districts)) {
                districtLabel = props.districts
                  .map(
                    (d: any) =>
                      d?.name || d?.d || d?.district_name || d?.districtName,
                  )
                  .filter(Boolean)
                  .join(", ");
              } else if (typeof props.all_districts === "string") {
                districtLabel = props.all_districts;
              } else if (Array.isArray(props.district_ids)) {
                districtLabel = props.district_ids.join(", ");
              }
              const html = `
                <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.3;">
                  <div style="font-weight:700;font-size:13px;color:#0f172a;">${regionName}</div>
                  ${districtLabel ? `<div style="font-size:11px;color:#475569;margin-top:4px;">${districtLabel}</div>` : ""}
                </div>
              `;
              if (map.current && popup.current) {
                popup.current
                  .setLngLat(e.lngLat)
                  .setHTML(html)
                  .addTo(map.current);
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
            popup.current?.remove();
          });
        } else {
          const source = map.current.getSource(
            "regions-source",
          ) as maplibregl.GeoJSONSource;
          source.setData(stateRegionsData);
        }
      } catch (err) {
        console.error(
          "Failed to render regions from filtered state data:",
          err,
        );
      }
    } else if (map.current?.getSource("regions-source")) {
      const source = map.current.getSource(
        "regions-source",
      ) as maplibregl.GeoJSONSource;
      source.setData({ type: "FeatureCollection", features: [] });
    }
  }, [selectedState, stateRegionsData, mapLoaded]);

  // Effect to dynamically update (or create) mandals-source when areasData or selectedRegion updates
  useEffect(() => {
    if (!map.current || !geoMasterData || !selectedRegion) return;

    try {
      const districtIds = getDistrictIdsFromRegion(
        selectedRegion,
        geoMasterData,
      );
      if (districtIds.length === 0) return;

      const areasList = areasData?.data || [];
      const regionId =
        selectedRegion?.properties?.region_id || selectedRegion?.id || 1;
      const mandalsGeoJSON = extractMandalsGeoJSON(
        geoMasterData,
        districtIds,
        areasList,
        regionId,
      );

      const existingSource = map.current.getSource("mandals-source") as
        | maplibregl.GeoJSONSource
        | undefined;

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
            const isAssigned =
              e.features && e.features.length > 0
                ? e.features[0].properties?.isAssigned
                : false;
            map.current.getCanvas().style.cursor = isAssigned
              ? "not-allowed"
              : "pointer";
          }
        });

        map.current.on("click", "mandals-fill", (ev) => {
          if (ev.features && ev.features.length > 0) {
            const feature = ev.features[0];
            const mData = feature.properties;
            const mId = mData?.id ?? feature.id;

            if (mData?.isAssigned) {
              const nameText = mData.areaName
                ? `assigned to Area "${mData.areaName}"`
                : "assigned to an existing area";
              toast.warning(
                `${mData.name || "This mandal"} is already ${nameText}.`,
              );
              return;
            }

            setSelectedMandals((prev) => {
              const isAlreadySelected = prev.find(
                (m) => (m.id ?? m.featureId) === mId,
              );
              if (isAlreadySelected) {
                map.current?.setFeatureState(
                  { source: "mandals-source", id: feature.id },
                  { selected: false },
                );
                return prev.filter((m) => (m.id ?? m.featureId) !== mId);
              } else {
                map.current?.setFeatureState(
                  { source: "mandals-source", id: feature.id },
                  { selected: true },
                );
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
              const areaTag =
                isAssigned && areaName
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

              popup.current
                .setLngLat(ev.lngLat)
                .setHTML(html)
                .addTo(map.current);
            }

            if (hoveredMandalId !== null) {
              map.current?.setFeatureState(
                { source: "mandals-source", id: hoveredMandalId },
                { hover: false },
              );
            }
            hoveredMandalId = mId !== undefined && mId !== null ? mId : null;
            if (hoveredMandalId !== null) {
              map.current?.setFeatureState(
                { source: "mandals-source", id: hoveredMandalId },
                { hover: true },
              );
            }
          }
        });

        map.current.on("mouseleave", "mandals-fill", () => {
          if (map.current) map.current.getCanvas().style.cursor = "";
          setHoveredMandalName(null);
          popup.current?.remove();
          if (hoveredMandalId !== null) {
            map.current?.setFeatureState(
              { source: "mandals-source", id: hoveredMandalId },
              { hover: false },
            );
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
    if (map.current && regionsByCountryData && geoMasterData) {
      try {
        // Synthesize valid geometry from district master data (handles geometry:null from API)
        const finalData = buildRegionsGeoJSON(
          regionsByCountryData,
          geoMasterData,
        );

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
                  "fill-color": ["coalesce", ["get", "regionColor"], "#8b5cf6"],
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
                  "line-color": [
                    "coalesce",
                    ["get", "regionBorderColor"],
                    "#6d28d9",
                  ],
                  "line-width": 1.5,
                },
              },
              "states-border-line",
            );

            // Click Handler for dynamic zoom & mandals rendering in Area Mode
            map.current?.on("click", "country-regions-fill", (e) => {
              if (mode !== "area") return;
              if (e.features && e.features.length > 0) {
                const feature = e.features[0];
                const clickedId =
                  feature.properties?.region_id ??
                  feature.properties?.id ??
                  feature.id;
                const currentId = selectedRegionIdRef.current;
                if (clickedId !== currentId) {
                  setSelectedMandals((prev) => {
                    prev.forEach((m) => {
                      const featId =
                        m.featureId !== undefined ? m.featureId : m.id;
                      if (featId !== undefined) {
                        map.current?.setFeatureState(
                          { source: "mandals-source", id: featId },
                          { selected: false },
                        );
                      }
                    });
                    return [];
                  });
                }
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
                console.log(
                  "Region clicked in Area Mode. District IDs will be resolved by the useEffect.",
                );
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
                const feature = e.features[0];
                const props = feature.properties || {};
                const newId = feature.id;
                hoveredRegionId =
                  newId !== undefined && newId !== null ? newId : null;
                if (hoveredRegionId !== null) {
                  map.current?.setFeatureState(
                    { source: "country-regions-source", id: hoveredRegionId },
                    { hover: true },
                  );
                }

                const regionName =
                  props.region_name ||
                  props.regionName ||
                  props.name ||
                  "Region";
                let districtLabel = "";
                if (Array.isArray(props.districts)) {
                  districtLabel = props.districts
                    .map(
                      (d: any) =>
                        d?.name || d?.d || d?.district_name || d?.districtName,
                    )
                    .filter(Boolean)
                    .join(", ");
                } else if (typeof props.all_districts === "string") {
                  districtLabel = props.all_districts;
                } else if (Array.isArray(props.district_ids)) {
                  districtLabel = props.district_ids.join(", ");
                }
                const html = `
                  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.3;">
                    <div style="font-weight:700;font-size:13px;color:#0f172a;">${regionName}</div>
                    ${districtLabel ? `<div style="font-size:11px;color:#475569;margin-top:4px;">${districtLabel}</div>` : ""}
                  </div>
                `;
                if (map.current && popup.current) {
                  popup.current
                    .setLngLat(e.lngLat)
                    .setHTML(html)
                    .addTo(map.current);
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
              popup.current?.remove();
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

        // Always keep regions visible — click handler already blocks selection in region mode
        // When a state is selected, the emerald regions-source overlay shows state-filtered regions
        const visibility = "visible";

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

  const handleRemoveDistrict = (district: any) => {
    const dtId = district.id ?? district.featureId;
    setSelectedDistricts((prev) =>
      prev.filter((d) => (d.id ?? d.featureId) !== dtId),
    );
    if (district.featureId !== undefined && map.current) {
      map.current.setFeatureState(
        { source: "districts-source", id: district.featureId },
        { selected: false },
      );
    }
  };

  const handleCreateRegion = async () => {
    const errors: any = {};
    if (!regionName.trim()) {
      errors.regionName = "Region Name is required";
    } else if (regionName.length > 30) {
      errors.regionName = "Region Name cannot exceed 30 characters";
    }
    if (!regionCode.trim()) errors.regionCode = "Region Code is required";
    if (selectedDistricts.length === 0) errors.districts = "Please select at least one district";

    if (Object.keys(errors).length > 0) {
      errors.general = "Please fill in all fields and select districts";
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    try {
      const districtIds = selectedDistricts.map((d) =>
        Number(d.id ?? d.featureId),
      );

      const res = await createRegion({
        regionName,
        regionCode,
        roleManagerId: Number(currentUser?.id || 10),
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

      const now = new Date();
      const createdRegionId =
        res?.responseData?.region_id ||
        res?.data?.region_id ||
        res?.region_id ||
        res?.data?.id ||
        res?.id ||
        1;

      // Show Successcard
      setSuccessCardProps({
        badgeLabel: "Region Creation",
        titleLine1: "Region",
        titleLine2: "Created Successfully!",
        redirectText: "Redirecting to the Assigning Officers Page...",
        regionName: regionName,
        assignedId: res?.data?.region_code || res?.regionCode || regionCode,
        createdDate: now.toLocaleDateString(),
        createdTime: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        regionId: createdRegionId,
        selectedDistricts: [...selectedDistricts],
      });

      setSelectedDistricts([]);
      setIsModalOpen(false);
      setRegionName("");
      setRegionCode("");
    } catch (err) {
      console.error("Failed to create region:", err);
      const errorMsg = (err as any)?.data?.message || (err as any)?.message || "Failed to create region";
      toast.error(errorMsg);
    }
  };
  const handleCreateArea = async () => {
    const errors: any = {};
    if (!areaName.trim()) {
      errors.areaName = "Area Name is required";
    } else if (areaName.length > 30) {
      errors.areaName = "Area Name cannot exceed 30 characters";
    }
    if (!areaCode.trim()) errors.areaCode = "Area Code is required";
    if (selectedMandals.length === 0) errors.mandals = "Please select at least one mandal";

    if (Object.keys(errors).length > 0) {
      errors.general = "Please fill in all area fields and select mandals";
      setFormAreaErrors(errors);
      return;
    }
    setFormAreaErrors({});

    try {
      const assignments = selectedMandals.map((m) => ({
        district_id: Number(m.district_id || 5), // Injected district_id fallback to 5
        mandal_id: Number(m.id ?? m.featureId),
      }));

      const fetchedRegionalOfficerId =
        regionOfficerDetailsRes?.data?.regional_officer_id;

      const res = await createArea({
        areaName,
        area_code: areaCode,
        region_id: Number(selectedRegionId),
        roleManagerId: Number(currentUser?.id || 10),
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

      const now = new Date();
      const createdAreaId =
        res?.responseData?.area_id ||
        res?.data?.area_id ||
        res?.area_id ||
        res?.data?.id ||
        res?.id;

      if (!createdAreaId) {
        toast.error("Area created but ID missing in response");
        return;
      }

      dispatch(
        setCreatedArea({
          area_id: createdAreaId,
          area_name:
            res?.responseData?.area_name || res?.data?.area_name || areaName,
          area_code:
            res?.responseData?.area_code || res?.data?.area_code || areaCode,
          regional_officer_id: fetchedRegionalOfficerId,
        }),
      );

      // Show Successcard
      setSuccessCardProps({
        badgeLabel: "Area Creation",
        titleLine1: "Area",
        titleLine2: "Created Successfully!",
        redirectText: "Redirecting to the Assigning Field Officer Page...",
        regionName: areaName,
        assignedId: res?.data?.area_code || res?.areaCode || areaCode,
        createdDate: now.toLocaleDateString(),
        createdTime: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        areaId: createdAreaId, // already correct now since createdAreaId is fixed above
        selectedMandals: [...selectedMandals],
        regionalOfficerId: fetchedRegionalOfficerId
          ? Number(fetchedRegionalOfficerId)
          : 2,
      });

      setSelectedMandals([]);
      setIsAreaModalOpen(false);
      setAreaName("");
      setAreaCode("");
    } catch (err) {
      console.error("Failed to create area:", err);
      const errorMsg = (err as any)?.data?.message || (err as any)?.message || "Failed to create area";
      toast.error(errorMsg);
    }
  };

  if (successCardProps) {
    return (
      <Successcard
        {...successCardProps}
        onRedirect={() => {
          if (successCardProps.badgeLabel === "Region Creation") {
            navigate("/role-manager/assign-officers", {
              state: {
                regionId: successCardProps.regionId,
                regionName: successCardProps.regionName,
                assignedId: successCardProps.assignedId,
                createdDate: successCardProps.createdDate,
                createdTime: successCardProps.createdTime,
                selectedDistricts: successCardProps.selectedDistricts,
                stateId: selectedStateId,
              },
            });
          } else {
            const roleManagerFullName =
              `${currentUser?.first_name || ""} ${currentUser?.last_name || ""}`.trim() ||
              "RM Sravan Kumar";
            navigate("/role-manager/assign-field-officer", {
              state: {
                areaId: successCardProps.areaId,
                areaName: successCardProps.regionName,
                assignedId: successCardProps.assignedId,
                createdDate: successCardProps.createdDate,
                createdTime: successCardProps.createdTime,
                selectedMandals: successCardProps.selectedMandals,
                regionalOfficerId: successCardProps.regionalOfficerId,
                roleManagerName: roleManagerFullName,
                stateId: selectedStateId,
              },
            });
          }
        }}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50/50 relative">
      {/* Dynamic Header */}
      <div className="absolute top-8 left-8 right-8 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <button
            onClick={() => {
              if (selectedState || selectedRegion) {
                resetView();
              } else {
                navigate("/role-manager/create-regions-and-areas");
              }
            }}
            className="p-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white/90 hover:scale-105 active:scale-95 transition-all pointer-events-auto flex items-center justify-center"
            title={
              selectedState || selectedRegion
                ? "Back to States"
                : "Back to Menu"
            }
          >
            <ChevronLeft className="w-4 h-4 text-slate-700 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="bg-white/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/45 shadow-md flex flex-col gap-0.5">
            <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.18em] block leading-none mb-0.5">
              {mode === "area" ? "Area Management" : "Region Management"}
            </span>
            <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-none uppercase">
              {mode === "area" ? "Create Area" : "Create Region"}
            </p>
          </div>

          {mode === "region" && selectedState && (
            <div className="bg-white/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/45 shadow-md animate-in slide-in-from-left-4 duration-500 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Viewing State
              </span>
              <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-none uppercase">
                {selectedState.properties?.name ||
                  selectedState.properties?.STNAME ||
                  ""}
              </p>
            </div>
          )}

          {mode === "region" && selectedState && hoveredDistrictName && (
            <div className="bg-blue-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-blue-500/30 shadow-md animate-in slide-in-from-left-4 duration-300 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-blue-700 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Hovering District
              </span>
              <p className="text-sm font-extrabold text-blue-900 tracking-tight leading-none uppercase">
                {hoveredDistrictName}
              </p>
            </div>
          )}

          {mode === "area" && selectedState && !selectedRegion && (
            <div className="bg-white/75 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/45 shadow-md animate-in slide-in-from-left-4 duration-500 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-blue-600 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Viewing State
              </span>
              <p className="text-sm font-extrabold text-slate-800 tracking-tight leading-none uppercase">
                {selectedState.properties?.name ||
                  selectedState.properties?.STNAME ||
                  ""}
              </p>
            </div>
          )}

          {mode === "area" && selectedRegion && (
            <div className="bg-purple-500/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-purple-500/30 shadow-md animate-in slide-in-from-left-4 duration-500 flex flex-col gap-0.5">
              <span className="text-[9px] font-bold text-purple-700 uppercase tracking-[0.18em] block leading-none mb-0.5">
                Viewing Region
              </span>
              <p className="text-sm font-extrabold text-purple-900 tracking-tight leading-none uppercase">
                {selectedRegion.properties?.region_name || "Operational Region"}
              </p>
            </div>
          )}

          {mode === "area" && selectedRegion && hoveredMandalName && (
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

      {/* Main Map Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          ref={mapContainer}
          className="absolute inset-0 w-full h-full bg-white"
        />

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

      {/* Custom Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-y-0 right-0 z-[100] flex items-center pr-8 pointer-events-none">
          <div className="relative flex flex-col gap-4 pointer-events-auto items-end">
            {formErrors.general && (
              <div className="w-[430px] bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600 shadow-sm animate-in slide-in-from-top-2">
                <div className="bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-white font-bold text-xs shrink-0">!</div>
                <span className="font-medium text-sm">{formErrors.general}</span>
              </div>
            )}
            <div className="relative w-[430px] h-auto min-h-[489px] flex flex-col bg-white rounded-[24px] border border-[#E1E5EF] shadow-lg overflow-hidden animate-in slide-in-from-right duration-300 p-[28px] pointer-events-auto">
              <div className="flex items-start justify-between mb-[26px]">
                <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0 w-[20px] h-[20px] rounded-[4px] bg-[#353535] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="text-[24px] font-bold text-[#353535] font-['Plus_Jakarta_Sans'] leading-[30px]">
                      Create Region
                    </h3>
                    <p className="text-[16px] text-[#353535] font-['Inter'] leading-[19px]">
                      Creating regions in {selectedState?.properties?.name || selectedState?.properties?.STNAME || "Andhra Pradesh"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    selectedDistricts.forEach((d) => {
                      const featId = d.featureId !== undefined ? d.featureId : d.id;
                      if (featId !== undefined && map.current) {
                        map.current.setFeatureState(
                          { source: "districts-source", id: featId },
                          { selected: false },
                        );
                      }
                    });
                    setSelectedDistricts([]);
                  }}
                  className="p-1.5 rounded-full hover:bg-slate-100 transition-colors border border-transparent shadow-sm cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] font-bold text-[rgba(53,53,53,0.8)] font-['Plus_Jakarta_Sans'] leading-[18px]">
                    Enter Region Name
                  </label>
                  <div className="relative">
                    <input
                      placeholder="e.g. Nellore"
                      value={regionName}
                      maxLength={30}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRegionName(val);
                        if (val.length >= 30) {
                          setFormErrors({ ...formErrors, regionName: "Maximum 30 characters allowed", general: undefined });
                        } else if (formErrors.regionName) {
                          setFormErrors({ ...formErrors, regionName: undefined, general: undefined });
                        }
                      }}
                      className={`h-[40px] w-full rounded-[12px] border ${formErrors.regionName ? 'border-red-500' : 'border-[#E1E5EF]'} bg-white px-3 text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#353535] placeholder-[rgba(90,92,94,0.6)] outline-none focus:border-[#2780C4] transition-colors`}
                    />
                  </div>
                  {formErrors.regionName && <span className="text-red-500 text-xs mt-[-4px]">{formErrors.regionName}</span>}
                </div>

                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] font-bold text-[rgba(53,53,53,0.8)] font-['Plus_Jakarta_Sans'] leading-[18px]">
                    Enter Region Code
                  </label>
                  <div className="relative">
                    <input
                      placeholder="e.g. SAH-01"
                      value={regionCode}
                      onChange={(e) => {
                        setRegionCode(e.target.value);
                        if (formErrors.regionCode) setFormErrors({ ...formErrors, regionCode: undefined, general: undefined });
                      }}
                      className={`h-[40px] w-full rounded-[12px] border ${formErrors.regionCode ? 'border-red-500' : 'border-[#E1E5EF]'} bg-white px-3 text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#353535] placeholder-[rgba(90,92,94,0.6)] outline-none focus:border-[#2780C4] transition-colors`}
                    />
                  </div>
                  {formErrors.regionCode && <span className="text-red-500 text-xs mt-[-4px]">{formErrors.regionCode}</span>}
                </div>

                <div ref={dropdownRef} className="flex flex-col gap-[12px] relative">
                  <label className="text-[14px] font-bold text-[rgba(53,53,53,0.8)] font-['Plus_Jakarta_Sans'] leading-[18px]">
                    Tag Sub-Regions
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDistrictDropdownOpen(!districtDropdownOpen)}
                      className={`h-[40px] w-full rounded-[12px] border ${formErrors.districts ? 'border-red-500' : 'border-[#E1E5EF]'} bg-white px-3 flex items-center justify-between text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#353535] outline-none focus:border-[#2780C4] transition-all hover:bg-slate-50/50`}
                    >
                      <span className="truncate">
                        {selectedDistricts.length > 0
                          ? `${selectedDistricts.length} District(s) Selected`
                          : "Select Districts"}
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                          districtDropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {districtDropdownOpen && (
                      <div className="mt-2 bg-white border border-[#E1E5EF] rounded-[16px] shadow-md p-3 flex flex-col gap-2 max-h-[200px] overflow-y-auto">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search district..."
                            value={districtSearchQuery}
                            onChange={(e) => setDistrictSearchQuery(e.target.value)}
                            className="h-[36px] w-full rounded-[8px] border border-[#E1E5EF] px-3 pl-8 text-[13px] font-['Plus_Jakarta_Sans'] outline-none focus:border-[#2780C4] transition-colors"
                          />
                          <svg
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-1">
                          {filteredDistricts.length > 0 ? (
                            filteredDistricts.map((district) => {
                              const isAssigned = assignedDistrictIds.has(district.i);
                              const isSelected = selectedDistricts.some(
                                (d) => (d.id ?? d.featureId) === district.i
                              );

                              return (
                                <div
                                  key={district.i}
                                  onClick={() => toggleDistrictSelection(district)}
                                  className={`flex items-center justify-between px-3 py-2 rounded-[8px] cursor-pointer text-[13px] font-medium transition-colors ${
                                    isAssigned
                                      ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                                      : isSelected
                                      ? "bg-blue-50 text-[#2780C4] hover:bg-blue-100"
                                      : "hover:bg-slate-50 text-slate-700"
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    {!isAssigned && (
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        readOnly
                                        className="rounded border-slate-300 text-[#2780C4] focus:ring-[#2780C4]"
                                      />
                                    )}
                                    <span>{district.d}</span>
                                  </div>

                                  {isAssigned && (
                                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                                     
                                      <svg
                                        className="w-4 h-4 text-emerald-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center text-slate-400 text-xs py-4">
                              No districts found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  {formErrors.districts && <span className="text-red-500 text-xs mt-[-4px]">{formErrors.districts}</span>}
                  
                  <div className="flex flex-wrap gap-[10px] mt-1 max-h-24 overflow-y-auto custom-scrollbar">
                    {selectedDistricts
                      .map((d, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            handleRemoveDistrict(d);
                            if (selectedDistricts.length <= 1) setFormErrors({...formErrors, districts: "Please select at least one district.", general: "Please fill in all fields and select districts"});
                          }}
                          className="h-[40px] px-[25px] rounded-[9px] bg-white border border-[rgba(90,92,94,0.4)] flex items-center justify-center gap-[10px] cursor-pointer hover:bg-slate-50 transition-colors group"
                        >
                          <span className="text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#2780C4] leading-[18px]">
                            {d.name || d.dtname || d.d}
                          </span>
                          <X className="w-[12px] h-[12px] text-[rgba(90,92,94,0.7)] group-hover:text-red-500" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-[20px] flex justify-center">
                <button
                  disabled={isCreating}
                  onClick={handleCreateRegion}
                  className="w-[374px] h-[54px] bg-[#2780C4] rounded-[100px] flex items-center justify-center gap-[3.21px] hover:bg-[#1E6B9B] transition-colors active:scale-[0.98] disabled:opacity-70"
                >
                  {isCreating && <Loader2 className="w-4 h-4 text-white animate-spin mr-2" />}
                  <span className="text-[12px] font-semibold text-white font-['Plus_Jakarta_Sans'] leading-[15px]">
                    Save Region
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Area Creation Modal */}
      {isAreaModalOpen && (
        <div className="fixed inset-y-0 right-0 z-[100] flex items-center pr-8 pointer-events-none">
          <div className="relative flex flex-col gap-4 pointer-events-auto items-end">
            {formAreaErrors.general && (
              <div className="w-[430px] bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3 text-red-600 shadow-sm animate-in slide-in-from-top-2">
                <div className="bg-red-600 rounded-full w-5 h-5 flex items-center justify-center text-white font-bold text-xs shrink-0">!</div>
                <span className="font-medium text-sm">{formAreaErrors.general}</span>
              </div>
            )}
            <div className="relative w-[430px] h-auto min-h-[489px] flex flex-col bg-white rounded-[24px] border border-[#E1E5EF] shadow-lg overflow-hidden animate-in slide-in-from-right duration-300 p-[28px] pointer-events-auto">
              <div className="flex items-start justify-between mb-[26px]">
                <div className="flex gap-3">
                  <div className="mt-1 flex-shrink-0 w-[20px] h-[20px] rounded-[4px] bg-[#353535] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    <h3 className="text-[24px] font-bold text-[#353535] font-['Plus_Jakarta_Sans'] leading-[30px]">
                      Create Area
                    </h3>
                    <p className="text-[16px] text-[#353535] font-['Inter'] leading-[19px]">
                      Area Setup for Region
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    selectedMandals.forEach((m) => {
                      const featId = m.featureId !== undefined ? m.featureId : m.id;
                      if (featId !== undefined && map.current) {
                        map.current.setFeatureState(
                          { source: "mandals-source", id: featId },
                          { selected: false },
                        );
                      }
                    });
                    setSelectedMandals([]);
                  }}
                  className="p-1.5 rounded-full hover:bg-slate-100 transition-colors border border-transparent shadow-sm cursor-pointer"
                >
                  <X className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-1">
                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] font-bold text-[rgba(53,53,53,0.8)] font-['Plus_Jakarta_Sans'] leading-[18px]">
                    Enter Area Name
                  </label>
                  <div className="relative">
                    <input
                      placeholder="e.g. West Godavari Hub"
                      value={areaName}
                      maxLength={30}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAreaName(val);
                        if (val.length >= 30) {
                          setFormAreaErrors({ ...formAreaErrors, areaName: "Maximum 30 characters allowed", general: undefined });
                        } else if (formAreaErrors.areaName) {
                          setFormAreaErrors({ ...formAreaErrors, areaName: undefined, general: undefined });
                        }
                      }}
                      className={`h-[40px] w-full rounded-[12px] border ${formAreaErrors.areaName ? 'border-red-500' : 'border-[#E1E5EF]'} bg-white px-3 text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#353535] placeholder-[rgba(90,92,94,0.6)] outline-none focus:border-[#2780C4] transition-colors`}
                    />
                  </div>
                  {formAreaErrors.areaName && <span className="text-red-500 text-xs mt-[-4px]">{formAreaErrors.areaName}</span>}
                </div>

                <div className="flex flex-col gap-[12px]">
                  <label className="text-[14px] font-bold text-[rgba(53,53,53,0.8)] font-['Plus_Jakarta_Sans'] leading-[18px]">
                    Enter Area Code
                  </label>
                  <div className="relative">
                    <input
                      placeholder="e.g. WGH-01"
                      value={areaCode}
                      onChange={(e) => {
                        setAreaCode(e.target.value);
                        if (formAreaErrors.areaCode) setFormAreaErrors({ ...formAreaErrors, areaCode: undefined, general: undefined });
                      }}
                      className={`h-[40px] w-full rounded-[12px] border ${formAreaErrors.areaCode ? 'border-red-500' : 'border-[#E1E5EF]'} bg-white px-3 text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#353535] placeholder-[rgba(90,92,94,0.6)] outline-none focus:border-[#2780C4] transition-colors`}
                    />
                  </div>
                  {formAreaErrors.areaCode && <span className="text-red-500 text-xs mt-[-4px]">{formAreaErrors.areaCode}</span>}
                </div>

                <div className="flex flex-col gap-[12px]">
                  {/* <label className="text-[14px] font-bold text-[rgba(53,53,53,0.8)] font-['Plus_Jakarta_Sans'] leading-[18px]">
                    Tag Sub-Areas (Mandals)
                  </label>
                  <div className="relative">
                    <Search size={20} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[rgba(93,93,93,0.6)]" />
                    <input
                      placeholder="Search"
                      value={mandalSearch}
                      onChange={(e) => setMandalSearch(e.target.value)}
                      className={`h-[40px] w-full rounded-[12px] border ${formAreaErrors.mandals ? 'border-red-500' : 'border-[#E1E5EF]'} bg-white pl-[40px] pr-3 text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#353535] placeholder-[rgba(90,92,94,0.6)] outline-none focus:border-[#2780C4] transition-colors`}
                    />
                  </div> */}
                  {formAreaErrors.mandals && <span className="text-red-500 text-xs mt-[-4px]">{formAreaErrors.mandals}</span>}
                  
                  <div className="flex flex-wrap gap-[10px] mt-1 max-h-24 overflow-y-auto custom-scrollbar">
                    {selectedMandals
                      .map((m, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            handleRemoveMandal(m);
                            if (selectedMandals.length <= 1) setFormAreaErrors({...formAreaErrors, mandals: "Please select at least one mandal.", general: "Please fill in all area fields and select mandals"});
                          }}
                          className="h-[40px] px-[25px] rounded-[9px] bg-white border border-[rgba(90,92,94,0.4)] flex items-center justify-center gap-[10px] cursor-pointer hover:bg-slate-50 transition-colors group"
                        >
                          <span className="text-[14px] font-medium font-['Plus_Jakarta_Sans'] text-[#2780C4] leading-[18px]">
                            {m.name || m.dtname || m.d || m.mandal_name}
                          </span>
                          <X className="w-[12px] h-[12px] text-[rgba(90,92,94,0.7)] group-hover:text-red-500" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <div className="mt-[20px] flex justify-center">
                <button
                  disabled={isCreatingArea}
                  onClick={handleCreateArea}
                  className="w-[374px] h-[54px] bg-[#2780C4] rounded-[100px] flex items-center justify-center gap-[3.21px] hover:bg-[#1E6B9B] transition-colors active:scale-[0.98] disabled:opacity-70"
                >
                  {isCreatingArea && <Loader2 className="w-4 h-4 text-white animate-spin mr-2" />}
                  <span className="text-[12px] font-semibold text-white font-['Plus_Jakarta_Sans'] leading-[15px]">
                    Save Area
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelection;
