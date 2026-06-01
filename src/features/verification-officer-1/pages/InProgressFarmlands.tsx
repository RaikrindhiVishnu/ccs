import { useState } from 'react';
import { Search } from 'lucide-react';
import { MOCK_FARMLANDS } from '../data/farmlandsMockData';
import { InProgressFarmlandCard } from '../components/InProgressFarmlandCard';

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
    <div className="w-full flex flex-col pt-[10px] animate-fadeIn">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4 mb-10">
        
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="font-plus-jakarta font-extrabold text-2xl text-[#191B23]">
            In-Progress Farmlands
          </h1>
          <p className="font-plus-jakarta font-medium text-sm text-[#5D6B6B]">
            Manage and review incoming agricultural properties.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center">
          {/* Search Bar */}
          <div className="relative bg-white flex items-center w-full md:w-80 h-11 border border-[#D9DFE0] rounded-full px-4 pl-12 shadow-xs">
            <Search size={16} className="text-[#5D6B6B]/60 absolute left-4" />
            <input 
              type="text" 
              placeholder="Search by ID, Location, or Agent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full font-plus-jakarta text-sm text-[#1A1C1D] placeholder:text-[#5D6B6B]/60"
            />
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] w-full pb-[40px]">
        {inProgressCases.length > 0 ? (
          inProgressCases.map((farmland) => (
            <InProgressFarmlandCard key={farmland.id} farmland={farmland} />
          ))
        ) : (
          <div className="col-span-full bg-white border border-[#EBEBEB] rounded-[24px] p-12 text-center text-[#5D6B6B] font-plus-jakarta">
            No in-progress farmlands match your search.
          </div>
        )}
      </div>

    </div>
  );
};

export default InProgressFarmlands;
