import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onFromChange?: (date: Date | undefined) => void;
  onToChange?: (date: Date | undefined) => void;
  className?: string;
}

export default function DateRangePicker({
  from,
  to,
  onFromChange,
  onToChange,
  className,
}: DateRangePickerProps) {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const handleFromChange = (date: Date | undefined) => {
    if (!date) return onFromChange?.(undefined);
    date.setHours(12, 0, 0, 0); // ✅ prevent UTC offset from shifting the date
    onFromChange?.(date);
    setFromOpen(false); // ✅ auto-close popover
  };

  const handleToChange = (date: Date | undefined) => {
    if (!date) return onToChange?.(undefined);
    date.setHours(12, 0, 0, 0); // ✅ prevent UTC offset from shifting the date
    onToChange?.(date);
    setToOpen(false); // ✅ auto-close popover
  };

  const triggerClass = cn(
    "flex items-center justify-between gap-2",
    "h-[clamp(28px,2vw,36px)]",
    "min-w-[clamp(120px,8vw,160px)]",
    "px-[clamp(8px,0.7vw,12px)]",
    "bg-[color:var(--surface-card)]",
    "border border-[color:var(--border)]",
    "rounded-full",
    "text-[length:clamp(11px,0.75vw,13px)]",
    "font-[family-name:var(--font-sans)]",
    "text-[color:var(--text-primary)]",
    "transition-colors duration-150",
    "hover:bg-[color:var(--brand-tint)]",
    "whitespace-nowrap",
  );

  return (
    <div className={cn("flex items-center gap-[clamp(6px,0.5vw,12px)]", className)}>

      {/* From Date */}
      <Popover open={fromOpen} onOpenChange={setFromOpen}>
        <PopoverTrigger asChild>
          <button className={triggerClass}>
            <span>{from ? format(from, "dd MMM yyyy") : "From Date"}</span>
            <CalendarDays className="w-3.5 h-3.5 shrink-0 opacity-70" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-auto p-0 overflow-hidden rounded-2xl shadow-lg"
        >
          <Calendar
            mode="single"
            selected={from}
            onSelect={handleFromChange}
            disabled={to ? { after: to } : undefined}
          />
        </PopoverContent>
      </Popover>

      {/* To Date */}
      <Popover open={toOpen} onOpenChange={setToOpen}>
        <PopoverTrigger asChild>
          <button className={triggerClass}>
            <span>{to ? format(to, "dd MMM yyyy") : "To Date"}</span>
            <CalendarDays className="w-3.5 h-3.5 shrink-0 opacity-70" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-auto p-0 overflow-hidden rounded-2xl shadow-lg"
        >
          <Calendar
            mode="single"
            selected={to}
            onSelect={handleToChange}
            disabled={from ? { before: from } : undefined}
          />
        </PopoverContent>
      </Popover>

    </div>
  );
}