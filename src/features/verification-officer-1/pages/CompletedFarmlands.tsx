import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Layers, Banknote, ShieldCheck } from 'lucide-react';
import { DashboardStatsRow } from '../components/DashboardStatsRow';

interface CompletedFarmland {
  id: string;
  location: string;
  agentName: string;
  agentAvatar: string;
  area: string;
  amount: string;
  verifiedTime: string;
  ownerName: string;
  ownerId: string;
  ownerAvatar: string;
  image: string;
}

// Completed farmlands data exactly matching the Figma mockup
const COMPLETED_DATA: CompletedFarmland[] = [
  {
    id: "GLC SOS 01",
    location: "Godavari District, AP",
    agentName: "Prakash Rao",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    area: "250 Acres",
    amount: "₹ 65.0 Lakhs",
    verifiedTime: "Verified: Today, 11:30 AM",
    ownerName: "Prakash Rao",
    ownerId: "GL-PR-092",
    ownerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 02",
    location: "Kurnool, AP",
    agentName: "Ram Varma",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    area: "100 Ac",
    amount: "₹ 25L",
    verifiedTime: "Verified: 6th Oct, 10:30 AM",
    ownerName: "Ram Varma",
    ownerId: "GL-RV-110",
    ownerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 03",
    location: "Anantapur, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 04",
    location: "Chittoor, AP",
    agentName: "Kiran Kumar",
    agentAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    area: "85 Ac",
    amount: "₹ 18L",
    verifiedTime: "Verified: 4th Oct, 09:45 AM",
    ownerName: "Kiran Kumar",
    ownerId: "GL-KK-391",
    ownerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 05",
    location: "Guntur, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 06",
    location: "Nellore, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "GLC SOS 07",
    location: "Kadapah, AP",
    agentName: "Anita Desai",
    agentAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    area: "120 Ac",
    amount: "₹ 32L",
    verifiedTime: "Verified: 5th Oct, 14:15 PM",
    ownerName: "Anita Desai",
    ownerId: "GL-AD-204",
    ownerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80",
  }
];

