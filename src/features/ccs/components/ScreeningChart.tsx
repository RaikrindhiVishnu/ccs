import { useEffect, useState } from 'react';
import { format, startOfWeek, addDays } from 'date-fns';
import { Typography } from '@/components/ui/typography';
import { useGetDashboardScreeningOutcomesMutation } from '@/features/ccs/api/dashboardApi';
import { motion } from 'framer-motion';

interface ScreeningChartProps {
  endDate?: Date | null;
}

export default function ScreeningChart({ endDate }: ScreeningChartProps) {
  const [getScreeningOutcomes, { data, isLoading }] = useGetDashboardScreeningOutcomesMutation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const targetDate = endDate ? format(endDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    getScreeningOutcomes({ currentDate: targetDate });
  }, [getScreeningOutcomes, endDate]);

  if (isLoading) {
    return (
      <div className="flex flex-col rounded-[33px] bg-[#F9F9F9] w-full p-[31px] pt-[32px] min-h-[245px] animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-[33px]"></div>
        <div className="flex flex-row justify-between w-full flex-wrap gap-8 items-center mt-4">
          <div className="w-[211px] h-[129.5px] bg-gray-200 rounded"></div>
          <div className="flex flex-col gap-[24px] w-[100px]">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const chartDataArray = Array.isArray((data as any)?.data) ? (data as any).data : (Array.isArray(data) ? data : []);
  const maxDaily = Math.max(1, ...chartDataArray.map((item: any) => (item.approvedFarmlands || 0) + (item.rejectedFarmlands || 0)));

  const referenceDate = endDate || new Date();
  const weekStart = startOfWeek(referenceDate);
  const currentWeekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  const days = currentWeekDays.map(d => format(d, 'EEE'));

  const paddedData = currentWeekDays.map(day => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const found = chartDataArray.find((item: any) => item.date === formattedDay);
    return found || { approvedFarmlands: 0, rejectedFarmlands: 0 };
  });

  const blueHeights = paddedData.map(item => ((item.approvedFarmlands || 0) / maxDaily) * 100);
  const cyanHeights = paddedData.map(item => ((item.rejectedFarmlands || 0) / maxDaily) * 100);

  const barW = 7;
  const barGap = 30;

  return (
    <div className="flex flex-col rounded-[33px] bg-[#F9F9F9] w-full p-[31px] pt-[32px] min-h-[245px]">
      <div className="flex justify-between items-center mb-[33px]">
        <Typography variant="h3" className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] ml-[6px]">
          Daily Screening Outcomes
        </Typography>
      </div>

      <div className="flex flex-row justify-between w-full flex-wrap gap-8 items-center">
        <div className="relative w-[211px] h-[129.5px]">
          <div className="absolute left-[11px] top-[0px] w-[187px] h-[100px]">
            <svg width="100%" height="100%" viewBox="0 0 187 100" className="overflow-visible">
              {paddedData.slice(0, 7).map((_, i) => {
                const x = i * barGap;
                const bH = blueHeights[i] > 0 ? Math.max(blueHeights[i], barW) : 0;
                const cH = cyanHeights[i] > 0 ? Math.max(cyanHeights[i], barW) : 0;
                const r = barW / 2;
                const yTopBlue = 100 - bH + r;
                const yMid = 100 - cH;
                const yBotCyan = 100 - r;

                return (
                  <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} className="cursor-pointer hover:opacity-80 transition-opacity">
                    <line x1={x} y1={0} x2={x} y2={100} stroke="transparent" strokeWidth={20} />
                    
                    {bH > 0 && (
                      <motion.line
                        initial={{ y1: yMid - (cH > 0 ? 1 : 0), y2: yMid - (cH > 0 ? 1 : 0) }}
                        animate={{ y1: yTopBlue, y2: yMid - (cH > 0 ? 1 : 0) }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        x1={x} x2={x}
                        stroke="#2780C4" strokeWidth={barW} strokeLinecap="round" className="pointer-events-none"
                      />
                    )}
                    {cH > 0 && (
                      <motion.line
                        initial={{ y1: yBotCyan, y2: yBotCyan }}
                        animate={{ y1: yMid, y2: yBotCyan }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        x1={x} x2={x}
                        stroke="#37E8DD" strokeWidth={barW} strokeLinecap="round" className="pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hover Tooltip */}
          {hoveredIndex !== null && (
            <div 
              className="absolute bg-[#FFFFFF] border border-[#E5E7EB] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] rounded-[8px] px-[10px] py-[6px] z-50 pointer-events-none flex flex-col gap-1 min-w-[90px]"
              style={{
                left: 11 + (hoveredIndex * barGap),
                bottom: '105px',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] text-[#64748B] text-center border-b border-[#F1F5F9] pb-1 mb-1">
                {format(currentWeekDays[hoveredIndex], 'MMM d, yyyy')}
              </div>
              <div className="flex justify-between items-center font-['Plus_Jakarta_Sans'] text-[12px]">
                <span className="text-[#2780C4] font-medium">Approved:</span>
                <span className="text-[#0F172A] font-bold">{paddedData[hoveredIndex].approvedFarmlands || 0}</span>
              </div>
              <div className="flex justify-between items-center font-['Plus_Jakarta_Sans'] text-[12px]">
                <span className="text-[#37E8DD] font-medium">Rejected:</span>
                <span className="text-[#0F172A] font-bold">{paddedData[hoveredIndex].rejectedFarmlands || 0}</span>
              </div>
            </div>
          )}

          {/* Labels under the chart */}
          <div className="absolute left-[11px] top-[115.5px] w-[187px]">
            {days.map((day, i) => (
              <span
                key={i}
                className="absolute font-['Inter'] font-normal text-[10px] leading-[137.52%] text-[#000000] text-center"
                style={{
                  left: i * barGap,
                  transform: 'translateX(-50%)',
                }}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        {/* Legend Container */}
        <div className="flex flex-col items-start gap-[24px] w-[100px] mb-8">
          {/* Approved */}
          <div className="flex flex-row items-center gap-[9px] w-full">
            <div className="box-border w-[17px] h-[17px] border-[2.34px] border-[#2780C4] rounded-full flex-none" />
            <span className="font-['Plus_Jakarta_Sans'] font-normal text-[12px] leading-[137.52%] text-[#000000] mt-1">
              Approved
            </span>
          </div>
          {/* Rejected */}
          <div className="flex flex-row items-center gap-[9px] w-full">
            <div className="box-border w-[17px] h-[17px] border-[2.34px] border-[#37E8DD] rounded-full flex-none" />
            <span className="font-['Inter'] font-normal text-[12px] leading-[137.52%] text-[#000000] mt-1">
              Rejected
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}