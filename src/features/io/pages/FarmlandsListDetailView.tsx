import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Bell } from "lucide-react";
import afimg from "@/assets/afimg.png";
import { useAppSelector } from "@/core/hooks";

/* ─────────────────────────────────────────────────────────────────────────── */
/* DUMMY DATA FOR LOOKUP                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const LIST_FARMLANDS = [
  {
    id: "1",
    agentName: "Ravi Kumar",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Completed",
    statusReason: "Live on Website",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "9th Oct",
    publishedTime: "2:03 PM",
  },
  {
    id: "2",
    agentName: "Aananthu",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Rejected",
    statusReason: "Documentation Issue",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "3",
    agentName: "Srikanth",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "4",
    agentName: "Yakoob",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "5",
    agentName: "Rama Krishna",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "6",
    agentName: "Shiva Reddy",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Rejected",
    statusReason: "Documentation Issue",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "NA",
  },
  {
    id: "7",
    agentName: "Ravi Kumar",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 01",
    location: "West Godavari",
    state: "Andhra Pradesh",
    landExtend: 2.5,
    landUnit: "Acres",
    totalAmount: "25 lakhs",
    status: "Completed",
    statusReason: "Live on Website",
    createdDate: "6th Oct",
    createdTime: "12:53 PM",
    publishedDate: "9th Oct",
    publishedTime: "2:03 PM",
  },
  {
    id: "8",
    agentName: "Sunil Varma",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 02",
    location: "Krishna",
    state: "Andhra Pradesh",
    landExtend: 1.8,
    landUnit: "Acres",
    totalAmount: "18 lakhs",
    status: "Completed",
    statusReason: "Live on Website",
    createdDate: "8th Oct",
    createdTime: "10:20 AM",
    publishedDate: "11th Oct",
    publishedTime: "1:15 PM",
  },
  {
    id: "9",
    agentName: "Sravan Yadav",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 03",
    location: "Guntur",
    state: "Andhra Pradesh",
    landExtend: 3.2,
    landUnit: "Acres",
    totalAmount: "32 lakhs",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "10th Oct",
    createdTime: "9:45 AM",
    publishedDate: "NA",
  },
  {
    id: "10",
    agentName: "Mahesh Babu",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 04",
    location: "Kurnool",
    state: "Andhra Pradesh",
    landExtend: 2.2,
    landUnit: "Acres",
    totalAmount: "22 lakhs",
    status: "Rejected",
    statusReason: "Boundary Dispute",
    createdDate: "15th Oct",
    createdTime: "2:00 PM",
    publishedDate: "NA",
  },
  {
    id: "11",
    agentName: "Kalyan Ram",
    agentRole: "Field Agent",
    agentAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 05",
    location: "Nellore",
    state: "Andhra Pradesh",
    landExtend: 2.8,
    landUnit: "Acres",
    totalAmount: "28 lakhs",
    status: "Completed",
    statusReason: "Live on Website",
    createdDate: "18th Oct",
    createdTime: "11:30 AM",
    publishedDate: "20th Oct",
    publishedTime: "4:00 PM",
  },
  {
    id: "12",
    agentName: "NTR Rao",
    agentRole: "Senior Agent",
    agentAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
    farmlandId: "GLCSOS 06",
    location: "Chittoor",
    state: "Andhra Pradesh",
    landExtend: 4.0,
    landUnit: "Acres",
    totalAmount: "40 lakhs",
    status: "Pending",
    statusReason: "Under Review",
    createdDate: "22nd Oct",
    createdTime: "4:15 PM",
    publishedDate: "NA",
  }
];

const defaultItem = {
  id: "1",
  agentName: "Ravi Kumar",
  agentRole: "Field Agent",
  agentAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
  farmlandId: "GLCSOS 01",
  location: "West Godavari",
  state: "Andhra Pradesh",
  landExtend: 2.5,
  landUnit: "Acres",
  totalAmount: "25 lakhs",
  status: "Completed",
  statusReason: "Live on Website",
  createdDate: "6th Oct",
  createdTime: "12:53 PM",
  publishedDate: "9th Oct",
  publishedTime: "2:03 PM",
};

/* ─────────────────────────────────────────────────────────────────────────── */
/* HELPER SUB-COMPONENTS                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */

const MapPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#EEEEF0] shrink-0"
  >
    <path
      d="M12 21C16 17 20 13.4183 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 13.4183 8 17 12 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AgentAvatar = ({ name, avatarUrl }: { name: string; avatarUrl?: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="
        flex items-center justify-center rounded-full shrink-0 bg-[var(--border-subtle)]
        w-[clamp(1.3344rem,2.78vw,3.325rem)]
        h-[clamp(1.3344rem,2.78vw,3.325rem)]
      "
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span
          className="
            font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
            text-[clamp(0.4992rem,1.04vw,1.25rem)]
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
  fontSizeClass = "text-[clamp(0.3984rem,0.83vw,1.0rem)] leading-[clamp(0.5328rem,1.11vw,1.33rem)]",
  children,
}: {
  label: string;
  fontSizeClass?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-[clamp(0.1344rem,0.28vw,0.33rem)]">
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
      rounded-[clamp(1.0656rem,2.22vw,2.66rem)]
      p-[clamp(0.8016rem,1.67vw,2.0rem)]
      w-full
    "
  >
    <div className="flex flex-col gap-[clamp(0.1344rem,0.28vw,0.33rem)]">
      <span
        className="
          font-normal uppercase tracking-[0.6px]
          text-[var(--text-secondary)]
          text-[clamp(0.3984rem,0.83vw,1.0rem)]
          leading-[clamp(0.5328rem,1.11vw,1.33rem)]
          font-[family-name:var(--font-sans)]
        "
      >
        {label}
      </span>
      <span
        className="
          font-medium text-[var(--text-primary)]
          text-[clamp(0.6rem,1.25vw,1.5rem)]
          leading-[clamp(0.9375rem,1.94vw,2.33rem)]
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
/* EXPORTED COMPONENT                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */

const FarmlandsListDetailView = () => {
  const { id } = useParams();
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

  const item = React.useMemo(() => {
    return LIST_FARMLANDS.find((f) => f.id === id) || defaultItem;
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="
        relative min-h-screen w-full
        bg-[var(--surface-page)]
      "
    >
      {/* Outer flow wrapper */}
      <div
        className="
          mx-auto w-full
          max-w-full
          pt-[clamp(1.1328rem,2.36vw,2.81rem)]
          pb-0
          flex flex-col
        "
      >
        {/* Top nav header (Go Back & Profile / Notification) */}
        <div className="px-[clamp(1.3344rem,2.78vw,3.3rem)] w-full flex items-center justify-between">
          <BackButton
            label="Go Back to Dashboard"
            variant="light"
            size="default"
            onClick={handleBack}
            className="
              w-[clamp(11.625rem,16.94vw,20.3rem)]
              h-[clamp(1.7328rem,3.61vw,4.3rem)]
              text-[clamp(0.5328rem,1.11vw,1.33rem)]
              py-[clamp(0.6336rem,1.32vw,1.56rem)]
              px-[clamp(0.6672rem,1.39vw,1.66rem)]
              font-[family-name:var(--font-sans)]
              text-[var(--text-button)]
            "
          />

          {/* Right side notifications and user profile */}
          <div className="flex items-center gap-[clamp(0.432rem,0.9vw,0.8125rem)]">
            <button
              className="
                relative
                flex items-center justify-center bg-[var(--surface-card)] rounded-full shrink-0
                w-[clamp(1.7328rem,3.61vw,3.25rem)]
                h-[clamp(1.7328rem,3.61vw,3.25rem)]
                shadow-sm
                border border-[var(--border)]
                hover:opacity-85 transition-opacity
                cursor-pointer
              "
              aria-label="Notifications"
            >
              <Bell className="w-[clamp(0.8016rem,1.67vw,1.5rem)] h-[clamp(0.8016rem,1.67vw,1.5rem)] text-[var(--text-primary)]" />
              <span className="absolute top-[clamp(0.3312rem,0.69vw,0.625rem)] right-[clamp(0.3312rem,0.69vw,0.625rem)] w-[clamp(0.2688rem,0.56vw,0.5rem)] h-[clamp(0.2688rem,0.56vw,0.5rem)] bg-red-500 rounded-full" />
            </button>

            {/* Avatar / Profile Dropdown / Logout button */}
            <button
              onClick={() => navigate("/io/profile")}
              title="Profile"
              className="
                relative overflow-hidden
                flex items-center justify-center rounded-full bg-[var(--surface-card)] shrink-0
                w-[clamp(1.7328rem,3.61vw,3.25rem)]
                h-[clamp(1.7328rem,3.61vw,3.25rem)]
                hover:opacity-90 transition-opacity
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
                <span
                  className="
                    font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    text-[clamp(0.6672rem,1.39vw,1.6625rem)]
                  "
                >
                  {initials}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className="
            flex flex-col w-full
            px-[clamp(3.2016rem,6.67vw,8.0rem)]
          "
        >
          {/* Page Heading */}
          <div className="flex flex-col gap-2 mt-[clamp(0.9984rem,2.08vw,2.5rem)]">
            <Typography
              as="h1"
              className="
                font-extrabold tracking-[-1.2px] text-[var(--text-primary)]
                font-[family-name:var(--font-heading)]
                text-[clamp(0.9375rem,1.94vw,2.33rem)]
                leading-[clamp(1.5984rem,3.33vw,4.0rem)]
              "
            >
              Farmlands List
            </Typography>
          </div>

          {/* Hero Section */}
          <div
            className="
              relative overflow-hidden flex flex-col justify-end items-start
              w-full
              h-[clamp(13.632rem,28.4vw,34.0rem)]
              min-h-[300px]
              bg-[var(--border-default)]
              rounded-[clamp(1.0656rem,2.22vw,2.66rem)]
              shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
              mt-[clamp(0.9375rem,1.94vw,2.33rem)]
              pb-[clamp(1.3488rem,2.81vw,3.325rem)]
            "
          >
            {/* Background Image */}
            <img
              src={afimg}
              alt="Farmland hero"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10 z-0" />

            {/* Content Overlay */}
            <div
              className="
                relative z-10 flex flex-row justify-between items-center w-full
                px-[clamp(2.4672rem,5.14vw,6.25rem)]
              "
            >
              {/* Left: badge + name + location */}
              <div className="flex flex-col gap-[clamp(0.2688rem,0.56vw,0.665rem)]">
                {/* Badge pill */}
                <div
                  className="
                    inline-flex items-center self-start
                    bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]
                    backdrop-filter backdrop-blur-[6px] rounded-full
                    px-[clamp(0.3984rem,0.83vw,1.0rem)]
                    py-[clamp(0.1344rem,0.28vw,0.33rem)]
                  "
                >
                  <span
                    className="
                      font-bold uppercase tracking-[0.6px] text-white
                      text-[clamp(0.3984rem,0.83vw,1.0rem)]
                      leading-[clamp(0.5328rem,1.11vw,1.33rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    {item.status.toUpperCase()}
                  </span>
                </div>

                {/* Farmland name */}
                <h2
                  className="
                    font-extrabold text-white tracking-[-1.2px]
                    text-[clamp(1.5984rem,3.33vw,4.0rem)]
                    leading-[clamp(1.5984rem,3.33vw,4.0rem)]
                    drop-shadow-[0px_2px_2px_rgba(0,0,0,0.06)]
                    font-[family-name:var(--font-sans)]
                  "
                >
                  {item.farmlandId === "GLCSOS 01" ? "GLC SOS 01" : item.farmlandId.replace("GLCSOS ", "GLC SOS ")}
                </h2>

                {/* Location */}
                <div className="flex items-center gap-[clamp(0.1344rem,0.28vw,0.33rem)]">
                  <MapPinIcon />
                  <span
                    className="
                      font-normal text-[var(--border-subtle)]
                      text-[clamp(0.5328rem,1.11vw,1.33rem)]
                      leading-[clamp(0.8016rem,1.67vw,2.0rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    {item.location}, AP
                  </span>
                </div>
              </div>

              {/* Right: Land Extend & Total Amount side-by-side */}
              <div className="flex flex-row gap-[clamp(0.5328rem,1.11vw,1.33rem)] items-center">
                {/* Land Extend Card */}
                <div
                  className="
                    flex flex-col items-start justify-center
                    bg-white border border-[rgba(255,255,255,0.2)]
                    backdrop-blur-[10px]
                    rounded-[16px]
                    p-[clamp(0.8438rem,1.67vw,2.0rem)]
                    gap-[clamp(0.1406rem,0.28vw,0.33rem)]
                    w-[clamp(6.6094rem,13.06vw,15.67rem)]
                    h-[clamp(3.7275rem,7.36vw,8.83rem)]
                    shrink-0
                  "
                >
                  <span
                    className="
                      font-semibold uppercase tracking-[0.6px] text-left
                      text-[#3D4949]
                      text-[clamp(0.4219rem,0.83vw,1.0rem)]
                      leading-[clamp(0.5625rem,1.11vw,1.33rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    LAND EXTEND
                  </span>
                  <span
                    className="
                      font-bold text-black text-left
                      text-[clamp(1.05rem,2.08vw,2.5rem)]
                      leading-[clamp(1.2656rem,2.5vw,3.0rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    {item.landExtend} {item.landUnit}
                  </span>
                </div>

                {/* Total Amount Card */}
                <div
                  className="
                    flex flex-col items-start justify-center
                    bg-white border border-[rgba(255,255,255,0.2)]
                    backdrop-blur-[10px]
                    rounded-[16px]
                    p-[clamp(0.8438rem,1.67vw,2.0rem)]
                    gap-[clamp(0.1406rem,0.28vw,0.33rem)]
                    w-[clamp(5.9062rem,11.67vw,14.0rem)]
                    h-[clamp(3.7275rem,7.36vw,8.83rem)]
                    shrink-0
                  "
                >
                  <span
                    className="
                      font-semibold uppercase tracking-[0.6px] text-left
                      text-[#3D4949]
                      text-[clamp(0.4219rem,0.83vw,1.0rem)]
                      leading-[clamp(0.5625rem,1.11vw,1.33rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    TOTAL AMOUNT
                  </span>
                  <span
                    className="
                      font-bold text-black text-left
                      text-[clamp(1.05rem,2.08vw,2.5rem)]
                      leading-[clamp(1.2656rem,2.5vw,3.0rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    {item.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid */}
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              md:grid-cols-3
              gap-[clamp(1.296rem,2.7vw,3.22rem)]
              mt-[clamp(1.5984rem,3.33vw,4.0rem)]
            "
          >
            {/* Card 1: Asset Details */}
            <Card
              className="
                flex flex-col
                bg-white
                border border-[rgba(188,201,201,0.15)]
                shadow-[0px_20px_40px_rgba(0,49,50,0.02)]
                rounded-[32px]
                pt-[clamp(1.0656rem,2.22vw,2.66rem)]
                px-[clamp(1.0656rem,2.22vw,2.66rem)]
                pb-[clamp(2.5008rem,5.21vw,6.25rem)]
                gap-[clamp(1.0656rem,2.22vw,2.66rem)]
                h-full
              "
            >
              {/* Heading */}
              <div
                className="
                  pb-[clamp(0.5328rem,1.11vw,1.33rem)]
                  border-b border-[var(--border-subtle)]
                "
              >
                <Typography
                  as="h3"
                  variant="h4"
                  className="
                    font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    text-[clamp(0.6672rem,1.39vw,1.6625rem)]
                    leading-[clamp(0.9375rem,1.94vw,2.33rem)]
                  "
                >
                  Asset Details
                </Typography>
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-[clamp(0.6672rem,1.39vw,1.6625rem)]">
                {/* Farmland ID */}
                <InfoField label="FARMLAND ID">
                  <span
                    className="
                      font-medium text-[var(--text-primary)]
                      text-[clamp(0.5328rem,1.11vw,1.33rem)]
                      leading-[clamp(0.8016rem,1.67vw,2.0rem)]
                      font-[family-name:var(--font-sans)]
                    "
                  >
                    {item.farmlandId}
                  </span>
                </InfoField>

                {/* Assigned Agent */}
                <InfoField label="ASSIGNED AGENT">
                  <div className="flex items-center gap-[clamp(0.3984rem,0.83vw,1.0rem)]">
                    <AgentAvatar
                      name={item.agentName}
                      avatarUrl={item.agentAvatar}
                    />
                    <span
                      className="
                        font-medium text-[var(--text-primary)]
                        text-[clamp(0.5328rem,1.11vw,1.33rem)]
                        leading-[clamp(0.8016rem,1.67vw,2.0rem)]
                        font-[family-name:var(--font-sans)]
                      "
                    >
                      {item.agentName}
                    </span>
                  </div>
                </InfoField>

                {/* Creation Time + Last Updated */}
                <div className="grid grid-cols-2 gap-x-[clamp(0.96rem,2.0vw,2.4rem)]">
                  <InfoField
                    label="CREATION TIME"
                    fontSizeClass="text-[clamp(0.3312rem,0.69vw,0.83rem)] leading-[clamp(0.4992rem,1.04vw,1.25rem)]"
                  >
                    <span
                      className="
                        font-normal text-[var(--text-primary)]
                        text-[clamp(0.4688rem,0.97vw,1.1625rem)]
                        leading-[clamp(0.6672rem,1.39vw,1.6625rem)]
                        font-[family-name:var(--font-sans)]
                      "
                    >
                      {item.createdDate}, {item.createdTime}
                    </span>
                  </InfoField>
                  <InfoField
                    label="LAST UPDATED"
                    fontSizeClass="text-[clamp(0.3312rem,0.69vw,0.83rem)] leading-[clamp(0.4992rem,1.04vw,1.25rem)]"
                  >
                    <span
                      className="
                        font-normal text-[var(--text-primary)]
                        text-[clamp(0.4688rem,0.97vw,1.1625rem)]
                        leading-[clamp(0.6672rem,1.39vw,1.6625rem)]
                        font-[family-name:var(--font-sans)]
                      "
                    >
                      8th Oct, 09:15 AM
                    </span>
                  </InfoField>
                </div>
              </div>
            </Card>

            {/* Card 2: Current Status */}
            <Card
              className="
                flex flex-col
                bg-white
                border border-[rgba(188,201,201,0.15)]
                shadow-[0px_20px_40px_rgba(0,49,50,0.02)]
                rounded-[32px]
                p-[clamp(1.0656rem,2.22vw,2.66rem)]
                gap-[clamp(1.0656rem,2.22vw,2.66rem)]
                h-full
              "
            >
              {/* Heading */}
              <div
                className="
                  pb-[clamp(0.5328rem,1.11vw,1.33rem)]
                  border-b border-[var(--border-subtle)]
                "
              >
                <Typography
                  as="h3"
                  variant="h4"
                  className="
                    font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    text-[clamp(0.6672rem,1.39vw,1.6625rem)]
                    leading-[clamp(0.9375rem,1.94vw,2.33rem)]
                  "
                >
                  Current Status
                </Typography>
              </div>

              {/* Fields */}
              <div
                className="
                  flex flex-col
                  gap-[clamp(1.0656rem,2.22vw,2.66rem)]
                  flex-1 justify-center
                "
              >
                {/* System Status Box */}
                <StatusBox
                  label="SYSTEM STATUS"
                  value={item.status}
                  rightContent={
                    <div className="text-[var(--status-success)] w-[clamp(0.9rem,1.67vw,2.2rem)] h-[clamp(0.9rem,1.67vw,2.2rem)] opacity-70">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  }
                />

                {/* Live Status Box */}
                <StatusBox
                  label="LIVE STATUS"
                  value={item.status === "Completed" ? "Live on Website" : "NA"}
                  rightContent={
                    <div className="text-[var(--text-secondary)] w-[clamp(0.9rem,1.67vw,2.2rem)] h-[clamp(0.9rem,1.67vw,2.2rem)] opacity-50">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  }
                />
              </div>
            </Card>

            {/* Card 3: Performance Metrics */}
            <Card
              className="
                flex flex-col
                bg-white
                border border-[rgba(188,201,201,0.15)]
                shadow-[0px_20px_40px_rgba(0,49,50,0.02)]
                rounded-[32px]
                p-[clamp(1.0656rem,2.22vw,2.66rem)]
                gap-[clamp(1.0656rem,2.22vw,2.66rem)]
                h-full
              "
            >
              {/* Heading */}
              <div
                className="
                  pb-[clamp(0.5328rem,1.11vw,1.33rem)]
                  border-b border-[var(--border-subtle)]
                "
              >
                <Typography
                  as="h3"
                  variant="h4"
                  className="
                    font-bold text-[var(--text-primary)] font-[family-name:var(--font-sans)]
                    text-[clamp(0.6672rem,1.39vw,1.6625rem)]
                    leading-[clamp(0.9375rem,1.94vw,2.33rem)]
                  "
                >
                  Performance Metrics
                </Typography>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-[clamp(0.8016rem,1.67vw,2.2rem)] flex-1 justify-center">
                {/* Yield Index custom component */}
                <div
                  className="
                    flex flex-col
                    bg-white
                    border border-[rgba(188,201,201,0.15)]
                    shadow-[0px_20px_40px_rgba(0,49,50,0.04)]
                    rounded-[32px]
                    p-[clamp(0.8016rem,1.67vw,2.0rem)]
                    gap-[clamp(0.15rem,0.28vw,0.5rem)]
                  "
                >
                  <span
                    className="
                      font-[family-name:var(--font-sans)] font-normal
                      text-[clamp(0.4688rem,0.97vw,1.1625rem)]
                      leading-[clamp(0.6672rem,1.39vw,1.6625rem)]
                      text-[var(--text-secondary)]
                    "
                  >
                    Yield Index
                  </span>
                  <span
                    className="
                      font-[family-name:var(--font-sans)] font-bold
                      text-[clamp(1.5984rem,3.33vw,3.5rem)]
                      leading-none
                      text-[#1C5F9D]
                    "
                  >
                    +14%
                  </span>
                </div>

                {/* Attributes List */}
                <div className="flex flex-col gap-[clamp(0.6rem,1.25vw,1.6rem)]">
                  {/* Soil Type */}
                  <div className="flex items-center gap-[clamp(0.3984rem,0.83vw,1.1rem)]">
                    <div
                      className="
                        flex items-center justify-center shrink-0 rounded-full
                        bg-[var(--border-subtle)]
                        w-[clamp(1.3344rem,2.78vw,3.325rem)]
                        h-[clamp(1.3344rem,2.78vw,3.325rem)]
                      "
                    >
                      {/* Soil Type Icon */}
                      <svg
                        className="w-[clamp(0.75rem,1.53vw,1.825rem)] h-[clamp(0.75rem,1.53vw,1.825rem)] text-[#00696B]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[clamp(0.075rem,0.14vw,0.3rem)]">
                      <span
                        className="
                          font-normal uppercase tracking-[0.6px]
                          text-[var(--text-secondary)]
                          text-[clamp(0.3984rem,0.83vw,1.0rem)]
                          leading-[clamp(0.5328rem,1.11vw,1.33rem)]
                          font-[family-name:var(--font-sans)]
                        "
                      >
                        SOIL TYPE
                      </span>
                      <span
                        className="
                          font-medium text-[var(--text-primary)]
                          text-[clamp(0.5328rem,1.11vw,1.33rem)]
                          leading-[clamp(0.8016rem,1.67vw,2.0rem)]
                          font-[family-name:var(--font-sans)]
                        "
                      >
                        Black Cotton
                      </span>
                    </div>
                  </div>

                  {/* Geo-reference */}
                  <div className="flex items-center gap-[clamp(0.3984rem,0.83vw,1.1rem)]">
                    <div
                      className="
                        flex items-center justify-center shrink-0 rounded-full
                        bg-[var(--border-subtle)]
                        w-[clamp(1.3344rem,2.78vw,3.325rem)]
                        h-[clamp(1.3344rem,2.78vw,3.325rem)]
                      "
                    >
                      {/* Geo-reference Icon */}
                      <svg
                        className="w-[clamp(0.75rem,1.53vw,1.825rem)] h-[clamp(0.75rem,1.53vw,1.825rem)] text-[#00696B]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-[clamp(0.075rem,0.14vw,0.3rem)]">
                      <span
                        className="
                          font-normal uppercase tracking-[0.6px]
                          text-[var(--text-secondary)]
                          text-[clamp(0.3984rem,0.83vw,1.0rem)]
                          leading-[clamp(0.5328rem,1.11vw,1.33rem)]
                          font-[family-name:var(--font-sans)]
                        "
                      >
                        GEO-REFERENCE
                      </span>
                      <span
                        className="
                          font-medium text-[var(--text-primary)]
                          text-[clamp(0.5328rem,1.11vw,1.33rem)]
                          leading-[clamp(0.8016rem,1.67vw,2.0rem)]
                          font-[family-name:var(--font-sans)]
                        "
                      >
                        N 38.2975°, W 122.2869°
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Bottom Actions section */}
          <div
            className="
              flex flex-row justify-end items-center
              pt-[clamp(1.5984rem,3.33vw,4.0rem)]
              pb-[clamp(1.5984rem,3.33vw,4.0rem)]
            "
          >
            <button
              onClick={handleBack}
              className="
                inline-flex items-center justify-center
                rounded-full bg-[#2780C4] hover:opacity-90
                font-semibold text-white
                w-[clamp(4.875rem,8.4vw,10.0rem)]
                h-[clamp(1.2672rem,2.64vw,3.16rem)]
                text-[clamp(0.4688rem,0.97vw,1.1625rem)]
                font-[family-name:var(--font-sans)]
                transition-opacity duration-150
              "
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmlandsListDetailView;
