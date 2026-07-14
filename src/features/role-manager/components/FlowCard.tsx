import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface FlowCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export const FlowCard: React.FC<FlowCardProps> = ({
  children,
  header,
  className,
}) => {
  return (
    <Card
      className={cn(
        `
        bg-white
        rounded-[28px]
        border border-[#E7EAEA]
        shadow-none
        overflow-hidden
        flex flex-col
        `,
        `
        w-full
        min-h-[478px]
        `,
        className
      )}
    >
      {header && (
        <div className="px-6 min-[1920px]:px-8 min-[2560px]:px-10 pt-5 pb-2">
          {header}
        </div>
      )}

      <div
        className={cn(
          "flex-1 overflow-y-auto custom-scrollbar px-6 min-[1920px]:px-8 min-[2560px]:px-10",
          header ? "pb-5" : "py-5"
        )}
      >
        {children}
      </div>
    </Card>
  );
};
