import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import type { Farmland } from '../data/farmlandsMockData';

interface InProgressFarmlandCardProps {
  farmland: Farmland;
}

export const InProgressFarmlandCard: React.FC<InProgressFarmlandCardProps> = ({ farmland }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-white flex flex-col w-full shadow-xs border border-[#E5EAEB] hover:shadow-md transition-all duration-300"
      style={{
        height: '360px',
        padding: '24px',
        gap: '24px',
        borderRadius: '24px',
        boxSizing: 'border-box'
      }}
    >
      
      {/* Header */}
      <div 
        className="flex flex-row items-center w-full pb-3 border-b border-gray-100"
        style={{ gap: '12px' }}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border border-[#E1E2ED] shrink-0 bg-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" 
            alt={farmland.agentName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-plus-jakarta font-bold text-sm text-[#191B23] leading-tight">
            {farmland.agentName}
          </span>
          <span className="font-plus-jakarta font-semibold text-[10px] text-[#737686] mt-0.5 uppercase tracking-wider">
            {farmland.submissionDate}
          </span>
        </div>
      </div>

      {/* Title & Location */}
      <div className="flex flex-col w-full gap-1">
        <span className="font-plus-jakarta font-extrabold text-base text-[#2780C4]">
          {farmland.id}
        </span>
        <div className="flex flex-row items-center gap-1 text-[#5D6B6B]">
          <MapPin size={13} />
          <span className="font-plus-jakarta font-semibold text-xs">
            {farmland.location}
          </span>
        </div>
      </div>

      {/* Stats Block */}
      <div 
        className="flex flex-row items-center w-full bg-[#F8F9FA] border border-gray-100 rounded-xl p-4 box-border"
        style={{ height: '81px' }}
      >
        <div className="flex flex-row items-center w-full justify-between">
          
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-[#737686] text-[9px] font-bold uppercase tracking-wider">Area</span>
            <span className="text-[#191B23] font-plus-jakarta font-extrabold text-xs">{farmland.totalArea}</span>
          </div>

          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-[#737686] text-[9px] font-bold uppercase tracking-wider">Cost/Acre</span>
            <span className="text-[#5D6B6B] font-plus-jakarta font-semibold text-xs">{farmland.costPerAcre}</span>
          </div>

          <div className="flex flex-col gap-0.5 pl-4 border-l border-gray-200 min-w-[85px]">
            <span className="text-[#737686] text-[9px] font-bold uppercase tracking-wider">Amount</span>
            <span className="text-[#191B23] font-plus-jakarta font-extrabold text-sm">{farmland.amount}</span>
          </div>

        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={() => navigate(`/verification-officer-1/assigned-farmlands-owner-details/${encodeURIComponent(farmland.id)}`)}
        className="flex items-center justify-center w-full h-11 bg-[#2780C4] hover:bg-[#2069A1] text-white font-plus-jakarta font-bold text-xs rounded-full cursor-pointer hover:opacity-90 transition-all border-none shadow-xs mt-auto"
      >
        Resume Verification
      </button>

    </div>
  );
};

export default InProgressFarmlandCard;
