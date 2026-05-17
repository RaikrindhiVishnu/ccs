import React, { useEffect } from "react";
import {
  useGetRegionOfficerDetailsMutation,
  useGetFieldOfficerDetailsMutation,
  useGetAgentDetailsMutation,
} from "../api/userDirectoryApi";
import { useDispatch, useSelector } from "react-redux";
import { setRegions } from "../store/roleManagerSlice";
import { useGetAllRegionsByStateIdMutation } from "../api/masterDataApi";
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
  const dispatch = useDispatch();
  const states = useSelector((state: any) => state.roleManager.states);
  const regions = useSelector((state: any) => state.roleManager.regions);
  const [getRegionsByStateId] = useGetAllRegionsByStateIdMutation();

  const handleStateChange = async (value: string) => {
    const selectedState = states.find((s: any) => s.state_name === value);
    // Default to id "1" if states aren't loaded in Redux yet but user clicks
    const stateId = selectedState?.id?.toString() || "1";

    try {
      const response = await getRegionsByStateId({ state_id: stateId }).unwrap();
      dispatch(setRegions(response?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  const [
    getRegionOfficerDetails,
    { data: regionOfficerData },
  ] = useGetRegionOfficerDetailsMutation();

  const [
    getFieldOfficerDetails,
    { data: fieldOfficerData },
  ] = useGetFieldOfficerDetailsMutation();

  const [
    getAgentDetails,
    { data: agentData },
  ] = useGetAgentDetailsMutation();

  useEffect(() => {
    getRegionOfficerDetails();
    getFieldOfficerDetails();
    getAgentDetails(5);
  }, []);



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
              options={states?.length > 0 ? states.map((s: any) => s.state_name) : [
                "Andhra Pradesh",
                "Telangana",
                "Karnataka",
                "Tamil Nadu",
              ]}
              defaultValue="Andhra Pradesh"
              onChange={handleStateChange}
            />
            <PillDropdown
              options={regions?.length > 0 ? regions.map((r: any) => r.region_name) : [
                "Vizag Zone",
                "Vijayawada Zone",
                "Guntur Zone",
                "Kurnool Zone",
              ]}
              defaultValue={regions?.length > 0 ? regions[0].region_name : "Vizag Zone"}
            />
          </div>
        </div>

        {/* Role Flow Diagram Section */}
        <div className="mt-4">
          <RoleFlow
            regionOfficerData={regionOfficerData}
            fieldOfficerData={fieldOfficerData}
            agentData={agentData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
