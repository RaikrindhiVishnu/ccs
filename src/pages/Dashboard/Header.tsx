import React from "react";
import bellIcon from "@/assets/bellicon.svg";

const Header: React.FC = () => {
  return (
    <div
      className="w-full h-[18.55vh] bg-[var(--header-gradient)] rounded-[clamp(12px,1.67vw,24px)] relative overflow-hidden box-border shrink-0"
    >
      {/* Ellipse 72 — green blur left */}
      <div
        className="absolute w-[clamp(60px,8.75vw,126px)] h-[clamp(60px,8.75vw,126px)] left-[clamp(-20px,-2.57vw,-37px)] top-[clamp(150px,30.76vh,315px)] bg-[#F2FFDB] blur-[80px] rounded-full pointer-events-none z-0"
      />

      {/* Ellipse 67 — wide yellow blur top */}
      <div
        className="absolute w-full h-[clamp(10px,2.25vh,23px)] left-0 top-[clamp(140px,27.73vh,284px)] bg-[#F2FFDA] blur-[40px] pointer-events-none z-0"
      />

      {/* Ellipse 68 — wide yellow blur bottom */}
      <div
        className="absolute w-full h-[clamp(8px,1.56vh,16px)] left-0 top-[clamp(145px,28.42vh,291px)] bg-[#F2FFDA] blur-[80px] pointer-events-none z-0"
      />

      {/* ── ROW 1: Dashboard label + Search + Bell ── */}
      <div
        className="absolute top-[clamp(8px,1.95vh,20px)] left-[clamp(12px,1.81vw,26px)] right-[clamp(12px,1.81vw,26px)] flex flex-row items-center justify-between z-10"
      >
        {/* Dashboard label */}
        <div className="flex items-center gap-[clamp(2px,0.35vw,5px)]">
          <svg
            width="clamp(8px,0.9vw,13px)"
            height="clamp(8px,0.9vw,13px)"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect x="1" y="1" width="6" height="6" rx="1" fill="var(--foreground)" />
            <rect x="9" y="1" width="6" height="6" rx="1" fill="var(--foreground)" />
            <rect x="1" y="9" width="6" height="6" rx="1" fill="var(--foreground)" />
            <rect x="9" y="9" width="6" height="6" rx="1" fill="var(--foreground)" />
          </svg>
          <span className="font-inter font-normal text-[clamp(8px,1.17vh,12px)] text-[var(--foreground)]">
            Dashboard
          </span>
        </div>

        {/* Search + Bell */}
        <div className="flex items-center gap-[clamp(3px,0.56vw,8px)] shrink-0">
          {/* Search pill */}
          <div
            className="flex items-center gap-[clamp(3px,0.4vw,6px)] px-[clamp(8px,1.11vw,16px)] py-0 bg-[var(--card)] rounded-[clamp(20px,4vw,60px)] w-[clamp(80px,13.89vw,200px)] h-[clamp(18px,3.32vh,34px)] box-border"
          >
            <svg
              width="clamp(8px,0.9vw,14px)"
              height="clamp(8px,0.9vw,14px)"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
              <path d="M16.5 16.5L21 21" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="font-inter text-[clamp(8px,1.17vh,12px)] text-[var(--muted)] whitespace-nowrap">
              Search...
            </span>
          </div>

          {/* Bell */}
          <div
            className="w-[clamp(18px,3.32vh,34px)] h-[clamp(18px,3.32vh,34px)] bg-[var(--card)] rounded-full flex justify-center items-center cursor-pointer shrink-0 overflow-hidden"
          >
            <img
              src={bellIcon}
              alt="notification"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* ── Title + Subtitle ── */}
      <div
        className="absolute left-[clamp(12px,1.81vw,26px)] top-[clamp(40px,7.71vh,79px)] flex flex-col items-start gap-[clamp(4px,0.78vh,8px)] z-10"
      >
        <h1 className="font-inter font-medium text-[clamp(14px,3.52vh,36px)] leading-[120%] uppercase text-[var(--foreground)] m-0 whitespace-nowrap">
          Role Manager
        </h1>

        <p className="font-inter font-normal text-[clamp(7px,1.37vh,14px)] leading-[18px] text-[var(--muted)] m-0 whitespace-nowrap">
          Next-generation platform infrastructure for scaling sustainable estates.
        </p>
      </div>
    </div>
  );
};

export default Header;