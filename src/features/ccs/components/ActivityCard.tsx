import { Typography } from '@/components/ui/typography';
import { motion } from 'framer-motion';

type Props = {
  id: string;
  description: string;
  timeAgo: string;
};

export default function ActivityCard({ id, description, timeAgo }: Props) {
  return (
    <motion.div
      whileHover={{ x: 8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col items-start min-h-[47px] gap-0 cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-gray-50/50"
    >
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
        className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[22px] text-[#5D5F5F] max-w-[342px] mt-0"
      >
        {description}
      </Typography>
    </motion.div>
  );
}