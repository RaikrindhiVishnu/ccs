import * as React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  message?: string;
  fullscreen?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  message = "Loading data...",
  fullscreen = false,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8 transition-all duration-300",
        fullscreen
          ? "fixed inset-0 z-50 bg-[color:var(--surface-page)]/80 backdrop-blur-md"
          : "w-full py-16",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <div className="absolute w-14 h-14 rounded-full border-4 border-solid border-[color:var(--brand-200)] opacity-20" />
        
        {/* Animated premium rotating blue gradient circle */}
        <div className="w-14 h-14 rounded-full border-4 border-solid border-transparent border-t-[color:var(--brand-500)] border-r-[color:var(--brand-500)] animate-spin" />
      </div>
      
      {message && (
        <span
          className="
            font-medium
            tracking-wide
            text-[color:var(--text-secondary)]
            font-[family-name:var(--font-sans)]
            text-[0.875rem]
            lg:text-[0.9375rem]
            xl:text-[1rem]
            animate-pulse
          "
        >
          {message}
        </span>
      )}
    </div>
  );
};

export default Loader;
