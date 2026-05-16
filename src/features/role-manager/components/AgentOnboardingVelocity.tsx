import React from "react";
import BarChart from "@/components/charts/BarChart";
import type { BarDataItem } from "@/components/charts/BarChart";
import { useGetAgentOnboardingVelocityQuery } from "@/features/role-manager/api/agentApi";
import DateRangePicker from "@/components/ui/DateRangePicker";

interface Props {
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
  // ✅ State first
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    return { from, to };
  });

  // ✅ Single query using dateRange
  const { data: apiData, isLoading, error } = useGetAgentOnboardingVelocityQuery({
    startDate: dateRange.from.toISOString().split("T")[0],
    endDate: dateRange.to.toISOString().split("T")[0],
    offset: "0",
  });

  const chartData =
    apiData?.data?.map((item) => ({
      label: new Date(item.onboardingDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: item.totalAgents,
    })) || [];

  return (
    <div className="card p-[clamp(16px,2vw,24px)_clamp(20px,3vw,32px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden bg-white rounded-3xl">

      {/* Header */}
      <div className="flex justify-between items-start mb-[clamp(20px,4vh,32px)] shrink-0">
        <div className="flex flex-col gap-[clamp(4px,0.8vh,8px)]">
          <h2 className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(16px,1.6vw,20px)] leading-tight text-[#000000] m-0">
            {title}
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(11px,1.1vw,14px)] leading-tight text-[#000000] opacity-60 m-0">
            {subtitle}
          </p>
        </div>

        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          onRangeChange={(range) => {
            if (range) setDateRange(range);
          }}
        />
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
                tooltipLabel="Agents"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default AgentOnboardingVelocity;