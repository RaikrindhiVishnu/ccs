import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  MapPin,
  X,
  CheckCircle2,
  ShieldCheck,
  FileText,
  UserCheck
} from 'lucide-react';

// Authentic Design System SVG Assets
import containerSvg from '../../../assets/regionalofficer/Container (8).svg';
import roDashboardSvg from '../../../assets/regionalofficer/ro dasboard.svg';
import vineyardRows1Svg from '../../../assets/regionalofficer/Vineyard Rows (1).svg';
import vineyardRowsSvg from '../../../assets/regionalofficer/Vineyard Rows.svg';
import wheatField1Svg from '../../../assets/regionalofficer/Wheat Field (1).svg';
import wheatField2Svg from '../../../assets/regionalofficer/Wheat Field (2).svg';
import wheatFieldSvg from '../../../assets/regionalofficer/Wheat Field.svg';

interface LandDetail {
  id: string;
  agent: string;
  area: string;
  amount: string;
  cost: string;
  image: string;
}

const AssignedFarmlands: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLand, setSelectedLand] = useState<LandDetail | null>(null);

  const handleViewDetails = (id: string, agent: string, area: string, amount: string, cost: string, image: string) => {
    navigate(`/regional-officer/assigned-farmlands-details/${id.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const row2Lands = [
    { id: 'GLC SOS 04', agent: 'Rajesh K.', area: '120 Acres', amount: '₹28 Lakhs', cost: '₹9,200', image: wheatField1Svg },
    { id: 'GLC SOS 05', agent: 'Anand P.', area: '340 Acres', amount: '₹82 Lakhs', cost: '₹10,500', image: wheatField2Svg },
    { id: 'GLC SOS 06', agent: 'Srinivas V.', area: '85 Acres', amount: '₹18 Lakhs', cost: '₹9,800', image: roDashboardSvg },
    { id: 'GLC SOS 07', agent: 'Venkat M.', area: '150 Acres', amount: '₹32 Lakhs', cost: '₹8,900', image: wheatField1Svg },
  ];

  return (
    <div className="pt-2 pb-16 font-plus-jakarta max-w-[1407px] mx-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-[27px] font-semibold text-black uppercase tracking-wide leading-tight">
          Regional Officer Dashboard
        </h1>
        <p className="text-[14px] text-[#5C5C5C] mt-1">
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>

      {/* Smart Farmland List Section - Search & Filters Row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center mb-8">
        {/* Search Input Container */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-[#EBEBEB] w-full md:w-[163px] h-[39px] shadow-xs shrink-0">
          <Search className="w-4 h-4 text-[#767676] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[12px] text-[#767676] placeholder-[#767676]"
          />
        </div>

        {/* 4 Filter Dropdowns Container */}
        <div className="flex flex-wrap items-center gap-4 justify-end">
          {['Area', 'Location', 'Amount', 'Status'].map((filterLabel, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 px-5 py-2 bg-white rounded-full border border-[#EBEBEB] h-[36px] shadow-xs hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
            >
              <span className="text-[12px] text-[#5A5C5E] font-medium">{filterLabel}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A5C5E]" />
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Asymmetric Layout */}
      <div className="flex flex-col gap-6">
        {/* ROW 1: Focus Card + 3 Standard Cards */}
        <div className="flex flex-col xl:flex-row gap-[19.38px] w-full items-stretch">
          
          {/* Article - Focus Card (Large Span) */}
          <div className="relative w-full xl:w-[558px] h-[461px] rounded-[29px] overflow-hidden group shadow-sm shrink-0 bg-[#091426]">
            <img
              src={containerSvg}
              alt="Premium Farmland Aerial"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Cover */}
            <div className="absolute inset-0 bg-[#091426]/10"></div>
            {/* Bottom Gradient Overlay per Figma */}
            <div className="absolute inset-x-0 bottom-0 h-[133px] bg-gradient-to-t from-[#091426]/90 via-[#091426]/60 to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-[29px] font-bold text-white leading-tight mb-2">
                GLC SOS 10
              </h3>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1.5 bg-[#F0F1F2]/90 block rounded-xs"></span>
                    <span className="text-[15.5px] text-[#F0F1F2]/90">4,200 Acres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#F0F1F2]/90" />
                    <span className="text-[15.5px] text-[#F0F1F2]/90">Tanuku, A.P.</span>
                  </div>
                </div>
                <span className="text-[19.4px] font-bold text-white">
                  ₹12.5 Cr
                </span>
              </div>
            </div>
          </div>

          {/* Article - Standard Card 1 */}
          <div className="bg-white rounded-[23.25px] overflow-hidden shadow-sm border border-gray-100 flex flex-col shrink-0 flex-1 xl:w-[263.5px] h-[461px]">
            <div className="w-full h-[186px] relative overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
              <img
                src={vineyardRowsSvg}
                alt="Vineyard Rows"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[19.4px] font-bold text-[#131600]">GLC SOS 01</h4>
                </div>
                <div className="border-y border-black/5 py-3 grid grid-cols-2 gap-y-3 relative">
                  <div className="flex flex-col">
                    <span className="text-[11.6px] font-medium text-[#6B7280] font-inter">Agent Name</span>
                    <span className="text-[13.6px] font-semibold text-[#0B2545] font-inter mt-0.5 truncate">Venkat M.</span>
                  </div>
                  <div className="flex flex-col pl-4 border-l border-gray-100">
                    <span className="text-[11.6px] font-medium text-[#6B7280] font-inter">Area</span>
                    <span className="text-[13.6px] font-semibold text-[#0B2545] font-inter mt-0.5">210 Acres</span>
                  </div>
                  <div className="flex flex-col pt-2">
                    <span className="text-[11.6px] font-medium text-[#6B7280] font-inter">Total Amount</span>
                    <span className="text-[13.6px] font-semibold text-[#0B2545] font-inter mt-0.5">₹45 Lakhs</span>
                  </div>
                  <div className="flex flex-col pl-4 pt-2 border-l border-gray-100">
                    <span className="text-[11.6px] font-medium text-[#6B7280] font-inter">Cost per Acre</span>
                    <span className="text-[13.6px] font-semibold text-[#0B2545] font-inter mt-0.5">₹8,500</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails('GLC SOS 01', 'Venkat M.', '210 Acres', '₹45 Lakhs', '₹8,500', vineyardRowsSvg)}
                className="bg-[#2780C4] hover:bg-[#1f66a3] text-white font-medium text-[13.5px] py-2 px-5 rounded-full self-start transition-all cursor-pointer shadow-xs"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Article - Standard Card 2 */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col shrink-0 flex-1 xl:w-[264px] h-[461px]">
            <div className="w-full h-[186px] relative overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
              <img
                src={wheatFieldSvg}
                alt="Wheat Field"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[19.4px] font-bold text-[#131600]">GLC SOS 02</h4>
                  {/* Outer circle layout container holding inner status pill */}
                  <div className="w-[23.3px] h-[27.1px] bg-[#F8F9FA] rounded-full flex items-center justify-center border border-gray-100">
                    <span className="w-[15.5px] h-[19.4px] bg-[#BCD225] block rounded-full"></span>
                  </div>
                </div>
                <div className="border-y border-black/5 py-3 grid grid-cols-2 gap-y-3 relative">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Agent Name</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5 truncate">Srinivas V.</span>
                  </div>
                  <div className="flex flex-col pl-4 border-l border-gray-100">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Area</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">45 Acres</span>
                  </div>
                  <div className="flex flex-col pt-2">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Total Amount</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">₹12 Lakhs</span>
                  </div>
                  <div className="flex flex-col pl-4 pt-2 border-l border-gray-100">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Cost per Acre</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">₹11,500</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails('GLC SOS 02', 'Srinivas V.', '45 Acres', '₹12 Lakhs', '₹11,500', wheatFieldSvg)}
                className="bg-[#2780C4] hover:bg-[#1f66a3] text-white font-medium text-[13.5px] py-2 px-5 rounded-full self-start transition-all cursor-pointer shadow-xs"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Article - Standard Card 3 */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col shrink-0 flex-1 xl:w-[263px] h-[461px]">
            <div className="w-full h-[186px] relative overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
              <img
                src={vineyardRows1Svg}
                alt="Rolling Green Hills"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-[19.4px] font-bold text-[#131600]">GLC SOS 03</h4>
                  <div className="w-[23.3px] h-[27.1px] bg-[#F8F9FA] rounded-full flex items-center justify-center border border-gray-100">
                    <span className="w-[15.5px] h-[19.4px] bg-[#BCD225] block rounded-full"></span>
                  </div>
                </div>
                <div className="border-y border-black/5 py-3 grid grid-cols-2 gap-y-3 relative">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Agent Name</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5 truncate">Venkat M.</span>
                  </div>
                  <div className="flex flex-col pl-4 border-l border-gray-100">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Area</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">210 Acres</span>
                  </div>
                  <div className="flex flex-col pt-2">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Total Amount</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">₹45 Lakhs</span>
                  </div>
                  <div className="flex flex-col pl-4 pt-2 border-l border-gray-100">
                    <span className="text-[12px] font-medium text-[#6B7280] font-inter">Cost per Acre</span>
                    <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">₹8,500</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleViewDetails('GLC SOS 03', 'Venkat M.', '210 Acres', '₹45 Lakhs', '₹8,500', vineyardRows1Svg)}
                className="bg-[#2780C4] hover:bg-[#1f66a3] text-white font-medium text-[13.5px] py-2 px-5 rounded-full self-start transition-all cursor-pointer shadow-xs"
              >
                View Details
              </button>
            </div>
          </div>

        </div>

        {/* ROW 2: 4 More Beautiful Standard Cards matching the interface bottom overflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[19.38px] w-full mt-2">
          {row2Lands.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col h-[461px]">
              <div className="w-full h-[186px] relative overflow-hidden bg-gray-50 shrink-0 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.id}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-[19.4px] font-bold text-[#131600]">{item.id}</h4>
                    <div className="w-[23.3px] h-[27.1px] bg-[#F8F9FA] rounded-full flex items-center justify-center border border-gray-100">
                      <span className="w-[15.5px] h-[19.4px] bg-[#BCD225] block rounded-full"></span>
                    </div>
                  </div>
                  <div className="border-y border-black/5 py-3 grid grid-cols-2 gap-y-3 relative">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium text-[#6B7280] font-inter">Agent Name</span>
                      <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5 truncate">{item.agent}</span>
                    </div>
                    <div className="flex flex-col pl-4 border-l border-gray-100">
                      <span className="text-[12px] font-medium text-[#6B7280] font-inter">Area</span>
                      <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">{item.area}</span>
                    </div>
                    <div className="flex flex-col pt-2">
                      <span className="text-[12px] font-medium text-[#6B7280] font-inter">Total Amount</span>
                      <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">{item.amount}</span>
                    </div>
                    <div className="flex flex-col pl-4 pt-2 border-l border-gray-100">
                      <span className="text-[12px] font-medium text-[#6B7280] font-inter">Cost per Acre</span>
                      <span className="text-[14px] font-semibold text-[#0B2545] font-inter mt-0.5">{item.cost}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleViewDetails(item.id, item.agent, item.area, item.amount, item.cost, item.image)}
                  className="bg-[#2780C4] hover:bg-[#1f66a3] text-white font-medium text-[13.5px] py-2 px-5 rounded-full self-start transition-all cursor-pointer shadow-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spectacular Premium Land Details Modal Preview Overlay */}
      {selectedLand && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] overflow-hidden max-w-2xl w-full shadow-2xl border border-white/20 flex flex-col animate-in zoom-in-95 duration-300">
            {/* Modal Image Header */}
            <div className="relative h-64 w-full bg-gray-900">
              <img src={selectedLand.image} alt={selectedLand.id} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              <button
                onClick={() => setSelectedLand(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-3 py-1 bg-emerald-500/90 text-white font-medium text-[11px] rounded-full backdrop-blur-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Geospatial Verified
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white font-plus-jakarta">{selectedLand.id}</h2>
                </div>
                <div className="text-right">
                  <span className="text-[12px] text-white/80 block">Acquisition Value</span>
                  <span className="text-2xl font-bold text-white font-plus-jakarta">{selectedLand.amount}</span>
                </div>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-8 grid grid-cols-2 gap-6 bg-gray-50/50">
              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <UserCheck className="w-5 h-5 text-[#2780C4]" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider block font-medium">Assigned Officer</span>
                  <span className="text-[15px] font-semibold text-gray-900 block mt-0.5">{selectedLand.agent}</span>
                  <span className="text-[12px] text-emerald-600 font-medium mt-1 inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Clearance Active
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5 text-[#2780C4]" />
                </div>
                <div>
                  <span className="text-[11px] text-gray-500 uppercase tracking-wider block font-medium">Estate Dimension</span>
                  <span className="text-[15px] font-semibold text-gray-900 block mt-0.5">{selectedLand.area}</span>
                  <span className="text-[12px] text-gray-600 block mt-1">Rate: {selectedLand.cost} / Ac</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setSelectedLand(null)}
                className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full text-sm transition-colors cursor-pointer"
              >
                Close View
              </button>
              <button
                onClick={() => {
                  alert(`Accessing fully encrypted estate documentation registry for ${selectedLand.id}...`);
                  setSelectedLand(null);
                }}
                className="px-6 py-2.5 bg-[#2780C4] hover:bg-[#1f66a3] text-white font-medium rounded-full text-sm transition-colors cursor-pointer shadow-xs"
              >
                Access Documentation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedFarmlands;
