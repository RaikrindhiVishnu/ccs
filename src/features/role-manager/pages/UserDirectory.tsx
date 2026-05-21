import React, { useEffect, useRef } from "react";
import {
  useGetRegionOfficerDetailsQuery,
  useGetFieldOfficerDetailsQuery,
  useGetAgentDetailsQuery,
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

let lastFetchedStateId = "";

const UserDirectory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const states = useSelector((state: any) => state.roleManager.states);
  const regions = useSelector((state: any) => state.roleManager.regions);
  
  const [selectedStateId, setSelectedStateId] = React.useState<string>(
    states?.[0]?.id?.toString() || ""
  );
  const [selectedRegionId, setSelectedRegionId] = React.useState<string>(
    regions?.[0]?.id?.toString() || ""
  );

  const [
    getRegionsByStateId,
    { isLoading: isRegionsLoading }
  ] = useGetAllRegionsByStateIdMutation();

  // 1. Fetch Regional Officer & Intelligence Officer details
  const { data: regionOfficerData, isLoading: isRegionLoading } = useGetRegionOfficerDetailsQuery(
    {
      state_id: selectedStateId,
      region_id: selectedRegionId,
    },
    { 
      skip: !selectedStateId || !selectedRegionId,
      refetchOnMountOrArgChange: true,
    }
  );

  const regionalOfficerId = regionOfficerData?.data?.regional_officer_id;
  const intelligenceOfficerId = regionOfficerData?.data?.intelligence_officer_id;

  // 2. Fetch Field Officers under these regional/intelligence officers (pass 0 if null/undefined)
  const { data: fieldOfficerData, isLoading: isFieldLoading } = useGetFieldOfficerDetailsQuery(
    {
      regional_officer_id: regionalOfficerId || 0,
      intelligence_officer_id: intelligenceOfficerId || 0,
    },
    { 
      skip: !regionOfficerData,
      refetchOnMountOrArgChange: true,
    }
  );

  const fieldOfficersList = fieldOfficerData?.data || [];
  const firstFieldOfficerId = fieldOfficersList.length > 0 
    ? (fieldOfficersList[0].role_id || fieldOfficersList[0].id) 
    : 0;

  // 3. Fetch Agents under the first Field Officer automatically
  const { data: agentData, isLoading: isAgentLoading } = useGetAgentDetailsQuery(
    firstFieldOfficerId,
    { 
      skip: !fieldOfficerData,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleStateChange = async (stateId: string) => {
    if (!stateId) return;
    if (stateId === lastFetchedStateId && regions.length > 0) return;
    lastFetchedStateId = stateId;
    setSelectedStateId(stateId);
    try {
      const response = await getRegionsByStateId({ state_id: stateId }).unwrap();
      const fetchedRegions = response?.data || [];
      dispatch(setRegions(fetchedRegions));
      
      if (fetchedRegions.length > 0) {
        const firstRegionId = fetchedRegions[0].id.toString();
        setSelectedRegionId(firstRegionId);
      } else {
        setSelectedRegionId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegionChange = (regionId: string) => {
    if (!regionId) return;
    setSelectedRegionId(regionId);
  };

  const initializedRef = useRef(false);

  useEffect(() => {
    if (states && states.length > 0 && !initializedRef.current) {
      initializedRef.current = true;
      const firstStateId = states[0].id.toString();
      setSelectedStateId(firstStateId);
      handleStateChange(firstStateId);
    }
  }, [states]);

  useEffect(() => {
    return () => {
      lastFetchedStateId = "";
    };
  }, []);

  const isUpdating = isRegionsLoading || isRegionLoading || isFieldLoading || isAgentLoading;

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
          <div className="flex gap-2 items-center">
            <PillDropdown
              options={states?.length > 0 ? states.map((s: any) => ({ label: s.desc, value: s.id.toString() })) : []}
              value={selectedStateId}
              onChange={handleStateChange}
            />
            <PillDropdown
              options={regions?.length > 0 ? regions.map((r: any) => ({ label: r.region_name || r.desc, value: r.id.toString() })) : []}
              value={selectedRegionId}
              onChange={handleRegionChange}
            />
          </div>
        </div>

        {/* Role Flow Diagram Section */}
        <div className="mt-4 relative min-h-[300px]">
          {isUpdating && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xs flex items-center justify-center z-50 rounded-3xl">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-3 border-[color:var(--brand-500)] border-t-transparent"></div>
                <p className="text-xs font-semibold text-[color:var(--brand-500)]">Updating Workforce...</p>
              </div>
            </div>
          )}
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
