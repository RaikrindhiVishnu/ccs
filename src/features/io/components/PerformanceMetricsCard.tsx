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

      w-[1rem]
      h-[1rem]
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

      gap-[1.75rem]

      pt-[0.4rem]

      pr-[0.5rem]
    "
  >
    {/* APPROVED */}

    <div className="flex items-center gap-[0.45rem]">
      <span
        className="
          rounded-full

          bg-[var(--performance-approved)]

          w-[1rem]
          h-[1rem]

          xl:w-[1.05rem]
          xl:h-[1.05rem]
        "
      />

      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]

          text-[0.72rem]
          xl:text-[0.78rem]

          tracking-[0.01rem]

          text-[var(--text-primary)]
        "
      >
        Approved
      </Typography>
    </div>

    {/* REJECTION */}

    <div className="flex items-center gap-[0.45rem]">
      <span
        className="
          flex items-center justify-center

          rounded-full

          bg-[var(--surface-card)]

          border border-[var(--performance-pill-border)]

          w-[1rem]
          h-[1rem]

          xl:w-[1.05rem]
          xl:h-[1.05rem]
        "
      >
        <span
          className="
            border-t border-dashed

            border-[var(--text-primary)]

            w-[0.52rem]
          "
        />
      </span>

      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]

          text-[0.72rem]
          xl:text-[0.78rem]

          tracking-[0.01rem]

          text-[var(--text-primary)]
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

  const approved = payload.find(
    (p) => p.dataKey === "approved",
  )?.value;

  const rejection = payload.find(
    (p) => p.dataKey === "rejection",
  )?.value;

  return (
    <div
      className="
        flex items-center

        gap-[0.35rem]
      "
    >
      {/* REJECTION */}

      <div
        className="
          rounded-full

          border border-[var(--performance-pill-border)]

          bg-[var(--surface-card)]

          px-[0.7rem]
          py-[0.22rem]

          text-[0.82rem]

          font-semibold
          font-[var(--font-sans)]

          text-[var(--text-primary)]
        "
      >
        {rejection}
      </div>

      {/* APPROVED */}

      <div
        className="
          rounded-full

          bg-[var(--text-primary)]

          px-[0.72rem]
          py-[0.22rem]

          text-[0.82rem]

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
        rounded-[1.75rem]

        border-0

        bg-[var(--performance-card-bg)]

        shadow-none

        w-full

        min-h-[27rem]
        xl:min-h-[29rem]
        2xl:min-h-[30rem]

        p-[1.2rem]
        xl:p-[1.45rem]
        2xl:p-[1.65rem]
      "
    >
      {/* HEADER */}

      <div
        className="
          flex items-start justify-between

          gap-[1rem]
        "
      >
        {/* LEFT */}

        <div className="flex flex-col gap-[0.35rem]">
          <Typography
            variant="span"
            className="
              font-medium
              font-[var(--font-sans)]

              leading-[110%]

              text-[1.55rem]
              xl:text-[1.68rem]
              2xl:text-[1.8rem]

              text-[var(--text-primary)]
            "
          >
            Performance metrics
          </Typography>

          <Typography
            variant="span"
            className="
              font-semibold
              font-[var(--font-sans)]

              text-[0.95rem]
              xl:text-[1.05rem]

              text-[var(--text-secondary)]
            "
          >
            Approval vs Rejection
          </Typography>
        </div>

        {/* DROPDOWN */}

        <WeekDropdown />
      </div>

      {/* CHART */}

      <div
        className="
          mt-[1.35rem]

          h-[18rem]
          xl:h-[20rem]
          2xl:h-[21rem]

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
            {/* GRADIENT */}

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

            {/* GRID */}

            <CartesianGrid
              vertical={false}
              stroke="var(--performance-grid)"
              strokeWidth={1}
            />

            {/* X AXIS */}

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: 14,
                fontFamily: "var(--font-sans)",
              }}
            />

            {/* Y AXIS */}

            <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[0, 100, 200, 300, 400, 500]}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: 14,
                fontFamily: "var(--font-sans)",
              }}
            />

            {/* TOOLTIP */}

            <Tooltip
              cursor={false}
              content={<CustomTooltip />}
            />

            {/* APPROVED AREA */}

            <Area
              type="monotone"
              dataKey="approved"
              stroke="none"
              fill="url(#approvedGradient)"
            />

            {/* REJECTION LINE */}

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

      <ChartLegend />
    </Card>
  );
};

export default PerformanceMetricsCard;