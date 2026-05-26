import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { completedFarmlandsData } from '../Data/completedFarmlandsMockData';
import { CompletedFarmlandListItem } from '../components/CompletedFarmlandListItem';

export const VerificationOfficerCompletedFarmlands = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full flex flex-col pt-[10px]">
      
      {/* Header Section */}
      <div className="flex items-center justify-between w-full" style={{ marginBottom: '40px', height: '52px' }}>
        
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-[4px]">
          <h1 className="font-plus-jakarta font-medium text-[#191B23]" style={{ fontSize: '24px', lineHeight: '24px' }}>
            Completed Farmlands
          </h1>
          <p className="font-inter font-normal text-[#505F76]" style={{ fontSize: '16px', lineHeight: '24px' }}>
            Manage and review completed agricultural properties.
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center">
          
          {/* Search Bar */}
          <div 
            className="relative bg-white flex items-center"
            style={{ width: '384px', height: '49px', border: '1px solid #E1E2ED', boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)', borderRadius: '9999px', padding: '14px 16px 14px 48px' }}
          >
            <Search size={18} className="text-[#737686] absolute" style={{ left: '16px' }} />
            <input 
              type="text" 
              placeholder="Search by ID, Location, or Agent..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full font-inter placeholder:text-[#6B7280] text-[#6B7280]"
              style={{ fontSize: '16px', lineHeight: '19px' }}
            />
          </div>

        </div>
      </div>

      {/* Vertical List of Cards */}
      <div className="flex flex-col w-full" style={{ gap: '24px', paddingBottom: '40px' }}>
        {completedFarmlandsData.map((farmland) => (
          <CompletedFarmlandListItem key={farmland.id} farmland={farmland} />
        ))}
      </div>

    </div>
  );
};

export default VerificationOfficerCompletedFarmlands;
