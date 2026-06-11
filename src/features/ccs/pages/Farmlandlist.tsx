import { useState, useMemo } from "react";
import { Search, Bell, ListFilter, X as CloseIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { FARMLAND_DETAILS } from "@/features/ccs/data/FarmlandDetailData";
import { farmlandListDummyData } from "@/features/ccs/data/Farmlandlistdata";
import FarmlandListCard from "@/features/ccs/components/Farmlandlistcard";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import DummyMap from "@/features/ccs/components/satellite-map/DummyMap";
import FiltersModal, { type FilterState } from "@/features/ccs/components/FiltersModal";

/* ── page ── */
export default function FarmlandList() {
  const [panelOpen, setPanelOpen]     = useState(false);
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    state: "",
    region: "",
    area: "",
    priority: "",
  });

  const detail = selectedId ? FARMLAND_DETAILS[selectedId] ?? null : null;

  /* active filter chips */
  const activeFilterEntries = [
    { key: "state",    value: activeFilters.state    },
    { key: "region",   value: activeFilters.region   },
    { key: "area",     value: activeFilters.area     },
    { key: "priority", value: activeFilters.priority },
  ].filter((f) => f.value);

  /* filtered list */
  const filteredData = useMemo(() => {
    return farmlandListDummyData.filter((item) => {
      if (activeFilters.priority && item.status !== activeFilters.priority.toUpperCase()) return false;
      if (activeFilters.area   && !item.location.toLowerCase().includes(activeFilters.area.toLowerCase()))   return false;
      if (activeFilters.state  && !item.location.toLowerCase().includes(activeFilters.state.toLowerCase()))  return false;
      if (activeFilters.region && !item.location.toLowerCase().includes(activeFilters.region.toLowerCase())) return false;
      return true;
    });
  }, [activeFilters]);

  return (
    <>
      {/* ════════════════════════════════════════════════
          FULL-SCREEN MAP + DETAIL PANEL OVERLAY
          Rendered as fixed so it covers the sidebar too
          ════════════════════════════════════════════════ */}
      {panelOpen && (
        <div className="fixed inset-0 z-[100] bg-black">
          {/* Satellite map fills the whole screen */}
          <DummyMap />

          {/* Detail panel + Go back button on top of map */}
          <FarmlandDetailPanel
            detail={detail}
            open={true}
            onClose={() => {
              setPanelOpen(false);
              setSelectedId(null);
            }}
            hideAnalysisButton={true}
          />
        </div>
      )}

      {/* ════════════════════════════════════════════════
          FILTERS MODAL
          ════════════════════════════════════════════════ */}
      <FiltersModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initialFilters={activeFilters}
        onApply={(newFilters) => setActiveFilters(newFilters)}
      />

      {/* ════════════════════════════════════════════════
          FARMLAND LIST PAGE
          ════════════════════════════════════════════════ */}
      <div
        className="
          h-full overflow-y-auto
          px-6 py-6
          lg:px-8 lg:py-7
          xl:px-10 xl:py-8
          2xl:px-11 2xl:py-9
        "
      >
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
          {/* LEFT — icon + title */}
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/farm.svg"
              alt=""
              className="h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem] xl:h-[1.25rem] xl:w-[1.25rem]"
            />
            <Typography
              variant="h4"
              className="text-[var(--text-primary)] text-[0.9375rem] font-normal leading-tight lg:text-[1rem] xl:text-[1.125rem]"
            >
              Farmland List
            </Typography>
          </div>

          {/* RIGHT — search + filter + bell */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-[8px] w-full md:w-auto">
            {/* SEARCH BAR */}
            <div className="flex flex-1 sm:flex-none items-center gap-[8px] rounded-[60px] bg-[#FFFFFF] px-[20px] h-[52px] w-full sm:w-[312px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-transparent hover:border-gray-100 transition-colors">
              <Search className="h-[24px] w-[24px] shrink-0 text-[#5C5C5C] opacity-50" strokeWidth={1.5} />
              <input
                placeholder="Search by GLC ID, Agent....."
                className="w-full bg-transparent text-[16px] font-normal text-[#5C5C5C] opacity-50 outline-none placeholder:text-[#5C5C5C] placeholder:opacity-50"
              />
            </div>

            {/* FILTER BUTTON */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex shrink-0 h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors"
            >
              <ListFilter className="h-[24px] w-[24px] text-[#000000]" strokeWidth={2} />
            </button>

            {/* BELL */}
            <button className="relative shrink-0 flex h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors">
              <span className="absolute right-[16px] top-[14px] h-[5px] w-[5px] rounded-full bg-[#EF4646]" />
              <Bell className="h-[24px] w-[24px] text-[#2C2C2C]" strokeWidth={1.5} />
              <span className="sr-only">Notifications</span>
            </button>
          </div>
        </div>

        {/* ── ACTIVE FILTER CHIPS ── */}
        {activeFilterEntries.length > 0 && (
          <div className="flex flex-wrap gap-[12px] mb-6">
            {activeFilterEntries.map((filter) => (
              <div
                key={filter.key}
                onClick={() => setActiveFilters((prev) => ({ ...prev, [filter.key]: "" }))}
                className="h-[42px] px-[20px] bg-[#FFFFFF] border border-[rgba(39,128,196,0.5)] shadow-[0px_8px_32px_rgba(31,38,135,0.03)] backdrop-blur-[12px] rounded-full flex items-center gap-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[20px] text-[#2780C4]">
                  {filter.value}
                </span>
                <CloseIcon className="w-[15px] h-[15px] text-[#2780C4]" strokeWidth={2.5} />
              </div>
            ))}
          </div>
        )}

        {/* ── FARMLAND CARDS ── */}
        <div className="flex flex-col gap-3 xl:gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <FarmlandListCard
                key={item.id}
                item={item}
                onViewDetails={(id) => {
                  setSelectedId(id);
                  setPanelOpen(true);
                }}
              />
            ))
          ) : (
            <div className="py-12 flex items-center justify-center text-gray-500 font-medium">
              No farmlands match the selected filters.
            </div>
          )}
        </div>
      </div>
    </>
  );
}