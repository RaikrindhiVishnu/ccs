import React, { useState, useMemo, useEffect } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import { useGetAllAreasByRegionIdQuery } from "../api/regionSelectionApi";
import { decompressGeoJSON } from "../utils/utils";
import maplibregl from "maplibre-gl";

interface GeoMasterData {
  countries: any[];
}

interface AreaEditSelectorProps {
  regionId: number;
  regionName: string;
  stateName: string;
  selectedAreaId: number | null;
  onAreaSelect: (areaId: number) => void;
  onClose: () => void;
  mapRef: React.MutableRefObject<maplibregl.Map | null>;
  geoMasterData: GeoMasterData | null;
  filter: "assigned" | "unassigned" | "all";
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  areasDropdownRef: React.RefObject<HTMLDivElement | null>;
}

// Helper to compute combined bounding box of a list of mandal IDs
const getMandalsBounds = (
  mandalIds: number[],
  geoMasterData: GeoMasterData
): maplibregl.LngLatBoundsLike | null => {
  const bounds = new maplibregl.LngLatBounds();
  let hasCoords = false;

  const extendBounds = (coords: any[]) => {
    coords.forEach((c) => {
      if (Array.isArray(c[0])) extendBounds(c);
      else {
        bounds.extend(c as [number, number]);
        hasCoords = true;
      }
    });
  };

  geoMasterData.countries.forEach((country: any) => {
    country.states?.forEach((state: any) => {
      state.districts?.forEach((district: any) => {
        district.mandals?.forEach((mandal: any) => {
          if (mandalIds.includes(Number(mandal.i))) {
            try {
              const decompressed = decompressGeoJSON(mandal.g);
              if (decompressed?.coordinates) {
                extendBounds(decompressed.coordinates);
              }
            } catch (err) {
              console.error("Failed to decompress mandal coordinates:", err);
            }
          }
        });
      });
    });
  });

  return hasCoords ? bounds : null;
};

