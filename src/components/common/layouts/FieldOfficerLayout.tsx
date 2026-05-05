import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import glcLogo from "../../../assets/glc-logo.svg";
import bellIcon from "../../../assets/bellicon.svg";
import profileImg from "../../../assets/profile.svg";
import farmlandIcon from "../../../assets/farmland.svg"; 
import draftsIcon from "../../../assets/alerts.svg";
import requestInfoIcon from "../../../assets/requestinfo.svg";
import farmlandAlertIcon from "../../../assets/farmlandalert.svg";

const NAV_ITEMS = [
  { id: "farmlands", label: "Farmlands", icon: farmlandIcon, width: "162px" },
  { id: "drafts", label: "Drafts", icon: draftsIcon, width: "121px" },
  { id: "request-info", label: "Request info", icon: requestInfoIcon, width: "175px" },
  { id: "farmland-alerts", label: "Farmland Alerts", icon: farmlandAlertIcon, width: "203px" },
];

export const FieldOfficerLayout = () => {
  const [active, setActive] = useState("farmlands");

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header Section - Responsive Navigation */}
      <header className="w-full h-[80px] bg-white border-b border-gray-100 z-10 flex items-center">
        <div className="w-full h-full flex items-center justify-between px-[4vw]">
          
          {/* Logo */}
          <div className="w-[120px] h-[58px] flex-none">
            <a href="/">
              <img src={glcLogo} alt="Green Land Capital" className="w-full h-full object-contain" />
            </a>
          </div>

          {/* Center Navigation - Flexible Pills */}
          <nav className="hidden lg:flex items-center gap-[1vw]">
            {NAV_ITEMS.map((item) => {
              const IsActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`flex items-center h-[56px] px-[1vw] rounded-full transition-all duration-300 border-none cursor-pointer ${IsActive ? 'bg-[#1C5F9D]' : 'bg-white'}`}
                  style={{ minWidth: `calc(${item.width} * 0.8)` }}
                >
                  <div className={`flex items-center justify-center w-[36px] h-[36px] rounded-full ${IsActive ? 'bg-white' : 'bg-transparent'}`}>
                    <img src={item.icon} alt="" className="w-4 h-4" />
                  </div>
                  <span className={`ml-2 font-plus-jakarta font-medium text-[clamp(14px,1.1vw,18px)] ${IsActive ? 'text-white' : 'text-black'} whitespace-nowrap`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions Section */}
          <div className="flex items-center gap-[1.5vw]">
            <button className="flex items-center justify-center w-[52px] h-[52px] bg-white border border-gray-100 rounded-full relative cursor-pointer hover:bg-gray-50 transition-colors">
              <img src={bellIcon} alt="Notifications" className="w-8 h-8" />
            </button>
            
            <div className="w-[52px] h-[52px] rounded-full overflow-hidden border border-gray-100 shadow-sm">
              <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container - Responsive layout below the header */}
      <div className="flex-1 w-full bg-[#F9F9F9] flex flex-col relative">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
