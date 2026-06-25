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
  <div className="flex items-center w-full min-w-0 justify-between">
    {/* LEFT */}
    <div
      className="
        flex items-center
        min-w-0
        shrink-0
        gap-[clamp(0.3504rem,0.73vw,0.657rem)]
      "
    >
      {/* DOT */}
      <span
        className="
          rounded-full shrink-0
          w-[clamp(0.3984rem,0.83vw,0.751rem)]
          h-[clamp(0.3984rem,0.83vw,0.751rem)]
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
          leading-normal
          text-[clamp(0.5156rem,1.04vw,0.938rem)]
        "
      >
        {label}
      </Typography>
    </div>

    {/* DASH */}
    <span
      className="
        flex-1
        mx-[clamp(0.72rem,1.5vw,1.5625rem)]
        border-t-[0.09375rem] border-dashed
        border-[var(--priority-dashed-border)]
        min-w-[0.5rem]
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
        text-[clamp(0.7031rem,1.46vw,1.314rem)]
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
          innerRadius="50%"
          outerRadius="93.27%"
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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* OUTER RING */}
      <div
        className="
          rounded-full
          border-[0.07375rem] border-[var(--priority-ring-border)]
          flex items-center justify-center
          w-full aspect-square
        "
      >
        {/* INNER */}
        <div
          className="
            rounded-full
            bg-[var(--priority-center-bg)]
            flex flex-col items-center justify-center
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
              text-[clamp(0.4219rem,0.82vw,0.739rem)]
              mb-[clamp(0.096rem,0.2vw,0.25rem)]
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
              text-[var(--text-primary)]/80
              text-[clamp(0.7104rem,1.48vw,1.331rem)]
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
      justify-between
      h-full
      rounded-[clamp(0.9375rem,1.94vw,1.75rem)]
      bg-[var(--priority-card-bg)]
      shadow-[var(--shadow-card)]
      border-0
      w-full

      pt-[clamp(0.8016rem,1.67vw,1.5rem)]
      pb-[clamp(1.2432rem,2.59vw,2.3325rem)]
      px-[clamp(0.96rem,2.0vw,1.5rem)]
    "
  >
    {/* CHART CONTAINER */}
    <div
      className="
        self-center
        w-[clamp(8.2031rem,17.08vw,15.375rem)]
        aspect-square
        relative
      "
    >
      <DonutChart />
    </div>

    {/* LEGEND CONTAINER */}
    <div
      className="
        w-full
        max-w-[15.48125rem]
        mx-auto
        flex flex-col
        gap-[clamp(1.1424rem,2.38vw,2.146rem)]
        mt-[clamp(1.2336rem,2.57vw,2.3125rem)]
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