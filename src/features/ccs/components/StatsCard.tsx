import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

type Props = { title: string; value: string; icon: string; large?: boolean };

export default function StatsCard({ title, value, icon, large }: Props) {
  return (
    <Card
      className="
        flex w-full flex-col justify-between rounded-[32px]
        border border-[rgba(255,255,255,0.5)] bg-[#FFFFFF]
        px-[32px] pt-[20px] pb-[32px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
        h-[140px]
      "
    >
      <div className="flex items-start justify-between w-full h-[40px]">
        <div className="flex flex-col pt-1">
          <Typography
            variant="span"
            className="font-['Plus_Jakarta_Sans'] font-bold text-[10px] leading-[15px] uppercase tracking-[1px] text-[#45474C]"
          >
            {title}
          </Typography>
        </div>
        <div 
          className={`flex shrink-0 items-center justify-center rounded-[32px] bg-[#F3F4F5] ${
            large ? 'h-[50px] w-[50px] mt-[-4px]' : 'h-[40px] w-[40px]'
          }`}
        >
          <img 
            src={icon} 
            alt={title} 
            className={`object-contain ${large ? 'h-[30px] w-[30px]' : 'h-[24px] w-[24px]'}`} 
          />
        </div>
      </div>

      <Typography
        variant="h2"
        className={`font-['Plus_Jakarta_Sans'] font-extrabold text-[#131600] mt-auto ${
          large ? 'text-[36px] leading-[45px]' : 'text-[24px] leading-[36px]'
        }`}
      >
        {value}
      </Typography>
    </Card>
  );
}