import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

export type FarmlandRequestItem = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  farmlandId: string;
  location: string;
  time: string;
  area: string;
  value: string;
  amount: string;
};

type Props = {
  item: FarmlandRequestItem;
  onClick?: (id: string) => void;
};

export default function FarmlandRequestCard({ item, onClick }: Props) {
  return (
    <Card
      className="
        relative flex flex-col justify-between
        rounded-[2rem] border-0 bg-[var(--surface-card)]
        p-6 shadow-[var(--shadow-card)]
        transition-shadow hover:shadow-[var(--shadow-dropdown)]
        lg:p-7
        xl:p-8
        2xl:p-8
        min-h-[280px]
        lg:min-h-[300px]
        xl:min-h-[334px]
      "
    >
      {/* ── CARD HEADER ── */}
      <div className="mb-5 flex items-center gap-3 lg:mb-6 xl:mb-8 xl:gap-4">
        {/* Avatar */}
        <div
          className="
            h-12 w-12 shrink-0
            lg:h-[3.25rem] lg:w-[3.25rem]
            xl:h-14 xl:w-14
          "
        >
          <img
            src={item.avatar}
            alt={item.name}
            className="h-full w-full rounded-full border-[1.4px] border-white object-cover"
          />
        </div>

        {/* Name + Role */}
        <div className="flex min-w-0 flex-col gap-[2px]">
          <Typography
            variant="h3"
            className="
              truncate font-['Manrope'] text-[1rem] font-bold
              leading-[1.75rem] tracking-normal text-[#1A1C1D]
              lg:text-[1.125rem]
              xl:text-[1.25rem]
            "
          >
            {item.name}
          </Typography>
          <Typography
            as="span"
            variant="span"
            className="
              font-['Inter'] text-[0.75rem] font-medium
              leading-5 text-[rgba(61,73,73,0.7)]
              lg:text-[0.8125rem]
              xl:text-[0.875rem]
            "
          >
            {item.role}
          </Typography>
        </div>
      </div>

      {/* ── DATA GRID — 2 col × 3 rows ── */}
      <div
        className="
          grid grid-cols-2
          gap-x-3 gap-y-4
          lg:gap-x-4 lg:gap-y-[1.375rem]
          xl:gap-x-4 xl:gap-y-[1.5rem]
          2xl:gap-y-[1.75rem]
        "
      >
        <InfoField label="Farmland ID" value={item.farmlandId} />
        <InfoField label="Location"    value={item.location} />
        <InfoField label="Time"        value={item.time} />
        <InfoField label="Area"        value={item.area} />
        <InfoField label="Value"       value={item.value}  accent />
        <InfoField label="Amount"      value={item.amount} accent />
      </div>

      {/* ── CTA BUTTON — absolute bottom-right matching Figma 25px offsets ── */}
      <button
        aria-label={`View details for ${item.name}`}
        onClick={() => onClick?.(item.id)}
        className="
          absolute
          bottom-[1.3rem] right-[1.3rem]
          lg:bottom-[1.5rem] lg:right-[1.5rem]
          xl:bottom-[1.5625rem] xl:right-[1.5625rem]
          flex h-11 w-11 items-center justify-center
          lg:h-12 lg:w-12
          rounded-full
          border border-[rgba(188,201,201,0.1)]
          bg-[#F9F9FB]
          transition-colors
          hover:border-[var(--brand-500)] hover:bg-[var(--brand-tint)]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]
        "
      >
        <ArrowRight
          className="h-[0.875rem] w-[0.875rem] lg:h-4 lg:w-4 text-[var(--brand-500)]"
          strokeWidth={2}
        />
      </button>
    </Card>
  );
}

/* ── InfoField helper ── */
function InfoField({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-[3px] lg:gap-1">
      {/* Label — uppercase, tracking, muted */}
      <Typography
        as="span"
        variant="span"
        className="
          font-['Inter'] text-[0.625rem] font-medium
          uppercase leading-4 tracking-[0.0375rem]
          text-[rgba(61,73,73,0.6)]
          lg:text-[0.6875rem]
          xl:text-[0.75rem]
        "
      >
        {label}
      </Typography>

      {/* Value */}
      <Typography
        as="span"
        variant="span"
        className={[
          'font-[\'Inter\'] font-semibold leading-6',
          'text-[0.875rem] lg:text-[0.9375rem] xl:text-[1rem]',
          accent ? 'text-[var(--brand-500)]' : 'text-[#1A1C1D]',
        ].join(' ')}
      >
        {value}
      </Typography>
    </div>
  );
}