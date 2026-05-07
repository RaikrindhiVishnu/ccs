import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import arrowLeftIcon from "@/assets/arrow.svg";
// ─── Image imports ────────────────────────────────────────────────────────────
import regionalOfficerImg from "@/assets/role-regional-officer.svg";
import intelligenceOfficerImg from "@/assets/role-intelligence-officer.svg";
import fieldOfficerImg from "@/assets/role-field-officer.svg";
import agentImg from "@/assets/role-agent.svg";

// ─── Role data ────────────────────────────────────────────────────────────────

interface RoleItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
}

const ROLES: RoleItem[] = [
  {
    id: "regional-officer",
    title: "Regional Officer",
    description:
      "Oversees territory strategy and approves final land acquisitions.",
    badge: "Approval Authority",
    imageSrc: regionalOfficerImg,
    imageAlt: "Regional Officer",
  },
  {
    id: "intelligence-officer",
    title: "Intelligence Officer",
    description:
      "Validates documentation and ensures all assets are risk-free.",
    badge: "Risk Assessment",
    imageSrc: intelligenceOfficerImg,
    imageAlt: "Intelligence Officer",
  },
  {
    id: "field-officer",
    title: "Field Officer",
    description:
      "Conducts physical inspections to verify boundaries and reality.",
    badge: "Physical Verification",
    imageSrc: fieldOfficerImg,
    imageAlt: "Field Officer",
  },
  {
    id: "agent",
    title: "Agent",
    description: "Sources new land opportunities and drives the deal pipeline.",
    badge: "Deal Sourcing",
    imageSrc: agentImg,
    imageAlt: "Agent",
  },
];

const GoBackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "inline-flex flex-row items-center gap-2 self-start",
      "bg-[var(--card)]",
      "rounded-[60px]",
      "px-5",
      "h-10 lg:h-11 xl:h-[52px] 2xl:h-[56px]",
      "shadow-[0px_0px_4px_rgba(0,0,0,0.12)]",
      "transition-all duration-150 hover:opacity-80 active:scale-[0.97]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
      "cursor-pointer border-0",
    )}
    aria-label="Go Back to Dashboard"
  >
    {/* Arrow icon — Figma: 24×24, rotated so it points left */}
    <span className="flex items-center justify-center shrink-0 w-5 h-5 lg:w-6 lg:h-6">
      <img src={arrowLeftIcon} alt="Back Arrow" className="w-5 h-5 shrink-0" />
    </span>

    <Typography
      as="span"
      variant="span"
      className={cn(
        "font-[family-name:var(--font-sans)] font-normal",
        "text-[var(--foreground)]",
        "text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[16px]",
        "leading-[110%] whitespace-nowrap",
      )}
    >
      Go Back to Dashboard
    </Typography>
  </button>
);


