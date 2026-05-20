import { useState } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
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
}

export default function DateRangePicker({
  from,
  to,
  onRangeChange,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState<{ from: Date; to: Date } | undefined>(
    from && to ? { from, to } : undefined
  );

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    const d = new Date(date);
    d.setHours(12, 0, 0, 0);
    const end = addDays(d, 6);
    end.setHours(12, 0, 0, 0);
    setPending({ from: d, to: end });
  };

  const handleApply = () => {
    if (pending) onRangeChange?.(pending);
    setOpen(false);
  };

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (val) {
      setPending(from && to ? { from, to } : undefined);
    }
  };

  return (
    <div className={cn("flex items-center", className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>

        {/* ── Trigger ── */}
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center justify-center gap-1.5 whitespace-nowrap",
              "h-[clamp(24px,1.8vw,28px)] px-[clamp(8px,0.8vw,12px)]",
              "border border-[color:var(--text-primary)] rounded-full",
              "font-[family-name:var(--font-sans)] font-normal",
              "text-[clamp(10px,0.7vw,12px)] text-[color:var(--text-primary)]",
              "hover:bg-[color:var(--brand-tint)] transition-colors"
            )}
          >
            <span>Set Range</span>
            <CalendarIcon className="w-[clamp(12px,0.9vw,14px)] h-[clamp(12px,0.9vw,14px)] shrink-0" />
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
            "shadow-[0px_12px_32px_rgba(0,0,0,0.08)]"
          )}
        >
          {/* ── Calendar ── */}
          <div className="px-[clamp(10px,1.2vw,14px)] pb-[clamp(12px,1.5vw,16px)]">
            <DayPicker
              mode="range"
              selected={pending}
              onDayClick={handleDayClick}
              onSelect={() => {}}
              showOutsideDays={false}
              classNames={{
                root: "w-full",
                months: "w-full",
                month: "w-full",
                nav: "absolute inset-x-0 top-3 flex items-center justify-between z-10 px-1",
                button_previous: cn(
                  "flex items-center justify-center w-5 h-5 rounded-full",
                  "text-[color:var(--text-secondary)]",
                  "hover:bg-[color:var(--brand-tint)] transition-colors"
                ),
                button_next: cn(
                  "flex items-center justify-center w-5 h-5 rounded-full",
                  "text-[color:var(--text-secondary)]",
                  "hover:bg-[color:var(--brand-tint)] transition-colors"
                ),
                month_caption: cn(
                  "flex justify-center items-center relative",
                  "h-[clamp(38px,3vw,44px)]",
                  "border-b border-[color:var(--border-subtle)]",
                  "mx-[calc(-1*clamp(10px,1.2vw,14px))] px-4 mb-1.5"
                ),
                caption_label: cn(
                  "font-[family-name:var(--font-sans)] font-bold",
                  "text-[clamp(11px,0.85vw,13px)]",
                  "text-[color:var(--text-primary)]"
                ),
                month_grid: "w-full border-collapse table-fixed",
                weekdays: "flex w-full mb-0.5",
                weekday: cn(
                  "flex-1 text-center py-0.5",
                  "font-[family-name:var(--font-sans)] font-bold",
                  "text-[clamp(8px,0.6vw,10px)] tracking-[0.8px] uppercase",
                  "text-[color:var(--text-secondary)]"
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
                  const isStart = modifiers.range_start;
                  const isEnd = modifiers.range_end;
                  const isMiddle = modifiers.range_middle;
                  const isSelected = isStart || isEnd;

                  return (
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-full",
                        "h-[clamp(26px,2.2vw,30px)]"
                      )}
                    >
                      {/* Ribbon right half — start day */}
                      {isStart && !isEnd && (
                        <div className="absolute inset-y-0 left-1/2 right-0 bg-[color:var(--brand-50)]" />
                      )}
                      {/* Ribbon full — middle days */}
                      {isMiddle && (
                        <div className="absolute inset-0 bg-[color:var(--brand-50)]" />
                      )}
                      {/* Ribbon left half — end day */}
                      {isEnd && !isStart && (
                        <div className="absolute inset-y-0 left-0 right-1/2 bg-[color:var(--brand-50)]" />
                      )}

                      <button
                        {...props}
                        className={cn(
                          "relative z-10 flex items-center justify-center rounded-full",
                          "w-[clamp(24px,1.9vw,28px)] h-[clamp(24px,1.9vw,28px)]",
                          "font-[family-name:var(--font-sans)] font-medium leading-none",
                          "text-[clamp(10px,0.75vw,12px)]",
                          "transition-colors",
                          isSelected
                            ? "bg-[color:var(--brand-500)] text-white font-bold shadow-[var(--shadow-card-sm)]"
                            : isMiddle
                            ? "bg-transparent text-[color:var(--text-primary)] hover:bg-[color:var(--brand-100)]"
                            : "bg-transparent text-[color:var(--text-primary)] hover:bg-[color:var(--brand-50)]"
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
              "border-t border-[color:var(--border-subtle)]"
            )}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-sans)] font-bold",
                "text-[clamp(11px,0.85vw,13px)]",
                "text-[color:var(--brand-500)]"
              )}
            >
              {pending
                ? `${format(pending.from, "MMM d")} – ${format(pending.to, "MMM d")}`
                : "No range selected"}
            </span>

            <button
              onClick={handleApply}
              disabled={!pending}
              className={cn(
                "flex items-center justify-center rounded-lg",
                "w-[clamp(52px,4.5vw,62px)] h-[clamp(24px,2vw,28px)]",
                "font-[family-name:var(--font-sans)] font-bold",
                "text-[clamp(10px,0.7vw,11px)]",
                "text-[color:var(--brand-500)]",
                "border border-[color:var(--brand-500)]",
                "hover:bg-[color:var(--brand-tint)]",
                "transition-colors",
                "disabled:opacity-40 disabled:cursor-not-allowed"
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