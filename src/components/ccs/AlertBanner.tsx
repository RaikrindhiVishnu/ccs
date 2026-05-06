import { ArrowUpRight } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import alertIcon from '@/assets/alert.svg';

export default function AlertBanner() {
  return (
    <div
      className="
        flex items-center justify-between gap-3
        rounded-[3.75rem] bg-[var(--card)]
        px-[1.875rem] py-[1.375rem] shadow-[var(--shadow-card-sm)]
        lg:gap-4 lg:px-[2rem] lg:py-[1.5rem]
        xl:px-[2.1875rem] xl:py-[1.6875rem]
        2xl:rounded-[4.94rem]
      "
    >
      <div className="flex min-w-0 flex-1 items-center gap-[0.75rem] lg:gap-[0.8125rem]">
        <div className="flex h-[1.6rem] w-[1.6rem] shrink-0 items-center justify-center xl:h-[1.75rem] xl:w-[1.75rem]">
          <img
            src={alertIcon}
            alt="Alert"
            className="h-[1.375rem] w-[1.375rem] object-contain xl:h-[1.53125rem] xl:w-[1.53125rem]"
          />
        </div>
        <Typography
          variant="p"
          className="line-clamp-2 text-[0.8125rem] font-normal leading-[120%] text-[#4E4E4E] lg:text-[0.875rem]"
        >
          System Alert: New land submission (Land ID: GLC SOS 01) requires initial check.
        </Typography>
      </div>

      {/* Icon-only circle button — no matching variant, keep raw */}
      <button
        className="
          flex h-[2.875rem] w-[2.875rem] shrink-0 items-center justify-center
          rounded-full border-2 border-[#4E4E4E] bg-transparent
          transition-colors hover:bg-[var(--primary-soft)]
          xl:h-[3.25rem] xl:w-[3.25rem] 2xl:h-[3.75rem] 2xl:w-[3.75rem]
        "
      >
        <ArrowUpRight className="h-[1.125rem] w-[1.125rem] text-[#4E4E4E] xl:h-5 xl:w-5" strokeWidth={2} />
      </button>
    </div>
  );
}