export const CompletedFarmlands = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState('GLC SOS 01');

  // Filter completed farmlands
  const filteredData = COMPLETED_DATA.filter(farmland => 
    farmland.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmland.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmland.agentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Active showcase item
  const showcaseItem = filteredData.find(item => item.id === selectedId) || filteredData[0];

  // Grid items (everything else matching search)
  const gridItems = filteredData.filter(item => item.id !== showcaseItem?.id);

  return (
    <div className="w-full flex flex-col gap-8 pt-[10px] animate-fadeIn pb-[40px] box-border">
      
      {/* 1. Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full gap-4 mt-2">
        <div className="flex flex-col gap-1">
          <h1 className="font-plus-jakarta font-extrabold text-[28px] md:text-[32px] tracking-tight text-[#1E1E1E]">
            VERIFICATION OFFICER DASHBOARD
          </h1>
          <p className="font-plus-jakarta font-semibold text-sm md:text-base text-[#5D6B6B]">
            Next-generation platform infrastructure for scaling sustainable estates.
          </p>
        </div>
        <div className="relative w-full lg:max-w-[340px]">
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-12 pr-5 rounded-full border border-[#D9DFE0] bg-white font-plus-jakarta text-sm text-[#1A1C1D] placeholder:text-[#5D6B6B]/60 focus:outline-none focus:ring-2 focus:ring-[#2780C4]/30 transition-all shadow-xs"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#5D6B6B]/60 w-5 h-5" />
        </div>
      </div>

      {/* 2. Metric stats Row */}
      <DashboardStatsRow />

      {/* 3. Section Title & Action button */}
      <div className="flex items-center justify-between w-full mt-4">
        <h2 className="font-plus-jakarta font-extrabold text-[20px] text-[#1E1E1E]">
          Completed Farmlands
        </h2>
        <button className="font-plus-jakarta font-bold text-sm text-[#1E1E1E] hover:opacity-75 bg-transparent border-none cursor-pointer flex items-center gap-1">
          View All
        </button>
      </div>

      {/* 4. Split Dashboard Grid (Showcase on Left, Smaller List on Right) */}
      {filteredData.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 w-full items-stretch">
          
          {/* A. Massive Showcase Card (Left Column) */}
          {showcaseItem && (
            <div className="w-full lg:w-[589.33px] shrink-0">
              <div 
                onClick={() => navigate(`/verification-officer-1/completed-farmland/${encodeURIComponent(showcaseItem.id)}`)}
                className="relative w-full h-[566px] rounded-[48px] overflow-hidden flex flex-col justify-between p-8 text-white shadow-sm border border-[#E5EAEB] box-border cursor-pointer hover:shadow-lg transition-all duration-300 z-10"
              >
                {/* Image background & overlay */}
                <img 
                  src={showcaseItem.image} 
                  alt={showcaseItem.location} 
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 z-10" />

                {/* Top Row content */}
                <div className="flex justify-between items-start w-full z-20">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#E2E8F0] tracking-wider uppercase">
                      PREMIUM ESTATE
                    </span>
                    <h3 className="font-plus-jakarta font-black text-[38px] text-white leading-tight mt-1 select-none">
                      {showcaseItem.id.replace(/\s+/g, '')}
                    </h3>
                    <div className="flex items-center gap-1 text-[#E2E8F0]/90 mt-1">
                      <MapPin size={13} className="text-[#38BDF8]" />
                      <span className="font-semibold text-[13px]">{showcaseItem.location}</span>
                    </div>
                  </div>

                  {/* Verification Circle Badge */}
                  <div className="flex flex-col items-center">
                    <div className="w-[72px] h-[72px] rounded-full bg-[#BDD327] flex items-center justify-center shadow-lg border border-[#A7BC1E]/30">
                      <svg 
                        width="30" 
                        height="30" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="#1E293B" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                      </svg>
                    </div>
                    <div className="bg-black/90 border border-white/10 px-3.5 py-0.5 rounded-full text-[8px] font-extrabold tracking-widest mt-2 shadow-sm text-center uppercase text-white">
                      VERIFIED
                    </div>
                  </div>
                </div>

                {/* Bottom Overlay Glassmorphic Panels */}
                <div className="grid grid-cols-12 gap-3.5 w-full z-20">
                  
                  {/* Left: Owner details card */}
                  <div className="col-span-7 backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-[24px] flex flex-col justify-between box-border min-h-[148px]">
                    <span className="text-white/60 text-[9px] tracking-wider font-bold uppercase block">
                      OWNER DETAILS
                    </span>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="relative w-12 h-12 rounded-full border border-white/20 shrink-0 bg-white/15 overflow-hidden">
                        <img 
                          src={showcaseItem.ownerAvatar} 
                          alt={showcaseItem.ownerName} 
                          className="w-full h-full object-cover"
                        />
                        {/* Green Verified Dot Checkmark */}
                        <div className="absolute bottom-0 right-0 bg-[#10B981] w-4.5 h-4.5 rounded-full border border-white flex items-center justify-center text-white scale-90">
                          <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-plus-jakarta font-extrabold text-sm text-white">
                          {showcaseItem.ownerName}
                        </span>
                        <span className="font-plus-jakarta font-semibold text-[10px] text-white/70">
                          {showcaseItem.ownerId}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Area & Valuation details card */}
                  <div className="col-span-5 flex flex-col gap-2.5">
                    
                    {/* Cultivable Area Box */}
                    <div className="backdrop-blur-md bg-white/10 border border-white/15 px-4 py-3 rounded-[20px] flex items-center justify-between box-border">
                      <div className="flex flex-col">
                        <span className="text-white/60 text-[8px] tracking-wider font-bold uppercase">
                          CULTIVABLE AREA
                        </span>
                        <span className="font-plus-jakarta font-black text-[13px] text-white mt-0.5">
                          {showcaseItem.area}
                        </span>
                      </div>
                      <Layers size={15} className="text-white/80 shrink-0" />
                    </div>

                    {/* Current Valuation Box */}
                    <div className="backdrop-blur-md bg-white/10 border border-white/15 px-4 py-3 rounded-[20px] flex items-center justify-between box-border">
                      <div className="flex flex-col">
                        <span className="text-white/60 text-[8px] tracking-wider font-bold uppercase">
                          CURRENT VALUATION
                        </span>
                        <span className="font-plus-jakarta font-black text-[13px] text-white mt-0.5">
                          {showcaseItem.amount}
                        </span>
                      </div>
                      <Banknote size={15} className="text-white/80 shrink-0" />
                    </div>

                  </div>

                </div>

              </div>
            </div>
          )}

          {/* B. Horizontal Scrolling Grid (2 Rows) of Smaller Cards (Right Column) */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden no-scrollbar select-none self-start">
            <div className="grid grid-rows-2 grid-flow-col gap-8 min-w-max h-[566px] pb-2">
              {gridItems.map((farmland) => (
                <div 
                  key={farmland.id}
                  onClick={() => setSelectedId(farmland.id)}
                  className="w-[278.89px] h-[267px] bg-white border border-[#E5EAEB] hover:border-slate-300 hover:shadow-md transition-all duration-300 flex flex-col p-6 rounded-[28px] relative overflow-hidden cursor-pointer box-border group justify-between flex-shrink-0"
                >
                  
                  {/* Small Card Header */}
                  <div className="flex items-center justify-between w-full">
                    <span className="font-plus-jakarta font-extrabold text-sm text-[#0F172A] leading-tight group-hover:text-[#2780C4] transition-colors">
                      {farmland.id.replace(/\s+/g, '')}
                    </span>
                    
                    {/* Verified Check icon */}
                    <ShieldCheck size={16} className="text-[#3B82F6] shrink-0" fill="#EFF6FF" />
                  </div>
 
                  {/* Field Agent Avatar & Name */}
                  <div className="flex items-center gap-2">
                    <div className="w-5.5 h-5.5 rounded-full overflow-hidden border border-[#ECECEC] shrink-0 bg-gray-50">
                      <img 
                        src={farmland.agentAvatar} 
                        alt={farmland.agentName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-plus-jakarta font-semibold text-[11px] text-[#5D6B6B]">
                      {farmland.agentName}
                    </span>
                  </div>
 
                  {/* Grid stats (Area & Amount) */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#8E9D9D] text-[8px] font-bold uppercase tracking-wider">
                        AREA
                      </span>
                      <span className="font-plus-jakarta font-extrabold text-[12px] text-[#1E1E1E]">
                        {farmland.area}
                      </span>
                    </div>
 
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[#8E9D9D] text-[8px] font-bold uppercase tracking-wider">
                        AMOUNT
                      </span>
                      <span className="font-plus-jakarta font-extrabold text-[12px] text-[#1E1E1E]">
                        {farmland.amount}
                      </span>
                    </div>
                  </div>
 
                  {/* Footer Time & View Details Button */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <span className="font-plus-jakarta font-semibold text-[8px] text-[#8E9D9D] tracking-wide">
                      {farmland.verifiedTime}
                    </span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/verification-officer-1/completed-farmland/${encodeURIComponent(farmland.id)}`);
                      }}
                      className="w-full h-9 bg-white border border-[#2780C4] hover:bg-[#2780C4]/5 text-[#2780C4] font-plus-jakarta font-extrabold text-[10px] tracking-wider rounded-full cursor-pointer transition-colors flex items-center justify-center"
                    >
                      VIEW DETAILS
                    </button>
                  </div>
 
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        <div className="col-span-full bg-white border border-[#EBEBEB] rounded-[24px] p-12 text-center text-[#5D6B6B] font-plus-jakarta mt-4">
          No completed farmlands match your search.
        </div>
      )}

    </div>
  );
};

export default CompletedFarmlands;
