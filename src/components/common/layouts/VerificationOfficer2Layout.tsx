import { Outlet, useNavigate, useLocation } from "react-router-dom";
import glcLogo from "@/assets/glc-logo.svg";
import profileImg from "@/assets/profile.svg";
import { VERIFICATION_OFFICER_NAV_ITEMS } from "@/features/verification-officer-2/Data/navigation";

export const VerificationOfficer2Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on current path
  const activeItem = VERIFICATION_OFFICER_NAV_ITEMS.find(item => location.pathname.includes(item.path))?.id || "dashboard";

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex flex-col font-plus-jakarta pb-12">

      {/* Top Header Bar */}
      <header className="bg-white rounded-[22px] w-full max-w-[1327px] h-auto min-h-[83px] py-4 mx-auto mt-4 md:mt-10 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between shadow-sm relative z-10 gap-4 md:gap-0">

        {/* Logo Section */}
        <button
          onClick={() => navigate("/verification-officer/dashboard")}
          className="flex items-center justify-center border-none bg-transparent cursor-pointer ml-4"
        >
          <img
            src={glcLogo}
            alt="Green Land Capital"
            className="w-[120.5px] h-[58.24px] object-contain"
          />
        </button>

        {/* Central Navigation Items */}
        <nav className="flex items-center gap-[10px] md:gap-[34px] md:absolute md:left-1/2 md:-translate-x-1/2 overflow-x-auto max-w-full no-scrollbar pb-2 md:pb-0">
          {VERIFICATION_OFFICER_NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`transition-all duration-300 h-[40px] flex items-center justify-center whitespace-nowrap ${isActive
                    ? 'bg-[#BDD327] rounded-[20px] px-4 text-[#000000] font-normal text-[16px] leading-[20px]'
                    : 'bg-transparent text-[#000000] font-normal text-[16px] leading-[20px] hover:opacity-70'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center gap-[13px] mr-2">
          <button className="w-[52px] h-[52px] rounded-full flex items-center justify-center relative hover:bg-gray-50 transition-colors">
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
            >
              {/* Bell body */}
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              {/* Clapper */}
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {/* Single red notification dot */}
            <span className="absolute top-[10px] right-[10px] w-[8px] h-[8px] bg-[#EF4646] rounded-full border-[1.5px] border-white" />
          </button>

          <button className="w-[52px] h-[52px] rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[1327px] mx-auto mt-8 px-4 md:px-0">
        <Outlet />
      </main>
    </div>
  );
};

export default VerificationOfficer2Layout;
