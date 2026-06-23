import { Typography } from '@/components/ui/typography';

export default function ScreeningChart() {
  // 12 bars from Figma
  const blueHeights = [93, 66, 86, 51, 88, 100, 69, 78, 56, 89, 100, 78];
  const cyanHeights = [32.55, 23.1, 30.1, 17.85, 30.8, 35, 24.15, 27.3, 19.6, 31.15, 49, 27.3];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const barW = 7; // 7px stroke width based on Figma
  const barGap = 17; // distance between bar centers

  return (
    <div
      className="
        flex flex-col rounded-[33px] bg-[#F9F9F9]
        w-full p-[31px] pt-[32px] min-h-[245px]
      "
    >
      <Typography
        variant="h3"
        className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] mb-[33px] ml-[6px]"
      >
        Daily Screening Outcomes
      </Typography>

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
              {blueHeights.map((h, i) => {
                const x = i * barGap;
                const bH = blueHeights[i];
                const cH = cyanHeights[i];
                
                const r = barW / 2;
                const yTopBlue = 100 - bH + r;
                const yMid = 100 - cH;
                const yBotCyan = 100 - r;
                
                return (
                  <g key={i}>
                    {/* Blue bar */}
                    <line
                      x1={x}
                      y1={yTopBlue}
                      x2={x}
                      y2={yMid}
                      stroke="#2780C4"
                      strokeWidth={barW}
                      strokeLinecap="round"
                    />
                    {/* Cyan bar */}
                    <line
                      x1={x}
                      y1={yMid}
                      x2={x}
                      y2={yBotCyan}
                      stroke="#37E8DD"
                      strokeWidth={barW}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Labels under the chart */}
          <div className="absolute left-[0px] top-[115.5px] flex flex-row justify-between w-[187px] ml-[11px]">
            {days.map((day, i) => (
              <span
                key={i}
                className="font-['Inter'] font-normal text-[10px] leading-[137.52%] text-[#000000]"
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