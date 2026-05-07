import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";

import Bannar from "@/assets/Bannar.svg";
import { ArrowLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentDetail {
  id: string;
  name: string;
  applicationId: string;
  status: "Pending Review" | "Approved" | "Rejected";
  avatarUrl?: string;
  initials?: string;
  bannerUrl?: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  operatingTerritory: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  aadhaarImageUrl?: string;
  panImageUrl?: string;
}

interface AgentDetailPageProps {
  agent?: AgentDetail;
  onBack?: () => void;
  onDismiss?: () => void;
  onApprove?: () => void;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const agentData: AgentDetail = {
  id: "1",
  name: "Aarav Sharma",
  applicationId: "GLC-992-IND",
  status: "Pending Review",
  initials: "AS",
  email: "ramkishore@gmail.com",
  phone: "+91 934-2848-293",
  dateOfBirth: "14 August 1992",
  operatingTerritory: "Tanuka, West Godavari, Andhra Pradesh, 534211",
  bankName: "HDFC Bank",
  accountNumber: "12345678910",
  ifscCode: "HDFC12345678",
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: AgentDetail["status"] }) => {
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

  const c = config[status];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        "px-3 py-1.5",
        "rounded-full",
        c.bg,
      )}
    >
      <span className={cn("w-2 h-2 rounded-full shrink-0", c.dot)} />
      <span
        className={cn(
          "font-medium leading-none",
          "font-[family-name:var(--font-sans)]",
          "text-[0.6875rem]",
          "lg:text-[0.75rem]",
          "xl:text-[0.8125rem]",
          "2xl:text-[0.875rem]",
          // 11px→0.6875rem | 12px→0.75rem | 13px→0.8125rem | 14px→0.875rem
          c.text,
        )}
      >
        {status}
      </span>
    </div>
  );
};

// ─── Info Field ───────────────────────────────────────────────────────────────

const InfoField = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col",
      "gap-1.5",
      "lg:gap-[0.5rem]",
      "xl:gap-[0.625rem]",
      // 6px→0.375rem | 8px→0.5rem | 10px→0.625rem
      className,
    )}
  >
    <span
      className="
        font-medium
        leading-none
        font-[family-name:var(--font-sans)]
        text-[color:var(--label-color)]
        text-[0.75rem]
        lg:text-[0.8125rem]
        xl:text-[0.875rem]
        2xl:text-[1rem]
      "
      // 12px→0.75rem | 13px→0.8125rem | 14px→0.875rem | 16px→1rem
    >
      {label}
    </span>
    <span
      className="
        leading-snug
        font-[family-name:'Inter',sans-serif]
        text-[color:var(--profile-text)]
        text-[0.75rem]
        lg:text-[0.8125rem]
        xl:text-[0.8125rem]
        2xl:text-[0.875rem]
      "
      // 12px→0.75rem | 13px→0.8125rem | 13px→0.8125rem | 14px→0.875rem
    >
      {value}
    </span>
  </div>
);

// ─── Section Card ─────────────────────────────────────────────────────────────

const SectionCard = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "bg-[color:var(--surface-card)]",
      "rounded-[1rem]",
      "lg:rounded-[1.25rem]",
      "xl:rounded-[1.5rem]",
      // 16px→1rem | 20px→1.25rem | 24px→1.5rem
      "shadow-[0px_0px_6px_rgba(0,0,0,0.12)]",
      "px-[1.25rem]",
      "lg:px-[1.5rem]",
      "xl:px-[1.875rem]",
      // 20px→1.25rem | 24px→1.5rem | 30px→1.875rem
      "pt-[1.125rem]",
      "lg:pt-[1.25rem]",
      "xl:pt-[1.5rem]",
      // 18px→1.125rem | 20px→1.25rem | 24px→1.5rem
      "pb-[1.25rem]",
      "lg:pb-[1.5rem]",
      "xl:pb-[1.75rem]",
      // 20px→1.25rem | 24px→1.5rem | 28px→1.75rem
      className,
    )}
  >
    <Typography
      variant="h3"
      className="
        font-semibold
        leading-none
        font-[family-name:var(--font-sans)]
        text-[color:var(--text-subtle)]
        mb-[1.25rem]
        lg:mb-[1.5rem]
        xl:mb-[1.75rem]
        !text-[1rem]
        lg:!text-[1.125rem]
        xl:!text-[1.25rem]
        2xl:!text-[1.5rem]
      "
      // mb: 20px→1.25rem | 24px→1.5rem | 28px→1.75rem
      // text: 16px→1rem | 18px→1.125rem | 20px→1.25rem | 24px→1.5rem
    >
      {title}
    </Typography>
    {children}
  </div>
);

// ─── Document Card ────────────────────────────────────────────────────────────

