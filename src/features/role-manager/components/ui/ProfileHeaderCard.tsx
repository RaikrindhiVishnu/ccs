import * as React from "react";
import { Typography } from "@/components/ui/typography";
import Avatar from "./Avatar";
import StatusBadge, { type AgentStatus } from "./StatusBadge";
import Bannar from "@/assets/Bannar.svg";

export interface AgentHeaderDetail {
  name: string;
  applicationId: string;
  status: AgentStatus;
  avatarUrl?: string;
  initials?: string;
}

interface ProfileHeaderCardProps {
  agent: AgentHeaderDetail;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  agent,
}) => {
  return (
    <div
      className="
        bg-[color:var(--surface-card)]
        rounded-[1rem]
        lg:rounded-[1.25rem]
        xl:rounded-[1.5rem]
        shadow-[0px_0px_6px_rgba(0,0,0,0.12)]
        overflow-hidden
        relative
      "
    >
      {/* Banner */}
      <div className="h-[clamp(5rem,12vw,8.75rem)] overflow-hidden">
        <img src={Bannar} alt="Banner" className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div
        className="
          relative
          flex items-end justify-between
          px-[1.25rem]
          lg:px-[1.75rem]
          xl:px-[3.125rem]
          pb-[1rem]
          lg:pb-[1.125rem]
          xl:pb-[1.375rem]
        "
      >
        {/* Left */}
        <div
          className="
            flex items-end
            gap-[0.875rem]
            lg:gap-[1rem]
            xl:gap-[1.25rem]
          "
        >
          {/* Avatar */}
          <Avatar
            url={agent.avatarUrl}
            initials={agent.initials}
            name={agent.name}
            variant="detail"
          />

          {/* Info */}
          <div
            className="
              flex flex-col
              gap-[0.25rem]
              lg:gap-[0.375rem]
              pb-[0.125rem]
            "
          >
            <Typography
              variant="h3"
              className="
                font-bold
                leading-none
                font-[family-name:var(--font-sans)]
                text-[color:var(--profile-text)]
                !text-[1rem]
                lg:!text-[1.125rem]
                xl:!text-[1.25rem]
                2xl:!text-[1.5rem]
              "
            >
              {agent.name}
            </Typography>
            <span
              className="
                font-medium
                leading-none
                font-[family-name:var(--font-sans)]
                text-[color:var(--text-supporting)]
                text-[0.6875rem]
                lg:text-[0.75rem]
                xl:text-[0.8125rem]
                2xl:text-[1rem]
              "
            >
              Application ID : {agent.applicationId}
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="pb-[0.125rem]">
          <StatusBadge status={agent.status} variant="detail" />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeaderCard;
