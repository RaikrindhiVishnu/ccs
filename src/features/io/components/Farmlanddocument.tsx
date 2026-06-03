import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { FARMLAND_CARD_DUMMY } from "@/features/io/data/Farmlandcarddummydata";
import afimg from "@/assets/afimg.png";
import { OwnerDetailsDocument } from "./OwnerDetailsDocument";
import { FamilyTreeDocument } from "./FamilyTreeDocument";
import { LandDetailsDocument } from "./LandDetailsDocument";
import { LocalIntelligenceDocument } from "./LocalIntelligenceDocument";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";


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
    className="w-[clamp(9px,0.83vw,32px)] h-[clamp(11px,1.04vw,40px)] shrink-0 text-[var(--text-secondary)]"
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
        w-[clamp(28px,2.78vw,125px)]
        h-[clamp(28px,2.78vw,125px)]
      "
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span
          className="
            font-bold text-[var(--text-primary)]
            text-[clamp(11px,0.97vw,43px)]
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
  fontSizeClass = "text-[clamp(9px,0.83vw,37px)] leading-[clamp(12px,1.11vw,50px)]",
  children,
}: {
  label: string;
  fontSizeClass?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-[clamp(2px,0.28vw,12px)]">
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
      rounded-[clamp(20px,2.22vw,100px)]
      p-[clamp(16px,1.67vw,75px)]
      w-full
    "
  >
    <div className="flex flex-col gap-[clamp(2px,0.28vw,12px)]">
      <span
        className="
          font-normal uppercase tracking-[0.6px]
          text-[var(--text-secondary)]
          text-[clamp(9px,0.83vw,37px)]
          leading-[clamp(12px,1.11vw,50px)]
          font-[family-name:var(--font-sans)]
        "
      >
        {label}
      </span>
      <span
        className="
          font-medium text-[var(--text-primary)]
          text-[clamp(14px,1.25vw,56px)]
          leading-[clamp(20px,1.94vw,87px)]
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
      h-[clamp(260px,28.4vw,1280px)]
      min-h-[300px]
      bg-[var(--border-default)]
      rounded-[clamp(20px,2.22vw,100px)]
      shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
      mt-[clamp(18px,1.94vw,28px)]
      pb-[clamp(24px,2.81vw,54px)]
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
        px-[clamp(32px,10vw,192px)]
      "
    >
      {/* Left: badge + name + location */}
      <div className="flex flex-col gap-[clamp(6px,0.56vw,25px)]">
        {/* Badge pill */}
        <div
          className="
            inline-flex items-center self-start
            bg-[var(--illus-card-white-bg)] border border-[var(--border-soft)]
            backdrop-filter backdrop-blur-[6px] rounded-full
            px-[clamp(8px,0.83vw,37px)]
            py-[clamp(2px,0.28vw,12px)]
          "
        >
          <span
            className="
              font-bold uppercase tracking-[0.6px] text-white
              text-[clamp(9px,0.83vw,37px)]
              leading-[clamp(12px,1.11vw,50px)]
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
            text-[clamp(32px,3.33vw,150px)]
            leading-[clamp(32px,3.33vw,150px)]
            drop-shadow-[0px_2px_2px_rgba(0,0,0,0.06)]
            font-[family-name:var(--font-sans)]
          "
        >
          {data.farmlandName}
        </h2>

        {/* Location */}
        <div className="flex items-center gap-[clamp(2px,0.28vw,12px)]">
          <MapPinIcon />
          <span
            className="
              font-normal text-[var(--border-subtle)]
              text-[clamp(12px,1.11vw,50px)]
              leading-[clamp(18px,1.67vw,75px)]
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
          rounded-[clamp(10px,1.11vw,50px)]
          p-[clamp(16px,1.67vw,75px)]
          gap-[clamp(2px,0.28vw,12px)]
          w-[clamp(120px,11.67vw,525px)]
          h-[clamp(80px,7.36vw,331px)]
          shrink-0
        "
      >
        <span
          className="
            font-semibold uppercase tracking-[0.6px] text-right
            text-[var(--text-secondary)]
            text-[clamp(9px,0.83vw,37px)]
            leading-[clamp(12px,1.11vw,50px)]
            font-[family-name:var(--font-sans)]
          "
        >
          TOTAL VALUATION
        </span>
        <span
          className="
            font-bold text-[var(--text-strong)] text-right
            text-[clamp(20px,2.08vw,93px)]
            leading-[clamp(24px,2.5vw,112px)]
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
      rounded-[clamp(20px,2.22vw,100px)]
      pt-[clamp(20px,2.22vw,100px)]
      px-[clamp(20px,2.22vw,100px)]
      pb-[clamp(40px,5.21vw,234px)]
      gap-[clamp(16px,1.67vw,75px)]
      h-full
    "
  >
    {/* Heading */}
    <div
      className="
        pb-[clamp(10px,1.11vw,50px)]
        border-b border-[var(--border-subtle)]
      "
    >
      <Typography
        as="h3"
        variant="h4"
        className="
          font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
          text-[clamp(14px,1.39vw,62px)]
          leading-[clamp(20px,1.94vw,87px)]
        "
      >
        Asset Details
      </Typography>
    </div>

    {/* Fields */}
    <div
      className="
        flex flex-col
        gap-[clamp(12px,1.39vw,62px)]
      "
    >
      {/* Farmland ID */}
      <InfoField label="FARMLAND ID">
        <span
          className="
            font-medium text-[var(--text-primary)]
            text-[clamp(12px,1.11vw,50px)]
            leading-[clamp(18px,1.67vw,75px)]
            font-[family-name:var(--font-sans)]
          "
        >
          {data.farmlandId}
        </span>
      </InfoField>

      {/* Assigned Agent */}
      <InfoField label="ASSIGNED AGENT">
        <div className="flex items-center gap-[clamp(8px,0.83vw,37px)]">
          <AgentAvatar
            name={data.assignedAgent.name}
            avatarUrl={data.assignedAgent.avatarUrl}
          />
          <span
            className="
              font-medium text-[var(--text-primary)]
              text-[clamp(12px,1.11vw,50px)]
              leading-[clamp(18px,1.67vw,75px)]
              font-[family-name:var(--font-sans)]
            "
          >
            {data.assignedAgent.name}
          </span>
        </div>
      </InfoField>

      {/* Creation Time + Last Updated */}
      <div className="grid grid-cols-2 gap-x-[clamp(16px,2vw,90px)]">
        <InfoField
          label="CREATION TIME"
          fontSizeClass="text-[clamp(8px,0.69vw,31px)] leading-[clamp(11px,1.04vw,46px)]"
        >
          <span
            className="
              font-normal text-[var(--text-primary)]
              text-[clamp(11px,0.97vw,43px)]
              leading-[clamp(15px,1.39vw,62px)]
              font-[family-name:var(--font-sans)]
            "
          >
            {data.creationTime}
          </span>
        </InfoField>
        <InfoField
          label="LAST UPDATED"
          fontSizeClass="text-[clamp(8px,0.69vw,31px)] leading-[clamp(11px,1.04vw,46px)]"
        >
          <span
            className="
              font-normal text-[var(--text-primary)]
              text-[clamp(11px,0.97vw,43px)]
              leading-[clamp(15px,1.39vw,62px)]
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
      rounded-[clamp(20px,2.22vw,100px)]
      p-[clamp(20px,2.22vw,100px)]
      gap-[clamp(16px,1.67vw,75px)]
      h-full
    "
  >
    {/* Heading */}
    <div
      className="
        pb-[clamp(10px,1.11vw,50px)]
        border-b border-[var(--border-subtle)]
      "
    >
      <Typography
        as="h3"
        variant="h4"
        className="
          font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
          text-[clamp(14px,1.39vw,62px)]
          leading-[clamp(20px,1.94vw,87px)]
        "
      >
        Current Status
      </Typography>
    </div>

    {/* Status rows */}
    <div
      className="
        flex flex-col
        gap-[clamp(16px,2.22vw,100px)]
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
}: {
  onBack?: () => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login", { replace: true });
  };

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
        label="Go Back to Dashboard"
        variant="light"
        size="default"
        onClick={onBack}
        className="
          w-[clamp(244px,16.94vw,320px)]
          h-[clamp(36px,3.61vw,52px)]
          text-[clamp(11px,1.11vw,16px)]
          py-[clamp(10px,1.32vw,19px)]
          px-[clamp(12px,1.39vw,20px)]
          font-[family-name:var(--font-sans)]
          text-[var(--text-button)]
        "
      />

      {/* Right: bell + avatar */}
      <div className="flex items-center gap-[clamp(8px,0.9vw,13px)]">
        {/* Bell */}
        <button
          className="
            relative
            flex items-center justify-center bg-[var(--surface-card)] rounded-full shrink-0
            w-[clamp(36px,3.61vw,52px)]
            h-[clamp(36px,3.61vw,52px)]
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
              w-[clamp(16px,1.67vw,24px)]
              h-[clamp(16px,1.67vw,24px)]
            "
          />

          <span
            className="
              absolute rounded-full
              bg-[var(--status-danger)]
              w-[clamp(4px,0.4vw,6px)]
              h-[clamp(4px,0.4vw,6px)]
              top-[clamp(6px,0.7vw,10px)]
              right-[clamp(6px,0.7vw,10px)]
            "
          />
        </button>

        {/* Avatar */}
        <button
          onClick={handleLogout}
          title="Logout"
          className="
            relative overflow-hidden
            flex items-center justify-center
            rounded-full
            bg-[var(--surface-card)]
            transition-opacity
            hover:opacity-90
            w-[clamp(36px,3.61vw,52px)]
            h-[clamp(36px,3.61vw,52px)]
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
                text-[clamp(11px,1.11vw,16px)]
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
}: {
  onBack?: () => void;
  onUpload?: () => void;
}) => (
  <div
    className="
      flex flex-row justify-end items-center
      gap-[clamp(10px,1.11vw,50px)]
      mt-[clamp(8px,2.85vw,41px)]
      pt-[clamp(16px,2.22vw,32px)]
      pb-[clamp(24px,3.33vw,48px)]
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
        transition-opacity hover:opacity-75
        w-[clamp(90px,8.4vw,378px)]
        h-[clamp(30px,2.64vw,118px)]
        text-[clamp(11px,0.97vw,43px)]
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
        w-[clamp(90px,8.4vw,378px)]
        h-[clamp(30px,2.64vw,118px)]
        text-[clamp(11px,0.97vw,43px)]
        font-[family-name:var(--font-sans)]
      "
    >
      Upload
    </button>
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

  const [activeStep, setActiveStep] = React.useState<"list" | "owner-details" | "family-tree" | "land-details" | "local-intelligence">("list");

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
      badge: "ASSIGNED FARMLAND",
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
    : data || defaultData;

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
        onBack={() => setActiveStep("land-details")}
        onNext={() => {
          alert("Farmland document updated successfully!");
          setActiveStep("list");
        }}
        onStepChange={(step) => {
          if (step === "customer") setActiveStep("owner-details");
        }}
        farmlandId={displayData.farmlandId}
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
          pt-[clamp(24px,2.36vw,34px)]
          pb-0
          flex flex-col
        "
      >
        {/* Top nav wrapped in its own 40px figma padding */}
        <div className="px-[clamp(16px,2.78vw,40px)] w-full">
          <TopNav onBack={handleBack} />
        </div>

        {/* Main page content wrapper in its own 96px figma padding */}
        <div
          className="
            flex flex-col w-full
            px-[clamp(32px,6.67vw,96px)]
          "
        >
          {/* Page heading */}
          <div className="flex flex-col gap-2 mt-[clamp(20px,2.08vw,30px)]">
            <Typography
              as="h1"
              className="
                font-extrabold tracking-[-1.2px] text-[var(--text-primary)]
                font-[family-name:var(--font-heading)]
                text-[clamp(20px,1.94vw,87px)]
                leading-[clamp(32px,3.33vw,150px)]
              "
            >
              Assigned Farmlands
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
              gap-[clamp(16px,2.7vw,121px)]
              mt-[clamp(32px,3.33vw,48px)]
            "
          >
            <AssetDetailsCard data={displayData} />
            <CurrentStatusCard data={displayData} />
          </div>

          {/* Bottom actions */}
          <BottomActions onBack={handleBack} onUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
};

export default Farmlanddocument;
