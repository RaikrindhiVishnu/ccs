import { useState, useEffect } from "react";
import { Search, Bell, Clock, ListFilter, X as CloseIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useNavigate } from "react-router-dom";

import FarmlandRequestCard from "@/features/ccs/components/Farmlandrequestcard";
import FiltersModal, { type FilterState } from "@/features/ccs/components/FiltersModal";
import NotificationsPopover from "@/features/ccs/components/NotificationsPopover";
import { useGetAllAssignedFarmlandsMutation } from "@/features/ccs/api/assignedFarmlandsApi";
import { farmlandRequestDummyData } from "@/features/ccs/data/Farmlandrequestdata";

/* ── Page ── */
export default function FarmlandRequest() {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    state: "",
    region: "",
    area: "",
    priority: "",
    fromDate: "",
    toDate: "",
  });

  const [getAllFarmlands, { data: apiResponse, isLoading }] = useGetAllAssignedFarmlandsMutation();

  useEffect(() => {
    // The backend requires 'status_ids' parameter to be present.
    // Passing an array of typical statuses [1..6] to fetch farmlands.
    getAllFarmlands({ ...activeFilters, status_ids: [1, 2, 3, 4, 5, 6] });
  }, [activeFilters, getAllFarmlands]);

  const activeFilterEntries = [
    { key: "state", value: activeFilters.state },
    { key: "region", value: activeFilters.region },
    { key: "area", value: activeFilters.area },
    { key: "priority", value: activeFilters.priority },
    { key: "fromDate", value: activeFilters.fromDate },
    { key: "toDate", value: activeFilters.toDate },
  ].filter((f) => f.value);

  const farmlands = apiResponse?.farmlands?.length ? apiResponse.farmlands : farmlandRequestDummyData;

  return (
    <div className="relative h-full overflow-hidden">
      <FiltersModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initialFilters={activeFilters}
        onApply={(newFilters) => setActiveFilters(newFilters)}
      />

      <div
        className="
          h-full overflow-y-auto
          px-4 py-4
          lg:px-6 lg:py-6
        "
      >
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
          {/* LEFT — icon + title */}
          <div className="flex items-center gap-[7px]">
            <Clock className="w-[19px] h-[19px] text-[#000000]" strokeWidth={2.5} />
            <Typography
              variant="h4"
              className="text-[#000000] text-[16px] font-normal leading-[25px]"
            >
              Farmland Request
            </Typography>
          </div>

          {/* RIGHT — search + filter + bell */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-[8px] w-full md:w-auto">
            {/* SEARCH BAR */}
            <div className="flex flex-1 min-w-0 xl:flex-none items-center gap-[8px] rounded-[60px] bg-[#FFFFFF] px-[20px] h-[52px] w-full xl:w-[312px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-transparent hover:border-gray-100 transition-colors">
              <Search className="h-[24px] w-[24px] shrink-0 text-[#5C5C5C] opacity-50" strokeWidth={1.5} />
              <input
                placeholder="Search by GLC ID, Agent....."
                className="w-full bg-transparent text-[16px] font-normal text-[#5C5C5C] opacity-50 outline-none placeholder:text-[#5C5C5C] placeholder:opacity-50"
              />
            </div>

            {/* FILTER */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex shrink-0 h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors"
            >
              <ListFilter className="h-[24px] w-[24px] text-[#000000]" strokeWidth={2} />
            </button>

            {/* BELL */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative shrink-0 flex h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors"
              >
                <span className="absolute right-[16px] top-[14px] h-[5px] w-[5px] rounded-full bg-[#EF4646]" />
                <Bell className="h-[24px] w-[24px] text-[#2C2C2C]" strokeWidth={1.5} />
                <span className="sr-only">Notifications</span>
              </button>
              {showNotifications && (
                <NotificationsPopover />
              )}
            </div>
          </div>
        </div>

        {/* ── ACTIVE FILTERS CHIPS ── */}
        {activeFilterEntries.length > 0 && (
          <div className="flex flex-wrap gap-[12px] mb-6">
            {activeFilterEntries.map((filter) => (
              <div
                key={filter.key}
                onClick={() => setActiveFilters(prev => ({ ...prev, [filter.key]: "" }))}
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

        <div
          className="
            grid grid-cols-1 content-start gap-3
            lg:grid-cols-2 lg:gap-4
            xl:gap-[1.125rem]
            2xl:gap-5
          "
        >
          {isLoading ? (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500 font-medium">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BDD327] mb-4"></div>
              Loading farmland requests...
            </div>
          ) : farmlands.length > 0 ? (
            farmlands.map((item: any) => {
              // Map API response to expected card format
              const mappedItem = {
                id: item.farmland_id?.toString() || item.id,
                farmlandId: item.farmland_code || item.glcId || 'N/A',
                location: item.location || 'Unknown Location',
                priority: item.farmland_priority === 1 ? 'High' : item.farmland_priority === 2 ? 'Medium' : 'Low',
                agentName: item.agent_name || item.agentName || 'N/A',
                createdDate: item.created_on || item.createdDate || 'N/A',
                totalAcres: item.total_acres ? `${item.total_acres} Acres` : item.totalAcres || 'N/A',
                valuation: item.price_per_acre ? `₹ ${item.price_per_acre.toLocaleString()}/Acre` : item.valuation || 'N/A',
                assetValue: item.total_asset_price || item.assetValue || 'N/A',
              };

              return (
                <FarmlandRequestCard
                  key={mappedItem.id}
                  item={mappedItem as any}
                  onClick={(id) => navigate(`/farmland-request/map/${id}`)}
                />
              );
            })
          ) : (
            <div className="col-span-full py-12 flex items-center justify-center text-gray-500 font-medium">
              No farmland requests match the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}