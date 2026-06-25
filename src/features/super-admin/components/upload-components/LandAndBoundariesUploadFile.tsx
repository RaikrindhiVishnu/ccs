import React, { useRef, useState, useEffect } from "react";
import { UploadFile, type UploadedFileItem } from "./UploadFile";
import { Comments } from "./Comments";

interface LandAndBoundariesUploadFileProps {
  activeTabLabel: string;
  uploadedFiles: UploadedFileItem[];
  commentValue: string;
  onCommentChange: (val: string) => void;
  onFileUpload: (files: FileList, imageType?: "cover" | "land") => void;
  onFileDelete: (fileId: string) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  isFinishStep: boolean;
  className?: string;
  style?: React.CSSProperties;

  // LandShape
  landShapeValue?: string;
  onLandShapeChange?: (val: string) => void;

  // Facilities
  facilityAvailabilityValue?: string;
  onFacilityAvailabilityChange?: (val: string) => void;
  waterFacilityValue?: string;
  onWaterFacilityChange?: (val: string) => void;
  electricityFacilityValue?: string;
  onElectricityFacilityChange?: (val: string) => void;

  // Trees
  treesAvailabilityValue?: string;
  onTreesAvailabilityChange?: (val: string) => void;
  treesCountValue?: string;
  onTreesCountChange?: (val: string) => void;

  // Survey Reports
  surveyReportTypeValue?: string;
  onSurveyReportTypeChange?: (val: string) => void;
  privateSurveyFiles?: UploadedFileItem[];
  onPrivateSurveyFileUpload?: (files: FileList) => void;
  onPrivateSurveyFileDelete?: (fileId: string) => void;
  privateSurveyCommentValue?: string;
  onPrivateSurveyCommentChange?: (val: string) => void;
  governmentSurveyFiles?: UploadedFileItem[];
  onGovernmentSurveyFileUpload?: (files: FileList) => void;
  onGovernmentSurveyFileDelete?: (fileId: string) => void;
  governmentSurveyCommentValue?: string;
  onGovernmentSurveyCommentChange?: (val: string) => void;

  // Boundaries
  boundaryTypeValue?: string;
  onBoundaryTypeChange?: (val: string) => void;
  boundaryOwnerNameValue?: string;
  onBoundaryOwnerNameChange?: (val: string) => void;
  boundaryOwnerAgeValue?: string;
  onBoundaryOwnerAgeChange?: (val: string) => void;
  boundaryRoadTypeValue?: string;
  onBoundaryRoadTypeChange?: (val: string) => void;
  boundaryRoadWidthValue?: string;
  onBoundaryRoadWidthChange?: (val: string) => void;
  boundaryTreesCountValue?: string;
  onBoundaryTreesCountChange?: (val: string) => void;
}

