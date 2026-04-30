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
      <div className="bg-[var(--card)] border border-[var(--border-soft)] p-2.5 rounded-xl shadow-xl">
        <p className="font-sans font-bold text-[12px] mb-1 text-[var(--foreground)]">{label}</p>
        <div className="flex flex-col gap-0.5">
          <p className="font-sans text-[11px] text-[var(--primary)] opacity-60">
            Target: {payload[0].value}
          </p>
          <p className="font-sans text-[11px] text-[var(--primary)] font-semibold">
            Actual: {payload[1].value}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const RegionalCreationTargetVsActual: React.FC = () => (
  <div className="card p-[clamp(12px,2vw,24px)_clamp(16px,2.5vw,32px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
    {/* Header */}
    <div className="flex justify-between items-start mb-[clamp(12px,2vh,24px)] shrink-0">
      <div className="flex flex-col gap-[clamp(4px,0.8vh,8px)]">
        <div className="font-sans font-medium text-[clamp(14px,1.5vw,20px)] leading-tight text-[var(--foreground)]">
          Regional Creation Target vs Actual
        </div>
        <div className="font-sans font-normal text-[clamp(11px,1vw,14px)] leading-tight text-[var(--foreground)] opacity-60">
          Weekly overview of regional creation
        </div>
      </div>

      <div className="box-border flex items-center p-[5px_4px_5px_8px] border border-[var(--border-strong)] rounded-[30px] cursor-pointer shrink-0">
        <span className="font-sans font-normal text-[12px] text-[var(--foreground)]">
          Weekly
        </span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rotate-90 shrink-0">
          <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>

    {/* Chart */}
    <div className="flex-1 min-h-0 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
          barGap={-32} // Stacked/Overlay effect
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="1 1"
            stroke="#2C2C2C"
            strokeOpacity={0.1}
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--foreground)",
              fontSize: "clamp(9px, 0.7vw, 11px)",
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
              fontSize: "clamp(9px, 0.7vw, 11px)",
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
              fontSize: '11px', 
              fontFamily: 'var(--font-sans)',
              paddingBottom: '20px',
              opacity: 0.8
            }}
          />
          {/* Target Bar (Background) */}
          <Bar
            name="Target"
            dataKey="target"
            fill="#2780C4"
            opacity={0.15}
            radius={[4, 4, 0, 0]}
            barSize={32}
            isAnimationActive={false}
          />
          {/* Actual Bar (Foreground) */}
          <Bar
            name="Actual"
            dataKey="actual"
            fill="#2780C4"
            radius={[4, 4, 0, 0]}
            barSize={32}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RegionalCreationTargetVsActual;