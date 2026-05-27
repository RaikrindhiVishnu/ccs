import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { cardsData } from '../data/requestedInfoData';

const RequestedInfo: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCards = cardsData.filter(card =>
    card.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="requested-info-container animate-in fade-in duration-300">
      {/* Welcome Section */}
      <div className="mb-6 shrink-0">
        <h1 className="text-[27px] font-semibold text-black uppercase tracking-wide leading-tight">
          Regional Officer Dashboard
        </h1>
        <p className="text-[14px] text-[#5C5C5C] mt-1">
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>

      {/* Search Input Section - Left Aligned Pill matching Figma Layout perfectly */}
      <div className="mb-8 shrink-0">
        <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[#EBEBEB] w-[163.09px] h-[38.8px] shadow-2xs">
          <Search className="w-4 h-4 text-[#767676] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[12px] text-[#767676] placeholder-[#767676]"
          />
        </div>
      </div>

      {/* Main Container List of Cards - Internally scrollable */}
      <div className="requested-cards-list-container">
        {filteredCards.map((item) => (
          <div
            key={item.id}
            className="relative w-full bg-white border border-gray-100 shadow-xs rounded-[32px] p-8 md:p-10 overflow-hidden flex flex-col justify-between transition-all hover:shadow-md shrink-0"
          >
            {/* Background Watermark Number precisely modeled per CSS dump */}
            <div className="absolute right-0 bottom-[-45px] font-extrabold text-[150px] md:text-[200px] leading-none text-[#1D2900]/[0.02] select-none pointer-events-none pr-6 font-serif">
              {item.watermark}
            </div>

            {/* Top row: ID, Status, Valuation */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-[26px] md:text-[32px] font-bold text-[#1D2900] tracking-[-0.6px] leading-tight">
                    {item.id}
                  </h3>
                  
                  {/* Status Badge - dynamic styling built strictly on Figma specifications */}
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-[#BA1A1A]/[0.06] border border-[#BA1A1A]/10 rounded-full">
                    <span className="w-1.5 h-1.5 bg-[#BA1A1A] rounded-full"></span>
                    <span className="text-[10px] font-extrabold text-[#BA1A1A] tracking-wider uppercase">
                      {item.status}
                    </span>
                  </span>
                </div>
                <p className="text-[11px] font-extrabold text-[#1D2900]/40 tracking-wider uppercase mt-1">
                  {item.unitType}
                </p>
              </div>

              {/* Total Valuation Card Right Aligned */}
              <div className="text-left sm:text-right">
                <span className="text-[26px] md:text-[32px] font-bold text-[#1D2900] tracking-[-0.6px] block">
                  {item.valuation}
                </span>
                <span className="text-[10px] font-extrabold text-[#1D2900]/40 tracking-wider uppercase block mt-0.5">
                  TOTAL VALUATION
                </span>
              </div>
            </div>

            {/* Center Grid of Assets specifications */}
            <div className="border-y border-[#1D2900]/5 py-6 my-6 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {/* Total Area Unit */}
              <div>
                <span className="text-[10px] font-extrabold text-[#1D2900]/40 tracking-wider uppercase block mb-1">
                  TOTAL AREA
                </span>
                <div className="flex items-center gap-2">
                  {/* Custom Triangle Area spec Icon */}
                  <svg className="w-3.5 h-3.5 text-[#1D2900]/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 20h18L12 4z" />
                  </svg>
                  <span className="text-[14px] md:text-[16px] font-bold text-[#1D2900]">
                    {item.area}
                  </span>
                </div>
              </div>

              {/* Lead Agent Assignment */}
              <div>
                <span className="text-[10px] font-extrabold text-[#1D2900]/40 tracking-wider uppercase block mb-1">
                  LEAD AGENT
                </span>
                <div className="flex items-center gap-2">
                  {/* Lead Agent Avatar & Name */}
                  <img
                    src={item.agentAvatar}
                    alt={item.agentName}
                    className="w-5 h-5 rounded-full object-cover border border-[#1D2900]/10 shrink-0"
                  />
                  <span className="text-[14px] md:text-[16px] font-bold text-[#1D2900]">
                    {item.agentName}
                  </span>
                </div>
              </div>

              {/* Geographic Location Unit */}
              <div>
                <span className="text-[10px] font-extrabold text-[#1D2900]/40 tracking-wider uppercase block mb-1">
                  LOCATION
                </span>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#1D2900]/60 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-[14px] md:text-[16px] font-bold text-[#1D2900] truncate">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row stamps and detail dispatch triggers */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mt-2">
              <div className="flex flex-wrap items-center gap-4">
                {/* Created Stamp */}
                <div className="flex items-center gap-2">
                  <svg className="w-[11.67px] h-[11.67px] text-[#1D2900]/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-[11px] font-bold text-[#1D2900]/40 block">
                    {item.createdDate}
                  </span>
                </div>

                {/* Published Stamp with pristine left inline separator */}
                <div className="flex items-center gap-2 border-l border-[#1D2900]/10 pl-4">
                  <svg className="w-[9.33px] h-[9.33px] text-[#1D2900]/40 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-[11px] font-bold text-[#1D2900]/40 block">
                    {item.publishedDate}
                  </span>
                </div>
              </div>

              {/* Right Details Action Button */}
              <button
                onClick={() => navigate(`/regional-officer/requested-info-details/${item.id.replace(/\s+/g, '-').toLowerCase()}`)}
                className="flex items-center gap-2 px-8 py-3 bg-[#2780C4] hover:bg-[#1f66a3] text-white font-bold text-[12px] rounded-full transition-all cursor-pointer shadow-xs self-end sm:self-auto"
              >
                <span>Details</span>
                <span className="font-serif text-sm leading-none">→</span>
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestedInfo;
