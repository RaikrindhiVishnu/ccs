import { useState, useMemo, useEffect } from "react";
import { Search, Bell, ListFilter, X as CloseIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useNavigate } from "react-router-dom";
import { farmlandListDummyData } from "@/features/ccs/data/Farmlandlistdata";
import FarmlandListCard, { type FarmlandListItem } from "@/features/ccs/components/Farmlandlistcard";
import FiltersModal, { type FilterState } from "@/features/ccs/components/FiltersModal";
import NotificationsPopover from "@/features/ccs/components/NotificationsPopover";
import { useGetAllAssignedFarmlandsMutation } from "@/features/ccs/api/assignedFarmlandsApi";
import { useGetAllGeoMasterDataMutation } from "@/features/ccs/api/masterDataApi";
import { transformTable } from "@/features/role-manager/utils/utils";

/* ── page ── */
export default function FarmlandList() {
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
      status_ids: [2, 3], // Approved (2) and Rejected (3)
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

  /* active filter chips */
  const activeFilterEntries = [
    { key: "state",    value: activeFilters.state    },
    { key: "region",   value: activeFilters.region   },
    { key: "area",     value: activeFilters.area     },
    { key: "priority", value: activeFilters.priority },
    { key: "fromDate", value: activeFilters.fromDate },
    { key: "toDate",   value: activeFilters.toDate   },
  ].filter((f) => f.value);

  // Map API response to expected card format
  const rawFarmlands = apiResponse ? (apiResponse.farmlands || []) : [];
  
  let listData = rawFarmlands.length > 0 ? rawFarmlands.map((item: any) => {
    const fd = item.farmland_details || item;
    const od = item.owner_details || item;

    const dateStr = fd.created_on || fd.createdAt || item.createdDate || fd.createdDate;
    const formattedDate = dateStr ? new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

    const acres = fd.Total_acres || fd.total_acres || item.totalAcres || item.total_acres;
    const formattedAcres = acres ? `${acres} Acres` : 'N/A';

    const valuation = fd.per_acre_value || fd.price_per_acre || item.valuation || item.price_per_acre;
    const formattedValuation = valuation ? `${Number(valuation).toLocaleString()}` : '0';
    const formattedCostPerAc = valuation ? `₹ ${Number(valuation).toLocaleString()}` : '0';

    const asset = fd.Assest_value || fd.total_asset_price || item.assetValue || item.total_asset_price;
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
    
    // Status mapping: 2 -> APPROVED -> "ACTIVE" or "COMPLETED", 3 -> REJECTED -> "REJECTED"
    let statusText: "COMPLETED" | "PENDING" | "ACTIVE" | "REJECTED" = "PENDING";
    if (fd.status_id === 2 || fd.status === "APPROVED" || item.status === "APPROVED") statusText = "ACTIVE";
    else if (fd.status_id === 3 || fd.status === "REJECTED" || item.status === "REJECTED") statusText = "REJECTED";

    const mappedItem: FarmlandListItem = {
      id: fd.farmland_id?.toString() || item.id || item.farmland_id?.toString(),
      farmlandId: fd.farmland_code || item.glcId || item.farmland_code || 'N/A',
      location: location,
      state: fd.state || item.state || 'N/A',
      region: fd.region || item.region || 'N/A',
      area: fd.area || item.area || 'N/A',
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
      agentName: agentName,
      listedOn: formattedDate,
      totalArea: formattedAcres,
      valuation: formattedValuation,
      assetValue: formattedAsset,
      costPerAc: formattedCostPerAc,
      status: statusText,
      liveOnWebsite: statusText === "ACTIVE",
    };
    return mappedItem;
  }) : (!apiResponse ? farmlandListDummyData : []); // fallback to dummy data if initial load

  // Client side fallback for filtering priority if backend doesn't handle it
  const filteredData = listData.filter((item) => {
    // Basic filter checks
    if (activeFilters.priority) {
      if (activeFilters.priority.toUpperCase() === "HIGH" && item.status !== "ACTIVE") return true; // just an example mapping, if priority mapping is needed
      // For now, let the backend handle the priority using priority_id, but if needed we can add local filter.
    }
    // Location filters are handled by backend via IDs, but for dummy data:
    if (!apiResponse) {
      if (activeFilters.area   && !item.location.toLowerCase().includes(activeFilters.area.toLowerCase()))   return false;
      if (activeFilters.state  && !item.location.toLowerCase().includes(activeFilters.state.toLowerCase()))  return false;
      if (activeFilters.region && !item.location.toLowerCase().includes(activeFilters.region.toLowerCase())) return false;
    }
    return true;
  });

  return (
    <>
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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
          <div className="flex items-center gap-[10px]">
            <div className="flex shrink-0 h-[38px] w-[38px] rounded-[10px] items-center justify-center">
              <img src="/src/assets/farmland-list.svg" alt="Farmlands List" className="h-[20px] w-[20px] object-contain" />
            </div>
            <Typography
              variant="h4"
              className="text-[#647182] font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[23px] tracking-[-0.02em]"
            >
              Farmlands List
            </Typography>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-[8px] w-full md:w-auto">
            <div className="flex flex-1 min-w-0 xl:flex-none items-center gap-[8px] rounded-[60px] bg-[#FFFFFF] px-[20px] h-[52px] w-full xl:w-[312px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-transparent hover:border-gray-100 transition-colors">
              <Search className="h-[24px] w-[24px] shrink-0 text-[#5C5C5C] opacity-50" strokeWidth={1.5} />
              <input
                placeholder="Search by GLC ID, Agent....."
                className="w-full bg-transparent text-[16px] font-normal text-[#5C5C5C] opacity-50 outline-none placeholder:text-[#5C5C5C] placeholder:opacity-50"
              />
            </div>

            <button
              onClick={() => setFiltersOpen(true)}
              className="flex shrink-0 h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors"
            >
              <ListFilter className="h-[24px] w-[24px] text-[#000000]" strokeWidth={2} />
            </button>

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

        <div className="flex flex-col gap-3 xl:gap-4">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500 font-medium">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BDD327] mb-4"></div>
              Loading farmland list...
            </div>
          ) : filteredData.length > 0 ? (
            filteredData.map((item) => (
              <FarmlandListCard
                key={item.id}
                item={item}
                onViewDetails={(id) => navigate(`/farmland-list/map/${id}`)}
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