import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

interface SectionCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[color:var(--surface-card)] rounded-[1rem] lg:rounded-[1.25rem] xl:rounded-[1.5rem] shadow-[0px_0px_6px_rgba(0,0,0,0.12)] px-[1.25rem] lg:px-[1.5rem] xl:px-[1.875rem] pt-[1.125rem] lg:pt-[1.25rem] xl:pt-[1.5rem] pb-[1.25rem] lg:pb-[1.5rem] xl:pb-[1.75rem]",
        className
      )}
    >
      <Typography
        variant="h3"
        className="
          font-semibold
          leading-none
          font-[family-name:var(--font-sans)]
          text-[color:var(--text-subtle)]
          mb-[1.25rem]
          lg:mb-[1.5rem]
          xl:mb-[1.75rem]
          !text-[1rem]
          lg:!text-[1.125rem]
          xl:!text-[1.25rem]
          2xl:!text-[1.5rem]
        "
      >
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default SectionCard;
