import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps {
  url?: string;
  initials?: string;
  name: string;
  variant?: "list" | "detail";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  url,
  initials,
  name,
  variant = "list",
  className,
}) => {
  return (
    <div
      className={cn(
        "shrink-0 rounded-full overflow-hidden flex items-center justify-center bg-[color:var(--avatar-fallback)] shadow-[0px_2px_4px_rgba(0,0,0,0.10)]",
        variant === "list"
          ? "w-[3rem] h-[3rem] lg:w-[3.25rem] lg:h-[3.25rem] xl:w-[3.5rem] xl:h-[3.5rem] 2xl:w-[4rem] 2xl:h-[4rem]"
          : "border-[3px] border-white -mt-[2rem] lg:-mt-[2.25rem] xl:-mt-[2.75rem] 2xl:-mt-[3.25rem] w-[4.5rem] h-[4.5rem] lg:w-[5.625rem] lg:h-[5.625rem] xl:w-[6.875rem] xl:h-[6.875rem] 2xl:w-[8.125rem] 2xl:h-[8.125rem]",
        className
      )}
    >
      {url ? (
        <img src={url} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span
          className={cn(
            "font-bold text-white font-[family-name:var(--font-heading)]",
            variant === "list"
              ? "text-[0.875rem] lg:text-[0.9375rem] xl:text-[1rem] 2xl:text-[1.125rem]"
              : "text-[1.25rem] lg:text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem]"
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
};

export default Avatar;
