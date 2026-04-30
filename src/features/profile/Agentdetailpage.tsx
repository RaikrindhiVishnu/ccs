import * as React from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import Bannar from "@/assets/Bannar.svg";
import { ArrowLeft, User } from "lucide-react";
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
      dot: "bg-[color:var(--primary)]",
      text: "text-[color:var(--primary)]",
      bg: "bg-[color:var(--status-pending-bg)]",
    },

    Approved: {
      dot: "bg-[color:var(--success-green)]",
      text: "text-[color:var(--success-green)]",
      bg: "bg-[color:var(--success-soft)]",
    },

    Rejected: {
      dot: "bg-[color:var(--danger)]",
      text: "text-[color:var(--danger)]",
      bg: "bg-[color:var(--danger-soft)]",
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

          "text-[11px]",
          "lg:text-[12px]",
          "xl:text-[13px]",
          "2xl:text-[14px]",

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

      "gap-[6px]",
      "lg:gap-[8px]",
      "xl:gap-[10px]",

      className,
    )}
  >
    <span
      className="
        font-medium
        leading-none

        font-[family-name:var(--font-sans)]

        text-[color:var(--label-color)]

        text-[12px]
        lg:text-[13px]
        xl:text-[14px]
        2xl:text-[16px]
      "
    >
      {label}
    </span>

    <span
      className="
        leading-snug

        font-[family-name:'Inter',sans-serif]

        text-[color:var(--profile-text)]

        text-[12px]
        lg:text-[13px]
        xl:text-[13px]
        2xl:text-[14px]
      "
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
      "bg-[color:var(--card)]",

      "rounded-[16px]",
      "lg:rounded-[20px]",
      "xl:rounded-[24px]",

      "shadow-[0px_0px_6px_rgba(0,0,0,0.12)]",

      "px-[20px]",
      "lg:px-[24px]",
      "xl:px-[30px]",

      "pt-[18px]",
      "lg:pt-[20px]",
      "xl:pt-[24px]",

      "pb-[20px]",
      "lg:pb-[24px]",
      "xl:pb-[28px]",

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

        mb-[20px]
        lg:mb-[24px]
        xl:mb-[28px]

        !text-[16px]
        lg:!text-[18px]
        xl:!text-[20px]
        2xl:!text-[24px]
      "
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

      gap-[8px]
      lg:gap-[10px]
    "
  >
    <span
      className="
        font-medium

        font-[family-name:var(--font-sans)]

        text-[color:var(--label-color)]

        text-[12px]
        lg:text-[13px]
        xl:text-[14px]
        2xl:text-[16px]
      "
    >
      {label}
    </span>

    <div
      className="
        border
        border-dashed
        border-[color:var(--input-border)]

        rounded-[12px]
        lg:rounded-[14px]
        xl:rounded-[18px]

        overflow-hidden

        flex items-center justify-center

        w-full

        aspect-[323/197]
      "
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={label}
          className="
            w-[75%]
            h-[80%]

            object-cover

            rounded-[4px]

            shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
          "
        />
      ) : (
        <div
          className="
            w-[75%]
            h-[78%]

            rounded-[6px]

            flex items-center justify-center

            shadow-[0px_4px_4px_rgba(0,0,0,0.10)]

            bg-gradient-to-br

            from-[color:var(--document-placeholder-from)]
            to-[color:var(--document-placeholder-to)]
          "
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
              stroke="var(--document-icon)"
              strokeWidth="1.5"
            />

            <path d="M2 9h20" stroke="var(--document-icon)" strokeWidth="1.5" />

            <circle cx="6" cy="13" r="1" fill="var(--document-icon)" />
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
          mb-[clamp(24px,2.5vw,38px)]
          bg-[color:var(--card)]
          rounded-full
          shadow-[0px_0px_4px_rgba(0,0,0,0.12)]
          text-[color:var(--text-neutral)]
          text-[clamp(12px,0.95vw,16px)]
          font-[family-name:var(--btn-font-secondary)]
          hover:opacity-80
          transition-opacity
        "
  >
    <ArrowLeft size={16} strokeWidth={1.4} />
    Go Back to Dashboard
  </button>
);

// ─── Profile Header ───────────────────────────────────────────────────────────

