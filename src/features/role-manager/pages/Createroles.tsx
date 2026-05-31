import * as React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// ─── Image imports ────────────────────────────────────────────────────────────
import regionalOfficerImg from "@/assets/role-regional-officer.svg";
import intelligenceOfficerImg from "@/assets/role-intelligence-officer.svg";
import fieldOfficerImg from "@/assets/role-field-officer.svg";
import agentImg from "@/assets/agentui.svg";

// ─── Types ────────────────────────────────────────────────────────────────────
interface RoleItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
  imageClass: string;
}

// ─── Role data (Precise percentage metrics mapped to 1440px baseline) ─────────
const ROLES: RoleItem[] = [
  {
    id: "regional-officer",
    title: "Regional Officer",
    description: "Oversees territory strategy and approves final land acquisitions.",
    badge: "Approval Authority",
    imageSrc: regionalOfficerImg,
    imageAlt: "Regional Officer",
    imageClass: "w-[88.08%] h-[110.57%] left-[3.97%] top-[2%]",
  },
  {
    id: "intelligence-officer",
    title: "Intelligence Officer",
    description: "Validates documentation and ensures all assets are risk-free.",
    badge: "Risk Assessment",
    imageSrc: intelligenceOfficerImg,
    imageAlt: "Intelligence Officer",
    imageClass: "w-[98.92%] h-[124.47%] left-[-3.97%] top-[-10%]",
  },
  {
    id: "field-officer",
    title: "Field Officer",
    description: "Conducts physical inspections to verify boundaries and reality.",
    badge: "Physical Verification",
    imageSrc: fieldOfficerImg,
    imageAlt: "Field Officer",
    imageClass: "w-[107.94%] h-[135.65%] left-[-3.25%] top-[-9%]",
  },
  {
    id: "agent",
    title: "Agent",
    description: "Sources new land opportunities and drives the deal pipeline.",
    badge: "Deal Sourcing",
    imageSrc: agentImg,
    imageAlt: "Agent",
    imageClass: "w-[102.53%] h-[129.00%] left-[-3.25%] top-[-8%]",
  },
];

// ─── Route map ────────────────────────────────────────────────────────────────
const ROLE_ROUTES: Record<string, string> = {
  "regional-officer": "/role-manager/regional-officer-create",
  "intelligence-officer": "/role-manager/intellegence-officer-create",
  "field-officer": "/role-manager/field-officer-create",
  "agent": "/role-manager/agent-create",
};

// ─── GoBackButton ─────────────────────────────────────────────────────────────
const GoBackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-row items-center justify-start gap-[0.56vw] bg-white rounded-[4.17vw]",
      "shadow-[0px_0px_4px_rgba(0,0,0,0.12)] border-0 cursor-pointer shrink-0",
      "w-[16.94vw] h-[3.61vw] px-[1.39vw] py-[1.32vw]",
      "transition-all duration-200 hover:opacity-90 active:scale-[0.98]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2780C4]"
    )}
    aria-label="Go Back to Dashboard"
  >
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-[1.67vw] h-[1.67vw] shrink-0 -rotate-90"
      aria-hidden="true"
    >
      <path
        d="M12 5V19M12 5L6 11M12 5L18 11"
        stroke="#000000"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="font-sans font-normal text-[1.11vw] leading-[1.25vw] text-black whitespace-nowrap">
      Go Back to Dashboard
    </span>
  </button>
);

