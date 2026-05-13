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
      border
      border-[var(--performance-pill-border)]
      bg-[var(--surface-card)]
      w-[0.75rem]
      h-[0.75rem]
      xl:w-[1rem]
      xl:h-[1rem]
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
      gap-[1rem]
      xl:gap-[1.75rem]
      pt-[0.4rem]
      pr-[0.5rem]
    "
  >
    {/* APPROVED */}
    <div className="flex items-center gap-[0.35rem] xl:gap-[0.45rem]">
      <span
        className="
          rounded-full
          bg-[var(--performance-approved)]
          w-[0.75rem]
          h-[0.75rem]
          xl:w-[1.05rem]
          xl:h-[1.05rem]
        "
      />
      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]
          tracking-[0.01rem]
          text-[var(--text-primary)]
          text-[0.65rem]
          sm:text-[0.7rem]
          xl:text-[0.78rem]
        "
      >
        Approved
      </Typography>
    </div>

    {/* REJECTION */}
    <div className="flex items-center gap-[0.35rem] xl:gap-[0.45rem]">
      <span
        className="
          flex items-center justify-center
          rounded-full
          bg-[var(--surface-card)]
          border border-[var(--performance-pill-border)]
          w-[0.75rem]
          h-[0.75rem]
          xl:w-[1.05rem]
          xl:h-[1.05rem]
        "
      >
        <span
          className="
            border-t border-dashed
            border-[var(--text-primary)]
            w-[0.4rem]
            xl:w-[0.52rem]
          "
        />
      </span>
      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]
          tracking-[0.01rem]
          text-[var(--text-primary)]
          text-[0.65rem]
          sm:text-[0.7rem]
          xl:text-[0.78rem]
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
    <div className="flex items-center gap-[0.35rem]">
      <div
        className="
          rounded-full
          border border-[var(--performance-pill-border)]
          bg-[var(--surface-card)]
          px-[0.5rem]
          py-[0.18rem]
          xl:px-[0.7rem]
          xl:py-[0.22rem]
          text-[0.72rem]
          xl:text-[0.82rem]
          font-semibold
          font-[var(--font-sans)]
          text-[var(--text-primary)]
        "
      >
        {rejection}
      </div>
      <div
        className="
          rounded-full
          bg-[var(--text-primary)]
          px-[0.5rem]
          py-[0.18rem]
          xl:px-[0.72rem]
          xl:py-[0.22rem]
          text-[0.72rem]
          xl:text-[0.82rem]
          font-semibold
          font-[var(--font-sans)]
          text-[var(--surface-card)]
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
        rounded-[1.25rem]
        xl:rounded-[1.75rem]
        border-0
        bg-[var(--performance-card-bg)]
        shadow-none
        w-full
        p-[1rem]
        sm:p-[1.1rem]
        xl:p-[1.45rem]
        2xl:p-[1.65rem]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-start justify-between
          gap-[0.75rem]
          xl:gap-[1rem]
          shrink-0
        "
      >
        <div className="flex flex-col gap-[0.25rem] xl:gap-[0.35rem]">
          <Typography
            variant="span"
            className="
              font-medium
              font-[var(--font-sans)]
              leading-[110%]
              text-[var(--text-primary)]
              text-[1.1rem]
              sm:text-[1.25rem]
              lg:text-[1.35rem]
              xl:text-[1.68rem]
              2xl:text-[1.8rem]
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
              text-[0.75rem]
              sm:text-[0.82rem]
              lg:text-[0.88rem]
              xl:text-[1.05rem]
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
          mt-[1rem]
          xl:mt-[1.35rem]
          flex-1
          min-h-[12rem]
          sm:min-h-[14rem]
          xl:min-h-[16rem]
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
                  offset="0%"
                  stopColor="var(--performance-area-start)"
                  stopOpacity={0.95}
                />
                <stop
                  offset="100%"
                  stopColor="var(--performance-area-end)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--performance-grid)"
              strokeWidth={1}
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: 11,
                fontFamily: "var(--font-sans)",
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[0, 100, 200, 300, 400, 500]}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: 11,
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
              strokeWidth={1.1}
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