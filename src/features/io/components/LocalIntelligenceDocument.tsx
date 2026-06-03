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
        px-[clamp(1rem,2.78vw,2.5rem)]
        py-[clamp(1.5rem,2.5vw,2.125rem)]
        flex flex-col gap-[clamp(1.25rem,2.22vw,1.875rem)]
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
            w-[clamp(15.25rem,16.67vw,20rem)]
            h-[clamp(2.25rem,3.61vw,4.375rem)]
            text-[clamp(0.6875rem,1.11vw,1.3125rem)]
            py-[clamp(0.625rem,1.32vw,1.5625rem)]
            px-[clamp(0.75rem,1.39vw,1.6875rem)]
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
            onClick={handleLogout}
            title="Logout"
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
                  text-[clamp(0.6875rem,1.11vw,1rem)]
                "
              >
                {initials}
              </Typography>
            )}
          </button>
        </div>
      </div>

      {/* Main Layout Area */}
      <div className="flex flex-col gap-[clamp(1rem,1.53vw,1.375rem)] w-full">
        
        {/* Row 1: Left Steps Card + Right Tabs Card */}
        <div className="flex flex-col lg:flex-row gap-[clamp(1rem,1.67vw,1.625rem)] w-full items-stretch">
          
        {/* Left Side: ID & Steps Card */}
        <Card
          className="
            relative bg-white border-none
            rounded-[1.5rem]
            w-full lg:w-[clamp(18.25rem,28.47vw,25.625rem)]
            h-[clamp(20rem,30.76vw,27.6875rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
            shrink-0
          "
        >
          {/* Farmland ID Header */}
          <span
            className="
              absolute text-[var(--text-primary)] font-medium
              left-[clamp(1.3125rem,2.08vw,1.875rem)] top-[clamp(1.3125rem,2.08vw,1.875rem)]
              w-[clamp(4.25rem,6.67vw,6rem)] h-[clamp(0.875rem,1.39vw,1.25rem)]
              font-[family-name:var(--font-sans)] text-[clamp(0.6875rem,1.11vw,1rem)] leading-[clamp(0.875rem,1.39vw,1.25rem)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute text-[var(--text-primary)] font-medium
              left-[clamp(1.3125rem,2.08vw,1.875rem)] top-[clamp(2.625rem,4.17vw,3.75rem)]
              w-[clamp(8.625rem,13.54vw,12.1875rem)] h-[clamp(1.9375rem,3.06vw,2.75rem)]
              font-[family-name:var(--font-sans)] text-[clamp(1.5rem,2.43vw,2.1875rem)] leading-[clamp(1.9375rem,3.06vw,2.75rem)]
            "
          >
            {farmlandId}
          </Typography>

          {/* Steps Container (Frame 2147239921) */}
          <div
            className="
              absolute w-[clamp(8.125rem,12.78vw,11.5rem)] h-[clamp(6rem,9.44vw,8.5rem)]
              left-[calc(50%-clamp(4.0625rem,6.39vw,5.75rem))] top-[calc(50%-clamp(3rem,4.72vw,4.25rem))]
            "
          >
            {/* Frame 2147239964 */}
            <div className="absolute w-full h-full left-0 top-0">
              
              {/* Line 495 */}
              <div
                className="
                  absolute left-0 w-0 border-l border-[rgba(0,120,250,0.25)]
                  top-[clamp(0.3125rem,0.56vw,0.5rem)] h-[clamp(4.0625rem,6.39vw,5.75rem)]
                "
              />

              {/* Step 1: Customer Information Container */}
              <div
                onClick={() => onStepChange?.("customer")}
                className="
                  absolute flex flex-col cursor-pointer
                  left-[clamp(0.5rem,0.76vw,0.6875rem)] top-0
                  w-[clamp(7.6875rem,12.01vw,10.8125rem)] h-[clamp(3rem,4.72vw,4.25rem)]
                  pl-[clamp(1.0625rem,1.67vw,1.5rem)] pb-[clamp(1.375rem,2.22vw,2rem)] gap-[clamp(0.1875rem,0.28vw,0.25rem)]
                "
              >
                {/* Checkbox Bullet (Checked/Filled State) */}
                <div
                  className="
                    absolute bg-[var(--brand-400)] transition-all duration-200
                    w-[clamp(0.55rem,0.86vw,0.7775rem)] h-[clamp(0.55rem,0.86vw,0.7775rem)]
                    left-[clamp(-1.0625rem,-1.18vw,-0.75rem)] top-[clamp(0.0625rem,0.14vw,0.125rem)]
                    rounded-[clamp(0.275rem,0.43vw,0.38875rem)]
                    shadow-[0_0_0_clamp(0.18125rem,0.29vw,0.259375rem)_#FFFFFF,0_0_0_clamp(0.275rem,0.43vw,0.38875rem)_rgba(37,99,235,0.1)]
                  "
                />
                
                {/* Customer Information text */}
                <span
                  className="
                    flex items-center font-semibold uppercase tracking-normal
                    w-[clamp(6.625rem,10.35vw,9.3125rem)] h-[clamp(1.5625rem,2.5vw,2.25rem)]
                    font-[family-name:var(--font-sans)] text-[clamp(0.625rem,0.97vw,0.875rem)] leading-[clamp(0.8125rem,1.25vw,1.125rem)]
                    text-[var(--text-subtle)]
                  "
                >
                  Customer Information
                </span>

                {/* Subtext Date */}
                <span
                  className="
                    flex items-center font-normal
                    w-[clamp(6.625rem,10.35vw,9.3125rem)] h-[clamp(0.625rem,0.97vw,0.875rem)]
                    font-[family-name:var(--font-inter)] text-[clamp(0.5rem,0.76vw,0.6875rem)] leading-[clamp(0.625rem,0.97vw,0.875rem)]
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
                  left-[clamp(0.5rem,0.76vw,0.6875rem)] top-[clamp(3.8125rem,5.97vw,5.375rem)]
                  w-[clamp(7.6875rem,12.01vw,10.8125rem)] h-[clamp(2.1875rem,3.47vw,3.125rem)]
                  pl-[clamp(1.0625rem,1.67vw,1.5rem)] pb-[clamp(1.375rem,2.22vw,2rem)] gap-[clamp(0.1875rem,0.28vw,0.25rem)]
                "
              >
                {/* Checkbox Bullet (Active State with Black outline) */}
                <div
                  className="
                    absolute bg-[var(--brand-400)] border-2 border-[var(--text-primary)] transition-all duration-200
                    w-[clamp(0.55rem,0.86vw,0.7775rem)] h-[clamp(0.55rem,0.86vw,0.7775rem)]
                    left-[clamp(-1.0625rem,-1.18vw,-0.75rem)] top-[clamp(0.0625rem,0.14vw,0.125rem)]
                    rounded-[clamp(0.275rem,0.43vw,0.38875rem)]
                    shadow-[0_0_0_clamp(0.18125rem,0.29vw,0.259375rem)_#FFFFFF,0_0_0_clamp(0.275rem,0.43vw,0.38875rem)_rgba(37,99,235,0.1)]
                  "
                />

                {/* Local Intelligence text */}
                <span
                  className="
                    flex items-center font-semibold uppercase tracking-normal
                    w-[clamp(6.625rem,10.35vw,9.3125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)]
                    font-[family-name:var(--font-sans)] text-[clamp(0.625rem,0.97vw,0.875rem)] leading-[clamp(0.8125rem,1.25vw,1.125rem)]
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
              relative bg-white border-none rounded-[1.5rem]
              p-[clamp(1rem,2vw,1.875rem)]
              shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
              flex-grow w-full
              h-[clamp(20rem,30.76vw,27.6875rem)]
              overflow-y-auto custom-scrollbar
            "
          >
            {/* Pills Container */}
            <div className="flex flex-wrap gap-[clamp(0.625rem,1.11vw,1rem)]">
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
                      px-[clamp(0.75rem,1.5vw,1.375rem)]
                      py-[clamp(0.375rem,0.8vw,0.725rem)]
                      h-[clamp(2rem,2.86vw,2.576rem)]
                      rounded-[4.53125rem]
                      transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-[var(--chart-bg)] border-[0.045rem] border-[var(--brand-500)] shadow-[0_2.625rem_1.0625rem_rgba(0,0,0,0.01)] text-[var(--text-secondary)]"
                          : "bg-[var(--chart-bg)] border border-transparent hover:border-[var(--border)] text-[var(--text-secondary)]"
                      }
                    `}
                  >
                    <div className="flex items-center gap-[clamp(0.5rem,1vw,1rem)]">
                      {/* Checkbox or Bullet Icon */}
                      {isActive ? (
                        <div
                          className="
                            w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)]
                            rounded-full bg-[var(--brand-400)]
                            border-[clamp(0.125rem,0.27vw,0.25rem)] border-white shrink-0 shadow-sm
                          "
                        />
                      ) : isSelected ? (
                        <div
                          className="
                            w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)]
                            rounded-full bg-[rgba(39,128,196,0.66)]
                            border-[clamp(0.125rem,0.27vw,0.25rem)] border-white shrink-0 shadow-sm
                          "
                        />
                      ) : (
                        <div
                          className="
                            w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)]
                            rounded-full bg-[#FFFFFF]
                            border-2 border-[rgba(122,149,28,0.43)] shrink-0
                          "
                        />
                      )}
                      
                      <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(0.6875rem,0.97vw,0.875rem)] leading-none text-center">
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
            relative bg-white border-none rounded-[1.5rem]
            p-[clamp(1rem,2.5vw,2.25rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
            w-full
            h-[clamp(20rem,30.76vw,27.6875rem)]
            flex flex-col justify-between
          "
        >
          {/* Split Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(1.5rem,3.33vw,4rem)] w-full items-start">
            
            {/* Left Column: Radio Buttons / Question */}
            <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)]">
              <Typography
                as="h3"
                className="
                  font-[family-name:var(--font-sans)] font-semibold text-[clamp(1rem,1.39vw,1.25rem)] leading-snug text-[var(--text-primary)]
                "
              >
                {currentTab.question}
              </Typography>

              {/* Options wrapper */}
              <div className="flex items-center gap-[clamp(0.75rem,1.87vw,1.6875rem)]">
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
                        px-[clamp(0.75rem,1.25vw,1.125rem)] py-[clamp(0.375rem,0.69vw,0.625rem)]
                        h-[clamp(1.875rem,2.64vw,2.375rem)]
                        border border-[var(--btn-outline-dark-border)]
                        rounded-[2.0625rem]
                        transition-all duration-200 cursor-pointer
                        bg-white hover:bg-[rgba(0,0,0,0.02)]
                      "
                    >
                      <div className="flex items-center gap-[0.625rem]">
                        {/* Circle bullet */}
                        <div
                          className={`
                            w-[0.75rem] h-[0.75rem] rounded-full bg-white border-2 transition-colors
                            ${isOptionSelected ? "border-[var(--brand-500)] bg-[var(--brand-500)]" : "border-[var(--performance-area-start)] bg-white"}
                          `}
                        />
                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(0.6875rem,0.97vw,0.875rem)] leading-none text-[var(--text-primary)]">
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Comments / Mic Button */}
            <div className="flex flex-col gap-[clamp(0.625rem,1.11vw,1rem)] w-full">
              <Typography
                as="h3"
                className="
                  font-[family-name:var(--font-sans)] font-semibold text-[clamp(1.125rem,1.67vw,1.5rem)] leading-none text-[var(--text-primary)]
                "
              >
                Add Comments
              </Typography>

              {/* Comment Text Box */}
              <div className="relative w-full h-[clamp(6.875rem,12.57vw,10rem)]">
                <textarea
                  value={comments[currentTab.id]}
                  onChange={(e) =>
                    setComments((prev) => ({ ...prev, [currentTab.id]: e.target.value }))
                  }
                  placeholder="Type comments here..."
                  className="
                    w-full h-full bg-[rgba(187,219,240,0.38)]
                    border border-[var(--btn-secondary)] rounded-[1.125rem]
                    p-4 pr-12 outline-none resize-none
                    font-[family-name:var(--font-sans)] text-[clamp(0.8125rem,1.11vw,1rem)] text-[var(--text-primary)]
                    focus:ring-1 focus:ring-[var(--brand-500)]
                  "
                />

                {/* Microphone Icon Button */}
                <button
                  className="
                    absolute right-[1rem] bottom-[1rem]
                    w-[clamp(1.75rem,2.22vw,2rem)] h-[clamp(1.75rem,2.22vw,2rem)] rounded-[5.625rem]
                    bg-[var(--brand-500)] hover:bg-[var(--brand-600)]
                    flex items-center justify-center
                    cursor-pointer transition-colors shadow-sm
                  "
                  aria-label="Voice comments"
                >
                  <Mic className="w-[1rem] h-[1rem] text-white" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Actions footer */}
          <div
            className="
              flex flex-row justify-end items-center gap-[clamp(0.5rem,0.83vw,0.75rem)]
              w-full border-t border-[var(--border)] pt-[clamp(0.75rem,1.25vw,1.125rem)]
              mt-4
            "
          >
            <button
              onClick={onBack}
              className="
                box-sizing-border-box
                flex flex-row justify-center items-center
                w-[clamp(5.625rem,8.4vw,7.5625rem)] h-[clamp(1.875rem,2.64vw,2.375rem)]
                border border-[var(--btn-outline-primary-border)]
                rounded-[2.0625rem]
                cursor-pointer transition-opacity hover:opacity-80
              "
            >
              <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6875rem,0.97vw,0.875rem)] leading-[1.125rem] text-[var(--btn-outline-primary-text)] text-center">
                Back
              </span>
            </button>

            <button
              onClick={onNext}
              className="
                flex flex-row justify-center items-center
                w-[clamp(5.625rem,8.4vw,7.5625rem)] h-[clamp(1.875rem,2.64vw,2.375rem)]
                bg-[var(--brand-500)] hover:bg-[var(--brand-600)]
                rounded-[2.0625rem]
                cursor-pointer transition-opacity hover:opacity-90
              "
            >
              <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(0.6875rem,0.97vw,0.875rem)] leading-[1.125rem] text-white text-center">
                Next
              </span>
            </button>
          </div>

        </Card>

      </div>
    </div>
  );
};
