import React, { useRef, useState } from "react";
import { UploadFile, type UploadedFileItem } from "./UploadFile";
import { Comments } from "./Comments";

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
            <UploadFile
              uploadedFiles={uploadedFiles}
              onFileUpload={onFileUpload}
              onFileDelete={onFileDelete}
            />
          </div>
        </>
      )}

      <div className="absolute w-[45.44%] h-[clamp(8.04rem,_12.56vw,_15.08rem)] left-[52.65%] top-[clamp(3.24rem,_5.07vw,_6.08rem)]">
        <Comments
          commentValue={commentValue}
          onCommentChange={onCommentChange}
          activeTabLabel={activeTabLabel}
        />
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
