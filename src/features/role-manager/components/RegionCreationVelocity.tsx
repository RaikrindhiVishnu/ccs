import React from "react";
import { useGetRegionCreationVelocityQuery } from "@/features/role-manager/api/agentApi";
import DateRangePicker from "@/components/ui/DateRangePicker";
import { Typography } from "@/components/ui/typography";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceArea,
  Tooltip,
} from "recharts";



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
      <div className="bg-[var(--surface-card)] border border-[var(--border-soft)] p-[0.625rem_0.75rem] rounded-xl shadow-xl">
        <Typography
          variant="span"
          className="block font-bold text-[clamp(0.6875rem,0.7vw,0.75rem)] mb-[0.125rem] text-[var(--text-primary)]"
        >
          {label}
        </Typography>
        <Typography
          variant="span"
          className="block text-[clamp(0.625rem,0.65vw,0.6875rem)] text-[var(--brand-500)] font-semibold"
        >
          Velocity: {payload[0].value}
        </Typography>
      </div>
    );
  }
  return null;
};

// ── Peak hollow-ring dot ──────────────────────────────────────────────────────

const PeakDot = (props: any) => {
  const { cx, cy } = props;

  return (
    <g>
      <defs>
        <radialGradient id="peakDotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--surface-card)" />
          <stop offset="100%" stopColor="var(--brand-200)" />
        </radialGradient>
      </defs>

      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="url(#peakDotGrad)"
        stroke="var(--brand-200)"
        strokeWidth={3}
      />
    </g>
  );
};

// ── Peak column highlight ─────────────────────────────────────────────────────

