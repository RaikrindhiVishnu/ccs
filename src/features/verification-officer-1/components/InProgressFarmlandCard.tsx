import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User } from 'lucide-react';
import type { Farmland } from '../data/farmlandsMockData';

interface InProgressFarmlandCardProps {
  farmland: Farmland;
}

// Custom map of images for mockup compliance
const MOCKUP_IMAGES: Record<string, string> = {
  "GLC SOS 01": "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600&auto=format&fit=crop&q=80",
  "GLC SOS 02": "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
  "GLC SOS 03": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80",
  "GLC SOS 04": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80",
};

export const InProgressFarmlandCard: React.FC<InProgressFarmlandCardProps> = ({ farmland }) => {
  const navigate = useNavigate();

  // Extract numeric digits for watermark (e.g. "GLC SOS 01" -> "01")
  const match = farmland.id.match(/\d+/);
  const formattedIndex = match ? match[0].padStart(2, '0') : '01';

  // Choose the mockup image or a fallback
  const cardImage = MOCKUP_IMAGES[farmland.id] || "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80";

  return (
    <div 
      className="bg-white flex flex-col w-full border border-[#E5EAEB] hover:shadow-lg transition-all duration-300 relative overflow-hidden h-[650px]"
      style={{
        padding: '28px 24px',
        gap: '24px',
        borderRadius: '32px',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Large Watermark Number Background */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-[-20px] font-sans font-black text-[260px] leading-none text-[#F1F5F5]/80 select-none z-0"
        style={{ pointerEvents: 'none' }}
      >
        {formattedIndex}
      </div>

      {/* 2. Top Metadata (Active Investigation Label, ID, Price & Status) */}
      <div className="flex flex-col gap-1 w-full z-10">
        <span className="text-[10px] font-bold text-[#8E9D9D] uppercase tracking-wider">
          Active Investigation
        </span>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-baseline gap-3">
            <span className="font-plus-jakarta font-extrabold text-[22px] text-[#0F172A] leading-tight">
              {farmland.id.replace(/\s+/g, '')}
            </span>
            <span className="font-plus-jakarta font-extrabold text-base text-[#115E59]">
              {farmland.amount.includes("Cr") ? "₹25 Lakhs" : farmland.amount} 
            </span>
          </div>
          
          {/* Status Badge */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="font-plus-jakarta font-extrabold text-[9px] text-[#334155] tracking-wider uppercase">
              IN PROGRESS
            </span>
          </div>
        </div>
      </div>

      {/* 3. Customized Progress Bar (Customer -> Legal Documents) */}
      <div className="relative flex items-center justify-between w-full px-2 z-10 mt-1">
        {/* Connecting Lines */}
        <div className="absolute top-[20px] left-[25%] right-[25%] h-[3px] bg-[#E2E8F0] z-0 flex">
          {/* Left half (Customer to Legal Documents is active) */}
          <div className="w-1/2 h-full bg-[#1E293B]" />
          {/* Right half is pending */}
          <div className="w-1/2 h-full bg-[#E2E8F0]" />
        </div>

        {/* Node 1: Customer */}
        <div className="flex flex-col items-center gap-1.5 z-10 flex-1">
          <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-white shadow-xs">
            <User size={16} className="stroke-[2.5]" />
          </div>
          <span className="font-plus-jakarta font-extrabold text-[10px] text-[#1E293B]">
            Customer
          </span>
        </div>

        {/* Node 2: Legal Documents */}
        <div className="flex flex-col items-center gap-1.5 z-10 flex-1">
          <div className="w-10 h-10 rounded-full bg-white border-[3px] border-[#F59E0B] flex items-center justify-center text-[#F59E0B] shadow-xs">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <span className="font-plus-jakarta font-extrabold text-[10px] text-[#F59E0B]">
            Legal Documents
          </span>
        </div>
      </div>

      {/* 4. Beautiful crop image with absolute text & glassmorphic confidence indicator */}
      <div className="relative w-full flex-1 rounded-[20px] overflow-hidden shadow-xs z-10">
        <img 
          src={cardImage} 
          alt={farmland.location}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Overlay details */}
        <div className="absolute top-4 left-4 flex items-center gap-1 text-white">
          <MapPin size={12} className="text-[#38BDF8]" />
          <span className="font-plus-jakarta font-bold text-[9px] uppercase tracking-wider">
            {farmland.location.includes("AP") ? `SECTOR 7G, NORTHERN RIDGE` : farmland.location.toUpperCase()}
          </span>
        </div>

        {/* Bottom Left Title */}
        <div className="absolute bottom-4 left-4 flex flex-col">
          <span className="font-plus-jakarta font-extrabold text-base text-white leading-tight">
            Boundary Verification
          </span>
        </div>

        {/* Bottom Right Glassmorphic Badge */}
        <div className="absolute bottom-4 right-4 backdrop-blur-md bg-black/40 border border-white/10 px-3 py-1 rounded-[14px] flex flex-col items-center">
          <span className="text-[7px] font-bold text-[#E2E8F0]/80 tracking-wider">CONFIDENCE</span>
          <span className="text-xs font-extrabold text-[#F59E0B]">84%</span>
        </div>
      </div>

      {/* 5. Resume Verification Full-Width Button */}
      <button 
        onClick={() => navigate(`/verification-officer-1/assigned-farmlands-owner-details/${encodeURIComponent(farmland.id)}`)}
        className="flex items-center justify-center w-full h-12 bg-[#2780C4] hover:bg-[#2069A1] text-white font-plus-jakarta font-extrabold text-xs tracking-wider rounded-full cursor-pointer hover:shadow-md transition-all border-none z-10 gap-2"
      >
        <span>RESUME VERIFICATION</span>
      </button>

    </div>
  );
};

export default InProgressFarmlandCard;
