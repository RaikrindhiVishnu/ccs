
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { FARMLAND_STATS } from "../data/Farmlandstats.dummy";

/* ────────────────────────────────────────────────────────── */
/* TYPES */
/* ────────────────────────────────────────────────────────── */

interface FarmlandStatCardProps {
  label: string;
  value: string | number;
  icon: string;
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

      rounded-[1.5rem]

      border border-[var(--border-soft)]

      bg-[var(--surface-card)]

      shadow-[var(--shadow-card)]

      p-[1.3125rem_1.5rem_1.375rem]

      gap-[0.625rem]
      `,
      className,
    )}
  >
    {/* ICON */}

    <div
      className="
        flex items-center justify-center

        rounded-[0.625rem]

        bg-[var(--surface-page)]

        w-[2.3125rem]
        h-[2.3125rem]
      "
    >
      <img
        src={icon}
        alt={label}
        className="
          w-[1.1875rem]
          h-[1.1875rem]

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

        leading-[1.4375rem]

        opacity-70

        text-[1.0625rem]
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

        text-[clamp(1.75rem,2.5vw,2.75rem)]
      "
    >
      {typeof value === "number"
        ? value.toLocaleString()
        : value}
    </Typography>
  </Card>
);

/* ────────────────────────────────────────────────────────── */
/* GRID */
/* ────────────────────────────────────────────────────────── */

export const FarmlandStatsCards = ({
  className,
}: {
  className?: string;
}) => (
  <div
    className={cn(
      `
      grid

      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4

      gap-[1.375rem]
      `,
      className,
    )}
  >
    {FARMLAND_STATS.map((stat) => (
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