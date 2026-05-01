import React from "react";
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--card)] border border-[var(--border)] p-3 rounded-lg shadow-xl">
        <p className="font-sans font-bold text-[12px] mb-1 text-[var(--foreground)]">{label}</p>
        <p className="font-sans text-[11px] text-[var(--primary)] font-semibold">
          Velocity: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const RegionCreationVelocity: React.FC = () => {
  return (
    <div className="bg-[var(--card)] rounded-[clamp(12px,1.67vw,24px)] p-[clamp(10px,1.39vw,20px)_clamp(12px,1.67vw,24px)] w-full flex-1 min-h-[clamp(160px,20vh,280px)] box-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-[clamp(6px,0.83vw,12px)] shrink-0">
        <div>
          <div className="font-sans font-medium text-[clamp(11px,1.25vw,18px)] text-[var(--foreground)]">
            Region Creation Velocity
          </div>
          <div className="font-sans font-normal text-[clamp(9px,0.83vw,12px)] text-[var(--foreground)] opacity-60 mt-[2px]">
            Weekly overview of Region Creation Velocity
          </div>
        </div>
        <button className="border border-[var(--foreground)] rounded-[30px] p-[clamp(3px,0.35vw,5px)_clamp(4px,0.42vw,6px)] bg-transparent cursor-pointer flex items-center gap-[3px] font-sans text-[clamp(8px,0.76vw,11px)] text-[var(--foreground)] shrink-0 transition-colors hover:bg-[var(--foreground)] hover:text-[var(--card)]">
          Week
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
      <div className="flex-1 min-h-0 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 30, right: 10, left: -25, bottom: 0 }}
          >
            <defs>
              <linearGradient id="rcvGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--text-dark)"
              strokeOpacity={0.1}
            />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={(props: any) => {
                const { x, y, payload, index } = props;
                return (
                  <text
                    x={x}
                    y={y + 10}
                    textAnchor="middle"
                    className={`font-sans text-[clamp(7px,0.69vw,10px)] fill-[var(--foreground)] ${
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
                r: 3,
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
            {/* Peak Reference Dot & Tooltip */}
            <ReferenceDot
              x="Wed"
              y={PEAK_VAL}
              r={10}
              fill="var(--primary-soft)"
              stroke="var(--primary-light)"
              strokeWidth={3}
              isFront={true}
              label={(props: any) => {
                const { cx, cy } = props;
                return (
                  <foreignObject x={cx - 20} y={cy - 40} width={40} height={25}>
                    <div className="bg-[var(--tooltip-bg)] border border-[var(--border-medium)] rounded-[24px] p-[2px_6px] font-sans font-semibold text-[10px] text-[var(--text-dark)] text-center shadow-sm">
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