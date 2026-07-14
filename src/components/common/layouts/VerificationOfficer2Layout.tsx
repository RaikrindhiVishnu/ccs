import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import glcLogo from "@/assets/glc-logo.svg";
import profileImg from "@/assets/profile.svg";
import { VERIFICATION_OFFICER_NAV_ITEMS } from "@/features/verification-officer-2/Data/navigation";
import { NotificationDropdown } from "@/features/verification-officer-2/components/NotificationDropdown";

export const VerificationOfficer2Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Determine active item based on current path
  const activeItem = VERIFICATION_OFFICER_NAV_ITEMS.find(item => location.pathname.includes(item.path))?.id || "dashboard";

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex flex-col font-plus-jakarta pb-12 overflow-x-hidden">

      {/* Top Header Bar */}
      <header className="bg-white rounded-[22px] w-[95%] lg:w-[98%] xl:w-[calc(100%-114px)] h-auto min-h-[60px] md:min-h-[70px] lg:min-h-[83px] py-2 md:py-3 lg:py-4 mx-auto mt-4 md:mt-8 lg:mt-10 px-2 md:px-4 lg:px-8 flex flex-row items-center justify-between shadow-sm relative z-50 gap-1 md:gap-2 xl:gap-0">

        {/* Logo Section */}
        <button
          onClick={() => navigate("/verification-officer/dashboard")}
          className="flex items-center justify-center border-none bg-transparent cursor-pointer shrink-0"
        >
          <img
            src={glcLogo}
            alt="Green Land Capital"
            className="w-[70px] md:w-[90px] lg:w-[120.5px] h-auto object-contain"
          />
        </button>

        {/* Central Navigation Items */}
        <nav className="flex-1 min-w-0 flex items-center justify-center gap-[4px] md:gap-[8px] xl:gap-[34px] overflow-hidden px-1">
          {VERIFICATION_OFFICER_NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`transition-all duration-300 h-[32px] md:h-[36px] xl:h-[40px] flex items-center justify-center whitespace-nowrap shrink-1 min-w-0 ${isActive
                  ? 'bg-[#BDD327] rounded-[20px] px-2 md:px-3 xl:px-4 text-[#000000] font-medium text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] leading-[20px] truncate'
                  : 'bg-transparent text-[#000000] font-normal text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] leading-[20px] hover:opacity-70 truncate'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center gap-[6px] md:gap-[10px] xl:gap-[13px] shrink-0 relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] xl:w-[52px] xl:h-[52px] rounded-full flex items-center justify-center relative hover:bg-gray-50 transition-colors"
          >
            {/* Bell SVG — clean Lucide-style, 22×22 */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2C2C2C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] h-[18px] md:w-[20px] md:h-[20px] xl:w-[22px] xl:h-[22px]"
            >
              {/* Bell body */}
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              {/* Clapper */}
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Single red notification dot */}
            <span className="absolute top-[6px] right-[8px] xl:top-[10px] xl:right-[10px] w-[6px] h-[6px] xl:w-[8px] xl:h-[8px] bg-[#EF4646] rounded-full border-[1.5px] border-white" />
          </button>

          <button className="w-[36px] h-[36px] md:w-[42px] md:h-[42px] xl:w-[52px] xl:h-[52px] rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          </button>
          
          <NotificationDropdown isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-[95%] lg:w-[98%] xl:w-[calc(100%-114px)] mx-auto mt-8 relative z-0">
        <Outlet />
      </main>
    </div>
  );
};

export default VerificationOfficer2Layout;
