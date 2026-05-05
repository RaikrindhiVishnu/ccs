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
      className="w-full rounded-[clamp(12px,1.67vw,24px)] relative overflow-hidden box-border shrink-0 p-[clamp(12px,1.81vw,26px)] flex flex-col gap-4"
      style={{ background: 'var(--header-gradient)' }}
    >
      {/* ROW 1: Dashboard label + Search + Bell */}
      <div className="flex flex-row items-center justify-between z-10 w-full">
        <div className="flex items-center gap-[clamp(2px,0.35vw,5px)]">
          <LayoutGrid size={16} strokeWidth={2} className="text-[var(--foreground)]" />
          <Typography variant="span" className="font-inter font-normal text-sm text-[var(--foreground)]">Dashboard</Typography>
        </div>

        <div className="flex items-center gap-4 shrink-0 h-[clamp(36px,3vh,44px)]">
          {/* Search Input — White Variant */}
          <Input 
            variant="white"
            placeholder="Search..."
            containerClassName="w-80 h-full"
            className="text-xs px-8"
            icon={<Search size={14} className="text-[var(--muted)]" />}
          />

          {/* Bell Icon — Matching Height */}
          <div className="h-10 aspect-square bg-[var(--card)] rounded-full flex justify-center items-center cursor-pointer shrink-0 overflow-hidden border border-[var(--input-border)]">
            <img src={bellIcon} alt="notification" className="w-[60%] h-[60%] object-contain" />
          </div>
        </div>
      </div>

      {/* Title + Subtitle */}
      <div className="flex flex-col items-start gap-1 z-10">
        <Typography 
          variant="p" 
          className="font-inter font-medium text-4xl leading-[110%] uppercase text-[var(--foreground)] m-0 whitespace-nowrap tracking-tighter"
        >
          Role Manager
        </Typography>
        <Typography 
          variant="p" 
          className="font-normal text-sm text-[var(--muted)] m-0 whitespace-nowrap opacity-70"
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
    <div className="flex flex-col p-[clamp(6px,0.83vw,12px)] gap-[clamp(12px,1.5vw,24px)] box-border min-h-full">
      {/* Header section */}
      <div className="shrink-0">
        <RoleManagerHeader />
      </div>

      {/* Charts Grid — Automatic Height, No Squashing */}
      <div className="grid grid-cols-2 gap-[clamp(12px,1.5vw,24px)] box-border">
        {/* Left Column */}
        <div className="flex flex-col gap-[clamp(12px,1.5vw,24px)] min-h-[600px]">
          <div className="bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden min-h-[350px] flex flex-col">
             <AgentOnboardingVelocity />
          </div>
          <div className="bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden min-h-[350px] flex flex-col">
             <RegionCreationVelocity />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[clamp(12px,1.5vw,24px)] min-h-[600px]">
          <div className="bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden min-h-[300px] flex flex-col">
            <WorkforceStructure />
          </div>
          <div className="bg-[var(--card)] rounded-2xl shadow-sm overflow-hidden min-h-[400px] flex flex-col">
            <RegionalCreationTargetVsActual />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagerDashboard;
