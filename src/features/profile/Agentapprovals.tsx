import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Agent {
  id: string;
  name: string;
  location: string;
  status: "Pending Review" | "Approved" | "Rejected";
  avatarUrl?: string;
  initials?: string;
}

interface AgentApprovalsPageProps {
  agents?: Agent[];
}

// ─── Fallback Mock Data ──────────────────────────────────────────────────────

const fallbackAgents: Agent[] = [
  {
    id: "1",
    name: "Aarav Sharma",
    location: "Mumbai, Maharashtra",
    status: "Pending Review",
    initials: "AS",
  },
  {
    id: "2",
    name: "Ananthu",
    location: "Bengaluru, Karnataka",
    status: "Pending Review",
    initials: "AN",
  },
  {
    id: "3",
    name: "Vikram Kumar",
    location: "Delhi, NCR",
    status: "Pending Review",
    initials: "VK",
  },
  {
    id: "4",
    name: "Sunil Varma",
    location: "Delhi, NCR",
    status: "Approved",
    initials: "SV",
  },
  {
    id: "5",
    name: "Sandeep Bhukya",
    location: "Bengaluru, Karnataka",
    status: "Rejected",
    initials: "SB",
  },
   {
    id: "6",
    name: "Sandeep Bhukya",
    location: "Bengaluru, Karnataka",
    status: "Rejected",
    initials: "SB",
  },
   {
    id: "7",
    name: "Sandeep Bhukya",
    location: "Bengaluru, Karnataka",
    status: "Rejected",
    initials: "SB",
  },
   {
    id: "8",
    name: "Sandeep Bhukya",
    location: "Bengaluru, Karnataka",
    status: "Rejected",
    initials: "SB",
  },
   {
    id: "9",
    name: "Sandeep Bhukya",
    location: "Bengaluru, Karnataka",
    status: "Rejected",
    initials: "SB",
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({
  status,
}: {
  status: Agent["status"];
}) => {
  const config = {
    "Pending Review": {
      dot: "bg-[color:var(--primary)]",
      text: "text-[color:var(--primary)]",
     
    },

    Approved: {
      dot: "bg-[color:var(--success-green)]",
      text: "text-[color:var(--success-green)]",
 
    },

    Rejected: {
      dot: "bg-[color:var(--danger)]",
      text: "text-[color:var(--danger)]",

    },
  };

  const c = config[status];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[132px]",
        "h-[28px]",
        "px-3",

      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "w-2 h-2 rounded-full shrink-0",
            c.dot,
          )}
        />

        <span
          className={cn(
            "font-medium leading-none whitespace-nowrap",
            "font-[family-name:var(--font-sans)]",
            "text-[11px] lg:text-[12px] xl:text-[13px]",
            c.text,
          )}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({
  url,
  initials,
  name,
}: {
  url?: string;
  initials?: string;
  name: string;
}) => (
  <div
    className={cn(
      "shrink-0",
      "rounded-full",
      "overflow-hidden",
      "flex items-center justify-center",

      "bg-[color:var(--avatar-fallback)]",

      "shadow-[0px_2px_4px_rgba(0,0,0,0.10)]",

      "w-[48px] h-[48px]",
      "lg:w-[52px] lg:h-[52px]",
      "xl:w-[56px] xl:h-[56px]",
      "2xl:w-[64px] 2xl:h-[64px]",
    )}
  >
    {url ? (
      <img
        src={url}
        alt={name}
        className="w-full h-full object-cover"
      />
    ) : (
      <span
        className="
          font-bold
          text-white
          font-[family-name:var(--font-heading)]

          text-[14px]
          lg:text-[15px]
          xl:text-[16px]
          2xl:text-[18px]
        "
      >
        {initials}
      </span>
    )}
  </div>
);

// ─── Location Icon ────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <svg
    width="9"
    height="12"
    viewBox="0 0 9 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0"
  >
    <path
      d="M4.5 0C2.01 0 0 2.01 0 4.5C0 7.875 4.5 12 4.5 12C4.5 12 9 7.875 9 4.5C9 2.01 6.99 0 4.5 0ZM4.5 6C3.675 6 3 5.325 3 4.5C3 3.675 3.675 3 4.5 3C5.325 3 6 3.675 6 4.5C6 5.325 5.325 6 4.5 6Z"
      fill="var(--text-neutral)"
    />
  </svg>
);

// ─── Agent Row ────────────────────────────────────────────────────────────────

