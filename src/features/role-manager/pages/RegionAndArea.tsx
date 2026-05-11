import React from "react";
import { Typography } from "@/components/ui/typography";
import RegionCreationVelocity from "@/features/role-manager/components/RegionCreationVelocity";
import RoleCreationOverviewCard from "@/features/role-manager/components/Rolecreationoverviewcard";

const RegionAndArea: React.FC = () => {
  return (
    <div className="flex flex-col p-[clamp(0.375rem,0.83vw,0.75rem)] pt-[clamp(0.75rem,1.5vw,1.5rem)] gap-[clamp(0.75rem,1.5vw,1.5rem)] box-border min-h-full">
      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-[clamp(0.75rem,1.5vw,1.5rem)] box-border">
        {/* Left Column */}
        <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)] min-h-[clamp(21.875rem,30vw,31.25rem)]">
          <div className="bg-[var(--surface-card)] rounded-2xl shadow-sm overflow-hidden min-h-[clamp(21.875rem,30vw,31.25rem)] flex flex-col">
            <RegionCreationVelocity />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)] min-h-[clamp(21.875rem,30vw,31.25rem)]">
          <div className="bg-[var(--surface-card)] rounded-2xl shadow-sm overflow-hidden min-h-[clamp(21.875rem,30vw,31.25rem)] flex flex-col">
            <RoleCreationOverviewCard />
          </div>
        </div>
      </div>

      {/* Regions & Area Data */}
      <div className="rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Card Header */}
        <div className="flex items-center justify-between px-[clamp(0.75rem,1.5vw,1.5rem)] py-[clamp(0.625rem,1.2vw,1.125rem)] border-b border-[var(--border)]">
          <Typography
            variant="h2"
            className="text-[clamp(0.875rem,1.1vw,1.125rem)] font-semibold text-[var(--text-primary)]"
          >
            Regions &amp; Area Data
          </Typography>
        </div>

        {/* Empty State Body */}
        <div className="flex bg-[var(--surface-card)]  flex-col items-center justify-center flex-1 min-h-[clamp(12rem,20vw,18.75rem)] gap-[0.75rem] text-center px-[1.5rem]">
          <Typography
            variant="p"
            className="text-[var(--text-muted)] text-[clamp(0.75rem,0.9vw,0.875rem)]"
          >
            No region or area data available yet.
          </Typography>
          <Typography
            variant="p"
            className="text-[var(--text-muted)] text-[clamp(0.6875rem,0.8vw,0.75rem)]"
          >
            Create roles to start managing your regions and operational areas.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RegionAndArea;
