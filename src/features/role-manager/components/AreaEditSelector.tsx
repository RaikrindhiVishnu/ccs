import React, { useState, useMemo, useEffect } from "react";
import { X, Search, ChevronDown, CheckCircle, HelpCircle, MapPin } from "lucide-react";
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
  regionName,
  stateName,
  selectedAreaId,
  onAreaSelect,
  onClose,
  mapRef,
  geoMasterData,
}) => {
  const [filter, setFilter] = useState<"all" | "assigned" | "unassigned">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  // Reset map filters and selection whenever the dropdown filter changes!
  useEffect(() => {
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

  // Zoom to and isolate selected area
  const handleAreaClick = (area: any) => {
    const areaId = area.area_id || area.id;
    onAreaSelect(Number(areaId));

    if (!mapRef.current) return;

    const mandalIds = area.mandal_ids || area.mandalIds || [];
    const mandalIdNumbers = mandalIds.map(Number);

    // 1. Isolate mandal boundaries directly using Feature ID checking (100% Bulletproof!)
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
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-2xl h-full max-h-[500px]">
      {/* ── CONSTANT HEADER: State Name & Region Name ── */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer border-0 bg-transparent"
        >
          <X className="w-4 h-4" />
        </button>
        <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200 block mb-0.5">
          {stateName}
        </span>
        <h3 className="text-[16px] font-extrabold tracking-tight truncate pr-8 leading-tight">
          {regionName}
        </h3>
        <p className="text-[11px] text-indigo-100 font-medium mt-1.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
          <span>Area Management Dashboard</span>
        </p>
      </div>

      {/* ── FILTER & CONTROLS ── */}
      <div className="p-4 bg-slate-50 border-b border-slate-100 flex flex-col gap-3">
        {/* Custom Premium Dropdown Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full h-11 px-4 flex items-center justify-between rounded-xl border border-slate-200 bg-white shadow-sm text-xs font-bold text-slate-700 cursor-pointer hover:bg-slate-50 transition-all"
          >
            <span className="capitalize">
              {filter === "all" ? "All Areas" : `${filter} Areas`}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 right-0 top-[48px] bg-white rounded-xl border border-slate-200 shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              {(["all", "assigned", "unassigned"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilter(option);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-xs font-bold transition-colors cursor-pointer border-0 ${
                    filter === option
                      ? "bg-blue-50 text-blue-600"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option === "all" ? "All Areas" : option === "assigned" ? "Assigned Areas" : "Unassigned Areas"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Field */}
        <div className="relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search areas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl border border-slate-200 text-xs font-semibold placeholder:text-slate-400 bg-white focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>
      </div>

      {/* ── AREAS LIST VIEW ── */}
      <div className="flex-1 overflow-y-auto px-4 py-3 min-h-[220px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Loading Areas...</span>
          </div>
        ) : filteredAreas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center">
            <HelpCircle className="w-10 h-10 text-slate-300 mb-2.5" />
            <p className="text-xs font-bold">No {filter === "all" ? "" : filter} areas found</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Try changing your search query or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
            {filteredAreas.map((area) => {
              const areaId = area.area_id || area.id;
              const isSelected = Number(selectedAreaId) === Number(areaId);
              const isAssigned = Number(area.is_assigned) === 1;

              return (
                <button
                  key={areaId}
                  onClick={() => handleAreaClick(area)}
                  className={`w-full text-left p-3 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/20"
                      : "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                  }`}
                >
                  <div className="flex flex-col gap-0.5 truncate">
                    <span className={`text-[13px] font-bold ${isSelected ? "text-white" : "text-slate-800"}`}>
                      {area.area_name || area.areaName || "Unnamed Area"}
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                      Code: {area.area_code || "—"}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-extrabold uppercase px-2 py-1 rounded-full shrink-0 tracking-wider flex items-center gap-1 ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : isAssigned
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : "bg-amber-50 text-amber-600 border border-amber-200"
                    }`}
                  >
                    {isAssigned ? (
                      <>
                        <CheckCircle className="w-2.5 h-2.5 shrink-0" />
                        <span>Assigned</span>
                      </>
                    ) : (
                      "Unassigned"
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
