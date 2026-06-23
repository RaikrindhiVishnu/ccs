import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import checklistIcon from "@/assets/checklist.svg";
import { Bell } from "lucide-react";
import { useAppSelector } from "@/core/hooks";
import { useNavigate } from "react-router-dom";

interface LandDetailsDocumentProps {
  onBack: () => void;
  onGoBackDashboard?: () => void;
  onNext: () => void;
  onTabChange: (tab: "owner" | "family" | "land") => void;
  onStepChange?: (step: "customer" | "local") => void;
  farmlandId?: string;
  isVO3?: boolean;
}

export const LandDetailsDocument: React.FC<LandDetailsDocumentProps> = ({
  onBack,
  onGoBackDashboard,
  onNext,
  onTabChange,
  onStepChange,
  farmlandId = "GLCSOS 01",
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
          grid grid-cols-1 md:grid-cols-[clamp(13.6656rem,28.47vw,34.125rem)_1fr]
          gap-[clamp(0.8016rem,1.67vw,2.0rem)]
          w-full items-start
        "
      >
        {/* Left Side: ID & Steps Card */}
        <Card
          className="
            relative bg-white border-none
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
              text-[clamp(0.5328rem,1.11vw,1.33rem)] font-medium text-black font-[family-name:var(--font-sans)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute left-[1.875rem] top-[3.75rem]
              text-[clamp(1.1664rem,2.43vw,2.916rem)] font-medium text-black leading-[2.75rem]
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
            rounded-[2rem]
            min-h-[clamp(29.1312rem,60.69vw,72.81rem)]
            p-[clamp(1.2rem,2.5vw,3.0rem)]
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
                bg-[var(--chart-bg)] text-[var(--text-subtle)]
              "
            >
              <span className="text-[clamp(0.4688rem,0.97vw,1.1625rem)] font-semibold whitespace-nowrap mr-3">
                Family Tree
              </span>
              <img src={checklistIcon} alt="checklist" className="w-[1.125rem] h-[1.125rem] shrink-0" />
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
                bg-white border border-[var(--brand-400)] text-[var(--brand-400)]
              "
            >
              <span className="text-[clamp(0.4688rem,0.97vw,1.1625rem)] font-semibold whitespace-nowrap mr-3">
                Land Details
              </span>
              <img src={checklistIcon} alt="checklist" className="w-[1.125rem] h-[1.125rem] shrink-0" />
            </button>
          </div>

          {/* Farmland Details Title */}
          <div className="w-full text-center mt-[clamp(2.0016rem,4.17vw,5.0rem)] mb-[clamp(0.384rem,0.8vw,1.0rem)]">
            <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.75rem,1.11vw,2.2rem)] leading-[clamp(0.9375rem,1.39vw,2.75rem)] tracking-[0.7px] text-[var(--text-secondary)] uppercase">
              Farmland Details
            </span>
          </div>

          {/* Main 3-Column Info Layout */}
          <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-[clamp(0.96rem,2.0vw,3.0rem)] w-full -mt-6">
              {/* Left Column (Specs 1) */}
              <div className="grid grid-cols-2 gap-4 md:flex md:flex-col lg:justify-between md:gap-[clamp(0.576rem,1.2vw,1.43rem)] md:h-[clamp(10.2rem,21.25vw,25.5rem)] min-w-[clamp(5.28rem,11.0vw,13.2rem)] w-full md:w-auto py-2 lg:items-end lg:text-right">
                {/* State */}
                <div className="flex flex-col lg:items-end">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    State
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    Andhra Pradesh
                  </span>
                </div>
                {/* District */}
                <div className="flex flex-col lg:items-end">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    District
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    West Godavari
                  </span>
                </div>
                {/* Area/City/Town */}
                <div className="flex flex-col lg:items-end">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Area/City/Town
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    Thanuku
                  </span>
                </div>
                {/* Acquisition Category */}
                <div className="flex flex-col lg:items-end">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Acquisition Category
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    Ancestral Property
                  </span>
                </div>
              </div>

              {/* Center Aerial Image Column */}
              <div className="relative w-[clamp(12rem,25.0vw,30.0rem)] aspect-[417/306] rounded-[clamp(0.96rem,2.0vw,2.4rem)] overflow-hidden shadow-[0px_0px_39px_rgba(0,0,0,0.05)] border border-white/50 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80"
                  alt="Farmland Aerial View"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column (Specs 2) */}
              <div className="grid grid-cols-2 gap-4 md:flex md:flex-col lg:justify-between md:gap-[clamp(0.576rem,1.2vw,1.43rem)] md:h-[clamp(10.2rem,21.25vw,25.5rem)] min-w-[clamp(5.28rem,11.0vw,13.2rem)] w-full md:w-auto py-2 lg:items-start lg:text-left">
                {/* Agent */}
                <div className="flex flex-col lg:items-start">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Agent
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    Agent Vinod
                  </span>
                </div>
                {/* Land Conversion */}
                <div className="flex flex-col lg:items-start">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Land Conversion
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    Acres
                  </span>
                </div>
                {/* Value for Area */}
                <div className="flex flex-col lg:items-start">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Value for Area
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    1,00,000.00
                  </span>
                </div>
                {/* Agent Referral Location */}
                <div className="flex flex-col lg:items-start">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Agent Referral Location
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(0.6562rem,1.11vw,2.2rem)] leading-tight text-[var(--brand-400)] mt-1">
                    Another Location
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Geo Reference & Satellite Map Reference */}
            <div className="flex flex-col md:flex-row items-end justify-between w-full mt-10 gap-6">
              {/* Left: Geo Reference Details */}
              <div className="flex flex-col gap-1 font-[family-name:var(--font-sans)]">
                <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(0.5625rem,0.83vw,1.8rem)] leading-[clamp(0.7031rem,1.04vw,2.25rem)] tracking-[0.55px] text-[var(--text-label-gray)] uppercase">
                  Geo Reference
                </span>
                <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(1.056rem,2.2vw,3.0rem)] leading-[clamp(1.5rem,3.125vw,4.5rem)] tracking-[-0.56px] text-[var(--text-secondary)] mt-1">
                  N 38.2975°   W 122.2869°
                </span>
                <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(0.6562rem,0.97vw,2.0rem)] leading-[clamp(0.8438rem,1.25vw,2.5rem)] text-[var(--text-muted)] mt-1">
                  GRID: 84T-QK  •  ELEV: 12m
                </span>
              </div>

              {/* Right: Map Reference Small Card */}
              <div className="w-[clamp(8.4375rem,16.67vw,25.0rem)] h-[clamp(4.2188rem,8.33vw,12.5rem)] rounded-[clamp(0.768rem,1.6vw,1.4375rem)] overflow-hidden border border-black/8 shadow-sm bg-[var(--surface-page)] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80"
                  alt="Map Reference"
                  className="w-full h-full object-cover"
                />
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
                border border-[var(--border-default)] rounded-full
                font-medium text-[var(--text-primary)]
                bg-transparent
                transition-opacity hover:opacity-75 cursor-pointer
                w-[clamp(4.032rem,8.4vw,10.0rem)]
                h-[clamp(1.2672rem,2.64vw,3.16rem)]
                text-[clamp(0.4688rem,0.97vw,1.1625rem)]
              "
            >
              {isVO3 ? "Turn Back" : "Back"}
            </button>

            <button
              onClick={onNext}
              className="
                inline-flex items-center justify-center
                rounded-full bg-[var(--brand-400)] hover:bg-[var(--brand-500)]
                font-semibold text-white
                transition-opacity hover:opacity-90 cursor-pointer
                w-[clamp(4.032rem,8.4vw,10.0rem)]
                h-[clamp(1.2672rem,2.64vw,3.16rem)]
                text-[clamp(0.4688rem,0.97vw,1.1625rem)]
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