export const LandAndBoundariesUploadFile: React.FC<LandAndBoundariesUploadFileProps> = ({
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

  landShapeValue = "",
  onLandShapeChange,
  facilityAvailabilityValue = "",
  onFacilityAvailabilityChange,
  waterFacilityValue = "",
  onWaterFacilityChange,
  electricityFacilityValue = "",
  onElectricityFacilityChange,
  treesAvailabilityValue = "",
  onTreesAvailabilityChange,
  treesCountValue = "",
  onTreesCountChange,

  surveyReportTypeValue = "private",
  onSurveyReportTypeChange,
  privateSurveyFiles = [],
  onPrivateSurveyFileUpload,
  onPrivateSurveyFileDelete,
  privateSurveyCommentValue = "",
  onPrivateSurveyCommentChange,
  governmentSurveyFiles = [],
  onGovernmentSurveyFileUpload,
  onGovernmentSurveyFileDelete,
  governmentSurveyCommentValue = "",
  onGovernmentSurveyCommentChange,

  boundaryTypeValue = "",
  onBoundaryTypeChange,
  boundaryOwnerNameValue = "",
  onBoundaryOwnerNameChange,
  boundaryOwnerAgeValue = "",
  onBoundaryOwnerAgeChange,
  boundaryRoadTypeValue = "",
  onBoundaryRoadTypeChange,
  boundaryRoadWidthValue = "",
  onBoundaryRoadWidthChange,
  boundaryTreesCountValue = "",
  onBoundaryTreesCountChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverImageInputRef = useRef<HTMLInputElement>(null);
  const landImagesInputRef = useRef<HTMLInputElement>(null);
  const [showChooseImageModal, setShowChooseImageModal] = useState(false);

  const [isLandShapeDropdownOpen, setIsLandShapeDropdownOpen] = useState(false);
  const [isTreesCountDropdownOpen, setIsTreesCountDropdownOpen] = useState(false);
  const [isBoundaryDropdownOpen, setIsBoundaryDropdownOpen] = useState(false);
  const [isBoundaryTreesDropdownOpen, setIsBoundaryTreesDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsBoundaryDropdownOpen(false);
        setIsBoundaryTreesDropdownOpen(false);
        setIsTreesCountDropdownOpen(false);
        setIsLandShapeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files, "cover");
      setShowChooseImageModal(false);
    }
  };

  const handleLandImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files, "land");
      setShowChooseImageModal(false);
    }
  };

  const isBoundaryTab =
    activeTabLabel === "East Boundaries" ||
    activeTabLabel === "West Boundaries" ||
    activeTabLabel === "North Boundaries" ||
    activeTabLabel === "South Boundaries";

  const renderUploaderBox = (type: "private" | "government") => {
    const isPrivate = type === "private";
    const files = isPrivate ? privateSurveyFiles : governmentSurveyFiles;
    const deleteHandler = isPrivate ? onPrivateSurveyFileDelete : onGovernmentSurveyFileDelete;
    const uploadHandler = isPrivate ? onPrivateSurveyFileUpload : onGovernmentSurveyFileUpload;

    return (
      <div className="relative w-full max-w-[clamp(22.73rem,_47.36vw,_56.83rem)] h-[clamp(11.83rem,_24.65vw,_29.58rem)] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.15)] rounded-[24px] box-border bg-white">
        <UploadFile
          uploadedFiles={files || []}
          onFileUpload={(filesList) => uploadHandler?.(filesList)}
          onFileDelete={(id) => deleteHandler?.(id)}
        />
      </div>
    );
  };

  const renderCommentBox = (type: "private" | "government") => {
    const isPrivate = type === "private";
    const commentVal = isPrivate ? privateSurveyCommentValue : governmentSurveyCommentValue;
    const changeHandler = isPrivate ? onPrivateSurveyCommentChange : onGovernmentSurveyCommentChange;
    const targetType = isPrivate ? "Private" : "Government";

    return (
      <div className="relative w-full max-w-[clamp(20.6rem,_42.91vw,_51.49rem)] h-[clamp(7.47rem,_15.56vw,_18.68rem)] box-border">
        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black block mb-[clamp(0.44rem,_0.91vw,_1.09rem)]">
          Add Comments
        </span>

        <div className="relative w-full h-[clamp(6.03rem,_12.56vw,_15.08rem)] box-border">
          <Comments
            commentValue={commentVal || ""}
            onCommentChange={(val) => changeHandler?.(val)}
            activeTabLabel={targetType}
            mockDictationSuffix=" Survey Report."
            micButtonClassName="absolute w-[clamp(1.07rem,_2.22vw,_2.67rem)] h-[clamp(1.07rem,_2.22vw,_2.67rem)] right-[clamp(0.47rem,_0.97vw,_1.17rem)] top-[clamp(4.5rem,_9.38vw,_11.25rem)]"
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`absolute rounded-[24px] box-border bg-white select-none ${className} left-[clamp(1.33rem,_2.78vw,_3.33rem)] right-[clamp(1.33rem,_2.78vw,_3.33rem)] top-[clamp(19.5rem,_40.63vw,_48.75rem)] ${activeTabLabel === "Survey Report" ? (surveyReportTypeValue === "both" ? "h-[clamp(58.88rem,_43.875rem_+_31.25vw,_81.5rem)]" : "h-[clamp(38.59rem,_24rem_+_30.4vw,_60.5rem)]") : "h-[clamp(14.76rem,_30.76vw,_36.91rem)]"}`.trim()} style={style}>
      {/* ── Choose Image Type Modal for Land Images ── */}
      {showChooseImageModal && (
        <div
          onClick={() => setShowChooseImageModal(false)}
          className="z-[99999] fixed inset-0 bg-black/40 flex items-center justify-center select-none"
        >
          <div className="box-border relative w-[clamp(20.25rem,_42.19vw,_50.625rem)] h-[clamp(12.56rem,_26.17vw,_31.41rem)] bg-white border border-[rgba(0,_0,_0,_0.1)] shadow-[0px_0px_12.5px_rgba(0,_0,_0,_0.1)] rounded-[24px] flex flex-col items-center justify-start p-[clamp(0.75rem,_1.56vw,_1.875rem)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.66vw,_1.99rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black m-0 self-start pl-[clamp(0.6rem,_1.25vw,_1.5rem)] mb-[clamp(1.12rem,_2.34vw,_2.81rem)]">
              Choose upload Image
            </h3>

            <div className="flex flex-row gap-[clamp(1.12rem,_2.34vw,_2.81rem)] justify-center w-full">
              <div className="box-border w-[clamp(7.95rem,_16.56vw,_19.875rem)] h-[clamp(7.5rem,_15.63vw,_18.75rem)] bg-white shadow-[0px_0px_7.3px_rgba(0,_0,_0,_0.08)] rounded-[12px] relative flex flex-col items-center">
                <span className="absolute top-[clamp(1.12rem,_2.34vw,_2.81rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.66rem,_1.38vw,_1.65rem)] leading-[clamp(0.83rem,_1.72vw,_2.06rem)] text-black">
                  Cover Image
                </span>
                <div className="absolute w-[clamp(1.6rem,_3.34vw,_4.01rem)] h-[clamp(1.6rem,_3.34vw,_4.01rem)] top-[clamp(3.08rem,_6.41vw,_7.69rem)] rounded-[6030.65px] flex items-center justify-center bg-[#E6EEAD]">
                  <div className="w-[clamp(1.29rem,_2.69vw,_3.23rem)] h-[clamp(1.29rem,_2.69vw,_3.23rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.15)] rounded-[6030.65px] flex items-center justify-center relative">
                    <svg className="w-[clamp(0.67rem,_1.39vw,_1.67rem)] h-[clamp(0.67rem,_1.39vw,_1.67rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>
                <button type="button" onClick={() => coverImageInputRef.current?.click()} className="hover:scale-105 active:scale-95 transition-all absolute w-[clamp(5.25rem,_10.93vw,_13.125rem)] h-[clamp(1.26rem,_2.63vw,_3.16rem)] bottom-[clamp(0.6rem,_1.25vw,_1.5rem)] top-[168px] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.05)] rounded-[57px] border-none flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.47rem,_0.97vw,_1.16rem)] text-white">
                    Upload
                  </span>
                </button>
              </div>

              <div className="box-border w-[clamp(7.95rem,_16.56vw,_19.875rem)] h-[clamp(7.5rem,_15.63vw,_18.75rem)] bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.1)] rounded-[12px] relative flex flex-col items-center">
                <span className="absolute top-[clamp(1.12rem,_2.34vw,_2.81rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.66rem,_1.38vw,_1.65rem)] leading-[clamp(0.83rem,_1.72vw,_2.06rem)] text-[rgba(0,_0,_0,_0.82)]">
                  Land Images
                </span>
                <div className="absolute w-[clamp(1.6rem,_3.34vw,_4.01rem)] h-[clamp(1.6rem,_3.34vw,_4.01rem)] top-[clamp(3.08rem,_6.41vw,_7.69rem)] rounded-[6030.65px] flex items-center justify-center bg-[#E6EEAD]">
                  <div className="w-[clamp(1.29rem,_2.69vw,_3.23rem)] h-[clamp(1.29rem,_2.69vw,_3.23rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.15)] rounded-[6030.65px] flex items-center justify-center relative">
                    <svg className="w-[clamp(0.67rem,_1.39vw,_1.67rem)] h-[clamp(0.67rem,_1.39vw,_1.67rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>
                <button type="button" onClick={() => landImagesInputRef.current?.click()} className="hover:scale-105 active:scale-95 transition-all absolute w-[clamp(5.25rem,_10.93vw,_13.125rem)] h-[clamp(1.26rem,_2.63vw,_3.16rem)] bottom-[clamp(0.6rem,_1.25vw,_1.5rem)] top-[168px] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.05)] rounded-[57px] border-none flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.47rem,_0.97vw,_1.16rem)] text-white">
                    Upload
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <input ref={coverImageInputRef} type="file" multiple onChange={handleCoverImageChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
      <input ref={landImagesInputRef} type="file" multiple onChange={handleLandImagesChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />

      {activeTabLabel !== "Survey Report" && (
        <h3 className="absolute w-[13.38%] h-[clamp(1rem,_2.08vw,_2.5rem)] left-[52.65%] top-[clamp(1rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
          Add Comments
        </h3>
      )}

      {activeTabLabel === "Survey Report" ? (
        <div className="absolute inset-0 p-[clamp(1rem,_2.08vw,_2.5rem)] box-border flex flex-col items-start">
          <div className="flex flex-col items-start gap-[clamp(0.7rem,_1.46vw,_1.75rem)] w-full mb-[clamp(1.88rem,_3.91vw,_4.69rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
              Select Survey Report Type
            </span>

            <div className="flex flex-row items-center gap-[clamp(1.07rem,_2.22vw,_2.67rem)] flex-wrap">
              <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[10px] w-auto min-w-[clamp(6.8rem,_14.17vw,_17rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${surveyReportTypeValue === "private" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${surveyReportTypeValue === "private" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onSurveyReportTypeChange?.("private")}>
                <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${surveyReportTypeValue === "private" ? "bg-[#BDD327]" : "bg-white"} ${surveyReportTypeValue === "private" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${surveyReportTypeValue === "private" ? "text-white" : "text-black"}`.trim()}>
                  Private Survey Report
                </span>
              </button>

              <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[10px] w-auto min-w-[clamp(8.06rem,_16.8vw,_20.17rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${surveyReportTypeValue === "government" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${surveyReportTypeValue === "government" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onSurveyReportTypeChange?.("government")}>
                <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${surveyReportTypeValue === "government" ? "bg-[#BDD327]" : "bg-white"} ${surveyReportTypeValue === "government" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${surveyReportTypeValue === "government" ? "text-white" : "text-black"}`.trim()}>
                  Government Survey Report
                </span>
              </button>

              <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[10px] w-auto min-w-[clamp(6.53rem,_13.61vw,_16.33rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${surveyReportTypeValue === "both" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${surveyReportTypeValue === "both" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onSurveyReportTypeChange?.("both")}>
                <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${surveyReportTypeValue === "both" ? "bg-[#BDD327]" : "bg-white"} ${surveyReportTypeValue === "both" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${surveyReportTypeValue === "both" ? "text-white" : "text-black"}`.trim()}>
                  Both Survey Reports
                </span>
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[clamp(1.12rem,_2.34vw,_2.81rem)] overflow-visible pb-[clamp(3rem,_6.25vw,_7.5rem)]">
            {(surveyReportTypeValue === "private" || surveyReportTypeValue === "both") && (
              <div className="flex flex-row items-start gap-[clamp(0.56rem,_1.17vw,_1.41rem)] w-full">
                <div className="flex-[1_1_clamp(21rem,_43.75vw,_52.5rem)] flex flex-col gap-[clamp(0.47rem,_0.97vw,_1.17rem)]">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                    Private Survey Report
                  </span>
                  {renderUploaderBox("private")}
                </div>
                {renderCommentBox("private")}
              </div>
            )}

            {(surveyReportTypeValue === "government" || surveyReportTypeValue === "both") && (
              <div className="flex flex-row items-start gap-[clamp(0.56rem,_1.17vw,_1.41rem)] w-full">
                <div className="flex-[1_1_clamp(21rem,_43.75vw,_52.5rem)] flex flex-col gap-[clamp(0.47rem,_0.97vw,_1.17rem)]">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                    Government Survey Report
                  </span>
                  {renderUploaderBox("government")}
                </div>
                {renderCommentBox("government")}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <h3 className="absolute w-[9.56%] h-[clamp(1rem,_2.08vw,_2.5rem)] left-[2.21%] top-[clamp(1rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
            {activeTabLabel === "Shape of the Land" ||
            activeTabLabel === "Water and Electricity Facility" ||
            activeTabLabel === "Any Existing Trees" ||
            isBoundaryTab
              ? ""
              : "Upload File"}
          </h3>

          {activeTabLabel === "Shape of the Land" ||
          activeTabLabel === "Water and Electricity Facility" ||
          activeTabLabel === "Any Existing Trees" ||
          isBoundaryTab ? (
            <div className={`absolute w-[47.06%] left-[1.32%] top-[clamp(1rem,_2.08vw,_2.5rem)] flex flex-col items-start gap-[clamp(0.3rem,_0.63vw,_0.5625rem)] z-[100] ${activeTabLabel === "Water and Electricity Facility" ? "h-[clamp(11.04rem,_23vw,_25rem)]" : (activeTabLabel === "Any Existing Trees" ? (treesAvailabilityValue === "available" ? "h-[clamp(8.88rem,_18.5vw,_20rem)]" : "h-[clamp(4.8rem,_10vw,_12rem)]") : (isBoundaryTab ? (boundaryTypeValue === "Land" ? "h-[clamp(12.72rem,_26.5vw,_30rem)]" : (boundaryTypeValue === "Road" ? "h-[clamp(10.8rem,_22.5vw,_26rem)]" : (boundaryTypeValue === "Tress" ? "h-[clamp(6.96rem,_14.5vw,_17rem)]" : "h-[clamp(3.6rem,_7.5vw,_9rem)]"))) : "h-[clamp(3.24rem,_6.74vw,_6.0625rem)]"))}`.trim()} ref={dropdownRef}>
              {isBoundaryTab ? (
                <div className="w-full flex flex-col gap-[clamp(0.45rem,_0.94vw,_1.125rem)]">
                  <div className="flex flex-col items-start gap-[clamp(0.3rem,_0.63vw,_0.75rem)] w-full">
                    <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                      {activeTabLabel}
                    </span>
                    <div className="relative w-full">
                      <button className="box-border w-full h-[clamp(1.69rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] relative flex items-center justify-between pl-[clamp(0.45rem,_0.94vw,_1.13rem)] pr-[clamp(0.45rem,_0.94vw,_1.13rem)] cursor-pointer outline-none" type="button" onClick={() => setIsBoundaryDropdownOpen(!isBoundaryDropdownOpen)}>
                        <span className={`font-['Inter',_sans-serif] font-normal text-[clamp(0.53rem,_1.11vw,_1.25rem)] ${boundaryTypeValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                          {boundaryTypeValue || ("What is on the " + activeTabLabel.toLowerCase().split(' ')[0] + " side?")}
                        </span>
                        <svg className="text-[#363434] w-[clamp(0.37rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      {isBoundaryDropdownOpen && (
                        <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                          {["Land", "Road", "Water Body", "Tress", "Other"].map((opt) => (
                            <div className={`p-[clamp(0.4rem,_0.83vw,_1rem)_clamp(0.6rem,_1.25vw,_1.25rem)] font-['Inter',_sans-serif] text-[clamp(0.47rem,_0.97vw,_1rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${boundaryTypeValue === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt} onClick={() => { onBoundaryTypeChange?.(opt); setIsBoundaryDropdownOpen(false); }}>
                              {opt === "Tress" ? "Trees" : opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {boundaryTypeValue === "Land" && (
                    <div className="flex flex-col gap-[clamp(0.37rem,_0.78vw,_0.94rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                        Owner details of land
                      </span>
                      <div className="flex flex-col items-start gap-[clamp(0.23rem,_0.47vw,_0.56rem)] w-full">
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.56rem,_1.17vw,_1.41rem)] leading-[clamp(0.68rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                          Name
                        </span>
                        <div className="box-border w-full h-[clamp(1.69rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px]">
                          <input className="w-full h-full bg-transparent border-none pl-[clamp(0.45rem,_0.94vw,_1.13rem)] pr-[clamp(0.45rem,_0.94vw,_1.13rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.56rem,_1.17vw,_1.41rem)] outline-none box-border" type="text" placeholder="Krishna" value={boundaryOwnerNameValue} onChange={(e) => onBoundaryOwnerNameChange?.(e.target.value)} />
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[clamp(0.23rem,_0.47vw,_0.56rem)] w-full">
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.56rem,_1.17vw,_1.41rem)] leading-[clamp(0.68rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                          Age
                        </span>
                        <div className="box-border w-full h-[clamp(1.69rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px]">
                          <input className="w-full h-full bg-transparent border-none pl-[clamp(0.45rem,_0.94vw,_1.13rem)] pr-[clamp(0.45rem,_0.94vw,_1.13rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.56rem,_1.17vw,_1.41rem)] outline-none box-border" type="text" placeholder="43" value={boundaryOwnerAgeValue} onChange={(e) => onBoundaryOwnerAgeChange?.(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}
                  {boundaryTypeValue === "Road" && (
                    <div className="flex flex-col gap-[clamp(0.37rem,_0.78vw,_0.94rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                        Type of Road
                      </span>
                      <div className="flex flex-row items-center gap-[clamp(0.6rem,_1.25vw,_1.5rem)] w-full">
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.29rem,_0.6vw,_0.8rem)_clamp(0.6rem,_1.25vw,_1.5rem)] rounded-[33px] cursor-pointer outline-none transition-[all_0.2s] ${boundaryRoadTypeValue === "Private Road" ? "border border-[#2780C4]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${boundaryRoadTypeValue === "Private Road" ? "bg-[#2780C4]" : "bg-transparent"}`.trim()} type="button" onClick={() => onBoundaryRoadTypeChange?.("Private Road")}>
                          <div className="flex flex-row items-center gap-[8px]">
                            <div className={`box-border w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center ${boundaryRoadTypeValue === "Private Road" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#85BFE5]"}`.trim()}>
                              {boundaryRoadTypeValue === "Private Road" && <div className="w-[4px] h-[4px] bg-[#2780C4] rounded-full" />}
                            </div>
                            <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.1rem)] ${boundaryRoadTypeValue === "Private Road" ? "text-white" : "text-black"}`.trim()}>Private Road</span>
                          </div>
                        </button>
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.29rem,_0.6vw,_0.8rem)_clamp(0.6rem,_1.25vw,_1.5rem)] rounded-[33px] cursor-pointer outline-none transition-[all_0.2s] ${boundaryRoadTypeValue === "Government Road" ? "border border-[#2780C4]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${boundaryRoadTypeValue === "Government Road" ? "bg-[#2780C4]" : "bg-transparent"}`.trim()} type="button" onClick={() => onBoundaryRoadTypeChange?.("Government Road")}>
                          <div className="flex flex-row items-center gap-[8px]">
                            <div className={`box-border w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center ${boundaryRoadTypeValue === "Government Road" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#85BFE5]"}`.trim()}>
                              {boundaryRoadTypeValue === "Government Road" && <div className="w-[4px] h-[4px] bg-[#2780C4] rounded-full" />}
                            </div>
                            <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.1rem)] ${boundaryRoadTypeValue === "Government Road" ? "text-white" : "text-black"}`.trim()}>Government Road</span>
                          </div>
                        </button>
                      </div>
                      <div className="flex flex-col items-start gap-[clamp(0.23rem,_0.47vw,_0.56rem)] w-full">
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.56rem,_1.17vw,_1.41rem)] leading-[clamp(0.68rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                          Width of the Road <span className="text-[rgba(0,_0,_0,_0.4)]">(in Feet)</span>
                        </span>
                        <div className="box-border w-full h-[clamp(1.69rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px]">
                          <input className="w-full h-full bg-transparent border-none pl-[clamp(0.45rem,_0.94vw,_1.13rem)] pr-[clamp(0.45rem,_0.94vw,_1.13rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.56rem,_1.17vw,_1.41rem)] outline-none box-border" type="text" placeholder="100" value={boundaryRoadWidthValue} onChange={(e) => onBoundaryRoadWidthChange?.(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}
                  {boundaryTypeValue === "Tress" && (
                    <div className="flex flex-col gap-[clamp(0.37rem,_0.78vw,_0.94rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.56rem,_1.17vw,_1.41rem)] leading-[clamp(0.68rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                        Trees Count
                      </span>
                      <div className="relative w-full">
                        <button className="box-border w-full h-[clamp(1.69rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] flex items-center justify-between pl-[clamp(0.45rem,_0.94vw,_1.13rem)] pr-[clamp(0.45rem,_0.94vw,_1.13rem)] cursor-pointer outline-none" type="button" onClick={() => setIsBoundaryTreesDropdownOpen(!isBoundaryTreesDropdownOpen)}>
                          <span className={`font-['Inter',_sans-serif] font-normal text-[clamp(0.53rem,_1.11vw,_1.25rem)] ${boundaryTreesCountValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                            {boundaryTreesCountValue || "1 - 10"}
                          </span>
                          <svg className="text-[#363434] w-[clamp(0.37rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {isBoundaryTreesDropdownOpen && (
                          <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                            {["1 - 10", "11 - 50", "51 - 100", "100+"].map((opt) => (
                              <div className={`p-[clamp(0.4rem,_0.83vw,_1rem)_clamp(0.6rem,_1.25vw,_1.25rem)] font-['Inter',_sans-serif] text-[clamp(0.47rem,_0.97vw,_1rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${boundaryTreesCountValue === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt} onClick={() => { onBoundaryTreesCountChange?.(opt); setIsBoundaryTreesDropdownOpen(false); }}>
                                {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : activeTabLabel === "Any Existing Trees" ? (
                <div className="w-full flex flex-col gap-[clamp(0.93rem,_1.94vw,_2.33rem)]">
                  <div className="flex flex-col items-start gap-[clamp(0.6rem,_1.25vw,_1.5rem)] w-full">
                    <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                      Any Existing Tress available surrounding land?
                    </span>
                    <div className="flex flex-row items-center gap-[clamp(0.83rem,_1.73vw,_2.08rem)]">
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4rem,_8.33vw,_10.0rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${treesAvailabilityValue === "available" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${treesAvailabilityValue === "available" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => { onTreesAvailabilityChange?.("available"); }}>
                        <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${treesAvailabilityValue === "available" ? "bg-[#BDD327]" : "bg-white"} ${treesAvailabilityValue === "available" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${treesAvailabilityValue === "available" ? "text-white" : "text-black"}`.trim()}>
                          Available
                        </span>
                      </button>
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4.9rem,_10.2vw,_12.25rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${treesAvailabilityValue === "not-available" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${treesAvailabilityValue === "not-available" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => { onTreesAvailabilityChange?.("not-available"); onTreesCountChange?.(""); }}>
                        <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${treesAvailabilityValue === "not-available" ? "bg-[#BDD327]" : "bg-white"} ${treesAvailabilityValue === "not-available" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${treesAvailabilityValue === "not-available" ? "text-white" : "text-black"}`.trim()}>
                          Not Available
                        </span>
                      </button>
                    </div>
                  </div>
                  {treesAvailabilityValue === "available" && (
                    <div className="flex flex-col items-start gap-[clamp(0.27rem,_0.56vw,_0.68rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.53rem,_1.1vw,_1.3rem)] leading-[clamp(0.67rem,_1.39vw,_1.67rem)] text-[rgba(0,_0,_0,_0.6)]">
                        Trees count
                      </span>
                      <div className="relative w-full">
                        <button className="box-border w-full h-[clamp(1.8rem,_3.75vw,_4.5rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] flex items-center justify-between pl-[clamp(0.53rem,_1.1vw,_1.3rem)] pr-[clamp(0.53rem,_1.1vw,_1.3rem)] cursor-pointer outline-none" type="button" onClick={() => setIsTreesCountDropdownOpen(!isTreesCountDropdownOpen)}>
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.53rem,_1.1vw,_1.3rem)] ${treesCountValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                            {treesCountValue === "1-5" ? "1 - 5 trees" : treesCountValue === "6-10" ? "6 - 10 trees" : treesCountValue === "11-20" ? "11 - 20 trees" : treesCountValue === "20+" ? "20+ trees" : "Select tree count..."}
                          </span>
                          <svg className="text-[#363434] w-[clamp(0.37rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {isTreesCountDropdownOpen && (
                          <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                            {[
                              { label: "1 - 5 trees", value: "1-5" },
                              { label: "6 - 10 trees", value: "6-10" },
                              { label: "11 - 20 trees", value: "11-20" },
                              { label: "20+ trees", value: "20+" },
                            ].map((opt) => (
                              <div className={`p-[clamp(0.4rem,_0.83vw,_1rem)_clamp(0.53rem,_1.1vw,_1.3rem)] font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.53rem,_1.1vw,_1.3rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${treesCountValue === opt.value ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt.value} onClick={() => { onTreesCountChange?.(opt.value); setIsTreesCountDropdownOpen(false); }}>
                                {opt.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : activeTabLabel === "Water and Electricity Facility" ? (
                <div className="w-full flex flex-col gap-[clamp(1rem,_2.08vw,_2.5rem)]">
                  <div className="flex flex-col items-start gap-[clamp(0.6rem,_1.25vw,_1.5rem)] w-full">
                    <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.67rem,_1.39vw,_1.67rem)] leading-[clamp(0.83rem,_1.73vw,_2.08rem)] text-black">
                      Select availability Facility
                    </span>
                    <div className="flex flex-row items-center gap-[clamp(0.6rem,_1.25vw,_1.5rem)]">
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(5rem,_10.42vw,_12.5rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${facilityAvailabilityValue === "water" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${facilityAvailabilityValue === "water" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onFacilityAvailabilityChange?.("water")}>
                        <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${facilityAvailabilityValue === "water" ? "bg-[#BDD327]" : "bg-white"} ${facilityAvailabilityValue === "water" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${facilityAvailabilityValue === "water" ? "text-white" : "text-black"}`.trim()}>
                          Water Facility
                        </span>
                      </button>
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(5.93rem,_12.36vw,_14.83rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${facilityAvailabilityValue === "electricity" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${facilityAvailabilityValue === "electricity" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onFacilityAvailabilityChange?.("electricity")}>
                        <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${facilityAvailabilityValue === "electricity" ? "bg-[#BDD327]" : "bg-white"} ${facilityAvailabilityValue === "electricity" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${facilityAvailabilityValue === "electricity" ? "text-white" : "text-black"}`.trim()}>
                          Electricity Facility
                        </span>
                      </button>
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(3.03rem,_6.32vw,_7.58rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${facilityAvailabilityValue === "both" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${facilityAvailabilityValue === "both" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onFacilityAvailabilityChange?.("both")}>
                        <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${facilityAvailabilityValue === "both" ? "bg-[#BDD327]" : "bg-white"} ${facilityAvailabilityValue === "both" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${facilityAvailabilityValue === "both" ? "text-white" : "text-black"}`.trim()}>
                          Both
                        </span>
                      </button>
                    </div>
                  </div>
                  {(facilityAvailabilityValue === "water" || facilityAvailabilityValue === "both") && (
                    <div className="flex flex-col items-start gap-[clamp(0.6rem,_1.25vw,_1.5rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.67rem,_1.39vw,_1.67rem)] leading-[clamp(0.83rem,_1.73vw,_2.08rem)] text-black">
                        Select Water Facility
                      </span>
                      <div className="flex flex-row items-center gap-[clamp(0.6rem,_1.25vw,_1.5rem)]">
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(3.03rem,_6.32vw,_7.58rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${waterFacilityValue === "bore" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${waterFacilityValue === "bore" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onWaterFacilityChange?.("bore")}>
                          <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${waterFacilityValue === "bore" ? "bg-[#BDD327]" : "bg-white"} ${waterFacilityValue === "bore" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${waterFacilityValue === "bore" ? "text-white" : "text-black"}`.trim()}>
                            Bore
                          </span>
                        </button>
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4rem,_8.33vw,_10.0rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${waterFacilityValue === "municipal" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${waterFacilityValue === "municipal" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onWaterFacilityChange?.("municipal")}>
                          <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${waterFacilityValue === "municipal" ? "bg-[#BDD327]" : "bg-white"} ${waterFacilityValue === "municipal" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${waterFacilityValue === "municipal" ? "text-white" : "text-black"}`.trim()}>
                            Muncipal
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                  {(facilityAvailabilityValue === "electricity" || facilityAvailabilityValue === "both") && (
                    <div className="flex flex-col items-start gap-[clamp(0.6rem,_1.25vw,_1.5rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.67rem,_1.39vw,_1.67rem)] leading-[clamp(0.83rem,_1.73vw,_2.08rem)] text-black">
                        Select Electricity Facility
                      </span>
                      <div className="flex flex-row items-center gap-[clamp(0.6rem,_1.25vw,_1.5rem)]">
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(3.67rem,_7.64vw,_9.17rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${electricityFacilityValue === "2phase" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${electricityFacilityValue === "2phase" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onElectricityFacilityChange?.("2phase")}>
                          <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${electricityFacilityValue === "2phase" ? "bg-[#BDD327]" : "bg-white"} ${electricityFacilityValue === "2phase" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${electricityFacilityValue === "2phase" ? "text-white" : "text-black"}`.trim()}>
                            2 Phase
                          </span>
                        </button>
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.33rem,_0.69vw,_0.83rem)_clamp(0.6rem,_1.25vw,_1.5rem)] gap-[clamp(0.33rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(3.7rem,_7.71vw,_9.25rem)] h-[clamp(1.27rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${electricityFacilityValue === "3phase" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${electricityFacilityValue === "3phase" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onElectricityFacilityChange?.("3phase")}>
                          <div className={`box-border w-[clamp(0.4rem,_0.83vw,_1.0rem)] h-[clamp(0.4rem,_0.83vw,_1.0rem)] rounded-full ${electricityFacilityValue === "3phase" ? "bg-[#BDD327]" : "bg-white"} ${electricityFacilityValue === "3phase" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] whitespace-nowrap ${electricityFacilityValue === "3phase" ? "text-white" : "text-black"}`.trim()}>
                            3 Phase
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span className="w-full h-[clamp(1rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] not-italic font-semibold text-[clamp(0.8rem,_1.67vw,_2.01rem)] leading-[clamp(1rem,_2.08vw,_2.5rem)] text-black">
                    Shape of the Land
                  </span>
                  <div className="relative w-full">
                    <button className="box-border w-full h-[clamp(1.69rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] flex items-center justify-between pl-[clamp(0.48rem,_1vw,_1.5rem)] pr-[clamp(0.48rem,_1vw,_1.5rem)] cursor-pointer outline-none" type="button" onClick={() => setIsLandShapeDropdownOpen(!isLandShapeDropdownOpen)}>
                      <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.53rem,_1.11vw,_1.25rem)] ${landShapeValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                        {landShapeValue || "Select shape..."}
                      </span>
                      <svg className="text-[#363434] w-[clamp(0.37rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {isLandShapeDropdownOpen && (
                      <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                        {["Square", "Rectangle", "Triangle", "Trapezoid", "Irregular"].map((opt) => (
                          <div className={`p-[clamp(0.4rem,_0.83vw,_1rem)_clamp(0.48rem,_1vw,_1.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.53rem,_1.11vw,_1.25rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${landShapeValue === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt} onClick={() => { onLandShapeChange?.(opt); setIsLandShapeDropdownOpen(false); }}>
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="absolute w-[50.15%] h-[clamp(11.83rem,_24.65vw,_29.58rem)] left-[1.32%] top-[clamp(2.43rem,_5.07vw,_6.08rem)] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.15)] rounded-[24px] box-border bg-white">
              <UploadFile
                uploadedFiles={uploadedFiles}
                onFileUpload={(filesList) => {
                  if (activeTabLabel === "Land Images") {
                    onFileUpload(filesList, "land");
                  } else {
                    onFileUpload(filesList);
                  }
                }}
                onFileDelete={onFileDelete}
                onUploadClick={activeTabLabel === "Land Images" ? () => setShowChooseImageModal(true) : undefined}
                groupByImageType={activeTabLabel === "Land Images"}
              />
            </div>
          )}
        </>
      )}

      {activeTabLabel !== "Survey Report" && (
        <div className="absolute w-[45.44%] h-[clamp(6.03rem,_12.57vw,_15.08rem)] left-[52.65%] top-[clamp(2.43rem,_5.07vw,_6.08rem)]">
          <Comments
            commentValue={commentValue}
            onCommentChange={onCommentChange}
            activeTabLabel={activeTabLabel}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={`absolute w-[15.59%] h-[clamp(1.27rem,_2.64vw,_3.17rem)] left-[auto] right-[1.91%] box-border rounded-[24px] bg-white ${activeTabLabel === "Survey Report" ? (surveyReportTypeValue === "both" ? "top-[clamp(56.03rem,_41.035rem_+_31.25vw,_78.66rem)]" : "top-[clamp(35.75rem,_21.16rem_+_30.4vw,_57.66rem)]") : "top-[clamp(12.63rem,_26.32vw,_31.58rem)]"}`.trim()}>
        <button type="button" onClick={onPrevTab} className="hover:bg-red-50/20 active:scale-95 transition-all box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] text-[clamp(0.47rem,_0.97vw,_1.17rem)] leading-[clamp(0.6rem,_1.25vw,_1.5rem)] bg-transparent flex items-center justify-center font-['Outfit',_sans-serif] font-medium text-[rgba(0,_0,_0,_0.8)] border border-[rgba(205,_0,_0,_0.27)] cursor-pointer">
          Back
        </button>

        <button type="button" onClick={onNextTab} className="hover:scale-105 active:scale-95 transition-all absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] rounded-[57px] text-[clamp(0.43rem,_0.9vw,_1.09rem)] leading-[clamp(0.53rem,_1.1vw,_1.33rem)] border-none flex items-center justify-center font-['Outfit',_sans-serif] font-normal text-white cursor-pointer">
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
