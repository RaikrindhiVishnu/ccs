import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/components/animations/AnimatedNumber';

type Props = { title: string; value: string; icon: string; large?: boolean; isLoading?: boolean };

export default function StatsCard({ title, value, icon, large, isLoading }: Props) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card
        className={`flex w-full flex-col justify-between rounded-[32px] border border-[rgba(255,255,255,0.5)] bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 ${large ? 'h-[143px] px-[32px] pt-[28px] pb-[25px]' : 'h-[140px] px-[33px] pt-[28px] pb-[21px]'
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
            <motion.img 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              src={icon} 
              alt={title} 
              className={`object-contain ${large ? 'h-[40px] w-[40px] scale-[1.2]' : 'h-[24px] w-[24px]'}`} 
            />
          </div>
        </div>

        <div className={`mt-auto ${large ? 'h-[45px]' : 'h-[36px]'} flex items-center`}>
          {isLoading ? (
            <div className={`rounded-md bg-gray-200 animate-pulse ${large ? 'h-[45px] w-2/3' : 'h-[36px] w-1/2'}`} />
          ) : (
            <Typography
              variant="h2"
              className={`font-['Plus_Jakarta_Sans'] ${large
                ? 'font-bold text-[36px] leading-[45px] text-[#131600]'
                : `font-extrabold text-[24px] leading-[36px] ${title.includes('Approved') ? 'text-[#091426]' : 'text-[#131600]'}`
                }`}
            >
              {value === "-" ? "" : <AnimatedNumber value={value} />}
            </Typography>
          )}
        </div>
      </Card>
    </motion.div>
  );
}