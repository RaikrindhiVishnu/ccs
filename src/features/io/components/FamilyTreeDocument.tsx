import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import checklistIcon from "@/assets/checklist.svg";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import { useNavigate } from "react-router-dom";

interface FamilyTreeDocumentProps {
  onBack: () => void;
  onNext: () => void;
  onTabChange: (tab: "owner" | "family" | "land") => void;
  onStepChange?: (step: "customer" | "local") => void;
  farmlandId?: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export const FamilyTreeDocument: React.FC<FamilyTreeDocumentProps> = ({
  onBack,
  onNext,
  onTabChange,
  onStepChange,
  farmlandId = "GLCSOS 01",
  firstName,
  lastName,
  gender,
}) => {
  const [activeStep, setActiveStep] = React.useState<"customer" | "local">("customer");
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
    <div
      className="
        relative min-h-screen w-full
        bg-[var(--surface-page)]
        px-[clamp(16px,2.78vw,54px)]
        py-[clamp(24px,2.5vw,48px)]
        flex flex-col gap-[clamp(20px,2.22vw,43px)]
        font-[family-name:var(--font-sans)]
      "
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full">
        <BackButton
          label="Go back to dashboard"
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

      {/* Main Grid Layout */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-[clamp(280px,28.47vw,547px)_1fr]
          gap-[clamp(16px,1.67vw,32px)]
          w-full items-start
        "
      >
        {/* Left Side: ID & Steps Card */}
        <Card
          className="
            relative bg-[var(--surface-card)] border-none
            rounded-[24px]
            w-[clamp(280px,28.47vw,547px)]
            h-[clamp(250px,24.03vw,461px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.06)]
          "
        >
          {/* Farmland ID Header */}
          <span
            className="
              absolute left-[30px] top-[30px]
              text-[16px] font-medium text-[var(--text-primary)] font-[family-name:var(--font-sans)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute left-[30px] top-[60px]
              text-[35px] font-medium text-[var(--text-primary)] leading-[44px]
              font-[family-name:var(--font-sans)]
            "
          >
            {farmlandId}
          </Typography>

          {/* Steps Container */}
          <div
            className="
              absolute
              w-[184px]
              h-[136px]
              left-[calc(50%-184px/2)]
              top-[calc(50%-136px/2+49px)]
            "
          >
            <div className="absolute w-[184px] h-[136px] left-0 top-0">
              {/* Line 495 */}
              <div
                className="
                  absolute left-0 top-[8px] w-[2px] h-[92px]
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
                  absolute left-[11px] top-0 w-[173px] h-[68px]
                  pl-[24px] pb-[32px] flex flex-col gap-[4px] cursor-pointer
                "
              >
                <div
                  className={`
                    absolute left-[-17px] top-[2px] w-[12.44px] h-[12.44px] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${activeStep === "customer"
                      ? "bg-[var(--brand-400)] border-2 border-[var(--text-primary)] shadow-[0_0_0_4.14px_#ffffff,0_0_0_6.22px_rgba(37,99,235,0.1)]"
                      : "bg-[var(--surface-card)] border-[2.07px] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                <span
                  className={`
                    w-[149px] h-[36px] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[14px] leading-[18px] uppercase tracking-normal
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
                  absolute left-[11px] top-[68px] w-[173px] h-[68px]
                  pl-[24px] pb-[32px] flex flex-col gap-[4px] cursor-pointer
                "
              >
                <div
                  className={`
                    absolute left-[-17px] top-[2px] w-[12.44px] h-[12.44px] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${activeStep === "local"
                      ? "bg-[var(--brand-400)] border-2 border-[var(--text-primary)] shadow-[0_0_0_4.14px_#ffffff,0_0_0_6.22px_rgba(37,99,235,0.1)]"
                      : "bg-[var(--surface-card)] border-[2.07px] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                <span
                  className={`
                    w-[149px] h-[36px] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[14px] leading-[18px] uppercase tracking-normal
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
            rounded-[32px]
            min-h-[clamp(600px,60.69vw,1165px)]
            p-[clamp(24px,3.33vw,64px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.06)]
            flex flex-col
          "
        >
          {/* Tabs header */}
          <div className="flex flex-row items-center gap-[clamp(8px,1.11vw,16px)] mb-[clamp(24px,3.33vw,64px)]">
            {/* Tab: Owner Details */}
            <button
              onClick={() => onTabChange("owner")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(16px,2.15vw,41px)]
                py-[clamp(8px,0.8vw,15.5px)]
                h-[clamp(32px,2.86vw,55px)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[var(--chart-bg)] text-[var(--text-subtle)]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Owner Details
              </span>
              <img src={checklistIcon} alt="checklist" className="w-[18px] h-[18px] shrink-0" />
            </button>

            {/* Tab: Family Tree */}
            <button
              onClick={() => onTabChange("family")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(16px,2.7vw,52px)]
                py-[clamp(8px,0.8vw,15.5px)]
                h-[clamp(32px,2.86vw,55px)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[var(--surface-card)] border border-[var(--brand-400)] text-[var(--brand-400)]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Family Tree
              </span>
              <div className="w-[18px] h-[18px] rounded-full bg-[var(--brand-400)] border-[4px] border-[var(--surface-card)] shrink-0 shadow-sm" />
            </button>

            {/* Tab: Land Details */}
            <button
              onClick={() => onTabChange("land")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(16px,2.7vw,52px)]
                py-[clamp(8px,0.8vw,15.5px)]
                h-[clamp(32px,2.86vw,55px)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[var(--chart-bg)] text-[var(--text-subtle)]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Land Details
              </span>
              <div className="w-[18px] h-[18px] rounded-full bg-[var(--brand-400)] border-[4px] border-[var(--surface-card)] shrink-0 shadow-sm" />
            </button>
          </div>

          {/* Family Tree Diagram */}
          <div className="w-full relative flex-1 flex flex-col justify-center items-center py-4 select-none">
            {/* Family Tree Container (822x565 aspect ratio, fluid scaling) */}
            <div className="w-full aspect-[822/565] max-w-[822px] relative">
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
              <div className="absolute left-[25.24%] top-[41.95%] w-[8.68%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[11px] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Father
              </div>

              <div className="absolute left-[45.66%] top-[44.60%] w-[8.68%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[11px] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Spouse
              </div>

              <div className="absolute right-[25.24%] top-[41.95%] w-[8.68%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[11px] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Mother
              </div>

              <div className="absolute left-[44.83%] top-[76.37%] w-[10.34%] h-[4.78%] bg-[var(--brand-50)] border border-[var(--border-default)] rounded-full flex items-center justify-center shrink-0 z-10 font-[family-name:var(--font-sans)] font-bold text-[11px] leading-none tracking-[1.1px] text-[var(--text-secondary)] uppercase whitespace-nowrap">
                Daughter
              </div>

              {/* 1. Root Level: Primary Owner */}
              <div
                className="absolute w-[35%] h-[35%] left-[32.5%] top-0 flex flex-col items-center justify-center p-[4%] rounded-2xl border border-[var(--brand-400)] backdrop-blur-[10px] shadow-sm"
                style={{
                  background: "linear-gradient(134.38deg, rgba(255, 255, 255, 0.9) 0%, rgba(218, 226, 253, 0.4) 100%)",
                }}
              >
                <div className="relative w-[clamp(50px,5.5vw,80px)] h-[clamp(50px,5.5vw,80px)] rounded-full border-4 border-[var(--chart-bg)] shadow-sm overflow-visible mb-2 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
                    alt="Owner Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute bottom-[-11px] left-1/2 -translate-x-1/2 bg-[var(--brand-400)] rounded-full px-3 py-0.5 shadow-sm border border-[var(--surface-card)]">
                    <span className="font-[family-name:var(--font-sans)] font-bold text-[9px] tracking-[0.5px] text-[var(--surface-sidebar-text)]">
                      OWNER
                    </span>
                  </div>
                </div>
                <div className="text-center mt-2.5">
                  <h4 className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(12px,1.1vw,16px)] text-[var(--text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
                    {firstName} {lastName}
                  </h4>
                  <p className="font-[family-name:var(--font-sans)] font-medium text-[clamp(11px,1.0vw,14px)] text-[var(--brand-400)]">
                    {gender}, 42 yrs
                  </p>
                </div>
              </div>

              {/* 2. Father Card */}
              <div className="absolute w-[31%] h-[16%] left-0 top-[52%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(36px,4vw,56px)] h-[clamp(36px,4vw,56px)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Father Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(11px,1.1vw,16px)] text-[var(--text-primary)] truncate">
                    Vikram Mehta
                  </span>
                  <span className="text-[clamp(10px,1.0vw,14px)] text-[var(--text-secondary)]">
                    Male, 72 yrs
                  </span>
                </div>
              </div>

              {/* 3. Spouse Card */}
              <div className="absolute w-[31%] h-[16%] left-[34.5%] top-[52%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(36px,4vw,56px)] h-[clamp(36px,4vw,56px)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                    alt="Spouse Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(11px,1.1vw,16px)] text-[var(--text-primary)] truncate">
                    Priya Mehta
                  </span>
                  <span className="text-[clamp(10px,1.0vw,14px)] text-[var(--text-secondary)]">
                    Female, 40 yrs
                  </span>
                </div>
              </div>

              {/* 4. Mother Card */}
              <div className="absolute w-[31%] h-[16%] right-0 top-[52%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(36px,4vw,56px)] h-[clamp(36px,4vw,56px)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
                    alt="Mother Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(11px,1.1vw,16px)] text-[var(--text-primary)] truncate">
                    Sushila Mehta
                  </span>
                  <span className="text-[clamp(10px,1.0vw,14px)] text-[var(--text-secondary)]">
                    Female, 68 yrs
                  </span>
                </div>
              </div>

              {/* 5. Daughter Card */}
              <div className="absolute w-[31%] h-[16%] left-[34.5%] top-[84%] flex flex-row items-center gap-3 p-3 bg-white/70 border border-white/50 backdrop-blur-[10px] rounded-2xl shadow-sm">
                <div className="w-[clamp(36px,4vw,56px)] h-[clamp(36px,4vw,56px)] rounded-full border border-[var(--border-default)] overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Daughter Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0 font-[family-name:var(--font-sans)]">
                  <span className="font-bold text-[clamp(11px,1.1vw,16px)] text-[var(--text-primary)] truncate">
                    Ananya Mehta
                  </span>
                  <span className="text-[clamp(10px,1.0vw,14px)] text-[var(--text-secondary)]">
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
              w-full border-t border-[rgba(0,0,0,0.05)] pt-[clamp(16px,1.67vw,24px)]
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
                w-[clamp(90px,8.4vw,121px)]
                h-[clamp(30px,2.64vw,38px)]
                text-[clamp(11px,0.97vw,14px)]
                font-[family-name:var(--font-sans)]
              "
            >
              Back
            </button>

            <button
              onClick={onNext}
              className="
                inline-flex items-center justify-center
                rounded-full bg-[var(--brand-500)] hover:bg-[var(--brand-600)]
                font-semibold text-[var(--surface-sidebar-text)]
                transition-opacity hover:opacity-90 cursor-pointer
                w-[clamp(90px,8.4vw,121px)]
                h-[clamp(30px,2.64vw,38px)]
                text-[clamp(11px,0.97vw,14px)]
                font-[family-name:var(--font-sans)]
              "
            >
              Next
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