const RoleCard: React.FC<RoleItem> = ({
  title,
  description,
  badge,
  imageSrc,
  imageAlt,
}) => (
  <div
    className={cn(
      "relative flex flex-col w-full overflow-hidden",
      "bg-[var(--card)]",
      "rounded-[32px] lg:rounded-[38px] xl:rounded-[46px] 2xl:rounded-[46px]",
      "shadow-[0px_0px_8.4px_rgba(0,0,0,0.06)]",
      "h-[280px] lg:h-[300px] xl:h-[331px] 2xl:h-[360px]",
    )}
  >
    <div
      className={cn(
        "relative w-full bg-[var(--card)] shrink-0",
        "h-[52%]",
        "px-3 pt-4 pb-0",
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-contain object-bottom"
      />
    </div>

    <div
      className={cn(
        "flex flex-col flex-1 min-h-0 bg-[var(--card)]",
        "px-5 pt-3 pb-5",
        "gap-1.5",
      )}
    >
      <Typography
        as="h3"
        variant="span"
        className={cn(
          "font-[family-name:var(--font-sans)] font-medium",
          "text-[var(--foreground)]",
          "tracking-[-0.01em] leading-5",
          "text-[13px] lg:text-[14px] xl:text-[16px] 2xl:text-[16px]",
        )}
      >
        {title}
      </Typography>
      <Typography
        as="p"
        variant="span"
        className={cn(
          "font-[family-name:var(--font-sans)] font-normal",
          "text-[var(--foreground)] opacity-60",
          "tracking-[-0.01em] leading-[18px]",
          "text-[11px] lg:text-[12px] xl:text-[14px] 2xl:text-[14px]",
          "flex-1",
        )}
      >
        {description}
      </Typography>

      {/* Badge — Style 1: grey filled pill, no border, muted blue-grey text */}
      <div
        className={cn(
          "inline-flex items-center justify-center self-start",
          "bg-[var(--background)]",
          "border-0",
          "rounded-[17.5px]",
          "px-3 lg:px-4",
          "h-[28px] lg:h-[30px] xl:h-[35px] 2xl:h-[37px]",
          "mt-0.5",
        )}
      >
        <Typography
          as="span"
          variant="span"
          className={cn(
            "font-[family-name:var(--font-sans)] font-semibold",
            "text-[var(--primary)] whitespace-nowrap",
            "tracking-[-0.01em] leading-[15px]",
            "text-[10px] lg:text-[11px] xl:text-[12px] 2xl:text-[12px]",
          )}
        >
          {badge}
        </Typography>
      </div>
    </div>
  </div>
);


const CreateRoles: React.FC = () => {
  return (
    <div
      className={cn(
        "min-h-screen bg-[var(--background)]",
        "px-[72px] xl:px-[116px] [@media(min-width:1440px)]:px-[164px] 2xl:px-[180px] [@media(min-width:1920px)]:px-[220px]",
        "py-[38px] xl:py-[44px] [@media(min-width:1440px)]:py-[47px] 2xl:py-[52px] [@media(min-width:1920px)]:py-[60px]",
      )}
    >

      <GoBackButton />

      <Typography
        as="h1"
        variant="span"
        className={cn(
          "font-[family-name:var(--font-sans)] font-bold",
          "text-[var(--foreground)]",
          "tracking-[-0.6px]",
          "block",
          "text-[22px] xl:text-[26px] [@media(min-width:1440px)]:text-[30px] [@media(min-width:1920px)]:text-[34px]",
          "leading-[1.1] [@media(min-width:1440px)]:leading-[32px]",
          "mt-[44px] xl:text-[26px] xl:mt-[60px] [@media(min-width:1440px)]:mt-[70px] 2xl:mt-[76px] [@media(min-width:1920px)]:mt-[90px]",
        )}
      >
        Create Roles. Drive Accountability.
      </Typography>
      <Typography
        as="p"
        variant="span"
        className={cn(
          "font-[family-name:var(--font-sans)] font-normal",
          "text-[var(--foreground)] opacity-60",
          "block",
          "text-[12px] xl:text-[15px] [@media(min-width:1440px)]:text-[16px] [@media(min-width:1920px)]:text-[17px]",
          "leading-[22px] [@media(min-width:1440px)]:leading-[26px]",
          "mt-[10px] xl:mt-[15px] [@media(min-width:1440px)]:mt-[19px] [@media(min-width:1920px)]:mt-[24px]",
          "max-w-[640px] xl:max-w-[860px] [@media(min-width:1440px)]:max-w-[996px] [@media(min-width:1920px)]:max-w-[1120px]",
        )}
      >
        Assign clear responsibilities across your land operations, from
        approvals and risk assessment to field verification and deal sourcing,
        so every step is structured, transparent, and easy to manage.
      </Typography>

      <div
        className={cn(
          "grid grid-cols-2 lg:grid-cols-4",
          "gap-x-[20px] xl:gap-x-[36px] [@media(min-width:1440px)]:gap-x-[48px] [@media(min-width:1920px)]:gap-x-[60px]",
          "gap-y-[20px] xl:gap-y-[36px] [@media(min-width:1440px)]:gap-y-[48px] [@media(min-width:1920px)]:gap-y-[60px]",
          "mt-[40px] xl:mt-[80px] [@media(min-width:1440px)]:mt-[115px] 2xl:mt-[120px] [@media(min-width:1920px)]:mt-[130px]",
        )}
      >
        {ROLES.map((role) => (
          <RoleCard key={role.id} {...role} />
        ))}
      </div>
    </div>
  );
};

export default CreateRoles;