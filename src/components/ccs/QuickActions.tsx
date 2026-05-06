import { Typography } from '@/components/ui/typography';
import { quickActions } from '@/data/ccs/ccsDashboardData';

export default function QuickActions() {
  return (
    <div className="w-full">
      <Typography
        variant="h3"
        className="mb-[1.25rem] text-[0.8125rem] font-semibold uppercase leading-[120%] tracking-[0.0625rem] text-[var(--foreground)] xl:mb-[1.5rem] xl:text-[0.875rem]"
      >
        Quick Actions
      </Typography>

      <div className="flex flex-wrap items-start gap-[0.875rem] xl:gap-[1.125rem] 2xl:gap-[1.3481rem]">
        {quickActions.map((item, index) => (
          <button
            key={index}
            className="
              flex h-[3.75rem] w-[3.75rem] shrink-0 items-center justify-center
              rounded-full bg-[var(--primary)]
              transition-all duration-200 hover:opacity-90
              xl:h-[4.126rem] xl:w-[4.126rem]
            "
          >
            <img
              src={item.icon}
              alt={`quick-action-${index}`}
              className="h-[2.625rem] w-[2.625rem] object-contain xl:h-[3rem] xl:w-[3rem]"
            />
          </button>
        ))}
      </div>
    </div>
  );
}