import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Bell, Mic } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import { useNavigate } from "react-router-dom";

interface LocalIntelligenceDocumentProps {
  onBack: () => void;
  onNext: () => void;
  onStepChange?: (step: "customer" | "local") => void;
  farmlandId?: string;
}

const subTabs = [
  {
    id: "issues",
    label: "Any Issues",
    question: "Any issues with Boundaries & Owners?",
    options: ["Available", "Not Available"]
  },
  {
    id: "liabilities",
    label: "Local Liabilities",
    question: "Are there any local liabilities or disputes on the property?",
    options: ["Yes", "No"]
  },
  {
    id: "loans",
    label: "Any Pending Loans",
    question: "Are there any pending loans or mortgages against this land?",
    options: ["Yes", "No"]
  },
  {
    id: "mindset",
    label: "Owner Mindset",
    question: "How cooperative is the owner's mindset about the verification?",
    options: ["Cooperative", "Neutral / Reluctant"]
  },
  {
    id: "source",
    label: "Source Person",
    question: "Is the primary source person related and reliable?",
    options: ["Reliable", "Needs Double Check"]
  },
  {
    id: "agreements",
    label: "Agreements",
    question: "Are all boundary and owner agreement documents valid?",
    options: ["Valid", "Incomplete"]
  },
  {
    id: "transactions",
    label: "Previous Transactions",
    question: "Have there been any disputes in previous land transactions?",
    options: ["None", "Disputed"]
  }
];

