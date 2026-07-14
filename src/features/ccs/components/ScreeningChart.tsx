import { useEffect } from 'react';
import { format, subDays } from 'date-fns';
import { Typography } from '@/components/ui/typography';
import { useGetDashboardScreeningOutcomesMutation } from '@/features/ccs/api/dashboardApi';

interface ScreeningChartProps {
  endDate?: Date | null;
}

export default function ScreeningChart({ endDate }: ScreeningChartProps) {
  const [getScreeningOutcomes, { data }] = useGetDashboardScreeningOutcomesMutation();

  useEffect(() => {
    // If a custom endDate is provided, we use it as the reference date for the last 7 days.
    // Otherwise, we default to TODAY.
    const targetDate = endDate ? format(endDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
    
    getScreeningOutcomes({
      currentDate: targetDate
    });
  }, [getScreeningOutcomes, endDate]);

  // Handle data wrapper if backend sends it
  const chartDataArray = Array.isArray((data as any)?.data) ? (data as any).data : (Array.isArray(data) ? data : []);

  // Compute dynamic heights based on max daily total to scale bars to max 100px
  const maxDaily = Math.max(
    1,
    ...chartDataArray.map((item: any) => (item.approvedFarmlands || 0) + (item.rejectedFarmlands || 0))
  );

  // Generate the 7 days ending on the reference date
  const referenceDate = endDate || new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => subDays(referenceDate, 6 - i));
  const days = last7Days.map(d => format(d, 'EEE'));

  // Map backend data to these exact 7 days
  const paddedData = last7Days.map(day => {
    const formattedDay = format(day, 'yyyy-MM-dd');
    const found = chartDataArray.find((item: any) => item.date === formattedDay);
    return found || { approvedFarmlands: 0, rejectedFarmlands: 0 };
  });

  // Calculate pixel heights (0 to 100 max)
  const blueHeights = paddedData.map(item => ((item.approvedFarmlands || 0) / maxDaily) * 100);
  const cyanHeights = paddedData.map(item => ((item.rejectedFarmlands || 0) / maxDaily) * 100);

  const barW = 7; // 7px stroke width based on Figma
  const barGap = 30; // Spaced evenly for 7 bars over ~187px

  return (
    <div
      className="
        flex flex-col rounded-[33px] bg-[#F9F9F9]
        w-full p-[31px] pt-[32px] min-h-[245px]
      "
    >
      <div className="flex justify-between items-center mb-[33px]">
        <Typography
          variant="h3"
          className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] ml-[6px]"
        >
          Daily Screening Outcomes
        </Typography>
        {/* We can show total aggregated from API here if needed */}
      </div>

      <div className="flex flex-row justify-between w-full flex-wrap gap-8 items-center">
        {/* Chart container */}
        <div className="relative w-[211px] h-[129.5px]">

          {/* SVG for Bars */}
          <div className="absolute left-[11px] top-[0px] w-[187px] h-[100px]">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 187 100"
              className="overflow-visible"
            >
              {paddedData.slice(0, 7).map((_, i) => {
                const x = i * barGap;
                // Minimum visible height for 0 is 0. If there is a value, draw it.
                const bH = blueHeights[i] > 0 ? Math.max(blueHeights[i], barW) : 0;
                const cH = cyanHeights[i] > 0 ? Math.max(cyanHeights[i], barW) : 0;

                const r = barW / 2;
                const yTopBlue = 100 - bH + r;
                const yMid = 100 - cH;
                const yBotCyan = 100 - r;

                return (
                  <g key={i}>
                    {/* Blue bar (Approved) */}
                    {bH > 0 && (
                      <line
                        x1={x}
                        y1={yTopBlue}
                        x2={x}
                        y2={yMid - (cH > 0 ? 1 : 0)} // slight gap if both exist
                        stroke="#2780C4"
                        strokeWidth={barW}
                        strokeLinecap="round"
                      />
                    )}
                    {/* Cyan bar (Rejected) */}
                    {cH > 0 && (
                      <line
                        x1={x}
                        y1={yMid}
                        x2={x}
                        y2={yBotCyan}
                        stroke="#37E8DD"
                        strokeWidth={barW}
                        strokeLinecap="round"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

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