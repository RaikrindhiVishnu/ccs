export default function ScreeningChart() {
  const approved = [70, 50, 68, 35, 72, 80, 55];
  const reviews = [40, 28, 35, 20, 42, 48, 30];
  const rejected = [18, 10, 15, 9, 16, 20, 12];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const legend = [
    { label: "Approved", color: "var(--chart-bar-approved)" },
    { label: "Manual Reviews", color: "var(--chart-bar-review)" },
    { label: "Rejected", color: "var(--chart-bar-rejected)" },
  ];

  const SVG_H = 160;
  const barW = 8;
  const overlap = 8;
  const cols = approved.length;
  const SVG_W = cols * 28;

  return (
    <div
      className="
        flex flex-col
        rounded-[1.5rem] bg-[var(--chart-bg)]
        px-[1.25rem] py-[1rem]
        h-[14rem] lg:h-[16rem] xl:h-[18rem] 2xl:h-[20rem]
        xl:rounded-[2rem] xl:px-[1.5rem] xl:py-[1.125rem]
        2xl:px-[1.75rem] 2xl:py-[1.375rem]
      "
    >
      {/* TITLE */}
     <h3 className="shrink-0 mt-[0.5rem] text-[0.6875rem] font-semibold uppercase leading-[120%] tracking-[0.0625rem] text-[var(--foreground)] xl:mt-[0.625rem] xl:text-[0.75rem] 2xl:mt-[0.75rem] 2xl:text-[0.875rem]">
      Daily Screening Outcomes</h3>

      {/* CHART ROW */}
      <div className="mt-3 flex min-h-0 flex-1 items-stretch gap-4 xl:mt-4 xl:gap-5">
        {/* SVG BARS */}
        <div className="min-h-0 flex-1">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${SVG_W} ${SVG_H + 14}`}
            preserveAspectRatio="xMidYMid meet"
          >
            {approved.map((_, i) => {
              const x = i * 28 + 4;
              const aH = (approved[i] / 100) * SVG_H;
              const rH = (reviews[i] / 100) * SVG_H;
              const jH = (rejected[i] / 100) * SVG_H;
              const labelX = x + barW - overlap;

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={SVG_H - aH}
                    width={barW}
                    height={aH}
                    rx={barW / 2}
                    fill="var(--chart-bar-approved)"
                  />
                  <rect
                    x={x + barW - overlap}
                    y={SVG_H - rH}
                    width={barW}
                    height={rH}
                    rx={barW / 2}
                    fill="var(--chart-bar-review)"
                  />
                  <rect
                    x={x + (barW - overlap) * 2}
                    y={SVG_H - jH}
                    width={barW}
                    height={jH}
                    rx={barW / 2}
                    fill="var(--chart-bar-rejected)"
                  />
                  <text
                    x={labelX}
                    y={SVG_H + 12}
                    textAnchor="middle"
                    fontSize="8"
                    fill="var(--chart-axis-text)"
                  >
                    {days[i]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* LEGEND */}
        <div className="flex shrink-0 flex-col justify-center gap-[0.625rem] xl:gap-[0.75rem]">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-[0.5rem]">
              <div
                className="h-[0.875rem] w-[0.875rem] shrink-0 rounded-full border-[0.125rem] bg-transparent xl:h-[1rem] xl:w-[1rem]"
                style={{ borderColor: item.color }}
              />
              <p className="whitespace-nowrap text-[0.625rem] font-normal text-[var(--foreground)] xl:text-[0.6875rem]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
