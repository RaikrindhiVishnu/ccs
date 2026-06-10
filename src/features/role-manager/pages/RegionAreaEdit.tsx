import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { decompressGeoJSON } from "../utils/utils";
import { getRegionColors, getAreaColors } from "../utils/colorPalette";
import { ChevronLeft, X, Loader2, Search, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaEditSelector } from "../components/AreaEditSelector";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  useGetAllGeoJsonDataQuery,
  useGetRegionsByCountryIdQuery,
  useUpdateRegionMutation,
  useUpdateAreaMutation,
  useGetAllAreasByRegionIdQuery,
  useGetRegionsByStateIdQuery,
  useGetRegionGeoJsonQuery,
  useLazyGetRegionGeoJsonQuery,
  useGetAreaGeoJsonQuery,
  useLazyGetAllAreasByRegionIdQuery,
} from "../api/regionSelectionApi";
import {
  useGetAllRegionalOfficersMutation,
  useGetAllIntelligenceOfficersMutation,
  useGetAllFieldOfficersMutation,
} from "../api/roleManagerApi";

// ─── Types ──────────────────────────────────────────────────────────────────
interface GeoMasterItem {
  c: string;
  d: string;
  g: { type: string; coordinates: any[] };
  i: number;
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

// ─── GeoJSON Helpers ────────────────────────────────────────────────────────
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

/**
 * Helper to extract unique coordinate vertices from a GeoJSON geometry.
 * Rounds coordinates to 5 decimal places (~1.1 meter precision) for robust snapping.
 */
function getGeometryVertices(geometry: any): Set<string> {
  const vertices = new Set<string>();

  const extract = (coords: any) => {
    if (!coords) return;
    if (typeof coords[0] === "number") {
      const lng = coords[0].toFixed(5);
      const lat = coords[1].toFixed(5);
      vertices.add(`${lng},${lat}`);
    } else if (Array.isArray(coords)) {
      coords.forEach(extract);
    }
  };

  if (geometry && geometry.coordinates) {
    extract(geometry.coordinates);
  }
  return vertices;
}

/**
 * Checks if two mandal geometries share at least one boundary vertex (i.e. they are adjacent)
 */
function areGeometriesAdjacent(geom1: any, geom2: any): boolean {
  if (!geom1 || !geom2) return false;
  const vertices1 = getGeometryVertices(geom1);
  const vertices2 = getGeometryVertices(geom2);

  for (const coord of vertices1) {
    if (vertices2.has(coord)) {
      return true;
    }
  }
  return false;
}

/**
 * Traverses geoMasterData to find a mandal's geometry by its ID.
 */
function findMandalGeometry(mandalId: number, geoData: any): any {
  if (!geoData || !geoData.countries) return null;
  let foundGeom: any = null;

  for (const country of geoData.countries) {
    if (!country.states) continue;
    for (const state of country.states) {
      if (!state.districts) continue;
      for (const district of state.districts) {
        if (!district.mandals) continue;
        for (const mandal of district.mandals) {
          if (Number(mandal.i) === mandalId) {
            foundGeom = mandal.g;
            return foundGeom;
          }
        }
      }
    }
  }
  return null;
}

/**
 * Performs a Breadth-First Search (BFS) over selected mandals to verify they are connected.
 */
function isSelectionContiguous(selectedIds: number[], geoData: any): boolean {
  if (selectedIds.length <= 1) return true;

  const geometries = new Map<number, any>();
  selectedIds.forEach((id) => {
    const geom = findMandalGeometry(id, geoData);
    if (geom) {
      geometries.set(id, geom);
    }
  });

  const visited = new Set<number>();
  const queue: number[] = [selectedIds[0]];
  visited.add(selectedIds[0]);

  let head = 0;
  while (head < queue.length) {
    const currentId = queue[head++];
    const currentGeom = geometries.get(currentId);
    if (!currentGeom) continue;

    selectedIds.forEach((otherId) => {
      if (!visited.has(otherId)) {
        const otherGeom = geometries.get(otherId);
        if (otherGeom && areGeometriesAdjacent(currentGeom, otherGeom)) {
          visited.add(otherId);
          queue.push(otherId);
        }
      }
    });
  }

  return visited.size === selectedIds.length;
}

/**
 * Traverses geoMasterData to find a district's geometry by its ID.
 */
function findDistrictGeometry(districtId: number, geoData: any): any {
  if (!geoData || !geoData.countries) return null;
  for (const country of geoData.countries) {
    if (!country.states) continue;
    for (const state of country.states) {
      if (!state.districts) continue;
      for (const district of state.districts) {
        if (Number(district.i) === districtId) {
          return district.g;
        }
      }
    }
  }
  return null;
}

/**
 * Performs a Breadth-First Search (BFS) over selected districts to verify they are connected.
 */
function isDistrictSelectionContiguous(selectedIds: number[], geoData: any): boolean {
  if (selectedIds.length <= 1) return true;

  const geometries = new Map<number, any>();
  selectedIds.forEach((id) => {
    const geom = findDistrictGeometry(id, geoData);
    if (geom) {
      geometries.set(id, geom);
    }
  });

  const visited = new Set<number>();
  const queue: number[] = [selectedIds[0]];
  visited.add(selectedIds[0]);

  let head = 0;
  while (head < queue.length) {
    const currentId = queue[head++];
    const currentGeom = geometries.get(currentId);
    if (!currentGeom) continue;

    selectedIds.forEach((otherId) => {
      if (!visited.has(otherId)) {
        const otherGeom = geometries.get(otherId);
        if (otherGeom && areGeometriesAdjacent(currentGeom, otherGeom)) {
          visited.add(otherId);
          queue.push(otherId);
        }
      }
    });
  }

  return visited.size === selectedIds.length;
}

function extractCountriesGeoJSON(
  data: GeoMasterData,
): GeoJSON.FeatureCollection {
  return toFeatureCollection(data.countries);
}

function extractStatesGeoJSON(data: GeoMasterData): GeoJSON.FeatureCollection {
  return toFeatureCollection(data.countries.flatMap((c) => c.states ?? []));
}

function extractDistrictsGeoJSON(
  data: GeoMasterData,
  stateId: number,
  assignedIds: Set<number>,
  selectedIds?: Set<number>,
): GeoJSON.FeatureCollection {
  const state = data.countries
    .flatMap((c) => c.states ?? [])
    .find((s) => s.i === stateId);
  if (!state) return { type: "FeatureCollection", features: [] };
  return toFeatureCollection(state.districts ?? [], (item) => ({
    isAssigned: assignedIds.has(item.i),
    isSelected: selectedIds ? selectedIds.has(item.i) : false,
  }));
}

/** Extract a FeatureCollection of mandals for a list of district IDs and tag assigned ones with dynamic colors per area */
function extractMandalsGeoJSON(
  data: GeoMasterData,
  districtIds: number[],
  areasList: any[] = [],
  regionId: number | string = 1,
  selectedIds?: Set<number>,
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
    { color: string; areaName: string; areaId?: number }
  >();

  if (Array.isArray(areasList)) {
    areasList.forEach((area, idx) => {
      const color = getAreaColors(regionId, idx);
      if (Array.isArray(area.mandal_ids || area.mandalIds)) {
        const mIds = area.mandal_ids || area.mandalIds || [];
        mIds.forEach((mId: any) => {
          const idNum = Number(mId);
          if (!isNaN(idNum)) {
            assignedMandalMap.set(idNum, {
              color,
              areaName: area.area_name || area.areaName || "",
              areaId: area.id || area.area_id,
            });
          }
        });
      } else if (Array.isArray(area.assignments)) {
        area.assignments.forEach((assignment: any) => {
          const mId = Number(assignment.mandal_id || assignment.mandalId);
          if (!isNaN(mId)) {
            assignedMandalMap.set(mId, {
              color,
              areaName: area.areaName || area.area_name || "",
              areaId: area.id || area.area_id,
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
      areaId: info?.areaId || null,
      isSelected: selectedIds ? selectedIds.has(item.i) : false,
    };
  });
}

const getDistrictIdsFromRegion = (
  feature: any,
  masterData: GeoMasterData | null,
): number[] => {
  const props = feature?.properties || {};
  if (Array.isArray(props.districts)) {
    const ids = props.districts
      .map((d: any) => Number(d.id || d.i || d.district_id))
      .filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }
  if (Array.isArray(props.district_ids)) {
    const ids = props.district_ids
      .map(Number)
      .filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }
  if (
    typeof props.all_districts === "string" &&
    props.all_districts.trim() !== "" &&
    masterData
  ) {
    const targetNames = props.all_districts
      .split(",")
      .map((n: string) => n.trim().toLowerCase());
    const matched: number[] = [];
    masterData.countries.forEach((c) =>
      c.states?.forEach((s) =>
        s.districts?.forEach((d) => {
          if (targetNames.includes(d.d.toLowerCase())) matched.push(d.i);
        }),
      ),
    );
    return matched;
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
  } catch {
    return { type: "FeatureCollection", features: [] };
  }
};

const getFeatureBounds = (feature: any): maplibregl.LngLatBoundsLike => {
  const bounds = new maplibregl.LngLatBounds();
  const extendBounds = (coords: any[]) => {
    coords.forEach((c) => {
      if (Array.isArray(c[0])) extendBounds(c);
      else bounds.extend(c as [number, number]);
    });
  };
  const g = feature.geometry;
  if (g.type === "GeometryCollection") {
    (g.geometries as any[]).forEach((geo: any) => {
      if (geo?.coordinates) extendBounds(geo.coordinates);
    });
  } else {
    extendBounds(g.coordinates);
  }
  return bounds;
};

const getRegionId = (f: any): number => {
  return Number(
    f.properties?.region_id ||
    f.properties?.regionId ||
    f.properties?.id ||
    f.id ||
    0,
  );
};

// ─── Component ────────────────────────────────────────────────────────────────
const RegionAreaEdit: React.FC = () => {
  const navigate = useNavigate();
  const { regionId: urlRegionId } = useParams<{ regionId?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchParamFallback = (key: string) => {
    return searchParams.get(key) || new URLSearchParams(window.location.search).get(key);
  };

  // Unified Mode Trigger: search params or path param
  const editRegionId = getSearchParamFallback("editRegionId") || urlRegionId;
  const editAreaId = getSearchParamFallback("editAreaId");
  // region_id from URL (set by AreaDetailsView from sessionStorage on edit click)
  // Also fall back to sessionStorage directly in case navigation didn't carry it
  const urlAreaRegionId =
    getSearchParamFallback("region_id") ||
    (editAreaId ? sessionStorage.getItem("selected_region_id") : null);
  const isEditMode = !!editRegionId || !!editAreaId;
  const editModeType =
    getSearchParamFallback("mode") === "area" || !!editAreaId ? "area" : "region";

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const popup = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(0);
  const [geoMasterData, setGeoMasterData] = useState<GeoMasterData | null>(
    null,
  );
  const geoMasterDataRef = useRef<GeoMasterData | null>(null);
  useEffect(() => {
    geoMasterDataRef.current = geoMasterData;
  }, [geoMasterData]);
  const [isLoadingGeoData, setIsLoadingGeoData] = useState(false);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Selected Region for View Mode (clicking region to zoom and show areas)
  const [selectedRegion, setSelectedRegion] = useState<any | null>(null);
  const [activeAreaId, setActiveAreaId] = useState<number | null>(null);
  const selectedRegionId = selectedRegion ? getRegionId(selectedRegion) : null;
  const selectedRegionName = useMemo(() => {
    if (!selectedRegion) return null;
    return (
      selectedRegion.properties?.region_name ||
      selectedRegion.properties?.regionName ||
      selectedRegion.properties?.name ||
      "Region"
    );
  }, [selectedRegion]);

  // Assign/Unassign Panel States
  const [assignPanelOpen, setAssignPanelOpen] = useState(false);

  const [regionSearch, setRegionSearch] = useState("");
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "assigned" | "unassigned" | "all"
  >("all");
  const [showRegionsList, setShowRegionsList] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);

  const filterDropdownRef = useRef<HTMLDivElement>(null);
  const regionsDropdownRef = useRef<HTMLDivElement>(null);
  const areasDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).__selectedStateId = selectedState?.properties?.id ?? null;
    (window as any).__selectedState = selectedState;
  }, [selectedState]);

  useEffect(() => {
    (window as any).__assignPanelOpen = assignPanelOpen;
  }, [assignPanelOpen]);

  useEffect(() => {
    if (editModeType === "area" && selectedRegion) {
      setAssignPanelOpen(true);
    }
  }, [editModeType, selectedRegion]);

  const activeFilterRef = useRef(activeFilter);
  useEffect(() => {
    activeFilterRef.current = activeFilter;
  }, [activeFilter]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(target)
      ) {
        setFilterDropdownOpen(false);
      }
      if (
        regionsDropdownRef.current &&
        !regionsDropdownRef.current.contains(target)
      ) {
        setShowRegionsList(false);
      }
      if (
        areasDropdownRef.current &&
        !areasDropdownRef.current.contains(target)
      ) {
        setAreasDropdownOpen(false);
      }
      if (
        editDropdownRef.current &&
        !editDropdownRef.current.contains(target)
      ) {
        setEditDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Floating Edit Form Card States
  const [regionName, setRegionName] = useState("");
  const [regionCode, setRegionCode] = useState("");

  const [selectedDistricts, setSelectedDistricts] = useState<any[]>([]);
  // Ref so the one-time map click handler always reads the latest selectedDistricts
  // without needing to re-register (avoids stale closure → duplicate selection bug)
  const selectedDistrictsRef = useRef<any[]>([]);
  useEffect(() => {
    selectedDistrictsRef.current = selectedDistricts;
  }, [selectedDistricts]);

  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const [editSearchQuery, setEditSearchQuery] = useState("");
  const editDropdownRef = useRef<HTMLDivElement>(null);

  // Reassignment and Confirmation Modal states
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [pendingDistrict, setPendingDistrict] = useState<any | null>(null);
  const [pendingOwnerRegion, setPendingOwnerRegion] = useState<any | null>(
    null,
  );
  const [reassignedDistricts, setReassignedDistricts] = useState<
    Array<{
      districtId: number;
      fromRegionId: number;
      fromRegionName: string;
      fromRegionRawFeature: any;
    }>
  >([]);

  // Officer Assignment lists and selection states
  const [unassignedRegionalOfficers, setUnassignedRegionalOfficers] = useState<
    any[]
  >([]);
  const [assignedRegionalOfficers, setAssignedRegionalOfficers] = useState<
    any[]
  >([]);
  const [unassignedIntelligenceOfficers, setUnassignedIntelligenceOfficers] =
    useState<any[]>([]);
  const [assignedIntelligenceOfficers, setAssignedIntelligenceOfficers] =
    useState<any[]>([]);
  const [unassignedFieldOfficers, setUnassignedFieldOfficers] = useState<
    any[]
  >([]);
  const [assignedFieldOfficers, setAssignedFieldOfficers] = useState<any[]>([]);

  const [selectedRegionalOfficerId, setSelectedRegionalOfficerId] = useState<
    number | null
  >(null);
  const [selectedIntelligenceOfficerId, setSelectedIntelligenceOfficerId] =
    useState<number | null>(null);
  const [selectedFieldOfficerId, setSelectedFieldOfficerId] = useState<
    number | null
  >(null);

  const regionalOfficers = useMemo(() => {
    const list = [...unassignedRegionalOfficers];
    if (selectedRegionalOfficerId) {
      const current = assignedRegionalOfficers.find(
        (o) => Number(o.id) === Number(selectedRegionalOfficerId),
      );
      if (current && !list.some((o) => Number(o.id) === Number(current.id))) {
        list.unshift(current);
      }
    }
    return list;
  }, [
    unassignedRegionalOfficers,
    assignedRegionalOfficers,
    selectedRegionalOfficerId,
  ]);

  const intelligenceOfficers = useMemo(() => {
    const list = [...unassignedIntelligenceOfficers];
    if (selectedIntelligenceOfficerId) {
      const current = assignedIntelligenceOfficers.find(
        (o) => Number(o.id) === Number(selectedIntelligenceOfficerId),
      );
      if (current && !list.some((o) => Number(o.id) === Number(current.id))) {
        list.unshift(current);
      }
    }
    return list;
  }, [
    unassignedIntelligenceOfficers,
    assignedIntelligenceOfficers,
    selectedIntelligenceOfficerId,
  ]);

  const fieldOfficers = useMemo(() => {
    const list = [...unassignedFieldOfficers];
    if (selectedFieldOfficerId) {
      const current = assignedFieldOfficers.find(
        (o) => Number(o.id) === Number(selectedFieldOfficerId),
      );
      if (current && !list.some((o) => Number(o.id) === Number(current.id))) {
        list.unshift(current);
      }
    }
    return list;
  }, [
    unassignedFieldOfficers,
    assignedFieldOfficers,
    selectedFieldOfficerId,
  ]);

  const [getAllRegionalOfficers] = useGetAllRegionalOfficersMutation();
  const [getAllIntelligenceOfficers] = useGetAllIntelligenceOfficersMutation();
  const [getAllFieldOfficers] = useGetAllFieldOfficersMutation();
  const [updateRegion, { isLoading: isSavingRegion }] =
    useUpdateRegionMutation();
  const [updateArea, { isLoading: isSavingArea }] = useUpdateAreaMutation();
  const [triggerGetRegionGeoJson] = useLazyGetRegionGeoJsonQuery();

  const isSaving = isSavingRegion || isSavingArea;

  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();
  const { data: regionsByCountryData, refetch: refetchRegionsByCountry } =
    useGetRegionsByCountryIdQuery(
      { country_id: 1 },
      { refetchOnMountOrArgChange: true },
    );

  const { data: editedRegionGeoJson } = useGetRegionGeoJsonQuery(
    { region_id: Number(editRegionId) },
    { skip: !editRegionId },
  );

  useEffect(() => {
    if (editedRegionGeoJson?.features?.[0]?.properties) {
      const props = editedRegionGeoJson.features[0].properties;
      if (props.regional_officer_id) {
        setSelectedRegionalOfficerId(Number(props.regional_officer_id));
      }
      if (props.intelligence_officer_id) {
        setSelectedIntelligenceOfficerId(Number(props.intelligence_officer_id));
      }
    }
  }, [editedRegionGeoJson]);

  const selectedStateId = selectedState?.properties?.id;
  const { data: regionsByStateData, refetch: refetchRegionsByState } =
    useGetRegionsByStateIdQuery(
      { state_id: Number(selectedStateId) },
      { skip: !selectedStateId },
    );

  useEffect(() => {
    console.log(regionsByStateData, "regionsByStateData");
    if (regionsByStateData) {
      console.log(
        `[RegionAreaEdit] get_all_regions_by_state_id response for state_id ${selectedStateId}:`,
        regionsByStateData,
      );
    }
  }, [regionsByStateData, selectedStateId]);

  const { data: areaGeoJsonData } = useGetAreaGeoJsonQuery(
    { area_id: Number(editAreaId) },
    { skip: !editAreaId },
  );

  useEffect(() => {
    if (editAreaId && areaGeoJsonData) {
      console.log(
        `[RegionAreaEdit] Area GeoJSON response for area_id ${editAreaId}:`,
        areaGeoJsonData,
      );
    }
  }, [areaGeoJsonData, editAreaId]);

  // Resolve parentRegionId: prefer URL/sessionStorage region_id, then fall back to selectedRegionId
  const parentRegionId =
    (editAreaId && urlAreaRegionId ? Number(urlAreaRegionId) : null) ||
    selectedRegionId;
  console.log(parentRegionId, selectedRegionId, "parentRegionId")
  const { data: regionAreasData } = useGetAllAreasByRegionIdQuery(
    { region_id: Number(parentRegionId) },
    { skip: !parentRegionId },
  );

  const isAreaMode = getSearchParamFallback("mode") === "area";
  const [triggerGetAreas] = useLazyGetAllAreasByRegionIdQuery();
  const [regionsWithAreas, setRegionsWithAreas] = useState<Set<number> | null>(null);

  const stateRegionsGeoJson = useMemo(() => {
    if (!regionsByCountryData) return [];
    try {
      const decompressed = decompressGeoJSON(regionsByCountryData);
      const features: any[] = decompressed?.features || [];
      const currentStateId = selectedState?.properties?.id;
      return currentStateId
        ? features.filter(
          (f: any) => Number(f.properties?.state_id) === currentStateId,
        )
        : features;
    } catch {
      return [];
    }
  }, [regionsByCountryData, selectedState]);

  useEffect(() => {
    if (!isAreaMode || stateRegionsGeoJson.length === 0) {
      setRegionsWithAreas(null);
      return;
    }

    const fetchAll = async () => {
      const activeIds = new Set<number>();

      await Promise.all(
        stateRegionsGeoJson.map(async (f: any) => {
          const regionId = Number(f.properties?.region_id || f.id);
          if (!regionId) return;
          try {
            const res = await triggerGetAreas({ region_id: regionId }).unwrap();
            const areas = res?.data || [];
            if (areas.length > 0) {
              activeIds.add(regionId);
            }
          } catch (e) {
            console.error("Failed to fetch areas for region:", regionId, e);
          }
        })
      );

      setRegionsWithAreas(activeIds);
    };

    fetchAll();
  }, [stateRegionsGeoJson, isAreaMode, triggerGetAreas, regionAreasData]);

  // Show pending toast messages from previous reloads (like success save message)
  useEffect(() => {
    const pendingMessage = sessionStorage.getItem("toast_success_message");
    if (pendingMessage) {
      toast.success(pendingMessage);
      sessionStorage.removeItem("toast_success_message");
    }
  }, []);

  // Cache loaded areas globally for mock getAreaById fallback compatibility
  useEffect(() => {
    const list = regionAreasData?.data || [];
    if (list.length > 0) {
      const cache = (window as any).__areaCache || {};
      list.forEach((area: any) => {
        if (area?.id) {
          cache[Number(area.id)] = area;
        }
      });
      (window as any).__areaCache = cache;
    }
  }, [regionAreasData]);

  // ── Fetch S3 GeoJSON master data ──────────────────────────────────────────
  useEffect(() => {
    if (!allGeoJsonData?.success || !allGeoJsonData?.data) return;
    const fetchAndParse = async () => {
      setIsLoadingGeoData(true);
      try {
        const res = await fetch(allGeoJsonData.data);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setGeoMasterData(await res.json());
      } catch (err) {
        console.error("RegionAreaEdit: Failed to fetch geo master data:", err);
      } finally {
        setIsLoadingGeoData(false);
      }
    };
    fetchAndParse();
  }, [allGeoJsonData]);

  // ── Load Officers lists on mount ──────────────────────────────────────────
  useEffect(() => {
    const fetchOfficers = async () => {
      // 1. Fetch Regional Officers (Unassigned & Assigned)
      try {
        const unassignedResult = await getAllRegionalOfficers({
          is_assigned: 0,
        }).unwrap();
        const unassignedList = Array.isArray(unassignedResult?.data)
          ? unassignedResult.data
          : Array.isArray(unassignedResult)
            ? unassignedResult
            : [];
        setUnassignedRegionalOfficers(unassignedList);

        const assignedResult = await getAllRegionalOfficers({
          is_assigned: 1,
        }).unwrap();
        const assignedList = Array.isArray(assignedResult?.data)
          ? assignedResult.data
          : Array.isArray(assignedResult)
            ? assignedResult
            : [];
        setAssignedRegionalOfficers(assignedList);
      } catch (err) {
        console.error("RegionAreaEdit: Failed to load regional officers:", err);
      }

      // 2. Fetch Intelligence Officers (Unassigned & Assigned)
      try {
        const unassignedResult = await getAllIntelligenceOfficers({
          is_assigned: 0,
        }).unwrap();
        const unassignedList = Array.isArray(unassignedResult?.data)
          ? unassignedResult.data
          : Array.isArray(unassignedResult)
            ? unassignedResult
            : [];
        setUnassignedIntelligenceOfficers(unassignedList);

        const assignedResult = await getAllIntelligenceOfficers({
          is_assigned: 1,
        }).unwrap();
        const assignedList = Array.isArray(assignedResult?.data)
          ? assignedResult.data
          : Array.isArray(assignedResult)
            ? assignedResult
            : [];
        setAssignedIntelligenceOfficers(assignedList);
      } catch (err) {
        console.error(
          "RegionAreaEdit: Failed to load intelligence officers:",
          err,
        );
      }

      // 3. Fetch Field Officers (Unassigned & Assigned)
      try {
        const unassignedResult = await getAllFieldOfficers({
          is_assigned: 0,
        }).unwrap();
        const unassignedList = Array.isArray(unassignedResult?.data)
          ? unassignedResult.data
          : Array.isArray(unassignedResult)
            ? unassignedResult
            : [];
        setUnassignedFieldOfficers(unassignedList);

        const assignedResult = await getAllFieldOfficers({
          is_assigned: 1,
        }).unwrap();
        const assignedList = Array.isArray(assignedResult?.data)
          ? assignedResult.data
          : Array.isArray(assignedResult)
            ? assignedResult
            : [];
        setAssignedFieldOfficers(assignedList);
      } catch (err) {
        console.error("RegionAreaEdit: Failed to load field officers:", err);
      }
    };
    fetchOfficers();
  }, [getAllRegionalOfficers, getAllIntelligenceOfficers, getAllFieldOfficers]);

  // ── Inject country + state geometry into map sources ─────────────────────
  useEffect(() => {
    if (!map.current || !geoMasterData || mapLoaded === 0) return;
    try {
      (
        map.current.getSource("india-border") as maplibregl.GeoJSONSource
      )?.setData(extractCountriesGeoJSON(geoMasterData));
      (
        map.current.getSource("india-states") as maplibregl.GeoJSONSource
      )?.setData(extractStatesGeoJSON(geoMasterData));
    } catch (err) {
      console.error("RegionAreaEdit: Error injecting GeoJSON:", err);
    }
  }, [geoMasterData, mapLoaded]);

  // ── Compute set of already-assigned district IDs (other and current) ─────
  const assignedDistrictIds = useMemo(() => {
    const assigned = new Set<number>();
    if (!regionsByCountryData || !geoMasterData) return assigned;
    try {
      const decompressed = decompressGeoJSON(regionsByCountryData);
      decompressed?.features?.forEach((f: any) => {
        getDistrictIdsFromRegion(f, geoMasterData).forEach((id) =>
          assigned.add(id),
        );
      });
    } catch (err) {
      console.error(
        "RegionAreaEdit: Failed to parse assigned district IDs:",
        err,
      );
    }
    return assigned;
  }, [regionsByCountryData, geoMasterData]);

  const { otherAssignedDistrictIds } = useMemo(() => {
    const otherIds = new Set<number>();
    const currentIds = new Set<number>();
    if (!regionsByCountryData || !geoMasterData || !editRegionId) {
      return {
        otherAssignedDistrictIds: otherIds,
        currentRegionDistrictIds: currentIds,
      };
    }
    try {
      const decompressed = decompressGeoJSON(regionsByCountryData);
      const targetId = Number(editRegionId);
      decompressed?.features?.forEach((f: any) => {
        const id = getRegionId(f);
        const ids = getDistrictIdsFromRegion(f, geoMasterData);
        if (id === targetId) {
          ids.forEach((dId) => currentIds.add(dId));
        } else {
          ids.forEach((dId) => otherIds.add(dId));
        }
      });
    } catch (err) {
      console.error(
        "RegionAreaEdit: Failed to parse detailed assigned district IDs:",
        err,
      );
    }
    return {
      otherAssignedDistrictIds: otherIds,
      currentRegionDistrictIds: currentIds,
    };
  }, [regionsByCountryData, geoMasterData, editRegionId]);

  // Compute selected district IDs set for real-time map styling
  const selectedDistrictIdsSet = useMemo(() => {
    return new Set<number>(
      selectedDistricts.map((d) => Number(d.id ?? d.featureId)),
    );
  }, [selectedDistricts]);

  // ── Build all regions GeoJSON (used for initial render) ──────────────────
  const allRegionsData = useMemo(() => {
    if (!regionsByCountryData || !geoMasterData) {
      return { type: "FeatureCollection" as const, features: [] };
    }
    return buildRegionsGeoJSON(regionsByCountryData, geoMasterData);
  }, [regionsByCountryData, geoMasterData]);

  const parentRegionDistrictIds = useMemo(() => {
    if (!parentRegionId || !geoMasterData || !allRegionsData) return [];
    const parentReg = allRegionsData.features.find(
      (f: any) => getRegionId(f) === Number(parentRegionId)
    );
    if (!parentReg) return [];
    return getDistrictIdsFromRegion(parentReg, geoMasterData);
  }, [parentRegionId, geoMasterData, allRegionsData]);

  const availableMandals = useMemo(() => {
    if (!geoMasterData || parentRegionDistrictIds.length === 0) return [];
    const list: any[] = [];
    geoMasterData.countries.forEach((country) => {
      country.states?.forEach((state) => {
        state.districts?.forEach((district) => {
          if (parentRegionDistrictIds.includes(district.i)) {
            if (district.mandals) {
              district.mandals.forEach((m) => {
                if (!list.some((existing) => existing.i === m.i)) {
                  list.push({
                    ...m,
                    district_id: district.i,
                  });
                }
              });
            }
          }
        });
      });
    });
    return list;
  }, [geoMasterData, parentRegionDistrictIds]);

  const otherAssignedMandalIds = useMemo(() => {
    const assigned = new Set<number>();
    const list = regionAreasData?.data || [];
    const currentAreaIdNum = Number(editAreaId);
    list.forEach((area: any) => {
      const areaIdNum = Number(area.id || area.area_id);
      if (areaIdNum !== currentAreaIdNum) {
        let mIds: number[] = [];
        if (Array.isArray(area.mandal_ids)) {
          mIds = area.mandal_ids.map(Number);
        } else if (Array.isArray(area.mandalIds)) {
          mIds = area.mandalIds.map(Number);
        } else if (Array.isArray(area.assignments)) {
          mIds = area.assignments.map((asg: any) => Number(asg.mandal_id || asg.mandalId));
        }
        mIds.forEach((mId: any) => {
          const idNum = Number(mId);
          if (!isNaN(idNum)) {
            assigned.add(idNum);
          }
        });
      }
    });
    return assigned;
  }, [regionAreasData, editAreaId]);

  const filteredEditItems = useMemo(() => {
    if (editModeType !== "region") return [];
    if (!geoMasterData || !selectedStateId) return [];
    const stateObj = geoMasterData.countries
      .flatMap((c) => c.states ?? [])
      .find((s) => s.i === selectedStateId);
    const districts = stateObj?.districts || [];
    if (!editSearchQuery.trim()) return districts;
    return districts.filter((d) =>
      d.d.toLowerCase().includes(editSearchQuery.toLowerCase())
    );
  }, [geoMasterData, selectedStateId, editSearchQuery, editModeType]);

  const filteredEditMandals = useMemo(() => {
    if (editModeType !== "area") return [];
    if (!availableMandals) return [];
    if (!editSearchQuery.trim()) return availableMandals;
    return availableMandals.filter((m) =>
      m.d.toLowerCase().includes(editSearchQuery.toLowerCase())
    );
  }, [availableMandals, editSearchQuery, editModeType]);

  const toggleEditDistrictSelection = (district: any) => {
    const dtId = district.i !== undefined ? district.i : district.id;
    const isAssignedToOther = otherAssignedDistrictIds.has(dtId);

    setSelectedDistricts((prev) => {
      const isAlreadySelected = prev.some(
        (d) => Number(d.id ?? d.featureId) === dtId
      );

      if (isAlreadySelected) {
        if (map.current) {
          map.current.setFeatureState(
            { source: "districts-source", id: dtId },
            { selected: false }
          );
        }
        setReassignedDistricts((r) =>
          r.filter((item) => item.districtId !== dtId)
        );
        return prev.filter((d) => Number(d.id ?? d.featureId) !== dtId);
      }

      // If we are adding a district, check if it's adjacent to currently selected districts (if selection is not empty)
      if (editModeType === "region" && prev.length > 0 && geoMasterData) {
        const clickedGeom = findDistrictGeometry(dtId, geoMasterData);
        if (clickedGeom) {
          let hasAdjacent = false;
          for (const selectedDistrict of prev) {
            const selectedDistrictId = Number(selectedDistrict.id ?? selectedDistrict.featureId);
            const selectedGeom = findDistrictGeometry(selectedDistrictId, geoMasterData);
            if (selectedGeom && areGeometriesAdjacent(clickedGeom, selectedGeom)) {
              hasAdjacent = true;
              break;
            }
          }
          if (!hasAdjacent) {
            setTimeout(() => {
              toast.warning("To keep the Region contiguous, please select a district adjacent to your currently selected districts.");
            }, 0);
            return prev;
          }
        }
      }

      if (isAssignedToOther) {
        setTimeout(() => {
          const ownerRegion = allRegionsData.features.find((f: any) => {
            const ids = getDistrictIdsFromRegion(f, geoMasterData);
            return ids.includes(dtId);
          });
          if (ownerRegion) {
            setPendingDistrict({
              id: dtId,
              name: district.d || district.name || "",
              code: district.c || district.code || "",
            });
            setPendingOwnerRegion({
              id: getRegionId(ownerRegion),
              name:
                ownerRegion.properties?.region_name ||
                ownerRegion.properties?.name ||
                "another region",
              rawFeature: ownerRegion,
            });
            setReassignModalOpen(true);
          }
        }, 0);
        return prev;
      }

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
          featureId: dtId,
          name: district.d || district.name || "",
          code: district.c || district.code || "",
          d: district.d || district.name || "",
          properties: {
            id: dtId,
            name: district.d || district.name || "",
            code: district.c || district.code || "",
          },
        },
      ];
    });
  };

  const toggleEditMandalSelection = (mandal: any) => {
    const mId = mandal.i !== undefined ? mandal.i : mandal.id;
    const isAssignedToOther = otherAssignedMandalIds.has(mId);

    setSelectedDistricts((prev) => {
      const isAlreadySelected = prev.some(
        (m) => Number(m.id ?? m.featureId) === mId
      );

      if (isAlreadySelected) {
        if (map.current) {
          map.current.setFeatureState(
            { source: "mandals-source", id: mId },
            { selected: false }
          );
        }
        return prev.filter((d) => Number(d.id ?? d.featureId) !== mId);
      }

      // If we are adding a mandal, check if it's adjacent to currently selected mandals (if selection is not empty)
      if (editModeType === "area" && prev.length > 0 && geoMasterData) {
        const clickedGeom = findMandalGeometry(mId, geoMasterData);
        if (clickedGeom) {
          let hasAdjacent = false;
          for (const selectedMandal of prev) {
            const selectedMandalId = Number(selectedMandal.id ?? selectedMandal.featureId);
            const selectedGeom = findMandalGeometry(selectedMandalId, geoMasterData);
            if (selectedGeom && areGeometriesAdjacent(clickedGeom, selectedGeom)) {
              hasAdjacent = true;
              break;
            }
          }
          if (!hasAdjacent) {
            setTimeout(() => {
              toast.warning("To keep the Area contiguous, please select a mandal adjacent to your currently selected mandals.");
            }, 0);
            return prev;
          }
        }
      }

      if (isAssignedToOther) {
        setTimeout(() => {
          let areaId = 1;
          let areaName = "Another Area";
          const list = regionAreasData?.data || [];
          const rawArea = list.find((area: any) => {
            let mIds: number[] = [];
            if (Array.isArray(area.mandal_ids)) {
              mIds = area.mandal_ids.map(Number);
            } else if (Array.isArray(area.mandalIds)) {
              mIds = area.mandalIds.map(Number);
            } else if (Array.isArray(area.assignments)) {
              mIds = area.assignments.map((asg: any) => Number(asg.mandal_id || asg.mandalId));
            }
            return mIds.includes(mId);
          });
          if (rawArea) {
            areaId = rawArea.id || rawArea.area_id || 1;
            areaName = rawArea.area_name || rawArea.areaName || "Another Area";
          }

          setPendingDistrict({
            id: mId,
            name: mandal.d || "This mandal",
            code: mandal.c || "",
            district_id: mandal.district_id,
          });
          setPendingOwnerRegion({
            id: areaId,
            name: areaName,
          });
          setReassignModalOpen(true);
        }, 0);
        return prev;
      }

      if (map.current) {
        map.current.setFeatureState(
          { source: "mandals-source", id: mId },
          { selected: true }
        );
      }

      return [
        ...prev,
        {
          id: mId,
          featureId: mId,
          name: mandal.d,
          code: mandal.c || "",
          d: mandal.d,
          properties: {
            id: mId,
            name: mandal.d,
            code: mandal.c || "",
            district_id: mandal.district_id,
          },
        },
      ];
    });
  };

  const toggleEditDistrictSelectionRef = useRef(toggleEditDistrictSelection);
  const toggleEditMandalSelectionRef = useRef(toggleEditMandalSelection);

  useEffect(() => {
    toggleEditDistrictSelectionRef.current = toggleEditDistrictSelection;
  });

  useEffect(() => {
    toggleEditMandalSelectionRef.current = toggleEditMandalSelection;
  });

  // ── Pre-populate Form state, active state selection, and pre-selected districts/mandals ──
  const [hasInitialized, setHasInitialized] = useState(false);
  // Ref guards the area-edit map init so it only fires once even if deps re-trigger
  const areaEditMapInitRef = useRef(false);
  const hasInitializedRef = useRef(false);

  // ── Area Edit Mode: once regionAreasData loads, match editAreaId, set region/state/mandals ──
  useEffect(() => {

    if (
      !editAreaId ||
      !urlAreaRegionId ||
      !regionAreasData?.data ||
      !allRegionsData?.features?.length ||
      !geoMasterData ||
      areaEditMapInitRef.current
    )
      return;

    const areaIdNum = Number(editAreaId);
    const matchedArea = regionAreasData.data.find(
      (a: any) => Number(a.areaId || a.id || a.area_id) === areaIdNum,
    );


    if (!matchedArea) return;

    // Mark done so this only runs once
    areaEditMapInitRef.current = true;

    // Pre-populate input fields
    if (matchedArea.area_name || matchedArea.areaName) {
      setRegionName(matchedArea.area_name || matchedArea.areaName);
    }
    if (matchedArea.area_code || matchedArea.areaCode) {
      setRegionCode(matchedArea.area_code || matchedArea.areaCode);
    }
    if (matchedArea.field_officer_id) {
      setSelectedFieldOfficerId(Number(matchedArea.field_officer_id));
    }

    // ── Step 1: Resolve the parent region feature from allRegionsData ────────
    const regionIdNum = Number(urlAreaRegionId);
    const rawRegion = allRegionsData.features.find(
      (f: any) => getRegionId(f) === regionIdNum,
    );

    if (rawRegion) {
      setSelectedRegion(rawRegion);

      // ── Step 2: Resolve and set the parent state ──────────────────────────
      const stateId = Number(rawRegion.properties?.state_id || 1);
      const stateObj = geoMasterData.countries
        .flatMap((c: any) => c.states ?? [])
        .find((s: any) => s.i === stateId);

      if (stateObj) {
        setSelectedState({
          type: "Feature",
          id: stateObj.i,
          geometry: stateObj.g,
          properties: { id: stateObj.i, name: stateObj.d, code: stateObj.c },
        });
        setIsZoomed(true);

        // ── Step 3: Build pre-selected mandals from matched area's mandal_ids ─
        const assignedMandalIds = new Set<number>();
        if (Array.isArray(matchedArea.mandal_ids)) {
          matchedArea.mandal_ids.forEach((id: any) => assignedMandalIds.add(Number(id)));
        } else if (Array.isArray(matchedArea.mandalIds)) {
          matchedArea.mandalIds.forEach((id: any) => assignedMandalIds.add(Number(id)));
        } else if (Array.isArray(matchedArea.assignments)) {
          matchedArea.assignments.forEach((asg: any) => {
            const mId = asg.mandal_id || asg.mandalId;
            if (mId !== undefined && mId !== null) assignedMandalIds.add(Number(mId));
          });
        }



        const initialSelected: any[] = [];
        stateObj.districts?.forEach((d: any) => {
          d.mandals?.forEach((m: any) => {
            if (assignedMandalIds.has(Number(m.i))) {
              initialSelected.push({
                id: m.i,
                featureId: m.i,
                name: m.d,
                code: m.c,
                d: m.d,
                properties: {
                  id: m.i,
                  name: m.d,
                  code: m.c,
                  district_id: d.i,
                },
              });
            }
          });
        });

        setSelectedDistricts(initialSelected);

        // ── Step 4: Zoom map to the parent region once map is ready ──────────
        if (map.current && mapLoaded > 0) {
          try {
            map.current.fitBounds(getFeatureBounds(rawRegion), {
              padding: 150,
              duration: 1500,
              maxZoom: 6.5,
            });
          } catch (e) {
            console.error("[RegionAreaEdit] Zoom to region failed:", e);
          }
        }

        // ── Step 5: Clear sessionStorage now that we've consumed the region ID ─
        sessionStorage.removeItem("selected_region_id");
        hasInitializedRef.current = true;
        setHasInitialized(true);
      }
    }
  }, [
    editAreaId,
    urlAreaRegionId,
    regionAreasData,
    allRegionsData,
    geoMasterData,
    mapLoaded,
  ]);

  useEffect(() => {

    if (!geoMasterData || hasInitialized || hasInitializedRef.current) return;

    if (editAreaId && areaGeoJsonData) {

      try {
        const firstFeature =
          areaGeoJsonData?.features?.[0] ||
          areaGeoJsonData?.data?.features?.[0];
        const geoProps = firstFeature?.properties || {};

        const areaName =
          geoProps.name || geoProps.area_name || geoProps.areaName || "";
        const areaCode = geoProps.area_code || geoProps.areaCode || "";
        const fieldOfficerId = geoProps.field_officer_id;

        setRegionName(areaName);
        setRegionCode(areaCode);
        if (fieldOfficerId) {
          setSelectedFieldOfficerId(Number(fieldOfficerId));
        }

        const parentRegionIdValue = Number(
          geoProps.region_id ||
          geoProps.regionId ||
          getSearchParamFallback("region_id") ||
          sessionStorage.getItem("selected_region_id") ||
          selectedRegionId,
        );
        const rawRegion = allRegionsData.features.find(
          (f: any) => getRegionId(f) === parentRegionIdValue,
        );
        if (rawRegion) {
          setSelectedRegion(rawRegion);
          const stateId = Number(rawRegion.properties?.state_id || 1);
          const stateObj = geoMasterData.countries
            .flatMap((c: any) => c.states ?? [])
            .find((s: any) => s.i === stateId);

          if (stateObj) {
            setSelectedState({
              type: "Feature",
              id: stateObj.i,
              geometry: stateObj.g,
              properties: {
                id: stateObj.i,
                name: stateObj.d,
                code: stateObj.c,
              },
            });
            setIsZoomed(true);

            // Extract mandal IDs from geojson features dynamically
            const assignedMandalIds = new Set<number>();
            const geojsonFeatures =
              areaGeoJsonData?.features ||
              areaGeoJsonData?.data?.features ||
              [];
            geojsonFeatures.forEach((f: any) => {
              if (f.id !== undefined && f.id !== null)
                assignedMandalIds.add(Number(f.id));
              if (f.properties?.mandal_id !== undefined)
                assignedMandalIds.add(Number(f.properties.mandal_id));
              if (f.properties?.mandalId !== undefined)
                assignedMandalIds.add(Number(f.properties.mandalId));
              if (f.properties?.id !== undefined)
                assignedMandalIds.add(Number(f.properties.id));
            });



            const initialSelected: any[] = [];
            stateObj.districts?.forEach((d: any) => {
              d.mandals?.forEach((m: any) => {
                if (assignedMandalIds.has(Number(m.i))) {
                  initialSelected.push({
                    id: m.i,
                    featureId: m.i,
                    name: m.d,
                    code: m.c,
                    d: m.d,
                    properties: {
                      id: m.i,
                      name: m.d,
                      code: m.c,
                      district_id: d.i,
                    },
                  });
                }
              });
            });

            setSelectedDistricts(initialSelected);

            if (map.current && stateObj.g) {
              const stateFeature = {
                type: "Feature" as const,
                geometry: stateObj.g,
                properties: { id: stateObj.i, name: stateObj.d },
              };
              map.current.fitBounds(getFeatureBounds(stateFeature), {
                padding: 100,
                duration: 1500,
              });
            }
          }
        }
        if (rawRegion) {
          hasInitializedRef.current = true;
          setHasInitialized(true);
        }
      } catch (err) {
        console.error(
          "RegionAreaEdit: Failed to pre-populate area details:",
          err,
        );
      }
    } else if (editRegionId && allRegionsData?.features?.length > 0) {
      try {
        const targetId = Number(editRegionId);
        const rawRegion = allRegionsData.features.find((f: any) => {
          return getRegionId(f) === targetId;
        });

        if (rawRegion) {
          setRegionName(
            rawRegion.properties?.region_name ||
            rawRegion.properties?.name ||
            "",
          );
          setRegionCode(
            rawRegion.properties?.region_code ||
            rawRegion.properties?.code ||
            "",
          );

          if (rawRegion.properties?.regional_officer_id) {
            setSelectedRegionalOfficerId(
              Number(rawRegion.properties.regional_officer_id),
            );
          }
          if (rawRegion.properties?.intelligence_officer_id) {
            setSelectedIntelligenceOfficerId(
              Number(rawRegion.properties.intelligence_officer_id),
            );
          }

          const stateId = Number(rawRegion.properties?.state_id);
          const stateObj = geoMasterData.countries
            .flatMap((c: any) => c.states ?? [])
            .find((s: any) => s.i === stateId);

          if (stateObj) {
            setSelectedState({
              type: "Feature",
              id: stateObj.i,
              geometry: stateObj.g,
              properties: {
                id: stateObj.i,
                name: stateObj.d,
                code: stateObj.c,
              },
            });
            setIsZoomed(true);

            const initialSelected: any[] = [];
            const currentIds = getDistrictIdsFromRegion(
              rawRegion,
              geoMasterData,
            );
            stateObj.districts?.forEach((d: any) => {
              if (currentIds.includes(d.i)) {
                initialSelected.push({
                  id: d.i,
                  featureId: d.i,
                  name: d.d,
                  code: d.c,
                  d: d.d,
                  properties: { id: d.i, name: d.d, code: d.c },
                });
              }
            });
            setSelectedDistricts(initialSelected);

            if (map.current && stateObj.g) {
              const stateFeature = {
                type: "Feature" as const,
                geometry: stateObj.g,
                properties: { id: stateObj.i, name: stateObj.d },
              };
              map.current.fitBounds(getFeatureBounds(stateFeature), {
                padding: 100,
                duration: 1500,
              });
            }
          }
          hasInitializedRef.current = true;
          setHasInitialized(true);
        }
      } catch (err) {
        console.error(
          "RegionAreaEdit: Failed to pre-populate region details:",
          err,
        );
      }
    }
  }, [
    allRegionsData,
    geoMasterData,
    editRegionId,
    editAreaId,
    areaGeoJsonData,
    hasInitialized,
    searchParams,
  ]);

  const stateRegionsData = useMemo(() => {
    if (!regionsByCountryData || !geoMasterData)
      return { type: "FeatureCollection" as const, features: [] };

    // Exclude the region currently being edited to prevent double-color overlap!
    let filtered = allRegionsData.features;
    if (editRegionId) {
      const targetId = Number(editRegionId);
      filtered = filtered.filter((f: any) => getRegionId(f) !== targetId);
    }

    if (!selectedState)
      return { type: "FeatureCollection" as const, features: [] };
    try {
      const selectedStateId = selectedState?.properties?.id;
      const stateDistrictIds = new Set<number>();
      const stateObj = geoMasterData.countries
        .flatMap((c) => c.states ?? [])
        .find((s) => s.i === selectedStateId);
      stateObj?.districts?.forEach((d) => stateDistrictIds.add(d.i));
      const stateFiltered = filtered.filter((f: any) =>
        getDistrictIdsFromRegion(f, geoMasterData).some((id) =>
          stateDistrictIds.has(id),
        ),
      );

      const apiRegions = regionsByStateData?.data || [];
      const mappedFeatures = stateFiltered.map((f: any) => {
        const regionId = f.properties?.region_id || f.id;
        const matchingApiRegion = apiRegions.find(
          (r: any) => Number(r.id) === Number(regionId),
        );
        return {
          ...f,
          properties: {
            ...f.properties,
            is_assigned: matchingApiRegion
              ? Number(matchingApiRegion.is_assigned)
              : 0,
          },
        };
      });

      let finalFeatures = mappedFeatures;
      if (activeFilter === "assigned") {
        finalFeatures = mappedFeatures.filter(
          (f: any) => Number(f.properties?.is_assigned) === 1,
        );
      } else if (activeFilter === "unassigned") {
        finalFeatures = mappedFeatures.filter(
          (f: any) => Number(f.properties?.is_assigned) === 0,
        );
      }
      return { type: "FeatureCollection" as const, features: finalFeatures };
    } catch {
      return { type: "FeatureCollection" as const, features: filtered };
    }
  }, [
    selectedState,
    allRegionsData,
    regionsByCountryData,
    geoMasterData,
    editRegionId,
    regionsByStateData,
    activeFilter,
  ]);

  // ── Update region overlays whenever stateRegionsData changes ─────────────
  useEffect(() => {
    if (map.current?.getSource("regions-source")) {
      (
        map.current.getSource("regions-source") as maplibregl.GeoJSONSource
      ).setData(stateRegionsData);
    }
  }, [stateRegionsData]);

  // ── Construct filtered district features for rendering in the active state ──
  const districtsGeoJSON = useMemo(() => {
    if (!geoMasterData || !selectedState) {
      return { type: "FeatureCollection" as const, features: [] };
    }
    const assignedSet = isEditMode
      ? otherAssignedDistrictIds
      : assignedDistrictIds;
    return extractDistrictsGeoJSON(
      geoMasterData,
      Number(selectedState.properties?.id),
      assignedSet,
      selectedDistrictIdsSet,
    );
  }, [
    geoMasterData,
    selectedState,
    assignedDistrictIds,
    otherAssignedDistrictIds,
    selectedDistrictIdsSet,
    isEditMode,
  ]);

  // ── Render district boundaries when a state is selected ──────────────────

  useEffect(() => {
    if (
      !map.current ||
      !geoMasterData ||
      !selectedState ||
      !selectedStateId ||
      mapLoaded === 0
    )
      return;

    try {
      const visibility = editModeType === "region" ? "visible" : "none";

      if (!map.current.getSource("districts-source")) {
        // Add source + layers for the first time
        map.current.addSource("districts-source", {
          type: "geojson",
          data: districtsGeoJSON,
        });

        // Interactive districts styling (Selected districts take visual precedence)
        map.current.addLayer(
          {
            id: "districts-fill",
            type: "fill",
            source: "districts-source",
            layout: {
              visibility,
            },
            paint: {
              "fill-color": [
                "case",
                ["boolean", ["feature-state", "selected"], false],
                "#9BC2F3",
                ["boolean", ["get", "isSelected"], false],
                "#9BC2F3",
                ["boolean", ["get", "isAssigned"], false],
                "#9BC2F3",
                "#FFFFFF",
              ],
              "fill-opacity": 1.0,
            },
          },
          "states-border-line",
        );

        map.current.addLayer(
          {
            id: "districts-line",
            type: "line",
            source: "districts-source",
            layout: {
              visibility,
            },
            paint: {
              "line-color": "#CBD5E1",
              "line-width": 1.0,
              "line-opacity": 1.0,
            },
          },
          "states-border-line",
        );

        // Add clean text labels directly inside district polygons!
        map.current.addLayer({
          id: "districts-labels",
          type: "symbol",
          source: "districts-source",
          layout: {
            visibility,
            "text-field": ["coalesce", ["get", "name"], ["get", "d"], ""],
            "text-size": 10,
            "text-anchor": "center",
            "text-justify": "center",
            "text-max-width": 8,
            "symbol-placement": "point",
            "text-allow-overlap": false,
          },
          paint: {
            "text-color": "#334155", // premium slate-700 color
            "text-halo-color": "#ffffff", // white background halo for outstanding legibility
            "text-halo-width": 1.5,
            "text-opacity": 0.9,
          },
        });

        // Hover tooltip or cursor logic
        map.current.on("mousemove", "districts-fill", () => {
          const searchParamsLocal = new URLSearchParams(window.location.search);
          const isEditModeLocal = !!searchParamsLocal.get("editRegionId");

          if (isEditModeLocal) {
            // Edit Mode: show hover pointers for all districts since they are all clickable/reassignable!
            if (map.current) {
              map.current.getCanvas().style.cursor = "pointer";
            }
          } else {
            // View Mode: show cursor default, no popups
            if (map.current) map.current.getCanvas().style.cursor = "default";
          }
        });

        map.current.on("mouseleave", "districts-fill", () => {
          if (map.current) map.current.getCanvas().style.cursor = "";
        });

        // Click handler inside districts (Only runs in Edit Mode)
        map.current.on("click", "districts-fill", (e) => {
          const searchParamsLocal = new URLSearchParams(window.location.search);
          const isEditModeLocal = !!searchParamsLocal.get("editRegionId");
          if (!isEditModeLocal) return;

          if (e.features && e.features.length > 0) {
            const districtFeature = e.features[0];
            const districtData = districtFeature.properties;
            const dtId = Number(districtData?.id || districtData?.featureId);

            const district = {
              i: dtId,
              id: dtId,
              featureId: districtFeature.id,
              name: districtData.name || districtData.d || "",
              d: districtData.name || districtData.d || "",
              code: districtData.code || "",
              c: districtData.code || "",
            };

            toggleEditDistrictSelectionRef.current(district);
          }
        });
      } else {
        // Source already exists — just refresh data
        (
          map.current.getSource("districts-source") as maplibregl.GeoJSONSource
        )?.setData(districtsGeoJSON);

        if (map.current.getLayer("districts-fill")) {
          map.current.setLayoutProperty("districts-fill", "visibility", visibility);
          map.current.setLayoutProperty("districts-line", "visibility", visibility);
          map.current.setLayoutProperty("districts-labels", "visibility", visibility);
        }
      }
    } catch (err) {
      console.error("RegionAreaEdit: Failed to render districts:", err);
    }
  }, [
    districtsGeoJSON,
    selectedState,
    mapLoaded,
    geoMasterData,
    allRegionsData,
    editModeType,
  ]);

  // ── Render mandal boundaries for Area Edit Mode or Zoomed View Mode ─────────
  useEffect(() => {
    if (!map.current || !geoMasterData || mapLoaded === 0) return;

    const showMandals = editModeType === "area";
    if (!showMandals) {
      if (map.current.getLayer("mandals-fill")) {
        map.current.setLayoutProperty("mandals-fill", "visibility", "none");
        map.current.setLayoutProperty("mandals-line", "visibility", "none");
        map.current.setLayoutProperty("mandals-labels", "visibility", "none");
      }

      if (map.current.getLayer("regions-fill")) {
        if (selectedRegion) {
          const regionId = getRegionId(selectedRegion);
          map.current.setFilter("regions-fill", [
            "==",
            ["coalesce", ["get", "region_id"], ["get", "id"]],
            regionId,
          ]);
        } else {
          map.current.setFilter("regions-fill", null);
        }
      }
      if (map.current.getLayer("regions-line")) {
        if (selectedRegion) {
          const regionId = getRegionId(selectedRegion);
          map.current.setFilter("regions-line", [
            "==",
            ["coalesce", ["get", "region_id"], ["get", "id"]],
            regionId,
          ]);
        } else {
          map.current.setFilter("regions-line", null);
        }
      }
      return;
    }

    try {
      let districtIds: number[] = [];
      let parentRegionId = 0; // 0 = no region selected; truthy check below uses this correctly
      let areasList: any[] = [];



      if (editModeType === "area") {
        if (selectedRegion) {
          parentRegionId = getRegionId(selectedRegion);
          districtIds = getDistrictIdsFromRegion(selectedRegion, geoMasterData);
          areasList = regionAreasData?.data || [];
        } else if (areaGeoJsonData) {
          const firstFeature =
            areaGeoJsonData?.features?.[0] ||
            areaGeoJsonData?.data?.features?.[0];
          const geoProps = firstFeature?.properties || {};
          let parentRegionIdValue = Number(
            geoProps.region_id ||
            geoProps.regionId ||
            areaGeoJsonData?.region_id ||
            areaGeoJsonData?.data?.region_id ||
            areaGeoJsonData?.regionId ||
            areaGeoJsonData?.data?.regionId ||
            getSearchParamFallback("region_id") ||
            sessionStorage.getItem("selected_region_id") ||
            selectedRegionId ||
            0
          );

          if (!parentRegionIdValue) {
            const assignedMandalIds = new Set<number>();
            const geojsonFeatures =
              areaGeoJsonData?.features ||
              areaGeoJsonData?.data?.features ||
              [];
            geojsonFeatures.forEach((f: any) => {
              if (f.id !== undefined && f.id !== null)
                assignedMandalIds.add(Number(f.id));
              if (f.properties?.mandal_id !== undefined)
                assignedMandalIds.add(Number(f.properties.mandal_id));
              if (f.properties?.mandalId !== undefined)
                assignedMandalIds.add(Number(f.properties.mandalId));
              if (f.properties?.id !== undefined)
                assignedMandalIds.add(Number(f.properties.id));
            });

            if (assignedMandalIds.size > 0) {
              const firstMandalId = Array.from(assignedMandalIds)[0];
              let foundDistrictId: number | null = null;
              geoMasterData.countries.forEach((country: any) => {
                country.states?.forEach((state: any) => {
                  state.districts?.forEach((district: any) => {
                    district.mandals?.forEach((mandal: any) => {
                      if (Number(mandal.i) === firstMandalId) {
                        foundDistrictId = Number(district.i);
                      }
                    });
                  });
                });
              });

              if (foundDistrictId !== null) {
                const containingRegion = allRegionsData.features.find((regFeature: any) => {
                  const regDistrictIds = getDistrictIdsFromRegion(regFeature, geoMasterData);
                  return regDistrictIds.includes(foundDistrictId!);
                });
                if (containingRegion) {
                  parentRegionIdValue = getRegionId(containingRegion);
                }
              }
            }
          }

          if (parentRegionIdValue) {
            parentRegionId = parentRegionIdValue;
            const rawRegion = allRegionsData.features.find(
              (f: any) => getRegionId(f) === parentRegionIdValue
            );
            if (rawRegion) {
              districtIds = getDistrictIdsFromRegion(rawRegion, geoMasterData);
            }
          }
          areasList = regionAreasData?.data || [];
        }
      }

      // Filter out current area
      if (editModeType === "area" && editAreaId) {
        const areaIdNum = Number(editAreaId);
        areasList = areasList.filter(
          (a: any) => Number(a.areaId || a.id || a.area_id) !== areaIdNum,
        );
      }

      const selectedIds = new Set<number>(
        selectedDistricts.map((d) => Number(d.id ?? d.featureId)),
      );
      const mandalsGeoJSON = extractMandalsGeoJSON(
        geoMasterData,
        districtIds,
        areasList,
        parentRegionId,
        selectedIds,
      );

      // Hide districts
      if (map.current.getLayer("districts-fill")) {
        map.current.setLayoutProperty("districts-fill", "visibility", "none");
        map.current.setLayoutProperty("districts-line", "visibility", "none");
        map.current.setLayoutProperty("districts-labels", "visibility", "none");
      }

      if (map.current.getLayer("regions-fill")) {
        if (parentRegionId) {
          // A region is selected — show only that region as grey background
          map.current.setFilter("regions-fill", [
            "==",
            ["coalesce", ["get", "region_id"], ["get", "id"]],
            parentRegionId,
          ]);
          map.current.setPaintProperty("regions-fill", "fill-color", "#9BC2F3");
          map.current.setPaintProperty("regions-fill", "fill-opacity", 0.5);
        } else {
          // No region selected yet — show all regions normally
          map.current.setFilter("regions-fill", null);
          map.current.setPaintProperty("regions-fill", "fill-color", "#9BC2F3");
          map.current.setPaintProperty("regions-fill", "fill-opacity", 0.5);
        }
      }
      if (map.current.getLayer("regions-line")) {
        if (parentRegionId) {
          // A region is selected — highlight only that region's border
          map.current.setFilter("regions-line", [
            "==",
            ["coalesce", ["get", "region_id"], ["get", "id"]],
            parentRegionId,
          ]);
        } else {
          // No region selected yet — show ALL region borders
          map.current.setFilter("regions-line", null);
        }
      }

      const existingSource = map.current.getSource(
        "mandals-source",
      ) as maplibregl.GeoJSONSource;
      if (existingSource) {
        existingSource.setData(mandalsGeoJSON);
        map.current.setLayoutProperty("mandals-fill", "visibility", "visible");
        map.current.setLayoutProperty("mandals-line", "visibility", "visible");
        map.current.setLayoutProperty(
          "mandals-labels",
          "visibility",
          "visible",
        );
      } else {
        map.current.addSource("mandals-source", {
          type: "geojson",
          data: mandalsGeoJSON,
        });

        map.current.addLayer(
          {
            id: "mandals-fill",
            type: "fill",
            source: "mandals-source",
            paint: {
              "fill-color": [
                "case",
                ["boolean", ["feature-state", "selected"], false],
                "#9BC2F3",
                ["boolean", ["get", "isSelected"], false],
                "#9BC2F3",
                ["boolean", ["get", "isAssigned"], false],
                "#9BC2F3",
                "#FFFFFF",
              ],
              "fill-opacity": 1.0,
            },
          },
          "states-border-line",
        );

        map.current.addLayer(
          {
            id: "mandals-line",
            type: "line",
            source: "mandals-source",
            paint: {
              "line-color": "#CBD5E1",
              "line-width": 1.0,
              "line-opacity": 1.0,
            },
          },
          "states-border-line",
        );

        map.current.addLayer({
          id: "mandals-labels",
          type: "symbol",
          source: "mandals-source",
          layout: {
            "text-field": ["coalesce", ["get", "name"], ["get", "d"], ""],
            "text-size": 8.5,
            "text-anchor": "center",
            "text-justify": "center",
            "symbol-placement": "point",
            "text-allow-overlap": false,
          },
          paint: {
            "text-color": "#475569",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.5,
          },
        });

        // Click Handler for Mandals
        map.current.on("click", "mandals-fill", (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const mProps = feature.properties || {};
            const mId = Number(feature.id);

            const filter = activeFilterRef.current;
            const isAssigned = !!mProps.isAssigned || !!mProps.areaId;
            if (filter === "unassigned" && isAssigned) return;
            if (filter === "assigned" && !isAssigned) return;

            const searchParamsLocal = new URLSearchParams(
              window.location.search,
            );
            const editAreaIdLocal = searchParamsLocal.get("editAreaId");
            console.log(selectedRegionId, parentRegionId, "insideRegion")
            if (!editAreaIdLocal) {
              // VIEW MODE click -> Navigate directly to Area Details or notify if unassigned
              if (mProps.areaId) {
                const clickedArea = regionAreasData?.data?.find(
                  (a: any) => Number(a.areaId) === Number(mProps.areaId),
                );
                if (map.current) {
                  const center = map.current.getCenter();
                  sessionStorage.setItem(
                    "region_map_center",
                    JSON.stringify([center.lng, center.lat]),
                  );
                  sessionStorage.setItem(
                    "region_map_zoom",
                    map.current.getZoom().toString(),
                  );
                  const activeState = (window as any).__selectedState;
                  if (activeState) {
                    sessionStorage.setItem(
                      "region_map_selected_state",
                      JSON.stringify(activeState),
                    );
                  }
                  sessionStorage.setItem(
                    "region_map_is_zoomed",
                    isZoomed ? "true" : "false",
                  );
                  if (selectedRegion) {
                    sessionStorage.setItem(
                      "selected_region_id",
                      String(getRegionId(selectedRegion)),
                    );
                  }
                }
                navigate(`/role-manager/area-details/${mProps.areaId}`, {
                  state: {
                    feature,
                    areaDetails: clickedArea,
                  },
                });
              } else {
                toast.info(
                  `${mProps.name || mProps.d || "This mandal"} is not assigned to any Area.`,
                );
              }
              return;
            }

            // AREA EDIT MODE CLICK HANDLER
            const mandalObj = {
              i: mId,
              d: mProps.name || mProps.d || "",
              c: mProps.code || "",
              district_id: mProps.district_id,
            };
            toggleEditMandalSelectionRef.current(mandalObj);
          }
        });

        // Hover mouse effects for mandals
        let hoveredMandalIdLocal: any = null;
        map.current.on("mousemove", "mandals-fill", (e) => {
          if (hoveredMandalIdLocal !== null) {
            map.current?.setFeatureState(
              { source: "mandals-source", id: hoveredMandalIdLocal },
              { hover: false },
            );
          }
          if (e.features && e.features.length > 0) {
            const feat = e.features[0];
            const mProps = feat.properties || {};

            const filter = activeFilterRef.current;
            const isAssigned = !!mProps.isAssigned || !!mProps.areaId;
            if ((filter === "unassigned" && isAssigned) || (filter === "assigned" && !isAssigned)) {
              if (map.current) map.current.getCanvas().style.cursor = "";
              return;
            }

            hoveredMandalIdLocal = feat.id;
            if (hoveredMandalIdLocal !== null) {
              map.current?.setFeatureState(
                { source: "mandals-source", id: hoveredMandalIdLocal },
                { hover: true },
              );
            }
            if (map.current) {
              map.current.getCanvas().style.cursor = "pointer";
            }

            // View Mode Popups for areas
            const searchParamsLocal = new URLSearchParams(
              window.location.search,
            );
            const isEditModeLocal =
              !!searchParamsLocal.get("editRegionId") ||
              !!searchParamsLocal.get("editAreaId");
            if (
              !isEditModeLocal &&
              mProps?.areaName &&
              popup.current &&
              map.current
            ) {
              const html = `
                <div class="px-3 py-2 flex flex-col gap-0.5 bg-slate-900/90 text-white rounded-lg shadow-md max-w-xs font-sans border-0">
                  <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Area Details</span>
                  <span class="text-xs font-semibold">${mProps.areaName}</span>
                  <span class="text-[9px] text-slate-300 font-medium">Mandal: ${mProps.name || mProps.d}</span>
                </div>
              `;
              popup.current
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map.current);
            }
          }
        });

        map.current.on("mouseleave", "mandals-fill", () => {
          if (hoveredMandalIdLocal !== null) {
            map.current?.setFeatureState(
              { source: "mandals-source", id: hoveredMandalIdLocal },
              { hover: false },
            );
          }
          hoveredMandalIdLocal = null;
          popup.current?.remove();
          if (map.current) {
            map.current.getCanvas().style.cursor = "";
          }
        });
      }
    } catch (err) {
      console.error("RegionAreaEdit: Error loading mandals layers:", err);
    }
  }, [
    geoMasterData,
    areaGeoJsonData,
    regionAreasData,
    selectedRegion,
    editModeType,
    selectedDistricts,
    mapLoaded,
  ]);

  // ── Initialize MapLibre map ──────────────────────────────────────────────
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
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
              paint: { "background-color": "#D6E6FF" },
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
        className: "region-hover-popup",
        maxWidth: "none",
        offset: 12,
      });
      map.current.addControl(new maplibregl.NavigationControl(), "top-right");

      map.current.on("style.load", () => {
        // @ts-ignore
        map.current?.setProjection({ type: "globe" });

        // World land base
        map.current?.addSource("world-land", {
          type: "geojson",
          data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson",
        });
        map.current?.addLayer({
          id: "world-land-fill",
          type: "fill",
          source: "world-land",
          paint: { "fill-color": "#F0EEF0", "fill-opacity": 1 },
        });

        // Country (India) border
        map.current?.addSource("india-border", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.current?.addLayer({
          id: "india-fill",
          type: "fill",
          source: "india-border",
          paint: { "fill-color": "#F0EEF0", "fill-opacity": 1 },
        });
        map.current?.addLayer({
          id: "india-border-line",
          type: "line",
          source: "india-border",
          paint: { "line-color": "#94a3b8", "line-width": 1.2 },
        });

        // State borders
        map.current?.addSource("india-states", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
        });
        map.current?.addLayer({
          id: "states-fill",
          type: "fill",
          source: "india-states",
          paint: { "fill-color": "transparent" },
        });
        map.current?.addLayer({
          id: "states-border-line",
          type: "line",
          source: "india-states",
          paint: { "line-color": "#475569", "line-width": 1.5 },
        });

        // Region overlays (pre-created regions)
        map.current?.addSource("regions-source", {
          type: "geojson",
          data: { type: "FeatureCollection", features: [] },
          generateId: true,
        });
        map.current?.addLayer(
          {
            id: "regions-fill",
            type: "fill",
            source: "regions-source",
            paint: {
              "fill-color": "#9BC2F3",
              "fill-opacity": 0.5,
            },
          },
          "states-border-line",
        );
        map.current?.addLayer(
          {
            id: "regions-line",
            type: "line",
            source: "regions-source",
            paint: {
              "line-color": "#9BC2F3",
              "line-width": 1.8,
              "line-opacity": 1.0,
            },
          },
          "states-border-line",
        );

        // Region hover tooltip — premium card style
        let hoveredRegionId: any = null;
        map.current?.on("mousemove", "regions-fill", (e) => {
          const searchParamsLocal = new URLSearchParams(window.location.search);
          const isEditModeLocal = !!searchParamsLocal.get("editRegionId");
          if (isEditModeLocal) return; // Disable regions tooltips in Edit mode

          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const props = feature.properties || {};

            if (hoveredRegionId !== null)
              map.current?.setFeatureState(
                { source: "regions-source", id: hoveredRegionId },
                { hover: false },
              );
            hoveredRegionId = feature.id ?? null;
            if (hoveredRegionId !== null)
              map.current?.setFeatureState(
                { source: "regions-source", id: hoveredRegionId },
                { hover: true },
              );

            const rName =
              props.region_name || props.regionName || props.name || "—";
            const rCode =
              props.region_code || props.regionCode || props.code || "—";

            const html = `
              <div style="
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: #ffffff;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06);
                padding: 20px 22px 18px;
                min-width: 220px;
                border: 1px solid rgba(0,0,0,0.06);
              ">
                <div style="
                  font-size: 20px;
                  font-weight: 800;
                  color: #0f172a;
                  letter-spacing: 0.02em;
                  text-transform: uppercase;
                  margin-bottom: 16px;
                  line-height: 1.15;
                ">${rName}</div>
                <div style="height: 1px; background: #f1f5f9; margin-bottom: 14px;"></div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  <div>
                    <div style="
                      font-size: 10px;
                      font-weight: 700;
                      color: #94a3b8;
                      letter-spacing: 0.08em;
                      text-transform: uppercase;
                      margin-bottom: 5px;
                    ">Region</div>
                    <div style="display: flex; align-items: center; gap: 4px;">
                      <span style="color: #64748b; font-size: 12px;">📍</span>
                      <span style="
                        font-size: 13px;
                        font-weight: 600;
                        color: #1e293b;
                      ">${rName}</span>
                    </div>
                  </div>
                  <div>
                    <div style="
                      font-size: 10px;
                      font-weight: 700;
                      color: #94a3b8;
                      letter-spacing: 0.08em;
                      text-transform: uppercase;
                      margin-bottom: 5px;
                    ">Region Code</div>
                    <div style="
                      font-size: 13px;
                      font-weight: 700;
                      color: #1e293b;
                      font-family: monospace;
                      letter-spacing: 0.03em;
                    ">${rCode}</div>
                  </div>
                </div>
              </div>
            `;

            if (map.current && popup.current) {
              popup.current
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map.current);
            }
            if (map.current) map.current.getCanvas().style.cursor = "pointer";
          }
        });

        // Click on a region (Only in View Mode!)
        map.current?.on("click", "regions-fill", (e) => {
          const searchParamsLocal = new URLSearchParams(window.location.search);
          const isEditModeLocal =
            !!searchParamsLocal.get("editRegionId") ||
            !!searchParamsLocal.get("editAreaId");
          if (isEditModeLocal) return;

          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const rId = feature.properties?.region_id || feature.id || 1;
            const clickedRegionId = Number(rId);

            const isRegionAssigned = assignedRegionsRef.current.some(
              (ar) => Number(ar.id) === clickedRegionId,
            );
            const currentFilter = activeFilterRef.current;

            if (currentFilter === "assigned" && !isRegionAssigned) {
              console.log(
                "Ignored click on unassigned region:",
                clickedRegionId,
              );
              return;
            }
            if (currentFilter === "unassigned" && isRegionAssigned) {
              console.log("Ignored click on assigned region:", clickedRegionId);
              return;
            }

            const modeLocal = searchParamsLocal.get("mode");

            if (modeLocal === "area") {
              // AREA MODE: Zoom to region and show Areas/Mandals on the map
              setSelectedRegion(feature);
              // Persist region ID so AreaDetailsView can pass it back when user clicks Edit Area
              sessionStorage.setItem(
                "selected_region_id",
                String(getRegionId(feature)),
              );
              setActiveAreaId(null);
              setAssignPanelOpen(true);
              setIsZoomed(true);
              if (map.current) {
                map.current.fitBounds(getFeatureBounds(feature), {
                  padding: 120,
                  duration: 1500,
                });
              }
            } else {
              // REGION MODE: Check if parent state is already selected. If not, zoom to state first.
              const stateId = Number(feature.properties?.state_id);
              const currentSelectedStateId = (window as any).__selectedStateId;

              if (
                !currentSelectedStateId ||
                currentSelectedStateId !== stateId
              ) {
                const masterData = geoMasterDataRef.current;
                if (masterData && stateId) {
                  const stateObj = masterData.countries
                    .flatMap((c) => c.states ?? [])
                    .find((s) => s.i === stateId);
                  if (stateObj) {
                    const stateFeature = {
                      type: "Feature" as const,
                      geometry: stateObj.g as any,
                      properties: {
                        id: stateObj.i,
                        name: stateObj.d,
                        code: stateObj.c,
                      },
                    };

                    setSelectedState(stateFeature);
                    map.current?.fitBounds(getFeatureBounds(stateFeature), {
                      padding: 100,
                      duration: 1200,
                    });
                    setIsZoomed(true);

                    // First click: open assign/unassign panel
                    setAssignPanelOpen(true);

                    setRegionSearch("");
                    return; // Zoom to state first, do not navigate yet
                  }
                }
              }

              // Direct navigation to Region Details view if state is already selected!
              if (map.current) {
                const center = map.current.getCenter();
                sessionStorage.setItem(
                  "region_map_center",
                  JSON.stringify([center.lng, center.lat]),
                );
                sessionStorage.setItem(
                  "region_map_zoom",
                  map.current.getZoom().toString(),
                );
                const activeState = (window as any).__selectedState;
                if (activeState) {
                  sessionStorage.setItem(
                    "region_map_selected_state",
                    JSON.stringify(activeState),
                  );
                }
                sessionStorage.setItem(
                  "region_map_is_zoomed",
                  isZoomed ? "true" : "false",
                );
              }
              navigate(`/role-manager/region-details/${rId}`, {
                state: { feature },
              });
            }
          }
        });

        map.current?.on("mouseleave", "regions-fill", () => {
          if (hoveredRegionId !== null)
            map.current?.setFeatureState(
              { source: "regions-source", id: hoveredRegionId },
              { hover: false },
            );
          hoveredRegionId = null;
          popup.current?.remove();
          if (map.current) map.current.getCanvas().style.cursor = "";
        });

        // State click → zoom in and reveal district boundaries (Only in View Mode!)
        // State click → first click opens assign/unassign panel, second click opens edit screen
        map.current?.on("click", "states-fill", (e) => {
          const searchParamsLocal = new URLSearchParams(window.location.search);
          const isEditModeLocal =
            !!searchParamsLocal.get("editRegionId") ||
            !!searchParamsLocal.get("editAreaId");
          if (isEditModeLocal) return;

          const modeLocal = searchParamsLocal.get("mode");

          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const clickedStateId = feature.properties?.id || feature.id;

            // Check if this state is already selected (second click → open edit)
            const currentSelectedStateId = (window as any).__selectedStateId;
            const panelOpen = (window as any).__assignPanelOpen;

            if (
              currentSelectedStateId === clickedStateId &&
              panelOpen === false
            ) {
              // Second click on same state — open edit by navigating with editRegionId if one is selected
              // (Edit flow is triggered externally; here we just allow district interaction)
              return;
            }

            setSelectedState({
              type: "Feature",
              geometry: feature.geometry,
              properties: feature.properties,
            });
            map.current?.fitBounds(getFeatureBounds(feature), {
              padding: 100,
              duration: 1200,
            });
            setIsZoomed(true);

            // First click: open assign/unassign panel
            setAssignPanelOpen(true);

            setRegionSearch("");
          }
        });

        // State hover cursor
        map.current?.on("mouseenter", "states-fill", () => {
          const searchParamsLocal = new URLSearchParams(window.location.search);
          const isEditModeLocal =
            !!searchParamsLocal.get("editRegionId") ||
            !!searchParamsLocal.get("editAreaId");
          if (isEditModeLocal) return;

          // Disable hover interactions in Area Mode
          const modeLocal = searchParamsLocal.get("mode");

          if (map.current && !selectedState)
            map.current.getCanvas().style.cursor = "pointer";
        });
        map.current?.on("mouseleave", "states-fill", () => {
          if (map.current) map.current.getCanvas().style.cursor = "";
        });

        setMapLoaded((p) => p + 1);

        // Retrieve and restore map viewport state from sessionStorage if returning from details view
        const savedCenter = sessionStorage.getItem("region_map_center");
        const savedZoom = sessionStorage.getItem("region_map_zoom");
        const savedSelectedState = sessionStorage.getItem(
          "region_map_selected_state",
        );
        const savedIsZoomed = sessionStorage.getItem("region_map_is_zoomed");

        const searchParamsLocal = new URLSearchParams(window.location.search);
        const isEditModeLocal = !!searchParamsLocal.get("editRegionId");

        if (savedCenter && savedZoom && !isEditModeLocal) {
          try {
            const center = JSON.parse(savedCenter);
            const zoom = Number(savedZoom);
            map.current?.jumpTo({ center, zoom });

            if (savedSelectedState) {
              setSelectedState(JSON.parse(savedSelectedState));
              setAssignPanelOpen(true);
            }
            if (savedIsZoomed === "true") {
              setIsZoomed(true);
            }
          } catch (err) {
            console.error(
              "Failed to restore map state from sessionStorage:",
              err,
            );
            map.current?.flyTo({
              center: [78.9629, 20.5937],
              zoom: 3.5,
              duration: 3000,
              essential: true,
            });
          }
          // Clear session keys so they don't persist next fresh load
          sessionStorage.removeItem("region_map_center");
          sessionStorage.removeItem("region_map_zoom");
          sessionStorage.removeItem("region_map_selected_state");
          sessionStorage.removeItem("region_map_is_zoomed");
        } else if (!isEditModeLocal) {
          map.current?.flyTo({
            center: [78.9629, 20.5937],
            zoom: 3.5,
            duration: 3000,
            essential: true,
          });
        }

        setTimeout(() => map.current?.resize(), 100);
      });
    } catch (err) {
      console.error("RegionAreaEdit: Failed to initialize map:", err);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      // Note: selected_region_id is NOT cleared here — it is cleared inside
      // the area-edit init useEffect after it has been successfully consumed.
      // Clearing here would remove it before AreaDetailsView reads it.
    };
  }, []);

  const { assignedRegions, unassignedRegions } = useMemo(() => {
    if (!regionsByCountryData || !geoMasterData)
      return { assignedRegions: [], unassignedRegions: [] };
    try {
      const decompressed = decompressGeoJSON(regionsByCountryData);
      const features: any[] = decompressed?.features || [];
      const currentStateId = selectedState?.properties?.id;
      const stateFeatures = currentStateId
        ? features.filter(
          (f: any) => Number(f.properties?.state_id) === currentStateId,
        )
        : features;

      const apiRegions = regionsByStateData?.data || [];

      const mappedFeatures = stateFeatures.map((f: any) => {
        const regionId = f.properties?.region_id || f.id;
        const matchingApiRegion = apiRegions.find(
          (r: any) => Number(r.id) === Number(regionId),
        );
        // Match from API is_assigned, fallback to local district counting if API hasn't loaded yet
        const isAssigned = matchingApiRegion
          ? Number(matchingApiRegion.is_assigned) === 1
          : getDistrictIdsFromRegion(f, geoMasterData).length > 0;
        return {
          ...f,
          isAssignedFromApi: isAssigned,
        };
      });

      const assigned = mappedFeatures
        .filter((f: any) => {
          if (isAreaMode) return true;
          return f.isAssignedFromApi;
        })
        .filter((f: any) => {
          if (!isAreaMode) return true;
          if (!regionsWithAreas) return true; // loading fallback
          const regionId = f.properties?.region_id || f.id;
          return regionsWithAreas.has(Number(regionId));
        })
        .map((f: any) => ({
          id: f.properties?.region_id || f.id,
          name: f.properties?.region_name || f.properties?.name || "Region",
          code: f.properties?.region_code || f.properties?.code || "",
          rawFeature: f,
        }));

      const unassigned = mappedFeatures
        .filter((f: any) => {
          if (isAreaMode) return true;
          return !f.isAssignedFromApi;
        })
        .filter((f: any) => {
          if (!isAreaMode) return true;
          if (!regionsWithAreas) return true; // loading fallback
          const regionId = f.properties?.region_id || f.id;
          return regionsWithAreas.has(Number(regionId));
        })
        .map((f: any) => ({
          id: f.properties?.region_id || f.id,
          name: f.properties?.region_name || f.properties?.name || "Region",
          code: f.properties?.region_code || f.properties?.code || "",
          rawFeature: f,
        }));

      return { assignedRegions: assigned, unassignedRegions: unassigned };
    } catch {
      return { assignedRegions: [], unassignedRegions: [] };
    }
  }, [regionsByCountryData, geoMasterData, selectedState, regionsByStateData, isAreaMode, regionsWithAreas]);

  const assignedRegionsRef = useRef(assignedRegions);
  useEffect(() => {
    assignedRegionsRef.current = assignedRegions;
  }, [assignedRegions]);

  // Automatically sync selectedState when selectedRegion changes to ensure regions are shown & isolated
  useEffect(() => {
    if (selectedRegion && geoMasterData) {
      const stateId = Number(
        selectedRegion.properties?.state_id ||
        selectedRegion.properties?.stateId
      );
      if (stateId && (!selectedState || Number(selectedState.properties?.id) !== stateId)) {
        const stateObj = geoMasterData.countries
          .flatMap((c: any) => c.states ?? [])
          .find((s: any) => s.i === stateId);
        if (stateObj) {
          setSelectedState({
            type: "Feature",
            id: stateObj.i,
            geometry: stateObj.g,
            properties: {
              id: stateObj.i,
              name: stateObj.d,
              code: stateObj.c,
            },
          });
          setIsZoomed(true);
        }
      }
    }
  }, [selectedRegion, geoMasterData, selectedState]);

  // Restore selectedState or selectedRegion when returning to View Mode
  useEffect(() => {
    if (isEditMode) return;

    const mode = getSearchParamFallback("mode") || "region";

    if (mode === "region") {
      const savedSelectedState = sessionStorage.getItem("region_map_selected_state");
      if (savedSelectedState) {
        try {
          const stateObj = JSON.parse(savedSelectedState);
          setSelectedState(stateObj);
          setAssignPanelOpen(true);
          setIsZoomed(true);
        } catch (e) {
          console.error("Failed to restore selected state:", e);
        }
        sessionStorage.removeItem("region_map_selected_state");
      }
    } else if (mode === "area") {
      const savedRegionId = sessionStorage.getItem("selected_region_id");
      if (savedRegionId && allRegionsData?.features?.length > 0) {
        const regionIdNum = Number(savedRegionId);
        const matchedRegion = allRegionsData.features.find(
          (f: any) => getRegionId(f) === regionIdNum
        );
        if (matchedRegion && !selectedRegion) {
          setSelectedRegion(matchedRegion);
          setAssignPanelOpen(true);
          setIsZoomed(true);
          sessionStorage.removeItem("selected_region_id");
        }
      }
    }
  }, [allRegionsData, selectedRegion, isEditMode, searchParams]);

  const resetView = () => {
    map.current?.flyTo({
      center: [78.9629, 20.5937],
      zoom: 3.5,
      duration: 1500,
      essential: true,
    });
    setIsZoomed(false);
    setSelectedState(null); // triggers stateRegionsData → allRegionsData → regions re-render
    setSelectedRegion(null); // Clear selected region when resetting to India overview
    // Clear district boundaries (only visible inside a selected state)
    setAssignPanelOpen(false);

    setFilterDropdownOpen(false);
    setActiveFilter("all");
    setShowRegionsList(false);
    (
      map.current?.getSource("districts-source") as maplibregl.GeoJSONSource
    )?.setData({ type: "FeatureCollection", features: [] });
  };

  // ── Clear edit mode, reset states, and return map to India overview ─────
  const clearEditMode = () => {
    setSearchParams({});
    setRegionName("");
    setRegionCode("");
    setSelectedDistricts([]);
    setSelectedRegionalOfficerId(null);
    setSelectedIntelligenceOfficerId(null);
    setSelectedFieldOfficerId(null);
    setHasInitialized(false);
    setEditDropdownOpen(false);
    setEditSearchQuery("");

    if (editModeType === "area") {
      if (selectedRegion) {
        sessionStorage.setItem(
          "selected_region_id",
          String(getRegionId(selectedRegion)),
        );
      }
      navigate("/role-manager/region-area-edit?mode=area");
      return;
    }

    if (editModeType === "region") {
      if (selectedState) {
        sessionStorage.setItem(
          "region_map_selected_state",
          JSON.stringify(selectedState),
        );
        if (map.current) {
          const center = map.current.getCenter();
          sessionStorage.setItem(
            "region_map_center",
            JSON.stringify([center.lng, center.lat]),
          );
          sessionStorage.setItem(
            "region_map_zoom",
            map.current.getZoom().toString(),
          );
          sessionStorage.setItem("region_map_is_zoomed", "true");
        }
      }
      navigate("/role-manager/region-area-edit?mode=region");
      return;
    }
    if (selectedState && map.current) {
      map.current.fitBounds(getFeatureBounds(selectedState), {
        padding: 100,
        duration: 1500,
      });
      setIsZoomed(true);

      // Clear district boundaries active state
      (
        map.current?.getSource("districts-source") as maplibregl.GeoJSONSource
      )?.setData({ type: "FeatureCollection", features: [] });
    } else {
      resetView();
    }
  };

  // Remove district tag pill
  const handleRemoveDistrict = (district: any) => {
    const dtId = Number(district.id ?? district.featureId);
    setSelectedDistricts((prev) =>
      prev.filter((d) => Number(d.id ?? d.featureId) !== dtId),
    );
    setReassignedDistricts((prev) =>
      prev.filter((item) => item.districtId !== dtId),
    );
  };

  // Handle Zoom Out transition when returning to India view, and update filters for state isolation
  useEffect(() => {
    if (!map.current || mapLoaded === 0) return;

    try {
      if (selectedState) {
        const stateId = selectedState.properties?.id;
        if (stateId !== undefined) {
          // Hide outer country outline and country fill, and world land
          if (map.current.getLayer("india-fill")) {
            map.current.setLayoutProperty("india-fill", "visibility", "none");
          }
          if (map.current.getLayer("india-border-line")) {
            map.current.setLayoutProperty("india-border-line", "visibility", "none");
          }
          if (map.current.getLayer("world-land-fill")) {
            map.current.setLayoutProperty("world-land-fill", "visibility", "none");
          }

          // Make states-fill solid grey to render the selected state
          if (map.current.getLayer("states-fill")) {
            map.current.setPaintProperty("states-fill", "fill-color", "#F0EEF0");
            map.current.setFilter("states-fill", ["==", ["get", "id"], stateId]);
            // If a region is selected in Area Mode, hide the state-fill completely so only the region is visible
            if (editModeType === "area" && selectedRegion) {
              map.current.setLayoutProperty("states-fill", "visibility", "none");
            } else {
              map.current.setLayoutProperty("states-fill", "visibility", "visible");
            }
          }
          if (map.current.getLayer("states-border-line")) {
            map.current.setFilter("states-border-line", ["==", ["get", "id"], stateId]);
            if (editModeType === "area" && selectedRegion) {
              map.current.setLayoutProperty("states-border-line", "visibility", "none");
            } else {
              map.current.setLayoutProperty("states-border-line", "visibility", "visible");
            }
          }
        }
      } else {
        // Restore country borders and fill, and world land
        if (map.current.getLayer("india-fill")) {
          map.current.setLayoutProperty("india-fill", "visibility", "visible");
        }
        if (map.current.getLayer("india-border-line")) {
          map.current.setLayoutProperty("india-border-line", "visibility", "visible");
        }
        if (map.current.getLayer("world-land-fill")) {
          map.current.setLayoutProperty("world-land-fill", "visibility", "visible");
        }

        // Reset states-fill to transparent
        if (map.current.getLayer("states-fill")) {
          map.current.setPaintProperty("states-fill", "fill-color", "transparent");
          map.current.setFilter("states-fill", null);
          map.current.setLayoutProperty("states-fill", "visibility", "visible");
        }
        if (map.current.getLayer("states-border-line")) {
          map.current.setFilter("states-border-line", null);
          map.current.setLayoutProperty("states-border-line", "visibility", "visible");
        }

        if (isZoomed) {
          resetView();
        }
      }
    } catch (err) {
      console.error("Error updating map filters for selected state:", err);
    }
  }, [selectedState, mapLoaded, isZoomed, selectedRegion, editModeType]);

  // Submit edit form handler
  const handleSave = async () => {
    if (!regionName || !regionCode || selectedDistricts.length === 0) {
      toast.error(
        editModeType === "area"
          ? "Please fill in all details and select mandals"
          : "Please fill in all details and select districts",
      );
      return;
    }

    if (editModeType === "area") {
      const mandalIds = selectedDistricts.map((m) =>
        Number(m.id ?? m.featureId),
      );

      // Verify that the selection forms a contiguous area
      if (geoMasterData && !isSelectionContiguous(mandalIds, geoMasterData)) {
        toast.error("Your selected mandals must form a contiguous (fully connected) area. Please adjust your selection.");
        return;
      }

      try {

        // Helper: look up the real district_id for a mandal from geoMasterData
        const getDistrictIdForMandal = (mandalId: number): number => {
          let found = 0;
          geoMasterData?.countries?.forEach((c: any) =>
            c.states?.forEach((s: any) =>
              s.districts?.forEach((d: any) => {
                if (d.mandals?.some((m: any) => Number(m.i) === mandalId)) {
                  found = d.i;
                }
              }),
            ),
          );
          return found || 1;
        };

        // 1. Group and silently update any source areas that lost mandals
        const reassignmentsBySourceArea: Record<
          number,
          {
            areaName: string;
            mandalIds: number[];
            fieldOfficerId: number | null;
            lostMandalIds: number[];
          }
        > = {};

        reassignedDistricts.forEach((item: any) => {
          const fromAreaId = item.fromRegionId;
          if (!reassignmentsBySourceArea[fromAreaId]) {
            const rawArea = (regionAreasData?.data || []).find(
              (a: any) => Number(a.id || a.area_id) === fromAreaId,
            );
            let mIds: number[] = [];
            if (Array.isArray(rawArea?.mandal_ids)) {
              mIds = rawArea.mandal_ids.map(Number);
            } else if (Array.isArray(rawArea?.mandalIds)) {
              mIds = rawArea.mandalIds.map(Number);
            } else if (Array.isArray(rawArea?.assignments)) {
              mIds = rawArea.assignments.map((asg: any) => Number(asg.mandal_id || asg.mandalId));
            }
            reassignmentsBySourceArea[fromAreaId] = {
              areaName: rawArea?.area_name || rawArea?.areaName || "Old Area",
              fieldOfficerId: rawArea?.field_officer_id
                ? Number(rawArea.field_officer_id)
                : null,
              mandalIds: mIds,
              lostMandalIds: [],
            };
          }
          reassignmentsBySourceArea[fromAreaId].lostMandalIds.push(
            item.districtId,
          );
        });

        // Silent background saves — remove mandals stolen from other areas
        for (const [fromAreaIdStr, data] of Object.entries(
          reassignmentsBySourceArea,
        )) {
          const fromAreaId = Number(fromAreaIdStr);
          const remainingMandalIds = data.mandalIds.filter(
            (mId) => !data.lostMandalIds.includes(mId),
          );

          const silentPayload = {
            area_id: fromAreaId,
            areaName: data.areaName,
            field_officer_id: data.fieldOfficerId,
            assignments: remainingMandalIds.map((mId) => ({
              district_id: getDistrictIdForMandal(mId),
              mandal_id: mId,
            })),
          };

          console.log(
            `%c[Background Silent Area Reassignment]`,
            "color: #e11d48; font-weight: bold;",
            {
              action: "Removing mandal(s) from old area",
              sourceAreaId: fromAreaId,
              removedMandalIds: data.lostMandalIds,
              payload: silentPayload,
            },
          );

          await updateArea(silentPayload).unwrap();
        }

        // 2. Fire primary target area update with exact API fields
        const targetPayload = {
          area_id: Number(editAreaId),
          areaName: regionName,
          field_officer_id: selectedFieldOfficerId
            ? Number(selectedFieldOfficerId)
            : null,
          assignments: mandalIds.map((mId) => ({
            district_id: getDistrictIdForMandal(mId),
            mandal_id: mId,
          })),
        };

        console.log(
          `%c[Primary Area Save]`,
          "color: #2563eb; font-weight: bold;",
          {
            action: "Updating area and mandal assignments",
            targetAreaId: Number(editAreaId),
            payload: targetPayload,
          },
        );

        const res = await updateArea(targetPayload).unwrap();

        const successMsg = res?.message || res?.data?.message || "Area updated successfully!";
        sessionStorage.setItem("toast_success_message", successMsg);

        // Return to initial map view with the assigned/unassigned filters restored
        if (selectedRegion) {
          sessionStorage.setItem(
            "selected_region_id",
            String(getRegionId(selectedRegion)),
          );
        }
        window.location.href = "/role-manager/region-area-edit?mode=area";
      } catch (err: any) {
        console.error("RegionAreaEdit: Area update failed:", err);
        toast.error(
          err?.data?.message || err?.message || "Failed to update area. Please try again.",
        );
      }
      return;
    }

    const districtIds = selectedDistricts.map((d) =>
      Number(d.id ?? d.featureId),
    );

    // Verify that the selection forms a contiguous region
    if (geoMasterData && !isDistrictSelectionContiguous(districtIds, geoMasterData)) {
      toast.error("Your selected districts must form a contiguous (fully connected) region. Please adjust your selection.");
      return;
    }

    try {

      // 1. Group and silently update any source regions that lost districts
      const reassignmentsBySourceRegion: Record<
        number,
        {
          rawFeature: any;
          lostDistrictIds: number[];
        }
      > = {};

      reassignedDistricts.forEach((item) => {
        if (!reassignmentsBySourceRegion[item.fromRegionId]) {
          reassignmentsBySourceRegion[item.fromRegionId] = {
            rawFeature: item.fromRegionRawFeature,
            lostDistrictIds: [],
          };
        }
        reassignmentsBySourceRegion[item.fromRegionId].lostDistrictIds.push(
          item.districtId,
        );
      });

      // Execute silent updates for each modified source region
      for (const [sourceRegionIdStr, data] of Object.entries(
        reassignmentsBySourceRegion,
      )) {
        const sourceRegionId = Number(sourceRegionIdStr);
        const fromRegionProps = data.rawFeature.properties || {};
        console.log("From Region Props", fromRegionProps);

        // Dynamic fetch to retrieve real active regional and intelligence officer assignments from db
        let activeProps = { ...fromRegionProps };
        try {
          const detailsRes = await triggerGetRegionGeoJson({
            region_id: sourceRegionId,
          }).unwrap();
          const fetchedProps =
            detailsRes?.features?.[0]?.properties ||
            detailsRes?.data?.features?.[0]?.properties;
          if (fetchedProps) {
            console.log(
              `Successfully fetched fresh details for source region ${sourceRegionId}:`,
              fetchedProps,
            );
            activeProps = { ...activeProps, ...fetchedProps };
          }
        } catch (fetchErr) {
          console.warn(
            `Failed to fetch fresh properties for background region ${sourceRegionId}:`,
            fetchErr,
          );
        }

        const oldIds = getDistrictIdsFromRegion(data.rawFeature, geoMasterData);
        const newIds = oldIds.filter(
          (id) => !data.lostDistrictIds.includes(id),
        );

        if (newIds.length === 0) {
          console.warn(
            `[Background Silent Reassignment] Skipping source region ${sourceRegionId} because it would be left with 0 districts.`,
          );
          continue;
        }

        const silentPayload = {
          region_id: sourceRegionId,
          regionName: activeProps.region_name || activeProps.name,
          regionCode: activeProps.region_code || activeProps.code,
          district_ids: newIds,
          stateId: Number(activeProps.state_id),
          regional_officer_id: activeProps.regional_officer_id
            ? Number(activeProps.regional_officer_id)
            : null,
          intelligence_officer_id: activeProps.intelligence_officer_id
            ? Number(activeProps.intelligence_officer_id)
            : null,
        };

        console.log(
          `%c[Background Silent Reassignment API Payload]`,
          "color: #e11d48; font-weight: bold;",
          {
            action: "Removing district(s) from old region",
            districtIdsToRemove: data.lostDistrictIds,
            sourceRegionId,
            payload: silentPayload,
          },
        );

        await updateRegion(silentPayload).unwrap();
      }

      // 2. Fire primary target region update
      const targetPayload = {
        region_id: Number(editRegionId),
        regionName,
        regionCode,
        district_ids: districtIds,
        stateId: Number(selectedState?.properties?.id),
        regional_officer_id: selectedRegionalOfficerId
          ? Number(selectedRegionalOfficerId)
          : null,
        intelligence_officer_id: selectedIntelligenceOfficerId
          ? Number(selectedIntelligenceOfficerId)
          : null,
      };

      console.log(
        `%c[Primary Region Save API Payload]`,
        "color: #2563eb; font-weight: bold;",
        {
          action: "Updating current region districts and details",
          targetRegionId: Number(editRegionId),
          payload: targetPayload,
        },
      );

      const res = await updateRegion(targetPayload).unwrap();

      const successMsg = res?.message || res?.data?.message || "Region details and reassignments updated successfully!";
      sessionStorage.setItem("toast_success_message", successMsg);

      // 1. Fetch the updated regions again (refetch caches)
      refetchRegionsByCountry();
      if (refetchRegionsByState) {
        refetchRegionsByState();
      }

      // 2. Select "assigned" in active filter dropdown
      setActiveFilter("assigned");

      // 3. Clear everything (reset state & search params)
      setSelectedDistricts([]);
      setReassignedDistricts([]);
      setRegionName("");
      setRegionCode("");
      setSelectedRegionalOfficerId(null);
      setSelectedIntelligenceOfficerId(null);
      setSearchParams({});

      // 4. Navigate back to initial map view with the assigned/unassigned filters restored
      if (selectedState) {
        sessionStorage.setItem(
          "region_map_selected_state",
          JSON.stringify(selectedState),
        );
        if (map.current) {
          const center = map.current.getCenter();
          sessionStorage.setItem(
            "region_map_center",
            JSON.stringify([center.lng, center.lat]),
          );
          sessionStorage.setItem(
            "region_map_zoom",
            map.current.getZoom().toString(),
          );
          sessionStorage.setItem("region_map_is_zoomed", "true");
        }
      }
      window.location.href = "/role-manager/region-area-edit?mode=region";
    } catch (err: any) {
      console.error("RegionAreaEdit: Update failed:", err);
      const errMsg =
        err?.data?.message ||
        err?.message ||
        "";
      if (errMsg.includes("already assigned to another region")) {
        toast.error(
          errMsg + " (Note: A region must always have at least one district. If the other region only has this one district, please assign another district to it first before reassigning this one.)"
        );
      } else {
        toast.error(errMsg || "Failed to update region. Please try again.");
      }
    }
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex flex-col md:flex-row font-sans">
      {/* MAP VIEWPORT LAYER */}
      <div className="w-full md:absolute md:inset-0 h-full z-0">
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      {/* Top-left controls */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        <button
          onClick={() => {
            if (isEditMode) {
              clearEditMode();
            } else if (editModeType === "area" && selectedRegion) {
              setSelectedRegion(null);
              setActiveAreaId(null);
              if (selectedState && map.current) {
                map.current.fitBounds(getFeatureBounds(selectedState), {
                  padding: 100,
                  duration: 1500,
                });
              }
            } else if (selectedState) {
              resetView();
            } else {
              navigate("/role-manager/create-regions-and-areas?mode=view");
            }
          }}
          className="flex items-center gap-2 bg-white rounded-full px-4 h-10 shadow-md text-sm font-medium text-slate-700 hover:opacity-80 transition cursor-pointer border-0"
        >
          <ChevronLeft className="w-4 h-4" />
          {isEditMode ? "Cancel" : "Back"}
        </button>

        {isZoomed && !isEditMode && (
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
      {(isLoadingGeoData || isLoadingGeoData) && (
        <div className="absolute top-4 right-16 z-20 flex items-center gap-2 bg-white rounded-full px-4 h-10 shadow-md text-sm text-slate-600 border-0">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          Loading map data...
        </div>
      )}

      {/* Hint banner */}
      {!isZoomed && !isEditMode && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md text-sm text-slate-600 whitespace-nowrap">
          {getSearchParamFallback("mode") === "area"
            ? "Click on a state to view its regions and mandal (area) boundaries"
            : "Click on a state to view its regions and district boundaries"}
        </div>
      )}

      {/* FLOATING SIDEBAR EDIT CARD PANEL */}
      {isEditMode && (
        <div className="flex-1 md:flex-none z-10 pointer-events-none w-full md:w-[480px] flex items-end md:items-center justify-center p-4 md:p-6 md:absolute md:right-0 md:inset-y-0 select-none">
          <div className="relative w-full max-h-[50vh] md:max-h-[90vh] flex flex-col bg-white rounded-[28px] border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden p-6 pointer-events-auto animate-in slide-in-from-right duration-500">
            {/* Form Header */}
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex flex-col">
                <h3 className="text-lg font-black text-slate-800 leading-none tracking-tight font-heading">
                  {editModeType === "area" ? "Edit Area" : "Edit Region"}
                </h3>
                <p className="text-[10px] text-slate-400 font-semibold mt-1">
                  Operational Details Setup • ID:{" "}
                  <span className="font-mono">
                    {editAreaId || editRegionId}
                  </span>
                </p>
              </div>

              <button
                onClick={clearEditMode}
                className="p-1.5 rounded-full hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm cursor-pointer bg-white"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
              </button>
            </div>

            <div className="h-px bg-slate-100 mb-4 shrink-0 w-full" />

            {/* Form fields body (Scrollable) */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-5 mb-5 custom-scrollbar">
              {/* Input: Region/Area Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">
                  {editModeType === "area" ? "Area Name" : "Region Name"}
                </label>
                <Input
                  variant="form"
                  placeholder={
                    editModeType === "area"
                      ? "e.g. Nellore Area"
                      : "e.g. Nellore"
                  }
                  value={regionName}
                  onChange={(e) => setRegionName(e.target.value)}
                  className="px-3.5 text-sm h-11 border-slate-200"
                />
              </div>

              {/* Input: Region/Area Code */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">
                  {editModeType === "area" ? "Area Code" : "Region Code"}
                </label>
                <Input
                  variant="form"
                  placeholder={
                    editModeType === "area" ? "e.g. NEL-01" : "e.g. SAH-01"
                  }
                  value={regionCode}
                  onChange={(e) => setRegionCode(e.target.value)}
                  disabled={editModeType === "region"}
                  className="px-3.5 text-sm h-11 border-none font-mono disabled:text-slate-400 disabled:cursor-not-allowed"
                  wrapperClassName={
                    editModeType === "region"
                      ? "bg-slate-50 border-slate-200/80 opacity-70 cursor-not-allowed"
                      : ""
                  }
                />
              </div>

              {/* Region Mode Selection: Regional and Intelligence Officers */}
              {editModeType === "region" && (
                <>
                  {/* Select: Regional Officer dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">
                      Regional Officer
                    </label>
                    <div className="relative flex items-center h-11 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all overflow-hidden">
                      <select
                        value={selectedRegionalOfficerId ?? ""}
                        onChange={(e) =>
                          setSelectedRegionalOfficerId(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full h-full border-none outline-none bg-transparent px-4 text-slate-700 text-sm font-semibold cursor-pointer"
                      >
                        <option value="">Select Regional Officer</option>
                        {regionalOfficers.map((officer, index) => {
                          const id = officer.id ?? officer.i ?? officer.user_id;
                          const fullName =
                            `${officer.first_name || officer.fname || ""} ${officer.last_name || officer.lname || ""}`.trim();
                          const label =
                            fullName ||
                            officer.name ||
                            officer.d ||
                            officer.username ||
                            `Regional Officer ${index + 1}`;
                          return (
                            <option key={id} value={id}>
                              {label}{" "}
                              {officer.officer_code
                                ? `(${officer.officer_code})`
                                : ""}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Select: Intelligence Officer dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">
                      Intelligence Officer
                    </label>
                    <div className="relative flex items-center h-11 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all overflow-hidden">
                      <select
                        value={selectedIntelligenceOfficerId ?? ""}
                        onChange={(e) =>
                          setSelectedIntelligenceOfficerId(
                            e.target.value ? Number(e.target.value) : null,
                          )
                        }
                        className="w-full h-full border-none outline-none bg-transparent px-4 text-slate-700 text-sm font-semibold cursor-pointer"
                      >
                        <option value="">Select Intelligence Officer</option>
                        {intelligenceOfficers.map((officer, index) => {
                          const id = officer.id ?? officer.i ?? officer.user_id;
                          const fullName =
                            `${officer.first_name || officer.fname || ""} ${officer.last_name || officer.lname || ""}`.trim();
                          const label =
                            fullName ||
                            officer.name ||
                            officer.d ||
                            officer.username ||
                            `Intelligence Officer ${index + 1}`;
                          return (
                            <option key={id} value={id}>
                              {label}{" "}
                              {officer.officer_code
                                ? `(${officer.officer_code})`
                                : ""}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Area Mode Selection: Field Officers */}
              {editModeType === "area" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">
                    Field Officer
                  </label>
                  <div className="relative flex items-center h-11 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all overflow-hidden">
                    <select
                      value={selectedFieldOfficerId ?? ""}
                      onChange={(e) =>
                        setSelectedFieldOfficerId(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      className="w-full h-full border-none outline-none bg-transparent px-4 text-slate-700 text-sm font-semibold cursor-pointer"
                    >
                      <option value="">Select Field Officer</option>
                      {fieldOfficers.map((officer, index) => {
                        const id = officer.id ?? officer.i ?? officer.user_id;
                        const fullName =
                          `${officer.first_name || officer.fname || ""} ${officer.last_name || officer.lname || ""}`.trim();
                        const label =
                          fullName ||
                          officer.name ||
                          officer.d ||
                          officer.username ||
                          `Field Officer ${index + 1}`;
                        return (
                          <option key={id} value={id}>
                            {label}{" "}
                            {officer.officer_code
                              ? `(${officer.officer_code})`
                              : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {(!selectedFieldOfficerId ||
                    Number(selectedFieldOfficerId) === 0) && (
                      <span className="text-[11px] font-semibold text-amber-600 ml-0.5 mt-0.5">
                        Field Officer is currently unassigned for this area
                      </span>
                    )}
                </div>
              )}

              {/* Tag Selection search + pills */}
              <div ref={editDropdownRef} className="flex flex-col gap-2 relative">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-0.5">
                  {editModeType === "area"
                    ? "Mandal Selection"
                    : "District Selection"}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setEditDropdownOpen(!editDropdownOpen)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 flex items-center justify-between text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all hover:bg-slate-50/50"
                  >
                    <span className="truncate">
                      {selectedDistricts.length > 0
                        ? `${selectedDistricts.length} ${editModeType === "area" ? "Mandal(s)" : "District(s)"
                        } Selected`
                        : editModeType === "area"
                          ? "Select Mandals"
                          : "Select Districts"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${editDropdownOpen ? "rotate-180" : ""
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {editDropdownOpen && (
                    <div className="mt-2 bg-white border border-slate-200 rounded-[16px] shadow-lg p-3 flex flex-col gap-2 max-h-[200px] overflow-y-auto z-50">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder={
                            editModeType === "area" ? "Search mandal..." : "Search district..."
                          }
                          value={editSearchQuery}
                          onChange={(e) => setEditSearchQuery(e.target.value)}
                          className="h-[36px] w-full rounded-[8px] border border-slate-200 px-3 pl-8 text-[13px] font-semibold outline-none focus:border-blue-500 transition-colors"
                        />
                        <svg
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 pr-1">
                        {editModeType === "region" ? (
                          filteredEditItems.length > 0 ? (
                            filteredEditItems.map((district) => {
                              const isAssigned = otherAssignedDistrictIds.has(district.i);
                              const isSelected = selectedDistricts.some(
                                (d) => Number(d.id ?? d.featureId) === district.i
                              );

                              return (
                                <div
                                  key={district.i}
                                  onClick={() => toggleEditDistrictSelection(district)}
                                  className={`flex items-center justify-between px-3 py-2 rounded-[8px] cursor-pointer text-[13px] font-semibold transition-all ${isSelected
                                    ? "bg-[#9BC2F3] text-blue-950 hover:bg-[#85b0e5]"
                                    : "bg-white hover:bg-slate-50 text-slate-700"
                                    }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      checked={isSelected}
                                      readOnly
                                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>{district.d}</span>
                                  </div>

                                  {isAssigned && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                      Assigned Other
                                    </span>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-center text-slate-400 text-xs py-4">
                              No districts found
                            </div>
                          )
                        ) : filteredEditMandals.length > 0 ? (
                          filteredEditMandals.map((mandal) => {
                            const isAssigned = otherAssignedMandalIds.has(mandal.i);
                            const isSelected = selectedDistricts.some(
                              (m) => Number(m.id ?? m.featureId) === mandal.i
                            );

                            return (
                              <div
                                key={mandal.i}
                                onClick={() => toggleEditMandalSelection(mandal)}
                                className={`flex items-center justify-between px-3 py-2 rounded-[8px] cursor-pointer text-[13px] font-semibold transition-all ${isSelected
                                  ? "bg-[#9BC2F3] text-blue-950 hover:bg-[#85b0e5]"
                                  : "bg-white hover:bg-slate-50 text-slate-700"
                                  }`}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                  />
                                  <span>{mandal.d}</span>
                                </div>

                                {isAssigned && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                                    Assigned Other
                                  </span>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center text-slate-400 text-xs py-4">
                            No mandals found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pt-1 custom-scrollbar">
                  {selectedDistricts.length === 0 ? (
                    <p className="text-[11px] text-slate-400 font-medium italic pl-1 py-1">
                      {editModeType === "area"
                        ? "No mandals selected. Click on the map mandals to select them."
                        : "No districts selected. Click on the map districts to select them."}
                    </p>
                  ) : (
                    selectedDistricts
                      .map((d, i) => (
                        <div
                          key={i}
                          onClick={() => handleRemoveDistrict(d)}
                          className="px-2.5 py-1 rounded-[10px] bg-white border border-slate-200 text-blue-600 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50 hover:border-red-200 hover:text-red-500 transition-all active:scale-95 group cursor-pointer shadow-sm shrink-0"
                        >
                          <span>{d.name || d.dtname || d.d}</span>
                          <X className="w-3 h-3 text-blue-300 group-hover:text-red-400 transition-colors" />
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 shrink-0">
              <Button
                variant="primary"
                fullWidth
                loading={isSaving}
                onClick={handleSave}
                className="h-12 text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 border-0 bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:opacity-95"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sleek Glassmorphism Reassignment Confirmation Overlay */}
      {reassignModalOpen && pendingDistrict && pendingOwnerRegion && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[6px] animate-in fade-in duration-300 p-4">
          <div className="bg-white/95 rounded-[32px] border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] max-w-md w-full p-7 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
            {/* Premium warning icon header */}
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 text-2xl mb-4 shadow-sm animate-bounce duration-1000">
              ⚠️
            </div>

            <h4 className="text-lg font-black text-slate-800 tracking-tight leading-tight mb-2">
              {editModeType === "area"
                ? "Mandal Already Assigned"
                : "District Already Assigned"}
            </h4>

            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 px-1">
              <span className="font-bold text-slate-700">
                "{pendingDistrict.name}"
              </span>{" "}
              is currently assigned to{" "}
              {editModeType === "area" ? "area" : "region"}{" "}
              <span className="font-bold text-blue-600">
                "{pendingOwnerRegion.name}"
              </span>
              .<br />
              Would you like to remove it from{" "}
              <span className="font-semibold text-slate-600">
                "{pendingOwnerRegion.name}"
              </span>{" "}
              and assign it to this{" "}
              {editModeType === "area" ? "area" : "region"}?
            </p>

            {/* Buttons */}
            <div className="flex w-full gap-3">
              <button
                onClick={() => {
                  setReassignModalOpen(false);
                  setPendingDistrict(null);
                  setPendingOwnerRegion(null);
                }}
                className="flex-1 h-11 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                No, Keep
              </button>

              <button
                onClick={() => {
                  // Add to selectedDistricts / selectedMandals
                  setSelectedDistricts((prev) => {
                    const isAlreadySelected = prev.some(
                      (d) => Number(d.id ?? d.featureId) === pendingDistrict.id,
                    );
                    if (isAlreadySelected) return prev;
                    return [
                      ...prev,
                      {
                        id: pendingDistrict.id,
                        featureId: pendingDistrict.id,
                        name: pendingDistrict.name,
                        code: pendingDistrict.code,
                        d: pendingDistrict.name,
                        properties: {
                          id: pendingDistrict.id,
                          name: pendingDistrict.name,
                          code: pendingDistrict.code,
                          ...(editModeType === "area"
                            ? { district_id: pendingDistrict.district_id }
                            : {}),
                        },
                      },
                    ];
                  });

                  // Add to reassignment list
                  setReassignedDistricts((prev) => {
                    const isAlreadyReassigned = prev.some(
                      (item) => item.districtId === pendingDistrict.id
                    );
                    if (isAlreadyReassigned) return prev;
                    return [
                      ...prev,
                      {
                        districtId: pendingDistrict.id,
                        fromRegionId: pendingOwnerRegion.id,
                        fromRegionName: pendingOwnerRegion.name,
                        fromRegionRawFeature: pendingOwnerRegion.rawFeature,
                      },
                    ];
                  });

                  // Close modal
                  setReassignModalOpen(false);
                  setPendingDistrict(null);
                  setPendingOwnerRegion(null);
                  toast.success(
                    editModeType === "area"
                      ? `Mandal reassigned successfully!`
                      : `District reassigned successfully!`,
                  );
                }}
                className="flex-1 h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/20 border-0 cursor-pointer"
              >
                Yes, Reassign
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Assign / Unassign Panel */}
      {/* Assign / Unassign Panel */}
      {assignPanelOpen &&
        (selectedState || (editModeType === "area" && selectedRegion)) &&
        !isEditMode && (
          <div className="fixed top-4 right-12 z-[100] flex flex-row gap-3 items-start select-none">
            {editModeType === "area" ? (
              <>
                {/* Dropdown 1: Regions Select */}
                <div className="relative" ref={regionsDropdownRef}>
                  <button
                    onClick={() => {
                      setShowRegionsList(!showRegionsList);
                      setFilterDropdownOpen(false);
                      setAreasDropdownOpen(false);
                    }}
                    className="h-10 px-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>
                      {selectedRegionName
                        ? `Regions: ${selectedRegionName}`
                        : `Regions: ${activeFilter === "assigned"
                          ? assignedRegions.length
                          : activeFilter === "unassigned"
                            ? unassignedRegions.length
                            : assignedRegions.length + unassignedRegions.length
                        }`}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${showRegionsList ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showRegionsList && (
                    <div className="absolute right-0 top-11 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden w-64 flex flex-col">
                      {/* Search bar inside Regions dropdown */}
                      <div className="p-3 border-b border-slate-100 relative flex items-center">
                        <input
                          type="text"
                          placeholder="Search"
                          value={regionSearch}
                          onChange={(e) => setRegionSearch(e.target.value)}
                          className="w-full h-10 pl-3 pr-9 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all font-semibold"
                        />
                        <Search className="absolute right-6 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>

                      <div className="max-h-60 overflow-y-auto py-1">
                        {(() => {
                          if (isAreaMode && !regionsWithAreas) {
                            return (
                              <div className="flex flex-col items-center justify-center py-6 gap-2">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                                  Checking Areas...
                                </span>
                              </div>
                            );
                          }

                          const listToShow =
                            activeFilter === "assigned"
                              ? assignedRegions
                              : activeFilter === "unassigned"
                                ? unassignedRegions
                                : [...assignedRegions, ...unassignedRegions];

                          const filtered = listToShow.filter((r) =>
                            r.name.toLowerCase().includes(regionSearch.toLowerCase()),
                          );

                          if (filtered.length === 0) {
                            return (
                              <p className="text-[11px] text-slate-400 italic text-center py-4">
                                No {activeFilter === "all" ? "" : activeFilter === "assigned" ? "assigned" : "unassigned"}{" "}
                                regions found.
                              </p>
                            );
                          }

                          return filtered.map((region, idx) => {
                            const isSelected = selectedRegion && getRegionId(selectedRegion) === region.id;
                            const isAssignedRegion = assignedRegions.some(
                              (r) => r.id === region.id,
                            );

                            return (
                              <button
                                key={region.id ?? idx}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedRegion(null);
                                  } else {
                                    setSelectedRegion(region.rawFeature);
                                    if (
                                      region.rawFeature &&
                                      map.current &&
                                      geoMasterData
                                    ) {
                                      try {
                                        const builtFeature =
                                          buildRegionFeatureFromDistricts(
                                            region.rawFeature,
                                            geoMasterData,
                                          );
                                        const target =
                                          builtFeature ||
                                          region.rawFeature;
                                        if (target?.geometry) {
                                          map.current.fitBounds(
                                            getFeatureBounds(target),
                                            {
                                              padding: 80,
                                              duration: 1500,
                                            },
                                          );
                                        }
                                      } catch (err) {
                                        console.error(
                                          "Failed to zoom to region:",
                                          err,
                                        );
                                      }
                                    }
                                  }
                                  setShowRegionsList(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 border-b border-slate-100 last:border-b-0 ${isSelected
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-white hover:bg-slate-50 text-slate-700"
                                  }`}
                              >
                                <span className="truncate text-xs font-bold">
                                  {region.name}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {region.code && (
                                    <span className="text-[10px] font-mono text-slate-400">
                                      {region.code}
                                    </span>
                                  )}
                                  {activeFilter === "all" && (
                                    <span
                                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isAssignedRegion
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                      {isAssignedRegion ? "A" : "U"}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dropdown 2: Assigned/Un Assigned/All Filter */}
                <div className="relative" ref={filterDropdownRef}>
                  <button
                    onClick={() => {
                      setFilterDropdownOpen(!filterDropdownOpen);
                      setShowRegionsList(false);
                      setAreasDropdownOpen(false);
                    }}
                    className="h-10 px-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>
                      {activeFilter === "assigned"
                        ? "Assigned"
                        : activeFilter === "unassigned"
                          ? "Un Assigned"
                          : "All"}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${filterDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {filterDropdownOpen && (
                    <div className="absolute right-0 top-11 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden w-36 py-1">
                      {(["assigned", "unassigned", "all"] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setActiveFilter(option);
                            setFilterDropdownOpen(false);
                            setRegionSearch("");
                            setShowRegionsList(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors cursor-pointer border-0 ${activeFilter === option
                            ? "bg-blue-50 text-blue-600"
                            : "bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                          {option === "assigned"
                            ? "Assigned"
                            : option === "unassigned"
                              ? "Un Assigned"
                              : "All"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dropdown 3: Areas Select */}
                {selectedRegion ? (
                  <AreaEditSelector
                    regionId={getRegionId(selectedRegion)}
                    regionName={
                      selectedRegion.properties?.region_name ||
                      selectedRegion.properties?.regionName ||
                      selectedRegion.properties?.name ||
                      "—"
                    }
                    stateName={
                      selectedState?.properties?.name ||
                      selectedRegion?.properties?.state_name ||
                      selectedRegion?.properties?.stateName ||
                      "State"
                    }
                    selectedAreaId={activeAreaId}
                    onAreaSelect={(areaId) => {
                      setActiveAreaId(areaId);
                    }}
                    onClose={() => {
                      setSelectedRegion(null);
                      setActiveAreaId(null);
                      if (editModeType === "area") {
                        setAssignPanelOpen(false);
                      }
                    }}
                    mapRef={map}
                    geoMasterData={geoMasterData}
                    filter={activeFilter}
                    isOpen={areasDropdownOpen}
                    setIsOpen={(open) => {
                      setAreasDropdownOpen(open);
                      if (open) {
                        setFilterDropdownOpen(false);
                        setShowRegionsList(false);
                      }
                    }}
                    areasDropdownRef={areasDropdownRef}
                  />
                ) : (
                  <div className="relative">
                    <button
                      disabled
                      className="h-10 px-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-400 cursor-not-allowed opacity-60"
                    >
                      <span>Areas: 0</span>
                      <svg
                        className="w-3.5 h-3.5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Dropdown 1: Assigned/Un Assigned/All Filter */}
                <div className="relative" ref={filterDropdownRef}>
                  <button
                    onClick={() => {
                      setFilterDropdownOpen(!filterDropdownOpen);
                      setShowRegionsList(false);
                      setAreasDropdownOpen(false);
                    }}
                    className="h-10 px-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>
                      {activeFilter === "assigned"
                        ? "Assigned"
                        : activeFilter === "unassigned"
                          ? "Un Assigned"
                          : "All"}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${filterDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {filterDropdownOpen && (
                    <div className="absolute right-0 top-11 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden w-36 py-1">
                      {(["assigned", "unassigned", "all"] as const).map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setActiveFilter(option);
                            setFilterDropdownOpen(false);
                            setRegionSearch("");
                            setShowRegionsList(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm font-semibold transition-colors cursor-pointer border-0 ${activeFilter === option
                            ? "bg-blue-50 text-blue-600"
                            : "bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                          {option === "assigned"
                            ? "Assigned"
                            : option === "unassigned"
                              ? "Un Assigned"
                              : "All"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Dropdown 2: Regions Select */}
                <div className="relative" ref={regionsDropdownRef}>
                  <button
                    onClick={() => {
                      setShowRegionsList(!showRegionsList);
                      setFilterDropdownOpen(false);
                      setAreasDropdownOpen(false);
                    }}
                    className="h-10 px-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <span>
                      {selectedRegionName
                        ? `Regions: ${selectedRegionName}`
                        : `Regions: ${activeFilter === "assigned"
                          ? assignedRegions.length
                          : activeFilter === "unassigned"
                            ? unassignedRegions.length
                            : assignedRegions.length + unassignedRegions.length
                        }`}
                    </span>
                    <svg
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${showRegionsList ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showRegionsList && (
                    <div className="absolute right-0 top-11 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden w-64 flex flex-col">
                      {/* Search bar inside Regions dropdown */}
                      <div className="p-3 border-b border-slate-100 relative flex items-center">
                        <input
                          type="text"
                          placeholder="Search"
                          value={regionSearch}
                          onChange={(e) => setRegionSearch(e.target.value)}
                          className="w-full h-10 pl-3 pr-9 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all font-semibold"
                        />
                        <Search className="absolute right-6 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>

                      <div className="max-h-60 overflow-y-auto py-1">
                        {(() => {
                          if (isAreaMode && !regionsWithAreas) {
                            return (
                              <div className="flex flex-col items-center justify-center py-6 gap-2">
                                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse">
                                  Checking Areas...
                                </span>
                              </div>
                            );
                          }

                          const listToShow =
                            activeFilter === "assigned"
                              ? assignedRegions
                              : activeFilter === "unassigned"
                                ? unassignedRegions
                                : [...assignedRegions, ...unassignedRegions];

                          const filtered = listToShow.filter((r) =>
                            r.name.toLowerCase().includes(regionSearch.toLowerCase()),
                          );

                          if (filtered.length === 0) {
                            return (
                              <p className="text-[11px] text-slate-400 italic text-center py-4">
                                No {activeFilter === "all" ? "" : activeFilter === "assigned" ? "assigned" : "unassigned"}{" "}
                                regions found.
                              </p>
                            );
                          }

                          return filtered.map((region, idx) => {
                            const isSelected = selectedRegion && getRegionId(selectedRegion) === region.id;
                            const isAssignedRegion = assignedRegions.some(
                              (r) => r.id === region.id,
                            );

                            return (
                              <button
                                key={region.id ?? idx}
                                onClick={() => {
                                  if (isSelected) {
                                    setSelectedRegion(null);
                                  } else {
                                    setSelectedRegion(region.rawFeature);
                                    if (
                                      region.rawFeature &&
                                      map.current &&
                                      geoMasterData
                                    ) {
                                      try {
                                        const builtFeature =
                                          buildRegionFeatureFromDistricts(
                                            region.rawFeature,
                                            geoMasterData,
                                          );
                                        const target =
                                          builtFeature ||
                                          region.rawFeature;
                                        if (target?.geometry) {
                                          map.current.fitBounds(
                                            getFeatureBounds(target),
                                            {
                                              padding: 80,
                                              duration: 1500,
                                            },
                                          );
                                        }
                                      } catch (err) {
                                        console.error(
                                          "Failed to zoom to region:",
                                          err,
                                        );
                                      }
                                    }
                                  }
                                  setShowRegionsList(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 border-b border-slate-100 last:border-b-0 ${isSelected
                                  ? "bg-blue-50 text-blue-600"
                                  : "bg-white hover:bg-slate-50 text-slate-700"
                                  }`}
                              >
                                <span className="truncate text-xs font-bold">
                                  {region.name}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {region.code && (
                                    <span className="text-[10px] font-mono text-slate-400">
                                      {region.code}
                                    </span>
                                  )}
                                  {activeFilter === "all" && (
                                    <span
                                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isAssignedRegion
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                                        : "bg-slate-100 text-slate-500"
                                        }`}
                                    >
                                      {isAssignedRegion ? "A" : "U"}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
    </div>
  );
};

export default RegionAreaEdit;
