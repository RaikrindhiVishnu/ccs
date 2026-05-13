import React from "react";
import BarChart from "@/components/charts/BarChart";
import type { BarDataItem } from "@/components/charts/BarChart";
import { useGetAgentOnboardingVelocityQuery } from "@/features/role-manager/api/agentApi";

interface Props {
  data?: BarDataItem[];
  activeLabel?: string;
  yMax?: number;
  title?: string;
  subtitle?: string;
}


const AgentOnboardingVelocity: React.FC<Props> = ({
  activeLabel,
  yMax,
  title = "Agent Onboarding Velocity",
  subtitle = "Weekly overview of Onboarding of Agents",
}) => {

 const { data: apiData, isLoading, error } =
  useGetAgentOnboardingVelocityQuery({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    offset: "0",
  });

    //  {
    //   "onboardingDate": "2024-05-01", x--axis display 
    //   "totalAgents": 10 --> y - axis 
    // }

 const transformedData =
  apiData?.data?.map((item) => ({
    label: new Date(item.onboardingDate)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    value: item.totalAgents,
  })) || [];

 const chartData = transformedData;

  return (
    <div className="card p-[clamp(16px,2vw,24px)_clamp(20px,3vw,32px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden bg-white rounded-3xl">
      
      {/* Header Section */}
      <div className="flex justify-between items-start mb-[clamp(20px,4vh,32px)] shrink-0">
        <div className="flex flex-col gap-[clamp(4px,0.8vh,8px)]">
          <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(16px,1.6vw,20px)] leading-tight text-[#000000] m-0">
            {title}
          </h2>

          <p className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(11px,1.1vw,14px)] leading-tight text-[#000000] opacity-60 m-0">
            {subtitle}
          </p>
        </div>

        {/* Week Pill */}
        <div className="box-border flex items-center justify-center p-[6px_4px_6px_8px] w-17.5 h-[28px] border border-[#000000] rounded-[30px] cursor-pointer shrink-0 hover:bg-black/5 transition-colors">
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-[12px] text-[#000000] leading-none text-center">
            Week
          </span>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="rotate-90 shrink-0 ml-0.5"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="#000000"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center justify-center h-full text-red-500">
          Failed to load data
        </div>
      )}

      {/* Chart */}
    {/* Chart */}
{!isLoading && !error && (
  <div className="flex-1 min-h-0 w-full relative">

    {chartData.length === 0 ? (
      <div className="flex items-center justify-center h-full text-[14px] text-black/60">
        No data available
      </div>
    ) : (
      <BarChart
        data={chartData}
        activeLabel={activeLabel ?? "We"}
        yMax={yMax}
      />
    )}

  </div>
)}
    </div>
  );
};

export default AgentOnboardingVelocity;