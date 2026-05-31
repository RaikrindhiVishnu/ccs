import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

import { PRIORITY_DATA, TOTAL } from "../data/Prioritydata";

interface LegendRowProps {
  label: string;
  value: number;
  color: string;
}

const LegendRow = ({ label, value, color }: LegendRowProps) => (
  <div className="flex items-center w-full min-w-0">
    {/* LEFT */}
    <div
      className="
        flex items-center
        min-w-0
        shrink-0
        gap-[0.5rem]
        xl:gap-[0.66rem]
      "
    >
      {/* DOT */}
      <span
        className="
          rounded-full shrink-0
          w-[0.6rem] h-[0.6rem]
          sm:w-[0.7rem] sm:h-[0.7rem]
          xl:w-[0.75rem] xl:h-[0.75rem]
        "
        style={{ backgroundColor: color }}
      />

      {/* LABEL */}
      <Typography
        variant="span"
        className="
          truncate
          font-medium
          font-[var(--font-sans)]
          text-[var(--text-primary)]
          leading-[1.2rem]

          text-[0.72rem]
          sm:text-[0.78rem]
          lg:text-[0.82rem]
          xl:text-[0.96rem]
          2xl:text-[1rem]
        "
      >
        {label}
      </Typography>
    </div>

    {/* DASH */}
    <span
      className="
        flex-1
        mx-[0.5rem]
        xl:mx-[0.85rem]
        border-t border-dashed
        border-[var(--priority-dashed-border)]
        min-w-[1rem]
      "
    />

    {/* VALUE */}
    <Typography
      variant="span"
      className="
        shrink-0
        font-medium
        font-[var(--font-sans)]
        text-[var(--text-primary)]
        leading-none

        text-[0.9rem]
        sm:text-[1rem]
        lg:text-[1.05rem]
        xl:text-[1.28rem]
        2xl:text-[1.38rem]
      "
    >
      {value}
    </Typography>
  </div>
);

/* ────────────────────────────────────────────────────────── */
/* DONUT CHART */
/* ────────────────────────────────────────────────────────── */

const DonutChart = () => (
  <div
    className="
      relative
      flex items-center justify-center
      aspect-square w-full
    "
  >
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={PRIORITY_DATA}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius="58%"
          outerRadius="84%"
          paddingAngle={4}
          startAngle={90}
          endAngle={-270}
          strokeWidth={0}
        >
          {PRIORITY_DATA.map((entry) => (
            <Cell key={entry.label} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>

    {/* CENTER OVERLAY */}
    <div className="absolute inset-0 flex items-center justify-center">
      {/* OUTER RING */}
      <div
        className="
          rounded-full
          border border-[var(--priority-ring-border)]
          flex items-center justify-center
          w-[56%] aspect-square
        "
      >
        {/* INNER */}
        <div
          className="
            rounded-full
            bg-[var(--priority-center-bg)]
            flex flex-col items-center justify-center
            gap-[0.15rem] xl:gap-[0.2rem]
            w-[50%] aspect-square
          "
        >
          {/* TOTAL LABEL */}
          <Typography
            variant="span"
            className="
              leading-none
              font-medium
              font-[var(--font-sans)]
              text-[var(--text-primary)]

              text-[0.55rem]
              sm:text-[0.6rem]
              lg:text-[0.65rem]
              xl:text-[0.76rem]
            "
          >
            Total
          </Typography>

          {/* TOTAL VALUE */}
          <Typography
            variant="span"
            className="
              leading-none
              font-semibold
              font-[var(--font-sans)]
              text-[var(--text-primary)]
              opacity-80

              text-[0.95rem]
              sm:text-[1.05rem]
              lg:text-[1.1rem]
              xl:text-[1.4rem]
              2xl:text-[1.55rem]
            "
          >
            {TOTAL}
          </Typography>
        </div>
      </div>
    </div>
  </div>
);

/* ────────────────────────────────────────────────────────── */
/* MAIN CARD */
/* ────────────────────────────────────────────────────────── */

export const PriorityDonutCard = () => (
  <Card
    className="
      flex flex-col
      h-full
      rounded-[1.25rem]
      xl:rounded-[1.75rem]
      bg-[var(--priority-card-bg)]
      shadow-[var(--shadow-card)]
      border-0
      w-full

      p-[1rem]
      sm:p-[1.1rem]
      xl:p-[1.55rem]
      2xl:p-[1.75rem]

      gap-[1rem]
      sm:gap-[1.1rem]
      xl:gap-[1.4rem]
      2xl:gap-[1.55rem]
    "
  >
    {/* CHART */}
    <div
      className="
        self-center
        w-[9rem]
        sm:w-[10.5rem]
        lg:w-[11.5rem]
        xl:w-[14rem]
        2xl:w-[15.375rem]
      "
    >
      <DonutChart />
    </div>

    {/* LEGEND */}
    <div
      className="
        flex flex-col
        gap-[0.75rem]
        sm:gap-[0.85rem]
        xl:gap-[1.2rem]
        2xl:gap-[1.35rem]
        px-[0.25rem]
      "
    >
      {PRIORITY_DATA.map((item) => (
        <LegendRow
          key={item.label}
          label={item.label}
          value={item.value}
          color={item.color}
        />
      ))}
    </div>
  </Card>
);

export default PriorityDonutCard;