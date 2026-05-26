import React, { useEffect, useCallback } from "react";
import { LayoutGrid, Search, Bell } from "lucide-react";
import headerBg from "@/assets/head1.svg";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import AgentOnboardingVelocity from "@/features/role-manager/components/AgentOnboardingVelocity";
import RegionCreationVelocity from "@/features/role-manager/components/RegionCreationVelocity";
import WorkforceStructure from "@/features/role-manager/components/WorkforceStructure";
import RoleCreationOverviewCard from "@/features/role-manager/components/Rolecreationoverviewcard";
import pako from "pako";
import { Buffer } from "buffer";
import geoJsonData from "../data/geoJsonApi.json";
import { useDispatch } from "react-redux";
import { useGetAllGeoMasterDataQuery } from "@/features/role-manager/api/masterDataApi";
import { setGeoMasterData } from "@/features/role-manager/store/roleManagerSlice";
import {
  useGetAllIntelligenceOfficersMutation,
  useGetAllRegionalOfficersMutation,
  useGetAllFieldOfficersMutation,
} from "@/features/role-manager/api/roleManagerApi";
import { useGetAllRegionsByStateIdMutation } from "@/features/role-manager/api/regionSelectionApi";

// import RegionalCreationTargetVsActual from "@/pages/Dashboard/RegionalCreationTargetVsActual";

// ─── Header ────────────────────────────────────────────────────────────────────
const RoleManagerHeader: React.FC = () => {
  return (
   <div
  className={[
    // structure
    "relative w-full overflow-hidden flex flex-col justify-start",
    // spacing
    "px-4 py-3 sm:px-5 sm:py-3.5 lg:px-6 lg:py-4 xl:px-[1.625rem] xl:py-[1.125rem] 2xl:px-8 2xl:py-5",
    // size
    "min-h-32 lg:min-h-36 xl:min-h-[10.5rem]",
    // shape
    "rounded-[1.25rem] xl:rounded-[1.5rem]",
    // row gap
    "gap-2.5",
  ].join(" ")}
>
  {/* ── Background SVG ── */}
  <img
    src={headerBg}
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* ── ROW 1: Breadcrumb ←→ Search + Bell ── */}
  <div className="relative z-10 flex items-start justify-between gap-4">

    {/* Breadcrumb */}
    <div className="flex shrink-0 items-center gap-1.5 min-w-fit">
      <LayoutGrid
        size={16}
        strokeWidth={2}
        className="shrink-0 text-[var(--text-primary)]"
      />
      <Typography
        variant="span"
        className="font-inter font-normal whitespace-nowrap leading-5 text-[var(--text-primary)] text-[0.75rem] sm:text-[0.8125rem] xl:text-sm"
      >
        Dashboard
      </Typography>
    </div>

    {/* Right controls: Search + Bell */}
    <div className="flex flex-1 items-center justify-end gap-2 lg:gap-3 max-w-[18rem] md:max-w-xs lg:max-w-sm xl:max-w-[23.25rem] 2xl:max-w-[26rem]">

      {/* Search */}
      <Input
        variant="white"
        placeholder="Search..."
        icon={
          <Search
            size={20}
            strokeWidth={2}
            className="text-[var(--text-muted-strong)]"
          />
        }
        containerClassName="flex-1"
        wrapperClassName="h-10 lg:h-11 xl:h-[3.25rem] bg-[var(--surface-card)] rounded-full shadow-sm"
        className="font-inter font-normal text-[var(--text-primary)] placeholder:text-[var(--text-muted-strong)] text-[0.8125rem] lg:text-sm xl:text-base"
      />

      {/* Bell */}
      <button
        type="button"
        aria-label="Notifications"
        className={[
          "relative shrink-0 flex items-center justify-center",
          "w-10 h-10 lg:w-11 lg:h-11 xl:w-[3.25rem] xl:h-[3.25rem]",
          "rounded-full bg-[var(--surface-card)] shadow-sm",
          "transition-all duration-200",
        ].join(" ")}
      >
        <Bell
          strokeWidth={1.8}
          className="text-[var(--text-primary)] w-4 h-4 lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.35rem] xl:h-[1.35rem]"
        />
        {/* Notification dot */}
        <span
          aria-hidden="true"
          className="absolute top-[0.78rem] right-[0.78rem] xl:top-[0.95rem] xl:right-[0.95rem] w-1.5 h-1.5 rounded-full bg-[var(--status-danger)]"
        />
      </button>
    </div>
  </div>

  {/* ── ROW 2: Title + Subtitle ── */}
  <div className="relative z-10 flex flex-col gap-1.5 xl:gap-2 -mt-1 xl:-mt-1">

    {/* Title — Figma: Inter 500, 36px, uppercase */}
    <p
      className={[
        "!m-0 font-inter font-medium uppercase leading-[120%] tracking-[-0.02em]",
        "text-[var(--text-strong)]",
        "text-[1.75rem] sm:text-[1.875rem] lg:text-[2rem] xl:text-[2.25rem] 2xl:text-[2.5rem]",
      ].join(" ")}
    >
      ROLE MANAGER
    </p>

    {/* Subtitle — Figma: Inter 400, 14px, opacity 0.6 */}
    <Typography
      variant="p"
      className={[
        "-mt-2 font-inter font-normal text-[var(--text-muted)]",
        "max-w-[95%] sm:max-w-[28rem] xl:max-w-[29.375rem]",
        "text-[0.75rem] sm:text-[0.8125rem] xl:text-sm",
        "leading-4 xl:leading-[1.125rem]",
      ].join(" ")}
    >
      Next-generation platform infrastructure for scaling sustainable
      estates.
    </Typography>
  </div>
</div>
  );
};

