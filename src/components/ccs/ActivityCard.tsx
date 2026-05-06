import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';

type Props = {
  percentage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  variant?: 'primary' | 'outline';
};

export default function ActivityCard({
  percentage,
  title,
  subtitle,
  buttonText,
  variant = 'primary',
}: Props) {
  const pct = parseInt(percentage, 10);
  const circumference = 2 * Math.PI * 18;
  const dashOffset = circumference * (1 - pct / 100);

  return (
    <div className="flex items-center justify-between gap-3">

      {/* LEFT — circle + text */}
      <div className="flex min-w-0 flex-1 items-center gap-[1rem] xl:gap-[1.125rem]">

        {/* PERCENTAGE CIRCLE */}
        <div className="relative h-[2.5rem] w-[2.5rem] shrink-0 xl:h-[2.659rem] xl:w-[2.659rem]">
          <svg width="100%" height="100%" viewBox="0 0 44 44">
            <circle cx="22" cy="22" r="18" fill="none" stroke="var(--outerbar)" strokeWidth="5" />
            <circle
              cx="22" cy="22" r="18"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 22 22)"
            />
          </svg>
          <Typography
            variant="span"
            className="absolute inset-0 flex items-center justify-center text-[0.5625rem] font-bold leading-none text-[var(--foreground)] xl:text-[0.6154rem]"
          >
            {percentage}
          </Typography>
        </div>

        {/* TITLE + SUBTITLE */}
        <div className="flex min-w-0 flex-col gap-[0.1875rem]">
          <Typography
            variant="p"
            className="truncate text-[0.75rem] font-semibold leading-[137.52%] text-[var(--foreground)] xl:text-[0.8069rem]"
          >
            {title}
          </Typography>
          <Typography
            variant="p"
            className="truncate text-[0.5625rem] font-normal leading-[137.52%] text-[var(--muted)] xl:text-[0.625rem]"
          >
            {subtitle}
          </Typography>
        </div>
      </div>

      {/* RIGHT — action button */}
      <Button
        variant={variant === 'primary' ? 'primary-sm' : 'outline-primary'}
        className="shrink-0 xl:px-4 xl:py-[0.525rem] xl:text-[0.6275rem]"
      >
        {buttonText}
      </Button>
    </div>
  );
}