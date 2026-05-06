import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

function ScreeningPaceCard({ value = 76 }: { value?: number }) {
  const totalTicks = 38;
  const filledTicks = Math.round(totalTicks * (value / 100));
  const cx = 80, cy = 85, r = 68, tickLen = 10, tickGap = 4;

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
        flex flex-col rounded-[1.4492rem] border-0
        bg-[var(--card)] shadow-[var(--shadow-card-sm)]
        h-[11rem] lg:h-[12rem] xl:h-[13rem] 2xl:h-[14rem]
        p-[1rem] xl:p-[1.1867rem]
      "
    >
      <div className="flex items-start justify-between">
        <Typography
          variant="span"
          className="text-[0.8rem] font-bold leading-[120%] text-[var(--text-dark)] xl:text-[0.8845rem]"
        >
          Screening Pace
        </Typography>
        <div className="flex items-start leading-none">
          <Typography
            variant="span"
            className="text-[1.625rem] font-semibold leading-[120%] text-[var(--text-dark)] xl:text-[1.875rem]"
          >
            {value}
          </Typography>
          <Typography
            variant="span"
            className="mt-[0.1875rem] text-[1.05rem] font-semibold leading-[120%] text-[var(--muted)] xl:text-[1.2193rem]"
          >
            %
          </Typography>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <svg className="w-[7rem] xl:w-[8rem] 2xl:w-[8.75rem]" height="75" viewBox="0 0 160 85">
          {ticks.map((t, i) => (
            <line
              key={i}
              x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
              stroke={t.filled ? 'var(--primary)' : 'var(--primary-light)'}
              strokeWidth={t.filled ? 3 : 2}
              strokeLinecap="round"
            />
          ))}
          <text x="80" y="80" textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--text-dark)">
            {value}%
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-between">
        <Typography
          variant="span"
          className="text-[0.7rem] font-normal leading-[120%] text-[var(--muted)] xl:text-[0.774rem]"
        >
          +2.1% vs Last Week
        </Typography>
        <Typography
          variant="span"
          className="text-[0.7rem] font-normal leading-[120%] text-[var(--muted)] xl:text-[0.774rem]"
        >
          Target &gt; 90%
        </Typography>
      </div>
    </Card>
  );
}

function ManualReviewsCard({ count = 24 }: { count?: number }) {
  const barData = [13,22,16,28,20,14,18,12,16,20,14,18,24,16,12,19,17,14,22,18,24,16,12,20,18,16,20,14,18,24];
  const maxVal  = Math.max(...barData);
  const upH = 44, downH = 32, gap = 6, TOTAL = upH + gap + downH;
  const barW = 5, barGap = 4.2, rx = barW / 2;
  const SVG_W = barData.length * (barW + barGap) - barGap;

  return (
    <Card
      className="
        flex flex-col rounded-[1.4492rem] border-0
        bg-[var(--primary)] shadow-[var(--shadow-card-sm)]
        h-[11rem] lg:h-[12rem] xl:h-[13rem] 2xl:h-[14rem]
        p-[1rem] xl:p-[1.1867rem]
      "
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <Typography
            variant="p"
            className="text-[0.8rem] font-bold leading-[120%] text-[var(--btn-primary-text)] xl:text-[0.8845rem]"
          >
            Manual Reviews Required
          </Typography>
          <Typography
            variant="p"
            className="mt-1 text-[0.6rem] font-normal leading-[120%] text-[var(--primary-light)] xl:text-[0.6634rem]"
          >
            Avg Review Time: 1.2 Hrs
          </Typography>
        </div>
        <Typography
          variant="span"
          className="shrink-0 text-[1.625rem] font-semibold leading-[120%] text-[var(--btn-primary-text)] xl:text-[1.875rem]"
        >
          {count}
        </Typography>
      </div>

      <div className="mt-auto">
        <svg width="100%" height={TOTAL} viewBox={`0 0 ${SVG_W} ${TOTAL}`} preserveAspectRatio="none">
          {barData.map((v, i) => {
            const x    = i * (barW + barGap);
            const uH   = (v / maxVal) * upH;
            const dH   = (v / maxVal) * downH;
            const upY  = upH - uH;
            const downY = upH + gap;
            return (
              <g key={i}>
                <rect x={x} y={upY}   width={barW} height={uH} rx={rx} fill="var(--mirror-bar-up)" />
                <rect x={x} y={downY} width={barW} height={dH} rx={rx} fill="var(--mirror-bar-down)" />
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
    <div className="grid grid-cols-2 gap-3">
      <ScreeningPaceCard value={76} />
      <ManualReviewsCard count={24} />
    </div>
  );
}