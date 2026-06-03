import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import checklistIcon from "@/assets/checklist.svg";
import { Bell } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/core/hooks";
import { logOut } from "@/features/auth/store/authSlice";
import { useNavigate } from "react-router-dom";

interface OwnerDetailsDocumentProps {
  onBack: () => void;
  onNext: () => void;
  onTabChange: (tab: "owner" | "family" | "land") => void;
  onStepChange?: (step: "customer" | "local") => void;
  farmlandId?: string;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  dob: string;
  setDob: (val: string) => void;
  religion: string;
  setReligion: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
}

export const OwnerDetailsDocument: React.FC<OwnerDetailsDocumentProps> = ({
  onBack,
  onNext,
  onTabChange,
  onStepChange,
  farmlandId = "GLCSOS 01",
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  dob,
  setDob,
  religion,
  setReligion,
  gender,
  setGender,
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
        bg-[#F2F2F2]
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

          {/* Steps Container (Frame 2147239921) */}
          <div
            className="
              absolute
              w-[184px]
              h-[136px]
              left-[calc(50%-184px/2)]
              top-[calc(50%-136px/2+49px)]
            "
          >
            {/* Frame 2147239964 */}
            <div className="absolute w-[184px] h-[136px] left-0 top-0">
              
              {/* Line 495 */}
              <div
                className="
                  absolute left-0 top-[8px] w-[2px] h-[92px]
                  border-l border-[rgba(0,120,250,0.25)]
                "
              />

              {/* Step 1: Customer Information Container */}
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
                {/* Checkbox Bullet */}
                <div
                  className={`
                    absolute left-[-17px] top-[2px] w-[12.44px] h-[12.44px] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${
                      activeStep === "customer"
                        ? "bg-[#3D93D1] border-2 border-black shadow-[0_0_0_4.14px_#ffffff,0_0_0_6.22px_rgba(37,99,235,0.1)]"
                        : "bg-white border-[2.07px] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                
                {/* Customer Information text */}
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

              {/* Step 2: Local Intelligence Container */}
              <div
                onClick={() => {
                  setActiveStep("local");
                  onStepChange?.("local");
                }}
                className="
                  absolute left-[11px] top-[86px] w-[173px] h-[50px]
                  pl-[24px] pb-[32px] flex flex-col gap-[4px] cursor-pointer
                "
              >
                {/* Checkbox Bullet */}
                <div
                  className={`
                    absolute left-[-17px] top-[2px] w-[12.44px] h-[12.44px] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${
                      activeStep === "local"
                        ? "bg-[#3D93D1] border-2 border-black shadow-[0_0_0_4.14px_#ffffff,0_0_0_6.22px_rgba(37,99,235,0.1)]"
                        : "bg-white border-[2.07px] border-[#85BFE5]"
                    }
                  `}
                />

                {/* Local Intelligence text */}
                <span
                  className={`
                    w-[149px] h-[18px] flex items-center font-[family-name:var(--font-sans)]
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

        {/* Right Side: Central Details Card */}
        <Card
          className="
            relative flex flex-col bg-white
            rounded-[clamp(20px,2.22vw,43px)]
            p-[clamp(24px,3.33vw,64px)]
            shadow-[0px_20px_40px_rgba(0,49,50,0.06)]
            border-none min-h-[clamp(600px,60.69vw,1165px)]
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
                bg-white border border-[#3D93D1] text-[#3D93D1]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Owner Details
              </span>
              <div className="w-[18px] h-[18px] rounded-full bg-[#3D93D1] border-[4px] border-white shrink-0 shadow-sm" />
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
                bg-[#F9F9F9] text-[#5A5C5E]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Family Tree
              </span>
              <div className="w-[18px] h-[18px] rounded-full bg-[#3D93D1] border-[4px] border-white shrink-0 shadow-sm" />
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
                bg-[#F9F9F9] text-[#5A5C5E]
              "
            >
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold whitespace-nowrap mr-3">
                Land Details
              </span>
              <div className="w-[18px] h-[18px] rounded-full bg-[#3D93D1] border-[4px] border-white shrink-0 shadow-sm" />
            </button>
          </div>

          {/* Profile Header Block */}
          <div className="flex flex-row items-center gap-[clamp(12px,1.39vw,20px)] mb-[clamp(24px,3.33vw,64px)]">
            {/* Avatar */}
            <div
              className="
                w-[clamp(64px,5.69vw,109px)]
                h-[clamp(64px,5.69vw,109px)]
                rounded-full overflow-hidden shrink-0
                border-4 border-[#F9F9FB]
                shadow-[0px_1px_2px_rgba(0,0,0,0.05)]
              "
            >
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80"
                alt="Ramudu Kumar Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name */}
            <div className="flex flex-col">
              <Typography
                as="h3"
                className="
                  text-[clamp(18px,1.67vw,32px)] font-bold text-[#1A1C1D] leading-tight
                  font-[family-name:var(--font-heading)]
                "
              >
                {firstName} {lastName}
              </Typography>
            </div>
          </div>

          {/* Form Grid */}
          <div
            className="
              grid grid-cols-1 md:grid-cols-2
              gap-x-[clamp(20px,3.33vw,64px)]
              gap-y-[clamp(16px,1.94vw,38px)]
              mb-[clamp(24px,3.33vw,64px)]
            "
          >
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                First Name
              </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4
                  text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Last Name
              </span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4
                  text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Phone Number
              </span>
              <div
                className="
                  flex items-center w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4 gap-[clamp(8px,0.8vw,12px)]
                  focus-within:ring-1 focus-within:ring-[#3D93D1]
                "
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D4949" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="
                    w-full bg-transparent border-none outline-none
                    text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                    font-[family-name:var(--font-sans)]
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Email
              </span>
              <div
                className="
                  flex items-center w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4 gap-[clamp(8px,0.8vw,12px)]
                  focus-within:ring-1 focus-within:ring-[#3D93D1]
                "
              >
                <svg width="15" height="12" viewBox="0 0 24 24" fill="none" stroke="#3D4949" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full bg-transparent border-none outline-none
                    text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                    font-[family-name:var(--font-sans)]
                  "
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Date of Birth
              </span>
              <div
                className="
                  flex items-center w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4 gap-[clamp(8px,0.8vw,12px)]
                  focus-within:ring-1 focus-within:ring-[#3D93D1]
                "
              >
                <svg width="14" height="15" viewBox="0 0 24 24" fill="none" stroke="#3D4949" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <input
                  type="text"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="
                    w-full bg-transparent border-none outline-none
                    text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                    font-[family-name:var(--font-sans)]
                  "
                />
              </div>
            </div>

            {/* Religion */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Religion
              </span>
              <input
                type="text"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4
                  text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(11px,0.97vw,19px)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Gender
              </span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(16px,1.67vw,32px)]
                  h-[clamp(42px,3.47vw,67px)] px-4
                  text-[clamp(12px,1.11vw,21px)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>
          </div>

          {/* Location Area */}
          <div className="flex flex-row items-center gap-4 mb-[clamp(32px,4.17vw,80px)]">
            <span className="text-[clamp(12px,1.11vw,21px)] font-semibold text-black">
              Google Location of Land
            </span>
            <a
              href="https://maps.google.com/?q=17.4835850,78.3805050"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(12px,1.11vw,21px)] font-medium text-[#1D7ABE] underline hover:opacity-85 transition-opacity"
            >
              17.4835850, 78.3805050
            </a>
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
                border border-[rgba(0,0,0,0.27)] rounded-full
                font-medium text-[rgba(0,0,0,0.8)]
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
                rounded-full bg-[#2780C4] hover:bg-[#1f6da9]
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
