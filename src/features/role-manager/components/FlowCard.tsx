import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface FlowCardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export const FlowCard: React.FC<FlowCardProps> = ({ children, header, className }) => {
  return (
    <Card className={cn(
      "bg-(--surface-card) rounded-4xl border border-(--border) shadow-(--shadow-card) flex flex-col overflow-hidden",
      "w-full h-100 p-0",
      className
    )}>
      {header && (
        <div className="px-8 pt-6 pb-2">
          {header}
        </div>
      )}
      <div className={cn(
        "flex-1 overflow-y-auto custom-scrollbar px-8",
        header ? "pb-6" : "py-6"
      )}>
        {children}
      </div>
    </Card>
  );
};
