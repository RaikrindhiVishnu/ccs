import { useState } from 'react';
import { Search } from 'lucide-react';
import { MOCK_FARMLANDS } from '../data/farmlandsMockData';
import { AssignedFarmlandCard } from '../components/AssignedFarmlandCard';
import { DashboardStatsRow } from '../components/DashboardStatsRow';

export const AssignedFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter assigned cases (Pending, In Review, Returned to RO) matching search query
  const assignedCases = MOCK_FARMLANDS.filter(farmland => 
    (farmland.status === 'Pending' || farmland.status === 'In Review' || farmland.status === 'Returned to RO') &&
    (farmland.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     farmland.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
     farmland.agentName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-5 rounded-full border border-[#D9DFE0] bg-white font-plus-jakarta text-sm text-[#1A1C1D] placeholder:text-[#5D6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#2780C4]/30 transition-all shadow-xs"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5D6B6B]/60 w-5 h-5" />
        </div>
      </div>

      {/* 2. Top Summary Cards Row */}
      <DashboardStatsRow />

      {/* 3. Section Title & View All */}
      <div className="flex items-center justify-between w-full mt-2">
        <h2 className="font-plus-jakarta font-extrabold text-[20px] text-[#1A1C1D]">
          Assigned Farmlands
        </h2>
        <button className="text-[#2780C4] hover:underline font-plus-jakarta font-bold text-sm bg-transparent border-none cursor-pointer">
          View All
        </button>
      </div>

      {/* 4. Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full">
        {assignedCases.length > 0 ? (
          assignedCases.map((farmland) => (
            <AssignedFarmlandCard key={farmland.id} farmland={farmland} />
          ))
        ) : (
          <div className="col-span-full bg-white border border-[#EBEBEB] rounded-[24px] p-12 text-center text-[#5D6B6B] font-plus-jakarta">
            No assigned farmlands match your search.
          </div>
        )}
      </div>

    </div>
  );
};

export default AssignedFarmlands;
