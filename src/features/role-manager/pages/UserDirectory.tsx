import React from "react";
import { useNavigate } from "react-router-dom";
import AgentOnboardingVelocity from "@/features/role-manager/components/AgentOnboardingVelocity";
import WorkforceStructure from "@/features/role-manager/components/WorkforceStructure";
import { Typography } from "@/components/ui/typography";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PillDropdown } from "@/components/ui/Dropdown";
import { RoleFlow } from "../components/RoleFlow";

const UserDirectory: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col py-16 px-4 gap-6 box-border min-h-full bg-( --surface-page)">
      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-90">
        <div className="flex">
          <AgentOnboardingVelocity />
        </div>
        <div className="flex">
          <WorkforceStructure />
        </div>
      </div>

      <div className="pt-6 flex flex-col gap-6">
        {/* Header Row */}
        <div className="flex flex-row items-center justify-between">
          <Typography variant="p" className="text-3xl font-bold leading-tight">
            User Directory
          </Typography>
          <Button
            variant="primary-sm"
            leftIcon={<Plus size={10} />}
            className="h-10 text-sm font-medium rounded-full"
            onClick={() => navigate("/role-manager/create-roles")}
          >
            Create roles
          </Button>
        </div>

        {/* Filters/Navigation Row */}
        <div className="flex flex-row items-center justify-between w-full p-3 ">
          {/* Left Side: Role List Pill */}
          <div className="bg-white rounded-full px-4 h-8 flex items-center justify-center shadow-sm border-border">
            <span className="text-sm font-medium  opacity-80">Role List</span>
          </div>

          {/* Right Side: Dropdowns */}
          <div className="flex gap-2">
            <PillDropdown
              options={[
                "Andhra Pradesh",
                "Telangana",
                "Karnataka",
                "Tamil Nadu",
              ]}
              defaultValue="Andhra Pradesh"
              // className="min-w-[180px]"
            />
            <PillDropdown
              options={[
                "Vizag Zone",
                "Vijayawada Zone",
                "Guntur Zone",
                "Kurnool Zone",
              ]}
              defaultValue="Vizag Zone"
            />
          </div>
        </div>

        {/* Role Flow Diagram Section */}
        <div className="mt-4">
          <RoleFlow />
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
