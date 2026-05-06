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
      "bg-(--card) rounded-xl border border-(--border) shadow-(--shadow-card) flex flex-col overflow-hidden",
      "w-full h-100 px-8 py-4",
      className
    )}>
      {header && (
        <div className="p-6 pb-2">
          {header}
        </div>
      )}
      <div className="flex-1 overflow-y-auto  custom-scrollbar">
        {children}
      </div>
    </Card>
  );
};