const DocumentCard = ({
  label,
  imageUrl,
}: {
  label: string;
  imageUrl?: string;
}) => (
  <div
    className="
      flex flex-col
      gap-[0.5rem]
      lg:gap-[0.625rem]
    "
    // 8px→0.5rem | 10px→0.625rem
  >
    <span
      className="
        font-medium
        font-[family-name:var(--font-sans)]
        text-[color:var(--label-color)]
        text-[0.75rem]
        lg:text-[0.8125rem]
        xl:text-[0.875rem]
        2xl:text-[1rem]
      "
      // 12px→0.75rem | 13px→0.8125rem | 14px→0.875rem | 16px→1rem
    >
      {label}
    </span>
    <div
      className="
        border
        border-dashed
        border-[color:var(--border-default)]
        rounded-[0.75rem]
        lg:rounded-[0.875rem]
        xl:rounded-[1.125rem]
        overflow-hidden
        flex items-center justify-center
        w-full
        aspect-[323/197]
      "
      // 12px→0.75rem | 14px→0.875rem | 18px→1.125rem
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={label}
          className="
            w-[75%]
            h-[80%]
            object-cover
            rounded-[0.25rem]
            shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
          "
          // 4px→0.25rem
        />
      ) : (
        <div
          className="
            w-[75%]
            h-[78%]
            rounded-[0.375rem]
            flex items-center justify-center
            shadow-[0px_4px_4px_rgba(0,0,0,0.10)]
            bg-gradient-to-br
            from-[color:var(--document-placeholder-from)]
            to-[color:var(--document-placeholder-to)]
          "
          // 6px→0.375rem
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-30"
          >
            <rect
              x="2"
              y="4"
              width="20"
              height="16"
              rx="2"
              stroke="var(--text-secondary)"
              strokeWidth="1.5"
            />
            <path d="M2 9h20" stroke="var(--text-secondary)" strokeWidth="1.5" />
            <circle cx="6" cy="13" r="1" fill="var(--text-secondary)" />
          </svg>
        </div>
      )}
    </div>
  </div>
);

// ─── Back Button ──────────────────────────────────────────────────────────────

const BackButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="
      flex items-center gap-2
      px-5 py-3
      mb-[clamp(1.5rem,2.5vw,2.375rem)]
      bg-[color:var(--surface-card)]
      rounded-full
      shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
      text-[color:var(--text-secondary)]
      text-[clamp(0.75rem,0.95vw,1rem)]
      font-[family-name:var(--font-inter)]
      hover:opacity-80
      transition-opacity
    "
    // clamp: 24px→1.5rem, 38px→2.375rem | 12px→0.75rem, 16px→1rem
  >
    <ArrowLeft size={16} strokeWidth={1.4} />
    Go Back to Dashboard
  </button>
);

// ─── Profile Header ───────────────────────────────────────────────────────────

