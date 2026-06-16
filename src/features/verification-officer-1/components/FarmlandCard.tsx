import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Farmland } from '../data/farmlandsMockData';

interface FarmlandCardProps {
  farmland: Farmland;
}

export const FarmlandCard: React.FC<FarmlandCardProps> = ({ farmland }) => {
  const navigate = useNavigate();

  // Pill status styles
  let statusDot = "";
  let statusBg = "";
  let statusText = "";
  if (farmland.status === "Approved" || farmland.status === "Completed") {
    statusDot = "bg-[#10B981]";
    statusBg = "bg-[#ECFDF5]";
    statusText = "text-[#065F46]";
  } else if (farmland.status === "Pending") {
    statusDot = "bg-[#F59E0B]";
    statusBg = "bg-[#FFFBEB]";
    statusText = "text-[#92400E]";
  } else if (farmland.status === "In Review") {
    statusDot = "bg-[#718096]";
    statusBg = "bg-[#F1F5F9]";
    statusText = "text-[#475569]";
  } else {
    statusDot = "bg-[#EF4646]";
    statusBg = "bg-[#FFF5F5]";
    statusText = "text-[#9B1C1C]";
  }

  // Pill badge styles
  let badgeBg = "";
  let badgeText = "";
  if (farmland.badge === "HIGH VALUE") {
    badgeBg = "bg-[#EBF8FF]";
    badgeText = "text-[#2B6CB0]";
  } else if (farmland.badge === "LARGE ACREAGE") {
    badgeBg = "bg-[#FAF5FF]";
    badgeText = "text-[#6B46C1]";
  } else if (farmland.badge === "URGENT") {
    badgeBg = "bg-[#FFF5F5]";
    badgeText = "text-[#C53030]";
  } else if (farmland.badge === "MEDIUM") {
    badgeBg = "bg-[#EEF2FF]";
    badgeText = "text-[#4F46E5]";
  } else {
    badgeBg = "bg-[#F7FAFC]";
    badgeText = "text-[#4A5568]";
  }

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[24px] p-6 flex flex-col justify-between h-[340px] shadow-xs hover:shadow-md transition-shadow">
      {/* Card Top: Status & Badge */}
      <div className="flex items-center justify-between w-full">
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${statusBg} ${statusText} text-xs font-semibold`}>
          <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
          <span>{farmland.status}</span>
        </div>
        <div className={`px-2.5 py-1 rounded-full ${badgeBg} ${badgeText} text-[10px] font-extrabold tracking-wider uppercase`}>
          {farmland.badge}
        </div>
      </div>

      {/* Card Middle: Title & Code */}
      <div className="flex flex-col gap-1 mt-4">
        <h3 className="font-plus-jakarta font-extrabold text-[20px] text-[#1A1C1D]">
          {farmland.id}
        </h3>
        <p className="font-plus-jakarta font-medium text-xs text-[#5D6B6B]">
          {farmland.code} • {farmland.agentName}
        </p>
      </div>

      {/* Divider */}
      <hr className="border-[#ECECEC] my-4" />

      {/* Card Stats Grid */}
      <div className="grid grid-cols-3 gap-2 w-full">
        <div className="flex flex-col gap-0.5">
          <span className="font-plus-jakarta text-[10px] text-[#A0AEC0] uppercase tracking-wider font-bold">Area</span>
          <span className="font-plus-jakarta font-extrabold text-xs text-[#2D3748] truncate">{farmland.totalArea}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-plus-jakarta text-[10px] text-[#A0AEC0] uppercase tracking-wider font-bold">Total Amt</span>
          <span className="font-plus-jakarta font-extrabold text-xs text-[#2D3748] truncate">{farmland.amount}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-plus-jakarta text-[10px] text-[#A0AEC0] uppercase tracking-wider font-bold">Cost/Acre</span>
          <span className="font-plus-jakarta font-extrabold text-xs text-[#2D3748] truncate">{farmland.costPerAcre}</span>
        </div>
      </div>

      {/* Card Button */}
      <button 
        onClick={() => navigate(`/verification-officer-1/assigned-farmlands-owner-details/${encodeURIComponent(farmland.id)}`)}
        className="w-full h-11 bg-[#2780C4] hover:bg-[#1f6aaa] text-white rounded-full font-plus-jakarta font-bold text-xs tracking-wider transition-colors mt-6 cursor-pointer border-none flex items-center justify-center"
      >
        ENTER AUDIT ROOM
      </button>
    </div>
  );
};

export default FarmlandCard;
