import React from "react";
import { useGetRegionCreationVelocityQuery } from "@/features/role-manager/api/agentApi";
import DateRangePicker from "@/components/ui/DateRangePicker";

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

const MAX = 500;

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
      <div className="bg-[var(--surface-card)] border border-[var(--border-soft)] p-2.5 rounded-xl shadow-xl">
        <p className="font-sans font-bold text-[12px] mb-0.5 text-[var(--text-primary)]">
          {label}
        </p>

        <p className="font-sans text-[11px] text-[var(--brand-500)] font-semibold">
          Velocity: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

// ── Component ─────────────────────────────────────────────────────────────────

const RegionCreationVelocity: React.FC = () => {
const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>(() => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 6);
  return { from, to };
});
  const {
    data: apiData,
    isLoading,
    error,
  } = useGetRegionCreationVelocityQuery({
startDate: dateRange.from.toISOString().split("T")[0],
endDate: dateRange.to.toISOString().split("T")[0],
    offset: "0",
  });

  const transformedData =
    apiData?.data?.map((item) => ({
      label: new Date(item.creationDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: item.totalRegions,
    })) || [];

  const chartData = transformedData;

  const PEAK_VAL =
    chartData.length > 0 ? Math.max(...chartData.map((item) => item.value)) : 0;

  const peakItem = chartData.find((item) => item.value === PEAK_VAL);

  return (
    <div className="card p-[clamp(12px,2vw,24px)_clamp(16px,2.5vw,32px)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-[clamp(12px,2vh,24px)] shrink-0">
        <div className="flex flex-col gap-[clamp(4px,0.8vh,8px)]">
          <div className="font-sans font-medium text-[clamp(14px,1.5vw,20px)] leading-tight text-[var(--text-primary)]">
            Region Creation Velocity
          </div>

          <div className="font-sans font-normal text-[clamp(11px,1vw,14px)] leading-tight text-[var(--text-primary)] opacity-60">
            Weekly overview of Region Creation Velocity
          </div>
        </div>

        {/* <WeekDropdown /> */}
       <DateRangePicker
  from={dateRange.from}
  to={dateRange.to}
  onRangeChange={(range) => {
    if (range) setDateRange(range);
  }}
/>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-0 w-full relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full text-red-500">
            Failed to load data
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[14px] text-black/60">
            No data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 30, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                <linearGradient id="rcvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--brand-500)"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="100%"
                    stopColor="var(--brand-500)"
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
                      className={`font-sans text-[clamp(9px,0.7vw,11px)] fill-[var(--text-primary)] ${
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
                  fill: "var(--text-primary)",
                  fontSize: "clamp(9px, 0.7vw, 11px)",
                  opacity: 0.5,
                  fontFamily: "var(--font-sans)",
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--brand-500)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#rcvGrad)"
                isAnimationActive={false}
                dot={{
                  r: 3.5,
                  fill: "var(--brand-500)",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "var(--brand-500)",
                  stroke: "var(--surface-card)",
                  strokeWidth: 2,
                }}
              />

              {/* Peak Reference Dot */}
              <ReferenceDot
                x={peakItem?.label}
                y={PEAK_VAL}
                r={4}
                fill="var(--brand-500)"
                stroke="#fff"
                strokeWidth={2}
                label={(props: ReferenceDotLabelProps) => {
                  const { cx = 0, cy = 0 } = props;

                  return (
                    <foreignObject
                      x={cx - 20}
                      y={cy - 40}
                      width={40}
                      height={25}
                    >
                      <div className="bg-[#2780C4] rounded-[24px] p-[2px_6px] font-sans font-semibold text-[10px] text-white text-center shadow-md">
                        {PEAK_VAL}
                      </div>
                    </foreignObject>
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RegionCreationVelocity;