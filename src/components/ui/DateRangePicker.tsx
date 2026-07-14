import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onRangeChange?: (range: { from: Date; to: Date } | undefined) => void;
  className?: string;
  /** When set, selecting a start date auto-sets end to startDate + (maxDays-1) */
  maxDays?: number;
}

type Range = { from: Date; to: Date };

export default function DateRangePicker({
  from,
  to,
  onRangeChange,
  className,
  maxDays,
}: DateRangePickerProps) {
  const initial: Range | undefined = from && to ? { from, to } : undefined;

  const [open, setOpen]       = useState(false);
  const [applied, setApplied] = useState<Range | undefined>(initial);
  const [pending, setPending] = useState<any>(initial);
  // Tracks which month the calendar shows — always reopens on the applied range's month
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    initial?.from ?? new Date()
  );

  // ── handlers ──────────────────────────────────────────────────────────────
  const handleSelect = (range: any) => {
    if (maxDays) {
      if (!range?.from) return; // deselect — ignore

      // Detect which date the user actually clicked by diffing against previous pending.
      // DayPicker range mode delivers different shapes depending on interaction:
      //   { from: newDate, to: undefined }  → fresh first click
      //   { from: oldFrom, to: newDate }    → extended rightward
      //   { from: newDate, to: oldTo }      → extended leftward (reset)
      const prevFrom = pending?.from?.getTime();
      const prevTo   = pending?.to?.getTime();
      const newFrom  = range.from?.getTime();
      const newTo    = range.to?.getTime();

      let clickedDate: Date;
      if (newTo && newTo !== prevTo) {
        clickedDate = range.to;   // extended right → clicked = new to
      } else if (newFrom && newFrom !== prevFrom) {
        clickedDate = range.from; // fresh click or extended left → clicked = new from
      } else {
        clickedDate = range.from; // fallback
      }

      const snapped = { from: clickedDate, to: addDays(clickedDate, maxDays - 1) };
      // Only update PREVIEW — user must click Apply to confirm
      setPending(snapped);
      return;
    }
    setPending(range);
  };

  // Apply: confirm pending → applied, notify parent, close
  const handleApply = () => {
    if (pending?.from && pending?.to) {
      const confirmed = { from: pending.from, to: pending.to };
      setApplied(confirmed);
      onRangeChange?.(confirmed);
    }
    setOpen(false);
  };

  // Clear ×: reset everything
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setApplied(undefined);
    setPending(undefined);
    onRangeChange?.(undefined);
  };

  // Open popover: seed pending + jump calendar to the applied range's month
  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) {
      setPending(applied);
      // Re-open on the applied month, not today
      if (applied?.from) setCalendarMonth(applied.from);
    }
  };

  // ── trigger label ──────────────────────────────────────────────────────────
  const triggerLabel = applied
    ? `${format(applied.from, "MMM d")} – ${format(applied.to, "MMM d, yyyy")}`
    : maxDays
    ? `Pick start (${maxDays}d)`
    : "Set Range";

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className={cn("flex items-center", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>

        {/* ── Trigger ── */}
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors",
              "h-[clamp(24px,1.8vw,28px)] px-[clamp(8px,0.8vw,12px)]",
              "rounded-full border",
              "font-[family-name:var(--font-sans)] font-normal",
              "text-[clamp(10px,0.7vw,12px)]",
              applied
                ? "border-[color:var(--brand-500)] bg-[color:var(--brand-50)] text-[color:var(--brand-500)]"
                : "border-[color:var(--text-primary)] text-[color:var(--text-primary)] hover:bg-[color:var(--brand-tint)]",
            )}
          >
            {!applied && (
              <CalendarIcon className="w-[clamp(12px,0.9vw,14px)] h-[clamp(12px,0.9vw,14px)] shrink-0" />
            )}

            <span>{triggerLabel}</span>

            {applied && (
              <span
                role="button"
                aria-label="Clear date range"
                onClick={handleClear}
                className="flex items-center justify-center rounded-full p-0.5 -mr-0.5 hover:bg-[color:var(--brand-100)] transition-colors"
              >
                <X className="w-2.5 h-2.5 shrink-0" />
              </span>
            )}
          </button>
        </PopoverTrigger>

        {/* ── Popover ── */}
        <PopoverContent
          align="end"
          sideOffset={6}
          className={cn(
            "p-0 rounded-2xl overflow-hidden",
            "w-[clamp(260px,22vw,300px)]",
            "bg-[color:var(--surface-card)]",
            "border border-[color:var(--border-subtle)]",
            "shadow-[0px_12px_32px_rgba(0,0,0,0.08)]",
          )}
        >
          {/* ── Calendar ── */}
          <div className="px-[clamp(10px,1.2vw,14px)] pb-[clamp(12px,1.5vw,16px)]">
            <DayPicker
              mode="range"
              selected={pending}
              onSelect={handleSelect}
              showOutsideDays={false}
              disabled={false}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full",
                nav: "absolute inset-x-0 top-3 flex items-center justify-between z-10 px-1",
                button_previous: cn(
                  "flex items-center justify-center w-5 h-5 rounded-full",
                  "text-[color:var(--text-secondary)]",
                  "hover:bg-[color:var(--brand-tint)] transition-colors",
                ),
                button_next: cn(
                  "flex items-center justify-center w-5 h-5 rounded-full",
                  "text-[color:var(--text-secondary)]",
                  "hover:bg-[color:var(--brand-tint)] transition-colors",
                ),
                month_caption: cn(
                  "flex justify-center items-center relative",
                  "h-[clamp(38px,3vw,44px)]",
                  "border-b border-[color:var(--border-subtle)]",
                  "mx-[calc(-1*clamp(10px,1.2vw,14px))] px-4 mb-1.5",
                ),
                caption_label: cn(
                  "font-[family-name:var(--font-sans)] font-bold",
                  "text-[clamp(11px,0.85vw,13px)]",
                  "text-[color:var(--text-primary)]",
                ),
                month_grid: "w-full border-collapse table-fixed",
                weekdays: "flex w-full mb-0.5",
                weekday: cn(
                  "flex-1 text-center py-0.5",
                  "font-[family-name:var(--font-sans)] font-bold",
                  "text-[clamp(8px,0.6vw,10px)] tracking-[0.8px] uppercase",
                  "text-[color:var(--text-secondary)]",
                ),
                week: "flex w-full",
                day: "flex-1 p-0 text-center relative",
                range_start: "relative",
                range_middle: "relative",
                range_end: "relative",
                outside: "opacity-0 pointer-events-none",
                hidden: "invisible",
              }}
              components={{
                Chevron: ({ orientation }) =>
                  orientation === "left" ? (
                    <ChevronLeft className="w-2.5 h-2.5 text-[color:var(--text-secondary)]" />
                  ) : (
                    <ChevronRight className="w-2.5 h-2.5 text-[color:var(--text-secondary)]" />
                  ),

                DayButton: ({ day, modifiers, ...props }) => {
                  const isStart    = modifiers.range_start;
                  const isEnd      = modifiers.range_end;
                  const isMiddle   = modifiers.range_middle;
                  const isSelected = isStart || isEnd;
                  const isFuture   = day.date > new Date();
                  const isToday    = modifiers.today;

                  return (
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-full",
                        "h-[clamp(26px,2.2vw,30px)]",
                      )}
                    >
                      {isStart && !isEnd && (
                        <div className="absolute inset-y-0 left-1/2 right-0 bg-[color:var(--brand-50)]" />
                      )}
                      {isMiddle && (
                        <div className="absolute inset-0 bg-[color:var(--brand-50)]" />
                      )}
                      {isEnd && !isStart && (
                        <div className="absolute inset-y-0 left-0 right-1/2 bg-[color:var(--brand-50)]" />
                      )}

                      <button
                        {...props}
                        disabled={false}
                        className={cn(
                          "relative z-10 flex items-center justify-center rounded-full",
                          "w-[clamp(24px,1.9vw,28px)] h-[clamp(24px,1.9vw,28px)]",
                          "font-[family-name:var(--font-sans)] font-medium leading-none",
                          "text-[clamp(10px,0.75vw,12px)] transition-colors cursor-pointer",
                          isSelected
                            ? "bg-[color:var(--brand-500)] text-white font-bold shadow-[var(--shadow-card-sm)]"
                            : isMiddle
                            ? "bg-transparent text-[color:var(--text-primary)] hover:bg-[color:var(--brand-100)]"
                            : isFuture
                            ? "bg-transparent text-[color:var(--text-primary)] opacity-60 hover:opacity-100 hover:bg-[color:var(--brand-50)]"
                            : isToday
                            ? "bg-transparent text-[color:var(--brand-500)] font-bold hover:bg-[color:var(--brand-50)]"
                            : "bg-transparent text-[color:var(--text-primary)] hover:bg-[color:var(--brand-50)]",
                        )}
                      >
                        {day.date.getDate()}
                      </button>
                    </div>
                  );
                },
              }}
            />
          </div>

          {/* ── Footer ── */}
          <div
            className={cn(
              "flex items-center justify-between",
              "h-[clamp(40px,3.5vw,50px)]",
              "px-[clamp(10px,1.2vw,16px)]",
              "border-t border-[color:var(--border-subtle)]",
            )}
          >
            {/* Pending preview label */}
            <span
              className={cn(
                "font-[family-name:var(--font-sans)] font-bold",
                "text-[clamp(11px,0.85vw,13px)]",
                "text-[color:var(--brand-500)]",
              )}
            >
              {pending?.from && pending?.to
                ? `${format(pending.from, "MMM d")} – ${format(pending.to, "MMM d")}`
                : "No range selected"}
            </span>

            <button
              onClick={handleApply}
              disabled={!pending?.from || !pending?.to}
              className={cn(
                "flex items-center justify-center rounded-lg",
                "w-[clamp(52px,4.5vw,62px)] h-[clamp(24px,2vw,28px)]",
                "font-[family-name:var(--font-sans)] font-bold",
                "text-[clamp(10px,0.7vw,11px)]",
                "text-[color:var(--brand-500)]",
                "border border-[color:var(--brand-500)]",
                "hover:bg-[color:var(--brand-tint)] transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              )}
            >
              Apply
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}