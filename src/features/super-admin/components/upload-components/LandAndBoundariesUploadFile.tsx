import React, { useRef, useState, useEffect } from "react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

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
  const privateFileInputRef = useRef<HTMLInputElement>(null);
  const govtFileInputRef = useRef<HTMLInputElement>(null);

  const [showChooseImageModal, setShowChooseImageModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [privateDragActive, setPrivateDragActive] = useState(false);
  const [govtDragActive, setGovtDragActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [isBoundaryDropdownOpen, setIsBoundaryDropdownOpen] = useState(false);
  const [isBoundaryTreesDropdownOpen, setIsBoundaryTreesDropdownOpen] = useState(false);
  const [isTreesCountDropdownOpen, setIsTreesCountDropdownOpen] = useState(false);
  const [isLandShapeDropdownOpen, setIsLandShapeDropdownOpen] = useState(false);
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
      if (activeTabLabel === "Land Images") {
        onFileUpload(e.dataTransfer.files, "land");
      } else {
        onFileUpload(e.dataTransfer.files);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files);
    }
  };

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

  const triggerUploadClick = () => {
    if (activeTabLabel === "Land Images") {
      setShowChooseImageModal(true);
    } else {
      fileInputRef.current?.click();
    }
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

  // Survey Reports Drag & Drop handlers
  const handlePrivateDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setPrivateDragActive(true);
    } else if (e.type === "dragleave") {
      setPrivateDragActive(false);
    }
  };

  const handlePrivateDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPrivateDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onPrivateSurveyFileUpload?.(e.dataTransfer.files);
    }
  };

  const handleGovtDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setGovtDragActive(true);
    } else if (e.type === "dragleave") {
      setGovtDragActive(false);
    }
  };

  const handleGovtDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setGovtDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onGovernmentSurveyFileUpload?.(e.dataTransfer.files);
    }
  };

  const handlePrivateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPrivateSurveyFileUpload?.(e.target.files);
    }
  };

  const handleGovtFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onGovernmentSurveyFileUpload?.(e.target.files);
    }
  };

  const isBoundaryTab =
    activeTabLabel === "East Boundaries" ||
    activeTabLabel === "West Boundaries" ||
    activeTabLabel === "North Boundaries" ||
    activeTabLabel === "South Boundaries";

  const renderUploaderBox = (type: "private" | "government") => {
    const isPrivate = type === "private";
    const dragActiveState = isPrivate ? privateDragActive : govtDragActive;
    const handleDragFn = isPrivate ? handlePrivateDrag : handleGovtDrag;
    const handleDropFn = isPrivate ? handlePrivateDrop : handleGovtDrop;
    const inputRef = isPrivate ? privateFileInputRef : govtFileInputRef;
    const changeHandler = isPrivate ? handlePrivateFileChange : handleGovtFileChange;
    const files = isPrivate ? privateSurveyFiles : governmentSurveyFiles;
    const deleteHandler = isPrivate ? onPrivateSurveyFileDelete : onGovernmentSurveyFileDelete;

    return (
      <div className="relative w-full max-w-[clamp(30.31rem,_47.36vw,_56.83rem)] h-[clamp(15.78rem,_24.65vw,_29.58rem)] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.15)] rounded-[24px] box-border bg-white">
        <div className={`box-border absolute w-[41.2%] h-[clamp(14.53rem,_22.7vw,_27.24rem)] left-[1.76%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[12px] border-[2px] border-dashed border-[rgba(225,_229,_239,_0.6)] transition-[all_0.2s_ease] cursor-pointer ${dragActiveState ? "bg-[rgba(243,_244,_241,_0.6)]" : "bg-[rgba(242,_244,_246,_0.5)]"}`.trim()} onDragEnter={handleDragFn} onDragOver={handleDragFn} onDragLeave={handleDragFn} onDrop={handleDropFn} onClick={() => inputRef.current?.click()}>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={changeHandler}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
          />

          <div className="absolute w-[clamp(2.14rem,_3.34vw,_4.01rem)] h-[clamp(2.14rem,_3.34vw,_4.01rem)] left-[calc(50%_-_clamp(2.14rem,_3.34vw,_4.01rem)/2)] top-[clamp(2.58rem,_4.03vw,_4.83rem)] rounded-full flex items-center justify-center bg-[#E6EEAD]">
            <div className="absolute w-[clamp(1.72rem,_2.69vw,_3.22rem)] h-[clamp(1.72rem,_2.69vw,_3.22rem)] left-[calc(50%_-_clamp(1.72rem,_2.69vw,_3.22rem)/2)] top-[calc(50%_-_clamp(1.72rem,_2.69vw,_3.22rem)/2)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.25)] rounded-full flex items-center justify-center">
              <svg className="absolute w-[clamp(0.89rem,_1.39vw,_1.67rem)] h-[clamp(0.89rem,_1.39vw,_1.67rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="15" x2="12" y2="3" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="5" y1="21" x2="19" y2="21" />
              </svg>
            </div>
          </div>

          <span className="absolute w-[clamp(2.84rem,_4.44vw,_5.33rem)] h-[clamp(1.02rem,_1.6vw,_1.92rem)] left-[calc(50%_-_clamp(2.84rem,_4.44vw,_5.33rem)/2)] top-[clamp(5.39rem,_8.42vw,_10.1rem)] text-[clamp(0.8rem,_1.25vw,_1.5rem)] leading-[clamp(1.02rem,_1.6vw,_1.92rem)] flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[#1A1C1D] text-center">
            Upload
          </span>

          <span className="absolute w-[80%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[10%] top-[clamp(6.72rem,_10.5vw,_12.6rem)] text-[clamp(0.53rem,_0.83vw,_1.0rem)] leading-[clamp(0.67rem,_1.04vw,_1.25rem)] flex items-center justify-center font-['Inter',_sans-serif] font-normal text-[#414755] text-center">
            Drag and drop your files here or click to browse your computer.
          </span>

          <button type="button" className="hover:scale-105 active:scale-95 transition-all absolute w-[clamp(4.44rem,_6.94vw,_8.33rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] left-[calc(50%_-_clamp(4.44rem,_6.94vw,_8.33rem)/2)] top-[clamp(9.33rem,_14.58vw,_17.5rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.12)] rounded-[57px] border-none flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer">
            <span className="text-[clamp(0.53rem,_0.83vw,_1.0rem)] text-white">
              Choose File
            </span>
          </button>

          <div className="absolute w-[clamp(3.29rem,_5.14vw,_6.17rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] left-[clamp(0.89rem,_1.39vw,_1.67rem)] top-[clamp(13.29rem,_20.76vw,_24.92rem)] flex items-center gap-[4px]">
            <svg className="w-[clamp(0.44rem,_0.63vw,_0.83rem)] h-[clamp(0.44rem,_0.63vw,_0.83rem)] text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
              <path d="M8.5 1.5v3h3" />
            </svg>
            <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.63vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
              Format:&nbsp;
              <strong className="font-medium">PDF</strong>
            </span>
          </div>

          <div className="absolute w-[clamp(4.18rem,_6.53vw,_7.83rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(13.2rem,_20.63vw,_24.75rem)] flex items-center justify-end">
            <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.63vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
              Max File Size:&nbsp;
              <strong className="font-medium">10MB</strong>
            </span>
          </div>
        </div>

        <div className="absolute w-[41.06%] h-[clamp(7.56rem,_11.81vw,_14.17rem)] left-[45.75%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] flex flex-col items-start gap-[clamp(0.76rem,_1.18vw,_1.42rem)]">
          <h4 className="w-full h-[clamp(1.11rem,_1.74vw,_2.08rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-black m-0">
            Uploaded Files
          </h4>

          <div className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar h-[clamp(5.69rem,_8.89vw,_10.67rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)]">
            {files.length === 0 ? (
              <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1">No files uploaded yet.</span>
            ) : (
              files.map((file) => (
                <div key={file.id} className="relative w-full shrink-0 h-[clamp(2.62rem,_4.1vw,_4.92rem)] bg-[#F6F9E2] rounded-[12px] mb-[4px]">
                  <div className="absolute w-[clamp(1.29rem,_2.01vw,_2.42rem)] h-[clamp(1.29rem,_2.01vw,_2.42rem)] left-[clamp(0.4rem,_0.63vw,_0.75rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[4px] flex items-center justify-center bg-white">
                    <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 9H5v-1h6v1zm0-2H5V8h6v1zm0-2H5V6h6v1z" fill="#BDD327"/>
                    </svg>
                  </div>

                  <div className="flex flex-col justify-center absolute left-[clamp(2.04rem,_3.19vw,_3.83rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] w-[50%] h-[clamp(1.33rem,_2.08vw,_2.5rem)]">
                    <span className="truncate text-black font-['Inter',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.76rem,_1.18vw,_1.42rem)] block">
                      {file.name}
                    </span>
                    <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.36rem,_0.56vw,_0.67rem)] leading-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[rgba(0,_0,_0,_0.7)]">
                      {file.size}
                    </span>
                  </div>

                  <button type="button" onClick={(e) => { e.stopPropagation(); deleteHandler?.(file.id); }} className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,_1.74vw,_2.08rem)] h-[clamp(1.11rem,_1.74vw,_2.08rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(0.67rem,_1.04vw,_1.25rem)] rounded-[2px] border-none">
                    <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.82)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    );
  };

  const renderCommentBox = (type: "private" | "government") => {
    const isPrivate = type === "private";
    const commentVal = isPrivate ? privateSurveyCommentValue : governmentSurveyCommentValue;
    const changeHandler = isPrivate ? onPrivateSurveyCommentChange : onGovernmentSurveyCommentChange;

    const handleSurveyVoiceInput = () => {
      if (!isListening) {
        setIsListening(true);
        const targetType = isPrivate ? "Private" : "Government";
        const mockDictation = " This is a voice-dictated comment for " + targetType + " Survey Report.";
        setTimeout(() => {
          changeHandler?.(commentVal + mockDictation);
          setIsListening(false);
        }, 2000);
      }
    };

    return (
      <div className="relative w-full max-w-[clamp(27.46rem,_42.91vw,_51.49rem)] h-[clamp(9.96rem,_15.56vw,_18.68rem)] box-border">
        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black block mb-[clamp(0.58rem,_0.91vw,_1.09rem)]">
          Add Comments
        </span>

        <div className="relative w-full h-[clamp(8.04rem,_12.56vw,_15.08rem)] box-border">
          <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,_238,_173,_0.15)] border border-[#E6EEAD] rounded-[18px] z-[0]" />

          <textarea className="absolute w-[91.59%] h-[clamp(3.73rem,_5.83vw,_7.0rem)] left-[4.21%] top-[clamp(1.07rem,_1.67vw,_2.0rem)] font-['Poppins',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.93rem,_1.46vw,_1.75rem)] z-[1] bg-transparent resize-none border-none outline-none text-black" value={commentVal} onChange={(e) => changeHandler?.(e.target.value)} placeholder="Write a comment" />

          <button type="button" onClick={handleSurveyVoiceInput} className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${ isListening ? "bg-red-600 animate-pulse" : "" } absolute w-[clamp(1.42rem,_2.22vw,_2.67rem)] h-[clamp(1.42rem,_2.22vw,_2.67rem)] right-[clamp(0.62rem,_0.97vw,_1.17rem)] top-[clamp(6.0rem,_9.38vw,_11.25rem)] border-none z-[1] ${isListening ? "bg-[#dc2626]" : "bg-[#2D3509]"}`.trim()}>
            <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className={`absolute rounded-[24px] box-border bg-white select-none ${className} left-[clamp(1.77rem,_2.78vw,_3.33rem)] right-[clamp(1.77rem,_2.78vw,_3.33rem)] top-[clamp(26rem,_40.63vw,_48.75rem)] ${activeTabLabel === "Survey Report" ? (surveyReportTypeValue === "both" ? "h-[clamp(64rem,_43.875rem_+_31.25vw,_81.5rem)]" : "h-[clamp(43.5rem,_24rem_+_30.4vw,_60.5rem)]") : "h-[clamp(19.68rem,_30.76vw,_36.91rem)]"}`.trim()} style={style}>
      {/* ── Choose Image Type Modal for Land Images ── */}
      {showChooseImageModal && (
        <div
          onClick={() => setShowChooseImageModal(false)}
          className="z-[99999] fixed inset-0 bg-black/40 flex items-center justify-center select-none"
        >
          {/* Modal content: Frame 2147239896 */}
          <div className="box-border relative w-[clamp(27rem,_42.19vw,_50.625rem)] h-[clamp(16.75rem,_26.17vw,_31.41rem)] bg-white border border-[rgba(0,_0,_0,_0.1)] shadow-[0px_0px_12.5px_rgba(0,_0,_0,_0.1)] rounded-[24px] flex flex-col items-center justify-start p-[clamp(1rem,_1.56vw,_1.875rem)]" onClick={(e) => e.stopPropagation()}>
            {/* Title: Choose upload Image */}
            <h3 className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.06rem,_1.66vw,_1.99rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black m-0 self-start pl-[clamp(0.8rem,_1.25vw,_1.5rem)] mb-[clamp(1.5rem,_2.34vw,_2.81rem)]">
              Choose upload Image
            </h3>

            {/* Grid container for left and right cards */}
            <div className="flex flex-row gap-[clamp(1.5rem,_2.34vw,_2.81rem)] justify-center w-full">
              {/* Left card: Cover Image */}
              <div className="box-border w-[clamp(10.6rem,_16.56vw,_19.875rem)] h-[clamp(10rem,_15.63vw,_18.75rem)] bg-white shadow-[0px_0px_7.3px_rgba(0,_0,_0,_0.08)] rounded-[12px] relative flex flex-col items-center">
                {/* Title: Cover Image */}
                <span className="absolute top-[clamp(1.5rem,_2.34vw,_2.81rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.88rem,_1.38vw,_1.65rem)] leading-[clamp(1.1rem,_1.72vw,_2.06rem)] text-black">
                  Cover Image
                </span>

                {/* Icon Stack */}
                <div className="absolute w-[clamp(2.14rem,_3.34vw,_4.01rem)] h-[clamp(2.14rem,_3.34vw,_4.01rem)] top-[clamp(4.1rem,_6.41vw,_7.69rem)] rounded-[6030.65px] flex items-center justify-center bg-[#E6EEAD]">
                  <div className="w-[clamp(1.72rem,_2.69vw,_3.23rem)] h-[clamp(1.72rem,_2.69vw,_3.23rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.15)] rounded-[6030.65px] flex items-center justify-center relative">
                    <svg className="w-[clamp(0.89rem,_1.39vw,_1.67rem)] h-[clamp(0.89rem,_1.39vw,_1.67rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>

                {/* Upload Button */}
                <button type="button" onClick={() => coverImageInputRef.current?.click()} className="hover:scale-105 active:scale-95 transition-all absolute w-[clamp(7rem,_10.93vw,_13.125rem)] h-[clamp(1.69rem,_2.63vw,_3.16rem)] bottom-[clamp(0.8rem,_1.25vw,_1.5rem)] top-[168px] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.05)] rounded-[57px] border-none flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.62rem,_0.97vw,_1.16rem)] text-white">
                    Upload
                  </span>
                </button>
              </div>

              {/* Right card: Land Images */}
              <div className="box-border w-[clamp(10.6rem,_16.56vw,_19.875rem)] h-[clamp(10rem,_15.63vw,_18.75rem)] bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.1)] rounded-[12px] relative flex flex-col items-center">
                {/* Title: Land Images */}
                <span className="absolute top-[clamp(1.5rem,_2.34vw,_2.81rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.88rem,_1.38vw,_1.65rem)] leading-[clamp(1.1rem,_1.72vw,_2.06rem)] text-[rgba(0,_0,_0,_0.82)]">
                  Land Images
                </span>

                {/* Icon Stack */}
                <div className="absolute w-[clamp(2.14rem,_3.34vw,_4.01rem)] h-[clamp(2.14rem,_3.34vw,_4.01rem)] top-[clamp(4.1rem,_6.41vw,_7.69rem)] rounded-[6030.65px] flex items-center justify-center bg-[#E6EEAD]">
                  <div className="w-[clamp(1.72rem,_2.69vw,_3.23rem)] h-[clamp(1.72rem,_2.69vw,_3.23rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.15)] rounded-[6030.65px] flex items-center justify-center relative">
                    <svg className="w-[clamp(0.89rem,_1.39vw,_1.67rem)] h-[clamp(0.89rem,_1.39vw,_1.67rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>

                {/* Upload Button */}
                <button type="button" onClick={() => landImagesInputRef.current?.click()} className="hover:scale-105 active:scale-95 transition-all absolute w-[clamp(7rem,_10.93vw,_13.125rem)] h-[clamp(1.69rem,_2.63vw,_3.16rem)] bottom-[clamp(0.8rem,_1.25vw,_1.5rem)] top-[168px] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.05)] rounded-[57px] border-none flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.62rem,_0.97vw,_1.16rem)] text-white">
                    Upload
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inputs for image uploader */}
      <input
        ref={coverImageInputRef}
        type="file"
        multiple
        onChange={handleCoverImageChange}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg"
      />
      <input
        ref={landImagesInputRef}
        type="file"
        multiple
        onChange={handleLandImagesChange}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg"
      />

      {/* Add Comments Title */}
      {activeTabLabel !== "Survey Report" && (
        <h3 className="absolute w-[13.38%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[52.65%] top-[clamp(1.33rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
          Add Comments
        </h3>
      )}

      {activeTabLabel === "Survey Report" ? (
        <div className="absolute inset-0 p-[clamp(1.33rem,_2.08vw,_2.5rem)] box-border flex flex-col items-start">
          <div className="flex flex-col items-start gap-[clamp(0.93rem,_1.46vw,_1.75rem)] w-full mb-[clamp(2.5rem,_3.91vw,_4.69rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
              Select Survey Report Type
            </span>

            <div className="flex flex-row items-center gap-[clamp(1.42rem,_2.22vw,_2.67rem)] flex-wrap">
              {/* Private Survey Report Pill */}
              <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[10px] w-auto min-w-[clamp(9.07rem,_14.17vw,_17rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${surveyReportTypeValue === "private" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${surveyReportTypeValue === "private" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onSurveyReportTypeChange?.("private")}>
                <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${surveyReportTypeValue === "private" ? "bg-[#BDD327]" : "bg-white"} ${surveyReportTypeValue === "private" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${surveyReportTypeValue === "private" ? "text-white" : "text-black"}`.trim()}>
                  Private Survey Report
                </span>
              </button>

              {/* Government Survey Report Pill */}
              <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[10px] w-auto min-w-[clamp(10.76rem,_16.8vw,_20.17rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${surveyReportTypeValue === "government" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${surveyReportTypeValue === "government" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onSurveyReportTypeChange?.("government")}>
                <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${surveyReportTypeValue === "government" ? "bg-[#BDD327]" : "bg-white"} ${surveyReportTypeValue === "government" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${surveyReportTypeValue === "government" ? "text-white" : "text-black"}`.trim()}>
                  Government Survey Report
                </span>
              </button>

              {/* Both Survey Reports Pill */}
              <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[10px] w-auto min-w-[clamp(8.71rem,_13.61vw,_16.33rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${surveyReportTypeValue === "both" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${surveyReportTypeValue === "both" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onSurveyReportTypeChange?.("both")}>
                <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${surveyReportTypeValue === "both" ? "bg-[#BDD327]" : "bg-white"} ${surveyReportTypeValue === "both" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${surveyReportTypeValue === "both" ? "text-white" : "text-black"}`.trim()}>
                  Both Survey Reports
                </span>
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col gap-[clamp(1.5rem,_2.34vw,_2.81rem)] overflow-visible pb-[clamp(4rem,_6.25vw,_7.5rem)]">
            {(surveyReportTypeValue === "private" || surveyReportTypeValue === "both") && (
              <div className="flex flex-row items-start gap-[clamp(0.75rem,_1.17vw,_1.41rem)] w-full">
                <div className="flex-[1_1_clamp(28rem,_43.75vw,_52.5rem)] flex flex-col gap-[clamp(0.62rem,_0.97vw,_1.17rem)]">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
                    Private Survey Report
                  </span>
                  {renderUploaderBox("private")}
                </div>

                {renderCommentBox("private")}
              </div>
            )}

            {(surveyReportTypeValue === "government" || surveyReportTypeValue === "both") && (
              <div className="flex flex-row items-start gap-[clamp(0.75rem,_1.17vw,_1.41rem)] w-full">
                <div className="flex-[1_1_clamp(28rem,_43.75vw,_52.5rem)] flex flex-col gap-[clamp(0.62rem,_0.97vw,_1.17rem)]">
                  <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
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
          <h3 className="absolute w-[9.56%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[2.21%] top-[clamp(1.33rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
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
            <div className={`absolute w-[47.06%] left-[1.32%] top-[clamp(1.33rem,_2.08vw,_2.5rem)] flex flex-col items-start gap-[clamp(0.4rem,_0.63vw,_0.5625rem)] z-[100] ${activeTabLabel === "Water and Electricity Facility" ? "h-[clamp(16.5rem,_23vw,_25rem)]" : (activeTabLabel === "Any Existing Trees" ? (treesAvailabilityValue === "available" ? "h-[clamp(12.5rem,_18.5vw,_20rem)]" : "h-[clamp(6.5rem,_10vw,_12rem)]") : (isBoundaryTab ? (boundaryTypeValue === "Land" ? "h-[clamp(17.5rem,_26.5vw,_30rem)]" : (boundaryTypeValue === "Road" ? "h-[clamp(14.5rem,_22.5vw,_26rem)]" : (boundaryTypeValue === "Tress" ? "h-[clamp(10rem,_14.5vw,_17rem)]" : "h-[clamp(4.5rem,_7.5vw,_9rem)]"))) : "h-[clamp(4rem,_6.74vw,_6.0625rem)]"))}`.trim()} ref={dropdownRef}>
              {isBoundaryTab ? (
                <div className="w-full flex flex-col gap-[clamp(0.6rem,_0.94vw,_1.125rem)]">
                  <div className="flex flex-col items-start gap-[clamp(0.4rem,_0.63vw,_0.75rem)] w-full">
                    <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
                      {activeTabLabel}
                    </span>
 
                    <div className="relative w-full">
                      <button className="box-border w-full h-[clamp(2.25rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] relative flex items-center justify-between pl-[clamp(0.6rem,_0.94vw,_1.13rem)] pr-[clamp(0.6rem,_0.94vw,_1.13rem)] cursor-pointer outline-none" type="button" onClick={() => setIsBoundaryDropdownOpen(!isBoundaryDropdownOpen)}>
                        <span className={`font-['Inter',_sans-serif] font-normal text-[clamp(0.75rem,_1.11vw,_1.25rem)] ${boundaryTypeValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                          {boundaryTypeValue || ("What is on the " + activeTabLabel.toLowerCase().split(' ')[0] + " side?")}
                        </span>
                        <svg className="text-[#363434] w-[clamp(0.5rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
 
                      {isBoundaryDropdownOpen && (
                        <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                          {["Land", "Road", "Water Body", "Tress", "Other"].map((opt) => (
                            <div className={`p-[clamp(0.5rem,_0.83vw,_1rem)_clamp(0.6rem,_1.25vw,_1.25rem)] font-['Inter',_sans-serif] text-[clamp(0.65rem,_0.97vw,_1rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${boundaryTypeValue === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt} onClick={() => { onBoundaryTypeChange?.(opt); setIsBoundaryDropdownOpen(false); }} onMouseEnter={(e) => { if (boundaryTypeValue !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (boundaryTypeValue !== opt) e.currentTarget.style.background = "transparent"; }}>
                              {opt === "Tress" ? "Trees" : opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {boundaryTypeValue === "Land" && (
                    <div className="flex flex-col gap-[clamp(0.5rem,_0.78vw,_0.94rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
                        Owner details of land
                      </span>

                      <div className="flex flex-col items-start gap-[clamp(0.3rem,_0.47vw,_0.56rem)] w-full">
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.75rem,_1.17vw,_1.41rem)] leading-[clamp(0.9rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                          Name
                        </span>
                        <div className="box-border w-full h-[clamp(2.25rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px]">
                          <input className="w-full h-full bg-transparent border-none pl-[clamp(0.6rem,_0.94vw,_1.13rem)] pr-[clamp(0.6rem,_0.94vw,_1.13rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.75rem,_1.17vw,_1.41rem)] outline-none box-border" type="text" placeholder="Krishna" value={boundaryOwnerNameValue} onChange={(e) => onBoundaryOwnerNameChange?.(e.target.value)} />
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-[clamp(0.3rem,_0.47vw,_0.56rem)] w-full">
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.75rem,_1.17vw,_1.41rem)] leading-[clamp(0.9rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                          Age
                        </span>
                        <div className="box-border w-full h-[clamp(2.25rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px]">
                          <input className="w-full h-full bg-transparent border-none pl-[clamp(0.6rem,_0.94vw,_1.13rem)] pr-[clamp(0.6rem,_0.94vw,_1.13rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.75rem,_1.17vw,_1.41rem)] outline-none box-border" type="text" placeholder="43" value={boundaryOwnerAgeValue} onChange={(e) => onBoundaryOwnerAgeChange?.(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}

                  {boundaryTypeValue === "Road" && (
                    <div className="flex flex-col gap-[clamp(0.5rem,_0.78vw,_0.94rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
                        Type of Road
                      </span>

                      <div className="flex flex-row items-center gap-[clamp(0.8rem,_1.25vw,_1.5rem)] w-full">
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.4rem,_0.6vw,_0.8rem)_clamp(0.8rem,_1.25vw,_1.5rem)] rounded-[33px] cursor-pointer outline-none transition-[all_0.2s] ${boundaryRoadTypeValue === "Private Road" ? "border border-[#2780C4]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${boundaryRoadTypeValue === "Private Road" ? "bg-[#2780C4]" : "bg-transparent"}`.trim()} type="button" onClick={() => onBoundaryRoadTypeChange?.("Private Road")}>
                          <div className="flex flex-row items-center gap-[8px]">
                            <div className={`box-border w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center ${boundaryRoadTypeValue === "Private Road" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#85BFE5]"}`.trim()}>
                              {boundaryRoadTypeValue === "Private Road" && (
                                <div className="w-[4px] h-[4px] bg-[#2780C4] rounded-full" />
                              )}
                            </div>
                            <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.65rem,_0.97vw,_1.1rem)] ${boundaryRoadTypeValue === "Private Road" ? "text-white" : "text-black"}`.trim()}>
                              Private Road
                            </span>
                          </div>
                        </button>

                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.4rem,_0.6vw,_0.8rem)_clamp(0.8rem,_1.25vw,_1.5rem)] rounded-[33px] cursor-pointer outline-none transition-[all_0.2s] ${boundaryRoadTypeValue === "Government Road" ? "border border-[#2780C4]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${boundaryRoadTypeValue === "Government Road" ? "bg-[#2780C4]" : "bg-transparent"}`.trim()} type="button" onClick={() => onBoundaryRoadTypeChange?.("Government Road")}>
                          <div className="flex flex-row items-center gap-[8px]">
                            <div className={`box-border w-[12px] h-[12px] bg-white rounded-full flex items-center justify-center ${boundaryRoadTypeValue === "Government Road" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#85BFE5]"}`.trim()}>
                              {boundaryRoadTypeValue === "Government Road" && (
                                <div className="w-[4px] h-[4px] bg-[#2780C4] rounded-full" />
                              )}
                            </div>
                            <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.65rem,_0.97vw,_1.1rem)] ${boundaryRoadTypeValue === "Government Road" ? "text-white" : "text-black"}`.trim()}>
                              Government Road
                            </span>
                          </div>
                        </button>
                      </div>

                      <div className="flex flex-col items-start gap-[clamp(0.3rem,_0.47vw,_0.56rem)] w-full">
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.75rem,_1.17vw,_1.41rem)] leading-[clamp(0.9rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                          Width of the Road <span className="text-[rgba(0,_0,_0,_0.4)]">(in Feet)</span>
                        </span>
                        <div className="box-border w-full h-[clamp(2.25rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px]">
                          <input className="w-full h-full bg-transparent border-none pl-[clamp(0.6rem,_0.94vw,_1.13rem)] pr-[clamp(0.6rem,_0.94vw,_1.13rem)] font-['Inter',_sans-serif] font-normal text-[clamp(0.75rem,_1.17vw,_1.41rem)] outline-none box-border" type="text" placeholder="100" value={boundaryRoadWidthValue} onChange={(e) => onBoundaryRoadWidthChange?.(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}

                  {boundaryTypeValue === "Tress" && (
                    <div className="flex flex-col gap-[clamp(0.5rem,_0.78vw,_0.94rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.75rem,_1.17vw,_1.41rem)] leading-[clamp(0.9rem,_1.41vw,_1.69rem)] text-[rgba(0,_0,_0,_0.6)]">
                        Trees Count
                      </span>

                      <div className="relative w-full">
                        <button className="box-border w-full h-[clamp(2.25rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] flex items-center justify-between pl-[clamp(0.6rem,_0.94vw,_1.13rem)] pr-[clamp(0.6rem,_0.94vw,_1.13rem)] cursor-pointer outline-none" type="button" onClick={() => setIsBoundaryTreesDropdownOpen(!isBoundaryTreesDropdownOpen)}>
                          <span className={`font-['Inter',_sans-serif] font-normal text-[clamp(0.75rem,_1.11vw,_1.25rem)] ${boundaryTreesCountValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                            {boundaryTreesCountValue || "1 - 10"}
                          </span>
                          <svg className="text-[#363434] w-[clamp(0.5rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>

                        {isBoundaryTreesDropdownOpen && (
                          <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                            {["1 - 10", "11 - 50", "51 - 100", "100+"].map((opt) => (
                              <div className={`p-[clamp(0.5rem,_0.83vw,_1rem)_clamp(0.6rem,_1.25vw,_1.25rem)] font-['Inter',_sans-serif] text-[clamp(0.65rem,_0.97vw,_1rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${boundaryTreesCountValue === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt} onClick={() => { onBoundaryTreesCountChange?.(opt); setIsBoundaryTreesDropdownOpen(false); }} onMouseEnter={(e) => { if (boundaryTreesCountValue !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (boundaryTreesCountValue !== opt) e.currentTarget.style.background = "transparent"; }}>
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
                <div className="w-full flex flex-col gap-[clamp(1.24rem,_1.94vw,_2.33rem)]">
                  <div className="flex flex-col items-start gap-[clamp(0.8rem,_1.25vw,_1.5rem)] w-full">
                    <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
                      Any Existing Tress available surrounding land?
                    </span>

                    <div className="flex flex-row items-center gap-[clamp(1.11rem,_1.73vw,_2.08rem)]">
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(5.33rem,_8.33vw,_10.0rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${treesAvailabilityValue === "available" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${treesAvailabilityValue === "available" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => { onTreesAvailabilityChange?.("available"); }}>
                        <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${treesAvailabilityValue === "available" ? "bg-[#BDD327]" : "bg-white"} ${treesAvailabilityValue === "available" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${treesAvailabilityValue === "available" ? "text-white" : "text-black"}`.trim()}>
                          Available
                        </span>
                      </button>

                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(6.53rem,_10.2vw,_12.25rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${treesAvailabilityValue === "not-available" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${treesAvailabilityValue === "not-available" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => { onTreesAvailabilityChange?.("not-available"); onTreesCountChange?.(""); }}>
                        <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${treesAvailabilityValue === "not-available" ? "bg-[#BDD327]" : "bg-white"} ${treesAvailabilityValue === "not-available" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${treesAvailabilityValue === "not-available" ? "text-white" : "text-black"}`.trim()}>
                          Not Available
                        </span>
                      </button>
                    </div>
                  </div>

                  {treesAvailabilityValue === "available" && (
                    <div className="flex flex-col items-start gap-[clamp(0.36rem,_0.56vw,_0.68rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.71rem,_1.1vw,_1.3rem)] leading-[clamp(0.89rem,_1.39vw,_1.67rem)] text-[rgba(0,_0,_0,_0.6)]">
                        Trees count
                      </span>

                      <div className="relative w-full">
                        <button className="box-border w-full h-[clamp(2.4rem,_3.75vw,_4.5rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] flex items-center justify-between pl-[clamp(0.71rem,_1.1vw,_1.3rem)] pr-[clamp(0.71rem,_1.1vw,_1.3rem)] cursor-pointer outline-none" type="button" onClick={() => setIsTreesCountDropdownOpen(!isTreesCountDropdownOpen)}>
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.71rem,_1.1vw,_1.3rem)] ${treesCountValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                            {treesCountValue === "1-5" ? "1 - 5 trees" :
                             treesCountValue === "6-10" ? "6 - 10 trees" :
                             treesCountValue === "11-20" ? "11 - 20 trees" :
                             treesCountValue === "20+" ? "20+ trees" :
                             "Select tree count..."}
                          </span>
                          <svg className="text-[#363434] w-[clamp(0.5rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                              <div className={`p-[clamp(0.5rem,_0.83vw,_1rem)_clamp(0.71rem,_1.1vw,_1.3rem)] font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.71rem,_1.1vw,_1.3rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${treesCountValue === opt.value ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt.value} onClick={() => { onTreesCountChange?.(opt.value); setIsTreesCountDropdownOpen(false); }} onMouseEnter={(e) => { if (treesCountValue !== opt.value) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (treesCountValue !== opt.value) e.currentTarget.style.background = "transparent"; }}>
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
                <div className="w-full flex flex-col gap-[clamp(1.33rem,_2.08vw,_2.5rem)]">
                  <div className="flex flex-col items-start gap-[clamp(0.8rem,_1.25vw,_1.5rem)] w-full">
                    <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.73vw,_2.08rem)] text-black">
                      Select availability Facility
                    </span>

                    <div className="flex flex-row items-center gap-[clamp(0.8rem,_1.25vw,_1.5rem)]">
                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(6.67rem,_10.42vw,_12.5rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${facilityAvailabilityValue === "water" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${facilityAvailabilityValue === "water" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onFacilityAvailabilityChange?.("water")}>
                        <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${facilityAvailabilityValue === "water" ? "bg-[#BDD327]" : "bg-white"} ${facilityAvailabilityValue === "water" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${facilityAvailabilityValue === "water" ? "text-white" : "text-black"}`.trim()}>
                          Water Facility
                        </span>
                      </button>

                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(7.91rem,_12.36vw,_14.83rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${facilityAvailabilityValue === "electricity" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${facilityAvailabilityValue === "electricity" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onFacilityAvailabilityChange?.("electricity")}>
                        <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${facilityAvailabilityValue === "electricity" ? "bg-[#BDD327]" : "bg-white"} ${facilityAvailabilityValue === "electricity" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${facilityAvailabilityValue === "electricity" ? "text-white" : "text-black"}`.trim()}>
                          Electricity Facility
                        </span>
                      </button>

                      <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4.04rem,_6.32vw,_7.58rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${facilityAvailabilityValue === "both" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${facilityAvailabilityValue === "both" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onFacilityAvailabilityChange?.("both")}>
                        <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${facilityAvailabilityValue === "both" ? "bg-[#BDD327]" : "bg-white"} ${facilityAvailabilityValue === "both" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                        <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${facilityAvailabilityValue === "both" ? "text-white" : "text-black"}`.trim()}>
                          Both
                        </span>
                      </button>
                    </div>
                  </div>

                  {(facilityAvailabilityValue === "water" || facilityAvailabilityValue === "both") && (
                    <div className="flex flex-col items-start gap-[clamp(0.8rem,_1.25vw,_1.5rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.73vw,_2.08rem)] text-black">
                        Select Water Facility
                      </span>

                      <div className="flex flex-row items-center gap-[clamp(0.8rem,_1.25vw,_1.5rem)]">
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4.04rem,_6.32vw,_7.58rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${waterFacilityValue === "bore" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${waterFacilityValue === "bore" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onWaterFacilityChange?.("bore")}>
                          <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${waterFacilityValue === "bore" ? "bg-[#BDD327]" : "bg-white"} ${waterFacilityValue === "bore" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${waterFacilityValue === "bore" ? "text-white" : "text-black"}`.trim()}>
                            Bore
                          </span>
                        </button>

                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(5.33rem,_8.33vw,_10.0rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${waterFacilityValue === "municipal" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${waterFacilityValue === "municipal" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onWaterFacilityChange?.("municipal")}>
                          <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${waterFacilityValue === "municipal" ? "bg-[#BDD327]" : "bg-white"} ${waterFacilityValue === "municipal" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${waterFacilityValue === "municipal" ? "text-white" : "text-black"}`.trim()}>
                            Muncipal
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {(facilityAvailabilityValue === "electricity" || facilityAvailabilityValue === "both") && (
                    <div className="flex flex-col items-start gap-[clamp(0.8rem,_1.25vw,_1.5rem)] w-full">
                      <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.73vw,_2.08rem)] text-black">
                        Select Electricity Facility
                      </span>

                      <div className="flex flex-row items-center gap-[clamp(0.8rem,_1.25vw,_1.5rem)]">
                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4.88rem,_7.64vw,_9.17rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${electricityFacilityValue === "2phase" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${electricityFacilityValue === "2phase" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onElectricityFacilityChange?.("2phase")}>
                          <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${electricityFacilityValue === "2phase" ? "bg-[#BDD327]" : "bg-white"} ${electricityFacilityValue === "2phase" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${electricityFacilityValue === "2phase" ? "text-white" : "text-black"}`.trim()}>
                            2 Phase
                          </span>
                        </button>

                        <button className={`box-border flex flex-row justify-center items-center p-[clamp(0.44rem,_0.69vw,_0.83rem)_clamp(0.8rem,_1.25vw,_1.5rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)] w-auto min-w-[clamp(4.93rem,_7.71vw,_9.25rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] rounded-[33px] cursor-pointer transition-[all_0.2s_ease] ${electricityFacilityValue === "3phase" ? "border border-[#2D3409]" : "border border-[rgba(0,_0,_0,_0.26)]"} ${electricityFacilityValue === "3phase" ? "bg-[#2D3409]" : "bg-white"}`.trim()} type="button" onClick={() => onElectricityFacilityChange?.("3phase")}>
                          <div className={`box-border w-[clamp(0.53rem,_0.83vw,_1.0rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] rounded-full ${electricityFacilityValue === "3phase" ? "bg-[#BDD327]" : "bg-white"} ${electricityFacilityValue === "3phase" ? "border-[2px] border-[#FFFFFF]" : "border-[2px] border-[#BDD327]"}`.trim()} />
                          <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] whitespace-nowrap ${electricityFacilityValue === "3phase" ? "text-white" : "text-black"}`.trim()}>
                            3 Phase
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span className="w-full h-[clamp(1.33rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] not-italic font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] text-black">
                    Shape of the Land
                  </span>

                  <div className="relative w-full">
                    <button className="box-border w-full h-[clamp(2.25rem,_3.52vw,_4.22rem)] bg-white border border-[rgba(0,_0,_0,_0.15)] rounded-[8px] flex items-center justify-between pl-[clamp(0.6rem,_1vw,_1.5rem)] pr-[clamp(0.6rem,_1vw,_1.5rem)] cursor-pointer outline-none" type="button" onClick={() => setIsLandShapeDropdownOpen(!isLandShapeDropdownOpen)}>
                      <span className={`font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.75rem,_1.11vw,_1.25rem)] ${landShapeValue ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`.trim()}>
                        {landShapeValue || "Select shape..."}
                      </span>
                      <svg className="text-[#363434] w-[clamp(0.5rem,_0.78vw,_0.94rem)] h-auto" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {isLandShapeDropdownOpen && (
                      <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,_0,_0,_0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,_0,_0,_0.1)] z-[1010] mt-[4px]">
                        {["Square", "Rectangle", "Triangle", "Trapezoid", "Irregular"].map((opt) => (
                          <div className={`p-[clamp(0.5rem,_0.83vw,_1rem)_clamp(0.6rem,_1vw,_1.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.75rem,_1.11vw,_1.25rem)] text-[#1A1C1E] cursor-pointer transition-[background_0.2s] ${landShapeValue === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`.trim()} key={opt} onClick={() => { onLandShapeChange?.(opt); setIsLandShapeDropdownOpen(false); }} onMouseEnter={(e) => { if (landShapeValue !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (landShapeValue !== opt) e.currentTarget.style.background = "transparent"; }}>
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
            <div className="absolute w-[50.15%] h-[clamp(15.78rem,_24.65vw,_29.58rem)] left-[1.32%] top-[clamp(3.24rem,_5.07vw,_6.08rem)] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.15)] rounded-[24px] box-border bg-white">
              <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={triggerUploadClick} className={`transition-all cursor-pointer box-border absolute w-[41.2%] h-[clamp(14.53rem,_22.7vw,_27.24rem)] left-[1.76%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[12px] border-[2px] border-dashed border-[rgba(225,_229,_239,_0.6)] ${dragActive ? "bg-[rgba(243,_244,_241,_0.6)]" : "bg-[rgba(242,_244,_246,_0.5)]"}`.trim()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />

                <div className="absolute w-[clamp(2.14rem,_3.34vw,_4.01rem)] h-[clamp(2.14rem,_3.34vw,_4.01rem)] left-[calc(50%_-_clamp(2.14rem,_3.34vw,_4.01rem)/2)] top-[clamp(2.58rem,_4.03vw,_4.83rem)] rounded-full flex items-center justify-center bg-[#E6EEAD]">
                  <div className="absolute w-[clamp(1.72rem,_2.69vw,_3.22rem)] h-[clamp(1.72rem,_2.69vw,_3.22rem)] left-[calc(50%_-_clamp(1.72rem,_2.69vw,_3.22rem)/2)] top-[calc(50%_-_clamp(1.72rem,_2.69vw,_3.22rem)/2)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.25)] rounded-full flex items-center justify-center">
                    <svg className="absolute w-[clamp(0.89rem,_1.39vw,_1.67rem)] h-[clamp(0.89rem,_1.39vw,_1.67rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>

                <span className="absolute w-[clamp(2.84rem,_4.44vw,_5.33rem)] h-[clamp(1.02rem,_1.6vw,_1.92rem)] left-[calc(50%_-_clamp(2.84rem,_4.44vw,_5.33rem)/2)] top-[clamp(5.39rem,_8.42vw,_10.1rem)] text-[clamp(0.8rem,_1.25vw,_1.5rem)] leading-[clamp(1.02rem,_1.6vw,_1.92rem)] flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[#1A1C1D] text-center">
                  Upload
                </span>

                <span className="absolute w-[80%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[10%] top-[clamp(6.72rem,_10.5vw,_12.6rem)] text-[clamp(0.53rem,_0.83vw,_1.0rem)] leading-[clamp(0.67rem,_1.04vw,_1.25rem)] flex items-center justify-center font-['Inter',_sans-serif] font-normal text-[#414755] text-center">
                  Drag and drop your files here or click to browse your computer.
                </span>

                <button type="button" onClick={(e) => { e.stopPropagation(); triggerUploadClick(); }} className="hover:scale-105 active:scale-95 transition-all absolute w-[clamp(4.44rem,_6.94vw,_8.33rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] left-[calc(50%_-_clamp(4.44rem,_6.94vw,_8.33rem)/2)] top-[clamp(9.33rem,_14.58vw,_17.5rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.12)] rounded-[57px] border-none flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer">
                  <span className="text-[clamp(0.53rem,_0.83vw,_1.0rem)] text-white">
                    Choose File
                  </span>
                </button>

                <div className="absolute w-[clamp(3.29rem,_5.14vw,_6.17rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] left-[clamp(0.89rem,_1.39vw,_1.67rem)] top-[clamp(13.29rem,_20.76vw,_24.92rem)] flex items-center gap-[4px]">
                  <svg className="w-[clamp(0.44rem,_0.63vw,_0.83rem)] h-[clamp(0.44rem,_0.63vw,_0.83rem)] text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                    <path d="M8.5 1.5v3h3" />
                  </svg>
                  <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.63vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
                    Format:&nbsp;
                    <strong className="font-medium">PDF</strong>
                  </span>
                </div>

                <div className="absolute w-[clamp(4.18rem,_6.53vw,_7.83rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(13.2rem,_20.63vw,_24.75rem)] flex items-center justify-end">
                  <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.63vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
                    Max File Size:&nbsp;
                    <strong className="font-medium">10MB</strong>
                  </span>
                </div>
              </div>

              <div className="absolute w-[41.06%] h-[clamp(7.56rem,_11.81vw,_14.17rem)] left-[45.75%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] flex flex-col items-start gap-[clamp(0.76rem,_1.18vw,_1.42rem)]">
                <h4 className="w-full h-[clamp(1.11rem,_1.74vw,_2.08rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.89rem,_1.39vw,_1.67rem)] leading-[clamp(1.11rem,_1.74vw,_2.08rem)] text-black m-0">
                  Uploaded Files
                </h4>

                <div className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar h-[clamp(5.69rem,_8.89vw,_10.67rem)] gap-[clamp(0.44rem,_0.69vw,_0.83rem)]">
                  {activeTabLabel === "Land Images" ? (
                    <div className="w-full flex flex-col gap-2">
                      <div>
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[#6b7280] block mb-[4px] text-[12px]">
                          Cover image
                        </span>
                        {uploadedFiles.filter((f) => f.imageType === "cover").length === 0 ? (
                          <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1 mb-2">No cover image uploaded yet.</span>
                        ) : (
                          uploadedFiles
                            .filter((f) => f.imageType === "cover")
                            .map((file) => (
                              <div key={file.id} className="relative w-full shrink-0 h-[clamp(2.62rem,_4.1vw,_4.92rem)] bg-[#F6F9E2] rounded-[12px] mb-[4px]">
                                <div className="absolute w-[clamp(1.29rem,_2.01vw,_2.42rem)] h-[clamp(1.29rem,_2.01vw,_2.42rem)] left-[clamp(0.4rem,_0.63vw,_0.75rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[4px] flex items-center justify-center bg-white">
                                  <svg className="w-[clamp(0.76rem,_1.18vw,_1.42rem)] h-[clamp(0.76rem,_1.18vw,_1.42rem)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                                    <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                                    <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                                    <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                                    <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                                    <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                                  </svg>
                                </div>
                                <div className="flex flex-col justify-center absolute left-[clamp(2.04rem,_3.19vw,_3.83rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] w-[50%] h-[clamp(1.33rem,_2.08vw,_2.5rem)]">
                                  <span className="truncate text-black font-['Inter',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.76rem,_1.18vw,_1.42rem)] block">
                                    {file.name}
                                  </span>
                                  <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.36rem,_0.56vw,_0.67rem)] leading-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[rgba(0,_0,_0,_0.7)]">
                                    {file.size}
                                  </span>
                                </div>
                                <button type="button" onClick={() => onFileDelete(file.id)} className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,_1.74vw,_2.08rem)] h-[clamp(1.11rem,_1.74vw,_2.08rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(0.67rem,_1.04vw,_1.25rem)] rounded-[2px] border-none">
                                  <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.82)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                </button>
                              </div>
                            ))
                        )}
                      </div>

                      <div>
                        <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[#6b7280] block mb-[4px] mt-[4px] text-[12px]">
                          Uploaded images
                        </span>
                        {uploadedFiles.filter((f) => f.imageType === "land").length === 0 ? (
                          <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1">No uploaded images yet.</span>
                        ) : (
                          uploadedFiles
                            .filter((f) => f.imageType === "land")
                            .map((file) => (
                              <div key={file.id} className="relative w-full shrink-0 h-[clamp(2.62rem,_4.1vw,_4.92rem)] bg-[#F6F9E2] rounded-[12px] mb-[4px]">
                                <div className="absolute w-[clamp(1.29rem,_2.01vw,_2.42rem)] h-[clamp(1.29rem,_2.01vw,_2.42rem)] left-[clamp(0.4rem,_0.63vw,_0.75rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[4px] flex items-center justify-center bg-white">
                                  <svg className="w-[clamp(0.76rem,_1.18vw,_1.42rem)] h-[clamp(0.76rem,_1.18vw,_1.42rem)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                                    <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                                    <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                                    <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                                    <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                                    <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                                  </svg>
                                </div>
                                <div className="flex flex-col justify-center absolute left-[clamp(2.04rem,_3.19vw,_3.83rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] w-[50%] h-[clamp(1.33rem,_2.08vw,_2.5rem)]">
                                  <span className="truncate text-black font-['Inter',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.76rem,_1.18vw,_1.42rem)] block">
                                    {file.name}
                                  </span>
                                  <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.36rem,_0.56vw,_0.67rem)] leading-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[rgba(0,_0,_0,_0.7)]">
                                    {file.size}
                                  </span>
                                </div>
                                <button type="button" onClick={() => onFileDelete(file.id)} className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,_1.74vw,_2.08rem)] h-[clamp(1.11rem,_1.74vw,_2.08rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(0.67rem,_1.04vw,_1.25rem)] rounded-[2px] border-none">
                                  <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.82)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                </button>
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  ) : (
                    uploadedFiles.length === 0 ? (
                      <span className="text-gray-400 font-['Inter',_sans-serif] text-xs">No files uploaded yet.</span>
                    ) : (
                      uploadedFiles.map((file) => (
                        <div key={file.id} className="relative w-full shrink-0 h-[clamp(2.62rem,_4.1vw,_4.92rem)] bg-[#F6F9E2] rounded-[12px] mb-[4px]">
                          <div className="absolute w-[clamp(1.29rem,_2.01vw,_2.42rem)] h-[clamp(1.29rem,_2.01vw,_2.42rem)] left-[clamp(0.4rem,_0.63vw,_0.75rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] rounded-[4px] flex items-center justify-center bg-white">
                            <svg className="w-[clamp(0.76rem,_1.18vw,_1.42rem)] h-[clamp(0.76rem,_1.18vw,_1.42rem)]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                              <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                              <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                              <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                              <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                              <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                            </svg>
                          </div>

                          <div className="flex flex-col justify-center absolute left-[clamp(2.04rem,_3.19vw,_3.83rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] w-[50%] h-[clamp(1.33rem,_2.08vw,_2.5rem)]">
                            <span className="truncate text-black font-['Inter',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.76rem,_1.18vw,_1.42rem)] block">
                              {file.name}
                            </span>
                            <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.36rem,_0.56vw,_0.67rem)] leading-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[rgba(0,_0,_0,_0.7)]">
                              {file.size}
                            </span>
                          </div>

                          <button type="button" onClick={() => onFileDelete(file.id)} className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,_1.74vw,_2.08rem)] h-[clamp(1.11rem,_1.74vw,_2.08rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(0.67rem,_1.04vw,_1.25rem)] rounded-[2px] border-none">
                            <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.82)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTabLabel !== "Survey Report" && (
        <div className="absolute w-[45.44%] h-[clamp(8.04rem,_12.56vw,_15.08rem)] left-[52.65%] top-[clamp(3.24rem,_5.07vw,_6.08rem)]">
          <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,_238,_173,_0.15)] border border-[#E6EEAD] rounded-[18px] z-[0]" />

          <textarea className="absolute w-[91.59%] h-[clamp(3.73rem,_5.83vw,_7.0rem)] left-[4.21%] top-[clamp(1.07rem,_1.67vw,_2.0rem)] font-['Poppins',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.93rem,_1.46vw,_1.75rem)] z-[1] bg-transparent resize-none border-none outline-none text-black" value={commentValue} onChange={(e) => onCommentChange(e.target.value)} placeholder="Write a comment" />

          <button type="button" onClick={handleVoiceInput} className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${ isListening ? "bg-red-600 animate-pulse" : "" } absolute w-[clamp(1.42rem,_2.22vw,_2.67rem)] h-[clamp(1.42rem,_2.22vw,_2.67rem)] left-[92.56%] top-[clamp(6.0rem,_9.38vw,_11.25rem)] border-none z-[1] ${isListening ? "bg-[#dc2626]" : "bg-[#2D3509]"}`.trim()}>
            <svg className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={`absolute w-[15.59%] h-[clamp(1.69rem,_2.64vw,_3.17rem)] left-[auto] right-[1.91%] box-border rounded-[24px] bg-white ${activeTabLabel === "Survey Report" ? (surveyReportTypeValue === "both" ? "top-[clamp(61.16rem,_41.035rem_+_31.25vw,_78.66rem)]" : "top-[clamp(40.66rem,_21.16rem_+_30.4vw,_57.66rem)]") : "top-[clamp(16.84rem,_26.32vw,_31.58rem)]"}`.trim()}>
        <button type="button" onClick={onPrevTab} className="hover:bg-red-50/20 active:scale-95 transition-all box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] bg-transparent flex items-center justify-center font-['Outfit',_sans-serif] font-medium text-[rgba(0,_0,_0,_0.8)] border border-[rgba(205,_0,_0,_0.27)] cursor-pointer">
          Back
        </button>

        <button type="button" onClick={onNextTab} className="hover:scale-105 active:scale-95 transition-all absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] rounded-[57px] text-[clamp(0.58rem,_0.9vw,_1.09rem)] leading-[clamp(0.71rem,_1.1vw,_1.33rem)] border-none flex items-center justify-center font-['Outfit',_sans-serif] font-normal text-white cursor-pointer">
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
