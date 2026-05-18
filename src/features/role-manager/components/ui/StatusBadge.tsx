import * as React from "react";
import { cn } from "@/lib/utils";

export type AgentStatus = "Pending Review" | "Approved" | "Rejected";

interface StatusBadgeProps {
  status: AgentStatus;
  variant?: "list" | "detail";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  variant = "list",
  className,
}) => {
  const config = {
    "Pending Review": {
      dot: "bg-[color:var(--brand-500)]",
      text: "text-[color:var(--brand-500)]",
      bg: "bg-[color:var(--status-pending-bg)]",
    },
    Approved: {
      dot: "bg-[color:var(--status-success)]",
      text: "text-[color:var(--status-success)]",
      bg: "bg-[color:var(--status-success-soft)]",
    },
    Rejected: {
      dot: "bg-[color:var(--status-danger)]",
      text: "text-[color:var(--status-danger)]",
      bg: "bg-[color:var(--status-danger-soft)]",
    },
  };

  const c = config[status] || config["Pending Review"];

  if (variant === "list") {
    return (
      <div
        className={cn(
          "inline-flex items-center justify-center min-w-[8.25rem] h-[1.75rem] px-3",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <span className={cn("w-2 h-2 rounded-full shrink-0", c.dot)} />
          <span
            className={cn(
              "font-medium leading-none whitespace-nowrap font-[family-name:var(--font-sans)]",
              "text-[0.6875rem] lg:text-[0.75rem] xl:text-[0.8125rem]",
              c.text
            )}
          >
            {status}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        c.bg,
        className
      )}
    >
      <span className={cn("w-2 h-2 rounded-full shrink-0", c.dot)} />
      <span
        className={cn(
          "font-medium leading-none font-[family-name:var(--font-sans)]",
          "text-[0.6875rem] lg:text-[0.75rem] xl:text-[0.8125rem] 2xl:text-[0.875rem]",
          c.text
        )}
      >
        {status}
      </span>
    </div>
  );
};

export default StatusBadge;
