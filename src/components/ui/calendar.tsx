import * as React from "react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // Fixed width so the popover stays compact regardless of viewport
      className={cn(
        "group/calendar bg-background p-3 rounded-xl w-[280px]",
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),

        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),

        month: cn(
          "flex w-full flex-col gap-3",
          defaultClassNames.month,
        ),

        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav,
        ),

        button_previous: cn(
          "flex items-center justify-center rounded-md hover:bg-accent",
          "size-7 p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_previous,
        ),

        button_next: cn(
          "flex items-center justify-center rounded-md hover:bg-accent",
          "size-7 p-0 select-none aria-disabled:opacity-50",
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          "flex h-7 w-full items-center justify-center px-8",
          defaultClassNames.month_caption,
        ),

        dropdowns: cn(
          "flex h-7 w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),

        dropdown_root: cn(
          "relative rounded-md",
          defaultClassNames.dropdown_root,
        ),

        dropdown: cn(
          "absolute inset-0 bg-popover opacity-0",
          defaultClassNames.dropdown,
        ),

        caption_label: cn(
          "font-medium select-none text-sm flex items-center gap-1",
          defaultClassNames.caption_label,
        ),

        // Fixed table layout so columns are even
        month_grid: "w-full border-collapse table-fixed",

        weekdays: cn("flex", defaultClassNames.weekdays),

        weekday: cn(
          // Compact weekday headers
          "flex-1 text-[0.7rem] font-normal text-muted-foreground select-none text-center py-1",
          defaultClassNames.weekday,
        ),

        week: cn(
          "mt-1 flex w-full",
          defaultClassNames.week,
        ),

        week_number_header: cn(
          "w-6 select-none",
          defaultClassNames.week_number_header,
        ),

        week_number: cn(
          "text-[0.7rem] text-muted-foreground select-none",
          defaultClassNames.week_number,
        ),

        // Removed aspect-square so height is controlled by the button, not the cell
        day: cn(
          "group/day relative flex-1 p-0 text-center select-none",
          defaultClassNames.day,
        ),

        range_start: cn(
          "relative isolate z-0 rounded-l-md bg-muted",
          defaultClassNames.range_start,
        ),

        range_middle: cn("rounded-none", defaultClassNames.range_middle),

        range_end: cn(
          "relative isolate z-0 rounded-r-md bg-muted",
          defaultClassNames.range_end,
        ),

        today: cn(
          "rounded-md bg-muted text-foreground",
          defaultClassNames.today,
        ),

        outside: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.outside,
        ),

        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),

        hidden: cn("invisible", defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),

        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left")
            return (
              <ChevronLeftIcon className={cn("size-3.5", className)} {...props} />
            );
          if (orientation === "right")
            return (
              <ChevronRightIcon className={cn("size-3.5", className)} {...props} />
            );
          return (
            <ChevronDownIcon className={cn("size-3.5", className)} {...props} />
          );
        },

        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),

        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-7 items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & {
  locale?: Partial<Locale>;
}) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Fixed size: 32×32px square, never grows beyond that
        "relative isolate z-10 flex h-8 w-full max-w-8 mx-auto",
        "flex-col gap-0.5 border-0 leading-none font-normal rounded-md p-0",
        "text-[0.8rem]",
        "data-[selected-single=true]:bg-primary",
        "data-[selected-single=true]:text-primary-foreground",
        "data-[range-start=true]:bg-primary",
        "data-[range-start=true]:text-primary-foreground",
        "data-[range-end=true]:bg-primary",
        "data-[range-end=true]:text-primary-foreground",
        "data-[range-middle=true]:bg-muted",
        "data-[range-middle=true]:text-foreground",
        "[&>span]:text-[0.65rem] [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };