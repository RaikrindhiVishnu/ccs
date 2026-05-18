import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";

/* ─────────────────────────────────────────────────────────────────────────── */
/* TYPES                                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */

export interface FarmlandDetailData {
  heroImageUrl?: string;
  badge?: string;
  farmlandName: string;
  location: string;
  totalValuation: string;
  // Asset Details
  farmlandId: string;
  assignedAgent: {
    name: string;
    avatarUrl?: string;
  };
  creationTime: string;
  lastUpdated: string;
  // Current Status
  systemStatus: string;
  liveStatus: string;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* NOTIFICATION BELL ICON                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const BellIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 19C3 19 5 17 12 17C19 17 21 19 21 19"
      stroke="#2C2C2C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M12 17V3"
      stroke="#2C2C2C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8 3C8 3 8.5 2 12 2C15.5 2 16 3 16 3"
      stroke="#2C2C2C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle cx="17" cy="5" r="3" fill="#EF4646" />
    <path
      d="M10 20C10 20 10.5 22 12 22C13.5 22 14 20 14 20"
      stroke="#2C2C2C"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* MAP PIN ICON                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

const MapPinIcon = () => (
  <svg
    width="12"
    height="15"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 0C3.243 0 1 2.243 1 5C1 8.5 6 14 6 14C6 14 11 8.5 11 5C11 2.243 8.757 0 6 0ZM6 7C4.895 7 4 6.105 4 5C4 3.895 4.895 3 6 3C7.105 3 8 3.895 8 5C8 6.105 7.105 7 6 7Z"
      fill="#EEEEF0"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* AGENT AVATAR                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

const AgentAvatar = ({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        flex items-center justify-center shrink-0 overflow-hidden rounded-full
        bg-[var(--tag-pill-bg)]
        w-[clamp(2.25rem,2.778vw,2.75rem)]
        h-[clamp(2.25rem,2.778vw,2.75rem)]
      "
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span
          className="
            font-bold text-[var(--text-primary)]
            text-[clamp(0.75rem,0.972vw,0.875rem)]
          "
        >
          {initials}
        </span>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* INFO FIELD                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

const InfoField = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-[clamp(2px,0.278vw,4px)]">
    <span
      className="
        font-normal uppercase tracking-[0.6px]
        text-[var(--text-secondary)]
        text-[clamp(0.625rem,0.694vw,0.75rem)]
        leading-4
      "
    >
      {label}
    </span>
    {children}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* STATUS BOX                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */

const StatusBox = ({
  label,
  value,
  rightContent,
}: {
  label: string;
  value: string;
  rightContent?: React.ReactNode;
}) => (
  <div
    className="
      flex flex-row justify-between items-center
      bg-[#F9F9FB]
      border border-[#E2E2E4]
      rounded-[clamp(1.25rem,2.222vw,2rem)]
      px-[clamp(1rem,1.667vw,1.5rem)]
      py-[clamp(0.875rem,1.25vw,1.5rem)]
      w-full
    "
  >
    <div className="flex flex-col gap-1">
      <span
        className="
          font-normal uppercase tracking-[0.6px]
          text-[var(--text-secondary)]
          text-[clamp(0.625rem,0.694vw,0.75rem)]
          leading-4
        "
      >
        {label}
      </span>
      <span
        className="
          font-medium text-[var(--text-primary)]
          text-[clamp(1rem,1.25vw,1.125rem)]
          leading-7
        "
      >
        {value}
      </span>
    </div>
    {rightContent}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* HERO SECTION                                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

const HeroSection = ({
  data,
}: {
  data: FarmlandDetailData;
}) => (
  <div
    className="
      relative overflow-hidden flex flex-col justify-center items-start
      w-full
      h-[clamp(220px,28.403vw,409px)]
      min-h-[200px]
      bg-[#E2E2E4]
      rounded-[clamp(1.25rem,2.222vw,2rem)]
      shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
    "
  >
    {/* Background image */}
    {data.heroImageUrl && (
      <img
        src={data.heroImageUrl}
        alt="Farmland hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
    )}

    {/* Overlay gradient for readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

    {/* Content */}
    <div
      className="
        relative z-10 flex flex-row justify-between items-center w-full
        px-[clamp(2rem,4.167vw,6rem)]
      "
    >
      {/* Left: badge + name + location */}
      <div className="flex flex-col gap-[clamp(0.375rem,0.556vw,0.625rem)]">
        {/* Badge pill */}
        <div
          className="
            inline-flex items-center
            bg-white/20 border border-white/10
            backdrop-blur-sm rounded-full
            px-[clamp(0.5rem,0.833vw,0.75rem)]
            py-[clamp(2px,0.278vw,4px)]
          "
        >
          <span
            className="
              font-bold uppercase tracking-[0.6px] text-white
              text-[clamp(0.5625rem,0.694vw,0.75rem)]
              leading-4
            "
          >
            {data.badge ?? "Requested Information"}
          </span>
        </div>

        {/* Farmland name */}
        <h2
          className="
            font-extrabold text-white tracking-[-1.2px]
            text-[clamp(2rem,3.333vw,3rem)]
            leading-none
            drop-shadow-[0px_2px_2px_rgba(0,0,0,0.06)]
            font-[family-name:var(--font-sans)]
          "
        >
          {data.farmlandName}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-[clamp(2px,0.278vw,4px)]">
          <MapPinIcon />
          <span
            className="
              font-normal text-[#EEEEF0]
              text-[clamp(0.75rem,1.111vw,1rem)]
              leading-6
            "
          >
            {data.location}
          </span>
        </div>
      </div>

      {/* Right: Total Valuation card */}
      <div
        className="
          flex flex-col items-end
          bg-white border border-white/20
          backdrop-blur-[10px]
          rounded-[clamp(0.75rem,1.111vw,1rem)]
          p-[clamp(0.875rem,1.667vw,1.5rem)]
          gap-1
          shrink-0
        "
      >
        <span
          className="
            font-semibold uppercase tracking-[0.6px] text-right
            text-[var(--text-secondary)]
            text-[clamp(0.5625rem,0.694vw,0.75rem)]
            leading-4
          "
        >
          Total Valuation
        </span>
        <span
          className="
            font-bold text-black text-right
            text-[clamp(1.25rem,2.083vw,1.875rem)]
            leading-9
          "
        >
          {data.totalValuation}
        </span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* ASSET DETAILS CARD                                                           */
/* ─────────────────────────────────────────────────────────────────────────── */

const AssetDetailsCard = ({ data }: { data: FarmlandDetailData }) => (
  <Card
    className="
      flex flex-col
      bg-[var(--surface-card)]
      border border-[rgba(188,201,201,0.15)]
      shadow-[0px_20px_40px_rgba(0,49,50,0.02)]
      rounded-[clamp(1.25rem,2.222vw,2rem)]
      p-[clamp(1.25rem,2.222vw,2rem)]
      gap-[clamp(1rem,1.667vw,1.5rem)]
      h-full
    "
  >
    {/* Heading */}
    <div
      className="
        pb-[clamp(0.75rem,1.111vw,1rem)]
        border-b border-[#EEEEF0]
      "
    >
      <Typography
        as="h3"
        variant="h4"
        className="
          font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
          text-[clamp(1rem,1.389vw,1.25rem)]
          leading-7
        "
      >
        Asset Details
      </Typography>
    </div>

    {/* Fields */}
    <div
      className="
        flex flex-col
        gap-[clamp(0.875rem,1.389vw,1.25rem)]
      "
    >
      {/* Farmland ID */}
      <InfoField label="Farmland ID">
        <span
          className="
            font-medium text-[var(--text-primary)]
            text-[clamp(0.875rem,1.111vw,1rem)]
            leading-6
          "
        >
          {data.farmlandId}
        </span>
      </InfoField>

      {/* Assigned Agent */}
      <InfoField label="Assigned Agent">
        <div className="flex items-center gap-[clamp(0.5rem,0.833vw,0.75rem)]">
          <AgentAvatar
            name={data.assignedAgent.name}
            avatarUrl={data.assignedAgent.avatarUrl}
          />
          <span
            className="
              font-medium text-[var(--text-primary)]
              text-[clamp(0.875rem,1.111vw,1rem)]
              leading-6
            "
          >
            {data.assignedAgent.name}
          </span>
        </div>
      </InfoField>

      {/* Creation Time + Last Updated */}
      <div className="grid grid-cols-2 gap-x-[clamp(0.75rem,1.389vw,1.5rem)]">
        <InfoField label="Creation Time">
          <span
            className="
              font-normal text-[var(--text-primary)]
              text-[clamp(0.75rem,0.972vw,0.875rem)]
              leading-5
            "
          >
            {data.creationTime}
          </span>
        </InfoField>
        <InfoField label="Last Updated">
          <span
            className="
              font-normal text-[var(--text-primary)]
              text-[clamp(0.75rem,0.972vw,0.875rem)]
              leading-5
            "
          >
            {data.lastUpdated}
          </span>
        </InfoField>
      </div>
    </div>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* CURRENT STATUS CARD                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

const CurrentStatusCard = ({ data }: { data: FarmlandDetailData }) => (
  <Card
    className="
      flex flex-col
      bg-[var(--surface-card)]
      border border-[rgba(188,201,201,0.15)]
      shadow-[0px_20px_40px_rgba(0,49,50,0.02)]
      rounded-[clamp(1.25rem,2.222vw,2rem)]
      p-[clamp(1.25rem,2.222vw,2rem)]
      gap-[clamp(1rem,1.667vw,1.5rem)]
      h-full
    "
  >
    {/* Heading */}
    <div
      className="
        pb-[clamp(0.75rem,1.111vw,1rem)]
        border-b border-[#EEEEF0]
      "
    >
      <Typography
        as="h3"
        variant="h4"
        className="
          font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
          text-[clamp(1rem,1.389vw,1.25rem)]
          leading-7
        "
      >
        Current Status
      </Typography>
    </div>

    {/* Status rows */}
    <div
      className="
        flex flex-col
        gap-[clamp(1rem,2.222vw,2rem)]
        flex-1 justify-center
      "
    >
      <StatusBox
        label="System Status"
        value={data.systemStatus}
        rightContent={
          <div
            className="
              inline-flex items-center gap-[clamp(4px,0.347vw,5px)]
              rounded-full
              bg-[var(--status-success-soft)]
              px-[clamp(0.5rem,0.694vw,0.75rem)]
              py-[clamp(2px,0.278vw,4px)]
            "
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--status-success)] shrink-0" />
            <span
              className="
                font-semibold text-[var(--status-success)]
                text-[clamp(0.625rem,0.694vw,0.75rem)]
                leading-none
              "
            >
              Online
            </span>
          </div>
        }
      />
      <StatusBox label="Live Status" value={data.liveStatus} />
    </div>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* TOP NAV                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

const TopNav = ({
  onBack,
}: {
  onBack?: () => void;
}) => (
  <div className="flex items-center justify-between w-full">
    {/* Back button */}
    <BackButton
      label="Go Back to Dashboard"
      variant="light"
      size="default"
      onClick={onBack}
      className="
        w-auto
        text-[clamp(0.8125rem,1.111vw,1rem)]
        h-[clamp(2.5rem,3.611vw,3.25rem)]
        px-[clamp(0.875rem,1.389vw,1.25rem)]
        gap-[clamp(0.375rem,0.556vw,0.5rem)]
      "
    />

    {/* Right: bell + avatar */}
    <div className="flex items-center gap-[clamp(0.5rem,0.903vw,0.8125rem)]">
      {/* Bell */}
      <button
        className="
          flex items-center justify-center bg-white rounded-full shrink-0
          w-[clamp(2.5rem,3.611vw,3.25rem)]
          h-[clamp(2.5rem,3.611vw,3.25rem)]
          shadow-sm
        "
      >
        <BellIcon />
      </button>

      {/* Avatar */}
      <button
        className="
          flex items-center justify-center overflow-hidden rounded-full bg-[var(--tag-pill-bg)] shrink-0
          w-[clamp(2.5rem,3.611vw,3.25rem)]
          h-[clamp(2.5rem,3.611vw,3.25rem)]
        "
      >
        <span className="font-bold text-[var(--text-primary)] text-sm">RK</span>
      </button>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* BOTTOM ACTIONS                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

const BottomActions = ({
  onBack,
  onUpload,
}: {
  onBack?: () => void;
  onUpload?: () => void;
}) => (
  <div
    className="
      flex flex-row justify-end items-center
      gap-[clamp(0.5rem,0.833vw,0.75rem)]
      pt-[clamp(1.25rem,2.222vw,2rem)]
      pb-[clamp(1.5rem,3.333vw,3rem)]
    "
  >
    {/* Back */}
    <button
      onClick={onBack}
      className="
        inline-flex items-center justify-center
        border border-[rgba(0,0,0,0.27)] rounded-full
        font-medium text-[rgba(0,0,0,0.8)]
        bg-transparent
        transition-opacity hover:opacity-70
        w-[clamp(6rem,8.403vw,7.5625rem)]
        h-[clamp(2.125rem,2.639vw,2.375rem)]
        text-[clamp(0.75rem,0.972vw,0.875rem)]
      "
    >
      Back
    </button>

    {/* Upload */}
    <Button
      variant="primary"
      onClick={onUpload}
      className="
        rounded-full border-none
        bg-[var(--brand-500)]
        w-[clamp(6rem,8.403vw,7.5625rem)]
        h-[clamp(2.125rem,2.639vw,2.375rem)]
        text-[clamp(0.75rem,0.972vw,0.875rem)]
      "
    >
      Upload
    </Button>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* MAIN PAGE                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

export interface FarmlandDetailPageProps {
  data?: FarmlandDetailData;
  onBack?: () => void;
  onUpload?: () => void;
}

const defaultData: FarmlandDetailData = {
  heroImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
  badge: "Requested Information",
  farmlandName: "GLC SOS -001",
  location: "West Godavari, AP",
  totalValuation: "25 lakhs",
  farmlandId: "GLCSOS 01",
  assignedAgent: {
    name: "Ravi Kumar",
  },
  creationTime: "6th Oct, 12:53 PM",
  lastUpdated: "8th Oct, 09:15 AM",
  systemStatus: "Active",
  liveStatus: "NA",
};

const Farmlanddocument: React.FC<FarmlandDetailPageProps> = ({
  data = defaultData,
  onBack,
  onUpload,
}) => {
  return (
    <div
      className="
        relative min-h-screen w-full
        bg-[var(--surface-page)]
        rounded-[clamp(1.25rem,2.222vw,2rem)]
      "
    >
      {/* Constrained content area */}
      <div
        className="
          mx-auto w-full
          max-w-[1760px]
          px-[clamp(3rem,5.556vw,5rem)]
          py-[clamp(1.5rem,2.361vw,2.125rem)]
          flex flex-col
          gap-[clamp(1.25rem,2.222vw,2rem)]
        "
      >
        {/* Top nav */}
        <TopNav onBack={onBack} />

        {/* Page heading */}
        <Typography
          as="h1"
          variant="h2"
          className="
            font-extrabold tracking-[-1.2px] text-[var(--text-primary)]
            font-[family-name:var(--font-heading)]
            text-[clamp(1.25rem,1.944vw,1.75rem)]
            leading-[3rem]
          "
        >
          Assigned Farmlands
        </Typography>

        {/* Hero */}
        <HeroSection data={data} />

        {/* Bento grid */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_1fr]
            xl:grid-cols-[1.05fr_0.95fr]
            gap-[clamp(0.875rem,1.389vw,1.25rem)]
          "
        >
          <AssetDetailsCard data={data} />
          <CurrentStatusCard data={data} />
        </div>

        {/* Bottom actions */}
        <BottomActions onBack={onBack} onUpload={onUpload} />
      </div>
    </div>
  );
};

export default Farmlanddocument;

