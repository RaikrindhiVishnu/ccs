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
        gap-[clamp(6px,0.73vw,10.51px)]
      "
    >
      {/* DOT */}
      <span
        className="
          rounded-full shrink-0
          w-[clamp(8px,0.83vw,12.01px)]
          h-[clamp(8px,0.83vw,12.01px)]
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
          text-[#000000]
          leading-normal
          text-[clamp(11px,1.04vw,15.01px)]
        "
      >
        {label}
      </Typography>
    </div>

    {/* DASH */}
    <span
      className="
        flex-1
        mx-[clamp(8px,1.5vw,25px)]
        border-t-[1.5px] border-dashed
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
        text-[#000000]
        leading-none
        text-[clamp(15px,1.46vw,21.02px)]
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
          border-[1.18px] border-[var(--priority-ring-border)]
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
              text-[#000000]
              text-[clamp(9px,0.82vw,11.83px)]
              mb-[clamp(2px,0.2vw,4px)]
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
              text-[#000000]/80
              text-[clamp(15px,1.48vw,21.29px)]
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
      rounded-[clamp(20px,1.94vw,28px)]
      bg-[var(--priority-card-bg)]
      shadow-[var(--shadow-card)]
      border-0
      w-full

      pt-[clamp(16px,1.67vw,24px)]
      pb-[clamp(24px,2.59vw,37.32px)]
      px-[clamp(16px,2vw,24px)]
    "
  >
    {/* CHART CONTAINER */}
    <div
      className="
        self-center
        w-[clamp(175px,17.08vw,246px)]
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
        max-w-[247.7px]
        mx-auto
        flex flex-col
        gap-[clamp(16px,2.38vw,34.34px)]
        mt-[clamp(16px,2.57vw,37px)]
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