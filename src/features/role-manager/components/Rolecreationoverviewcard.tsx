import React, {
  useState,
  useRef,
  useMemo,
} from "react";
import { cn } from "@/lib/utils";
import { WeekDropdown } from "@/components/ui/Dropdown";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { useGetRoleCreationOverviewQuery } from "@/features/role-manager/api/agentApi";
import DateRangePicker from "@/components/ui/DateRangePicker";
// ─── Types ────────────────────────────────────────────────────────────────────

export interface DayData {
  day: string;
  ro: number;
  io: number;
  fo: number;
  agents: number;
}

export interface RoleCreationOverviewCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────


const SERIES: {
  key: keyof Omit<DayData, "day">;
  label: string;
  color: string;
}[] = [
  { key: "ro", label: "R.O", color: "var(--pie-3)" },
  { key: "io", label: "I.O", color: "var(--brand-400)" },
  { key: "fo", label: "F.O", color: "var(--pie-1)" },
  {
    key: "agents",
    label: "Agents",
    color: "color-mix(in srgb, var(--brand-500) 22%, transparent)",
  },
];


interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  day: string;
  values: { label: string; value: number; color: string }[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RoleCreationOverviewCard({
  title = "Role Creation Overview",
  subtitle = "Breakdown of role creation by role type",
  className,
}:

RoleCreationOverviewCardProps) {
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(() => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 6);
    return { from, to };
  });
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    day: "",
    values: [],
  });
  const chartRef = useRef<HTMLDivElement>(null);
const { data: apiResponse, isLoading, error } = useGetRoleCreationOverviewQuery({
  startDate: dateRange.from.toISOString().split("T")[0],
  endDate: dateRange.to.toISOString().split("T")[0],
  offset: "0",
});

const transformedData: DayData[] =
  apiResponse?.data?.map((item) => ({
    day: new Date(item.assignmentDate)
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    ro: item.totalRO,
    io: item.totalIO,
    fo: item.totalFO,
    agents: item.totalAgents,
  })) || [];
const data: DayData[] = transformedData;

  const maxTotal = useMemo(
    () => Math.max(...data.map((d) => d.ro + d.io + d.fo + d.agents), 1),
    [data],
  );
const yMax = useMemo(() => {
  const niceSteps = [1, 2, 5, 10, 25, 50, 100, 200, 250, 500, 1000];
  const rawStep = maxTotal / 5;
  const step = niceSteps.find((s) => s >= rawStep) ?? 1000;
  return step * 6; // always 6 intervals = 7 ticks (0 to top)
}, [maxTotal]);

