import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import checklistIcon from "@/assets/checklist.svg";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import { useNavigate } from "react-router-dom";

interface LandDetailsDocumentProps {
  onBack: () => void;
  onNext: () => void;
  onTabChange: (tab: "owner" | "family" | "land") => void;
  onStepChange?: (step: "customer" | "local") => void;
  farmlandId?: string;
}

export const LandDetailsDocument: React.FC<LandDetailsDocumentProps> = ({
  onBack,
  onNext,
  onTabChange,
  onStepChange,
  farmlandId = "GLCSOS 01",
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
            relative bg-white border-none
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
              text-[16px] font-medium text-black font-[family-name:var(--font-sans)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute left-[30px] top-[60px]
              text-[35px] font-medium text-black leading-[44px]
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
                      ? "bg-[#3D93D1] border-2 border-black shadow-[0_0_0_4.14px_#ffffff,0_0_0_6.22px_rgba(37,99,235,0.1)]"
                      : "bg-white border-[2.07px] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                <span
                  className={`
                    w-[149px] h-[36px] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[14px] leading-[18px] uppercase tracking-normal
                    ${activeStep === "customer" ? "text-[#138FFF]" : "text-[rgba(0,0,0,0.5)]"}
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
                      ? "bg-[#3D93D1] border-2 border-black shadow-[0_0_0_4.14px_#ffffff,0_0_0_6.22px_rgba(37,99,235,0.1)]"
                      : "bg-white border-[2.07px] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                <span
                  className={`
                    w-[149px] h-[36px] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[14px] leading-[18px] uppercase tracking-normal
                    ${activeStep === "local" ? "text-[#138FFF]" : "text-[rgba(0,0,0,0.5)]"}
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
            p-[clamp(16px,2.5vw,48px)]
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
                bg-[var(--chart-bg)] text-[var(--text-subtle)]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Family Tree
              </span>
              <img src={checklistIcon} alt="checklist" className="w-[18px] h-[18px] shrink-0" />
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
                bg-white border border-[var(--brand-400)] text-[var(--brand-400)]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Land Details
              </span>
              <img src={checklistIcon} alt="checklist" className="w-[18px] h-[18px] shrink-0" />
            </button>
          </div>

          {/* Farmland Details Title */}
          <div className="w-full text-center mt-[clamp(16px,3vw,40px)] mb-6">
            <span className="font-[family-name:var(--font-sans)] font-bold text-[16px] leading-[20px] tracking-[0.7px] text-[var(--text-secondary)] uppercase">
              Farmland Details
            </span>
          </div>

          {/* Main 3-Column Info Layout */}
          <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-[clamp(12px,2vw,48px)] w-full">
              {/* Left Column (Specs 1) */}
              <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:justify-between lg:gap-[clamp(10px,1.2vw,20px)] lg:h-[clamp(220px,21.25vw,306px)] min-w-[clamp(120px,11vw,180px)] w-full lg:w-auto py-2">
                {/* State */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    State
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    Andhra Pradesh
                  </span>
                </div>
                {/* District */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    District
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    West Godavari
                  </span>
                </div>
                {/* Area/City/Town */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Area/City/Town
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    Thanuku
                  </span>
                </div>
                {/* Acquisition Category */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Acquisition Category
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    Ancestral Property
                  </span>
                </div>
              </div>

              {/* Center Aerial Image Column */}
              <div className="relative w-[clamp(200px,25vw,417px)] aspect-[417/306] rounded-[clamp(16px,2vw,29px)] overflow-hidden shadow-[0px_0px_39px_rgba(0,0,0,0.05)] border border-white/50 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80"
                  alt="Farmland Aerial View"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column (Specs 2) */}
              <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-col lg:justify-between lg:gap-[clamp(10px,1.2vw,20px)] lg:h-[clamp(220px,21.25vw,306px)] min-w-[clamp(120px,11vw,180px)] w-full lg:w-auto py-2">
                {/* Agent */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Agent
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    Agent Vinod
                  </span>
                </div>
                {/* Land Conversion */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Land Conversion
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    Acres
                  </span>
                </div>
                {/* Value for Area */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Value for Area
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,14px)] leading-tight text-[var(--brand-400)] mt-1">
                    1,00,000.00
                  </span>
                </div>
                {/* Agent Referral Location */}
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-sans)] font-bold text-[clamp(9px,0.83vw,12px)] leading-tight text-[var(--text-label-gray)] uppercase tracking-[1.1px]">
                    Agent Referral Location
                  </span>
                  <span className="font-[family-name:var(--font-sans)] font-medium text-[clamp(13px,1.11vw,16px)] leading-tight text-[var(--brand-400)] mt-1">
                    Another Location
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Geo Reference & Satellite Map Reference */}
            <div className="flex flex-col md:flex-row items-end justify-between w-full mt-10 gap-6">
              {/* Left: Geo Reference Details */}
              <div className="flex flex-col gap-1 font-[family-name:var(--font-sans)]">
                <span className="font-[family-name:var(--font-sans)] font-bold text-[12px] leading-[15px] tracking-[0.55px] text-[var(--text-label-gray)] uppercase">
                  Geo Reference
                </span>
                <span className="font-[family-name:var(--font-sans)] font-normal text-[clamp(18px,2.2vw,24px)] leading-[30px] tracking-[-0.56px] text-[var(--text-secondary)] mt-1">
                  N 38.2975°   W 122.2869°
                </span>
                <span className="font-[family-name:var(--font-sans)] font-normal text-[14px] leading-[18px] text-[var(--text-muted)] mt-1">
                  GRID: 84T-QK  •  ELEV: 12m
                </span>
              </div>

              {/* Right: Map Reference Small Card */}
              <div className="w-[clamp(180px,16.67vw,240px)] h-[clamp(90px,8.33vw,120px)] rounded-[clamp(16px,1.6vw,23px)] overflow-hidden border border-black/8 shadow-sm bg-[var(--surface-page)] shrink-0">
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
              w-full border-t border-[rgba(0,0,0,0.05)] pt-[clamp(16px,1.67vw,24px)]
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
                w-[clamp(90px,8.4vw,121px)]
                h-[clamp(30px,2.64vw,38px)]
                text-[clamp(11px,0.97vw,14px)]
              "
            >
              Back
            </button>

            <button
              onClick={onNext}
              className="
                inline-flex items-center justify-center
                rounded-full bg-[var(--brand-400)] hover:bg-[var(--brand-500)]
                font-semibold text-white
                transition-opacity hover:opacity-90 cursor-pointer
                w-[clamp(90px,8.4vw,121px)]
                h-[clamp(30px,2.64vw,38px)]
                text-[clamp(11px,0.97vw,14px)]
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
