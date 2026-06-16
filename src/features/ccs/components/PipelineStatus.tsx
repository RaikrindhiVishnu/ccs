import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

function ScreeningPaceCard({ value = 76 }: { value?: number }) {
  const totalTicks = 18;
  const filledTicks = Math.round(totalTicks * (value / 100));
  const cx = 80, cy = 80, r = 64, tickLen = 17, tickGap = 0;

  const ticks = Array.from({ length: totalTicks }, (_, i) => {
    const angle = 180 + (i / (totalTicks - 1)) * 180;
    const rad   = (angle * Math.PI) / 180;
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
        relative flex flex-col rounded-[23.1867px] border-0
        bg-[#FFFFFF] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
        h-[194px] w-full
      "
    >
      <div className="absolute top-[28px] left-[28px] right-[28px] flex items-start justify-between">
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-bold text-[14.15px] leading-[17px] text-[#0E0D3D]"
        >
          Screening Pace
        </Typography>
        <div className="flex items-start leading-none gap-[2px]">
          <Typography
            variant="span"
            className="font-['Plus_Jakarta_Sans'] font-bold text-[30px] leading-[32px] tracking-[-1px] text-[#0E0D3D]"
          >
            {value}
          </Typography>
          <Typography
            variant="span"
            className="mt-[2px] font-['Plus_Jakarta_Sans'] font-bold text-[19.5px] leading-[23px] text-[#9090AE]"
          >
            %
          </Typography>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center mt-8 relative">
        <svg className="w-[155px]" height="85" viewBox="0 0 160 85">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.filled ? '#2780C4' : '#C1CFEE'}
              strokeWidth={6.5}
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute bottom-[2px] font-['Plus_Jakarta_Sans'] font-bold text-[44px] leading-[44px] text-[#0E0D3D] tracking-[-1.5px]">
          {value}%
        </div>
      </div>
    </Card>
  );
}

function AverageReviewTimeCard({ time = "1.2 hr" }: { time?: string }) {
  const barData = [13,22,16,28,20,14,18,12,16,20,14,18,24,16,12,19,17,14,22,18,24];
  const maxVal  = Math.max(...barData);
  const upH = 40, downH = 28, gap = 6, TOTAL = upH + gap + downH;
  const barW = 4.4, barGap = 8, rx = barW / 2;
  const SVG_W = barData.length * (barW + barGap) - barGap;

  return (
    <Card
      className="
        relative flex flex-col rounded-[23px] border-0
        bg-[#2780C4] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
        h-[194px] w-full
      "
    >
      <div className="absolute top-[20px] left-[20px] right-[20px] flex items-start justify-between">
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] leading-[17px] text-[#FFFFFF]"
        >
          Average Review Time
        </Typography>
        <Typography
          variant="span"
          className="font-['Plus_Jakarta_Sans'] font-semibold text-[30px] leading-[36px] text-[#FFFFFF]"
        >
          {time}
        </Typography>
      </div>

      <div className="absolute bottom-[30px] left-[30px] right-[30px]">
        <svg width="100%" height={TOTAL} viewBox={`0 0 ${SVG_W} ${TOTAL}`} preserveAspectRatio="none">
          {barData.map((v, i) => {
            const x    = i * (barW + barGap);
            const uH   = (v / maxVal) * upH;
            const dH   = (v / maxVal) * downH;
            const upY  = upH - uH;
            const downY = upH + gap;
            return (
              <g key={i}>
                <rect x={x} y={upY}   width={barW} height={uH} rx={rx} fill="#FFFFFF" />
                <rect x={x} y={downY} width={barW} height={dH} rx={rx} fill="#61CAEB" />
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
}

export default function PipelineStatus() {
  return (
    <div className="grid grid-cols-2 gap-[18px]">
      <ScreeningPaceCard value={76} />
      <AverageReviewTimeCard time="1.2 hr" />
    </div>
  );
}