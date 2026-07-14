import { Outlet, useNavigate, useLocation } from "react-router-dom";
import glcLogo from "@/assets/glc-logo.svg";
import iconNotification from "@/assets/Icon Notification (3).svg";
import profileImg from "@/assets/profile.svg";
import { REGIONAL_OFFICER_NAV_ITEMS } from "@/features/regional-officer/data/navigation";
import { useDispatch } from "react-redux";
import { logOut } from "@/features/auth/store/authSlice";

export const RegionalOfficerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  // Determine active item based on current path
  const activeItem = REGIONAL_OFFICER_NAV_ITEMS.find(item => location.pathname.includes(item.path))?.id || "dashboard";

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex flex-col font-plus-jakarta">
      {/* Premium Navigation Container */}
      <header className="nav-container">
        {/* Logo Section */}
        <div className="flex-none">
          <button
            onClick={() => navigate("/regional-officer/dashboard")}
            className="block border-none bg-transparent cursor-pointer"
          >
            <img
              src={glcLogo}
              alt="Green Land Capital"
              className="w-[135px] h-[66px] object-contain"
            />
          </button>
        </div>

        {/* Central Menu - Pill Navigation */}
        <nav className="nav-menu">
          {REGIONAL_OFFICER_NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`nav-item border-none bg-transparent ${isActive ? 'nav-item-active' : ''}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center gap-[15px] justify-self-end">
          <button className="relative flex items-center justify-center w-[37.5px] h-[37.5px] bg-white border border-[rgba(155,155,155,0.6)] rounded-full shrink-0 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            <img src={iconNotification} alt="Notifications" className="w-[12px] h-[15px]" />
            {/* Red Dot */}
            <div className="absolute top-[10px] right-[11px] w-[6px] h-[6px] bg-[#FF2D55] rounded-full"></div>
          </button>

          <div className="profile-container relative group cursor-pointer" onClick={handleLogout} title="Logout">
            <img src={profileImg} alt="Profile" className="profile-img" />
            <div className="absolute right-0 top-full mt-1 hidden group-hover:flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-md text-sm text-red-500 font-medium whitespace-nowrap z-50">
              Logout
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full px-6 pt-4 pb-12">
        <div className="w-[98%] w-full lg:max-w-[1800px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RegionalOfficerLayout;
