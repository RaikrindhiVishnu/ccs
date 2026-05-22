import { useState } from "react";
import DashboardStatsSection from "../components/common/DashboardStatsSection";
import TopPerformersSection from "../components/common/TopPerformersSection";
import SearchBar from "../components/common/SearchBar";
import AddFarmlandButton from "../components/common/AddFarmlandButton";
import FarmlandsTable from "../components/tables/FarmlandsTable";
import icons from "../../../assets/dashboard/icons.png";

export default function FieldOfficerDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col gap-[clamp(1rem,3vh,2rem)] pb-10 mt-4">
      {!isExpanded ? (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 w-full items-stretch">
            {/* Left Column: Stats + Search/Add */}
            <div className="xl:col-span-7 flex flex-col gap-[clamp(1rem,3vh,2rem)] justify-between">
              <DashboardStatsSection />
              
              <div className="flex flex-col md:flex-row items-center gap-6 w-full">
                <SearchBar />
                <AddFarmlandButton />
              </div>
            </div>

            {/* Right Column: Top Performers */}
            <div className="xl:col-span-5 flex flex-col h-full">
              <TopPerformersSection />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mt-2">
          <h2 className="text-[#1A1C1D] text-[2rem] font-bold">Farmlands</h2>
          
          <div className="flex items-center gap-4 w-full md:w-auto flex-1 md:max-w-2xl justify-end">
            <div className="flex-1 max-w-[500px] bg-white h-[52px] rounded-full px-6 flex items-center gap-3 shadow-sm border border-transparent focus-within:border-[#96C9ED] transition-all">
              <img src={icons} className="w-5 h-5 opacity-60 flex-none" style={{ objectPosition: '0% 0%', objectFit: 'cover' }} alt="search" />
              <input type="text" placeholder="Search Agents..." className="flex-1 bg-transparent outline-none text-[16px] w-full min-w-0" />
            </div>
            
            <button className="bg-white border border-gray-200 h-[52px] px-6 rounded-full flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-all font-medium text-[#3D4949]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Project Status
            </button>
          </div>
        </div>
      )}

      <FarmlandsTable isExpanded={isExpanded} onViewMore={() => setIsExpanded(true)} />
    </div>
  );
}
