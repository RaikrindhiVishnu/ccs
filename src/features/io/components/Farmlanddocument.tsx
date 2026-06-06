import * as React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { FARMLAND_CARD_DUMMY } from "@/features/io/data/Farmlandcarddummydata";
import afimg from "@/assets/afimg.png";
import { OwnerDetailsDocument } from "./OwnerDetailsDocument";
import { FamilyTreeDocument } from "./FamilyTreeDocument";
import { LandDetailsDocument } from "./LandDetailsDocument";
import { LocalIntelligenceDocument } from "./LocalIntelligenceDocument";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/core/hooks";
import { RequestedInfoReasonModal } from "./RequestedInfoReasonModal";

/* ─────────────────────────────────────────────────────────────────────────── */
/* TYPES & INTERFACES                                                           */
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

export interface FarmlandDetailPageProps {
  data?: FarmlandDetailData;
  onBack?: () => void;
  onUpload?: () => void;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* ICONS                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const MapPinIcon = () => (
  <svg
    className="w-[clamp(0.53rem,0.83vw,1rem)] h-[clamp(0.66rem,1.04vw,1.25rem)] shrink-0 text-[var(--text-secondary)]"
    viewBox="0 0 12 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 0C3.243 0 1 2.243 1 5C1 8.5 6 14 6 14C6 14 11 8.5 11 5C11 2.243 8.757 0 6 0ZM6 7C4.895 7 4 6.105 4 5C4 3.895 4.895 3 6 3C7.105 3 8 3.895 8 5C8 6.105 7.105 7 6 7Z"
      fill="currentColor"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* REUSABLE HELPERS                                                             */
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
        bg-[var(--border-subtle)]
        w-[clamp(1.775rem,2.78vw,3.325rem)]
        h-[clamp(1.775rem,2.78vw,3.325rem)]
      "
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span
          className="
            font-bold text-[var(--text-primary)]
            text-[clamp(0.625rem,0.97vw,1.1625rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          {initials}
        </span>
      )}
    </div>
  );
};

