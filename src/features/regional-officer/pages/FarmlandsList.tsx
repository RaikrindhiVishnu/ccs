import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { farmlandsData, type FarmlandListItem } from '../data/farmlandsListData';

// Reusable Component to render individual row cards matching the Figma Stack height and spacing constraints flawlessly
const FarmlandRowCard: React.FC<{
  item: FarmlandListItem;
  onViewDetails: (item: FarmlandListItem) => void;
}> = ({ item, onViewDetails }) => {
  
  // Custom Dynamic Badge configuration matching extraction constants precisely
  const getStatusBadgeStyles = (status: FarmlandListItem['statusState']) => {
    switch (status) {
      case 'COMPLETED':
        return {
          bg: 'bg-[#BCD225]/15',
          border: 'border-[#BCD225]/30',
          text: 'text-[#9fae15]', // slightly deep tone for gorgeous AAA legibility
        };
      case 'PROCESSING':
        return {
          bg: 'bg-[#00629E]/10',
          border: 'border-[#00629E]/20',
          text: 'text-[#00629E]',
        };
      case 'REVIEW':
        return {
          bg: 'bg-[#BA1A1A]/10',
          border: 'border-[#BA1A1A]/20',
          text: 'text-[#BA1A1A]',
        };
    }
  };

  const badgeStyles = getStatusBadgeStyles(item.statusState);

  return (
    <div className="w-full bg-white rounded-[32px] p-6 shadow-xs border border-gray-100 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 transition-all duration-300 hover:shadow-md">
      
      {/* Column Left: Identity Wrapper */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <img
          src={item.avatarUrl}
          alt={item.agentName}
          className="w-14 h-14 rounded-full object-cover border border-gray-100 shrink-0 shadow-2xs"
        />
        <div className="flex flex-col">
          <span className="text-[18px] font-bold text-[#091426] leading-tight">
            {item.title}
          </span>
          <span className="text-[14px] font-medium text-[#45474C] mt-0.5">
            {item.agentName}
          </span>
        </div>
      </div>

      {/* Column Middle-Left: Geospatial & Time Stamps Stack */}
      <div className="flex flex-col gap-2 min-w-[240px]">
        {/* District line */}
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#00629E] shrink-0 stroke-[2.5]" />
          <span className="text-[12px] font-bold text-[#45474C] uppercase tracking-wide leading-none">
            {item.locationDistrict}
          </span>
        </div>

        {/* Created date line */}
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-[#75777D] shrink-0" />
          <span className="text-[12px] font-medium text-[#75777D] leading-none">
            {item.createdStamp}
          </span>
        </div>

        {/* Published date line */}
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#75777D] shrink-0" />
          <span className="text-[12px] font-medium text-[#75777D] leading-none">
            {item.publishedStamp}
          </span>
        </div>
      </div>

      {/* Pristine Vertical Divider Line exactly modeled per CSS extraction */}
      <div className="hidden xl:block h-[70px] w-px bg-[#E7E8E9] self-center shrink-0 mx-2" />

      {/* Columns Grid Container for Stats Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full xl:w-auto flex-1 max-w-xl">
        {/* Metric 1: Area */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#75777D] uppercase tracking-[0.5px]">
            AREA
          </span>
          <span className="text-[14px] font-extrabold text-[#091426] mt-0.5">
            {item.areaSize}
          </span>
        </div>

        {/* Metric 2: Total Amount */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#75777D] uppercase tracking-[0.5px]">
            TOTAL AMOUNT
          </span>
          <span className="text-[14px] font-extrabold text-[#091426] mt-0.5">
            {item.totalAmount}
          </span>
        </div>

        {/* Metric 3: Cost / Acre */}
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-[#75777D] uppercase tracking-[0.5px]">
            COST/ACRE
          </span>
          <span className="text-[14px] font-extrabold text-[#091426] mt-0.5">
            {item.costPerAcre}
          </span>
        </div>
      </div>

      {/* Column Right: State Capsule Badge & Blue Button Trigger */}
      <div className="flex items-center justify-between xl:justify-end gap-4 w-full xl:w-auto pt-4 xl:pt-0 border-t xl:border-none border-gray-50">
        {/* State Badge Capsule precisely replicated */}
        <div className={`px-4 py-1.5 rounded-full border ${badgeStyles.bg} ${badgeStyles.border} backdrop-blur-xs flex items-center justify-center min-w-[100px]`}>
          <span className={`text-[10px] font-black tracking-[1px] uppercase leading-none mt-0.5 ${badgeStyles.text}`}>
            {item.statusState}
          </span>
        </div>

        {/* Core Blue Action Button */}
        <button
          onClick={() => onViewDetails(item)}
          className="flex items-center gap-1.5 px-6 py-2.5 bg-[#2780C4] hover:bg-[#1f66a3] text-white font-bold text-[12px] rounded-full transition-all shadow-xs cursor-pointer shrink-0"
        >
          <span>Details</span>
          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
};

// Main Entry Module
const FarmlandsList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredFarmlands = farmlandsData.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.locationDistrict.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (item: FarmlandListItem) => {
    // Navigate cleanly to our standalone detailed workspace path
    navigate(`/regional-officer/farmlands-list-details/${item.id}`);
  };

  return (
    <div className="pt-2 pb-16 font-plus-jakarta w-full lg:max-w-[1407px] mx-auto">
      {/* Core Header Area */}
      <div className="mb-6">
        <h1 className="text-[27px] font-semibold text-black uppercase tracking-wide leading-tight">
          Regional Officer Dashboard
        </h1>
        <p className="text-[14px] text-[#5C5C5C] mt-1">
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>

      {/* Left-Aligned Search Control Input matching Figma layout flow */}
      <div className="mb-8">
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

      {/* Property List Block Stack loading Reusable Components */}
      <div className="flex flex-col gap-6">
        {filteredFarmlands.map((item) => (
          <FarmlandRowCard
            key={item.id}
            item={item}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
};

export default FarmlandsList;