const PeakColumnShape = (props: any) => {
  const { x, y, width, height } = props;

  if (!x || !y || !width || !height) return null;

  const colW = 20;
  const colX = x + width / 2 - colW / 2;
  const id = "colHighlightGrad";

  return (
    <g>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-200)" stopOpacity={0.92} />
          <stop offset="100%" stopColor="var(--surface-card)" stopOpacity={0} />
        </linearGradient>
      </defs>

      <rect
        x={colX}
        y={y}
        width={colW}
        height={height}
        rx={8}
        ry={8}
        fill={`url(#${id})`}
        opacity={0.3}
        stroke="var(--brand-tint-strong)"
        strokeWidth={0.2}
      />
    </g>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

const RegionCreationVelocity: React.FC = () => {
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>(
    () => {
      const to = new Date();
      const from = new Date();

      from.setDate(from.getDate() - 6);

      return { from, to };
    },
  );

  const {
    data: apiData,
    isLoading,
    error,
  } = useGetRegionCreationVelocityQuery({
    startDate: `${dateRange.from.getFullYear()}-${String(dateRange.from.getMonth() + 1).padStart(2, '0')}-${String(dateRange.from.getDate()).padStart(2, '0')}`,
    endDate: `${dateRange.to.getFullYear()}-${String(dateRange.to.getMonth() + 1).padStart(2, '0')}-${String(dateRange.to.getDate()).padStart(2, '0')}`,
    offset: "0",
  });

  const generateDateRange = (start: Date, end: Date) => {
    const dates = [];
    const currentDate = new Date(start);
    currentDate.setHours(0, 0, 0, 0);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const chartData = generateDateRange(dateRange.from, dateRange.to).map((date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const matchingItem = apiData?.data?.find((item) => {
      return item.creationDate.startsWith(dateStr);
    });

    return {
      label: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: matchingItem ? matchingItem.totalRegions : 0,
    };
  });
  const maxValue =
    chartData.length > 0
      ? Math.max(...chartData.map((item) => item.value))
      : 0;

  const yAxisMax = Math.ceil(maxValue * 1.2);

  const tickCount = 5;

  const step =
    yAxisMax > 0 ? Math.ceil(yAxisMax / tickCount) : 1;

  const ticks = Array.from(
    { length: tickCount + 1 },
    (_, i) => i * step
  );

  const PEAK_VAL =
    chartData.length > 0 ? Math.max(...chartData.map((item) => item.value)) : 0;

  const peakItem = chartData.find((item) => item.value === PEAK_VAL);

  return (
    <div className="card p-[clamp(0.75rem,2vw,1.5rem)_clamp(1rem,2.5vw,2rem)] w-full flex-1 min-h-0 box-border flex flex-col overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start mb-[clamp(0.75rem,1.5vh,1.5rem)] shrink-0">
        <div className="flex flex-col gap-[clamp(0.25rem,0.5vh,0.5rem)]">
          <Typography
            as="p"
            variant="p"
            className="m-0 font-medium text-[clamp(0.875rem,1.5vw,1.25rem)] leading-[110%] text-[var(--text-primary)]"
          >
            Region Creation Velocity
          </Typography>

          <Typography
            as="p"
            variant="p"
            className="m-0 font-normal text-[clamp(0.6875rem,1vw,0.875rem)] leading-[110%] text-[var(--text-primary)] opacity-60"
          >
            Weekly overview of Region Creation Velocity
          </Typography>
        </div>

        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          maxDays={7}
          onRangeChange={(range) => {
            if (range) setDateRange(range);
          }}
        />
      </div>

      {/* ── Chart ──────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 w-full relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Typography
              variant="span"
              className="text-[var(--text-muted)] text-[0.875rem]"
            >
              Loading...
            </Typography>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <Typography
              variant="span"
              className="text-[var(--status-danger)] text-[0.875rem]"
            >
              Failed to load data
            </Typography>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <Typography
              variant="span"
              className="text-[0.875rem] text-[var(--text-muted)]"
            >
              No data available
            </Typography>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 44, right: 10, left: -25, bottom: 0 }}
            >
              <defs>
                {/* Area fill */}
                <linearGradient id="rcvGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--brand-500)"
                    stopOpacity={0.55}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--surface-card)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              {/* Horizontal grid only */}
              <CartesianGrid
                vertical={false}
                strokeDasharray="0"
                stroke="var(--chart-grid)"
              />

              {/* X-axis */}
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={(props) => {
                  const x = props.x as number;
                  const y = props.y as number;
                  const payload = props.payload as { value: string };

                  const isPeak = payload.value === peakItem?.label;

                  return (
                    <text
                      x={x}
                      y={y + 12}
                      textAnchor="middle"
                      fontFamily="var(--font-sans)"
                      fontSize={11}
                      fontWeight={isPeak ? 600 : 400}
                      fill="var(--text-primary)"
                      opacity={isPeak ? 1 : 0.5}
                    >
                      {payload.value}
                    </text>
                  );
                }}
              />

              {/* Y-axis */}
              <YAxis
                domain={[0, yAxisMax]}
                ticks={ticks}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "var(--chart-axis-text)",
                  fontSize: 11,
                  fontFamily: "var(--font-sans)",
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              {/* Peak highlight */}
              {peakItem && (
                <ReferenceArea
                  x1={peakItem.label}
                  x2={peakItem.label}
                  shape={<PeakColumnShape />}
                  ifOverflow="hidden"
                />
              )}

              {/* Area */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--brand-500)"
                strokeWidth={2}
                strokeOpacity={0.5}
                fillOpacity={1}
                fill="url(#rcvGrad)"
                isAnimationActive={false}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "var(--chart-dot)",
                  stroke: "var(--surface-card)",
                  strokeWidth: 2,
                }}
              />

              {/* Peak dot */}
              {peakItem && (
                <ReferenceDot
                  x={peakItem.label}
                  y={PEAK_VAL}
                  r={0}
                  shape={<PeakDot />}
                  label={(props: ReferenceDotLabelProps) => {
                    const { cx = 0, cy = 0 } = props;

                    const bW = 46;
                    const bH = 28;

                    return (
                      <foreignObject
                        x={cx - bW / 2}
                        y={cy - bH - 14}
                        width={bW}
                        height={bH}
                        style={{ overflow: "visible" }}
                      >
                        <div
                          style={{
                            width: `${bW}px`,
                            height: `${bH}px`,
                            background: "var(--chart-badge-bg)",
                            border: "1px solid var(--chart-badge-border)",
                            borderRadius: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-sans)",
                            fontWeight: 600,
                            fontSize: "clamp(10px, 0.9vw, 14px)",
                            lineHeight: "18px",
                            color: "var(--chart-badge-text)",
                          }}
                        >
                          {PEAK_VAL}
                        </div>
                      </foreignObject>
                    );
                  }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default RegionCreationVelocity;