const yTicks = useMemo(() => {
  const step = yMax / 6;
  const t: number[] = [];
  for (let i = 0; i <= 6; i++) t.push(Math.round(i * step));
  return t.reverse();
}, [yMax]);



  const showTooltip = (e: React.MouseEvent<HTMLDivElement>, day: DayData) => {
    const rect = chartRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 8,
      day: day.day,
      values: SERIES.map((s) => ({
        label: s.label,
        value: day[s.key] as number,
        color: s.color,
      })),
    });
  };
  const hideTooltip = () => setTooltip((t) => ({ ...t, visible: false }));

  return (
    <Card
      className={cn(
        "w-full h-full flex flex-col min-h-0",
        "p-[clamp(0.875rem,1.5vw,1.5rem)]",
        "rounded-[var(--radius-lg,1.5rem)]",
        "bg-[color:var(--surface-card,#fff)]",
        "shadow-[var(--shadow-card)]",
        "font-[family-name:var(--font-sans)]",
        className,
      )}
    >
      {/* ── Header */}
      <div className="flex items-center justify-between gap-4 shrink-0 mb-[clamp(0.125rem,0.3vw,0.375rem)]">
        {/* ── Title ───────────────────────────────────────────── */}
        <Typography
          as="h2"
          variant="h2"
          className={cn(
            "font-medium",
            "leading-tight",
            "text-[var(--text-primary)]",
            "font-[family-name:var(--font-sans)]",
            "text-[clamp(14px,1.5vw,20px)]",
          )}
        >
          {title}
        </Typography>

       <DateRangePicker
  from={dateRange.from}
  to={dateRange.to}
  onRangeChange={(range) => {
    if (range) setDateRange(range);
  }}
/>
      </div>

      {/* ── Subtitle ────────────────────────────────────────── */}
      <Typography
        variant="p"
        className={cn(
          "font-normal",
          "leading-tight",
          "text-[var(--text-primary)]",
          "opacity-60",
          "font-[family-name:var(--font-sans)]",
          "text-[clamp(11px,1vw,14px)]",
        )}
      >
        {subtitle}
      </Typography>

      {/* ── Legend */}
      <div className="shrink-0 flex items-center justify-end gap-[clamp(0.5rem,1vw,1.25rem)] mb-[clamp(0.375rem,0.7vw,0.75rem)]">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-[0.3125rem]">
            <span
              className={cn(
                "rounded-full shrink-0",
                "w-[clamp(0.375rem,0.5vw,0.5rem)]",
                "h-[clamp(0.375rem,0.5vw,0.5rem)]",
                // background is a dynamic CSS var — kept as style prop only here (not text/layout)
              )}
              style={{ background: s.color }}
            />
            {/* Legend label: Plus Jakarta Sans 12px/0.75rem 400 lh-110% — Figma spec */}
            <Typography
              as="span"
              variant="span"
              className={cn(
                "text-[color:var(--text-secondary)] opacity-70",
                "font-[family-name:var(--font-sans)]",
                "text-[0.75rem]", // Figma: 12px
                "leading-[110%]",
                "font-normal",
              )}
            >
              {s.label}
            </Typography>
          </div>
        ))}
      </div>

      {/* ── Chart */}
     {isLoading ? (
        <Typography
          variant="p"
          className="flex-1 flex items-center justify-center text-[color:var(--text-muted)] text-sm"
        >
          Loading…
        </Typography>
      ) : error ? (
        <Typography
          variant="p"
          className="flex-1 flex items-center justify-center text-red-400 text-sm"
        >
         Failed to load data
        </Typography>
    ) : data.length === 0 ? (
  <Typography
    variant="p"
    className="flex-1 flex items-center justify-center text-[color:var(--text-muted)] text-sm"
  >
    No data available
  </Typography>
) : (
  <div
          ref={chartRef}
          className="relative flex gap-[clamp(0.1875rem,0.4vw,0.375rem)] flex-1 min-h-0"
        >
          {/* Y-axis labels */}
          <div
            className={cn(
              "flex flex-col justify-between items-end shrink-0",
              "pr-[clamp(0.1875rem,0.3vw,0.3125rem)]",
              "w-[clamp(1rem,1.5vw,1.625rem)]",
              "pb-[clamp(0.875rem,1.2vw,1.25rem)]", // aligns with x-label height
            )}
          >
            {yTicks.map((v) => (
              // Axis labels: Plus Jakarta Sans 11.36px ≈ 0.71rem 400 lh-110% — Figma spec
              <Typography
                key={v}
                as="span"
                variant="span"
                className={cn(
                  "text-[color:var(--text-muted-strong)] opacity-50 leading-none",
                  "font-[family-name:var(--font-sans)]",
                  "text-[0.71rem]", // Figma: 11.3624px
                  "leading-[110%]",
                  "font-normal",
                )}
              >
                {v}
              </Typography>
            ))}
          </div>

          {/* Bars + X-axis */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Bar columns */}
            <div className="flex-1 flex items-end gap-[clamp(0.25rem,0.5vw,0.625rem)] min-h-0">
              {data.map((day) => {
                const total = day.ro + day.io + day.fo + day.agents;
                const totalPct = (total / yMax) * 100;
                return (
                  <div
                    key={day.day}
                    className="flex-1 min-w-0 h-full flex items-end cursor-pointer group"
                    onMouseMove={(e) => showTooltip(e, day)}
                    onMouseLeave={hideTooltip}
                  >
                    <div
                      className="w-full flex flex-col gap-[0.125rem]"
                      style={{ height: `${totalPct}%` }}
                    >
                      {[...SERIES].reverse().map((s) => {
                        const val = day[s.key] as number;
                        return (
                          <div
                            key={s.key}
                            className={cn(
                              "w-full shrink-0",
                              "transition-opacity duration-150 group-hover:opacity-85",
                              "rounded-[clamp(0.3125rem,0.45vw,0.5rem)]",
                              val > 0 ? "min-h-[0.25rem]" : "",
                            )}
                            style={{
                              flex: `${val} 0 0`,
                              background: s.color,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex gap-[clamp(0.25rem,0.5vw,0.625rem)] mt-[clamp(0.1875rem,0.3vw,0.3125rem)] shrink-0">
              {data.map((day) => (
                // X labels: Plus Jakarta Sans 11.36px ≈ 0.71rem 400 lh-110% — Figma spec
                <Typography
                  key={day.day}
                  as="span"
                  variant="span"
                  className={cn(
                    "flex-1 text-center",
                    "text-[color:var(--text-secondary)] opacity-50",
                    "font-[family-name:var(--font-sans)]",
                    "text-[0.71rem]", // Figma: 11.3624px
                    "leading-[110%]",
                    "font-normal",
                  )}
                >
                  {day.day}
                </Typography>
              ))}
            </div>
          </div>

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className={cn(
                "pointer-events-none absolute z-50",
                "rounded-xl px-3 py-2 shadow-lg",
                "bg-[color:var(--surface-card)]",
                "border border-[color:var(--border)]",
                "min-w-[6.875rem]",
                "font-[family-name:var(--font-sans)]",
                "text-[0.75rem]",
              )}
              style={{ left: tooltip.x + 12, top: tooltip.y }}
            >
              <Typography
                as="span"
                variant="span"
                className={cn(
                  "font-semibold block mb-1",
                  "text-[color:var(--text-primary)]",
                  "text-[0.8125rem]",
                )}
              >
                {tooltip.day}
              </Typography>
              {tooltip.values.map((v) => (
                <div key={v.label} className="flex items-center gap-2 mb-0.5">
                  <span
                    className="rounded-full shrink-0 w-[0.4375rem] h-[0.4375rem]"
                    style={{ background: v.color }}
                  />
                  <Typography
                    as="span"
                    variant="span"
                    className="text-[color:var(--text-secondary)] text-[0.75rem]"
                  >
                    {v.label}:
                  </Typography>
                  <Typography
                    as="span"
                    variant="span"
                    className="ml-auto font-medium text-[color:var(--text-primary)] text-[0.75rem]"
                  >
                    {v.value}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default RoleCreationOverviewCard;
