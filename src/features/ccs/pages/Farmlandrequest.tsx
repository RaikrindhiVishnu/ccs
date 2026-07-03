import { useState, useEffect, useMemo } from "react";
import { Search, Bell, Clock, ListFilter, X as CloseIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useNavigate } from "react-router-dom";

import FarmlandRequestCard from "@/features/ccs/components/Farmlandrequestcard";
import FiltersModal, { type FilterState } from "@/features/ccs/components/FiltersModal";
import NotificationsPopover from "@/features/ccs/components/NotificationsPopover";
import { useGetAllAssignedFarmlandsMutation } from "@/features/ccs/api/assignedFarmlandsApi";
import { useGetAllGeoMasterDataMutation } from "@/features/ccs/api/masterDataApi";
import { transformTable } from "@/features/role-manager/utils/utils";
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
  const [getGeoMasterData, { data: geoDataResponse }] = useGetAllGeoMasterDataMutation();

  useEffect(() => {
    getGeoMasterData({});
  }, [getGeoMasterData]);

  const geoData = useMemo(() => {
    const rawGeoData = geoDataResponse?.data || geoDataResponse || {};
    return {
      states: transformTable(rawGeoData.states || []),
      districts: transformTable(rawGeoData.districts || []),
      mandals: transformTable(rawGeoData.mandals || [])
    };
  }, [geoDataResponse]);

  useEffect(() => {
    const payload: any = { 
      status_ids: [1, 2], 
      offset: 0,
      state_id: activeFilters.state_id || null,
      region_id: activeFilters.region_id || null,
      area_id: activeFilters.area_id || null,
      priority_id: activeFilters.priority_id || null,
    };
    
    if (activeFilters.fromDate) {
      const [d, m, y] = activeFilters.fromDate.split('/');
      if (d && m && y) payload.from_date = `${y}-${m}-${d}`;
    }
    if (activeFilters.toDate) {
      const [d, m, y] = activeFilters.toDate.split('/');
      if (d && m && y) payload.to_date = `${y}-${m}-${d}`;
    }

    getAllFarmlands(payload);
  }, [activeFilters, getAllFarmlands]);

  const activeFilterEntries = [
    { key: "state", value: activeFilters.state },
    { key: "region", value: activeFilters.region },
    { key: "area", value: activeFilters.area },
    { key: "priority", value: activeFilters.priority },
    { key: "fromDate", value: activeFilters.fromDate },
    { key: "toDate", value: activeFilters.toDate },
  ].filter((f) => f.value);

  // If apiResponse is present, use its farmlands array (even if empty to show "No results found").
  // Only fall back to dummy data if there is no apiResponse at all (e.g. initial load or error).
  let farmlands = apiResponse ? (apiResponse.farmlands || []) : farmlandRequestDummyData;

  // Frontend fallback filtering for all fields (in case backend ignores them)
  if (farmlands.length > 0 && Object.values(activeFilters).some(v => v !== "")) {
    farmlands = farmlands.filter((item: any) => {
      const fd = item.farmland_details || item;
      const od = item.owner_details || item;
      let matches = true;

      // Priority Filtering
      if (activeFilters.priority) {
        const priorityNum = fd.farmland_priority || item.farmland_priority;
        const mappedPriority = priorityNum === 1 ? 'High' : priorityNum === 2 ? 'Medium' : 'Low';
        if (mappedPriority.toLowerCase() !== activeFilters.priority.toLowerCase()) {
          matches = false;
        }
      }

      // State, Region, Area Filtering (Case-insensitive includes for robust matching)
      const locationStr = (fd.location || fd.village || fd.state || fd.region || fd.area || item.location || od.location || '').toLowerCase();
      
      if (activeFilters.state && !(fd.state || item.state || locationStr).toLowerCase().includes(activeFilters.state.toLowerCase())) {
        matches = false;
      }
      if (activeFilters.region && !(fd.region || item.region || locationStr).toLowerCase().includes(activeFilters.region.toLowerCase())) {
        matches = false;
      }
      if (activeFilters.area && !(fd.area || item.area || locationStr).toLowerCase().includes(activeFilters.area.toLowerCase())) {
        matches = false;
      }

      // Date Filtering
      const dateStr = fd.created_on || fd.createdAt || item.createdDate || fd.createdDate;
      if (dateStr) {
        const itemDate = new Date(dateStr);
        if (activeFilters.fromDate) {
          const [d, m, y] = activeFilters.fromDate.split('/');
          if (d && m && y) {
            const from = new Date(Number(y), Number(m) - 1, Number(d));
            from.setHours(0, 0, 0, 0);
            if (itemDate < from) matches = false;
          }
        }
        if (activeFilters.toDate) {
          const [d, m, y] = activeFilters.toDate.split('/');
          if (d && m && y) {
            const to = new Date(Number(y), Number(m) - 1, Number(d));
            to.setHours(23, 59, 59, 999);
            if (itemDate > to) matches = false;
          }
        }
      } else if (activeFilters.fromDate || activeFilters.toDate) {
        // If there's a date filter applied but the item has no date, it shouldn't match
        matches = false;
      }
      
      return matches;
    });
  }

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
              // Map API response to expected card format, handling nested details
              const fd = item.farmland_details || item;
              const od = item.owner_details || item;

              const dateStr = fd.created_on || fd.createdAt || item.createdDate || fd.createdDate;
              const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

              const acres = fd.Total_acres || fd.total_acres || item.totalAcres;
              const formattedAcres = acres ? `${acres} Acres` : 'N/A';

              const valuation = fd.per_acre_value || fd.price_per_acre || item.valuation;
              const formattedValuation = valuation ? `₹ ${Number(valuation).toLocaleString()}/Acre` : '0';

              const asset = fd.Assest_value || fd.total_asset_price || item.assetValue;
              const formattedAsset = asset ? Number(asset).toLocaleString() : '0';

              let location = fd.location || od.location || fd.village || od.village || item.location || 'Unknown Location';
              
              const locDetails = item.location_details || fd.location_details;
              if (locDetails) {
                const stateObj = geoData.states.find((s: any) => s.id === locDetails.state_id);
                const districtObj = geoData.districts.find((d: any) => d.id === (locDetails.district_id || locDetails.region_id));
                const mandalObj = geoData.mandals.find((m: any) => m.id === (locDetails.mandal_id || locDetails.area_id));

                const stateName = stateObj?.description || stateObj?.name;
                const districtName = districtObj?.description || districtObj?.name;
                const mandalName = mandalObj?.description || mandalObj?.name;

                const parts = [];
                if (mandalName) parts.push(mandalName);
                if (districtName) {
                  const dName = districtName.toLowerCase();
                  if (dName === "west godavari") parts.push("WG");
                  else if (dName === "east godavari") parts.push("EG");
                  else parts.push(districtName);
                }
                if (stateName) {
                  const sName = stateName.toLowerCase();
                  if (sName === "andhra pradesh") parts.push("A.P.");
                  else if (sName === "telangana") parts.push("T.S.");
                  else parts.push(stateName);
                }

                if (parts.length > 0) {
                  location = parts.join(', ');
                }
              }

              const agentName = od.owner_name || od.agent_name || fd.agent_name || fd.owner_name || item.agent_name || item.agentName || 'N/A';

              const mappedItem = {
                id: fd.farmland_id?.toString() || item.id,
                farmlandId: fd.farmland_code || item.glcId || 'N/A',
                location: location,
                priority: fd.farmland_priority === 1 ? 'High' : fd.farmland_priority === 2 ? 'Medium' : 'Low',
                agentName: agentName,
                createdDate: formattedDate,
                totalAcres: formattedAcres,
                valuation: formattedValuation,
                assetValue: formattedAsset,
                statusId: fd.status_id,
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
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-gray-500 font-medium bg-[#FFFFFF] rounded-[24px] shadow-sm border border-dashed border-gray-200">
              <span className="text-[16px] text-[#0F172A]">No farmlands found matching the selected filters.</span>
              <button 
                onClick={() => setActiveFilters({ state: "", region: "", area: "", priority: "", fromDate: "", toDate: "" })}
                className="mt-4 px-6 py-2 bg-[#2780C4] text-white rounded-full hover:bg-[#1f669d] transition-colors text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}