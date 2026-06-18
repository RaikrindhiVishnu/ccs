import React, { useRef, useState } from "react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

interface LocalIntelligenceUploadFileProps {
  activeTabLabel: string;
  uploadedFiles: UploadedFileItem[];
  commentValue: string;
  onCommentChange: (val: string) => void;
  onFileUpload: (files: FileList, imageType?: "cover" | "land") => void;
  onFileDelete: (fileId: string) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  anyIssuesTypeValue?: string;
  onAnyIssuesTypeChange?: (val: string) => void;
  localLiabilitiesTypeValue?: string;
  onLocalLiabilitiesTypeChange?: (val: string) => void;
  pendingLoansTypeValue?: string;
  onPendingLoansTypeChange?: (val: string) => void;
  pendingLoansAmountValue?: string;
  onPendingLoansAmountChange?: (val: string) => void;
  ownerMindsetValue?: string;
  onOwnerMindsetChange?: (val: string) => void;
  sourcePersonTypeValue?: string;
  onSourcePersonTypeChange?: (val: string) => void;
  sourcePersonNameValue?: string;
  onSourcePersonNameChange?: (val: string) => void;
  sourcePersonMobileValue?: string;
  onSourcePersonMobileChange?: (val: string) => void;
  agreementPaperValue?: string;
  onAgreementPaperChange?: (val: string) => void;
  agreementTypeValue?: string;
  onAgreementTypeChange?: (val: string) => void;
  agreementPriceValue?: string;
  onAgreementPriceChange?: (val: string) => void;
  prevTransactionsTypeValue?: string;
  onPrevTransactionsTypeChange?: (val: string) => void;
  prevTransactionsPriceValue?: string;
  onPrevTransactionsPriceChange?: (val: string) => void;
  isFinishStep: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LocalIntelligenceUploadFile: React.FC<LocalIntelligenceUploadFileProps> = ({
  activeTabLabel,
  uploadedFiles,
  commentValue,
  onCommentChange,
  onFileUpload,
  onFileDelete,
  onPrevTab,
  onNextTab,
  isFinishStep,
  className = "",
  style,
  anyIssuesTypeValue = "",
  onAnyIssuesTypeChange,
  localLiabilitiesTypeValue = "",
  onLocalLiabilitiesTypeChange,
  pendingLoansTypeValue = "",
  onPendingLoansTypeChange,
  pendingLoansAmountValue = "",
  onPendingLoansAmountChange,
  ownerMindsetValue = "",
  onOwnerMindsetChange,
  sourcePersonTypeValue = "",
  onSourcePersonTypeChange,
  sourcePersonNameValue = "",
  onSourcePersonNameChange,
  sourcePersonMobileValue = "",
  onSourcePersonMobileChange,
  agreementPaperValue = "",
  onAgreementPaperChange,
  agreementTypeValue = "",
  onAgreementTypeChange,
  agreementPriceValue = "",
  onAgreementPriceChange,
  prevTransactionsTypeValue = "",
  onPrevTransactionsTypeChange,
  prevTransactionsPriceValue = "",
  onPrevTransactionsPriceChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files);
    }
  };

  const triggerUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true);
      const mockDictation = " This is a voice-dictated comment for " + activeTabLabel + ".";
      setTimeout(() => {
        onCommentChange(commentValue + mockDictation);
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div
      className={`absolute left-[clamp(1.77rem,_2.78vw,_3.33rem)] right-[clamp(1.77rem,_2.78vw,_3.33rem)] top-[clamp(26rem,_40.63vw,_48.75rem)] h-[clamp(19.68rem,_30.76vw,_36.91rem)] rounded-[24px] box-border bg-white select-none ${className}`.trim()}
      style={style}
    >
      <h3 className="absolute w-[13.38%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[52.65%] top-[clamp(1.33rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
        Add Comments
      </h3>

      {activeTabLabel === "Any Issues" || activeTabLabel === "Local Liabilities" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(0.75rem,_1.25vw,_1.5rem)] w-[50.15%] h-[clamp(3.58rem,_5.97vw,_7.17rem)] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
            {activeTabLabel === "Any Issues" ? "Any issues with Boundaries & Owners?" : "Any Local Liabilities?"}
          </span>
          {/* Frame 2147239911 */}
          <div className="flex flex-row items-center p-0 gap-[25px] w-[292px] h-[38px]">
            {/* Frame 2147239879 */}
            <button
              type="button"
              onClick={() => {
                if (activeTabLabel === "Any Issues") {
                  onAnyIssuesTypeChange?.("Available");
                } else {
                  onLocalLiabilitiesTypeChange?.("Available");
                }
              }}
              className={`box-border flex flex-row justify-center items-center py-[10px] px-[18px] gap-[10px] w-[120px] h-[38px] border rounded-[33px] cursor-pointer transition-all ${
                (activeTabLabel === "Any Issues" ? anyIssuesTypeValue : localLiabilitiesTypeValue) === "Available"
                  ? "border-[#2B2D2F] bg-[#2B2D2F]"
                  : "border-[rgba(0,_0,_0,_0.26)] bg-white"
              }`}
            >
              <div className="flex flex-row items-center p-0 gap-[10px] w-[84px] h-[18px] justify-center">
                {/* Ellipse 489 */}
                <div
                  className={`box-border w-[12px] h-[12px] rounded-full flex items-center justify-center transition-all ${
                    (activeTabLabel === "Any Issues" ? anyIssuesTypeValue : localLiabilitiesTypeValue) === "Available"
                      ? "border-[2px] border-white bg-[#BDD327]"
                      : "border-[2px] border-[#BDD327] bg-white"
                  }`}
                />
                <span
                  className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[14px] leading-[18px] whitespace-nowrap transition-all ${
                    (activeTabLabel === "Any Issues" ? anyIssuesTypeValue : localLiabilitiesTypeValue) === "Available" ? "text-white" : "text-black"
                  }`}
                >
                  Available
                </span>
              </div>
            </button>

            {/* Frame 2147239876 */}
            <button
              type="button"
              onClick={() => {
                if (activeTabLabel === "Any Issues") {
                  onAnyIssuesTypeChange?.("Not Available");
                } else {
                  onLocalLiabilitiesTypeChange?.("Not Available");
                }
              }}
              className={`box-border flex flex-row justify-center items-center py-[10px] px-[18px] gap-[10px] w-[147px] h-[38px] border rounded-[33px] cursor-pointer transition-all ${
                (activeTabLabel === "Any Issues" ? anyIssuesTypeValue : localLiabilitiesTypeValue) === "Not Available"
                  ? "border-[#2B2D2F] bg-[#2B2D2F]"
                  : "border-[rgba(0,_0,_0,_0.26)] bg-white"
              }`}
            >
              <div className="flex flex-row items-center p-0 gap-[10px] w-[111px] h-[18px] justify-center">
                {/* Ellipse 488 */}
                <div
                  className={`box-border w-[12px] h-[12px] rounded-full flex items-center justify-center transition-all ${
                    (activeTabLabel === "Any Issues" ? anyIssuesTypeValue : localLiabilitiesTypeValue) === "Not Available"
                      ? "border-[2px] border-white bg-[#BDD327]"
                      : "border-[2px] border-[#BDD327] bg-white"
                  }`}
                />
                <span
                  className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[14px] leading-[18px] whitespace-nowrap transition-all ${
                    (activeTabLabel === "Any Issues" ? anyIssuesTypeValue : localLiabilitiesTypeValue) === "Not Available" ? "text-white" : "text-black"
                  }`}
                >
                  Not Available
                </span>
              </div>
            </button>
          </div>
        </div>
      ) : activeTabLabel === "Any Pending Loans" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1rem,_1.67vw,_2rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Frame 2147239898 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.67rem,_1.11vw,_1.33rem)] w-full h-[clamp(3.63rem,_6.04vw,_7.25rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-[#000000]">
              Any Bank Loans or Pending Loans on the Land
            </span>
            {/* Frame 2147239897 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(0.75rem,_1.25vw,_1.5rem)] w-[clamp(12.25rem,_20.42vw,_24.5rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239876 */}
              <button
                type="button"
                onClick={() => onPendingLoansTypeChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(5rem,_8.33vw,_10rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  pendingLoansTypeValue === "Available"
                    ? "border-[#2B2D2F] bg-[#2B2D2F]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(3.5rem,_5.83vw,_7rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      pendingLoansTypeValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      pendingLoansTypeValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239878 */}
              <button
                type="button"
                onClick={() => onPendingLoansTypeChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  pendingLoansTypeValue === "Not Available"
                    ? "border-[#2B2D2F] bg-[#2B2D2F]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(4.63rem,_7.71vw,_9.25rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      pendingLoansTypeValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      pendingLoansTypeValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional field: Please Enter Loan Amount */}
          {pendingLoansTypeValue === "Available" && (
            <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(4.04rem,_6.74vw,_8.08rem)] animate-in fade-in duration-200">
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-[#000000]">
                Please Enter Loan Amount
              </span>
              <input
                type="text"
                value={pendingLoansAmountValue}
                onChange={(e) => onPendingLoansAmountChange?.(e.target.value)}
                placeholder="Enter loan amount"
                className="box-border w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[clamp(0.75rem,_1.25vw,_1.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.83rem,_1.39vw,_1.67rem)] text-[#000000] focus:outline-none focus:border-[#BDD327]"
              />
            </div>
          )}
        </div>
      ) : activeTabLabel === "Owner Mindset" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-[50.15%] h-[clamp(4.04rem,_6.74vw,_8.08rem)] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-[#000000]">
            Owner Mindset
          </span>
          {/* Frame 2147239873 */}
          <div className="relative w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)]">
            <select
              value={ownerMindsetValue}
              onChange={(e) => onOwnerMindsetChange?.(e.target.value)}
              className="appearance-none box-border w-full h-full bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[24px] font-['Inter',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.79rem,_1.32vw,_1.58rem)] text-[#000000] cursor-pointer focus:outline-none focus:border-[#BDD327]"
            >
              <option value="">Select</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
              <option value="Cooperative">Cooperative</option>
              <option value="Difficult">Difficult</option>
            </select>
            {/* Vector Arrow down */}
            <div className="absolute right-[4.06%] top-[50%] -translate-y-1/2 pointer-events-none flex items-center justify-center">
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L7 7L13 1"
                  stroke="#363434"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ) : activeTabLabel === "Source Person" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1.29rem,_2.15vw,_2.58rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Frame 2147239877 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(4.04rem,_6.74vw,_8.08rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-[#000000]">
              Source Person
            </span>
            {/* Frame 2147239872 */}
            <div className="relative w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)]">
              <select
                value={sourcePersonTypeValue}
                onChange={(e) => onSourcePersonTypeChange?.(e.target.value)}
                className="appearance-none box-border w-full h-full bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[24px] font-['Inter',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.79rem,_1.32vw,_1.58rem)] text-[#000000] cursor-pointer focus:outline-none focus:border-[#BDD327]"
              >
                <option value="">Select</option>
                <option value="Government Person">Government Person</option>
                <option value="Broker">Broker</option>
                <option value="Neighbor">Neighbor</option>
                <option value="Other">Other</option>
              </select>
              {/* Vector Arrow down */}
              <div className="absolute right-[4.06%] top-[50%] -translate-y-1/2 pointer-events-none flex items-center justify-center">
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="#363434"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Conditional field: Person Contact Details */}
          {sourcePersonTypeValue && sourcePersonTypeValue !== "" && (
            <div className="flex flex-col items-start p-0 gap-[clamp(0.75rem,_1.25vw,_1.5rem)] w-full h-[clamp(10rem,_16.67vw,_20rem)] animate-in fade-in duration-200">
              {/* Frame 2147239874 */}
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.92rem,_1.53vw,_1.83rem)] leading-[clamp(1.17rem,_1.94vw,_2.33rem)] text-[#000000]">
                Person Contact Details
              </span>

              {/* Frame 2147240771 */}
              <div className="flex flex-col items-start p-0 gap-[clamp(0.58rem,_0.97vw,_1.17rem)] w-full">
                {/* Frame 2147239878 */}
                <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(3.75rem,_6.25vw,_7.5rem)]">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.75rem,_1.25vw,_1.5rem)] leading-[clamp(0.96rem,_1.6vw,_1.92rem)] text-[#000000]">
                    Name
                  </span>
                  <input
                    type="text"
                    value={sourcePersonNameValue}
                    onChange={(e) => onSourcePersonNameChange?.(e.target.value)}
                    placeholder="Krishna"
                    className="box-border w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[24px] font-['Inter',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.79rem,_1.32vw,_1.58rem)] text-[#000000] focus:outline-none focus:border-[#BDD327]"
                  />
                </div>

                {/* Frame 2147239879 */}
                <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(3.75rem,_6.25vw,_7.5rem)]">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.75rem,_1.25vw,_1.5rem)] leading-[clamp(0.96rem,_1.6vw,_1.92rem)] text-[#000000]">
                    Mobile
                  </span>
                  <input
                    type="text"
                    value={sourcePersonMobileValue}
                    onChange={(e) => onSourcePersonMobileChange?.(e.target.value)}
                    placeholder="+91-8857463923"
                    className="box-border w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[24px] font-['Inter',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.79rem,_1.32vw,_1.58rem)] text-[#000000] focus:outline-none focus:border-[#BDD327]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : activeTabLabel === "Agreements" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1.17rem,_1.94vw,_2.33rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Block 1: Any Paper Agreement On This Land */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.67rem,_1.11vw,_1.33rem)] w-full h-[clamp(3.63rem,_6.04vw,_7.25rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-[#000000]">
              Any Paper Agreement On This Land
            </span>
            {/* Frame 2147239897 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.13rem,_1.88vw,_2.25rem)] w-[clamp(12.25rem,_20.42vw,_24.5rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239879 */}
              <button
                type="button"
                onClick={() => onAgreementPaperChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(5rem,_8.33vw,_10rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  agreementPaperValue === "Available"
                    ? "border-[#2B2D2F] bg-[#2B2D2F]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(3.5rem,_5.83vw,_7rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      agreementPaperValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      agreementPaperValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239878 */}
              <button
                type="button"
                onClick={() => onAgreementPaperChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  agreementPaperValue === "Not Available"
                    ? "border-[#2B2D2F] bg-[#2B2D2F]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(4.63rem,_7.71vw,_9.25rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      agreementPaperValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      agreementPaperValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional blocks shown only if "Available" is chosen */}
          {agreementPaperValue === "Available" && (
            <>
              {/* Block 2: Agreement Type */}
              <div className="flex flex-col items-start p-0 gap-[clamp(0.67rem,_1.11vw,_1.33rem)] w-full h-[clamp(3.63rem,_6.04vw,_7.25rem)] animate-in fade-in duration-200">
                <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-[#000000]">
                  Agreement Type
                </span>
                {/* Frame 2147239897 */}
                <div className="flex flex-row items-center p-0 gap-[clamp(1.13rem,_1.88vw,_2.25rem)] w-[clamp(9.33rem,_15.56vw,_18.67rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
                  {/* Frame 2147239878 */}
                  <button
                    type="button"
                    onClick={() => onAgreementTypeChange?.("Legal")}
                    className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(3.96rem,_6.6vw,_7.92rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                      agreementTypeValue === "Legal"
                        ? "border-[#2B2D2F] bg-[#2B2D2F]"
                        : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                    }`}
                  >
                    <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(2.46rem,_4.1vw,_4.92rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                      <div
                        className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                          agreementTypeValue === "Legal"
                            ? "border-[2px] border-white bg-[#BDD327]"
                            : "border-[2px] border-[#BDD327] bg-white"
                        }`}
                      />
                      <span
                        className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                          agreementTypeValue === "Legal" ? "text-white" : "text-black"
                        }`}
                      >
                        Legal
                      </span>
                    </div>
                  </button>

                  {/* Frame 2147239879 */}
                  <button
                    type="button"
                    onClick={() => onAgreementTypeChange?.("Verbal")}
                    className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(4.25rem,_7.08vw,_8.5rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                      agreementTypeValue === "Verbal"
                        ? "border-[#2B2D2F] bg-[#2B2D2F]"
                        : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                    }`}
                  >
                    <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(2.75rem,_4.58vw,_5.5rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                      <div
                        className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                          agreementTypeValue === "Verbal"
                            ? "border-[2px] border-white bg-[#BDD327]"
                            : "border-[2px] border-[#BDD327] bg-white"
                        }`}
                      />
                      <span
                        className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                          agreementTypeValue === "Verbal" ? "text-white" : "text-black"
                        }`}
                      >
                        Verbal
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Block 3: Last Price of the land when made agreement? */}
              <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(4.04rem,_6.74vw,_8.08rem)] animate-in fade-in duration-200">
                <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-[#000000]">
                  Last Price of the land when made agreement?
                </span>
                <input
                  type="text"
                  value={agreementPriceValue}
                  onChange={(e) => onAgreementPriceChange?.(e.target.value)}
                  placeholder="1,00,000.00"
                  className="box-border w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[clamp(0.75rem,_1.25vw,_1.5rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.79rem,_1.32vw,_1.58rem)] text-[#000000] focus:outline-none focus:border-[#BDD327]"
                />
              </div>
            </>
          )}
        </div>
      ) : activeTabLabel === "Previous Transactions" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1.25rem,_2.08vw,_2.5rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Block 1: Any Previous Transactions on the Land? */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.67rem,_1.11vw,_1.33rem)] w-full h-[clamp(3.63rem,_6.04vw,_7.25rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-[#000000]">
              Any Previous Transactions on the Land?
            </span>
            {/* Frame 2147239898 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.13rem,_1.88vw,_2.25rem)] w-[clamp(12.25rem,_20.42vw,_24.5rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239879 */}
              <button
                type="button"
                onClick={() => onPrevTransactionsTypeChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(5rem,_8.33vw,_10rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  prevTransactionsTypeValue === "Available"
                    ? "border-[#2B2D2F] bg-[#2B2D2F]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(3.5rem,_5.83vw,_7rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      prevTransactionsTypeValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      prevTransactionsTypeValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239878 */}
              <button
                type="button"
                onClick={() => onPrevTransactionsTypeChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  prevTransactionsTypeValue === "Not Available"
                    ? "border-[#2B2D2F] bg-[#2B2D2F]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[clamp(0.42rem,_0.69vw,_0.83rem)] w-[clamp(4.63rem,_7.71vw,_9.25rem)] h-[clamp(0.75rem,_1.25vw,_1.5rem)] justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      prevTransactionsTypeValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      prevTransactionsTypeValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Conditional dropdown shown only if "Available" is chosen */}
          {prevTransactionsTypeValue === "Available" && (
            <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(4.04rem,_6.74vw,_8.08rem)] animate-in fade-in duration-200">
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-[#000000]">
                Last Price of the land when made agreement?
              </span>
              {/* Frame 2147239872 */}
              <div className="relative w-full h-[clamp(2.25rem,_3.75vw,_4.5rem)]">
                <select
                  value={prevTransactionsPriceValue}
                  onChange={(e) => onPrevTransactionsPriceChange?.(e.target.value)}
                  className="appearance-none box-border w-full h-full bg-[#FFFFFF] border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-[24px] font-['Inter',_sans-serif] font-normal text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.79rem,_1.32vw,_1.58rem)] text-[#000000] cursor-pointer focus:outline-none focus:border-[#BDD327]"
                >
                  <option value="">Select</option>
                  <option value="1,00,000.00">1,00,000.00</option>
                  <option value="2,50,000.00">2,50,000.00</option>
                  <option value="5,00,000.00">5,00,000.00</option>
                  <option value="10,00,000.00">10,00,000.00</option>
                </select>
                {/* Vector Arrow down */}
                <div className="absolute right-[4.06%] top-[50%] -translate-y-1/2 pointer-events-none flex items-center justify-center">
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L13 1"
                      stroke="#363434"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <h3 className="absolute w-[9.56%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[2.21%] top-[clamp(1.33rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
            Upload File
          </h3>

          <div className="absolute w-[50.15%] h-[clamp(15.78rem,_24.65vw,_29.58rem)] left-[1.32%] top-[clamp(3.24rem,_5.07vw,_6.08rem)] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.1)] rounded-[24px] box-border bg-white">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerUploadClick}
              className={`box-border absolute w-[41.2%] h-[clamp(14.53rem,_22.7vw,_27.24rem)] left-[1.76%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] border-2 border-dashed rounded-[12px] transition-all cursor-pointer ${
                dragActive
                  ? "border-[#BDD327] bg-[rgba(243,_244,_241,_0.6)]"
                  : "border-[rgba(225,_229,_239,_0.6)] bg-[rgba(242,_244,_246,_0.5)]"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".png,.jpg,.jpeg"
              />

              <div className="absolute w-[clamp(2.14rem,_3.34vw,_4.01rem)] h-[clamp(2.14rem,_3.34vw,_4.01rem)] left-[calc(50%_-__clamp(2.14rem,_3.34vw,_4.01rem)_/_2)] top-[clamp(2.58rem,_4.03vw,_4.84rem)] rounded-[6030.65px] flex items-center justify-center bg-[#E6EEAD]">
                <div className="absolute w-[clamp(1.72rem,_2.69vw,_3.23rem)] h-[clamp(1.72rem,_2.69vw,_3.23rem)] left-[calc(50%_-__clamp(1.72rem,_2.69vw,_3.23rem)_/_2)] top-[calc(50%_-__clamp(1.72rem,_2.69vw,_3.23rem)_/_2)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.15)] rounded-[6030.65px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-[clamp(0.89rem,_1.39vw,_1.67rem)] h-[clamp(0.89rem,_1.39vw,_1.67rem)] text-white"
                  >
                    <line x1="12" y1="15" x2="12" y2="3" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="5" y1="21" x2="19" y2="21" />
                  </svg>
                </div>
              </div>

              <span className="absolute w-[clamp(2.84rem,_4.44vw,_5.33rem)] h-[clamp(1.02rem,_1.59vw,_1.91rem)] left-[calc(50%_-__clamp(2.84rem,_4.44vw,_5.33rem)_/_2)] top-[clamp(5.39rem,_8.42vw,_10.1rem)] flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[clamp(0.8rem,_1.25vw,_1.5rem)] leading-[clamp(1.02rem,_1.59vw,_1.91rem)] text-[#1A1C1D] text-center">
                Upload
              </span>

              <span className="absolute w-[80%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[10%] top-[clamp(6.72rem,_10.5vw,_12.6rem)] flex items-center justify-center font-['Inter',_sans-serif] font-normal text-[clamp(0.53rem,_0.83vw,_1.0rem)] leading-[clamp(0.67rem,_1.04vw,_1.25rem)] text-[#414755] text-center">
                Drag and drop your files here or click to browse your computer.
              </span>

              <button
                type="button"
                className="absolute w-[clamp(4.44rem,_6.94vw,_8.33rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] left-[calc(50%_-__clamp(4.44rem,_6.94vw,_8.33rem)_/_2)] top-[clamp(9.33rem,_14.58vw,_17.5rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.05)] rounded-[57px] border-none flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
              >
                <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.53rem,_0.83vw,_1.0rem)] leading-[clamp(0.67rem,_1.04vw,_1.25rem)] text-white">
                  Choose File
                </span>
              </button>

              <div className="absolute w-[clamp(4rem,_6vw,_8rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] left-[clamp(0.89rem,_1.39vw,_1.67rem)] top-[clamp(13.29rem,_20.76vw,_24.92rem)] flex items-center gap-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="w-[clamp(0.44rem,_0.69vw,_0.83rem)] h-[clamp(0.44rem,_0.69vw,_0.83rem)] text-black"
                >
                  <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                  <path d="M8.5 1.5v3h3" />
                </svg>
                <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.69vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center whitespace-nowrap">
                  Format:&nbsp;
                  <strong className="font-semibold text-[#3D4A0D]">JPEG, PNG</strong>
                </span>
              </div>

              <div className="absolute w-[clamp(4.18rem,_6.53vw,_7.83rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(13.2rem,_20.63vw,_24.75rem)] flex items-center gap-[4px] justify-end">
                <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.69vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
                  Max File Size:&nbsp;
                  <strong className="font-medium">10MB</strong>
                </span>
              </div>
            </div>

            <div className="absolute w-[41.06%] h-[clamp(7.56rem,_11.8vw,_14.17rem)] left-[45.75%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] flex flex-col items-start gap-[clamp(0.76rem,_1.18vw,_1.42rem)]">
              <h4 className="w-full h-[clamp(1.11rem,_1.74vw,_2.08rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-black margin-0">
                Uploaded Files
              </h4>

              <div className="custom-scrollbar h-[clamp(5.69rem,_8.89vw,_10.67rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] flex flex-col items-start overflow-y-auto w-full">
                {uploadedFiles.length === 0 ? (
                  <span className="font-['Inter',_sans-serif] text-[12px] color-[#9ca3af]">
                    No files uploaded yet.
                  </span>
                ) : (
                  uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="h-[clamp(2.62rem,_4.1vw,_4.92rem)] bg-[#F6F9E2] rounded-[12px] relative w-full flex-shrink-0"
                    >
                      <div className="absolute w-[clamp(1.29rem,_2.01vw,_2.42rem)] h-[clamp(1.29rem,_2.01vw,_2.42rem)] left-[clamp(0.4rem,_0.63vw,_0.75rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[4px] flex items-center justify-center bg-white">
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[clamp(0.76rem,_1.18vw,_1.42rem)] h-[clamp(0.76rem,_1.18vw,_1.42rem)]"
                        >
                          <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                          <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                          <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                          <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                          <path d="M1 10h14v5H1v-5z" fill="#BDD327" />
                          <text
                            x="3.5"
                            y="13.8"
                            fill="#FFFFFF"
                            fontSize="3.5"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                          >
                            IMG
                          </text>
                        </svg>
                      </div>

                      <div className="absolute left-[clamp(2.04rem,_3.19vw,_3.83rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] width-[50%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] flex flex-col justify-center">
                        <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.76rem,_1.18vw,_1.42rem)] block overflow-hidden text-ellipsis whitespace-nowrap text-black">
                          {file.name}
                        </span>
                        <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.36rem,_0.56vw,_0.67rem)] leading-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[rgba(0,_0,_0,_0.7)]">
                          {file.size}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onFileDelete(file.id)}
                        className="absolute w-[clamp(1.11rem,_1.74vw,_2.08rem)] h-[clamp(1.11rem,_1.74vw,_2.08rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(0.67rem,_1.04vw,_1.25rem)] rounded-[2px] border-none flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.82)]"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="absolute w-[45.44%] h-[clamp(8.04rem,_12.56vw,_15.08rem)] left-[52.65%] top-[clamp(3.24rem,_5.07vw,_6.08rem)]">
        <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,_238,_173,_0.15)] border border-[#E6EEAD] rounded-[18px] z-0" />

        <textarea
          value={commentValue}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Write a comment"
          className="absolute w-[91.59%] h-[clamp(3.73rem,_5.83vw,_7.0rem)] left-[4.21%] top-[clamp(1.07rem,_1.67vw,_2.0rem)] font-['Poppins',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.93rem,_1.46vw,_1.75rem)] z-10 bg-transparent resize-none border-none outline-none text-black"
        />

        <button
          type="button"
          onClick={handleVoiceInput}
          className={`absolute w-[clamp(1.42rem,_2.22vw,_2.67rem)] h-[clamp(1.42rem,_2.22vw,_2.67rem)] right-[clamp(0.62rem,_0.97vw,_1.17rem)] top-[clamp(6.0rem,_9.38vw,_11.25rem)] border-none z-10 flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
            isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-white"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
            <line x1="12" y1="19" y2="22" />
          </svg>
        </button>
      </div>

      <div className="absolute w-[15.59%] h-[clamp(1.69rem,_2.64vw,_3.17rem)] right-[1.91%] top-[clamp(16.84rem,_26.3vw,_31.58rem)]">
        <button
          type="button"
          onClick={onPrevTab}
          className="box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] font-['Outfit',_sans-serif] font-medium text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.8)] border border-[rgba(205,_0,_0,_0.27)] flex items-center justify-center bg-transparent cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNextTab}
          className="absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] rounded-[57px] border-none font-['Outfit',_sans-serif] font-normal text-[clamp(0.58rem,_0.91vw,_1.09rem)] leading-[clamp(0.71rem,_1.11vw,_1.33rem)] text-white flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all"
        >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
