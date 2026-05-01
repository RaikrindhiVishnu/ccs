import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Plus } from "lucide-react";
import location from "@/assets/location.svg";

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
        "min-w-[8.25rem]",   // was min-w-[132px]  → 132/16 = 8.25rem
        "h-[1.75rem]",       // was h-[28px]       → 28/16  = 1.75rem
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
            "text-[0.6875rem] lg:text-[0.75rem] xl:text-[0.8125rem]",
            // was text-[11px] → 11/16=0.6875rem  |  12px → 0.75rem  |  13px → 0.8125rem
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
      "w-[3rem] h-[3rem]",             // was w-[48px]  → 48/16 = 3rem
      "lg:w-[3.25rem] lg:h-[3.25rem]", // was 52px      → 52/16 = 3.25rem
      "xl:w-[3.5rem] xl:h-[3.5rem]",   // was 56px      → 56/16 = 3.5rem
      "2xl:w-[4rem] 2xl:h-[4rem]",     // was 64px      → 64/16 = 4rem
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
          text-[0.875rem]
          lg:text-[0.9375rem]
          xl:text-[1rem]
          2xl:text-[1.125rem]
        "
        // was 14px→0.875rem | 15px→0.9375rem | 16px→1rem | 18px→1.125rem
      >
        {initials}
      </span>
    )}
  </div>
);

// ─── Location Icon ────────────────────────────────────────────────────────────

const LocationIcon = () => (
  <img
    src={location}
    alt="location"
    className="flex-none object-contain"
    style={{
      width: "0.583rem",   // was 9.33px  → 9.33/16 ≈ 0.583rem
      height: "0.729rem",  // was 11.67px → 11.67/16 ≈ 0.729rem
    }}
  />
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
      "rounded-[1.5rem] lg:rounded-[1.75rem] xl:rounded-[2rem]",
      // was rounded-[24px]→1.5rem | [28px]→1.75rem | [32px]→2rem
      "grid items-center",
      "grid-cols-[minmax(0,1fr)_10rem_10rem]",
      // was 160px → 160/16 = 10rem
      "gap-4 lg:gap-6 xl:gap-8",
      "px-[1.25rem] lg:px-[1.375rem] xl:px-[1.75rem]",
      // was px-[20px]→1.25rem | [22px]→1.375rem | [28px]→1.75rem
      "h-[5.625rem] lg:h-[6.25rem] xl:h-[6.875rem] 2xl:h-[7.125rem]",
      // was h-[90px]→5.625rem | [100px]→6.25rem | [110px]→6.875rem | [114px]→7.125rem
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
            !text-[1rem]
            lg:!text-[1.0625rem]
            xl:!text-[1.125rem]
            2xl:!text-[1.25rem]
          "
          // was 16px→1rem | 17px→1.0625rem | 18px→1.125rem | 20px→1.25rem
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
              text-[0.6875rem]
              lg:text-[0.75rem]
              xl:text-[0.8125rem]
              2xl:text-[0.875rem]
            "
            // was 11px→0.6875rem | 12px→0.75rem | 13px→0.8125rem | 14px→0.875rem
          >
            {agent.location}
          </span>
        </div>
      </div>
    </div>

    {/* Status Column */}
    <div className="w-[9.375rem] flex justify-start">
      {/* was w-[150px] → 150/16 = 9.375rem */}
      <StatusBadge status={agent.status} />
    </div>

    {/* Button Column */}
    <div className="w-[9.375rem] flex justify-end">
      {/* was w-[150px] → 9.375rem */}
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
        "
        // h: 36px→2.25rem | 40px→2.5rem | 42px→2.625rem
        // text: 10px→0.625rem | 11px→0.6875rem | 12px→0.75rem | 13px→0.8125rem
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
  const agentList = agents.length > 0 ? agents : fallbackAgents;

  const [visibleCount, setVisibleCount] = React.useState(5);

  const visibleAgents = agentList.slice(0, visibleCount);

  const hasMore = visibleCount < agentList.length;

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
          "max-w-[118.75rem]",
          // was max-w-[1900px] → 1900/16 = 118.75rem
          "px-[1.5rem]",
          "lg:px-[2.5rem]",
          "xl:px-[3.5rem]",
          "2xl:px-[4rem]",
          // was 24px→1.5rem | 40px→2.5rem | 56px→3.5rem | 64px→4rem
          "py-[1.5rem]",
          "lg:py-[2rem]",
          "xl:py-[2.5rem]",
          "2xl:py-[3rem]",
          // was 24px→1.5rem | 32px→2rem | 40px→2.5rem | 48px→3rem
        )}
      >
        {/* Header */}
        <div
          className="
            flex items-center justify-between
            mb-[1.5rem]
            lg:mb-[1.75rem]
            xl:mb-[2rem]
          "
        >
          <Typography
            variant="h1"
            className="
              font-[family-name:var(--font-heading)]
              font-bold
              text-[color:var(--foreground)]
              leading-none
              !text-[1.625rem]
              lg:!text-[1.875rem]
              xl:!text-[2.0625rem]
              2xl:!text-[2.25rem]
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
              !h-[2.75rem]
              lg:!h-[3rem]
              xl:!h-[3.25rem]
              !rounded-[var(--btn-radius-pill)]
              gap-1.5
              !px-[1.125rem]
              lg:!px-[1.375rem]
              xl:!px-[1.625rem]
              !text-[0.6875rem]
              lg:!text-[0.75rem]
              xl:!text-[0.8125rem]
              2xl:!text-[0.875rem]
            "
          >
            Create Agent
          </Button>
        </div>

        {/* Agent List */}
        <div
          className="
            flex flex-col
            gap-[0.75rem]
            lg:gap-[0.875rem]
            xl:gap-[1rem]
          "
          // was 12px→0.75rem | 14px→0.875rem | 16px→1rem
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
            mt-[1.5rem]
            lg:mt-[1.75rem]
            xl:mt-[2rem]
          "
          // was 24px→1.5rem | 28px→1.75rem | 32px→2rem
        >
          <Button
            variant="secondary"
            onClick={() => setVisibleCount((c) => c + 7)}
            disabled={!hasMore}
            className="
              !h-[3.25rem]
              lg:!h-[3.5rem]
              xl:!h-[3.75rem]
              !rounded-[var(--btn-radius-pill)]
              bg-[color:var(--card)]
              border
              border-[color:var(--border-soft)]
              shadow-none
              !px-[2.25rem]
              lg:!px-[2.75rem]
              xl:!px-[3.5rem]
              uppercase
              tracking-[0.16em]
              font-medium
              text-[color:var(--foreground)]
              !text-[0.6875rem]
              lg:!text-[0.75rem]
              xl:!text-[0.8125rem]
              2xl:!text-[0.875rem]
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