import { useState, useMemo, useEffect } from "react";
import { Search, Bell, ListFilter, X as CloseIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { useNavigate } from "react-router-dom";
import { farmlandListDummyData } from "@/features/ccs/data/Farmlandlistdata";
import FarmlandListCard, { type FarmlandListItem } from "@/features/ccs/components/Farmlandlistcard";
import FiltersModal, { type FilterState } from "@/features/ccs/components/FiltersModal";
import NotificationsPopover from "@/features/ccs/components/NotificationsPopover";
import { useGetAllAssignedFarmlandsMutation } from "@/features/ccs/api/assignedFarmlandsApi";
import { useGetAllGeoMasterDataMutation } from "@/features/ccs/api/masterDataApi";
import { transformTable } from "@/features/role-manager/utils/utils";
import farmlandListIcon from "@/assets/farmland-list.svg";

/* ── page ── */
const PAGE_SIZE = 8;

export default function FarmlandList() {
  const navigate = useNavigate();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
      status_ids: [3, 5], // Approved (3) and Rejected (5) based on swagger
      offset: (currentPage - 1) * PAGE_SIZE,
      limit: PAGE_SIZE,
      // Disabled for demo to allow robust local frontend filtering on real data
      // state_id: activeFilters.state_id || null,
      // region_id: activeFilters.region_id || null,
      // area_id: activeFilters.area_id || null,
      // priority_id: activeFilters.priority_id || null,
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
  }, [activeFilters, currentPage, getAllFarmlands]);

  // Reset page when filters or search change
  const handleFiltersChange = (newFilters: FilterState) => {
    setCurrentPage(1);
    setActiveFilters(newFilters);
  };

  const handleSearchChange = (q: string) => {
    setCurrentPage(1);
    setSearchQuery(q);
  };

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
    let resolvedState = fd.state || item.state || 'N/A';
    let resolvedRegion = fd.region || item.region || 'N/A';
    let resolvedArea = fd.area || item.area || 'N/A';

    const locDetails = item.location_details || fd.location_details || item.location;
    if (locDetails) {
      const stateObj = geoData.states.find((s: any) => s.id === locDetails.state_id);
      const districtObj = geoData.districts.find((d: any) => d.id === (locDetails.district_id || locDetails.region_id));
      const mandalObj = geoData.mandals.find((m: any) => m.id === (locDetails.mandal_id || locDetails.area_id));

      const stateName = (stateObj as any)?.description || (stateObj as any)?.name;
      const districtName = (districtObj as any)?.description || (districtObj as any)?.name;
      const mandalName = (mandalObj as any)?.description || (mandalObj as any)?.name;

      if (stateName && resolvedState === 'N/A') resolvedState = stateName;
      if (districtName && resolvedRegion === 'N/A') resolvedRegion = districtName;
      if (mandalName && resolvedArea === 'N/A') resolvedArea = mandalName;

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

    let agentName = od.owner_name || od.agent_name || fd.agent_name || fd.owner_name || item.agent_name || item.agentName;
    const agentObj = item.agent || fd.agent || {};
    if (!agentName && (item.agent || fd.agent)) {
      agentName = `${agentObj.first_name || ''} ${agentObj.last_name || ''}`.trim();
    }
    if (!agentName) agentName = 'N/A';
    const agentImg = item.agent_img || fd.agent_img || agentObj.img || agentObj.profile_picture || '';
    
    // Status mapping based on Swagger: 2 -> PENDING, 3 -> APPROVED/ACTIVE, 5 -> REJECTED
    let statusText: "COMPLETED" | "PENDING" | "ACTIVE" | "REJECTED" = "PENDING";
    if (fd.status_id === 3 || fd.status === "APPROVED" || item.status === "APPROVED") statusText = "ACTIVE";
    else if (fd.status_id === 5 || fd.status === "REJECTED" || item.status === "REJECTED") statusText = "REJECTED";
    // status_id === 2 (and any other unmapped id) falls through to the default "PENDING"

    const mappedItem: FarmlandListItem = {
      id: fd.farmland_id?.toString() || item.id || item.farmland_id?.toString(),
      farmlandId: fd.farmland_code || item.glcId || item.farmland_code || 'N/A',
      location: location,
      state: resolvedState,
      region: resolvedRegion,
      area: resolvedArea,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
      agentName: agentName,
      agentImg: agentImg,
      listedOn: formattedDate,
      totalArea: formattedAcres,
      valuation: formattedValuation,
      assetValue: formattedAsset,
      costPerAc: formattedCostPerAc,
      status: statusText,
      liveOnWebsite: fd.is_live_on_website ?? fd.live_on_website ?? fd.is_published ?? item.is_live_on_website ?? (statusText === "ACTIVE"),
    };
    return mappedItem;
  }) : farmlandListDummyData; // fallback to dummy data if initial load or empty api response

  // Enforce local filtering to guarantee it works regardless of API implementation
  const filteredData = listData.filter((item) => {
    const locStr = String(item.location || item.state || item.region || item.area || '').toLowerCase();
    
    // Search query check
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      
      const searchBlock = [
        item.farmlandId,
        item.location,
        item.state,
        item.region,
        item.area,
        item.agentName,
        item.listedOn,
        item.totalArea,
        item.valuation,
        item.assetValue,
        item.costPerAc,
        item.status
      ].join(' ').toLowerCase();

      // Split query into words (handling spaces and commas) to make search more flexible
      const searchWords = query.split(/[\s,]+/).filter(Boolean);
      const matchesAll = searchWords.every(word => searchBlock.includes(word));

      if (!matchesAll) {
        return false;
      }
    }

    if (activeFilters.state) {
      const filterState = activeFilters.state.toLowerCase();
      let abbreviation = filterState;
      if (filterState === 'andhra pradesh') abbreviation = 'a.p.';
      else if (filterState === 'telangana') abbreviation = 't.s.';
      
      const textToSearch = String(item.state || locStr).toLowerCase();
      if (!textToSearch.includes(filterState) && !textToSearch.includes(abbreviation)) {
        return false;
      }
    }
    
    if (activeFilters.region) {
      const filterRegion = activeFilters.region.toLowerCase();
      let abbreviation = filterRegion;
      if (filterRegion === 'west godavari') abbreviation = 'wg';
      else if (filterRegion === 'east godavari') abbreviation = 'eg';

      const textToSearch = String(item.region || locStr).toLowerCase();
      if (!textToSearch.includes(filterRegion) && !textToSearch.includes(abbreviation)) {
        return false;
      }
    }

    if (activeFilters.area) {
      const textToSearch = String(item.area || locStr).toLowerCase();
      if (!textToSearch.includes(activeFilters.area.toLowerCase())) return false;
    }

    return true;
  });

  // Pagination derived values
  const totalCount: number = (apiResponse as any)?.total ?? (apiResponse as any)?.total_count ?? filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const pagedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <FiltersModal
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        initialFilters={activeFilters}
        onApply={handleFiltersChange}
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
              <img src={farmlandListIcon} alt="Farmlands List" className="h-[20px] w-[20px] object-contain" />
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
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
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
                <NotificationsPopover onClose={() => setShowNotifications(false)} />
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
          ) : pagedData.length > 0 ? (
            pagedData.map((item) => (
              <FarmlandListCard
                key={item.id}
                item={item}
                onViewDetails={(id) => navigate(`/farmland-list/map/${id}`)}
              />
            ))
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500 font-medium">
              <span className="text-[16px] text-[#0F172A]">
                {searchQuery.trim().length > 0 
                  ? "Not matching based on search." 
                  : "No farmlands match the selected filters."}
              </span>
              <button 
                onClick={() => setActiveFilters({ state: "", region: "", area: "", priority: "", fromDate: "", toDate: "" })}
                className="mt-4 px-6 py-2 bg-[#2780C4] text-white rounded-full hover:bg-[#1f669d] transition-colors text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* ── PAGINATION ── */}
        {!isLoading && filteredData.length > 0 && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 px-1">
            {/* Left: page info */}
            <span className="text-[13px] font-medium text-[#7F8397] font-['Plus_Jakarta_Sans'] whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>

            {/* Center: page buttons */}
            <div className="flex items-center gap-[6px]">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center justify-center h-[36px] w-[36px] rounded-[10px] bg-[#FFFFFF] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB] disabled:opacity-40 hover:bg-[#F3F4F6] transition-colors"
              >
                <ChevronLeft className="w-[16px] h-[16px] text-[#374151]" strokeWidth={2} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                  if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, idx) =>
                  p === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-1 text-[#9CA3AF] text-[13px] select-none">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`flex items-center justify-center h-[36px] min-w-[36px] px-2 rounded-[10px] text-[13px] font-semibold font-['Plus_Jakarta_Sans'] transition-colors border ${
                        currentPage === p
                          ? 'bg-[#2780C4] text-white border-[#2780C4] shadow-[0px_2px_8px_rgba(39,128,196,0.3)]'
                          : 'bg-[#FFFFFF] text-[#374151] border-[#E5E7EB] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] hover:bg-[#F3F4F6]'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )
              }

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center h-[36px] w-[36px] rounded-[10px] bg-[#FFFFFF] shadow-[0px_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB] disabled:opacity-40 hover:bg-[#F3F4F6] transition-colors"
              >
                <ChevronRight className="w-[16px] h-[16px] text-[#374151]" strokeWidth={2} />
              </button>
            </div>

            {/* Right: items per page label */}
            <span className="text-[13px] font-medium text-[#7F8397] font-['Plus_Jakarta_Sans'] whitespace-nowrap">
              {PAGE_SIZE} per page
            </span>
          </div>
        )}
      </div>
    </>
  );
}