export const AreaEditSelector: React.FC<AreaEditSelectorProps> = ({
  regionId,
  selectedAreaId,
  onAreaSelect,
  mapRef,
  geoMasterData,
  filter,
  isOpen,
  setIsOpen,
  areasDropdownRef,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch areas in selected region
  const { data: regionAreasResponse, isLoading, refetch } = useGetAllAreasByRegionIdQuery(
    { region_id: regionId },
    { refetchOnMountOrArgChange: true }
  );

  const areasList = useMemo(() => {
    return regionAreasResponse?.data || [];
  }, [regionAreasResponse]);

  // Refetch areas list on mount to guarantee fresh assignment values
  useEffect(() => {
    refetch();
  }, [regionId, refetch]);

  const selectedArea = useMemo(() => {
    if (!selectedAreaId) return null;
    return areasList.find((area: any) => Number(area.area_id || area.id) === Number(selectedAreaId));
  }, [areasList, selectedAreaId]);

  // Dropdown filtering logic
  const filteredAreas = useMemo(() => {
    let list = [...areasList];

    if (filter === "assigned") {
      list = list.filter((area) => Number(area.is_assigned) === 1);
    } else if (filter === "unassigned") {
      list = list.filter((area) => Number(area.is_assigned) === 0);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (area) =>
          area.area_name?.toLowerCase().includes(q) ||
          area.area_code?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [areasList, filter, searchQuery]);

  const isFirstMount = React.useRef(true);

  // Reset map filters and selection whenever the dropdown filter changes!
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    onAreaSelect(null as any);
    if (mapRef.current) {
      if (mapRef.current.getLayer("mandals-fill")) {
        mapRef.current.setFilter("mandals-fill", null);
      }
      if (mapRef.current.getLayer("mandals-line")) {
        mapRef.current.setFilter("mandals-line", null);
      }
      if (mapRef.current.getLayer("mandals-labels")) {
        mapRef.current.setFilter("mandals-labels", null);
      }
    }
  }, [filter, onAreaSelect, mapRef]);

  // Zoom to and isolate selected area automatically when selectedAreaId changes
  useEffect(() => {
    if (!mapRef.current) return;

    if (!selectedAreaId) {
      if (mapRef.current.getLayer("mandals-fill")) {
        mapRef.current.setFilter("mandals-fill", null);
      }
      if (mapRef.current.getLayer("mandals-line")) {
        mapRef.current.setFilter("mandals-line", null);
      }
      if (mapRef.current.getLayer("mandals-labels")) {
        mapRef.current.setFilter("mandals-labels", null);
      }
      return;
    }

    const area = areasList.find(
      (a: any) => Number(a.area_id || a.id || a.area_id) === Number(selectedAreaId)
    );
    if (!area) return;

    const mandalIds = area.mandal_ids || area.mandalIds || [];
    const mandalIdNumbers = mandalIds.map(Number);

    // 1. Isolate mandal boundaries directly using Feature ID checking
    if (mandalIdNumbers.length > 0) {
      const filterExpression = ["in", ["id"], ["literal", mandalIdNumbers]] as maplibregl.FilterSpecification;

      if (mapRef.current.getLayer("mandals-fill")) {
        mapRef.current.setFilter("mandals-fill", filterExpression);
      }
      if (mapRef.current.getLayer("mandals-line")) {
        mapRef.current.setFilter("mandals-line", filterExpression);
      }
      if (mapRef.current.getLayer("mandals-labels")) {
        mapRef.current.setFilter("mandals-labels", filterExpression);
      }
    }

    // 2. Compute bounding box and fit bounds automatically
    if (mandalIdNumbers.length > 0 && geoMasterData) {
      const bounds = getMandalsBounds(mandalIdNumbers, geoMasterData);
      if (bounds) {
        mapRef.current.fitBounds(bounds, {
          padding: 60,
          duration: 1500,
        });
      }
    }
  }, [selectedAreaId, areasList, mapRef, geoMasterData]);

  // Zoom to and isolate selected area
  const handleAreaClick = (area: any) => {
    const areaId = area.area_id || area.id;
    onAreaSelect(Number(areaId));
  };

  // Reset map filters when component unmounts or region changes
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        if (mapRef.current.getLayer("mandals-fill")) {
          mapRef.current.setFilter("mandals-fill", null);
        }
        if (mapRef.current.getLayer("mandals-line")) {
          mapRef.current.setFilter("mandals-line", null);
        }
        if (mapRef.current.getLayer("mandals-labels")) {
          mapRef.current.setFilter("mandals-labels", null);
        }
      }
    };
  }, [regionId, mapRef]);

  return (
    <div className="relative" ref={areasDropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 px-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white shadow-sm text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
      >
        <span>
          {selectedArea
            ? `Areas: ${selectedArea.area_name || selectedArea.areaName}`
            : `Areas: ${filteredAreas.length}`}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden w-64 flex flex-col">
          {/* Search bar inside dropdown */}
          <div className="p-3 border-b border-slate-100 relative flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-3 pr-9 text-xs rounded-xl border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 shadow-sm transition-all"
            />
            <Search className="absolute right-6 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="max-h-60 overflow-y-auto py-1">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-6 gap-2">
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Loading Areas...
                </span>
              </div>
            ) : filteredAreas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400 text-center px-4">
                <HelpCircle className="w-8 h-8 text-slate-300 mb-2" />
                <p className="text-xs font-bold">
                  No {filter === "all" ? "" : filter === "assigned" ? "assigned" : "unassigned"} areas found
                </p>
              </div>
            ) : (
              filteredAreas.map((area) => {
                const areaId = area.area_id || area.id;
                const isSelected = Number(selectedAreaId) === Number(areaId);
                const isAssigned = Number(area.is_assigned) === 1;

                return (
                  <button
                    key={areaId}
                    onClick={() => {
                      handleAreaClick(area);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 border-b border-slate-100 last:border-b-0 ${
                      isSelected
                        ? "bg-blue-50 text-blue-600"
                        : "bg-white hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 truncate">
                      <span
                        className={`text-xs font-bold ${
                          isSelected ? "text-blue-600" : "text-slate-800"
                        }`}
                      >
                        {area.area_name || area.areaName || "Unnamed Area"}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Code: {area.area_code || "—"}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 tracking-wider ${
                        isAssigned
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-amber-50 text-amber-600 border border-amber-200"
                      }`}
                    >
                      {isAssigned ? "Assigned" : "Unassigned"}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
