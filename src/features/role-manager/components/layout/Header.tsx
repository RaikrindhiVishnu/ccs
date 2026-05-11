import React from "react";
import bellIcon from "@/assets/bellicon.svg";

const Header: React.FC = () => {
  return (
    <div
      className="w-full h-[clamp(140px,18vh,190px)] rounded-[24px] relative overflow-hidden box-border shrink-0"
      style={{
        background: "linear-gradient(94.23deg, rgba(66, 143, 223, 0.07) -8.84%, #D3DDE2 51.66%, #D7EBF7 108.77%)"
      }}
    >
      {/* ── Background Blurs (Scaled) ── */}
      <div 
        className="absolute w-[clamp(80px,8vw,126px)] h-[clamp(80px,8vw,126px)] bg-[#F2FFDB] blur-[60px] rounded-full pointer-events-none z-0"
        style={{ left: "-37px", top: "70%" }} 
      />
      
      {/* Ellipse 67/68 (Wide blurs) */}
      <div 
        className="absolute w-[1657px] h-[23px] left-1/2 -translate-x-1/2 bg-[#F2FFDA] blur-[40px] pointer-events-none z-0"
        style={{ top: "284px" }}
      />
      <div 
        className="absolute w-[1657px] h-[16px] left-1/2 -translate-x-1/2 bg-[#F2FFDA] blur-[80px] pointer-events-none z-0"
        style={{ top: "291px" }}
      />

      {/* ── TOP NAV ROW: Dashboard label + Search + Bell ── */}
      <div className="absolute top-[20px] left-[26px] right-[26px] flex flex-row items-center justify-between z-10">
        {/* Dashboard label */}
        <div className="flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="1" width="6" height="6" rx="1" fill="var(--text-primary)" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="var(--text-primary)" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="var(--text-primary)" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="var(--text-primary)" />
          </svg>
          <span className="font-sans font-normal text-[12px] text-(--text-primary)">
            Dashboard
          </span>
        </div>

        {/* Search + Bell */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-4 bg-(--surface-card) rounded-full w-[200px] h-[34px] border border-(--border-soft) shadow-sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="font-sans text-[12px] text-(--text-muted) opacity-60">Search...</span>
          </div>

          <div className="w-[34px] h-[34px] bg-(--surface-card) rounded-full flex justify-center items-center cursor-pointer border border-(--border-soft) shadow-sm">
            <img src={bellIcon} alt="notification" className="w-5 h-5 opacity-70" />
          </div>
        </div>
      </div>

      {/* ── MAIN TEXT CONTENT ── */}
      <div className="absolute left-[clamp(16px,2vw,26px)] top-[clamp(50px,8vh,79px)] flex flex-col gap-[clamp(4px,0.8vh,8px)] z-10">
        <h1 className="font-sans font-medium text-[clamp(20px,3.5vh,36px)] leading-[120%] uppercase text-[#000000] m-0">
          Role Manager
        </h1>
        <p className="font-sans font-normal text-[clamp(11px,1.5vh,14px)] leading-[1.3] text-[#000000] m-0 opacity-60 max-w-[min(470px,60vw)]">
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>
    </div>
  );
};

export default Header;