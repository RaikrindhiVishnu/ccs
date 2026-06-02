import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export interface SuperAdminFarmlandData {
  id: string;
  title: string;
  area: string;
  cost: string;
  image: string;
  badges: string[];
  agent: {
    name: string;
    avatar: string;
  };
}

interface Props {
  data: SuperAdminFarmlandData;
  imagePosition?: "top" | "bottom";
  onViewDetails?: (id: string) => void;
  className?: string;
}

const SuperAdminFarmlandCard: React.FC<Props> = ({
  data,
  imagePosition = "top",
  onViewDetails,
  className,
}) => {
  const contentNode = (
    <div className="flex flex-col p-4 lg:p-6 gap-4">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {data.badges.map((badge, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-[#F2F4F7] text-[var(--text-primary)] rounded-full font-inter font-medium text-[0.625rem] lg:text-[0.6875rem] uppercase tracking-wide"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5">
        <Typography variant="h4" className="font-bold text-[1.125rem] lg:text-[1.25rem] text-[var(--text-primary)]">
          {data.title}
        </Typography>
        <Typography variant="span" className="font-normal text-[0.75rem] lg:text-[0.8125rem] text-[var(--text-muted)]">
          Area - {data.area}
        </Typography>
        <Typography variant="span" className="font-normal text-[0.75rem] lg:text-[0.8125rem] text-[var(--text-muted)]">
          Cost per acre - {data.cost}
        </Typography>
      </div>

      {/* Agent & Button */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <img
            src={data.agent.avatar}
            alt={data.agent.name}
            className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover border border-gray-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.agent.name)}&background=random`;
            }}
          />
          <span className="font-inter font-medium text-[0.6875rem] lg:text-[0.75rem] text-[var(--text-primary)]">
            {data.agent.name}
          </span>
        </div>

        <button
          onClick={() => onViewDetails?.(data.id)}
          className="px-4 py-1.5 rounded-full border border-[var(--border-strong)] bg-white text-[var(--text-primary)] hover:bg-gray-50 transition-colors font-inter font-medium text-[0.6875rem] lg:text-[0.75rem]"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const imageNode = (
    <div className="w-full h-[200px] shrink-0">
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-full object-cover"
      />
    </div>
  );

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden bg-[color:var(--surface-card)] rounded-[24px] shadow-sm border border-[var(--border-soft)]",
        className
      )}
    >
      {imagePosition === "top" ? (
        <>
          {imageNode}
          {contentNode}
        </>
      ) : (
        <>
          {contentNode}
          {imageNode}
        </>
      )}
    </Card>
  );
};

export default SuperAdminFarmlandCard;
