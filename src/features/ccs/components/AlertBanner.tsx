import { Smile, ArrowUpRight } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

export default function AlertBanner() {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-[70px] bg-[#FFFFFF]
        h-[60px] 2xl:h-[82px] w-full max-w-[583px]
        pl-[20px] 2xl:pl-[35px] pr-[8px] 2xl:pr-[11px] py-[8px] 2xl:py-[11px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
      "
    >
      <div className="flex items-center gap-[10px] 2xl:gap-[13px]">
        <div className="flex shrink-0 items-center justify-center">
          <Smile className="h-[20px] w-[20px] 2xl:h-[28px] 2xl:w-[28px] text-[#4E4E4E]" strokeWidth={1.5} />
        </div>
        <Typography
          variant="p"
          className="font-['Plus_Jakarta_Sans'] font-normal text-[12px] 2xl:text-[14px] leading-[16px] 2xl:leading-[18px] text-[#4E4E4E]"
        >
          System Alert: New land submission requires initial check.
        </Typography>
      </div>

      <button className="flex shrink-0 items-center justify-center h-[44px] w-[44px] 2xl:h-[60px] 2xl:w-[60px] rounded-[79px] border-[2px] border-[#4E4E4E] hover:bg-[#F2F2F2] transition-colors">
        <ArrowUpRight className="h-[18px] w-[18px] 2xl:h-[24px] 2xl:w-[24px] text-[#4E4E4E]" strokeWidth={1.5} />
      </button>
    </div>
  );
}