import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import checklistIcon from "@/assets/checklist.svg";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/core/hooks";
import { useNavigate } from "react-router-dom";

interface FamilyTreeDocumentProps {
  onBack: () => void;
  onGoBackDashboard?: () => void;
  onNext: () => void;
  onTabChange: (tab: "owner" | "family" | "land") => void;
  onStepChange?: (step: "customer" | "local") => void;
  farmlandId?: string;
  firstName: string;
  lastName: string;
  gender: string;
  isVO3?: boolean;
}

export const FamilyTreeDocument: React.FC<FamilyTreeDocumentProps> = ({
  onBack,
  onGoBackDashboard,
  onNext,
  onTabChange,
  onStepChange,
  farmlandId = "GLCSOS 01",
  firstName,
  lastName,
  gender,
  isVO3 = false,
}) => {
  const [activeStep, setActiveStep] = React.useState<"customer" | "local">("customer");
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
    <div
      className="
        relative min-h-screen w-full
        bg-[var(--surface-page)]
        px-[clamp(1.3344rem,2.78vw,3.3rem)]
        py-[clamp(1.2rem,2.5vw,3.0rem)]
        flex flex-col gap-[clamp(1.0656rem,2.22vw,2.66rem)]
        font-[family-name:var(--font-sans)]
      "
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full">
        <BackButton
          label="Go back to dashboard"
          variant="light"
          size="default"
          onClick={onGoBackDashboard || onBack}
          className="
            w-[clamp(11.625rem,16.67vw,20.0rem)]
            h-[clamp(1.7328rem,3.61vw,4.3rem)]
            text-[clamp(0.5328rem,1.11vw,1.33rem)]
            py-[clamp(0.6336rem,1.32vw,1.58rem)]
            px-[clamp(0.6672rem,1.39vw,1.66rem)]
            font-[family-name:var(--font-sans)]
            text-[var(--text-button)]
          "
        />

        {/* Right: bell + avatar */}
        <div className="flex items-center gap-[clamp(0.432rem,0.9vw,0.8125rem)]">
          {/* Bell */}
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
            <Bell
              strokeWidth={1.5}
              color="var(--text-primary)"
              className="
                w-[clamp(0.8016rem,1.67vw,1.5rem)]
                h-[clamp(0.8016rem,1.67vw,1.5rem)]
              "
            />

            <span
              className="
                absolute rounded-full
                bg-[var(--status-danger)]
                w-[clamp(0.192rem,0.4vw,0.375rem)]
                h-[clamp(0.192rem,0.4vw,0.375rem)]
                top-[clamp(0.336rem,0.7vw,0.625rem)]
                right-[clamp(0.336rem,0.7vw,0.625rem)]
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
              w-[clamp(1.7328rem,3.61vw,3.25rem)]
              h-[clamp(1.7328rem,3.61vw,3.25rem)]
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
                  text-[clamp(0.5328rem,1.11vw,1.33rem)]
                "
              >
                {initials}
              </Typography>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-[clamp(13.6656rem,28.47vw,34.125rem)_1fr]
          gap-[clamp(0.8016rem,1.67vw,2.0rem)]
          w-full items-start
        "
      >
        {/* Left Side: ID & Steps Card */}
        <Card
          className="
            relative bg-[var(--surface-card)] border-none
            rounded-[1.5rem]
            w-[clamp(13.6656rem,28.47vw,34.125rem)]
            h-[clamp(15.35rem,24.03vw,28.825rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
          "
        >
          {/* Farmland ID Header */}
          <span
            className="
              absolute left-[1.875rem] top-[1.875rem]
              text-[clamp(0.5328rem,1.11vw,1.33rem)] font-medium text-[var(--text-primary)] font-[family-name:var(--font-sans)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute left-[1.875rem] top-[3.75rem]
              text-[clamp(1.1664rem,2.43vw,2.916rem)] font-medium text-[var(--text-primary)] leading-[2.75rem]
              font-[family-name:var(--font-sans)]
            "
          >
            {farmlandId}
          </Typography>

          {/* Steps Container */}
          <div
            className="
              absolute
              w-[clamp(6.1344rem,12.78vw,15.3rem)]
              h-[clamp(4.5312rem,9.44vw,11.3rem)]
              left-[calc(50%-clamp(3.0672rem,6.39vw,7.65rem))]
              top-[calc(50%-clamp(3rem,4.72vw,5.65rem)+clamp(2.17rem,3.4vw,4.08rem))]
            "
          >
            <div className="absolute w-[clamp(6.1344rem,12.78vw,15.3rem)] h-[clamp(4.5312rem,9.44vw,11.3rem)] left-0 top-0">
              {/* Line 495 */}
              <div
                className="
                  absolute left-0 top-[clamp(0.2688rem,0.56vw,0.66rem)] w-[0.125rem] h-[clamp(3.0672rem,6.39vw,7.65rem)]
                  border-l border-[rgba(0,120,250,0.25)]
                "
              />

              {/* Step 1: Customer Information */}
              <div
                onClick={() => {
                  setActiveStep("customer");
                  onStepChange?.("customer");
                }}
                className="
                  absolute left-[clamp(0.3656rem,0.76vw,0.915rem)] top-0 w-[clamp(5.7656rem,12.01vw,14.4rem)] h-[clamp(2.2656rem,4.72vw,5.65rem)]
                  pl-[clamp(0.8016rem,1.67vw,2.0rem)] pb-[clamp(1.0656rem,2.22vw,2.66rem)] flex flex-col gap-[clamp(0.135rem,0.28vw,0.33rem)] cursor-pointer
                "
              >
                <div
                  className={`
                    absolute left-[clamp(-1.0625rem,-1.67vw,-0.7969rem)] top-[clamp(0.048rem,0.1vw,0.125rem)] w-[clamp(0.375rem,0.78vw,1.03rem)] h-[clamp(0.375rem,0.78vw,1.03rem)] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${activeStep === "customer"
                      ? "bg-[var(--brand-400)] border-2 border-[var(--text-primary)] shadow-[0_0_0_clamp(0.1392rem,0.29vw,0.35rem)_#ffffff,0_0_0_clamp(0.2064rem,0.43vw,0.515rem)_rgba(37,99,235,0.1)]"
                      : "bg-[var(--surface-card)] border-[0.129375rem] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                <span
                  className={`
                    w-[clamp(4.944rem,10.3vw,12.4rem)] h-[clamp(1.2rem,2.5vw,3.0rem)] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[clamp(0.4688rem,0.97vw,1.1625rem)] leading-[clamp(0.6rem,1.25vw,1.5rem)] uppercase tracking-normal
                    ${activeStep === "customer" ? "text-[var(--brand-500)]" : "text-[var(--text-muted)]"}
                  `}
                >
                  Customer Information
                </span>
              </div>

              {/* Step 2: Local Intelligence */}
              <div
                onClick={() => {
                  setActiveStep("local");
                  onStepChange?.("local");
                }}
                className="
                  absolute left-[clamp(0.3656rem,0.76vw,0.915rem)] top-[clamp(2.8656rem,5.97vw,7.15rem)] w-[clamp(5.7656rem,12.01vw,14.4rem)] h-[clamp(1.6656rem,3.47vw,4.16rem)]
                  pl-[clamp(0.8016rem,1.67vw,2.0rem)] pb-[clamp(1.0656rem,2.22vw,2.66rem)] flex flex-col gap-[clamp(0.135rem,0.28vw,0.33rem)] cursor-pointer
                "
              >
                <div
                  className={`
                    absolute left-[clamp(-1.0625rem,-1.67vw,-0.7969rem)] top-[clamp(0.048rem,0.1vw,0.125rem)] w-[clamp(0.375rem,0.78vw,1.03rem)] h-[clamp(0.375rem,0.78vw,1.03rem)] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${activeStep === "local"
                      ? "bg-[var(--brand-400)] border-2 border-[var(--text-primary)] shadow-[0_0_0_clamp(0.1392rem,0.29vw,0.35rem)_#ffffff,0_0_0_clamp(0.2064rem,0.43vw,0.515rem)_rgba(37,99,235,0.1)]"
                      : "bg-[var(--surface-card)] border-[0.129375rem] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                <span
                  className={`
                    w-[clamp(4.944rem,10.3vw,12.4rem)] h-[clamp(0.6rem,1.25vw,1.5rem)] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[clamp(0.4688rem,0.97vw,1.1625rem)] leading-[clamp(0.6rem,1.25vw,1.5rem)] uppercase tracking-normal
                    ${activeStep === "local" ? "text-[var(--brand-500)]" : "text-[var(--text-muted)]"}
                  `}
                >
                  Local Intelligence
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Right Side: Details Card */}
        <Card
          className="
            flex-1 bg-[var(--surface-card)] border-none
            rounded-[clamp(1.0656rem,2.22vw,2.66rem)]
            min-h-[clamp(29.1312rem,60.69vw,72.81rem)]
            p-[clamp(1.5984rem,3.33vw,4.0rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
            flex flex-col
          "
        >
          {/* Tabs header */}
          <div className="flex flex-row items-center justify-end gap-[clamp(0.5328rem,1.11vw,1.33rem)] mb-[clamp(1.5984rem,3.33vw,4.0rem)]">
            {/* Tab: Owner Details */}
            <button
              onClick={() => onTabChange("owner")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(1.032rem,2.15vw,2.575rem)]
                py-[clamp(0.384rem,0.8vw,0.956rem)]
                h-[clamp(1.3728rem,2.86vw,3.4rem)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[var(--chart-bg)] text-[var(--text-subtle)]
              "
            >
              <span className="text-[clamp(0.4688rem,0.97vw,1.1625rem)] font-semibold whitespace-nowrap mr-3">
                Owner Details
              </span>
              <img src={checklistIcon} alt="checklist" className="w-[1.125rem] h-[1.125rem] shrink-0" />
            </button>

            {/* Tab: Family Tree */}
            <button
              onClick={() => onTabChange("family")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(1.296rem,2.7vw,3.22rem)]
                py-[clamp(0.384rem,0.8vw,0.956rem)]
                h-[clamp(1.3728rem,2.86vw,3.4rem)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[var(--surface-card)] border border-[var(--brand-400)] text-[var(--brand-400)]
              "
            >
              <span className="text-[clamp(0.4688rem,0.97vw,1.1625rem)] font-semibold whitespace-nowrap mr-3">
                Family Tree
              </span>
              <div className="w-[1.125rem] h-[1.125rem] rounded-full bg-[var(--brand-400)] border-[4px] border-[var(--surface-card)] shrink-0 shadow-sm" />
            </button>

            {/* Tab: Land Details */}
            <button
              onClick={() => onTabChange("land")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(1.296rem,2.7vw,3.22rem)]
                py-[clamp(0.384rem,0.8vw,0.956rem)]
                h-[clamp(1.3728rem,2.86vw,3.4rem)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[var(--chart-bg)] text-[var(--text-subtle)]
              "
            >
              <span className="text-[clamp(0.4688rem,0.97vw,1.1625rem)] font-semibold whitespace-nowrap mr-3">
                Land Details
              </span>
              <div className="w-[1.125rem] h-[1.125rem] rounded-full bg-[var(--brand-400)] border-[4px] border-[var(--surface-card)] shrink-0 shadow-sm" />
            </button>
          </div>

          {/* Family Tree Diagram */}
          <div className="w-full relative flex-1 flex flex-col justify-center items-center py-4 select-none">
            {/* Family Tree Container (822x565 aspect ratio, fluid scaling) */}
            {/* Family Tree Container (822x565 aspect ratio, fluid scaling) */}
            <div className="w-full aspect-[822/565] max-w-[clamp(38.5312rem,57.0vw,80.0rem)] relative">
              {/* SVG Connectors Layer */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 822 565"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left curved connection to Father */}
                <path
                  d="M 411 198 L 411 236 A 10 10 0 0 1 401 246 L 215 246 A 10 10 0 0 0 205 256 L 205 294"
                  stroke="var(--border-default)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right curved connection to Mother */}
                <path
                  d="M 411 198 L 411 236 A 10 10 0 0 0 421 246 L 607 246 A 10 10 0 0 1 617 256 L 617 294"
                  stroke="var(--border-default)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Vertical line to Spouse */}
                <path d="M 411 198 L 411 294" stroke="var(--border-default)" strokeWidth="1.5" />
                {/* Vertical line from Spouse to Daughter */}
                <path d="M 411 384 L 411 475" stroke="var(--border-default)" strokeWidth="1.5" />
              </svg>

              {/* Relationship Labels */}
              <div className="absolute left-[25.24%] top-[41.95%] w-[8.68%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5156rem,0.76vw,1.5rem)] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Father
              </div>

              <div className="absolute left-[45.66%] top-[44.60%] w-[8.68%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5156rem,0.76vw,1.5rem)] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Spouse
              </div>

              <div className="absolute right-[25.24%] top-[41.95%] w-[8.68%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5156rem,0.76vw,1.5rem)] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Mother
              </div>

              <div className="absolute left-[44.83%] top-[76.37%] w-[10.34%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5156rem,0.76vw,1.5rem)] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Daughter
              </div>

              {/* 1. Root Level: Primary Owner */}
              <div
                className="absolute w-[35%] h-[35%] left-[32.5%] top-0 flex flex-col items-center justify-center p-[4%] rounded-2xl border border-[var(--brand-400)] backdrop-blur-[10px] shadow-sm"
                style={{
                  background: "linear-gradient(134.38deg, rgba(255, 255, 255, 0.9) 0%, rgba(218, 226, 253, 0.4) 100%)",
                }}
              >
                <div className="relative w-[clamp(2.64rem,5.5vw,7.5rem)] h-[clamp(2.64rem,5.5vw,7.5rem)] rounded-full border-4 border-[var(--chart-bg)] shadow-sm overflow-visible mb-2 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                    alt="Owner Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute bottom-[-0.6875rem] left-1/2 -translate-x-1/2 bg-[var(--brand-400)] rounded-full px-3 py-0.5 shadow-sm border border-[var(--surface-card)]">
                    <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.4219rem,0.62vw,1.3rem)] tracking-[0.5px] text-[var(--surface-sidebar-text)]">
                      OWNER
                    </span>
                  </div>
                </div>
                <div className="text-center mt-2.5">
                  <h4 className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(0.5625rem,1.1vw,2.0rem)] text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
                    {firstName} {lastName}
                  </h4>
                  <p className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.5156rem,1.0vw,1.8rem)] text-[var(--brand-400)]">
                    {gender}, 42 yrs
                  </p>
                </div>
              </div>

              {/* 2. Father Card */}
              <div className="absolute w-[31%] h-[16%] left-0 top-[52%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(1.92rem,4.0vw,6.5rem)] h-[clamp(1.92rem,4.0vw,6.5rem)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Father Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(0.528rem,1.1vw,2.0rem)] text-[var(--text-primary)] truncate">
                    Vikram Mehta
                  </span>
                  <span className="text-[clamp(0.48rem,1.0vw,1.8rem)] text-[var(--text-secondary)]">
                    Male, 72 yrs
                  </span>
                </div>
              </div>

              {/* 3. Spouse Card */}
              <div className="absolute w-[31%] h-[16%] left-[34.5%] top-[52%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(1.92rem,4.0vw,6.5rem)] h-[clamp(1.92rem,4.0vw,6.5rem)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                    alt="Spouse Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(0.528rem,1.1vw,2.0rem)] text-[var(--text-primary)] truncate">
                    Priya Mehta
                  </span>
                  <span className="text-[clamp(0.48rem,1.0vw,1.8rem)] text-[var(--text-secondary)]">
                    Female, 40 yrs
                  </span>
                </div>
              </div>

              {/* 4. Mother Card */}
              <div className="absolute w-[31%] h-[16%] right-0 top-[52%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(1.92rem,4.0vw,6.5rem)] h-[clamp(1.92rem,4.0vw,6.5rem)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
                    alt="Mother Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(0.528rem,1.1vw,2.0rem)] text-[var(--text-primary)] truncate">
                    Sushila Mehta
                  </span>
                  <span className="text-[clamp(0.48rem,1.0vw,1.8rem)] text-[var(--text-secondary)]">
                    Female, 68 yrs
                  </span>
                </div>
              </div>

              {/* 5. Daughter Card */}
              <div className="absolute w-[31%] h-[16%] left-[34.5%] top-[84%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(1.92rem,4.0vw,6.5rem)] h-[clamp(1.92rem,4.0vw,6.5rem)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Daughter Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(0.528rem,1.1vw,2.0rem)] text-[var(--text-primary)] truncate">
                    Ananya Mehta
                  </span>
                  <span className="text-[clamp(0.48rem,1.0vw,1.8rem)] text-[var(--text-secondary)]">
                    Female, 12 yrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div
            className="
              flex flex-row justify-end items-center gap-3 mt-auto
              w-full border-t border-[rgba(0,0,0,0.05)] pt-[clamp(0.8016rem,1.67vw,2.0rem)]
            "
          >
            <button
              onClick={onBack}
              className="
                inline-flex items-center justify-center
                border border-[var(--btn-outline-dark-border)] rounded-full
                font-medium text-[var(--btn-outline-dark-text)]
                bg-transparent
                transition-opacity hover:opacity-75 cursor-pointer
                w-[clamp(4.032rem,8.4vw,10.0rem)]
                h-[clamp(1.2672rem,2.64vw,3.16rem)]
                text-[clamp(0.4688rem,0.97vw,1.1625rem)]
                font-[family-name:var(--font-sans)]
              "
            >
              {isVO3 ? "Turn Back" : "Back"}
            </button>

            <button
              onClick={onNext}
              className="
                inline-flex items-center justify-center
                rounded-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)]
                font-semibold text-[var(--surface-sidebar-text)]
                transition-opacity hover:opacity-90 cursor-pointer
                w-[clamp(4.032rem,8.4vw,10.0rem)]
                h-[clamp(1.2672rem,2.64vw,3.16rem)]
                text-[clamp(0.4688rem,0.97vw,1.1625rem)]
                font-[family-name:var(--font-sans)]
              "
            >
              {isVO3 ? "Approve" : "Next"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
