import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

function ScreeningPaceCard({ value = 76 }: { value?: number }) {
  const totalTicks = 18;
  const filledTicks = Math.round(totalTicks * (value / 100));
  const cx = 80, cy = 80, r = 64, tickLen = 17, tickGap = 0;

  const ticks = Array.from({ length: totalTicks }, (_, i) => {
    const angle = 180 + (i / (totalTicks - 1)) * 180;
    const rad = (angle * Math.PI) / 180;
    return {
      x1: cx + (r - tickGap) * Math.cos(rad),
      y1: cy + (r - tickGap) * Math.sin(rad),
      x2: cx + (r - tickGap - tickLen) * Math.cos(rad),
      y2: cy + (r - tickGap - tickLen) * Math.sin(rad),
      filled: i < filledTicks,
    };
  });

  return (
    <Card
      className="
        relative flex flex-col rounded-[23.18px] border-0
        bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
        h-[194px] w-full
      "
    >
      <div className="absolute top-[20.05px] left-[20.5px] right-[20px] flex items-start justify-between px-[10px]">
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-bold text-[14.15px] leading-[17px] text-[#0E0D3D]"
        >
          Screening Pace
        </Typography>
        <div className="flex items-start leading-none gap-[2px]">
          <Typography
            variant="span"
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[30px] leading-[36px] text-[#0E0D3D] mt-[-1.77px]"
          >
            {value}
          </Typography>
          <Typography
            variant="span"
            className="mt-[1.25px] font-['Plus_Jakarta_Sans'] font-semibold text-[19.5px] leading-[23px] text-[#9090AE]"
          >
            %
          </Typography>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center mt-12 relative">
        <svg className="w-[185px]" height="95.55" viewBox="0 0 160 85">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.filled ? '#2780C4' : '#C1CFEE'}
              strokeWidth={5}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div 
          className={`absolute bottom-[16px] font-['Plus_Jakarta_Sans'] font-semibold text-[#0E0D3D] tracking-[-1px] ${String(value).length > 3 ? 'text-[24px]' : 'text-[30px]'}`}
        >
          {Number.isInteger(value) ? value : Number(value).toFixed(1)}%
        </div>
      </div>
    </Card>
  );
}

function AverageReviewTimeCard({ time = "1.2 hr" }: { time?: string }) {
  // Exact coordinates from Figma export for pixel-perfect match
  const whiteBars = [
    { x: 30.96, y: 114.10, h: 13.27 }, { x: 43.34, y: 105.26, h: 11.50 },
    { x: 55.73, y: 92.88,  h: 16.81 }, { x: 68.99, y: 112.34, h: 15.92 },
    { x: 82.26, y: 110.56, h: 11.50 }, { x: 95.53, y: 107.02, h: 11.50 },
    { x: 108.80, y: 114.10, h: 11.50 }, { x: 122.07, y: 104.38, h: 13.27 },
    { x: 135.33, y: 107.02, h: 14.15 }, { x: 147.72, y: 104.38, h: 13.27 },
    { x: 160.98, y: 99.07,  h: 15.04 }, { x: 174.25, y: 109.68, h: 22.11 },
    { x: 187.52, y: 118.52, h: 11.50 }, { x: 200.79, y: 109.68, h: 17.69 },
    { x: 214.06, y: 104.38, h: 16.81 }, { x: 227.32, y: 112.34, h: 15.04 },
    { x: 240.59, y: 107.91, h: 12.38 }, { x: 253.86, y: 110.56, h: 12.38 },
  ];

  const cyanBars = [
    { x: 30.96, y: 137.11, h: 13.27 }, { x: 43.34, y: 127.38, h: 11.50 },
    { x: 55.73, y: 118.53, h: 16.81 }, { x: 68.99, y: 136.22, h: 15.92 },
    { x: 82.26, y: 131.80, h: 11.50 }, { x: 95.53, y: 128.26, h: 11.50 },
    { x: 108.80, y: 135.34, h: 11.50 }, { x: 122.07, y: 126.49, h: 13.27 },
    { x: 135.33, y: 129.15, h: 14.15 }, { x: 147.72, y: 126.49, h: 13.27 },
    { x: 160.98, y: 122.95, h: 15.04 }, { x: 174.25, y: 140.64, h: 19.46 },
    { x: 187.52, y: 137.99, h: 11.50 }, { x: 200.79, y: 136.22, h: 17.69 },
    { x: 214.06, y: 130.03, h: 16.81 }, { x: 227.32, y: 135.34, h: 15.04 },
    { x: 240.59, y: 129.15, h: 12.38 }, { x: 253.86, y: 130.91, h: 12.38 },
  ];

  return (
    <Card
      className="
        relative flex flex-col rounded-[23.18px] border-0
        bg-[#2780C4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
        h-[194px] w-full
      "
    >
      <div className="absolute top-[20.3px] left-[20.5px] right-[20px] flex items-start justify-between px-[10px] z-10">
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-bold text-[14.15px] leading-[17px] text-[#FFFFFF] mt-[4px]"
        >
          Average Review Time
        </Typography>
        <div className="flex items-baseline gap-[4px]">
          <Typography
            variant="span"
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[42px] leading-[42px] text-[#FFFFFF]"
          >
            {time?.split(' ')[0]}
          </Typography>
          <Typography
            variant="span"
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[22px] leading-[22px] text-[#FFFFFF]"
          >
            {time?.split(' ')[1] || 'hr'}
          </Typography>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 282.16 193.71" preserveAspectRatio="none">
          {whiteBars.map((b, i) => (
            <rect key={`w-${i}`} x={b.x} y={b.y} width="4.42" height={b.h} rx="2.21" fill="#FFFFFF" />
          ))}
          {cyanBars.map((b, i) => (
            <rect key={`c-${i}`} x={b.x} y={b.y} width="4.42" height={b.h} rx="2.21" fill="#61CAEB" />
          ))}
        </svg>
      </div>
    </Card>
  );
}

import { useEffect } from 'react';
import { format } from 'date-fns';
import { useGetDashboardPipelineStatusMutation } from '@/features/ccs/api/dashboardApi';

interface PipelineStatusProps {
  startDate?: Date | null;
  endDate?: Date | null;
}

export default function PipelineStatus({ startDate, endDate }: PipelineStatusProps) {
  const [getPipelineStatus, { data }] = useGetDashboardPipelineStatusMutation();

  useEffect(() => {
    // If custom dates are selected, pass them. Otherwise omit them.
    const payload = startDate && endDate ? {
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      fromDate: format(startDate, 'yyyy-MM-dd'),
      toDate: format(endDate, 'yyyy-MM-dd'),
      start_date: format(startDate, 'yyyy-MM-dd'),
      end_date: format(endDate, 'yyyy-MM-dd')
    } : {};

    getPipelineStatus(payload);
  }, [getPipelineStatus, startDate, endDate]);

  const percentage = (data as any)?.["screening Pace"] || data?.screeningPercentage || 0;
  
  const avgTimeRaw = (data as any)?.AverageReviewTime;
  const timeStr = avgTimeRaw !== undefined 
    ? `${(avgTimeRaw / 3600).toFixed(1)} hr` 
    : data?.totalTimeTakenMinutes ? `${(data.totalTimeTakenMinutes / 60).toFixed(1)} hr` : "0.0 hr";

  return (
    <div className="grid grid-cols-2 gap-[19px]">
      <ScreeningPaceCard value={percentage} />
      <AverageReviewTimeCard time={timeStr} />
    </div>
  );
}