import { Search } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";

interface IODashboardHeaderProps {
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  titleClassName?: string;
  searchWrapperClassName?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

export const IODashboardHeader = ({
  title = "INTELLIGENCE OFFICER DASHBOARD",
  description = "Next-generation platform infrastructure for scaling sustainable estates.",
  searchPlaceholder = "Search...",
  titleClassName,
  searchWrapperClassName,
  searchValue,
  onSearchChange,
}: IODashboardHeaderProps) => {
  return (
    <section
      className="
        flex
        flex-col

        gap-4

        w-full
        min-w-0

        lg:flex-row
        lg:items-center
        lg:justify-between
        lg:gap-6
      "
    >
      {/* LEFT */}
      <div className="flex flex-1 min-w-0 flex-col gap-[0.45rem]">
        {/* TITLE */}
        <Typography
          as="span"
          variant="span"
          style={{ fontWeight: 600 }}
          className={
            titleClassName ??
            `
              uppercase
              break-words

              font-[var(--font-sans)]
              font-semibold

              leading-[125%]
              tracking-[0]

              text-[clamp(1.1rem,1.875vw,1.75rem)]

              text-[var(--text-strong)]
            `
          }
        >
          {title}
        </Typography>

        {/* DESCRIPTION */}
        {description && (
          <Typography
            as="span"
            variant="span"
            className="
              break-words

              font-[var(--font-sans)]
              font-normal

              leading-[129%]

              text-[clamp(0.75rem,0.972vw,0.9375rem)]

              text-[var(--surface-sidebar-accent)]
            "
          >
            {description}
          </Typography>
        )}
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-auto lg:flex-shrink-0">
        <Input
          variant="white"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          icon={
            <Search
              className="
                shrink-0

                text-[var(--text-subtle)]

                w-[clamp(1.25rem,1.667vw,1.5rem)]
                h-[clamp(1.25rem,1.667vw,1.5rem)]
              "
              strokeWidth={1.8}
            />
          }
          wrapperClassName={`
            !bg-[var(--surface-card)]

            !rounded-full
            !shadow-none
            !border-none

            !w-full

            lg:!w-[clamp(20rem,26.111vw,28rem)]

            !h-[clamp(2.75rem,3.611vw,3.25rem)]

            !px-[clamp(0.875rem,1.389vw,1.25rem)]

            !gap-[0.5rem]

            ${searchWrapperClassName ?? ""}
          `}
          className="
            !font-normal
            !font-[var(--font-sans)]

            placeholder:!text-[var(--text-subtle)]

            !text-[var(--text-subtle)]

            text-[clamp(0.875rem,1.111vw,1rem)]
          "
        />
      </div>
    </section>
  );
};

export default IODashboardHeader;