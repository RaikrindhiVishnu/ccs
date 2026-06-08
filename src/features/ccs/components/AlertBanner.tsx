import { Smile } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

export default function AlertBanner() {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-[70px] bg-[#FFFFFF]
        h-[82px] w-full
        px-[20px] py-[11px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
      "
    >
      <div className="flex items-center gap-[13px] ml-[15px]">
        {/* Simple outlined smiley icon (no black background) */}
        <div className="flex shrink-0 items-center justify-center">
          <Smile className="h-[28px] w-[28px] text-[#4E4E4E]" strokeWidth={1.5} />
        </div>
        <Typography
          variant="p"
          className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[17px] text-[#4E4E4E]"
        >
          System Alert: New land submission requires initial check.
        </Typography>
      </div>
    </div>
  );
}