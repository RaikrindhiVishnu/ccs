import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import voLogo from "@/assets/vo-logo.svg";
import profileImg from "@/assets/profile.svg";
import { VERIFICATION_OFFICER_3_NAV_ITEMS } from "@/features/verification-officer-3/data/navigation";
import { NotificationsDropdown } from "@/components/ui/NotificationsDropdown";


export const VerificationOfficer3Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  // Determine active item based on current path
  const activeItem = VERIFICATION_OFFICER_3_NAV_ITEMS.find(item => location.pathname.includes(item.path))?.id || "dashboard";

  // Returns matching Tailwind absolute layout classes for the active sliding capsule pill
  const getActivePillClasses = () => {
    switch (activeItem) {
      case "dashboard":
        return "md:left-[-2.15%] md:w-[15.49%]";
      case "assigned":
        return "md:left-[21.8%] md:w-[12.91%]";
      case "in-progress-farmland":
        return "md:left-[42.0%] md:w-[26.68%]";
      case "completed-farmlands":
        return "md:left-[75.96%] md:w-[27.57%]";
      default:
        return "";
    }
  };

  const bgClass = activeItem === "dashboard" ? "bg-[var(--surface-card)]" : "bg-[#F9F9FB]";

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col font-sans pb-12`}>
      {/* Top Header Bar */}
      <header className="bg-[var(--surface-card)] mx-auto flex items-center justify-between shadow-[0px_0px_40px_rgba(0,0,0,0.12)] relative z-50 transition-all duration-300 w-[clamp(43.7625rem,91.18%,180.0rem)] h-[clamp(2.76rem,5.76vw,10.0rem)] mt-[clamp(0.9375rem,1.94vw,4.5rem)] px-[clamp(0.795rem,1.67vw,3.5rem)] rounded-[clamp(0.525rem,1.11vw,2.5rem)]">
        {/* Logo Section */}
        <button
          onClick={() => navigate("/verification-officer-3/dashboard")}
          className="flex items-center justify-center border-none bg-transparent cursor-pointer select-none shrink-0 w-[clamp(3.3975rem,7.76%,15.0rem)] h-[clamp(1.635rem,3.4vw,6.0rem)]"
        >
          <img
            src={voLogo}
            alt="Green Land Capital"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Central Navigation Items */}
        <nav className="flex items-center gap-[1rem] md:gap-0 overflow-x-auto md:overflow-visible no-scrollbar max-w-[50%] md:max-w-none md:absolute md:left-[calc(50%-clamp(25.8975rem,59.18%,100.0rem)/2+clamp(1.2975rem,2.97%,6.0rem))] md:w-[clamp(25.8975rem,59.18%,100.0rem)] md:h-[clamp(1.335rem,2.78vw,5.0rem)] md:top-[clamp(0.7312rem,1.53vw,3.0rem)]">
          {/* Active Sliding Background Pill */}
          <div
            className={`hidden md:block absolute h-full bg-[var(--btn-lime)] rounded-[1.25rem] transition-all duration-300 ease-out z-0 ${getActivePillClasses()}`}
          />

          {/* Dashboard */}
          <button
            onClick={() => navigate("/verification-officer-3/dashboard")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.6094rem,1.25vw,1.5rem)] [@media(min-width:1900px)]:text-[1.5rem] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[-0.65%] md:w-[12.49%] ${activeItem === "dashboard"
              ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
              : "bg-transparent text-black font-normal hover:opacity-75"
              }`}
          >
            Dashboard
          </button>

          {/* Assigned */}
          <button
            onClick={() => navigate("/verification-officer-3/assigned-farmlands")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.6094rem,1.25vw,1.5rem)] [@media(min-width:1900px)]:text-[1.5rem] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[23.3%] md:w-[9.91%] ${activeItem === "assigned"
              ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
              : "bg-transparent text-black font-normal hover:opacity-75"
              }`}
          >
            Assigned
          </button>

          {/* In-Progress Farmland */}
          <button
            onClick={() => navigate("/verification-officer-3/in-progress-farmlands")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.6094rem,1.25vw,1.5rem)] [@media(min-width:1900px)]:text-[1.5rem] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[43.5%] md:w-[23.68%] ${activeItem === "in-progress-farmland"
              ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
              : "bg-transparent text-black font-normal hover:opacity-75"
              }`}
          >
            In-Progress Farmland
          </button>

          {/* Completed Farmlands */}
          <button
            onClick={() => navigate("/verification-officer-3/completed-farmland")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.6094rem,1.25vw,1.5rem)] [@media(min-width:1900px)]:text-[1.5rem] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[77.46%] md:w-[24.57%] ${activeItem === "completed-farmlands"
              ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
              : "bg-transparent text-black font-normal hover:opacity-75"
              }`}
          >
            Completed Farmlands
          </button>
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center shrink-0 w-[clamp(3.8925rem,8.92%,15.0rem)] h-[clamp(1.7325rem,3.61vw,6.0rem)] gap-[clamp(0.435rem,0.81vw,2.0rem)]">
          {/* Bell Container */}
          <div className="relative flex items-center justify-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotifications((prev) => !prev);
              }}
              className={`rounded-full flex items-center justify-center relative transition-colors border-none cursor-pointer p-0 w-[clamp(1.7325rem,3.61vw,6.0rem)] h-[clamp(1.7325rem,3.61vw,6.0rem)] ${showNotifications ? "bg-[#BDD327] hover:bg-[#a8bd21]" : "bg-white hover:bg-gray-50"
                }`}
              aria-label="Notifications"
            >
              {/* Bell SVG */}
              <svg
                width="50%"
                height="50%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
              >
                <path
                  d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                  stroke={showNotifications ? "#FFFFFF" : "#2C2C2C"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.73 21a2 2 0 0 1-3.46 0"
                  stroke={showNotifications ? "#FFFFFF" : "#2C2C2C"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Red Notification Dot */}
              {!showNotifications && (
                <span
                  className="absolute bg-[#EF4646] rounded-full"
                  style={{
                    width: "9.6%",
                    height: "9.6%",
                    left: "62.5%",
                    top: "calc(50% - 12%)",
                  }}
                />
              )}
            </button>

            {showNotifications && (
              <NotificationsDropdown onClose={() => setShowNotifications(false)} />
            )}
          </div>

          {/* Avatar Profile */}
          <button
            onClick={() => navigate("/verification-officer-3/profile")}
            className="rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center p-0 bg-white w-[clamp(1.7325rem,3.61vw,6.0rem)] h-[clamp(1.7325rem,3.61vw,6.0rem)]"
          >
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto px-4 xl:px-0 flex-1 flex flex-col justify-start w-[clamp(43.7625rem,91.18%,180.0rem)] mt-[clamp(1.335rem,2.78vw,5.0rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default VerificationOfficer3Layout;
