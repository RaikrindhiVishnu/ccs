import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';
import { AnimatedNumber } from '@/components/animations/AnimatedNumber';

type Props = { title: string; value: string; icon: string; large?: boolean; isLoading?: boolean };

export default function StatsCard({ title, value, icon, large, isLoading }: Props) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <Card
        className={`flex w-full flex-col justify-between rounded-[24px] border border-[rgba(255,255,255,0.5)] bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0px_12px_24px_rgba(0,0,0,0.08)] transition-shadow duration-300 ${
          large ? 'h-[110px] 2xl:h-[140px] px-5 2xl:px-[24px] pt-5 2xl:pt-[24px] pb-5 2xl:pb-[20px]' : 'h-[110px] 2xl:h-[140px] px-5 2xl:px-[24px] pt-5 2xl:pt-[24px] pb-5 2xl:pb-[20px]'
        }`}
      >
        <div className={`flex items-start justify-between w-full ${large ? 'h-[40px] 2xl:h-[50px]' : 'h-[32px] 2xl:h-[40px]'} mt-0 2xl:mt-0`}>
          <div className="flex flex-col pt-1 2xl:pt-0">
            <Typography
              variant="span"
              className="font-['Plus_Jakarta_Sans'] font-bold text-[9px] 2xl:text-[10px] leading-[14px] 2xl:leading-[15px] uppercase tracking-[1px] text-[#45474C]"
            >
              {title}
            </Typography>
          </div>
          <div 
            className={`flex shrink-0 items-center justify-center bg-[#F3F4F5] ${
              large ? 'h-[40px] w-[40px] 2xl:h-[50px] 2xl:w-[50px] rounded-[40px] mt-0' : 'h-[32px] w-[32px] 2xl:h-[40px] 2xl:w-[40px] rounded-[32px] mt-[-4px] 2xl:mt-[-10px]'
            }`}
          >
            <motion.img 
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              src={icon} 
              alt={title} 
              className={`object-contain ${large ? 'h-[32px] w-[32px] 2xl:h-[40px] 2xl:w-[40px] scale-[1.2]' : 'h-[20px] w-[20px] 2xl:h-[24px] 2xl:w-[24px]'}`} 
            />
          </div>
        </div>

        <div className={`mt-auto ${large ? 'h-[36px] 2xl:h-[45px]' : 'h-[28px] 2xl:h-[36px]'} flex items-center`}>
          {isLoading ? (
            <div className={`rounded-md bg-gray-200 animate-pulse ${large ? 'h-[36px] w-2/3 2xl:h-[45px]' : 'h-[28px] w-1/2 2xl:h-[36px]'}`} />
          ) : (
            <Typography
              variant="h2"
              className={`font-['Plus_Jakarta_Sans'] ${
                large
                  ? 'font-bold text-[28px] 2xl:text-[36px] leading-[36px] 2xl:leading-[45px] text-[#131600]'
                  : `font-extrabold text-[20px] 2xl:text-[24px] leading-[28px] 2xl:leading-[36px] ${title.includes('Approved') ? 'text-[#091426]' : 'text-[#131600]'}`
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