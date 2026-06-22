import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { WeekDropdown } from "@/components/ui/Dropdown";
import { PERFORMANCE_DATA } from "../data/PerformanceMetrics.dummy";

/* ────────────────────────────────────────────────────────── */
/* ACTIVE DOT */
/* ────────────────────────────────────────────────────────── */

const ActiveDot = () => (
  <div
    className="
      rounded-full
      border-[0.0375rem] border-[rgba(0,0,0,0.4)]
      bg-white
      w-[clamp(0.5328rem,1.11vw,1.0rem)]
      h-[clamp(0.5328rem,1.11vw,1.0rem)]
    "
  />
);

/* ────────────────────────────────────────────────────────── */
/* LEGEND */
/* ────────────────────────────────────────────────────────── */

const ChartLegend = () => (
  <div
    className="
      flex items-center justify-end
      gap-[clamp(1.6656rem,3.47vw,3.125rem)]
      pt-[clamp(0.48rem,1.0vw,1.0rem)]
      pr-[clamp(0.48rem,1.0vw,1.0rem)]
    "
  >
    {/* APPROVED */}
    <div className="flex items-center gap-[clamp(0.2812rem,0.5vw,0.625rem)]">
      <span
        className="
          rounded-full
          bg-[var(--performance-approved)]
          w-[clamp(0.6336rem,1.32vw,1.1875rem)]
          h-[clamp(0.6336rem,1.32vw,1.1875rem)]
        "
      />
      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]
          tracking-[0.0169rem]
          text-[var(--text-primary)]
          text-[clamp(0.4219rem,0.81vw,0.733rem)]
          leading-[clamp(0.5156rem,1.04vw,0.9375rem)]
        "
      >
        Approved
      </Typography>
    </div>

    {/* REJECTION */}
    <div className="flex items-center gap-[clamp(0.2812rem,0.5vw,0.625rem)]">
      <span
        className="
          flex items-center justify-center
          rounded-full
          bg-white
          border-[0.0825rem] border-[var(--performance-pill-border)]
          w-[clamp(0.6336rem,1.32vw,1.1875rem)]
          h-[clamp(0.6336rem,1.32vw,1.1875rem)]
        "
      >
        <span
          className="
            border-t border-dashed
            border-[var(--text-primary)]
            w-[clamp(0.3648rem,0.76vw,0.6875rem)]
          "
        />
      </span>
      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]
          tracking-[0.0169rem]
          text-[var(--text-primary)]
          text-[clamp(0.4219rem,0.81vw,0.733rem)]
          leading-[clamp(0.5156rem,1.04vw,0.9375rem)]
        "
      >
        Rejection
      </Typography>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────── */
/* CUSTOM TOOLTIP */
/* ────────────────────────────────────────────────────────── */

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (!active || !payload?.length) return null;

  const approved = payload.find((p) => p.dataKey === "approved")?.value;
  const rejection = payload.find((p) => p.dataKey === "rejection")?.value;

  return (
    <div className="flex items-center gap-[clamp(0.168rem,0.35vw,0.3125rem)]">
      {/* REJECTION (Dashed) */}
      <div
        className="
          flex items-center justify-center
          rounded-[clamp(0.5664rem,1.18vw,1.0625rem)]
          border-[0.0375rem] border-dashed border-[var(--text-primary)]
          bg-white
          w-[clamp(1.5312rem,3.19vw,2.875rem)]
          h-[clamp(0.8688rem,1.81vw,1.625rem)]
          text-[clamp(0.5625rem,1.11vw,1.0rem)]
          font-semibold
          font-[var(--font-sans)]
          text-[var(--text-primary)]
        "
      >
        {rejection}
      </div>
      {/* APPROVED (Solid Black) */}
      <div
        className="
          flex items-center justify-center
          rounded-[clamp(0.5664rem,1.18vw,1.0625rem)]
          bg-[var(--text-primary)]
          w-[clamp(1.5312rem,3.19vw,2.875rem)]
          h-[clamp(0.8688rem,1.81vw,1.625rem)]
          text-[clamp(0.5625rem,1.11vw,1.0rem)]
          font-semibold
          font-[var(--font-sans)]
          text-[var(--surface-sidebar-text)]
        "
      >
        {approved}
      </div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────── */
/* MAIN CARD */
/* ────────────────────────────────────────────────────────── */

export const PerformanceMetricsCard = () => {
  return (
    <Card
      className="
        flex flex-col
        h-full
        rounded-[clamp(0.9375rem,1.94vw,1.75rem)]
        border-0
        bg-[var(--performance-card-bg)]
        shadow-none
        w-full
        pt-[clamp(0.8352rem,1.74vw,1.5625rem)]
        pb-[clamp(0.5664rem,1.18vw,1.0625rem)]
        pl-[clamp(0.8016rem,1.67vw,1.5rem)]
        pr-[clamp(2.16rem,4.5vw,4.0rem)]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-start justify-between
          gap-[clamp(0.48rem,1.0vw,1.0rem)]
          shrink-0
        "
      >
        <div className="flex flex-col gap-[clamp(0.7344rem,1.53vw,1.375rem)]">
          <Typography
            variant="span"
            className="
              font-medium
              font-[var(--font-sans)]
              leading-[110%]
              text-[var(--text-primary)]
              text-[clamp(0.888rem,1.85vw,1.6625rem)]
            "
          >
            Performance metrics
          </Typography>

          <Typography
            variant="span"
            className="
              font-semibold
              font-[var(--font-sans)]
              text-[var(--text-secondary)]
              text-[clamp(0.6192rem,1.29vw,1.1625rem)]
              leading-[clamp(0.8016rem,1.67vw,1.5rem)]
            "
          >
            Approval vs Rejection
          </Typography>
        </div>

        <WeekDropdown />
      </div>

      {/* CHART */}
      <div
        className="
          mt-[clamp(2.2656rem,4.72vw,4.25rem)]
          flex-1
          min-h-[clamp(5.664rem,11.8vw,11.625rem)]
          w-full
        "
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={PERFORMANCE_DATA}
            margin={{
              top: 30,
              right: 10,
              left: -24,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="approvedGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="3.99%"
                  stopColor="var(--performance-area-start)"
                  stopOpacity={1}
                />
                <stop
                  offset="113.27%"
                  stopColor="var(--performance-area-end)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--performance-grid)"
              strokeWidth={1.33}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: "clamp(0.5156rem,1.05vw,0.944rem)",
                fontFamily: "var(--font-sans)",
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[0, 100, 200, 300, 400, 500]}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: "clamp(0.5156rem,1.05vw,0.944rem)",
                fontFamily: "var(--font-sans)",
              }}
            />

            <Tooltip cursor={false} content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="approved"
              stroke="none"
              fill="url(#approvedGradient)"
            />

            <Line
              type="monotone"
              dataKey="rejection"
              stroke="var(--performance-line)"
              strokeWidth={0.6}
              strokeDasharray="3 3"
              dot={false}
              activeDot={<ActiveDot />}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER */}
      <div className="shrink-0">
        <ChartLegend />
      </div>
    </Card>
  );
};
export default PerformanceMetricsCard;