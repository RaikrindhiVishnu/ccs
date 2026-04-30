import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { label: "Mon", target: 85, actual: 45 },
  { label: "Tue", target: 48, actual: 29 },
  { label: "Wed", target: 52, actual: 20 },
  { label: "Thu", target: 60, actual: 52 },
  { label: "Fri", target: 50, actual: 23 },
  { label: "Sat", target: 100, actual: 65 },
  { label: "Sun", target: 75, actual: 68 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-lg shadow-xl">
        <p className="font-sans font-bold text-[12px] mb-1 text-[var(--foreground)]">{label}</p>
        <div className="flex flex-col gap-1">
          <p className="font-sans text-[11px] text-[var(--primary)]">
            <span className="font-semibold">Target:</span> {payload[0].value}
          </p>
          <p className="font-sans text-[11px] text-[var(--foreground)]">
            <span className="font-semibold">Actual:</span> {payload[1].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const RegionalCreationTargetVsActual: React.FC = () => (
  <div className="bg-[var(--card)] rounded-[clamp(12px,1.67vw,24px)] p-[clamp(10px,1.11vw,16px)_clamp(12px,1.67vw,24px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-start mb-[clamp(6px,0.83vw,12px)] shrink-0">
      <div>
        <div className="font-sans font-medium text-[clamp(11px,1.25vw,18px)] text-[var(--foreground)]">
          Regional Creation Target vs Actual
        </div>
        <div className="font-sans font-normal text-[clamp(9px,0.83vw,12px)] text-[var(--foreground)] opacity-60 mt-[2px]">
          Weekly overview of regional creation
        </div>
      </div>
      <button className="border border-[var(--foreground)] rounded-[30px] p-[clamp(3px,0.35vw,5px)_clamp(4px,0.42vw,6px)] bg-transparent cursor-pointer flex items-center gap-[3px] font-sans text-[clamp(8px,0.76vw,11px)] text-[var(--foreground)] shrink-0 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--card)]">
        Weekly
        <svg
          width="clamp(9px,0.97vw,14px)"
          height="clamp(9px,0.97vw,14px)"
          viewBox="0 0 16 16"
          fill="none"
          className="rotate-90"
        >
          <path
            d="M6 4L10 8L6 12"
            stroke="currentColor"
            strokeWidth="1.125"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>

    {/* Chart */}
    <div className="flex-1 min-h-0 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          barGap={-32} // Overlay bars precisely
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="var(--grid)"
            opacity={0.3}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--foreground)",
              fontSize: "clamp(7px, 0.63vw, 9px)",
              opacity: 0.5,
              fontFamily: "var(--font-sans)",
            }}
          />
          <YAxis
            domain={[0, 100]}
            tickCount={6}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--foreground)",
              fontSize: "clamp(6px, 0.63vw, 9px)",
              opacity: 0.5,
              fontFamily: "var(--font-sans)",
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle"
            wrapperStyle={{ 
              fontSize: '10px', 
              fontFamily: 'var(--font-sans)',
              paddingBottom: '10px'
            }}
          />
          {/* Target Bar (Background) */}
          <Bar
            name="Target"
            dataKey="target"
            fill="var(--primary)"
            opacity={0.15}
            radius={[4, 4, 0, 0]}
            barSize={32}
          />
          {/* Actual Bar (Foreground) */}
          <Bar
            name="Actual"
            dataKey="actual"
            fill="var(--primary)"
            radius={[4, 4, 0, 0]}
            barSize={32}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RegionalCreationTargetVsActual;