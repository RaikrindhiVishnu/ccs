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

      rounded-[1rem]
      sm:rounded-[1.25rem]
      xl:rounded-[1.5rem]

      border border-[var(--border-soft)]
      bg-[var(--surface-card)]
      shadow-[var(--shadow-card)]

      p-[1rem]
      sm:p-[1.1rem]
      lg:p-[1rem]
      xl:p-[1.3125rem_1.5rem_1.375rem]

      gap-[0.5rem]
      xl:gap-[0.625rem]
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
        w-[1.875rem] h-[1.875rem]
        sm:w-[2rem] sm:h-[2rem]
        lg:w-[1.75rem] lg:h-[1.75rem]
        xl:w-[2.3125rem] xl:h-[2.3125rem]
      "
    >
      <img
        src={icon}
        alt={label}
        className="
          w-[0.9375rem] h-[0.9375rem]
          sm:w-[1rem] sm:h-[1rem]
          lg:w-[0.875rem] lg:h-[0.875rem]
          xl:w-[1.1875rem] xl:h-[1.1875rem]
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
        text-[0.8rem]
        text-[0.75rem]
        sm:text-[0.875rem]
        lg:text-[1rem]
        xl:text-[1.125rem]
        2xl:text-[1.125rem]
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
        text-[1.5rem]
      text-[1.5rem]
      sm:text-[1.75rem]
      lg:text-[2rem]
      xl:text-[2.75rem]
      2xl:text-[2.75rem]
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

      gap-[1rem]
      sm:gap-[1.1rem]
      lg:gap-[0.75rem]
      xl:gap-[1.375rem]
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