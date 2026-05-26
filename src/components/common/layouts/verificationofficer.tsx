import { Outlet, useNavigate, useLocation } from "react-router-dom";
import glcLogo from "@/assets/glc-logo.svg";
import bellIcon from "@/assets/bellicon.svg";
import profileImg from "@/assets/profile.svg";
import { VERIFICATION_OFFICER_NAV_ITEMS } from "@/features/verification-officer/Data/navigation";

export const VerificationOfficerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on current path
  const activeItem = VERIFICATION_OFFICER_NAV_ITEMS.find(item => location.pathname.includes(item.path))?.id || "dashboard";

  return (
    <div className="min-h-screen bg-[#EBEBEB] flex flex-col font-plus-jakarta pb-12">
      
      {/* Top Header Bar */}
      <header className="bg-white rounded-[22px] w-full max-w-[1327px] h-[83px] mx-auto mt-10 px-8 flex items-center justify-between shadow-sm relative z-10">
        
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
        <nav className="flex items-center gap-[34px] absolute left-1/2 -translate-x-1/2">
          {VERIFICATION_OFFICER_NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`transition-all duration-300 h-[40px] flex items-center justify-center whitespace-nowrap ${
                  isActive 
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
            <img src={bellIcon} alt="Notifications" className="w-[26px] h-[28px]" />
            {/* Notification Dot */}
            <div className="absolute top-[12px] right-[14px] w-[6px] h-[6px] bg-[#EF4646] rounded-full border-[1.5px] border-white"></div>
          </button>

          <button className="w-[52px] h-[52px] rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
            <img src={profileImg} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-[1327px] mx-auto mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default VerificationOfficerLayout;