const InfoField = ({
  label,
  fontSizeClass = "text-[clamp(0.53rem,0.83vw,1rem)] leading-[clamp(0.71rem,1.11vw,1.33rem)]",
  children,
}: {
  label: string;
  fontSizeClass?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-[clamp(0.177rem,0.28vw,0.33rem)]">
    <span
      className={`
        font-normal uppercase tracking-[0.6px]
        text-[var(--text-secondary)]
        font-[family-name:var(--font-sans)]
        ${fontSizeClass}
      `}
    >
      {label}
    </span>
    {children}
  </div>
);

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
      bg-[var(--status-pending-bg)]
      border border-[var(--border-default)]
      rounded-[clamp(1.42rem,2.22vw,2.66rem)]
      p-[clamp(1.0625rem,1.67vw,2rem)]
      w-full
    "
  >
    <div className="flex flex-col gap-[clamp(0.177rem,0.28vw,0.33rem)]">
      <span
        className="
          font-normal uppercase tracking-[0.6px]
          text-[var(--text-secondary)]
          text-[clamp(0.53rem,0.83vw,1rem)]
          leading-[clamp(0.71rem,1.11vw,1.33rem)]
          font-[family-name:var(--font-sans)]
        "
      >
        {label}
      </span>
      <span
        className="
          font-medium text-[var(--text-primary)]
          text-[clamp(0.8rem,1.25vw,1.5rem)]
          leading-[clamp(1.25rem,1.94vw,2.33rem)]
          font-[family-name:var(--font-sans)]
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
      relative overflow-hidden flex flex-col justify-end items-start
      w-full
      h-[clamp(18.15rem,28.4vw,34rem)]
      min-h-[300px]
      bg-[var(--border-default)]
      rounded-[clamp(1.42rem,2.22vw,2.66rem)]
      shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
      mt-[clamp(1.25rem,1.94vw,2.33rem)]
      pb-[clamp(1.775rem,2.81vw,3.325rem)]
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

    {/* Gradient overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 z-0" />

    {/* Content Container */}
    <div
      className="
        relative z-10 flex flex-row justify-between items-center w-full
        px-[clamp(6.375rem,10vw,12rem)]
      "
    >
      {/* Left: badge + name + location */}
      <div className="flex flex-col gap-[clamp(0.356rem,0.56vw,0.665rem)]">
        {/* Badge pill */}
        <div
          className="
            inline-flex items-center self-start
            bg-[var(--illus-card-white-bg)] border border-[var(--border-soft)]
            backdrop-filter backdrop-blur-[6px] rounded-full
            px-[clamp(0.53rem,0.83vw,1rem)]
            py-[clamp(0.177rem,0.28vw,0.33rem)]
          "
        >
          <span
            className="
              font-bold uppercase tracking-[0.6px] text-white
              text-[clamp(0.53rem,0.83vw,1rem)]
              leading-[clamp(0.71rem,1.11vw,1.33rem)]
              font-[family-name:var(--font-sans)]
            "
          >
            {data.badge ?? "ASSIGNED FARMLAND"}
          </span>
        </div>

        {/* Farmland name */}
        <h2
          className="
            font-extrabold text-white tracking-[-1.2px]
            text-[clamp(2.125rem,3.33vw,4rem)]
            leading-[clamp(2.125rem,3.33vw,4rem)]
            drop-shadow-[0px_2px_2px_rgba(0,0,0,0.06)]
            font-[family-name:var(--font-sans)]
          "
        >
          {data.farmlandName}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-[clamp(0.177rem,0.28vw,0.33rem)]">
          <MapPinIcon />
          <span
            className="
              font-normal text-[var(--border-subtle)]
              text-[clamp(0.71rem,1.11vw,1.33rem)]
              leading-[clamp(1.0625rem,1.67vw,2rem)]
              font-[family-name:var(--font-sans)]
            "
          >
            {data.location}
          </span>
        </div>
      </div>

      {/* Right: Total Valuation card */}
      <div
        className="
          flex flex-col items-end justify-center
          bg-[var(--surface-card)] border border-[var(--border-soft)]
          backdrop-filter backdrop-blur-[10px]
          rounded-[clamp(0.71rem,1.11vw,1.33rem)]
          p-[clamp(1.0625rem,1.67vw,2rem)]
          gap-[clamp(0.177rem,0.28vw,0.33rem)]
          w-[clamp(7.4375rem,11.67vw,14rem)]
          h-[clamp(4.7rem,7.36vw,8.8125rem)]
          shrink-0
        "
      >
        <span
          className="
            font-semibold uppercase tracking-[0.6px] text-right
            text-[var(--text-secondary)]
            text-[clamp(0.53rem,0.83vw,1rem)]
            leading-[clamp(0.71rem,1.11vw,1.33rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          TOTAL VALUATION
        </span>
        <span
          className="
            font-bold text-[var(--text-strong)] text-right
            text-[clamp(1.33rem,2.08vw,2.5rem)]
            leading-[clamp(1.6rem,2.5vw,3rem)]
            font-[family-name:var(--font-sans)]
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
      border border-[var(--border-soft)]
      shadow-[var(--shadow-card)]
      rounded-[clamp(1.42rem,2.22vw,2.66rem)]
      pt-[clamp(1.42rem,2.22vw,2.66rem)]
      px-[clamp(1.42rem,2.22vw,2.66rem)]
      pb-[clamp(3.33rem,5.21vw,6.25rem)]
      gap-[clamp(1.42rem,2.22vw,2.66rem)]
      h-full
    "
  >
    {/* Heading */}
    <div
      className="
        pb-[clamp(0.71rem,1.11vw,1.33rem)]
        border-b border-[var(--border-subtle)]
      "
    >
      <Typography
        as="h3"
        variant="h4"
        className="
          font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
          text-[clamp(0.8875rem,1.39vw,1.6625rem)]
          leading-[clamp(1.25rem,1.94vw,2.33rem)]
        "
      >
        Asset Details
      </Typography>
    </div>

    {/* Fields */}
    <div
      className="
        flex flex-col
        gap-[clamp(0.8875rem,1.39vw,1.6625rem)]
      "
    >
      {/* Farmland ID */}
      <InfoField label="FARMLAND ID">
        <span
          className="
            font-medium text-[var(--text-primary)]
            text-[clamp(0.71rem,1.11vw,1.33rem)]
            leading-[clamp(1.0625rem,1.67vw,2rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          {data.farmlandId}
        </span>
      </InfoField>

      {/* Assigned Agent */}
      <InfoField label="ASSIGNED AGENT">
        <div className="flex items-center gap-[clamp(0.53rem,0.83vw,1rem)]">
          <AgentAvatar
            name={data.assignedAgent.name}
            avatarUrl={data.assignedAgent.avatarUrl}
          />
          <span
            className="
              font-medium text-[var(--text-primary)]
              text-[clamp(0.71rem,1.11vw,1.33rem)]
              leading-[clamp(1.0625rem,1.67vw,2rem)]
              font-[family-name:var(--font-sans)]
            "
          >
            {data.assignedAgent.name}
          </span>
        </div>
      </InfoField>

      {/* Creation Time + Last Updated */}
      <div className="grid grid-cols-2 gap-x-[clamp(1.275rem,2vw,2.4rem)]">
        <InfoField
          label="CREATION TIME"
          fontSizeClass="text-[clamp(0.44rem,0.69vw,0.83rem)] leading-[clamp(0.66rem,1.04vw,1.25rem)]"
        >
          <span
            className="
              font-normal text-[var(--text-primary)]
              text-[clamp(0.625rem,0.97vw,1.1625rem)]
              leading-[clamp(0.8875rem,1.39vw,1.6625rem)]
              font-[family-name:var(--font-sans)]
            "
          >
            {data.creationTime}
          </span>
        </InfoField>
        <InfoField
          label="LAST UPDATED"
          fontSizeClass="text-[clamp(0.44rem,0.69vw,0.83rem)] leading-[clamp(0.66rem,1.04vw,1.25rem)]"
        >
          <span
            className="
              font-normal text-[var(--text-primary)]
              text-[clamp(0.625rem,0.97vw,1.1625rem)]
              leading-[clamp(0.8875rem,1.39vw,1.6625rem)]
              font-[family-name:var(--font-sans)]
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
      border border-[var(--border-soft)]
      shadow-[var(--shadow-card)]
      rounded-[clamp(1.42rem,2.22vw,2.66rem)]
      p-[clamp(1.42rem,2.22vw,2.66rem)]
      gap-[clamp(1.42rem,2.22vw,2.66rem)]
      h-full
    "
  >
    {/* Heading */}
    <div
      className="
        pb-[clamp(0.71rem,1.11vw,1.33rem)]
        border-b border-[var(--border-subtle)]
      "
    >
      <Typography
        as="h3"
        variant="h4"
        className="
          font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
          text-[clamp(0.8875rem,1.39vw,1.6625rem)]
          leading-[clamp(1.25rem,1.94vw,2.33rem)]
        "
      >
        Current Status
      </Typography>
    </div>

    {/* Status rows */}
    <div
      className="
        flex flex-col
        gap-[clamp(1.42rem,2.22vw,2.66rem)]
        flex-1 justify-center
      "
    >
      <StatusBox
        label="SYSTEM STATUS"
        value={data.systemStatus}
      />
      <StatusBox label="LIVE STATUS" value={data.liveStatus} />
    </div>
  </Card>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* TOP NAV                                                                      */
/* ─────────────────────────────────────────────────────────────────────────── */

const TopNav = ({
  onBack,
  isRequestedInfo,
}: {
  onBack?: () => void;
  isRequestedInfo?: boolean;
}) => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const fullName = user
    ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
    "Intelligence Officer"
    : "Intelligence Officer";

  const initials = fullName
    ? fullName
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "IO";

  return (
    <div className="flex items-center justify-between w-full">
      {/* Back button */}
      <BackButton
        label={isRequestedInfo ? "Go Back to Requested Info" : "Go Back to Dashboard"}
        variant="light"
        size="default"
        onClick={onBack}
        className="
          w-[clamp(15.5rem,16.94vw,20.3rem)]
          h-[clamp(2.31rem,3.61vw,4.3rem)]
          text-[clamp(0.71rem,1.11vw,1.33rem)]
          py-[clamp(0.84rem,1.32vw,1.56rem)]
          px-[clamp(0.8875rem,1.39vw,1.66rem)]
          font-[family-name:var(--font-sans)]
          text-[var(--text-button)]
        "
      />

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-[clamp(0.5rem,0.9vw,0.8125rem)]">
        {/* Bell */}
        <button
          className="
            relative
            flex items-center justify-center bg-[var(--surface-card)] rounded-full shrink-0
            w-[clamp(2.25rem,3.61vw,3.25rem)]
            h-[clamp(2.25rem,3.61vw,3.25rem)]
            shadow-sm
            border border-[var(--border)]
            hover:opacity-85 transition-opacity
            cursor-pointer
          "
          aria-label="Notifications"
        >
          <Bell
            strokeWidth={1.5}
            color="var(--text-primary)"
            className="
              w-[clamp(1rem,1.67vw,1.5rem)]
              h-[clamp(1rem,1.67vw,1.5rem)]
            "
          />

          <span
            className="
              absolute rounded-full
              bg-[var(--status-danger)]
              w-[clamp(0.25rem,0.4vw,0.375rem)]
              h-[clamp(0.25rem,0.4vw,0.375rem)]
              top-[clamp(0.375rem,0.7vw,0.625rem)]
              right-[clamp(0.375rem,0.7vw,0.625rem)]
            "
          />
        </button>

        {/* Avatar */}
        <button
          onClick={() => navigate("/io/profile")}
          title="Profile"
          className="
            relative overflow-hidden
            flex items-center justify-center
            rounded-full
            bg-[var(--surface-card)]
            transition-opacity
            hover:opacity-90
            w-[clamp(2.25rem,3.61vw,3.25rem)]
            h-[clamp(2.25rem,3.61vw,3.25rem)]
            border border-[rgba(0,0,0,0.05)]
            cursor-pointer
          "
        >
          {(user as any)?.avatarUrl ? (
            <img
              src={(user as any).avatarUrl}
              alt={fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <Typography
              as="span"
              variant="span"
              className="
                font-bold
                font-[var(--font-sans)]
                text-[var(--text-primary)]
                text-[clamp(0.71rem,1.11vw,1.33rem)]
              "
            >
              {initials}
            </Typography>
          )}
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* BOTTOM ACTIONS                                                               */
/* ─────────────────────────────────────────────────────────────────────────── */

const BottomActions = ({
  onBack,
  onUpload,
  isRequestedInfo,
  onViewReason,
}: {
  onBack?: () => void;
  onUpload?: () => void;
  isRequestedInfo?: boolean;
  onViewReason?: () => void;
}) => (
  <div
    className="
      flex flex-row justify-end items-center
      gap-[clamp(0.71rem,1.11vw,1.33rem)]
      mt-[clamp(1.81rem,2.85vw,3.41rem)]
      pt-[clamp(1.42rem,2.22vw,2.66rem)]
      pb-[clamp(2.125rem,3.33vw,4rem)]
    "
  >
    {isRequestedInfo ? (
      <>
        {/* View Reason */}
        <button
          onClick={onViewReason}
          className="
         inline-flex items-center justify-center
            rounded-full bg-[#96C9ED] hover:bg-[#1f6da9]
            font-semibold text-[#000000]
            transition-opacity hover:opacity-90
            w-[clamp(5.375rem,8.4vw,10rem)]
            h-[clamp(1.6875rem,2.64vw,3.16rem)]
            text-[clamp(0.625rem,0.97vw,1.1625rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          View Reason
        </button>

        {/* Edit */}
        {/* <button
          onClick={onUpload}
          className="
            inline-flex items-center justify-center
            rounded-full bg-[#2780C4] hover:bg-[#1f6da9]
            font-semibold text-white
            transition-opacity hover:opacity-90
            w-[clamp(5.375rem,8.4vw,10rem)]
            h-[clamp(1.6875rem,2.64vw,3.16rem)]
            text-[clamp(0.625rem,0.97vw,1.1625rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          Edit
        </button> */}
      </>
    ) : (
      <>
        {/* Back */}
        <button
          onClick={onBack}
          className="
            inline-flex items-center justify-center
            border border-[rgba(0,0,0,0.27)] rounded-full
            font-medium text-[rgba(0,0,0,0.8)]
            bg-transparent
            transition-opacity hover:opacity-75
            w-[clamp(5.375rem,8.4vw,10rem)]
            h-[clamp(1.6875rem,2.64vw,3.16rem)]
            text-[clamp(0.625rem,0.97vw,1.1625rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          Back
        </button>

        {/* Upload */}
        <button
          onClick={onUpload}
          className="
            inline-flex items-center justify-center
            rounded-full bg-[#2780C4] hover:bg-[#1f6da9]
            font-semibold text-white
            transition-opacity hover:opacity-90
            w-[clamp(5.375rem,8.4vw,10rem)]
            h-[clamp(1.6875rem,2.64vw,3.16rem)]
            text-[clamp(0.625rem,0.97vw,1.1625rem)]
            font-[family-name:var(--font-sans)]
          "
        >
          Upload
        </button>
      </>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
/* MAIN PAGE                                                                    */
/* ─────────────────────────────────────────────────────────────────────────── */

const defaultData: FarmlandDetailData = {
  heroImageUrl: afimg,
  badge: "ASSIGNED FARMLAND",
  farmlandName: "GLC SOS -001",
  location: "West Godavari, AP",
  totalValuation: "25 lakhs",
  farmlandId: "GLCSOS 01",
  assignedAgent: {
    name: "Ravi Kumar",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
  },
  creationTime: "6th Oct, 12:53 PM",
  lastUpdated: "8th Oct, 09:15 AM",
  systemStatus: "Active",
  liveStatus: "NA",
};

const Farmlanddocument: React.FC<FarmlandDetailPageProps> = ({
  data,
  onBack,
  onUpload,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const isRequestedInfo = React.useMemo(() => {
    return !!(
      location.state?.fromRequestedInfo ||
      location.search.includes("mode=requested")
    );
  }, [location]);

  const [activeStep, setActiveStep] = React.useState<"list" | "owner-details" | "family-tree" | "land-details" | "local-intelligence">("list");
  const [showReasonModal, setShowReasonModal] = React.useState(false);
  const [cameFromModal, setCameFromModal] = React.useState(false);

  // Lifted form data state
  const [firstName, setFirstName] = React.useState("Ramudu");
  const [lastName, setLastName] = React.useState("Kumar");
  const [phoneNumber, setPhoneNumber] = React.useState("+91-9123456789");
  const [email, setEmail] = React.useState("ramudu@gmail.com");
  const [dob, setDob] = React.useState("13/01/1986");
  const [religion, setReligion] = React.useState("Hindu");
  const [gender, setGender] = React.useState("Male");

  const matchedItem = FARMLAND_CARD_DUMMY.find((item) => item.id === id);

  const displayData = matchedItem
    ? {
      heroImageUrl: afimg,
      badge: isRequestedInfo ? "REQUESTED INFORMATION" : "ASSIGNED FARMLAND",
      farmlandName:
        matchedItem.farmlandId === "GLCSOS 01"
          ? "GLC SOS -001"
          : matchedItem.farmlandId.replace("GLCSOS ", "GLC SOS -00"),
      location: matchedItem.location,
      totalValuation: `${matchedItem.totalAmount.replace("₹", "")} ${matchedItem.totalAmountUnit.toLowerCase()}`,
      farmlandId: matchedItem.farmlandId,
      assignedAgent: {
        name: matchedItem.agentName,
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
      },
      creationTime: matchedItem.createdTime,
      lastUpdated: "8th Oct, 09:15 AM",
      systemStatus: matchedItem.agentStatus,
      liveStatus: "NA",
    }
    : data || {
      ...defaultData,
      badge: isRequestedInfo ? "REQUESTED INFORMATION" : "ASSIGNED FARMLAND",
    };

  const handleBack = onBack || (() => navigate(-1));
  const handleUpload = () => {
    if (onUpload) {
      onUpload();
    }
    setActiveStep("owner-details");
  };

  if (activeStep === "owner-details") {
    return (
      <OwnerDetailsDocument
        onBack={() => setActiveStep("list")}
        onNext={() => setActiveStep("family-tree")}
        onTabChange={(tab) => {
          if (tab === "owner") setActiveStep("owner-details");
          if (tab === "family") setActiveStep("family-tree");
          if (tab === "land") setActiveStep("land-details");
        }}
        onStepChange={(step) => {
          if (step === "local") setActiveStep("local-intelligence");
          else setActiveStep("owner-details");
        }}
        farmlandId={displayData.farmlandId}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        email={email}
        setEmail={setEmail}
        dob={dob}
        setDob={setDob}
        religion={religion}
        setReligion={setReligion}
        gender={gender}
        setGender={setGender}
      />
    );
  }

  if (activeStep === "family-tree") {
    return (
      <FamilyTreeDocument
        onBack={() => setActiveStep("owner-details")}
        onNext={() => setActiveStep("land-details")}
        onTabChange={(tab) => {
          if (tab === "owner") setActiveStep("owner-details");
          if (tab === "family") setActiveStep("family-tree");
          if (tab === "land") setActiveStep("land-details");
        }}
        onStepChange={(step) => {
          if (step === "local") setActiveStep("local-intelligence");
          else setActiveStep("owner-details");
        }}
        farmlandId={displayData.farmlandId}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
      />
    );
  }

  if (activeStep === "land-details") {
    return (
      <LandDetailsDocument
        onBack={() => setActiveStep("family-tree")}
        onNext={() => {
          setActiveStep("local-intelligence");
        }}
        onTabChange={(tab) => {
          if (tab === "owner") setActiveStep("owner-details");
          if (tab === "family") setActiveStep("family-tree");
          if (tab === "land") setActiveStep("land-details");
        }}
        onStepChange={(step) => {
          if (step === "local") setActiveStep("local-intelligence");
          else setActiveStep("owner-details");
        }}
        farmlandId={displayData.farmlandId}
      />
    );
  }

  if (activeStep === "local-intelligence") {
    return (
      <LocalIntelligenceDocument
        onBack={() => {
          if (cameFromModal) {
            setCameFromModal(false);
            setActiveStep("list");
            setShowReasonModal(true);
          } else {
            setActiveStep("land-details");
          }
        }}
        onNext={() => {
          alert("Farmland document updated successfully!");
          setActiveStep("list");
        }}
        onStepChange={(step) => {
          if (step === "customer") {
            if (cameFromModal) {
              setCameFromModal(false);
              setActiveStep("list");
              setShowReasonModal(true);
            } else {
              setActiveStep("owner-details");
            }
          }
        }}
        farmlandId={displayData.farmlandId}
        isFromRejection={cameFromModal || isRequestedInfo}
      />
    );
  }

  return (
    <div
      className="
        relative min-h-screen w-full
        bg-[var(--surface-page)]
      "
    >
      {/* Constrained outer area */}
      <div
        className="
          mx-auto w-full
          max-w-full
          pt-[clamp(1.5rem,2.36vw,2.81rem)]
          pb-0
          flex flex-col
        "
      >
        {/* Top nav wrapped in its own 40px padding */}
        <div className="px-[clamp(1.775rem,2.78vw,3.3rem)] w-full">
          <TopNav onBack={handleBack} isRequestedInfo={isRequestedInfo} />
        </div>

        {/* Main page content wrapper in its own 96px padding */}
        <div
          className="
            flex flex-col w-full
            px-[clamp(4.25rem,6.67vw,8rem)]
          "
        >
          {/* Page heading */}
          <div className="flex flex-col gap-2 mt-[clamp(1.33rem,2.08vw,2.5rem)]">
            <Typography
              as="h1"
              className="
                font-extrabold tracking-[-1.2px] text-[var(--text-primary)]
                font-[family-name:var(--font-heading)]
                text-[clamp(1.25rem,1.94vw,2.33rem)]
                leading-[clamp(2.125rem,3.33vw,4rem)]
              "
            >
              {isRequestedInfo ? "Requested Information" : "Assigned Farmlands"}
            </Typography>
          </div>

          {/* Hero */}
          <HeroSection data={displayData} />

          {/* Bento grid */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-[clamp(1.7rem,2.7vw,3.22rem)]
              mt-[clamp(2.125rem,3.33vw,4rem)]
            "
          >
            <AssetDetailsCard data={displayData} />
            <CurrentStatusCard data={displayData} />
          </div>

          {/* Bottom actions */}
          <BottomActions
            onBack={handleBack}
            onUpload={handleUpload}
            isRequestedInfo={isRequestedInfo}
            onViewReason={() => setShowReasonModal(true)}
          />
        </div>
      </div>

      {showReasonModal && (
        <RequestedInfoReasonModal
          onClose={() => setShowReasonModal(false)}
          onUpload={() => {
            if (onUpload) {
              onUpload();
            }
            setCameFromModal(true);
            setActiveStep("local-intelligence");
            setShowReasonModal(false);
          }}
          rejectedBy="Verification Officer Sravan"
        />
      )}
    </div>
  );
};

export default Farmlanddocument;
