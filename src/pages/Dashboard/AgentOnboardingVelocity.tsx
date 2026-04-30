import React, { useEffect, useState } from "react";
import "../../index.css";
import BarChart from "@/components/charts/BarChart";
import type { BarDataItem } from "@/components/charts/BarChart";

interface Props {
  data?: BarDataItem[];
  activeLabel?: string;
  yMax?: number;
  title?: string;
  subtitle?: string;
}

const DEMO_DATA: BarDataItem[] = [
  { label: "Mo", value: 150 },
  { label: "Tu", value: 195 },
  { label: "We", value: 287 },
  { label: "Th", value: 80 },
  { label: "Fr", value: 140 },
  { label: "Sa", value: 185 },
  { label: "Su", value: 150 },
];

const AgentOnboardingVelocity: React.FC<Props> = ({
  data,
  activeLabel,
  yMax,
  title = "Agent Onboarding Velocity",
  subtitle = "Weekly overview of Onboarding of Agents",
}) => {
  const [chartData, setChartData] = useState<BarDataItem[]>(data ?? DEMO_DATA);

  useEffect(() => {
    if (data && data.length > 0) setChartData(data);
  }, [data]);

  return (
    <div className="card p-[24px_32px] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-[32px] shrink-0">
        <div className="flex flex-col gap-[8px]">
          <div className="font-sans font-medium text-[20px] leading-[24px] text-[var(--foreground)]">
            {title}
          </div>
          <div className="font-sans font-normal text-[14px] leading-[18px] text-[var(--muted)]">
            {subtitle}
          </div>
        </div>

        {/* Week pill */}
        <div className="box-border flex items-center p-[6px_4px_6px_8px] w-[70px] h-[28px] border border-[var(--border-strong)] rounded-[var(--btn-radius-pill)] cursor-pointer shrink-0">
          <span className="font-sans font-normal text-[12px] text-[var(--foreground)]">
            Week
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-90 shrink-0">
            <path d="M6 4L10 8L6 12" stroke="var(--sidebar)" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Chart */}
      <BarChart
        data={chartData}
        activeLabel={activeLabel}
        yMax={yMax}
      />
    </div>
  );
};

export default AgentOnboardingVelocity;