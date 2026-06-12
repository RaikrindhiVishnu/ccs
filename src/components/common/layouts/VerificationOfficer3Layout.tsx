import { Outlet, useNavigate, useLocation } from "react-router-dom";
import voLogo from "@/assets/vo-logo.svg";
import profileImg from "@/assets/profile.svg";
import { VERIFICATION_OFFICER_3_NAV_ITEMS } from "@/features/verification-officer-3/data/navigation";

export const VerificationOfficer3Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on current path
  const activeItem = VERIFICATION_OFFICER_3_NAV_ITEMS.find(item => location.pathname.includes(item.path))?.id || "dashboard";

  // Returns matching Tailwind absolute layout classes for the active sliding capsule pill
  const getActivePillClasses = () => {
    switch (activeItem) {
      case "dashboard":
        return "md:left-[clamp(-1.24rem,-1.04vw,-0.665rem)] md:w-[clamp(5.15rem,8.05vw,9.56rem)]";
      case "assigned":
        return "md:left-[clamp(7.375rem,11.52vw,13.69rem)] md:w-[clamp(4.75rem,7.43vw,8.81rem)]";
      case "in-progress-farmland":
        return "md:left-[clamp(14.35rem,22.43vw,26.66rem)] md:w-[clamp(9.5rem,14.86vw,17.66rem)]";
      case "completed-farmlands":
        return "md:left-[clamp(26.09rem,40.76vw,48.44rem)] md:w-[clamp(9.82rem,15.35vw,18.24rem)]";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-page)] flex flex-col font-sans pb-12">
      {/* Top Header Bar */}
      <header className="bg-[var(--surface-card)] mx-auto flex items-center justify-between shadow-[0px_0px_40px_rgba(0,0,0,0.12)] relative z-50 transition-all duration-300 w-[clamp(58.35rem,91.18vw,108.275rem)] h-[clamp(3.68rem,5.76vw,6.85rem)] mt-[clamp(1.25rem,1.94vw,2.31rem)] px-[clamp(1.06rem,1.67vw,2rem)] rounded-[clamp(0.7rem,1.11vw,1.31rem)]">
        {/* Logo Section */}
        <button
          onClick={() => navigate("/verification-officer-3/dashboard")}
          className="flex items-center justify-center border-none bg-transparent cursor-pointer select-none shrink-0 w-[clamp(4.53rem,7.08vw,8.41rem)] h-[clamp(2.18rem,3.4vw,4.04rem)]"
        >
          <img
            src={voLogo}
            alt="Green Land Capital"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Central Navigation Items */}
        <nav className="flex items-center gap-[1rem] md:gap-0 overflow-x-auto md:overflow-visible no-scrollbar max-w-[50%] md:max-w-none md:absolute md:left-[calc(50%-clamp(34.53rem,53.96vw,64.1rem)/2+clamp(1.73rem,2.71vw,3.22rem))] md:w-[clamp(34.53rem,53.96vw,64.1rem)] md:h-[clamp(1.78rem,2.78vw,3.3rem)] md:top-[clamp(0.975rem,1.53vw,1.81rem)]">
          {/* Active Sliding Background Pill */}
          <div
            className={`hidden md:block absolute h-full bg-[var(--btn-lime)] rounded-[clamp(0.89rem,1.39vw,1.65rem)] transition-all duration-300 ease-out z-0 ${getActivePillClasses()}`}
          />

          {/* Dashboard */}
          <button
            onClick={() => navigate("/verification-officer-3/dashboard")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.8125rem,1.25vw,1.5rem)] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[clamp(-0.41rem,-0.35vw,-0.22rem)] md:w-[clamp(4.31rem,6.74vw,8.0rem)] ${
              activeItem === "dashboard"
                ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
                : "bg-transparent text-black font-normal hover:opacity-75"
            }`}
          >
            Dashboard
          </button>

          {/* Assigned */}
          <button
            onClick={() => navigate("/verification-officer-3/assigned-farmlands")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.8125rem,1.25vw,1.5rem)] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[clamp(8.04rem,12.57vw,14.94rem)] md:w-[clamp(3.42rem,5.35vw,6.35rem)] ${
              activeItem === "assigned"
                ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
                : "bg-transparent text-black font-normal hover:opacity-75"
            }`}
          >
            Assigned
          </button>

          {/* In-Progress Farmland */}
          <button
            onClick={() => navigate("/verification-officer-3/in-progress-farmlands")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.8125rem,1.25vw,1.5rem)] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[clamp(15.02rem,23.47vw,27.87rem)] md:w-[clamp(8.18rem,12.78vw,15.17rem)] ${
              activeItem === "in-progress-farmland"
                ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
                : "bg-transparent text-black font-normal hover:opacity-75"
            }`}
          >
            In-Progress Farmland
          </button>

          {/* Completed Farmlands */}
          <button
            onClick={() => navigate("/verification-officer-3/completed-farmland")}
            className={`transition-all duration-300 cursor-pointer border-none font-sans shrink-0 flex items-center justify-center whitespace-nowrap h-full px-[0.625rem] md:px-0 text-[clamp(0.8125rem,1.25vw,1.5rem)] tracking-[-0.02em] font-sans md:absolute z-10 md:left-[clamp(26.75rem,41.8vw,49.67rem)] md:w-[clamp(8.49rem,13.26vw,15.75rem)] ${
              activeItem === "completed-farmlands"
                ? "text-black font-semibold bg-[var(--btn-lime)] md:bg-transparent rounded-[1.25rem] md:rounded-none"
                : "bg-transparent text-black font-normal hover:opacity-75"
            }`}
          >
            Completed Farmlands
          </button>
        </nav>

        {/* Right Action Section */}
        <div className="flex items-center shrink-0 w-[clamp(5.19rem,8.13vw,9.66rem)] h-[clamp(2.31rem,3.61vw,4.29rem)] gap-[clamp(0.58rem,0.9vw,1.08rem)]">
          {/* Bell Icon */}
          <button className="rounded-full bg-white flex items-center justify-center relative hover:bg-gray-50 transition-colors border-none cursor-pointer p-0 w-[clamp(2.31rem,3.61vw,4.29rem)] h-[clamp(2.31rem,3.61vw,4.29rem)]">
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
                stroke="#2C2C2C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="#2C2C2C"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Red Notification Dot */}
            <span
              className="absolute bg-[#EF4646] rounded-full"
              style={{
                width: "9.6%",
                height: "9.6%",
                left: "62.5%",
                top: "calc(50% - 12%)",
              }}
            />
          </button>

          {/* Avatar Profile */}
          <button className="rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center p-0 bg-white w-[clamp(2.31rem,3.61vw,4.29rem)] h-[clamp(2.31rem,3.61vw,4.29rem)]">
            <img
              src={profileImg}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto px-4 xl:px-0 flex-1 flex flex-col justify-start w-[clamp(58.35rem,91.18vw,108.275rem)] mt-[clamp(1.78rem,2.78vw,3.3rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default VerificationOfficer3Layout;
