import { Typography } from '@/components/ui/typography';

type Props = {
  id: string;
  description: string;
  timeAgo: string;
};

export default function ActivityCard({ id, description, timeAgo }: Props) {
  return (
    <div className="relative flex flex-col items-start min-h-[47px] gap-0">
      <div className="flex w-full items-center justify-between h-[24px]">
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#251914]"
        >
          {id}
        </Typography>
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] leading-[20px] text-[#5D5F5F]"
        >
          {timeAgo}
        </Typography>
      </div>

      <Typography
        variant="p"
        className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[22px] text-[#5D5F5F] max-w-[342px] mt-1"
      >
        {description}
      </Typography>
    </div>
  );
}