// ─── RoleCard ─────────────────────────────────────────────────────────────────
const RoleCard: React.FC<RoleItem & { onClick?: () => void }> = ({
  title,
  description,
  badge,
  imageSrc,
  imageAlt,
  imageClass,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={cn(
      "relative select-none cursor-pointer group transition-all duration-300",
      "w-full aspect-[277/331] rounded-[16.6%] bg-transparent shrink-0",
      "hover:translate-y-[-4px]"
    )}
  >
    {/* Layer 1: Rounded White Circle Background (proportional sizes) */}
    <div
      className={cn(
        "absolute w-full h-[96.67%] -top-[18.1%] left-0 rounded-[20%] bg-white",
        "shadow-[0px_0px_8.4px_rgba(0,0,0,0.06)] overflow-hidden",
        "transition-all duration-300 group-hover:shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
      )}
    >
      {/* Layer 2: Overflow Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className={cn(
          "absolute max-w-none transition-transform duration-300 group-hover:scale-[1.03]",
          imageClass
        )}
      />
    </div>

    {/* Layer 3: Notch Container and Stepped Background (51.96% height) */}
    <div className="absolute bottom-0 left-0 w-full h-[51.96%]">
      {/* Exact Stepped Notch SVG Shape */}
      <svg
        viewBox="0 0 277 172"
        className={cn(
          "absolute inset-0 w-full h-full text-white fill-current",
          "transition-colors duration-200"
        )}
      >
        <path d="M 0,172 L 0,15 A 15,15 0 0 1 15,0 L 157.68,0 A 30,30 0 0 1 187.68,30 L 187.68,31 L 265,31 A 12,12 0 0 1 277,43 L 277,128 A 44,44 0 0 1 233,172 L 46,172 A 46,46 0 0 1 0,126 Z" />
      </svg>

      {/* Layer 4: Content Overlay (Proportional Paddings & Font Sizes) */}
      <div className="absolute inset-0 flex flex-col justify-start pl-[7.22%] pr-[7.22%] pt-[10.27%] pb-[6.65%] z-10">
        <h3 className="font-sans font-medium text-[1.11vw] leading-[125%] text-black tracking-[-0.01em]">
          {title}
        </h3>

        <p className="font-sans font-normal text-[0.97vw] leading-[128%] text-black/60 tracking-[-0.01em] mt-[3.49%] max-w-[95%]">
          {description}
        </p>

        <div className="mt-auto self-start flex items-center justify-center bg-[#EAF3FA] h-[20.35%] rounded-full px-[5.77%] transition-all duration-200 group-hover:bg-[#d8e8f5]">
          <span className="font-sans font-semibold text-[0.83vw] leading-none text-[#2780C4] tracking-[-0.01em] whitespace-nowrap">
            {badge}
          </span>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const CreateRoles: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "min-h-screen w-full bg-[#F2F2F2] flex flex-col items-start justify-start overflow-x-hidden",
        "pl-[4.44vw] pr-[4.44vw] pt-[3.26vw] pb-[4.17vw]"
      )}
    >
      {/* Go Back button positioned exactly relative to viewport spacing */}
      <GoBackButton onClick={() => navigate("/role-manager/user-directory")} />

      {/* Heading positioned relative to viewport spacing */}
      <h1
        className={cn(
          "font-sans font-bold text-black tracking-[-0.02vw]",
          "text-[2.08vw] leading-[2.22vw] mt-[4.86vw]"
        )}
      >
        Create Roles. Drive Accountability.
      </h1>

      {/* Description positioned relative to viewport spacing */}
      <p
        className={cn(
          "font-sans font-normal text-black/60",
          "text-[1.11vw] leading-[1.81vw] mt-[1.32vw] max-w-[69.17vw]"
        )}
      >
        Assign clear responsibilities across your land operations, from approvals and risk
        assessment to field verification and deal sourcing, so every step is structured,
        transparent, and easy to manage.
      </p>

      {/* Cards container: 4-columns guarantees cards stay in EXACTLY ONE SINGLE ROW */}
      <div
        className={cn(
          "w-full max-w-[86.94vw] grid grid-cols-4",
          "gap-x-[3.33vw] gap-y-[4.17vw] mt-[7.99vw] ml-[1.88vw] pb-[20px]"
        )}
      >
        {ROLES.map((role) => (
          <RoleCard
            key={role.id}
            {...role}
            onClick={() => navigate(ROLE_ROUTES[role.id])}
          />
        ))}
      </div>
    </div>
  );
};

export default CreateRoles;