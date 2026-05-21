import React from "react";
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export interface BarDataItem {
  label: string;
  value: number;
}

interface Props {
  data: BarDataItem[];
  activeLabel?: string;
  yMax?: number;
  tooltipLabel?: string;
}

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  value?: number;
  label?: string;
  activeLabel?: string;
  index?: number;
}

// ── CustomTooltip ─────────────────────────────
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: BarDataItem }>;
  tooltipLabel?: string;
}

const CustomTooltip = ({ active, payload, tooltipLabel = "Value" }: TooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-[var(--surface-card)] border border-[var(--border-soft)] rounded-xl px-3 py-2 shadow-[var(--shadow-dropdown)]">
        <p className="font-bold text-xs text-[var(--text-primary)] mb-0.5 font-[var(--font-sans)]">
          {item.label}
        </p>
        <p className="font-semibold text-[11px] text-[var(--brand-500)] m-0 font-[var(--font-sans)]">
          {tooltipLabel}: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const CustomBar = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  value = 0,
  label = "",
  activeLabel = "",
}: CustomBarProps) => {
  const isActive = label === activeLabel;
  const thinLineWidth = 1.4;
  const centerX = x + width / 2;

  if (isActive) {
    const capsuleWidth = 54;
    const capsuleX = centerX - capsuleWidth / 2;

    return (
      <g>
        {/* Value Badge */}
        <foreignObject x={centerX - 23} y={y - 45} width={46} height={28}>
          <div className="flex justify-center items-center rounded-3xl border border-[var(--border)] bg-[var(--tooltip-bg)] h-7">
            <span className="font-[var(--font-sans)] font-semibold text-sm text-[var(--text-primary)] leading-none">
              {value}
            </span>
          </div>
        </foreignObject>

        {/* Top Dot */}
        <circle cx={centerX} cy={y - 5.5} r={5.5} fill="var(--brand-500)" />

        {/* Capsule Bar with Gradient */}
        <defs>
          <linearGradient id="activeCapsuleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-gradient-from)" />
            <stop offset="100%" stopColor="var(--chart-gradient-to)" />
          </linearGradient>
        </defs>
        <rect
          x={capsuleX}
          y={y - 10}
          width={capsuleWidth}
          height={height + 55}
          rx={27}
          fill="url(#activeCapsuleGradient)"
        />

        {/* Center vertical line */}
        <line
          x1={centerX}
          y1={y}
          x2={centerX}
          y2={y + height}
          stroke="var(--brand-500)"
          strokeWidth={1.26}
        />

        {/* Active Day label circle */}
        <foreignObject x={centerX - 18} y={y + height - 2} width={36} height={36}>
          <div className="w-9 h-9 bg-[var(--brand-500)] rounded-full flex justify-center items-center shadow-[var(--shadow-card-sm)]">
            <span className="font-[var(--font-sans)] font-medium text-[10.7px] text-white">
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
      <circle cx={centerX} cy={y - 4} r={5.5} fill="var(--brand-500)" />

      {/* Thin line */}
      <rect
        x={centerX - thinLineWidth / 2}
        y={y}
        width={thinLineWidth}
        height={height}
        fill="var(--text-primary)"
        opacity={0.16}
      />

      {/* Inactive Day label circle */}
      <foreignObject x={centerX - 20} y={y + height - 2} width={40} height={40}>
        <div className="w-10 h-10 bg-[var(--surface-page)] rounded-full flex justify-center items-center">
          <span className="font-[var(--font-sans)] font-medium text-xs text-[var(--text-primary)]">
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

// ── Main Component ────────────────────────────
const BarChart: React.FC<Props> = ({
  data,
  activeLabel,
  yMax: yMaxProp,
  tooltipLabel = "Value",
}) => {
  const domainMax = yMaxProp ?? 300;
  const activeLbl = activeLabel ?? "We";

  // Guard: don't render until data is a non-empty array
  if (!data?.length) return null;

  return (
    <div className="w-full h-full min-h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar
          data={data}
          margin={{ top: 50, right: 10, left: 10, bottom: 45 }}
          barGap={0}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="1 1"
            stroke="var(--text-primary)"
            strokeOpacity={0.1}
          />
          <XAxis dataKey="label" hide axisLine={false} tickLine={false} />
          <YAxis
            domain={[0, domainMax]}
            ticks={[0, 100, 200, 300]}
            width={40}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--text-primary)",
              fontSize: 12,
              opacity: 0.5,
              fontFamily: "var(--font-sans)",
            }}
          />

          <Tooltip
            content={<CustomTooltip tooltipLabel={tooltipLabel} />}
            cursor={false}
          />

          <Bar
            dataKey="value"
            shape={(props: unknown) => {
              const p = props as CustomBarProps & { index: number };

              // Guard: skip if index is out of bounds or entry is missing
              if (
                p.index === undefined ||
                p.index === null ||
                !data[p.index]
              ) {
                return null;
              }

              return (
                <CustomBar
                  x={p.x}
                  y={p.y}
                  width={p.width}
                  height={p.height}
                  value={p.value}
                  activeLabel={activeLbl}
                  label={data[p.index].label}
                />
              );
            }}
            isAnimationActive={false}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;