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
    <div
      className="card"
      style={{
        padding: "24px 32px",
        width: "100%",
        flex: 1,
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 20, lineHeight: "24px", color: "var(--foreground)" }}>
            {title}
          </div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 14, lineHeight: "18px", color: "var(--muted)" }}>
            {subtitle}
          </div>
        </div>

        {/* Week pill */}
        <div
          style={{
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            padding: "6px 4px 6px 8px",
            width: 70,
            height: 28,
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--btn-radius-pill)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 400, fontSize: 12, color: "var(--foreground)" }}>
            Week
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform: "rotate(90deg)", flexShrink: 0 }}>
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