import * as React from "react";
import { cn } from "@/lib/utils";

interface InfoFieldProps {
  label: string;
  value: string;
  className?: string;
}

export const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 lg:gap-[0.5rem] xl:gap-[0.625rem]",
        className
      )}
    >
      <span
        className="
          font-medium
          leading-none
          font-[family-name:var(--font-sans)]
          text-[color:var(--label-color)]
          text-[0.75rem]
          lg:text-[0.8125rem]
          xl:text-[0.875rem]
          2xl:text-[1rem]
        "
      >
        {label}
      </span>
      <span
        className="
          leading-snug
          font-[family-name:'Inter',sans-serif]
          text-[color:var(--profile-text)]
          text-[0.75rem]
          lg:text-[0.8125rem]
          xl:text-[0.8125rem]
          2xl:text-[0.875rem]
        "
      >
        {value}
      </span>
    </div>
  );
};

export default InfoField;
