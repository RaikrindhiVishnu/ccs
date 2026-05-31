import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Avatar from "./Avatar";
import StatusBadge, { type AgentStatus } from "./StatusBadge";
import location from "@/assets/location.svg";

interface AgentData {
  id: string;
  name: string;
  location: string;
  status: AgentStatus;
  avatarUrl?: string;
  initials?: string;
}

interface AgentRowProps {
  agent: AgentData;
  onViewProfile: (id: string) => void;
}

const LocationIcon = () => (
  <img
    src={location}
    alt="location"
    className="flex-none object-contain"
    style={{
      width: "0.583rem",
      height: "0.729rem",
    }}
  />
);

export const AgentRow: React.FC<AgentRowProps> = ({
  agent,
  onViewProfile,
}) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-between",
        "bg-[color:var(--surface-card)]",
        "border border-[color:var(--border-soft)]",
        "shadow-[0px_20px_40px_rgba(0,49,50,0.06)]",
        "rounded-[1.5rem] lg:rounded-[1.75rem] xl:rounded-[2rem]",
        "px-[1.25rem] lg:px-[1.375rem] xl:px-[1.75rem]",
        "h-[5.625rem] lg:h-[6.25rem] xl:h-[6.875rem] 2xl:h-[7.125rem]",
        "transition-shadow duration-200",
        "hover:shadow-[0px_24px_48px_rgba(0,49,50,0.10)]"
      )}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4 lg:gap-5 xl:gap-6 min-w-0">
        <Avatar
          url={agent.avatarUrl}
          initials={agent.initials}
          name={agent.name}
          variant="list"
        />

        <div className="flex flex-col gap-1.5 lg:gap-2 w-[8.5rem] lg:w-[9.5rem] xl:w-[8rem] shrink-0">
          <Typography
            variant="h4"
            className="
              font-[family-name:var(--font-heading)]
              font-bold
              text-[color:var(--text-heading)]
              leading-none
              truncate
              !text-[1rem]
              lg:!text-[1.0625rem]
              xl:!text-[1.125rem]
              2xl:!text-[1.25rem]
            "
          >
            {agent.name}
          </Typography>

          <div className="flex items-center gap-1.5">
            <LocationIcon />
            <span
              className="
                text-[color:var(--text-secondary)]
                font-[family-name:var(--font-sans)]
                leading-none
                truncate
                text-[0.6875rem]
                lg:text-[0.75rem]
                xl:text-[0.8125rem]
                2xl:text-[0.875rem]
              "
            >
              {agent.location}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="ml-0 lg:ml-2 shrink-0">
          <StatusBadge status={agent.status} variant="list" />
        </div>
      </div>

      {/* Button Section */}
      <Button
        variant="primary"
        onClick={() => onViewProfile(agent.id)}
        className="
          !h-[2.25rem]
          lg:!h-[2.5rem]
          xl:!h-[2.625rem]
          !rounded-full
          !text-[0.625rem]
          lg:!text-[0.6875rem]
          xl:!text-[0.75rem]
          2xl:!text-[0.8125rem]
          !px-4
          lg:!px-5
          xl:!px-6
          uppercase
          shrink-0
        "
      >
        VIEW PROFILE
      </Button>
    </div>
  );
};

export default AgentRow;