const ProfileHeaderCard = ({ agent }: { agent: AgentDetail }) => (
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
    // 16px→1rem | 20px→1.25rem | 24px→1.5rem
  >
    {/* Banner */}
    <div className="h-[clamp(5rem,12vw,8.75rem)] overflow-hidden">
      {/* 80px→5rem | 140px→8.75rem */}
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
        // 14px→0.875rem | 16px→1rem | 20px→1.25rem
      >
        {/* Avatar */}
        <div
          className="
            shrink-0
            rounded-full
            border-[3px]
            border-white
            overflow-hidden
            flex items-center justify-center
            bg-[color:var(--avatar-fallback)]
            shadow-[0px_2px_4px_rgba(0,0,0,0.10)]
            -mt-[2rem]
            lg:-mt-[2.25rem]
            xl:-mt-[2.75rem]
            2xl:-mt-[3.25rem]
            w-[4.5rem]
            h-[4.5rem]
            lg:w-[5.625rem]
            lg:h-[5.625rem]
            xl:w-[6.875rem]
            xl:h-[6.875rem]
            2xl:w-[8.125rem]
            2xl:h-[8.125rem]
          "
        >
          {agent.avatarUrl ? (
            <img
              src={agent.avatarUrl}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className="
                font-bold
                text-white
                font-[family-name:var(--font-heading)]
                text-[1.25rem]
                lg:text-[1.5rem]
                xl:text-[1.75rem]
                2xl:text-[2rem]
              "
              // 20px→1.25rem | 24px→1.5rem | 28px→1.75rem | 32px→2rem
            >
              {agent.initials}
            </span>
          )}
        </div>

        {/* Info */}
        <div
          className="
            flex flex-col
            gap-[0.25rem]
            lg:gap-[0.375rem]
            pb-[0.125rem]
          "
          // 4px→0.25rem | 6px→0.375rem | 2px→0.125rem
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
            // 16px→1rem | 18px→1.125rem | 20px→1.25rem | 24px→1.5rem
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
        {/* 2px→0.125rem */}
        <StatusBadge status={agent.status} />
      </div>
    </div>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export const AgentDetailPage = ({
  agent = agentData,
  onBack,
  onDismiss,
  onApprove,
}: AgentDetailPageProps) => {
  return (
    <main
      className="
        w-full
        min-h-screen
        bg-[color:var(--surface-page)]
        font-[family-name:var(--font-sans)]
      "
    >
      <div
        className="
          mx-auto
          max-w-[118.75rem]
          px-[1.5rem]
          lg:px-[2.5rem]
          xl:px-[3.5rem]
          2xl:px-[4.5rem]
          py-[1.5rem]
          lg:py-[2rem]
          xl:py-[2.5rem]
          2xl:py-[3rem]
        "
      >
        <div
          className="
            mb-[1.25rem]
            lg:mb-[1.5rem]
            xl:mb-[1.75rem]
          "
          // 20px→1.25rem | 24px→1.5rem | 28px→1.75rem
        >
          <BackButton onClick={onBack} />
        </div>

        <div
          className="
            bg-[color:var(--surface-card)]
            rounded-[1.75rem]
            lg:rounded-[2.25rem]
            xl:rounded-[2.875rem]
            px-[1.25rem]
            lg:px-[2rem]
            xl:px-[3.125rem]
            pt-[1.5rem]
            lg:pt-[1.75rem]
            xl:pt-[2rem]
            pb-[2rem]
            lg:pb-[2.5rem]
            xl:pb-[3rem]
            flex flex-col
            gap-[1rem]
            lg:gap-[1.125rem]
            xl:gap-[1.25rem]
          "
        >
          <ProfileHeaderCard agent={agent} />

          <SectionCard title="Info">
            <div
              className="
                grid
                grid-cols-2
                xl:grid-cols-3
                gap-x-[1.5rem]
                lg:gap-x-[2rem]
                xl:gap-x-[2.5rem]
                gap-y-[1.25rem]
                lg:gap-y-[1.5rem]
                xl:gap-y-[1.75rem]
              "
            >
              <InfoField label="Email" value={agent.email} />
              <InfoField label="Phone number" value={agent.phone} />
              <InfoField label="Date Of Birth" value={agent.dateOfBirth} />
              <InfoField
                label="Operating Territory"
                value={agent.operatingTerritory}
                className="col-span-2 xl:col-span-3"
              />
            </div>
          </SectionCard>

          <SectionCard title="Bank Details">
            <div
              className="
                grid
                grid-cols-2
                xl:grid-cols-3
                gap-x-[1.5rem]
                lg:gap-x-[2rem]
                xl:gap-x-[2.5rem]
                gap-y-[1.25rem]
                lg:gap-y-[1.5rem]
              "
            >
              <InfoField label="Bank Name" value={agent.bankName} />
              <InfoField label="Account Number" value={agent.accountNumber} />
              <InfoField label="IFSC Code" value={agent.ifscCode} />
            </div>
          </SectionCard>

          <SectionCard title="Documents Provided">
            <div
              className="
                grid grid-cols-2
                gap-[1.25rem]
                lg:gap-[1.5rem]
                xl:gap-[2rem]
                max-w-[48.75rem]
              "
            >
              <DocumentCard
                label="Aadhaar card"
                imageUrl={agent.aadhaarImageUrl}
              />
              <DocumentCard label="Pan card" imageUrl={agent.panImageUrl} />
            </div>
          </SectionCard>

          <div
            className="
              flex items-center justify-end
              gap-[0.625rem]
              lg:gap-[0.75rem]
              xl:gap-[0.875rem]
              pt-[0.25rem]
            "
          >
            <button
              onClick={onDismiss}
              className="
                font-medium
                font-[family-name:'Inter',sans-serif]
                text-[color:var(--profile-text)]
                px-[1.25rem]
                lg:px-[1.5rem]
                py-[0.5rem]
                rounded-[0.375rem]
                text-[0.8125rem]
                lg:text-[0.875rem]
                xl:text-[0.9375rem]
                2xl:text-[1rem]
                duration-150
              "
            >
              Dismiss
            </button>

            <button
              onClick={onApprove}
              className="
                font-medium
                font-[family-name:'Inter',sans-serif]
                text-white
                px-[1.75rem]
                lg:px-[2rem]
                py-[0.5rem]
                rounded-full
                bg-[linear-gradient(110.22deg,var(--approve-gradient-from)_0%,var(--approve-gradient-to)_100%)]
                text-[0.8125rem]
                lg:text-[0.875rem]
                xl:text-[0.9375rem]
                2xl:text-[1rem]
                hover:opacity-90
                active:scale-[0.97]
                transition-all
                duration-150
              "
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AgentDetailPage;
