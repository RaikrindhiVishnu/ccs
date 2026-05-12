import { Search } from "lucide-react";

import { Typography } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";

interface IODashboardHeaderProps {
  title?: string;
  description?: string;
}

export const IODashboardHeader = ({
  title = "INTELLIGENCE OFFICER DASHBOARD",
  description = "Next-generation platform infrastructure for scaling sustainable estates.",
}: IODashboardHeaderProps) => {
  return (
    <section
      className="
        flex flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between

        gap-4
        lg:gap-6

        w-full
        min-w-0
      "
    >
      {/* LEFT */}
      <div
        className="
          flex flex-col
          gap-[0.45rem]
          min-w-0
          flex-1
        "
      >
        {/* TITLE */}
        <Typography
          as="span"
          variant="span"
          style={{ fontWeight: 600 }}
          className="
            uppercase
            font-[var(--font-sans)]
            leading-tight
            tracking-[0]
            break-words

            text-[1.1rem]
            sm:text-[1.3rem]
            md:text-[1.5rem]
            lg:text-[1.35rem]
            xl:text-[1.6875rem]
            2xl:text-[1.875rem]

            text-[var(--text-strong)]
          "
        >
          {title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          as="span"
          variant="span"
          className="
            font-normal
            font-[var(--font-sans)]
            leading-[129%]
            break-words

            text-[0.75rem]
            sm:text-[0.8rem]
            md:text-[0.85rem]
            lg:text-[0.8rem]
            xl:text-[0.875rem]
            2xl:text-[0.9375rem]

            text-[var(--surface-sidebar-accent)]
          "
        >
          {description}
        </Typography>
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-auto lg:flex-shrink-0">
        <Input
          variant="white"
          placeholder="Search..."
          icon={
            <Search
              className="
                w-[1rem]
                xl:w-[1.2rem]
                h-[1rem]
                xl:h-[1.2rem]
                text-[var(--text-secondary)]
              "
              strokeWidth={1.8}
            />
          }
          wrapperClassName="
            !bg-[var(--surface-card)]
            !h-[3rem]
            xl:!h-[3.5rem]
            !rounded-full
            !shadow-none
            !w-full
            lg:!w-[18rem]
            xl:!w-[23.5rem]
          "
          className="
            !font-normal
            !font-[var(--font-sans)]
            placeholder:!text-[var(--text-secondary)]

            !text-[0.8rem]
            xl:!text-[0.95rem]
          "
        />
      </div>
    </section>
  );
};

export default IODashboardHeader;