import React from "react";
import AgentOnboardingVelocity from "./AgentOnboardingVelocity";
import RegionCreationVelocity from "./RegionCreationVelocity";
import WorkforceStructure from "./WorkforceStructure";
// import RegionalCreationTargetVsActual from "./RegionalCreationTargetVsActual";
import RoleCreationOverviewCard from "@/pages/Dashboard/Rolecreationoverviewcard";

import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardPage: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-[var(--surface-page)] flex flex-row box-border overflow-hidden">
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 min-w-0 flex flex-col p-[clamp(6px,0.83vw,12px)] gap-[clamp(6px,0.83vw,12px)] box-border overflow-hidden h-full">
        {/* Header */}
        <div className="shrink-0">
          <Header />
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-2 gap-[clamp(6px,0.83vw,12px)] flex-1 min-h-0 box-border">
          {/* Left column */}
          <div className="flex flex-col gap-[clamp(6px,0.83vw,12px)] min-w-0 min-h-0 overflow-hidden">
            <div className="flex-1 min-h-0 flex">
              <AgentOnboardingVelocity />
            </div>
            <div className="flex-1 min-h-0 flex">
              <RegionCreationVelocity />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-[clamp(6px,0.83vw,12px)] min-w-0 min-h-0 overflow-hidden">
            <div className="flex-[42] min-h-0 flex">
              <WorkforceStructure />
            </div>
            <div className="flex-[58] min-h-0 flex">
              {/* <RegionalCreationTargetVsActual /> */}
                <RoleCreationOverviewCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;