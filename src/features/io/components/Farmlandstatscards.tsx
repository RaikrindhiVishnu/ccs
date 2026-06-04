import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { FARMLAND_STATS } from "../data/Farmlandstats.dummy";

/* ────────────────────────────────────────────────────────── */
/* TYPES */
/* ────────────────────────────────────────────────────────── */

export interface FarmlandStat {
  label: string;
  value: string | number;
  icon: string;
}

interface FarmlandStatCardProps extends FarmlandStat {
  className?: string;
}

/* ────────────────────────────────────────────────────────── */
/* SINGLE CARD */
/* ────────────────────────────────────────────────────────── */

const FarmlandStatCard = ({
  label,
  value,
  icon,
  className,
}: FarmlandStatCardProps) => (
  <Card
    className={cn(
      `
      flex flex-col justify-between
      min-w-0

      rounded-[clamp(1rem,1.46vw,1.875rem)]

      border border-[var(--border-soft)]
      bg-[var(--surface-card)]
      shadow-[var(--shadow-card)]

      p-[clamp(1rem,1.46vw,1.875rem)]

      gap-[clamp(0.5rem,0.69vw,1rem)]
      `,
      className,
    )}
  >
    {/* ICON */}
    <div
      className="
        flex items-center justify-center
        rounded-[0.5rem]
        xl:rounded-[0.625rem]
        bg-[var(--surface-page)]
        w-[clamp(1.75rem,2.57vw,3.25rem)]
        h-[clamp(1.75rem,2.57vw,3.25rem)]
      "
    >
      <img
        src={icon}
        alt={label}
        className="
          w-[clamp(0.875rem,1.32vw,1.75rem)]
          h-[clamp(0.875rem,1.32vw,1.75rem)]
          object-contain
        "
      />
    </div>

    {/* LABEL */}
    <Typography
      variant="span"
      className="
        block
        text-[var(--text-primary)]
        font-[var(--font-sans)]
        font-semibold
        leading-snug
        opacity-70
        text-[clamp(0.875rem,1.25vw,1.5rem)]
      "
    >
      {label}
    </Typography>

    {/* VALUE */}
    <Typography
      variant="span"
      className="
        block
        text-[var(--text-primary)]
        font-[var(--font-sans)]
        font-bold
        tracking-[0.0625rem]
        leading-none
        text-[clamp(1.75rem,3.06vw,3.75rem)]
      "
    >
      {typeof value === "number" ? value.toLocaleString() : value}
    </Typography>
  </Card>
);

/* ────────────────────────────────────────────────────────── */
/* GRID */
/* ────────────────────────────────────────────────────────── */

export const FarmlandStatsCards = ({
  className,
  stats = FARMLAND_STATS,
}: {
  className?: string;
  stats?: FarmlandStat[];
}) => (
  <div
    className={cn(
      `
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-4
      xl:grid-cols-4

      gap-[clamp(1rem,1.53vw,2rem)]
      `,
      className,
    )}
  >
    {stats.map((stat) => (
      <FarmlandStatCard
        key={stat.label}
        label={stat.label}
        value={stat.value}
        icon={stat.icon}
      />
    ))}
  </div>
);

export default FarmlandStatsCards;