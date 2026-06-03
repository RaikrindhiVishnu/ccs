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
      border-[0.6px] border-[rgba(0,0,0,0.4)]
      bg-white
      w-[clamp(10px,1.11vw,16px)]
      h-[clamp(10px,1.11vw,16px)]
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
      gap-[clamp(20px,3.47vw,50px)]
      pt-[clamp(8px,1vw,16px)]
      pr-[clamp(8px,1vw,16px)]
    "
  >
    {/* APPROVED */}
    <div className="flex items-center gap-[clamp(6px,0.5vw,10px)]">
      <span
        className="
          rounded-full
          bg-[#94C7E9]
          w-[clamp(12px,1.32vw,19px)]
          h-[clamp(12px,1.32vw,19px)]
        "
      />
      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]
          tracking-[0.27px]
          text-[#000000]
          text-[clamp(9px,0.81vw,11.73px)]
          leading-[clamp(11px,1.04vw,15px)]
        "
      >
        Approved
      </Typography>
    </div>

    {/* REJECTION */}
    <div className="flex items-center gap-[clamp(6px,0.5vw,10px)]">
      <span
        className="
          flex items-center justify-center
          rounded-full
          bg-white
          border-[1.32px] border-[rgba(0,0,0,0.4)]
          w-[clamp(12px,1.32vw,19px)]
          h-[clamp(12px,1.32vw,19px)]
        "
      >
        <span
          className="
            border-t border-dashed
            border-[#000000]
            w-[clamp(6px,0.76vw,11px)]
          "
        />
      </span>
      <Typography
        variant="span"
        className="
          font-bold
          font-[var(--font-sans)]
          tracking-[0.27px]
          text-[#000000]
          text-[clamp(9px,0.81vw,11.73px)]
          leading-[clamp(11px,1.04vw,15px)]
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
    <div className="flex items-center gap-[clamp(3px,0.35vw,5px)]">
      {/* REJECTION (Dashed) */}
      <div
        className="
          flex items-center justify-center
          rounded-[clamp(12px,1.18vw,17px)]
          border-[0.6px] border-dashed border-[#000000]
          bg-white
          w-[clamp(32px,3.19vw,46px)]
          h-[clamp(18px,1.81vw,26px)]
          text-[clamp(12px,1.11vw,16px)]
          font-semibold
          font-[var(--font-sans)]
          text-[#000000]
        "
      >
        {rejection}
      </div>
      {/* APPROVED (Solid Black) */}
      <div
        className="
          flex items-center justify-center
          rounded-[clamp(12px,1.18vw,17px)]
          bg-[#000000]
          w-[clamp(32px,3.19vw,46px)]
          h-[clamp(18px,1.81vw,26px)]
          text-[clamp(12px,1.11vw,16px)]
          font-semibold
          font-[var(--font-sans)]
          text-[#FFFFFF]
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
        rounded-[clamp(20px,1.94vw,28px)]
        border-0
        bg-[var(--performance-card-bg)]
        shadow-none
        w-full
        pt-[clamp(16px,1.74vw,25px)]
        pb-[clamp(12px,1.18vw,17px)]
        pl-[clamp(16px,1.67vw,24px)]
        pr-[clamp(24px,4.5vw,64px)]
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-start justify-between
          gap-[clamp(8px,1vw,16px)]
          shrink-0
        "
      >
        <div className="flex flex-col gap-[clamp(8px,1.53vw,22px)]">
          <Typography
            variant="span"
            className="
              font-medium
              font-[var(--font-sans)]
              leading-[110%]
              text-[#2C2C2C]
              text-[clamp(16px,1.85vw,26.6px)]
            "
          >
            Performance metrics
          </Typography>

          <Typography
            variant="span"
            className="
              font-semibold
              font-[var(--font-sans)]
              text-[#5C5C5C]
              text-[clamp(11px,1.29vw,18.6px)]
              leading-[clamp(14px,1.67vw,24px)]
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
          mt-[clamp(16px,4.72vw,68px)]
          flex-1
          min-h-[clamp(120px,11.8vw,186px)]
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
                  stopColor="#85BFE5"
                  stopOpacity={1}
                />
                <stop
                  offset="113.27%"
                  stopColor="rgba(215, 235, 247, 0)"
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
                fontSize: "clamp(11px, 1.05vw, 15.1px)",
                fontFamily: "var(--font-sans)",
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              ticks={[0, 100, 200, 300, 400, 500]}
              tick={{
                fill: "var(--performance-axis)",
                fontSize: "clamp(11px, 1.05vw, 15.1px)",
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
              stroke="#0F2F4C"
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