import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Farmland } from '../data/farmlandsMockData';

interface CompletedFarmlandListItemProps {
  farmland: Farmland;
}

export const CompletedFarmlandListItem: React.FC<CompletedFarmlandListItemProps> = ({ farmland }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white flex flex-col md:flex-row items-start md:items-center justify-between w-full p-6 md:px-8 md:py-4 rounded-[30px] shadow-xs gap-4 md:gap-6 border border-[#EBEBEB]">
      
      {/* 1. Agent Info Section */}
      <div className="flex items-center gap-4 min-w-[250px]">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#F5F7FA] shrink-0 bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
            alt={farmland.agentName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-plus-jakarta font-bold text-[#5A5C5E] text-sm leading-tight">
            {farmland.agentName}
          </span>
          <span className="font-plus-jakarta font-extrabold text-[#2780C4] text-sm mt-0.5">
            {farmland.id}
          </span>
          <span className="font-plus-jakarta text-xs text-[#94A3B8] mt-0.5">
            {farmland.submissionDate}
          </span>
        </div>
      </div>

      {/* 2. Location Section */}
      <div className="flex flex-col justify-center min-w-[200px]">
        <span className="font-plus-jakarta font-semibold text-sm text-[#5A5C5E]">
          {farmland.location}
        </span>
      </div>

      {/* 3. Stats Section */}
      <div className="flex flex-col justify-center min-w-[200px]">
        <span className="font-plus-jakarta font-bold text-base text-[#5A5C5E]">
          {farmland.amount}
        </span>
        <span className="font-plus-jakarta text-xs text-[#8A8E95] mt-0.5">
          {farmland.totalArea} @ {farmland.costPerAcre}/Ac
        </span>
      </div>

      {/* 4. Action Button */}
      <div className="flex items-center justify-end w-full md:w-auto mt-2 md:mt-0">
        <button 
          onClick={() => navigate(`/verification-officer-1/completed-farmland/${encodeURIComponent(farmland.id)}`)}
          className="h-9 px-5 rounded-full bg-[#2780C4] hover:bg-[#2069A1] text-white font-plus-jakarta font-bold text-xs flex items-center justify-center transition-all cursor-pointer border-none shadow-xs"
        >
          View Details
        </button>
      </div>

    </div>
  );
};

export default CompletedFarmlandListItem;
