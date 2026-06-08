import * as React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Bell, Mic } from "lucide-react";
import successIcon from "@/assets/sucess.svg";
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
    question: "Any Local Liabilities?",
    options: ["Available", "Not Available"]
  },
  {
    id: "loans",
    label: "Any Pending Loans",
    question: "Any Bank Loans or Pending Loans on the Land",
    options: ["Available", "Not Available"]
  },
  {
    id: "mindset",
    label: "Owner Mindset",
    question: "Owner Mindset",
    options: ["Fair", "Cooperative", "Neutral", "Reluctant", "Hostile"]
  },
  {
    id: "source",
    label: "Source Person",
    question: "Source Person",
    options: ["Government Person", "Neighbor", "Relative", "Other"]
  },
  {
    id: "agreements",
    label: "Agreements",
    question: "Any Paper Agreements On This Land",
    options: ["Available", "Not Available"]
  },
  {
    id: "transactions",
    label: "Previous Transactions",
    question: "Any Previous Transactions on the Land",
    options: ["Available", "Not Available"]
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
    issues: "",
    liabilities: "",
    loans: "",
    mindset: "",
    source: "",
    agreements: "",
    transactions: ""
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

  const [loanAmount, setLoanAmount] = React.useState("1,00,000.00");
  const [sourcePersonType, setSourcePersonType] = React.useState("");
  const [sourcePersonName, setSourcePersonName] = React.useState("Krishna");
  const [sourcePersonMobile, setSourcePersonMobile] = React.useState("+91-8857463923");
  const [agreementType, setAgreementType] = React.useState("Verbal");
  const [agreementLastPrice, setAgreementLastPrice] = React.useState("1,00,000.00");
  const [transactionLastPrice, setTransactionLastPrice] = React.useState("1,00,000.00");
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  React.useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handleNextClick = () => {
    const currentIndex = subTabs.findIndex((tab) => tab.id === activeSubTab);
    const currentTab = subTabs[currentIndex] || subTabs[0];
    
    const isSourceTab = activeSubTab === "source";
    const currentValue = isSourceTab ? sourcePersonType : selections[activeSubTab];

    if (!currentValue) {
      setToastMessage(`Please make a selection for ${currentTab.label}`);
      return;
    }

    if (currentIndex < subTabs.length - 1) {
      const nextTab = subTabs[currentIndex + 1];
      setToastMessage(`${currentTab.label} "Files" has been saved`);
      setActiveSubTab(nextTab.id);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleBackClick = () => {
    const currentIndex = subTabs.findIndex((tab) => tab.id === activeSubTab);
    if (currentIndex > 0) {
      setActiveSubTab(subTabs[currentIndex - 1].id);
    } else {
      onBack();
    }
  };

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
        bg-[var(--chart-bg)]
        px-[clamp(1.775rem,2.78vw,3.3rem)]
        py-[clamp(1.6rem,2.5vw,3rem)]
        flex flex-col gap-[clamp(1.42rem,2.22vw,2.66rem)]
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
            w-[clamp(15.5rem,16.67vw,20rem)]
            h-[clamp(2.31rem,3.61vw,4.3rem)]
            text-[clamp(0.71rem,1.11vw,1.33rem)]
            py-[clamp(0.84rem,1.32vw,1.58rem)]
            px-[clamp(0.8875rem,1.39vw,1.66rem)]
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
                  text-[clamp(0.71rem,1.11vw,1.33rem)]
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
        <div className="flex flex-col lg:flex-row gap-[clamp(1rem,1.11vw,1.625rem)] w-full items-stretch">
          
          {/* Left Side: ID & Steps Card */}
          <Card
            className="
              relative bg-white border-none
              rounded-[1.5rem]
              w-full lg:w-[clamp(25.625rem,28.47vw,45rem)]
              h-[clamp(27.6875rem,30.76vw,50rem)]
              shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
              shrink-0
            "
          >
            {/* Farmland ID Header */}
            <span
              className="
                absolute text-black font-medium
                left-[clamp(1.25rem,2.08vw,3rem)] top-[clamp(1.25rem,2.08vw,3rem)]
                w-[clamp(4.5rem,6.67vw,10rem)] h-[clamp(0.95rem,1.39vw,2rem)]
                font-[family-name:var(--font-sans)] text-[clamp(0.75rem,1.11vw,1.5rem)] leading-[clamp(0.95rem,1.39vw,2rem)]
              "
            >
              Farmland ID:
            </span>
            <Typography
              as="h2"
              className="
                absolute text-black font-medium whitespace-nowrap
                left-[clamp(1.25rem,2.08vw,3rem)] top-[clamp(2.5rem,4.17vw,6rem)]
                w-[clamp(12rem,24.3vw,30rem)] h-[clamp(2rem,3.06vw,5rem)]
                font-[family-name:var(--font-sans)] text-[clamp(1.5rem,2.43vw,3.5rem)] leading-[clamp(2rem,3.06vw,5rem)]
              "
            >
              {farmlandId}
            </Typography>

            {/* Steps Container (Frame 2147239921) */}
            <div
              className="
                absolute
                w-[clamp(11.5rem,12.78vw,18.4rem)]
                h-[clamp(8.5rem,9.44vw,13.6rem)]
                left-[calc(50%-clamp(5.75rem,6.39vw,9.2rem))]
                top-[calc(50%-clamp(4.25rem,4.72vw,6.8rem)+0.5px)]
              "
            >
              {/* Frame 2147239964 */}
              <div className="absolute w-full h-full left-0 top-0">
                
                {/* Line 495 */}
                <div
                  className="
                    absolute left-[clamp(1.125rem,1.25vw,1.8rem)] top-[clamp(0.5rem,0.56vw,0.8rem)] w-[1px] h-[clamp(5.75rem,6.39vw,9.2rem)]
                    border-l border-[rgba(0,120,250,0.25)]
                  "
                />

                {/* Step 1: Customer Information Container */}
                <div
                  onClick={() => onStepChange?.("customer")}
                  className="
                    absolute left-[clamp(0.6875rem,0.76vw,1.1rem)] top-0 w-[clamp(10.8125rem,12.01vw,17.3rem)] h-[clamp(4.25rem,4.72vw,6.8rem)]
                    pl-[clamp(1.5rem,1.67vw,2.4rem)] pb-[clamp(2rem,2.22vw,3.2rem)] flex flex-col gap-[clamp(0.25rem,0.28vw,0.4rem)] cursor-pointer
                  "
                >
                  {/* Checkbox Bullet */}
                  <div
                    className="
                      absolute left-[clamp(0.4375rem,0.49vw,0.7rem)] top-[clamp(0.125rem,0.14vw,0.2rem)] w-[clamp(0.7775rem,0.86vw,1.244rem)] h-[clamp(0.7775rem,0.86vw,1.244rem)] rounded-full
                      box-sizing-border-box transition-all duration-200
                      bg-[#3D93D1] shadow-[0_0_0_clamp(0.26rem,0.29vw,0.415rem)_#FFFFFF,0_0_0_clamp(0.39rem,0.43vw,0.622rem)_rgba(37,99,235,0.1)]
                    "
                  />
                  
                  {/* Customer Information text */}
                  <span
                    className="
                      w-[clamp(9.3125rem,10.35vw,14.9rem)] h-[clamp(2.25rem,2.5vw,3.6rem)] flex items-center font-[family-name:var(--font-sans)]
                      font-semibold text-[clamp(0.875rem,0.97vw,1.4rem)] leading-[clamp(1.125rem,1.25vw,1.8rem)] uppercase tracking-normal
                      text-[#5A5C5E]
                    "
                  >
                    Customer Information
                  </span>

                  {/* Subtext Date */}
                  <span
                    className="
                      w-[clamp(9.3125rem,10.35vw,14.9rem)] h-[clamp(0.875rem,0.97vw,1.4rem)] flex items-center font-[family-name:var(--font-outfit)]
                      font-normal text-[clamp(0.6875rem,0.76vw,1.1rem)] leading-[clamp(0.875rem,0.97vw,1.4rem)]
                      text-[#9AA3AD]
                    "
                  >
                    Oct 24 • 09:00 AM
                  </span>
                </div>

                {/* Step 2: Local Intelligence Container */}
                <div
                  onClick={() => onStepChange?.("local")}
                  className="
                    absolute left-[clamp(0.6875rem,0.76vw,1.1rem)] top-[clamp(5.375rem,5.97vw,8.6rem)] w-[clamp(10.8125rem,12.01vw,17.3rem)] h-[clamp(3.125rem,3.47vw,5rem)]
                    pl-[clamp(1.5rem,1.67vw,2.4rem)] pb-[clamp(2rem,2.22vw,3.2rem)] flex flex-col gap-[clamp(0.25rem,0.28vw,0.4rem)] cursor-pointer
                  "
                >
                  {/* Checkbox Bullet */}
                  <div
                    className="
                      absolute left-[clamp(0.4375rem,0.49vw,0.7rem)] top-[clamp(0.125rem,0.18vw,0.25rem)] w-[clamp(0.7775rem,0.86vw,1.244rem)] h-[clamp(0.7775rem,0.86vw,1.244rem)] rounded-full
                      box-sizing-border-box transition-all duration-200
                      bg-[#3D93D1] border-2 border-black
                      shadow-[0_0_0_clamp(0.26rem,0.29vw,0.415rem)_#FFFFFF,0_0_0_clamp(0.39rem,0.43vw,0.622rem)_rgba(37,99,235,0.1)]
                    "
                  />

                  {/* Local Intelligence text */}
                  <span
                    className="
                      w-[clamp(9.3125rem,10.35vw,14.9rem)] h-[clamp(1.125rem,1.25vw,1.8rem)] flex items-center font-[family-name:var(--font-sans)]
                      font-semibold text-[clamp(0.875rem,0.97vw,1.4rem)] leading-[clamp(1.125rem,1.25vw,1.8rem)] uppercase tracking-normal
                      text-[#138FFF]
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
              p-[clamp(1.25rem,2.08vw,3rem)]
              shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
              flex-grow w-full
              h-[clamp(27.6875rem,30.76vw,50rem)]
              overflow-y-auto custom-scrollbar
            "
          >
            {/* Pills Container */}
            <div className="flex flex-col gap-[clamp(1rem,2.08vw,3.5rem)] w-full">
              {/* Row 1: Issues, Liabilities, Loans */}
              <div className="flex flex-row flex-wrap items-center gap-[clamp(0.6rem,1.11vw,1.8rem)]">
                {subTabs.slice(0, 3).map((tab) => {
                  const isActive = activeSubTab === tab.id;
                  const isSelected = !!selections[tab.id];

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`
                        box-sizing-border-box
                        flex flex-row items-center justify-between
                        px-[clamp(0.8rem,1.53vw,2rem)]
                        py-[clamp(0.4rem,0.8vw,1.2rem)]
                        h-[clamp(2rem,2.86vw,4.5rem)]
                        rounded-[5rem]
                        transition-all duration-200 cursor-pointer
                        shadow-[0_42px_17px_rgba(0,0,0,0.01)]
                        ${
                          isActive
                             ? "bg-[#F9F9F9] border-[0.725581px] border-[#2780C4] text-[rgba(90,92,94,0.74)]"
                             : isSelected
                             ? "bg-[#F9F9F9] border-[0.725581px] border-[#A5B767] text-[rgba(90,92,94,0.74)]"
                             : "bg-[#F9F9F9] border border-transparent hover:border-[#2780C4] text-[rgba(90,92,94,0.74)]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-[clamp(0.6rem,1.39vw,2rem)]">
                        {/* If active, render dot on the left of text */}
                        {isActive && (
                          <div
                            className="
                              w-[clamp(0.875rem,1.25vw,2.2rem)] h-[clamp(0.875rem,1.25vw,2.2rem)]
                              rounded-full bg-[#3D93D1]
                              border-[4px] border-white shrink-0 shadow-sm
                            "
                          />
                        )}

                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(0.75rem,0.97vw,1.6rem)] leading-[clamp(0.95rem,1.25vw,2rem)] text-center">
                          {tab.label}
                        </span>

                        {/* If completed or uncompleted (not active), render checklist badge on the right of text */}
                        {!isActive && (
                          <svg
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0 w-[clamp(0.875rem,1.25vw,2.2rem)] h-[clamp(0.875rem,1.25vw,2.2rem)]"
                          >
                            <path
                              d="M17.875 8.82812C17.875 9.54813 16.9905 10.1416 16.8133 10.8053C16.6305 11.4916 17.0931 12.4478 16.7458 13.0483C16.3928 13.6586 15.3311 13.7317 14.8361 14.2267C14.3411 14.7217 14.268 15.7834 13.6577 16.1364C13.0572 16.4837 12.1009 16.0211 11.4147 16.2039C10.7509 16.3811 10.1575 17.2656 9.4375 17.2656C8.7175 17.2656 8.12406 16.3811 7.46031 16.2039C6.77406 16.0211 5.81781 16.4837 5.21734 16.1364C4.60703 15.7834 4.53391 14.7217 4.03891 14.2267C3.54391 13.7317 2.48219 13.6586 2.12922 13.0483C1.78187 12.4478 2.24453 11.4916 2.06172 10.8053C1.88453 10.1416 1 9.54813 1 8.82812C1 8.10813 1.88453 7.51469 2.06172 6.85094C2.24453 6.16469 1.78187 5.20844 2.12922 4.60797C2.48219 3.99766 3.54391 3.92453 4.03891 3.42953C4.53391 2.93453 4.60703 1.87281 5.21734 1.51984C5.81781 1.1725 6.77406 1.63516 7.46031 1.45234C8.12406 1.27516 8.7175 0.390625 9.4375 0.390625C10.1575 0.390625 10.7509 1.27516 11.4147 1.45234C12.1009 1.63516 13.0572 1.1725 13.6577 1.51984C14.268 1.87281 14.3411 2.93453 14.8361 3.42953C15.3311 3.92453 16.3928 3.99766 16.7458 4.60797C17.0931 5.20844 16.6305 6.16469 16.8133 6.85094C16.9905 7.51469 17.875 8.10813 17.875 8.82812Z"
                              fill={isSelected ? "#2780C4" : "rgba(39, 128, 196, 0.66)"}
                            />
                            <path
                              d="M11.4376 6.4898L8.22574 9.70168L6.56074 8.03809C6.19934 7.67668 5.61293 7.67668 5.25152 8.03809C4.89012 8.39949 4.89012 8.9859 5.25152 9.34731L7.5873 11.6831C7.93887 12.0346 8.5098 12.0346 8.86137 11.6831L12.7454 7.79902C13.1068 7.43762 13.1068 6.85121 12.7454 6.4898C12.384 6.1284 11.799 6.1284 11.4376 6.4898Z"
                              fill="#FFFCEE"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Row 2: Mindset, Source, Agreements, Transactions */}
              <div className="flex flex-row flex-wrap items-center gap-[clamp(0.6rem,1.11vw,1.8rem)]">
                {subTabs.slice(3).map((tab) => {
                  const isActive = activeSubTab === tab.id;
                  const isSelected = !!selections[tab.id];

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id)}
                      className={`
                        box-sizing-border-box
                        flex flex-row items-center justify-between
                        px-[clamp(0.8rem,1.53vw,2rem)]
                        py-[clamp(0.4rem,0.8vw,1.2rem)]
                        h-[clamp(2rem,2.86vw,4.5rem)]
                        rounded-[5rem]
                        transition-all duration-200 cursor-pointer
                        shadow-[0_42px_17px_rgba(0,0,0,0.01)]
                        ${
                          isActive
                             ? "bg-[#F9F9F9] border-[0.725581px] border-[#2780C4] text-[rgba(90,92,94,0.74)]"
                             : isSelected
                             ? "bg-[#F9F9F9] border-[0.725581px] border-[#A5B767] text-[rgba(90,92,94,0.74)]"
                             : "bg-[#F9F9F9] border border-transparent hover:border-[#2780C4] text-[rgba(90,92,94,0.74)]"
                        }
                      `}
                    >
                      <div className="flex items-center gap-[clamp(0.6rem,1.39vw,2rem)]">
                        {/* If active, render dot on the left of text */}
                        {isActive && (
                          <div
                            className="
                              w-[clamp(0.875rem,1.25vw,2.2rem)] h-[clamp(0.875rem,1.25vw,2.2rem)]
                              rounded-full bg-[#3D93D1]
                              border-[4px] border-white shrink-0 shadow-sm
                            "
                          />
                        )}

                        <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(0.75rem,0.97vw,1.6rem)] leading-[clamp(0.95rem,1.25vw,2rem)] text-center">
                          {tab.label}
                        </span>

                        {/* If completed or uncompleted (not active), render checklist badge on the right of text */}
                        {!isActive && (
                          <svg
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="shrink-0 w-[clamp(0.875rem,1.25vw,2.2rem)] h-[clamp(0.875rem,1.25vw,2.2rem)]"
                          >
                            <path
                              d="M17.875 8.82812C17.875 9.54813 16.9905 10.1416 16.8133 10.8053C16.6305 11.4916 17.0931 12.4478 16.7458 13.0483C16.3928 13.6586 15.3311 13.7317 14.8361 14.2267C14.3411 14.7217 14.268 15.7834 13.6577 16.1364C13.0572 16.4837 12.1009 16.0211 11.4147 16.2039C10.7509 16.3811 10.1575 17.2656 9.4375 17.2656C8.7175 17.2656 8.12406 16.3811 7.46031 16.2039C6.77406 16.0211 5.81781 16.4837 5.21734 16.1364C4.60703 15.7834 4.53391 14.7217 4.03891 14.2267C3.54391 13.7317 2.48219 13.6586 2.12922 13.0483C1.78187 12.4478 2.24453 11.4916 2.06172 10.8053C1.88453 10.1416 1 9.54813 1 8.82812C1 8.10813 1.88453 7.51469 2.06172 6.85094C2.24453 6.16469 1.78187 5.20844 2.12922 4.60797C2.48219 3.99766 3.54391 3.92453 4.03891 3.42953C4.53391 2.93453 4.60703 1.87281 5.21734 1.51984C5.81781 1.1725 6.77406 1.63516 7.46031 1.45234C8.12406 1.27516 8.7175 0.390625 9.4375 0.390625C10.1575 0.390625 10.7509 1.27516 11.4147 1.45234C12.1009 1.63516 13.0572 1.1725 13.6577 1.51984C14.268 1.87281 14.3411 2.93453 14.8361 3.42953C15.3311 3.92453 16.3928 3.99766 16.7458 4.60797C17.0931 5.20844 16.6305 6.16469 16.8133 6.85094C16.9905 7.51469 17.875 8.10813 17.875 8.82812Z"
                              fill={isSelected ? "#2780C4" : "rgba(39, 128, 196, 0.66)"}
                            />
                            <path
                              d="M11.4376 6.4898L8.22574 9.70168L6.56074 8.03809C6.19934 7.67668 5.61293 7.67668 5.25152 8.03809C4.89012 8.39949 4.89012 8.9859 5.25152 9.34731L7.5873 11.6831C7.93887 12.0346 8.5098 12.0346 8.86137 11.6831L12.7454 7.79902C13.1068 7.43762 13.1068 6.85121 12.7454 6.4898C12.384 6.1284 11.799 6.1284 11.4376 6.4898Z"
                              fill="#FFFCEE"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

        </div>

        {/* Row 2: Bottom Card: Details Form Area */}
        <Card
          className="
            relative bg-white border-none rounded-[1.5rem]
            p-[clamp(1.25rem,2.08vw,3rem)]
            shadow-[0_1.25rem_2.5rem_rgba(0,49,50,0.06)]
            w-full
            min-h-[clamp(27.6875rem,30.76vw,45rem)]
            h-auto
            pb-[6.25rem]
          "
        >
          {/* Split Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.035fr_1fr] gap-[clamp(1.5rem,3.2vw,4rem)] w-full items-start">
                       {/* Left Column: Radio Buttons / Question / Dropdowns */}
            <div className="flex flex-col gap-[clamp(1rem,1.67vw,2.5rem)] w-full">
                            {/* If it's mindset, render dropdown selector */}
              {activeSubTab === "mindset" ? (
                <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)] w-full max-w-[640px] animate-in fade-in duration-200">
                  <span className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-black">
                    Owner Mindset
                  </span>
                  <div className="relative w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6 pr-12">
                    <select
                      value={selections.mindset}
                      onChange={(e) =>
                        setSelections((prev) => ({ ...prev, mindset: e.target.value }))
                      }
                      className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      {currentTab.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              ) : activeSubTab === "source" ? (
                <div className="flex flex-col gap-6 w-full max-w-[640px] animate-in fade-in duration-200">
                  <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)]">
                    <span className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-black">
                      Source Person
                    </span>
                    <div className="relative w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6 pr-12">
                      <select
                        value={sourcePersonType}
                        onChange={(e) => setSourcePersonType(e.target.value)}
                        className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black appearance-none cursor-pointer"
                      >
                        <option value="">Select</option>
                        {currentTab.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="#363434" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)]">
                    <span className="font-sans font-semibold text-[clamp(1.1rem,1.53vw,1.65rem)] leading-[clamp(1.4rem,1.94vw,2.1rem)] text-black">
                      Person Contact Details
                    </span>
                    
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="font-sans font-semibold text-[clamp(0.9rem,1.25vw,1.35rem)] leading-[clamp(1.15rem,1.6vw,1.725rem)] text-black">
                        Name
                      </label>
                      <div className="w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6">
                        <input
                          type="text"
                          value={sourcePersonName}
                          onChange={(e) => setSourcePersonName(e.target.value)}
                          className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-2">
                      <label className="font-sans font-semibold text-[clamp(0.9rem,1.25vw,1.35rem)] leading-[clamp(1.15rem,1.6vw,1.725rem)] text-black">
                        Mobile
                      </label>
                      <div className="w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6">
                        <input
                          type="text"
                          value={sourcePersonMobile}
                          onChange={(e) => setSourcePersonMobile(e.target.value)}
                          className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <span className="font-[family-name:var(--font-sans)] font-semibold text-[clamp(1.125rem,1.39vw,1.8rem)] leading-[clamp(1.4rem,1.74vw,2.25rem)] text-black">
                    {currentTab.question}
                  </span>

                   {/* Options wrapper */}
                  <div className="flex items-center gap-[clamp(1rem,1.875vw,2.5rem)]">
                    {currentTab.options.map((option) => {
                      const isOptionSelected = selections[currentTab.id] === option;
                      const btnWidth = option === "Available" ? "w-[7.5rem]" : option === "Not Available" ? "w-[9.1875rem]" : "min-w-[7.5rem]";
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setSelections((prev) => ({ ...prev, [currentTab.id]: option }))
                          }
                          className={`
                            box-sizing-border-box
                            flex flex-row items-center justify-center
                            ${btnWidth} h-[2.375rem]
                            px-[1.125rem] py-[0.625rem] gap-[0.625rem]
                            border rounded-[2.0625rem]
                            transition-all duration-200 cursor-pointer
                            ${
                              isOptionSelected
                                ? "bg-[#2B2D2F] border-[#000000]"
                                : "bg-white border-[rgba(0,0,0,0.26)] hover:border-[#2B2D2F]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-[0.625rem]">
                            {/* Circle bullet (Ellipse 488) */}
                            <div
                              className={`
                                w-[0.75rem] h-[0.75rem] rounded-full transition-all duration-200
                                ${
                                  isOptionSelected
                                    ? "bg-[#3D93D1] border-[2px] border-[#85BFE5]"
                                    : "bg-[#FFFFFF] border-[2px] border-[#85BFE5]"
                                }
                              `}
                            />
                            <span
                              className={`
                                font-sans font-semibold text-[0.875rem] leading-[1.125rem] text-center transition-colors duration-200 whitespace-nowrap
                                ${isOptionSelected ? "text-white" : "text-black"}
                              `}
                            >
                              {option}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>                   {/* Conditional Loan Amount Input */}
                  {activeSubTab === "loans" && selections.loans === "Available" && (
                    <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)] w-full max-w-[640px] mt-4 animate-in fade-in duration-200">
                      <span className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-black">
                        Please Enter Loan Amount
                      </span>
                      <div className="relative w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6">
                        <input
                          type="text"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black"
                        />
                      </div>
                    </div>
                  )}

                  {/* Conditional Agreements inputs */}
                  {activeSubTab === "agreements" && selections.agreements === "Available" && (
                    <div className="flex flex-col gap-6 w-full max-w-[640px] mt-4 animate-in fade-in duration-200">
                      <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)]">
                        <span className="font-sans font-semibold text-[clamp(1rem,1.39vw,1.5rem)] leading-[clamp(1.25rem,1.74vw,1.875rem)] text-black">
                          Agreement Type
                        </span>
                        
                        <div className="flex items-center gap-[clamp(1rem,1.875vw,2.5rem)]">
                          {["Legal", "Verbal"].map((type) => {
                            const isTypeSelected = agreementType === type;
                            const btnWidth = type === "Legal" ? "w-[5.9375rem]" : "w-[6.375rem]";
                            return (
                              <button
                                key={type}
                                type="button"
                                onClick={() => setAgreementType(type)}
                                className={`
                                  box-sizing-border-box
                                  flex flex-row items-center justify-center
                                  ${btnWidth} h-[2.375rem]
                                  px-[1.125rem] py-[0.625rem] gap-[0.625rem]
                                  border rounded-[2.0625rem]
                                  transition-all duration-200 cursor-pointer
                                  ${
                                    isTypeSelected
                                      ? "bg-[#2B2D2F] border-[#000000]"
                                      : "bg-white border-[rgba(0,0,0,0.26)] hover:border-[#2B2D2F]"
                                  }
                                `}
                              >
                                <div className="flex items-center gap-[0.625rem]">
                                  <div
                                    className={`
                                      w-[0.75rem] h-[0.75rem] rounded-full transition-all duration-200
                                      ${
                                        isTypeSelected
                                          ? "bg-[#3D93D1] border-[2px] border-[#85BFE5]"
                                          : "bg-[#FFFFFF] border-[2px] border-[#85BFE5]"
                                      }
                                    `}
                                  />
                                  <span
                                    className={`
                                      font-sans font-semibold text-[clamp(0.75rem,0.97vw,1.1rem)] leading-[clamp(0.9rem,1.25vw,1.35rem)] text-center transition-colors duration-200
                                      ${isTypeSelected ? "text-white" : "text-black"}
                                    `}
                                  >
                                    {type}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)]">
                        <span className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-black">
                          Last Price of the land when made agreement?
                        </span>
                        <div className="w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6">
                          <input
                            type="text"
                            value={agreementLastPrice}
                            onChange={(e) => setAgreementLastPrice(e.target.value)}
                            className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Conditional Transactions inputs */}
                  {activeSubTab === "transactions" && selections.transactions === "Available" && (
                    <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,1.5rem)] w-full max-w-[640px] mt-4 animate-in fade-in duration-200">
                      <span className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-black">
                        Last Price of the land when made agreement?
                      </span>
                      <div className="w-full h-[clamp(2.75rem,3.75vw,4.5rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] flex items-center px-6">
                        <input
                          type="text"
                          value={transactionLastPrice}
                          onChange={(e) => setTransactionLastPrice(e.target.value)}
                          className="w-full h-full bg-transparent border-none outline-none font-['Inter'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] text-black"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>

            {/* Right Column: Comments / Mic Button */}
            <div className="flex flex-col gap-[clamp(0.8rem,1.25vw,2rem)] w-full">
              <span className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[1.875rem] text-black">
                Add Comments
              </span>

              {/* Comment Text Box */}
              <div className="relative w-full max-w-[38.625rem] h-[11.3125rem] bg-[rgba(187,219,240,0.38)] border border-[#96C9ED] rounded-[1.125rem]">
                <textarea
                  value={comments[currentTab.id]}
                  onChange={(e) =>
                    setComments((prev) => ({ ...prev, [currentTab.id]: e.target.value }))
                  }
                  placeholder="Type comments here..."
                  className="
                    w-full h-full bg-transparent
                    p-6 pr-14 outline-none border-none resize-none
                    font-sans text-[1rem] text-black
                  "
                />

                {/* Microphone Icon Button */}
                <button
                  className="
                    absolute right-[1.25rem] bottom-[1.25rem]
                    w-[2rem] h-[2rem] rounded-full
                    bg-[#2680C4] hover:bg-[#1f6da9]
                    flex items-center justify-center
                    cursor-pointer transition-colors shadow-sm
                  "
                  aria-label="Voice comments"
                >
                  <Mic className="w-[1.125rem] h-[1.125rem] text-white" />
                </button>
              </div>
            </div>

          </div>

          {/* Bottom Actions footer */}
          <div className="absolute bottom-[clamp(1rem,1.8vw,2.5rem)] right-[clamp(1rem,1.7vw,2.5rem)] flex flex-row items-center gap-[0.75rem]">
            <button
              onClick={handleBackClick}
              className="
                box-sizing-border-box
                flex flex-row justify-center items-center
                w-[7.5625rem] h-[2.375rem]
                border border-[rgba(39,128,196,0.8)]
                rounded-[2.0625rem]
                cursor-pointer transition-opacity hover:opacity-80
              "
            >
              <span className="font-sans font-medium text-[0.875rem] leading-[1.125rem] text-[rgba(39,128,196,0.8)] text-center">
                Back
              </span>
            </button>

            <button
              onClick={handleNextClick}
              className="
                flex flex-row justify-center items-center
                w-[7.5625rem] h-[2.375rem]
                bg-[#2780C4] hover:bg-[#1f6da9]
                rounded-[2.0625rem]
                cursor-pointer transition-opacity hover:opacity-90
              "
            >
              <span className="font-sans font-semibold text-[0.875rem] leading-[1.125rem] text-white text-center">
                {activeSubTab === "issues" ? "Next" : "Save"}
              </span>
            </button>
          </div>

        </Card>

      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="
            fixed z-[100]
            bottom-[1.5rem] md:bottom-[2.5rem]
            right-[1rem] md:right-[2.5rem] left-auto
            w-max max-w-[calc(100%-2rem)] md:max-w-[clamp(24rem,34.1vw,31rem)]
            min-h-[clamp(4.5rem,5.56vw,6rem)] h-auto
            flex flex-col justify-center items-start
            p-[clamp(1rem,1.67vw,1.8rem)] gap-[clamp(0.4rem,0.69vw,0.8rem)]
            bg-white border border-[rgba(0,0,0,0.2)] rounded-[clamp(1rem,1.67vw,1.8rem)]
            shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-5
          "
        >
          <div className="flex flex-row items-center justify-between w-full h-auto gap-[clamp(0.5rem,0.97vw,1.2rem)]">
            <div className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.8rem)] flex-1 min-w-0">
              {/* Logo / Verified Icon */}
              <div className="relative w-[clamp(1.5rem,2.22vw,2.5rem)] h-[clamp(1.5rem,2.22vw,2.5rem)] shrink-0">
                <svg
                  className="absolute left-0 top-0 w-full h-full"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="16" fill="#2780C4" />
                  <path
                    d="M10 16L14 20L22 12"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Text */}
              <span className="font-['Poppins'] font-normal text-[clamp(0.85rem,1.11vw,1.25rem)] leading-[clamp(1.2rem,1.67vw,1.875rem)] text-black break-words flex-1 min-w-0">
                {toastMessage}
              </span>
            </div>

            {/* Close Button: basil:cross-solid */}
            <button
              onClick={() => setToastMessage(null)}
              className="
                w-[clamp(1.25rem,2.08vw,2.25rem)] h-[clamp(1.25rem,2.08vw,2.25rem)]
                flex items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full shrink-0
              "
            >
              <svg
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M21 9L9 21M9 9L21 21"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Verification Completed Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div
            className="
              box-sizing-border-box
              relative w-full max-w-[610px] min-h-[clamp(24rem,33.47vw,36rem)]
              bg-[#FFFFFF] border border-[rgba(0,0,0,0.2)]
              shadow-[0px_0px_12.5px_rgba(0,0,0,0.15)]
              rounded-[24px]
              flex flex-col items-center justify-between gap-[clamp(1.5rem,2.2vw,3rem)]
              p-8 py-[clamp(1.5rem,2.77vw,3.5rem)]
            "
          >
            {/* Header: Documents Submitted */}
            <h3 className="font-sans font-semibold text-[clamp(1.2rem,1.67vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-[#000000] text-center mt-2">
              Documents Submitted
            </h3>

            {/* Checkmark Icon Container (Frame 2147239820) */}
            <div className="relative w-[clamp(8rem,12.5vw,13rem)] h-[clamp(8rem,12.5vw,13rem)] flex items-center justify-center">
              <img
                src={successIcon}
                alt="Success"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Success Text */}
            <p className="font-sans font-bold text-[clamp(1rem,1.39vw,1.5rem)] leading-[clamp(1.25rem,1.74vw,1.875rem)] text-[#3D4949] text-center px-4 max-w-[450px]">
              Farmland ID: {farmlandId} has been successfully Approved
            </p>

            {/* Done Button */}
            <button
              onClick={() => {
                setShowSuccessModal(false);
                onNext();
              }}
              className="
                flex flex-row justify-center items-center
                px-[17px] py-[17px] gap-[17px]
                w-[clamp(10rem,14.17vw,16rem)] h-[clamp(3.5rem,4.44vw,5rem)]
                bg-[#2780C4] hover:bg-[#1f6da9]
                rounded-[56.1383px]
                transition-all duration-200 cursor-pointer
                shadow-md hover:shadow-lg
              "
            >
              <span className="font-sans font-semibold text-[clamp(1.1rem,1.65vw,1.8rem)] leading-[clamp(1.5rem,2.08vw,2.25rem)] text-white text-center">
                Done
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
