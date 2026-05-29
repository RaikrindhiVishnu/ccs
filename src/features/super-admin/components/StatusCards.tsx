import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { formatNumber } from "../utils/formatters";
import type { StatusCardItem } from "../types/dashboard";

interface Props {
  cards: StatusCardItem[];
}

const iconMap = {
  approved: {
    Icon: CheckCircle2,
    bg: "bg-[#E8F5E9]",
    iconColor: "text-[#4CAF50]",
  },
  rejected: {
    Icon: XCircle,
    bg: "bg-[#FFEBEE]",
    iconColor: "text-[#E53935]",
  },
  "in-progress": {
    Icon: Clock,
    bg: "bg-[#FFF8E1]",
    iconColor: "text-[#F9A825]",
  },
};

const StatusCards: React.FC<Props> = ({ cards }) => {
  return (
    <div className="flex gap-3 lg:gap-4">
      {cards.map((card) => {
        const config = iconMap[card.type];
        const { Icon } = config;

        return (
          <div
            key={card.type}
            className={cn(
              "flex items-center gap-3 lg:gap-4",
              "bg-[var(--surface-card)] rounded-2xl shadow-sm",
              "px-4 lg:px-5 xl:px-6 py-3 lg:py-4",
              "flex-1 min-w-[120px]",
            )}
          >
            {/* Icon circle */}
            <div
              className={cn(
                "flex items-center justify-center shrink-0",
                "w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12",
                "rounded-full",
                config.bg,
              )}
            >
              <Icon
                size={20}
                strokeWidth={2}
                className={config.iconColor}
              />
            </div>

            {/* Value + Label */}
            <div className="flex flex-col gap-0">
              <span className="font-inter font-bold text-[1.125rem] lg:text-[1.25rem] xl:text-[1.375rem] text-[var(--text-primary)] leading-tight">
                {formatNumber(card.value)}
              </span>
              <span className="font-inter font-normal text-[0.6875rem] lg:text-[0.75rem] text-[var(--text-muted)]">
                {card.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatusCards;
