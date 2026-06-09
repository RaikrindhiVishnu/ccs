import { Typography } from '@/components/ui/typography';

export default function ScreeningChart() {
  const approved = [93, 66, 86, 51, 88, 100, 69];
  const rejected = [33, 23, 30, 18, 31, 35, 24];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const barW = 14;
  const barGap = 15;
  const groupW = barW + barGap;
  const SVG_W = approved.length * groupW - barGap;
  const SVG_H = 150;
  const chartHeight = 100;
  const baseY = chartHeight + 5;

  return (
    <div
      className="
        flex flex-col rounded-[33px] bg-[#F9F9F9]
        px-[30px] pt-[30px] pb-[16px]
        h-[245px] w-full max-w-[424px]
      "
    >
      <div className="flex justify-between w-full h-full">
        <div className="flex flex-col h-full w-full max-w-[220px]">
          <Typography
            variant="h3"
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[17px] tracking-[1px] uppercase text-[#000000] mb-[30px] whitespace-nowrap"
          >
            Daily Screening Outcomes
          </Typography>

          <div className="flex flex-col justify-end h-full w-full max-w-[211px]">
            <svg
              width="100%"
              height={SVG_H}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              preserveAspectRatio="xMinYMin meet"
            >
              {approved.map((_, i) => {
                const x = i * groupW + barW / 2;
                const aH = approved[i];
                const rH = rejected[i];
                const totalH = aH + rH;

                return (
                  <g key={i}>
                    <line
                      x1={x}
                      y1={baseY - rH}
                      x2={x}
                      y2={baseY}
                      stroke="#37E8DD"
                      strokeWidth={barW}
                      strokeLinecap="butt"
                    />
                    <line
                      x1={x}
                      y1={baseY - totalH}
                      x2={x}
                      y2={baseY - rH}
                      stroke="#2780C4"
                      strokeWidth={barW}
                      strokeLinecap="butt"
                    />
                    <text
                      x={x}
                      y={SVG_H - 4}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="Inter"
                      fill="#000000"
                    >
                      {days[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-[24px] pr-[10px]">
          <div className="flex items-center gap-[9px]">
            <div className="h-[17px] w-[17px] rounded-full border-[2.34px] border-[#2780C4] bg-transparent" />
            <span className="font-['Plus_Jakarta_Sans'] text-[12px] text-[#000000]">
              Approved
            </span>
          </div>
          <div className="flex items-center gap-[9px]">
            <div className="h-[17px] w-[17px] rounded-full border-[2.34px] border-[#37E8DD] bg-transparent" />
            <span className="font-['Inter'] text-[12px] text-[#000000]">
              Rejected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}