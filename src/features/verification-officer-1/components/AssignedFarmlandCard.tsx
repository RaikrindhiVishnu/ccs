import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import type { Farmland } from '../data/farmlandsMockData';

interface AssignedFarmlandCardProps {
  farmland: Farmland;
}

export const AssignedFarmlandCard: React.FC<AssignedFarmlandCardProps> = ({ farmland }) => {
  const navigate = useNavigate();

  // Helper to format amount dynamically
  const formatAmount = (amt: string) => {
    const cleanAmt = amt.replace(/^₹/, '');
    const match = cleanAmt.match(/^([\d.]+)\s*(.*)$/);
    if (match) {
      return (
        <span className="font-plus-jakarta font-extrabold text-[22px] text-[#1A1C1D]">
          {match[1]} <span className="text-sm font-semibold text-[#5D6B6B] ml-0.5">{match[2]}</span>
        </span>
      );
    }
    return <span className="font-plus-jakarta font-extrabold text-[22px] text-[#1A1C1D]">{cleanAmt}</span>;
  };

  // Deterministic photo variety based on farmland ID
  let imageUrl = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80';
  if (farmland.id.includes('01')) {
    imageUrl = 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'; // wheat field
  } else if (farmland.id.includes('02')) {
    imageUrl = 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80'; // green paddy field
  } else if (farmland.id.includes('03')) {
    imageUrl = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80'; // agricultural landscape
  }

  return (
    <div className="bg-white rounded-[24px] overflow-hidden flex flex-col w-full shadow-xs border border-[#E5EAEB]">
      
      {/* Top Image Section */}
      <div className="relative w-full bg-gray-100 shrink-0 h-[213px]">
        <img 
          src={imageUrl} 
          alt="Farmland aerial preview" 
          className="w-full h-full object-cover animate-fadeIn"
        />
        
        {/* Top-Left ID Tag */}
        <div className="absolute left-4 bottom-4">
          <span className="text-white font-plus-jakarta font-bold text-xs tracking-wider drop-shadow-md">
            ID: {farmland.id.replace(/\s+/g, '')}
          </span>
        </div>

        {/* Top-Right Badge ready for audit */}
        <div className="absolute right-4 top-4 flex items-center bg-[#091426]/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#BDD327]" />
          <span className="text-white font-plus-jakarta font-extrabold text-[9px] uppercase tracking-wider">
            READY FOR AUDIT
          </span>
        </div>
      </div>

      {/* Bottom Content Section */}
      <div className="flex-1 flex flex-col justify-between p-6">
        
        {/* Title and Price */}
        <div>
          <div className="flex justify-between items-start w-full">
            <h3 className="text-[#1A1C1D] font-plus-jakarta font-extrabold text-[22px] leading-tight">
              {farmland.id}
            </h3>
            <div className="flex flex-col items-end">
              <span className="text-[#1A1C1D] leading-none">
                {formatAmount(farmland.amount)}
              </span>
              <span className="text-[#5D6B6B] font-plus-jakarta font-semibold text-xs mt-1">
                {farmland.totalArea}
              </span>
            </div>
          </div>

          {/* Agent info */}
          <div className="flex items-center gap-1.5 text-[#5D6B6B] mt-1.5">
            <User size={13} className="text-[#5D6B6B]/80" />
            <span className="font-plus-jakarta text-xs font-semibold text-[#5D6B6B]">
              Agent: {farmland.agentName}
            </span>
          </div>
        </div>

        <hr className="border-[#E5EAEB] my-4 w-full" />

        {/* Stats Grid: Soil Type, Water Source, Risk Score */}
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="flex flex-col">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wider">SOIL TYPE</span>
            <span className="text-[#1A1C1D] font-plus-jakarta font-extrabold text-sm mt-1">
              {farmland.soilType || 'Alluvial'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wider">WATER SOURCE</span>
            <span className="text-[#1A1C1D] font-plus-jakarta font-extrabold text-sm mt-1">
              {farmland.waterSource || 'Canal'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#737686] text-[10px] font-bold uppercase tracking-wider">RISK SCORE</span>
            <span className="text-[#2780C4] font-plus-jakarta font-extrabold text-sm mt-1">
              {farmland.riskScore || 'Low'}
            </span>
          </div>
        </div>

        {/* Enter Audit Room Button */}
        <button 
          onClick={() => navigate(`/verification-officer-1/assigned-farmlands-owner-details/${encodeURIComponent(farmland.id)}`)}
          className="w-full h-12 rounded-full mt-5 bg-[#2780C4] hover:bg-[#2069A1] text-white font-plus-jakarta font-bold text-xs flex items-center justify-center transition-all cursor-pointer border-none shadow-xs uppercase tracking-wider"
        >
          ENTER AUDIT ROOM
        </button>

      </div>
    </div>
  );
};

export default AssignedFarmlandCard;
