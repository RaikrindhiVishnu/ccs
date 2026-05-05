import React from "react";
import { Typography } from "@/components/ui/typography";
import AgentOnboardingVelocity from "@/pages/Dashboard/AgentOnboardingVelocity";
import WorkforceStructure from "@/pages/Dashboard/WorkforceStructure";

const UserDirectory: React.FC = () => {
  return (
    <div className="flex flex-col py-16 px-4 gap-6 box-border min-h-full">
      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-90">
        <div className="flex">
          <AgentOnboardingVelocity />
        </div>
        <div className="flex">
          <WorkforceStructure />
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
