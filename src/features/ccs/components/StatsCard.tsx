import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

type Props = { title: string; value: string; icon: string; large?: boolean };

export default function StatsCard({ title, value, icon, large }: Props) {
  return (
    <Card
      className={`flex w-full flex-col justify-between rounded-[32px] border border-[rgba(255,255,255,0.5)] bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${large ? 'h-[143px] px-[32px] pt-[28px] pb-[25px]' : 'h-[140px] px-[33px] pt-[28px] pb-[21px]'
        }`}
    >
      <div className={`flex items-start justify-between w-full ${large ? 'h-[50px]' : 'h-[40px]'} mt-[-10px]`}>
        <div className="flex flex-col pt-[10px]">
          <Typography
            variant="span"
            className="font-['Plus_Jakarta_Sans'] font-bold text-[10px] leading-[15px] uppercase tracking-[1px] text-[#45474C]"
          >
            {title}
          </Typography>
        </div>
        <div 
          className={`flex shrink-0 items-center justify-center bg-[#F3F4F5] mt-[0px] ${
            large ? 'h-[50px] w-[50px] rounded-[40px] mt-[-2px]' : 'h-[40px] w-[40px] rounded-[32px] mt-[-10px]'
          }`}
        >
          <img 
            src={icon} 
            alt={title} 
            className={`object-contain ${large ? 'h-[40px] w-[40px] scale-[1.2]' : 'h-[24px] w-[24px]'}`} 
          />
        </div>
      </div>

      <Typography
        variant="h2"
        className={`font-['Plus_Jakarta_Sans'] mt-auto ${large
          ? 'font-bold text-[36px] leading-[45px] text-[#131600]'
          : `font-extrabold text-[24px] leading-[36px] ${title.includes('Approved') ? 'text-[#091426]' : 'text-[#131600]'}`
          }`}
      >
        {value}
      </Typography>
    </Card>
  );
}