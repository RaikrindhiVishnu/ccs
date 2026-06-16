import { useState } from 'react';
import { Search } from 'lucide-react';
import { MOCK_FARMLANDS } from '../data/farmlandsMockData';
import { InProgressFarmlandCard } from '../components/InProgressFarmlandCard';
import { DashboardStatsRow } from '../components/DashboardStatsRow';

export const InProgressFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter in-progress cases
  const inProgressCases = MOCK_FARMLANDS.filter(farmland => 
    (farmland.status === 'In Review' || farmland.status === 'Pending') &&
    (farmland.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     farmland.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
     farmland.agentName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full flex flex-col gap-8 pt-[10px] animate-fadeIn pb-[40px]">
      
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

      {/* 2. Metric stats Row */}
      <DashboardStatsRow />

      {/* 3. Section Title & Action button */}
      <div className="flex items-center justify-between w-full mt-4">
        <h2 className="font-plus-jakarta font-extrabold text-[20px] text-[#1E1E1E]">
          In-Progress Farmlands
        </h2>
        <button className="font-plus-jakarta font-bold text-sm text-[#1E1E1E] hover:opacity-75 bg-transparent border-none cursor-pointer flex items-center gap-1">
          View All
        </button>
      </div>

      {/* 4. Horizontal Scrolling List of Custom In-Progress Cards */}
      <div className="flex overflow-x-auto gap-[30px] w-full pb-4 scroll-smooth no-scrollbar">
        {inProgressCases.length > 0 ? (
          inProgressCases.map((farmland) => (
            <div key={farmland.id} className="w-[310px] md:w-[547px] flex-shrink-0">
              <InProgressFarmlandCard farmland={farmland} />
            </div>
          ))
        ) : (
          <div className="w-full bg-white border border-[#EBEBEB] rounded-[24px] p-12 text-center text-[#5D6B6B] font-plus-jakarta">
            No in-progress farmlands match your search.
          </div>
        )}
      </div>

    </div>
  );
};

export default InProgressFarmlands;
