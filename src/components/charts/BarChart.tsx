import React from "react";
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface BarDataItem {
  label: string;
  value: number;
}

interface Props {
  data: BarDataItem[];
  activeLabel?: string;
  yMax?: number;
}

const CustomBar = (props: any) => {
  const { x, y, width, height, value, label, activeLabel, yMax } = props;
  const isActive = label === activeLabel;

  // Thin line width for inactive bars
  const thinWidth = 1.4;
  const centerX = x + width / 2;

  if (isActive) {
    // Active capsule width (clamp equivalent logic)
    const capsuleWidth = Math.max(44, Math.min(width * 0.8, 54));
    const capsuleX = centerX - capsuleWidth / 2;

    return (
      <g>
        {/* Value Badge (Tooltip on top) */}
        <foreignObject x={centerX - 23} y={y - 45} width={46} height={28}>
          <div className="flex justify-center items-center w-[46px] h-[28px] bg-[var(--tooltip-bg)] border border-[var(--border-medium)] rounded-[var(--radius-lg)] shadow-sm">
            <span className="font-sans font-semibold text-[14px] text-[var(--foreground)] leading-none">
              {value}
            </span>
          </div>
        </foreignObject>

        {/* Top Dot */}
        <circle cx={centerX} cy={y - 5} r={5.5} fill="var(--primary)" />

        {/* Capsule Bar */}
        <defs>
          <linearGradient id="activeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="rgba(124, 171, 218, 0.77)" />
          </linearGradient>
        </defs>
        <rect
          x={capsuleX}
          y={y}
          width={capsuleWidth}
          height={height}
          rx={capsuleWidth / 2}
          fill="url(#activeGradient)"
        />

        {/* Center vertical line */}
        <line
          x1={centerX}
          y1={y}
          x2={centerX}
          y2={y + height - 40}
          stroke="var(--primary)"
          strokeWidth={1.26}
        />

        {/* Day label circle */}
        <foreignObject x={centerX - 18} y={y + height - 42.88} width={36} height={36}>
          <div className="w-[35.88px] h-[35.88px] bg-[var(--primary)] rounded-full flex justify-center items-center">
            <span className="font-sans font-medium text-[10.77px] text-white">
              {label}
            </span>
          </div>
        </foreignObject>
      </g>
    );
  }

  return (
    <g>
      {/* Top Dot */}
      <circle cx={centerX} cy={y - 4} r={5.5} fill="var(--primary)" />

      {/* Thin line */}
      <rect
        x={centerX - thinWidth / 2}
        y={y}
        width={thinWidth}
        height={height - 40}
        fill="var(--border)"
      />

      {/* Day label circle placeholder area */}
      <foreignObject x={centerX - 20} y={y + height - 40} width={40} height={40}>
        <div className="w-[40px] h-[40px] bg-[var(--background)] rounded-full flex justify-center items-center">
          <span className="font-sans font-medium text-[12px] text-[var(--foreground)]">
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const BarChart: React.FC<Props> = ({ data, activeLabel, yMax: yMaxProp }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const domainMax = yMaxProp ?? Math.ceil(maxValue / 100) * 100;

  // Determine active label if not provided
  const activeLbl = activeLabel ?? data.find((d) => d.value === maxValue)?.label;

  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar
          data={data}
          margin={{ top: 50, right: 20, left: -20, bottom: 0 }}
          barGap={0}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="var(--border)"
          />
          <XAxis
            dataKey="label"
            hide
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, domainMax]}
            tickCount={domainMax / 100 + 1}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted-strong)",
              fontSize: 12,
              fontFamily: "var(--font-sans)",
            }}
          />
          <Bar
            dataKey="value"
            shape={(props: any) => (
              <CustomBar
                {...props}
                activeLabel={activeLbl}
                label={data[props.index].label}
              />
            )}
            isAnimationActive={false}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;