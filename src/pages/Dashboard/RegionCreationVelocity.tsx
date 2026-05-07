import React from "react";
import { WeekDropdown } from "@/components/ui/Dropdown";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  Tooltip,
} from "recharts";

const data = [
  { label: "Mon", value: 280 },
  { label: "Tue", value: 180 },
  { label: "Wed", value: 499 },
  { label: "Thu", value: 340 },
  { label: "Fri", value: 300 },
  { label: "Sat", value: 280 },
  { label: "Sun", value: 310 },
];

const MAX = 500;
const PEAK_VAL = 499;

// ── Types ─────────────────────────────────────────────────────────────────────

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

interface ReferenceDotLabelProps {
  cx?: number;
  cy?: number;
}

// ── CustomTooltip ─────────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border-soft)] p-2.5 rounded-xl shadow-xl">
        <p className="font-sans font-bold text-[12px] mb-0.5 text-[var(--foreground)]">
          {label}
        </p>
        <p className="font-sans text-[11px] text-[var(--primary)] font-semibold">
          Velocity: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

// ── Component ─────────────────────────────────────────────────────────────────

const RegionCreationVelocity: React.FC = () => {
  return (
    <div className="card p-[clamp(12px,2vw,24px)_clamp(16px,2.5vw,32px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-[clamp(12px,2vh,24px)] shrink-0">
        <div className="flex flex-col gap-[clamp(4px,0.8vh,8px)]">
          <div className="font-sans font-medium text-[clamp(14px,1.5vw,20px)] leading-tight text-[var(--foreground)]">
            Region Creation Velocity
          </div>
          <div className="font-sans font-normal text-[clamp(11px,1vw,14px)] leading-tight text-[var(--foreground)] opacity-60">
            Weekly overview of Region Creation Velocity
          </div>
        </div>
        <WeekDropdown />
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 30, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="rcvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--primary)"
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor="var(--primary)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
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
              tick={(props) => {
                const x = props.x as number;
                const y = props.y as number;
                const payload = props.payload as { value: string };
                const index = props.index as number;
                return (
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    className={`font-sans text-[clamp(9px,0.7vw,11px)] fill-[var(--foreground)] ${
                      index === 3 ? "opacity-100 font-semibold" : "opacity-50"
                    }`}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis
              domain={[0, MAX]}
              ticks={[0, 100, 200, 300, 400, 500]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "var(--foreground)",
                fontSize: "clamp(9px, 0.7vw, 11px)",
                opacity: 0.5,
                fontFamily: "var(--font-sans)",
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#rcvGrad)"
              isAnimationActive={false}
              dot={{
                r: 3.5,
                fill: "var(--primary)",
                strokeWidth: 0,
              }}
              activeDot={{
                r: 5,
                fill: "var(--primary)",
                stroke: "var(--card)",
                strokeWidth: 2,
              }}
            />
            {/* Peak Reference Dot */}
            <ReferenceDot
              x="Wed"
              y={PEAK_VAL}
              r={4}
              fill="var(--primary)"
              stroke="#fff"
              strokeWidth={2}
              label={(props: ReferenceDotLabelProps) => {
                const { cx = 0, cy = 0 } = props;
                return (
                  <foreignObject x={cx - 20} y={cy - 40} width={40} height={25}>
                    <div className="bg-[#2780C4] rounded-[24px] p-[2px_6px] font-sans font-semibold text-[10px] text-white text-center shadow-md">
                      {PEAK_VAL}
                    </div>
                  </foreignObject>
                );
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegionCreationVelocity;