import React, { useEffect, useRef } from "react";
import {
  useGetRegionOfficerDetailsQuery,
  useGetFieldOfficerDetailsQuery,
  useGetAgentDetailsQuery,
} from "../api/userDirectoryApi";
import { useGetAllAreasByRegionIdQuery } from "../api/regionSelectionApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegions,
  setSelectedStateId as setSelectedStateIdAction,
  setSelectedRegionId as setSelectedRegionIdAction,
  setSelectedAreaId as setSelectedAreaIdAction,
} from "../store/roleManagerSlice";
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
  
  const selectedStateId = useSelector((state: any) => state.roleManager.selectedStateId);
  const selectedRegionId = useSelector((state: any) => state.roleManager.selectedRegionId);
  const selectedAreaId = useSelector((state: any) => state.roleManager.selectedAreaId);

  const setSelectedStateId = (id: string) => dispatch(setSelectedStateIdAction(id));
  const setSelectedRegionId = (id: string) => dispatch(setSelectedRegionIdAction(id));
  const setSelectedAreaId = (id: string) => dispatch(setSelectedAreaIdAction(id));

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

  // Fetch Areas of selected Region
  const { data: areasData, isLoading: isAreasLoading } = useGetAllAreasByRegionIdQuery(
    { region_id: Number(selectedRegionId) },
    { skip: !selectedRegionId }
  );

  const areasList = areasData?.data || [];

  useEffect(() => {
    if (areasList.length > 0) {
      const isStillValid = areasList.some((a: any) => {
        const aId = (a.area_id ?? a.id)?.toString();
        return aId === selectedAreaId;
      });
      if (!isStillValid) {
        const firstAreaId = areasList[0]?.area_id ?? areasList[0]?.id;
        if (firstAreaId !== undefined && firstAreaId !== null) {
          setSelectedAreaId(firstAreaId.toString());
        }
      }
    } else if (!isAreasLoading && selectedAreaId !== "") {
      setSelectedAreaId("");
    }
  }, [areasList, isAreasLoading, selectedAreaId]);

  // 2. Fetch Field Officers under these regional/intelligence officers (pass 0 if null/undefined)
  const { data: fieldOfficerData, isLoading: isFieldLoading } = useGetFieldOfficerDetailsQuery(
    {
      state_id: selectedStateId,
      region_id: selectedRegionId,
      regional_officer_id: regionalOfficerId || 0,
      intelligence_officer_id: intelligenceOfficerId || 0,
      area_id: selectedAreaId || 0,
    },
    { 
      skip: !regionOfficerData || !selectedAreaId,
      refetchOnMountOrArgChange: true,
    }
  );

  const fieldOfficersList = fieldOfficerData?.data || [];
  const firstFieldOfficer = fieldOfficersList[0];
  const firstFieldOfficerId = firstFieldOfficer 
    ? (firstFieldOfficer.role_id || firstFieldOfficer.id) 
    : 0;

  // 3. Fetch Agents under the first Field Officer automatically
  const { data: agentData, isLoading: isAgentLoading } = useGetAgentDetailsQuery(
    {
      state_id: selectedStateId,
      region_id: selectedRegionId,
      area_id: selectedAreaId || 0,
      field_officer_id: firstFieldOfficerId,
    },
    { 
      skip: !fieldOfficerData || fieldOfficersList.length === 0 || !selectedAreaId,
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
      
      const isStillValid = fetchedRegions.some((r: any) => r.id?.toString() === selectedRegionId);
      if (!isStillValid) {
        if (fetchedRegions.length > 0) {
          const firstRegionId = fetchedRegions[0].id.toString();
          setSelectedRegionId(firstRegionId);
        } else {
          setSelectedRegionId("");
        }
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
      if (selectedStateId) {
        handleStateChange(selectedStateId);
      } else {
        const firstStateId = states[0].id.toString();
        handleStateChange(firstStateId);
      }
    }
  }, [states, selectedStateId]);

  useEffect(() => {
    return () => {
      lastFetchedStateId = "";
    };
  }, []);

  const isUpdating = isRegionsLoading || isRegionLoading || isAreasLoading || isFieldLoading || isAgentLoading;

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
          <Typography
            variant="h1"
            className="m-0 text-[36px] font-bold leading-[100%] tracking-[0px] text-black"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            User Directory
          </Typography>
          <Button
            onClick={() => navigate("/role-manager/create-roles")}
            className="w-[129px] h-[48px] rounded-[100px] bg-[#2780C4] text-white text-[14px] font-normal leading-[18px] shadow-md flex items-center justify-center gap-[2px] hover:bg-[#2780C4] normal-case"
            style={{ textTransform: "none" }}
          >
            + Create Role
          </Button>
        </div>

        {/* Filters/Navigation Row */}
        <div className="flex flex-row items-center justify-between w-full p-3 ">
          {/* Left Side: Role List Pill */}
          <div className="w-[90px] h-[44px] rounded-[64.67px] bg-white flex items-center justify-center shadow-sm">
            <span className="text-[12px] font-normal leading-[140%] tracking-[-0.02em] text-black">
              Role List
            </span>
          </div>

          {/* Right Side: Dropdowns */}
          <div className="flex gap-2 items-center">
            <PillDropdown
              options={states?.length > 0 ? states.map((s: any) => ({ label: s.desc, value: s.id?.toString() || "" })) : []}
              value={selectedStateId}
              onChange={handleStateChange}
              buttonClassName="h-[43px]"
            />
            <PillDropdown
              options={regions?.length > 0 ? regions.map((r: any) => ({ label: r.region_name || r.desc, value: r.id?.toString() || "" })) : []}
              value={selectedRegionId}
              onChange={handleRegionChange}
              disabled={!regions || regions.length === 0}
              title={(!regions || regions.length === 0) ? "No region data available for this state" : undefined}
              placeholder="No Regions"
              buttonClassName="h-[43px]"
            />
            <PillDropdown
              options={areasList?.length > 0 ? areasList.map((a: any) => ({ label: a.area_name || a.desc, value: (a.area_id ?? a.id)?.toString() || "" })) : []}
              value={selectedAreaId}
              onChange={(areaId) => setSelectedAreaId(areaId)}
              disabled={!areasList || areasList.length === 0}
              title={(!areasList || areasList.length === 0) ? "No area data available for this region" : undefined}
              placeholder="No Areas"
              buttonClassName="h-[43px]"
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
            stateId={selectedStateId}
            regionId={selectedRegionId}
            areaId={selectedAreaId}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDirectory;
