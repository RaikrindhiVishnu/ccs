import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { MOCK_FARMLANDS } from "../data/farmlandsMockData";
import { DashboardStatsRow } from "../components/DashboardStatsRow";
import { VolumeChart } from "../components/VolumeChart";
import { FarmlandCard } from "../components/FarmlandCard";

export const Dashboard = () => {
  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedAmount, setSelectedAmount] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Dropdown UI states
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Get unique filter values
  const locations = Array.from(new Set(MOCK_FARMLANDS.map(item => item.location)));
  const statuses = Array.from(new Set(MOCK_FARMLANDS.map(item => item.status)));

  // Filter Logic
  const filteredFarmlands = MOCK_FARMLANDS.filter(farmland => {
    const matchesSearch = 
      farmland.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmland.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmland.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmland.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation === "all" || farmland.location === selectedLocation;
    const matchesStatus = selectedStatus === "all" || farmland.status === selectedStatus;
    
    // Simple mock logic for Area filtering
    let matchesArea = true;
    if (selectedArea === "small") {
      matchesArea = parseFloat(farmland.totalArea.replace(/[^0-9.]/g, '')) < 300;
    } else if (selectedArea === "large") {
      matchesArea = parseFloat(farmland.totalArea.replace(/[^0-9.]/g, '')) >= 300;
    }

    // Simple mock logic for Amount filtering
    let matchesAmount = true;
    if (selectedAmount === "low") {
      matchesAmount = farmland.amount.includes("Cr") && parseFloat(farmland.amount.replace(/[^\d.]/g, '')) < 3.0;
    } else if (selectedAmount === "high") {
      matchesAmount = farmland.amount.includes("Cr") && parseFloat(farmland.amount.replace(/[^\d.]/g, '')) >= 3.0;
    }

    return matchesSearch && matchesLocation && matchesStatus && matchesArea && matchesAmount;
  });

  return (
    <div className="w-full flex flex-col gap-8 pb-10 pt-[10px] animate-fadeIn">
      
      {/* 1. Header welcome text and search bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-plus-jakarta font-extrabold text-[28px] md:text-[32px] tracking-tight text-[#1E1E1E]">
            VERIFICATION OFFICER DASHBOARD
          </h1>
          <p className="font-plus-jakarta font-semibold text-sm md:text-base text-[#5D6B6B]">
            Next-generation platform infrastructure for scaling sustainable estates.
          </p>
        </div>
        <div className="relative w-full lg:max-w-[340px]">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 pl-12 pr-5 rounded-full border border-[#D9DFE0] bg-white font-plus-jakarta text-sm text-[#1A1C1D] placeholder:text-[#5D6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#2780C4]/30 transition-all shadow-xs"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5D6B6B]/60 w-5 h-5" />
        </div>
      </div>

      {/* 2. Top Summary Cards Row */}
      <DashboardStatsRow />

      {/* 3. Monthly Verification Volume Graph */}
      <VolumeChart />

      {/* 4. Search and Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mt-2">
        
        {/* Local Table Search */}
        <div className="relative w-full md:max-w-[280px]">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-11 pr-4 rounded-full border border-[#D9DFE0] bg-white font-plus-jakarta text-sm text-[#1A1C1D] placeholder:text-[#5D6B6B]/60 focus:outline-none shadow-xs border-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5D6B6B]/60 w-4 h-4" />
        </div>

        {/* Dropdowns Row */}
        <div className="flex flex-wrap items-center gap-3 relative">
          
          {/* Area Filter */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("area")}
              className="bg-white flex items-center justify-between gap-2 h-11 px-5 border border-[#D9DFE0] rounded-full text-[#5D6B6B] font-plus-jakarta text-sm hover:bg-gray-50 cursor-pointer shadow-xs border-none font-semibold"
            >
              <span>Area: {selectedArea === "all" ? "All" : selectedArea === "small" ? "< 300 acres" : ">= 300 acres"}</span>
              <ChevronDown className="w-4 h-4 text-[#5D6B6B]/60" />
            </button>
            {activeDropdown === "area" && (
              <div className="absolute right-0 mt-2 bg-white border border-[#D9DFE0] rounded-2xl shadow-xl w-48 z-20 py-2">
                <button onClick={() => { setSelectedArea("all"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">All Areas</button>
                <button onClick={() => { setSelectedArea("small"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">&lt; 300 Acres</button>
                <button onClick={() => { setSelectedArea("large"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">&gt;= 300 Acres</button>
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("location")}
              className="bg-white flex items-center justify-between gap-2 h-11 px-5 border border-[#D9DFE0] rounded-full text-[#5D6B6B] font-plus-jakarta text-sm hover:bg-gray-50 cursor-pointer shadow-xs border-none font-semibold"
            >
              <span>Location: {selectedLocation === "all" ? "All" : selectedLocation}</span>
              <ChevronDown className="w-4 h-4 text-[#5D6B6B]/60" />
            </button>
            {activeDropdown === "location" && (
              <div className="absolute right-0 mt-2 bg-white border border-[#D9DFE0] rounded-2xl shadow-xl w-48 z-20 py-2 max-h-56 overflow-y-auto no-scrollbar">
                <button onClick={() => { setSelectedLocation("all"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">All Locations</button>
                {locations.map(loc => (
                  <button key={loc} onClick={() => { setSelectedLocation(loc); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">{loc}</button>
                ))}
              </div>
            )}
          </div>

          {/* Amount Filter */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("amount")}
              className="bg-white flex items-center justify-between gap-2 h-11 px-5 border border-[#D9DFE0] rounded-full text-[#5D6B6B] font-plus-jakarta text-sm hover:bg-gray-50 cursor-pointer shadow-xs border-none font-semibold"
            >
              <span>Amount: {selectedAmount === "all" ? "All" : selectedAmount === "low" ? "< ₹3.0 Cr" : ">= ₹3.0 Cr"}</span>
              <ChevronDown className="w-4 h-4 text-[#5D6B6B]/60" />
            </button>
            {activeDropdown === "amount" && (
              <div className="absolute right-0 mt-2 bg-white border border-[#D9DFE0] rounded-2xl shadow-xl w-48 z-20 py-2">
                <button onClick={() => { setSelectedAmount("all"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">All Amounts</button>
                <button onClick={() => { setSelectedAmount("low"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">&lt; ₹3.0 Cr</button>
                <button onClick={() => { setSelectedAmount("high"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">&gt;= ₹3.0 Cr</button>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown("status")}
              className="bg-white flex items-center justify-between gap-2 h-11 px-5 border border-[#D9DFE0] rounded-full text-[#5D6B6B] font-plus-jakarta text-sm hover:bg-gray-50 cursor-pointer shadow-xs border-none font-semibold"
            >
              <span>Status: {selectedStatus === "all" ? "All" : selectedStatus}</span>
              <ChevronDown className="w-4 h-4 text-[#5D6B6B]/60" />
            </button>
            {activeDropdown === "status" && (
              <div className="absolute right-0 mt-2 bg-white border border-[#D9DFE0] rounded-2xl shadow-xl w-48 z-20 py-2">
                <button onClick={() => { setSelectedStatus("all"); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">All Statuses</button>
                {statuses.map(st => (
                  <button key={st} onClick={() => { setSelectedStatus(st); setActiveDropdown(null); }} className="w-full text-left px-4 py-2 hover:bg-gray-50 font-plus-jakarta text-sm text-[#1E1E1E] font-medium border-none bg-transparent cursor-pointer">{st}</button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* 5. Case Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {filteredFarmlands.length > 0 ? (
          filteredFarmlands.slice(0, 4).map((farmland) => (
            <FarmlandCard key={farmland.id} farmland={farmland} />
          ))
        ) : (
          <div className="col-span-full bg-white border border-[#EBEBEB] rounded-[24px] p-12 text-center text-[#5D6B6B] font-plus-jakarta">
            No matching cases found.
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