const ProfileHeaderCard = ({ agent }: { agent: AgentDetail }) => (
  <div
    className="
      bg-[color:var(--card)]

      rounded-[16px]
      lg:rounded-[20px]
      xl:rounded-[24px]

      shadow-[0px_0px_6px_rgba(0,0,0,0.12)]

      overflow-hidden

      relative
    "
  >
    {/* Banner */}
    <div className="h-[clamp(80px,12vw,140px)] overflow-hidden">
      <img src={Bannar} alt="Banner" className="w-full h-full object-cover" />
    </div>

    {/* Content */}
    <div
      className="
        relative

        flex items-end justify-between

        px-[20px]
        lg:px-[28px]
        xl:px-[50px]

        pb-[16px]
        lg:pb-[18px]
        xl:pb-[22px]
      "
    >
      {/* Left */}
      <div
        className="
          flex items-end

          gap-[14px]
          lg:gap-[16px]
          xl:gap-[20px]
        "
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

            -mt-[32px]
            lg:-mt-[36px]
            xl:-mt-[44px]
            2xl:-mt-[52px]

            w-[72px]
            h-[72px]

            lg:w-[90px]
            lg:h-[90px]

            xl:w-[110px]
            xl:h-[110px]

            2xl:w-[130px]
            2xl:h-[130px]
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

                text-[20px]
                lg:text-[24px]
                xl:text-[28px]
                2xl:text-[32px]
              "
            >
              {agent.initials}
            </span>
          )}
        </div>

        {/* Info */}
        <div
          className="
            flex flex-col

            gap-[4px]
            lg:gap-[6px]

            pb-[2px]
          "
        >
          <Typography
            variant="h3"
            className="
              font-bold
              leading-none

              font-[family-name:var(--font-sans)]

              text-[color:var(--profile-text)]

              !text-[16px]
              lg:!text-[18px]
              xl:!text-[20px]
              2xl:!text-[24px]
            "
          >
            {agent.name}
          </Typography>

          <span
            className="
              font-medium
              leading-none

              font-[family-name:var(--font-sans)]

              text-[color:var(--profile-subtext)]

              text-[11px]
              lg:text-[12px]
              xl:text-[13px]
              2xl:text-[16px]
            "
          >
            Application ID : {agent.applicationId}
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="pb-[2px]">
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

        bg-[color:var(--background)]

        font-[family-name:var(--font-sans)]
      "
    >
      <div
        className="
          mx-auto

          max-w-[1900px]

          px-[24px]
          lg:px-[40px]
          xl:px-[56px]
          2xl:px-[72px]

          py-[24px]
          lg:py-[32px]
          xl:py-[40px]
          2xl:py-[48px]
        "
      >
        <div
          className="
            mb-[20px]
            lg:mb-[24px]
            xl:mb-[28px]
          "
        >
          <BackButton onClick={onBack} />
        </div>

        <div
          className="
            bg-[color:var(--card)]

            rounded-[28px]
            lg:rounded-[36px]
            xl:rounded-[46px]

            px-[20px]
            lg:px-[32px]
            xl:px-[50px]

            pt-[24px]
            lg:pt-[28px]
            xl:pt-[32px]

            pb-[32px]
            lg:pb-[40px]
            xl:pb-[48px]

            flex flex-col

            gap-[16px]
            lg:gap-[18px]
            xl:gap-[20px]
          "
        >
          <ProfileHeaderCard agent={agent} />

          <SectionCard title="Info">
            <div
              className="
                grid

                grid-cols-2
                xl:grid-cols-3

                gap-x-[24px]
                lg:gap-x-[32px]
                xl:gap-x-[40px]

                gap-y-[20px]
                lg:gap-y-[24px]
                xl:gap-y-[28px]
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

                gap-x-[24px]
                lg:gap-x-[32px]
                xl:gap-x-[40px]

                gap-y-[20px]
                lg:gap-y-[24px]
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

                gap-[20px]
                lg:gap-[24px]
                xl:gap-[32px]

                max-w-[780px]
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

              gap-[10px]
              lg:gap-[12px]
              xl:gap-[14px]

              pt-[4px]
            "
          >
            <button
              onClick={onDismiss}
              className="
                font-medium

                font-[family-name:'Inter',sans-serif]

                text-[color:var(--profile-text)]

                px-[20px]
                lg:px-[24px]

                py-[8px]

                rounded-[6px]

                text-[13px]
                lg:text-[14px]
                xl:text-[15px]
                2xl:text-[16px]
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

                px-[28px]
                lg:px-[32px]

                py-[8px]

                rounded-full

                bg-[linear-gradient(110.22deg,var(--approve-gradient-from)_0%,var(--approve-gradient-to)_100%)]

                text-[13px]
                lg:text-[14px]
                xl:text-[15px]
                2xl:text-[16px]

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