// ─── Main Dashboard Component ──────────────────────────────────────────────────
const RoleManagerDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { data: geoData } = useGetAllGeoMasterDataQuery();

  useEffect(() => {
    if (geoData) {
      dispatch(setGeoMasterData(geoData));
    }
  }, [geoData, dispatch]);

  const fetchAndDecodeGeoData = useCallback(async (base64Data: string) => {
    try {
      const binaryData = Buffer.from(base64Data, "base64");
      const decompressedData = pako.ungzip(binaryData);
      const decompressedString = new TextDecoder().decode(decompressedData);
      const finalData = JSON.parse(decompressedString);
      return finalData;
    } catch (error) {
      console.error("Decoding failed:", error);
    }
  }, []);

  // For testing purposes as requested by user
  React.useEffect(() => {
    const data = (geoJsonData as any)?.data;
    if (data) {
      fetchAndDecodeGeoData(data);
    }
  }, [fetchAndDecodeGeoData]);

  const [getIntelligence] = useGetAllIntelligenceOfficersMutation();
  const [getRegional] = useGetAllRegionalOfficersMutation();
  const [getField] = useGetAllFieldOfficersMutation();
  const [getAllRegionsByState] = useGetAllRegionsByStateIdMutation();

  React.useEffect(() => {
    const fetchAll = async () => {
      try {
        const intel = await getIntelligence().unwrap();
        console.log("[RoleManagerDashboard] get_all_intelligence_officers:", intel);
      } catch (error) {
        console.error("[RoleManagerDashboard] Error fetching intelligence officers:", error);
      }

      try {
        const regional = await getRegional().unwrap();
        console.log("[RoleManagerDashboard] get_all_regional_officers:", regional);
      } catch (error) {
        console.error("[RoleManagerDashboard] Error fetching regional officers:", error);
      }

      try {
        const field = await getField().unwrap();
        console.log("[RoleManagerDashboard] get_all_field_officers:", field);
      } catch (error) {
        console.error("[RoleManagerDashboard] Error fetching field officers:", error);
      }

      try {
        const regionsByState = await getAllRegionsByState({ state_id: 1 }).unwrap();
        console.log("[RoleManagerDashboard] get_all_regions_by_state_id response:", regionsByState);
      } catch (error) {
        console.error("[RoleManagerDashboard] Error fetching regions by state:", error);
      }
    };

    fetchAll();
  }, [getIntelligence, getRegional, getField, getAllRegionsByState]);

  return (
<div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">          {/* Header */}
          <div className="shrink-0">
            <RoleManagerHeader />
          </div>

          {/* Charts Grid */}
        <div className="box-border grid grid-cols-2 gap-[clamp(8px,1vw,16px)]">
      {/* Left Column */}
      <div className="flex min-h-[600px] flex-col gap-[clamp(8px,1vw,16px)]">
        <div className="flex min-h-[350px] flex-col overflow-hidden rounded-2xl bg-[var(--surface-card)] shadow-sm">
          <AgentOnboardingVelocity />
        </div>
        <div className="flex min-h-[350px] flex-col overflow-hidden rounded-2xl bg-[var(--surface-card)] shadow-sm">
          <RegionCreationVelocity />
        </div>
      </div>

      {/* Right Column */}
      <div className="flex min-h-[600px] flex-col gap-[clamp(8px,1vw,16px)]">
        <div className="flex min-h-[300px] flex-col overflow-hidden rounded-2xl bg-[var(--surface-card)] shadow-sm">
          <WorkforceStructure />
        </div>
        <div className="flex min-h-[400px] flex-col overflow-hidden rounded-2xl bg-[var(--surface-card)] shadow-sm">
          {/* <RegionalCreationTargetVsActual /> */}
          <RoleCreationOverviewCard />
        </div>
      </div>
    </div>
        </div>
  );
};

export default RoleManagerDashboard;