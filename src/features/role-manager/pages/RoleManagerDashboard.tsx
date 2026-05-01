import React from "react";
import { LayoutGrid, Search } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import bellIcon from "@/assets/bellicon.svg";
import AgentOnboardingVelocity from "@/pages/Dashboard/AgentOnboardingVelocity";
import RegionCreationVelocity from "@/pages/Dashboard/RegionCreationVelocity";
import WorkforceStructure from "@/pages/Dashboard/WorkforceStructure";
import RegionalCreationTargetVsActual from "@/pages/Dashboard/RegionalCreationTargetVsActual";

// ─── Local Header Component (Copied for independence) ──────────────────────────
const RoleManagerHeader: React.FC = () => {
  return (
    <div
      className="w-full rounded-[clamp(12px,1.67vw,24px)] relative overflow-hidden box-border shrink-0 p-[clamp(12px,1.81vw,26px)] flex flex-col "
      style={{ background: 'var(--header-gradient)' }}
    >
      {/* ROW 1: Dashboard label + Search + Bell */}
      <div className="flex flex-row items-center justify-between z-10 w-full">
        <div className="flex items-center gap-[clamp(2px,0.35vw,5px)]">
          <LayoutGrid 
            size={16} 
            strokeWidth={2} 
            className="text-[var(--foreground)]"
          />
          <Typography variant="span" className="font-inter font-normal text-sm text-[var(--foreground)]">Dashboard</Typography>
        </div>

        <div className="flex items-center shrink-0">
          {/* Search Input — White Variant */}
          <Input 
            variant="white"
            placeholder="Search..."
            containerClassName="w-80 h-full"
            className="text-xs px-8"
            icon={<Search size={14} className="text-[var(--muted)]" />}
          />

          {/* Bell Icon — Matching Height */}
          <div className=" aspect-square bg-[var(--card)] rounded-full flex justify-center items-center cursor-pointer shrink-0 overflow-hidden border border-[var(--input-border)] ml-4">
            <img src={bellIcon} alt="notification" className=" h-10 object-contain" />
          </div>
        </div>
      </div>

      {/* Title + Subtitle */}
      <div className="flex flex-col items-start gap-[clamp(4px,0.78vh,8px)] z-10">
        <Typography 
          variant="p" 
          className="font-inter font-medium text-4xl leading-[120%] uppercase text-[var(--foreground)] m-0 whitespace-nowrap tracking-normal"
        >
          Role Manager
        </Typography>
        <Typography 
          variant="p" 
          className="font-normal text-sm text-[var(--muted)] m-0 whitespace-nowrap"
        >
          Next-generation platform infrastructure for scaling sustainable estates.
        </Typography>
      </div>
    </div>
  );
};

// ─── Main Dashboard Component ──────────────────────────────────────────────────
const RoleManagerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col p-[clamp(6px,0.83vw,12px)] gap-[clamp(6px,0.83vw,12px)] box-border overflow-hidden h-full">
      {/* Header section */}
      <div className="shrink-0">
        <RoleManagerHeader />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-[clamp(6px,0.83vw,12px)] flex-1 min-h-0 box-border">
        {/* Left Column */}
        <div className="flex flex-col gap-[clamp(6px,0.83vw,12px)] min-w-0 min-h-0 overflow-hidden">
          <AgentOnboardingVelocity />
          <RegionCreationVelocity />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[clamp(6px,0.83vw,12px)] min-w-0 min-h-0 overflow-hidden">
          <div className="flex-[40] min-h-0 flex">
            <WorkforceStructure />
          </div>
          <div className="flex-[60] min-h-0 flex">
            <RegionalCreationTargetVsActual />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagerDashboard;