const AgentRow = ({
  agent,
  onViewProfile,
}: {
  agent: Agent;
  onViewProfile: (id: string) => void;
}) => (
  <div
    className={cn(
      "relative w-full",

      "bg-[color:var(--card)]",

      "border border-[color:var(--border-soft)]",

      "shadow-[0px_20px_40px_rgba(0,49,50,0.06)]",

      "rounded-[24px] lg:rounded-[28px] xl:rounded-[32px]",

      "grid items-center",

     "grid-cols-[minmax(0,1fr)_160px_160px]",

      "gap-4 lg:gap-6 xl:gap-8",

      "px-[20px] lg:px-[22px] xl:px-[28px]",

      "h-[90px] lg:h-[100px] xl:h-[110px] 2xl:h-[114px]",

      "transition-shadow duration-200",

      "hover:shadow-[0px_24px_48px_rgba(0,49,50,0.10)]",
    )}
  >
    {/* Left Section */}
   <div
  className="
    flex items-center
    gap-4 lg:gap-5 xl:gap-6

    min-w-0
    overflow-hidden
  "
>
      <Avatar
        url={agent.avatarUrl}
        initials={agent.initials}
        name={agent.name}
      />

      <div className="flex flex-col gap-1 min-w-0">
        <Typography
          variant="h4"
          className="
            font-[family-name:var(--font-heading)]
            font-bold
            text-[color:var(--text-dark)]
            leading-none
            truncate

            !text-[16px]
            lg:!text-[17px]
            xl:!text-[18px]
            2xl:!text-[20px]
          "
        >
          {agent.name}
        </Typography>

        <div className="flex items-center gap-1.5">
          <LocationIcon />

          <span
            className="
              text-[color:var(--text-neutral)]

              font-[family-name:var(--font-sans)]

              leading-none

              text-[11px]
              lg:text-[12px]
              xl:text-[13px]
              2xl:text-[14px]
            "
          >
            {agent.location}
          </span>
        </div>
      </div>
    </div>

    {/* Status Column */}
    <div className="w-[150px] flex justify-start">
      <StatusBadge status={agent.status} />
    </div>

    {/* Button Column */}
    <div className="w-[150px] flex justify-end">
      <Button
        variant="primary"
        onClick={() => onViewProfile(agent.id)}
        className="
          !h-[36px]
          lg:!h-[40px]
          xl:!h-[42px]

          !rounded-full

          !text-[10px]
          lg:!text-[11px]
          xl:!text-[12px]
          2xl:!text-[13px]

          !px-4
          lg:!px-5
          xl:!px-6
        "
      >
        View Profile
      </Button>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export const AgentApprovalsPage = ({
  agents = [],
}: AgentApprovalsPageProps) => {

  const agentList =
    agents.length > 0
      ? agents
      : fallbackAgents;

  const [visibleCount, setVisibleCount] =
    React.useState(5);

  const visibleAgents =
    agentList.slice(0, visibleCount);

  const hasMore =
    visibleCount < agentList.length;

  const handleViewProfile = (id: string) => {
    console.log("View profile:", id);
  };

  const handleCreateAgent = () => {
    console.log("Create agent");
  };

  return (
    <main
      className="
        w-full
        min-h-screen

        bg-[color:var(--background)]

        font-[family-name:var(--font-sans)]
      "
    >
      <div
        className={cn(
          "mx-auto",

          "max-w-[1900px]",

          "px-[24px]",
          "lg:px-[40px]",
          "xl:px-[56px]",
          "2xl:px-[64px]",

          "py-[24px]",
          "lg:py-[32px]",
          "xl:py-[40px]",
          "2xl:py-[48px]",
        )}
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between

            mb-[24px]
            lg:mb-[28px]
            xl:mb-[32px]
          "
        >
          <Typography
            variant="h1"
            className="
              font-[family-name:var(--font-heading)]

              font-bold

              text-[color:var(--foreground)]

              leading-none

              !text-[26px]
              lg:!text-[30px]
              xl:!text-[33px]
              2xl:!text-[36px]
            "
          >
            Agent Approvals
          </Typography>

          <Button
            variant="primary"
            onClick={handleCreateAgent}
            leftIcon={
              <Plus
                size={16}
                strokeWidth={2.2}
              />
            }
            className="
              !h-[44px]
              lg:!h-[48px]
              xl:!h-[52px]

              !rounded-[var(--btn-radius-pill)]

              gap-1.5

              !px-[18px]
              lg:!px-[22px]
              xl:!px-[26px]

              !text-[11px]
              lg:!text-[12px]
              xl:!text-[13px]
              2xl:!text-[14px]
            "
          >
            Create Agent
          </Button>
        </div>

        {/* Agent List */}
        <div
          className="
            flex flex-col

            gap-[12px]
            lg:gap-[14px]
            xl:gap-[16px]
          "
        >
          {visibleAgents.map((agent) => (
            <AgentRow
              key={agent.id}
              agent={agent}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {/* Load More */}
        <div
          className="
            flex justify-center

            mt-[24px]
            lg:mt-[28px]
            xl:mt-[32px]
          "
        >
          <Button
            variant="secondary"
            onClick={() =>
              setVisibleCount((c) => c + 7)
            }
            disabled={!hasMore}
            className="
              !h-[52px]
              lg:!h-[56px]
              xl:!h-[60px]

              !rounded-[var(--btn-radius-pill)]

              bg-[color:var(--card)]

              border
              border-[color:var(--border-soft)]

              shadow-none

              !px-[36px]
              lg:!px-[44px]
              xl:!px-[56px]

              uppercase
              tracking-[0.16em]

              font-medium

              text-[color:var(--foreground)]

              !text-[11px]
              lg:!text-[12px]
              xl:!text-[13px]
              2xl:!text-[14px]

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Load More Applicants
          </Button>
        </div>
      </div>
    </main>
  );
};

export default AgentApprovalsPage;