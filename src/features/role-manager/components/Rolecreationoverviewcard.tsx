import React, { useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
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

const SERIES: {
  key: keyof Omit<DayData, "day">;
  label: string;
  barColor: string;
  dotColor: string;
}[] = [
  {
    key: "ro",
    label: "R.O",
    barColor: "var(--pie-3)",
    dotColor: "var(--brand-500)",
  },
  {
    key: "io",
    label: "I.O",
    barColor: "var(--brand-400)",
    dotColor: "var(--pie-1)",
  },
  {
    key: "fo",
    label: "F.O",
    barColor: "var(--pie-1)",
    dotColor: "var(--chart-fo)",
  },
  {
    key: "agents",
    label: "Agents",
    barColor: "var(--brand-bar)",
    dotColor: "var(--chart-agents)",
  },
];

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  day: string;
  values: { label: string; value: number; dotColor: string }[];
}

// ─── Shared axis-label className ─────────────────────────────────────────────
const AXIS_CLS =
  "text-center leading-[110%] font-normal font-[family-name:'Plus_Jakarta_Sans',sans-serif]";

// ─── Component ────────────────────────────────────────────────────────────────

export function RoleCreationOverviewCard({
  title = "Role Creation Overview",
  subtitle = "Breakdown of role creation by role type",
  className,
}: RoleCreationOverviewCardProps) {
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

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useGetRoleCreationOverviewQuery({
    startDate: dateRange.from.toISOString().split("T")[0],
    endDate: dateRange.to.toISOString().split("T")[0],
    offset: "0",
  });

  const data: DayData[] =
    apiResponse?.data?.map((item) => ({
      day: new Date(item.assignmentDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      ro: item.totalRO,
      io: item.totalIO,
      fo: item.totalFO,
      agents: item.totalAgents,
    })) ?? [];

  // ── Y-axis scale ──────────────────────────────────────────────────────────
  const maxTotal = useMemo(
    () => Math.max(...data.map((d) => d.ro + d.io + d.fo + d.agents), 1),
    [data],
  );

  const yMax = useMemo(() => {
    const niceSteps = [1, 2, 5, 10, 25, 50, 100, 200, 250, 500, 1000];
    const step = niceSteps.find((s) => s >= maxTotal / 5) ?? 1000;
    return Math.max(step * 6, maxTotal * 1.1);
  }, [maxTotal]);

  const yTicks = useMemo(() => {
    const step = yMax / 6;
    return Array.from({ length: 7 }, (_, i) => Math.round(i * step)).reverse();
  }, [yMax]);

  // ── Tooltip ───────────────────────────────────────────────────────────────
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
        dotColor: s.dotColor,
      })),
    });
  };

  const hideTooltip = () => setTooltip((t) => ({ ...t, visible: false }));

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <Card
      className={cn(
        "w-full h-full flex flex-col min-h-0 box-border",
        "bg-[color:var(--surface-card)] rounded-3xl shadow-[var(--shadow-card)]",
        "p-[clamp(1rem,1.4vw,1.5rem)]",
        className,
      )}
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex justify-between items-start mb-[clamp(0.75rem,1.5vh,1.5rem)] shrink-0">
        <div className="flex flex-col gap-[clamp(0.25rem,0.5vh,0.5rem)]">
          <Typography
            as="p"
            variant="p"
            className="m-0 font-medium text-[clamp(0.875rem,1.5vw,1.25rem)] leading-[110%] text-[color:var(--text-primary)] font-[family-name:'Plus_Jakarta_Sans',sans-serif]"
          >
            Region Creation Overview
          </Typography>

          <Typography
            as="p"
            variant="p"
            className="m-0 font-normal text-[clamp(0.6875rem,1vw,0.875rem)] leading-[110%] text-[color:var(--text-primary)] opacity-60 font-[family-name:'Plus_Jakarta_Sans',sans-serif]"
          >
            Breakdown of role creation by role type
          </Typography>
        </div>

        <DateRangePicker
          from={dateRange.from}
          to={dateRange.to}
          onRangeChange={(range) => {
            if (range) setDateRange(range);
          }}
        />
      </div>

      {/* ── Legend row ───────────────────────────────────────────────────── */}
      <div
        className={cn(
          "flex flex-row items-center justify-end shrink-0",
          "gap-[clamp(0.625rem,1.4vw,1.25rem)]",
          "mb-[clamp(0.5rem,0.7vw,0.75rem)]",
        )}
      >
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span
              aria-hidden
              className="inline-block rounded-full shrink-0 w-[clamp(0.375rem,0.56vw,0.5rem)] h-[clamp(0.375rem,0.56vw,0.5rem)]"
              style={{ background: s.dotColor }}
            />
            <Typography
              as="span"
              variant="span"
              className={cn(
                AXIS_CLS,
                "opacity-70",
                "text-[clamp(0.625rem,0.83vw,0.75rem)]",
                "text-[color:var(--text-subtle)]",
              )}
            >
              {s.label}
            </Typography>
          </div>
        ))}
      </div>

      {/* ── Chart area ───────────────────────────────────────────────────── */}
      {isLoading ? (
        <Typography
          variant="p"
          className="flex-1 flex items-center justify-center text-sm font-[family-name:'Plus_Jakarta_Sans',sans-serif] text-[color:var(--text-subtle)] opacity-60"
        >
          Loading…
        </Typography>
      ) : error ? (
        <Typography
          variant="p"
          className="flex-1 flex items-center justify-center text-sm font-[family-name:'Plus_Jakarta_Sans',sans-serif] text-[color:var(--status-danger)]"
        >
          Failed to load data
        </Typography>
      ) : data.length === 0 ? (
        <Typography
          variant="p"
          className="flex-1 flex items-center justify-center text-sm font-[family-name:'Plus_Jakarta_Sans',sans-serif] text-[color:var(--text-subtle)] opacity-50"
        >
          No data available
        </Typography>
      ) : (
        <div
          ref={chartRef}
          className="relative flex gap-[clamp(0.1875rem,0.28vw,0.375rem)] flex-1 min-h-0"
        >
          {/* ── Y-axis ─────────────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex flex-col justify-between items-end shrink-0",
              "pr-[clamp(0.1875rem,0.28vw,0.3125rem)]",
              "w-[clamp(1.125rem,1.67vw,1.625rem)]",
              "pb-[clamp(0.875rem,1.11vw,1.25rem)]",
            )}
          >
            {yTicks.map((v) => (
              <Typography
                key={v}
                as="span"
                variant="span"
                className={cn(
                  AXIS_CLS,
                  "opacity-50",
                  "text-[clamp(0.5625rem,0.79vw,0.71rem)]",
                  "text-[color:var(--text-subtle)]",
                )}
              >
                {v}
              </Typography>
            ))}
          </div>

          {/* ── Bars + X-axis ─────────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Bar columns */}
            <div
              className={cn(
                "flex-1 flex items-end min-h-0 overflow-hidden",
                "gap-[clamp(0.25rem,0.49vw,0.625rem)]",
              )}
            >
              {data.map((day) => {
                const total = day.ro + day.io + day.fo + day.agents;
                const totalPct = Math.min((total / yMax) * 100, 100);

                return (
                  <div
                    key={day.day}
                    className="flex-1 min-w-0 h-full flex items-end cursor-pointer"
                    onMouseMove={(e) => showTooltip(e, day)}
                    onMouseLeave={hideTooltip}
                  >
                    <div
                      className="w-full flex flex-col overflow-hidden transition-opacity duration-150"
                      style={{
                        gap: "clamp(1px, 0.07vw, 2px)",
                        height: `${totalPct}%`,
                        minHeight: total > 0 ? "0.5rem" : undefined,
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.opacity =
                          "0.85")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.opacity =
                          "1")
                      }
                    >
                      {[...SERIES].reverse().map((s) => {
                        const val = day[s.key] as number;
                        return (
                          <div
                            key={s.key}
                            className="w-full shrink-0 rounded-[clamp(0.25rem,0.53vw,0.47rem)]"
                            style={{
                              flex: `${val} 0 0`,
                              background: s.barColor,
                              minHeight: val > 0 ? "0.375rem" : undefined,
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
            <div
              className={cn(
                "flex shrink-0",
                "gap-[clamp(0.25rem,0.49vw,0.625rem)]",
                "mt-[clamp(0.1875rem,0.28vw,0.3125rem)]",
              )}
            >
              {data.map((day) => (
                <Typography
                  key={day.day}
                  as="span"
                  variant="span"
                  className={cn(
                    AXIS_CLS,
                    "opacity-50 flex-1 block",
                    "text-[clamp(0.5625rem,0.79vw,0.71rem)]",
                    "text-[color:var(--text-subtle)]",
                  )}
                >
                  {day.day}
                </Typography>
              ))}
            </div>
          </div>

          {/* ── Tooltip ──────────────────────────────────────────────────────── */}
          {tooltip.visible && (
            <div
              className={cn(
                "pointer-events-none absolute z-50",
                "bg-[color:var(--surface-card)]",
                "border border-[color:var(--border-soft)]",
                "rounded-xl px-3 py-2",
                "shadow-[var(--shadow-dropdown)]",
                "min-w-[6.875rem]",
              )}
              style={{
                left: Math.min(
                  Math.max(tooltip.x - 70, 12),
                  (chartRef.current?.clientWidth || 0) - 150,
                ),
                top: Math.max(tooltip.y - 70, 12),
              }}
            >
              <Typography
                as="span"
                variant="span"
                className={cn(
                  "block mb-1.5",
                  "font-[family-name:'Plus_Jakarta_Sans',sans-serif]",
                  "font-semibold text-[0.8125rem] leading-[110%]",
                  "text-[color:var(--text-primary)]",
                )}
              >
                {tooltip.day}
              </Typography>

              {tooltip.values.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-2 mb-[0.1875rem] min-w-0"
                >
                  <span
                    aria-hidden
                    className="inline-block w-[0.4375rem] h-[0.4375rem] rounded-full shrink-0"
                    style={{ background: v.dotColor }}
                  />
                  <Typography
                    as="span"
                    variant="span"
                    className={cn(
                      "font-[family-name:'Plus_Jakarta_Sans',sans-serif]",
                      "font-normal text-xs",
                      "text-[color:var(--text-subtle)]",
                    )}
                  >
                    {v.label}:
                  </Typography>
                  <Typography
                    as="span"
                    variant="span"
                    className={cn(
                      "ml-auto",
                      "font-[family-name:'Plus_Jakarta_Sans',sans-serif]",
                      "font-medium text-xs",
                      "text-[color:var(--text-primary)]",
                    )}
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
