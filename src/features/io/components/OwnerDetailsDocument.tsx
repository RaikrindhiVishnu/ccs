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
        bg-[var(--surface-page)]
        px-[clamp(1rem,2.78vw,3.375rem)]
        py-[clamp(1.5rem,2.5vw,3rem)]
        flex flex-col gap-[clamp(1.25rem,2.22vw,2.6875rem)]
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

      {/* Main Grid Layout */}
      <div
        className="
          grid grid-cols-1 lg:grid-cols-[clamp(17.5rem,28.47vw,34.1875rem)_1fr]
          gap-[clamp(1rem,1.67vw,2rem)]
          w-full items-start
        "
      >
        {/* Left Side: ID & Steps Card */}
        <Card
          className="
            relative bg-white border-none
            rounded-[1.5rem]
            w-[clamp(17.5rem,28.47vw,34.1875rem)]
            h-[clamp(15.625rem,24.03vw,28.8125rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
          "
        >
          {/* Farmland ID Header */}
          <span
            className="
              absolute left-[1.875rem] top-[1.875rem]
              text-[1rem] font-medium text-black font-[family-name:var(--font-sans)]
            "
          >
            Farmland ID:
          </span>
          <Typography
            as="h2"
            className="
              absolute left-[1.875rem] top-[3.75rem]
              text-[2.1875rem] font-medium text-black leading-[2.75rem]
              font-[family-name:var(--font-sans)]
            "
          >
            {farmlandId}
          </Typography>

          {/* Steps Container (Frame 2147239921) */}
          <div
            className="
              absolute
              w-[11.5rem]
              h-[8.5rem]
              left-[calc(50%-11.5rem/2)]
              top-[calc(50%-8.5rem/2+3.0625rem)]
            "
          >
            {/* Frame 2147239964 */}
            <div className="absolute w-[11.5rem] h-[8.5rem] left-0 top-0">
              
              {/* Line 495 */}
              <div
                className="
                  absolute left-0 top-[0.5rem] w-[0.125rem] h-[5.75rem]
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
                  absolute left-[0.6875rem] top-0 w-[10.8125rem] h-[4.25rem]
                  pl-[1.5rem] pb-[2rem] flex flex-col gap-[0.25rem] cursor-pointer
                "
              >
                {/* Checkbox Bullet */}
                <div
                  className={`
                    absolute left-[-1.0625rem] top-[0.125rem] w-[0.7775rem] h-[0.7775rem] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${
                      activeStep === "customer"
                        ? "bg-[#3D93D1] border-2 border-black shadow-[0_0_0_0.25875rem_#ffffff,0_0_0_0.38875rem_rgba(37,99,235,0.1)]"
                        : "bg-white border-[0.129375rem] border-[rgba(122,149,28,0.43)]"
                    }
                  `}
                />
                
                {/* Customer Information text */}
                <span
                  className={`
                    w-[9.3125rem] h-[2.25rem] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[0.875rem] leading-[1.125rem] uppercase tracking-normal
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
                  absolute left-[0.6875rem] top-[5.375rem] w-[10.8125rem] h-[3.125rem]
                  pl-[1.5rem] pb-[2rem] flex flex-col gap-[0.25rem] cursor-pointer
                "
              >
                {/* Checkbox Bullet */}
                <div
                  className={`
                    absolute left-[-1.0625rem] top-[0.125rem] w-[0.7775rem] h-[0.7775rem] rounded-full
                    box-sizing-border-box transition-all duration-200
                    ${
                      activeStep === "local"
                        ? "bg-[#3D93D1] border-2 border-black shadow-[0_0_0_0.25875rem_#ffffff,0_0_0_0.38875rem_rgba(37,99,235,0.1)]"
                        : "bg-white border-[0.129375rem] border-[#85BFE5]"
                    }
                  `}
                />

                {/* Local Intelligence text */}
                <span
                  className={`
                    w-[9.3125rem] h-[1.125rem] flex items-center font-[family-name:var(--font-sans)]
                    font-semibold text-[0.875rem] leading-[1.125rem] uppercase tracking-normal
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
            rounded-[clamp(1.25rem,2.22vw,2.6875rem)]
            p-[clamp(1.5rem,3.33vw,4rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
            border-none min-h-[clamp(37.5rem,60.69vw,72.8125rem)]
          "
        >
          {/* Tabs header */}
          <div className="flex flex-row items-center gap-[clamp(0.5rem,1.11vw,1rem)] mb-[clamp(1.5rem,3.33vw,4rem)]">
            {/* Tab: Owner Details */}
            <button
              onClick={() => onTabChange("owner")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(1rem,2.15vw,2.5625rem)]
                py-[clamp(0.5rem,0.8vw,0.96875rem)]
                h-[clamp(2rem,2.86vw,3.4375rem)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-white border border-[#3D93D1] text-[#3D93D1]
              "
            >
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold whitespace-nowrap mr-3">
                Owner Details
              </span>
              <div className="w-[1.125rem] h-[1.125rem] rounded-full bg-[#3D93D1] border-[4px] border-white shrink-0 shadow-sm" />
            </button>

            {/* Tab: Family Tree */}
            <button
              onClick={() => onTabChange("family")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(1rem,2.7vw,3.25rem)]
                py-[clamp(0.5rem,0.8vw,0.96875rem)]
                h-[clamp(2rem,2.86vw,3.4375rem)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[#F9F9F9] text-[#5A5C5E]
              "
            >
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold whitespace-nowrap mr-3">
                Family Tree
              </span>
              <div className="w-[1.125rem] h-[1.125rem] rounded-full bg-[#3D93D1] border-[4px] border-white shrink-0 shadow-sm" />
            </button>

            {/* Tab: Land Details */}
            <button
              onClick={() => onTabChange("land")}
              className="
                flex flex-row items-center justify-between
                px-[clamp(1rem,2.7vw,3.25rem)]
                py-[clamp(0.5rem,0.8vw,0.96875rem)]
                h-[clamp(2rem,2.86vw,3.4375rem)]
                rounded-full transition-all duration-200 cursor-pointer
                bg-[#F9F9F9] text-[#5A5C5E]
              "
            >
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold whitespace-nowrap mr-3">
                Land Details
              </span>
              <div className="w-[1.125rem] h-[1.125rem] rounded-full bg-[#3D93D1] border-[4px] border-white shrink-0 shadow-sm" />
            </button>
          </div>

          {/* Profile Header Block */}
          <div className="flex flex-row items-center gap-[clamp(0.75rem,1.39vw,1.25rem)] mb-[clamp(1.5rem,3.33vw,4rem)]">
            {/* Avatar */}
            <div
              className="
                w-[clamp(4rem,5.69vw,6.8125rem)]
                h-[clamp(4rem,5.69vw,6.8125rem)]
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
                  text-[clamp(1.125rem,1.67vw,2rem)] font-bold text-[#1A1C1D] leading-tight
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
              gap-x-[clamp(1.25rem,3.33vw,4rem)]
              gap-y-[clamp(1rem,1.94vw,2.375rem)]
              mb-[clamp(1.5rem,3.33vw,4rem)]
            "
          >
            {/* First Name */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                First Name
              </span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4
                  text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Last Name
              </span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4
                  text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Phone Number
              </span>
              <div
                className="
                  flex items-center w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4 gap-[clamp(0.5rem,0.8vw,0.75rem)]
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
                    text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                    font-[family-name:var(--font-sans)]
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Email
              </span>
              <div
                className="
                  flex items-center w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4 gap-[clamp(0.5rem,0.8vw,0.75rem)]
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
                    text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                    font-[family-name:var(--font-sans)]
                  "
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Date of Birth
              </span>
              <div
                className="
                  flex items-center w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4 gap-[clamp(0.5rem,0.8vw,0.75rem)]
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
                    text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                    font-[family-name:var(--font-sans)]
                  "
                />
              </div>
            </div>

            {/* Religion */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Religion
              </span>
              <input
                type="text"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4
                  text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <span className="text-[clamp(0.6875rem,0.97vw,1.1875rem)] font-semibold text-[#3D4949] tracking-[0.35px]">
                Gender
              </span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="
                  w-full bg-[#F3F3F5] rounded-[clamp(1rem,1.67vw,2rem)]
                  h-[clamp(2.625rem,3.47vw,4.1875rem)] px-4
                  text-[clamp(0.75rem,1.11vw,1.3125rem)] text-[#1A1C1D]
                  border-none outline-none focus:ring-1 focus:ring-[#3D93D1]
                  font-[family-name:var(--font-sans)]
                "
              />
            </div>
          </div>

          {/* Location Area */}
          <div className="flex flex-row items-center gap-4 mb-[clamp(2rem,4.17vw,5rem)]">
            <span className="text-[clamp(0.75rem,1.11vw,1.3125rem)] font-semibold text-black">
              Google Location of Land
            </span>
            <a
              href="https://maps.google.com/?q=17.4835850,78.3805050"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(0.75rem,1.11vw,1.3125rem)] font-medium text-[#1D7ABE] underline hover:opacity-85 transition-opacity"
            >
              17.4835850, 78.3805050
            </a>
          </div>

          {/* Footer Actions */}
          <div
            className="
              flex flex-row justify-end items-center gap-3 mt-auto
              w-full border-t border-[rgba(0,0,0,0.05)] pt-[clamp(1rem,1.67vw,1.5rem)]
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
                w-[clamp(5.625rem,8.4vw,7.5625rem)]
                h-[clamp(1.875rem,2.64vw,2.375rem)]
                text-[clamp(0.6875rem,0.97vw,0.875rem)]
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
                w-[clamp(5.625rem,8.4vw,7.5625rem)]
                h-[clamp(1.875rem,2.64vw,2.375rem)]
                text-[clamp(0.6875rem,0.97vw,0.875rem)]
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