export const LocalIntelligenceDocument: React.FC<LocalIntelligenceDocumentProps> = ({
  onBack,
  onNext,
  onStepChange,
  farmlandId = "GLCSOS 01"
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [activeSubTab, setActiveSubTab] = React.useState("issues");
  const [selections, setSelections] = React.useState<Record<string, string>>({
    issues: "Available",
    liabilities: "No",
    loans: "No",
    mindset: "Cooperative",
    source: "Reliable",
    agreements: "Valid",
    transactions: "None"
  });
  const [comments, setComments] = React.useState<Record<string, string>>({
    issues: "",
    liabilities: "",
    loans: "",
    mindset: "",
    source: "",
    agreements: "",
    transactions: ""
  });

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

  const currentTab = subTabs.find(tab => tab.id === activeSubTab) || subTabs[0];

  return (
    <div
      className="
        relative min-h-screen w-full
        bg-[#F9F9F9]
        px-[clamp(16px,2.78vw,40px)]
        py-[clamp(24px,2.5vw,34px)]
        flex flex-col gap-[clamp(20px,2.22vw,30px)]
        font-[family-name:var(--font-sans)]
      "
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full">
        <BackButton
          label="Go Back to Dashboard"
          variant="light"
          size="default"
          onClick={onBack}
          className="
            w-[clamp(244px,16.67vw,320px)]
            h-[clamp(36px,3.61vw,70px)]
            text-[clamp(11px,1.11vw,21px)]
            py-[clamp(10px,1.32vw,25px)]
            px-[clamp(12px,1.39vw,27px)]
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

      {/* Main Layout Area */}
      <div className="flex flex-col gap-[clamp(16px,1.53vw,22px)] w-full">
        
        {/* Row 1: Left Steps Card + Right Tabs Card */}
        <div className="flex flex-col lg:flex-row gap-[clamp(16px,1.67vw,26px)] w-full items-stretch">
          
        {/* Left Side: ID & Steps Card */}
        <Card
          className="
            relative bg-white border-none
            rounded-[24px]
            w-full lg:w-[clamp(292px,28.47vw,410px)]
            h-[clamp(320px,30.76vw,443px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.06)]
            shrink-0
          "
        >
          {/* Farmland ID Header */}
          <span
            className="
              absolute text-[var(--text-primary)] font-medium
              left-[clamp(21px,2.08vw,30px)] top-[clamp(21px,2.08vw,30px)]
              w-[clamp(68px,6.67vw,96px)] h-[clamp(14px,1.39vw,20px)]
              font-[family-name:var(--font-sans)] text-[clamp(11px,1.11vw,16px)] leading-[clamp(14px,1.39vw,20px)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute text-[var(--text-primary)] font-medium
              left-[clamp(21px,2.08vw,30px)] top-[clamp(42px,4.17vw,60px)]
              w-[clamp(138px,13.54vw,195px)] h-[clamp(31px,3.06vw,44px)]
              font-[family-name:var(--font-sans)] text-[clamp(24px,2.43vw,35px)] leading-[clamp(31px,3.06vw,44px)]
            "
          >
            {farmlandId}
          </Typography>

          {/* Steps Container (Frame 2147239921) */}
          <div
            className="
              absolute w-[clamp(130px,12.78vw,184px)] h-[clamp(96px,9.44vw,136px)]
              left-[calc(50%-clamp(65px,6.39vw,92px))] top-[calc(50%-clamp(48px,4.72vw,68px))]
            "
          >
            {/* Frame 2147239964 */}
            <div className="absolute w-full h-full left-0 top-0">
              
              {/* Line 495 */}
              <div
                className="
                  absolute left-0 w-0 border-l border-[rgba(0,120,250,0.25)]
                  top-[clamp(5px,0.56vw,8px)] h-[clamp(65px,6.39vw,92px)]
                "
              />

              {/* Step 1: Customer Information Container */}
              <div
                onClick={() => onStepChange?.("customer")}
                className="
                  absolute flex flex-col cursor-pointer
                  left-[clamp(8px,0.76vw,11px)] top-0
                  w-[clamp(123px,12.01vw,173px)] h-[clamp(48px,4.72vw,68px)]
                  pl-[clamp(17px,1.67vw,24px)] pb-[clamp(22px,2.22vw,32px)] gap-[clamp(3px,0.28vw,4px)]
                "
              >
                {/* Checkbox Bullet (Checked/Filled State) */}
                <div
                  className="
                    absolute bg-[var(--brand-400)] transition-all duration-200
                    w-[clamp(8.8px,0.86vw,12.44px)] h-[clamp(8.8px,0.86vw,12.44px)]
                    left-[clamp(-17px,-1.18vw,-12px)] top-[clamp(1px,0.14vw,2px)]
                    rounded-[clamp(4.4px,0.43vw,6.22px)]
                    shadow-[0_0_0_clamp(2.9px,0.29vw,4.15px)_#FFFFFF,0_0_0_clamp(4.4px,0.43vw,6.22px)_rgba(37,99,235,0.1)]
                  "
                />
                
                {/* Customer Information text */}
                <span
                  className="
                    flex items-center font-semibold uppercase tracking-normal
                    w-[clamp(106px,10.35vw,149px)] h-[clamp(25px,2.5vw,36px)]
                    font-[family-name:var(--font-sans)] text-[clamp(10px,0.97vw,14px)] leading-[clamp(13px,1.25vw,18px)]
                    text-[var(--text-subtle)]
                  "
                >
                  Customer Information
                </span>

                {/* Subtext Date */}
                <span
                  className="
                    flex items-center font-normal
                    w-[clamp(106px,10.35vw,149px)] h-[clamp(10px,0.97vw,14px)]
                    font-[family-name:var(--font-inter)] text-[clamp(8px,0.76vw,11px)] leading-[clamp(10px,0.97vw,14px)]
                    text-[var(--text-label-gray)]
                  "
                >
                  Oct 24 • 09:00 AM
                </span>
              </div>

              {/* Step 2: Local Intelligence Container */}
              <div
                onClick={() => onStepChange?.("local")}
                className="
                  absolute flex flex-col cursor-pointer
                  left-[clamp(8px,0.76vw,11px)] top-[clamp(61px,5.97vw,86px)]
                  w-[clamp(123px,12.01vw,173px)] h-[clamp(35px,3.47vw,50px)]
                  pl-[clamp(17px,1.67vw,24px)] pb-[clamp(22px,2.22vw,32px)] gap-[clamp(3px,0.28vw,4px)]
                "
              >
                {/* Checkbox Bullet (Active State with Black outline) */}
                <div
                  className="
                    absolute bg-[var(--brand-400)] border-2 border-[var(--text-primary)] transition-all duration-200
                    w-[clamp(8.8px,0.86vw,12.44px)] h-[clamp(8.8px,0.86vw,12.44px)]
                    left-[clamp(-17px,-1.18vw,-12px)] top-[clamp(1px,0.14vw,2px)]
                    rounded-[clamp(4.4px,0.43vw,6.22px)]
                    shadow-[0_0_0_clamp(2.9px,0.29vw,4.15px)_#FFFFFF,0_0_0_clamp(4.4px,0.43vw,6.22px)_rgba(37,99,235,0.1)]
                  "
                />

                {/* Local Intelligence text */}
                <span
                  className="
                    flex items-center font-semibold uppercase tracking-normal
                    w-[clamp(106px,10.35vw,149px)] h-[clamp(12px,1.25vw,18px)]
                    font-[family-name:var(--font-sans)] text-[clamp(10px,0.97vw,14px)] leading-[clamp(13px,1.25vw,18px)]
                    text-[var(--brand-500)]
                  "
                >
                  Local Intelligence
                </span>
              </div>

            </div>
          </div>
        </Card>

          {/* Right Top Card: Sub-tab Pills Table */}
          <Card
            className="
              relative bg-white border-none rounded-[24px]
              p-[clamp(16px,2vw,30px)]
              shadow-[0px_20px_40px_rgba(0,49,50,0.06)]
              flex-grow w-full
              h-[clamp(320px,30.76vw,443px)]
              overflow-y-auto custom-scrollbar
            "
          >
            {/* Pills Container */}
            <div className="flex flex-wrap gap-[clamp(10px,1.11vw,16px)]">
              {subTabs.map((tab) => {
                const isActive = activeSubTab === tab.id;
                const isSelected = !!selections[tab.id];

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`
                      box-sizing-border-box
                      flex flex-row items-center justify-between
                      px-[clamp(12px,1.5vw,22px)]
                      py-[clamp(6px,0.8vw,11.6px)]
                      h-[clamp(32px,2.86vw,41.22px)]
                      rounded-[72.5px]
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-[var(--chart-bg)] border-[0.72px] border-[var(--brand-500)] shadow-[0px_42px_17px_rgba(0,0,0,0.01)] text-[var(--text-secondary)]"
                          : "bg-[var(--chart-bg)] border border-transparent hover:border-[var(--border)] text-[var(--text-secondary)]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-[clamp(8px,1vw,16px)]">
                      {/* Checkbox or Bullet Icon */}
                      {isActive ? (
                        <div
                          className="
                            w-[clamp(12px,1.25vw,18px)] h-[clamp(12px,1.25vw,18px)]
                            rounded-full bg-[var(--brand-400)]
                            border-[clamp(2px,0.27vw,4px)] border-white shrink-0 shadow-sm
                          "
                        />
                      ) : isSelected ? (
                        <div
                          className="
                            w-[clamp(12px,1.25vw,18px)] h-[clamp(12px,1.25vw,18px)]
                            rounded-full bg-[rgba(39,128,196,0.66)]
                            border-[clamp(2px,0.27vw,4px)] border-white shrink-0 shadow-sm
                          "
                        />
                      ) : (
                        <div
                          className="
                            w-[clamp(12px,1.25vw,18px)] h-[clamp(12px,1.25vw,18px)]
                            rounded-full bg-[#FFFFFF]
                            border-2 border-[rgba(122,149,28,0.43)] shrink-0
                          "
                        />
                      )}
                      
                      <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(11px,0.97vw,14px)] leading-none text-center">
                        {tab.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>

        </div>

        {/* Row 2: Bottom Card: Details Form Area */}
        <Card
          className="
            relative bg-white border-none rounded-[24px]
            p-[clamp(16px,2.5vw,36px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.06)]
            w-full
            h-[clamp(320px,30.76vw,443px)]
            flex flex-col justify-between
          "
        >
          {/* Split Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(24px,3.33vw,64px)] w-full items-start">
            
            {/* Left Column: Radio Buttons / Question */}
            <div className="flex flex-col gap-[clamp(12px,1.5vw,24px)]">
              <Typography
                as="h3"
                className="
                  font-[family-name:var(--font-sans)] font-semibold text-[clamp(16px,1.39vw,20px)] leading-snug text-[var(--text-primary)]
                "
              >
                {currentTab.question}
              </Typography>

              {/* Options wrapper */}
              <div className="flex items-center gap-[clamp(12px,1.87vw,27px)]">
                {currentTab.options.map((option) => {
                  const isOptionSelected = selections[currentTab.id] === option;
                  return (
                    <button
                      key={option}
                      onClick={() =>
                        setSelections((prev) => ({ ...prev, [currentTab.id]: option }))
                      }
                      className="
                        box-sizing-border-box
                        flex flex-row items-center justify-center
                        px-[clamp(12px,1.25vw,18px)] py-[clamp(6px,0.69vw,10px)]
                        h-[clamp(30px,2.64vw,38px)]
                        border border-[var(--btn-outline-dark-border)]
                        rounded-[33px]
                        transition-all duration-200 cursor-pointer
                        bg-white hover:bg-[rgba(0,0,0,0.02)]
                      "
                    >
                      <div className="flex items-center gap-[10px]">
                        {/* Circle bullet */}
                        <div
                          className={`
                            w-[12px] h-[12px] rounded-full bg-white border-2 transition-colors
                            ${isOptionSelected ? "border-[var(--brand-500)] bg-[var(--brand-500)]" : "border-[var(--performance-area-start)] bg-white"}
                          `}
                        />
                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(11px,0.97vw,14px)] leading-none text-[var(--text-primary)]">
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Comments / Mic Button */}
            <div className="flex flex-col gap-[clamp(10px,1.11vw,16px)] w-full">
              <Typography
                as="h3"
                className="
                  font-[family-name:var(--font-sans)] font-semibold text-[clamp(18px,1.67vw,24px)] leading-none text-[var(--text-primary)]
                "
              >
                Add Comments
              </Typography>

              {/* Comment Text Box */}
              <div className="relative w-full h-[clamp(110px,12.57vw,160px)]">
                <textarea
                  value={comments[currentTab.id]}
                  onChange={(e) =>
                    setComments((prev) => ({ ...prev, [currentTab.id]: e.target.value }))
                  }
                  placeholder="Type comments here..."
                  className="
                    w-full h-full bg-[rgba(187,219,240,0.38)]
                    border border-[var(--btn-secondary)] rounded-[18px]
                    p-4 pr-12 outline-none resize-none
                    font-[family-name:var(--font-sans)] text-[clamp(13px,1.11vw,16px)] text-[var(--text-primary)]
                    focus:ring-1 focus:ring-[var(--brand-500)]
                  "
                />

                {/* Microphone Icon Button */}
                <button
                  className="
                    absolute right-[16px] bottom-[16px]
                    w-[clamp(28px,2.22vw,32px)] h-[clamp(28px,2.22vw,32px)] rounded-[90px]
                    bg-[var(--brand-500)] hover:bg-[var(--brand-600)]
                    flex items-center justify-center
                    cursor-pointer transition-colors shadow-sm
                  "
                  aria-label="Voice comments"
                >
                  <Mic className="w-[16px] h-[16px] text-white" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Actions footer */}
          <div
            className="
              flex flex-row justify-end items-center gap-[clamp(8px,0.83vw,12px)]
              w-full border-t border-[var(--border)] pt-[clamp(12px,1.25vw,18px)]
              mt-4
            "
          >
            <button
              onClick={onBack}
              className="
                box-sizing-border-box
                flex flex-row justify-center items-center
                w-[clamp(90px,8.4vw,121px)] h-[clamp(30px,2.64vw,38px)]
                border border-[var(--btn-outline-primary-border)]
                rounded-[33px]
                cursor-pointer transition-opacity hover:opacity-80
              "
            >
              <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(11px,0.97vw,14px)] leading-[18px] text-[var(--btn-outline-primary-text)] text-center">
                Back
              </span>
            </button>

            <button
              onClick={onNext}
              className="
                flex flex-row justify-center items-center
                w-[clamp(90px,8.4vw,121px)] h-[clamp(30px,2.64vw,38px)]
                bg-[var(--brand-500)] hover:bg-[var(--brand-600)]
                rounded-[33px]
                cursor-pointer transition-opacity hover:opacity-90
              "
            >
              <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(11px,0.97vw,14px)] leading-[18px] text-white text-center">
                Next
              </span>
            </button>
          </div>

        </Card>

      </div>
    </div>
  );
};
