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
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "clamp(30.31rem, 47.36vw, 56.83rem)",
          height: "clamp(15.78rem, 24.65vw, 29.58rem)",
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
          borderRadius: "24px",
          boxSizing: "border-box",
          background: "#FFFFFF",
        }}
      >
        <div
          onDragEnter={handleDragFn}
          onDragOver={handleDragFn}
          onDragLeave={handleDragFn}
          onDrop={handleDropFn}
          onClick={() => inputRef.current?.click()}
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "41.2%",
            height: "clamp(14.53rem, 22.7vw, 27.24rem)",
            left: "1.76%",
            top: "clamp(0.62rem, 0.97vw, 1.17rem)",
            borderRadius: "12px",
            border: "2px dashed #BDD327",
            background: dragActiveState ? "rgba(243, 244, 241, 0.6)" : "rgba(242, 244, 246, 0.5)",
            transition: "all 0.2s ease",
            cursor: "pointer",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={changeHandler}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
          />

          <div
            style={{
              position: "absolute",
              width: "clamp(2.14rem, 3.34vw, 4.01rem)",
              height: "clamp(2.14rem, 3.34vw, 4.01rem)",
              left: "calc(50% - clamp(2.14rem, 3.34vw, 4.01rem)/2)",
              top: "clamp(2.58rem, 4.03vw, 4.83rem)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#E6EEAD",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "clamp(1.72rem, 2.69vw, 3.22rem)",
                height: "clamp(1.72rem, 2.69vw, 3.22rem)",
                left: "calc(50% - clamp(1.72rem, 2.69vw, 3.22rem)/2)",
                top: "calc(50% - clamp(1.72rem, 2.69vw, 3.22rem)/2)",
                background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                boxShadow: "0px 6px 9px -1.8px rgba(0, 0, 0, 0.25)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  width: "clamp(0.89rem, 1.39vw, 1.67rem)",
                  height: "clamp(0.89rem, 1.39vw, 1.67rem)",
                  color: "#FFFFFF",
                }}
              >
                <line x1="12" y1="15" x2="12" y2="3" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="5" y1="21" x2="19" y2="21" />
              </svg>
            </div>
          </div>

          <span
            style={{
              position: "absolute",
              width: "clamp(2.84rem, 4.44vw, 5.33rem)",
              height: "clamp(1.02rem, 1.6vw, 1.92rem)",
              left: "calc(50% - clamp(2.84rem, 4.44vw, 5.33rem)/2)",
              top: "clamp(5.39rem, 8.42vw, 10.1rem)",
              fontSize: "clamp(0.8rem, 1.25vw, 1.5rem)",
              lineHeight: "clamp(1.02rem, 1.6vw, 1.92rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              color: "#1A1C1D",
              textAlign: "center",
            }}
          >
            Upload
          </span>

          <span
            style={{
              position: "absolute",
              width: "80%",
              height: "clamp(1.33rem, 2.08vw, 2.5rem)",
              left: "10%",
              top: "clamp(6.72rem, 10.5vw, 12.6rem)",
              fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)",
              lineHeight: "clamp(0.67rem, 1.04vw, 1.25rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              color: "#414755",
              textAlign: "center",
            }}
          >
            Drag and drop your files here or click to browse your computer.
          </span>

          <button
            type="button"
            className="hover:scale-105 active:scale-95 transition-all"
            style={{
              position: "absolute",
              width: "clamp(4.44rem, 6.94vw, 8.33rem)",
              height: "clamp(1.69rem, 2.64vw, 3.17rem)",
              left: "calc(50% - clamp(4.44rem, 6.94vw, 8.33rem)/2)",
              top: "clamp(9.33rem, 14.58vw, 17.5rem)",
              background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
              boxShadow: "0px 4px 27.1px rgba(0, 0, 0, 0.12)",
              borderRadius: "57px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)", color: "#FFFFFF" }}>
              Choose File
            </span>
          </button>

          <div
            style={{
              position: "absolute",
              width: "clamp(3.29rem, 5.14vw, 6.17rem)",
              height: "clamp(0.53rem, 0.83vw, 1.0rem)",
              left: "clamp(0.89rem, 1.39vw, 1.67rem)",
              top: "clamp(13.29rem, 20.76vw, 24.92rem)",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              style={{
                width: "clamp(0.44rem, 0.63vw, 0.83rem)",
                height: "clamp(0.44rem, 0.63vw, 0.83rem)",
                color: "#000000",
              }}
            >
              <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
              <path d="M8.5 1.5v3h3" />
            </svg>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.44rem, 0.63vw, 0.83rem)",
                lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)",
                color: "#000000",
                display: "flex",
                alignItems: "center",
              }}
            >
              Format:&nbsp;
              <strong style={{ fontWeight: 500 }}>PDF</strong>
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              width: "clamp(4.18rem, 6.53vw, 7.83rem)",
              height: "clamp(0.53rem, 0.83vw, 1.0rem)",
              right: "clamp(0.67rem, 1.04vw, 1.25rem)",
              top: "clamp(13.2rem, 20.63vw, 24.75rem)",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(0.44rem, 0.63vw, 0.83rem)",
                lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)",
                color: "#000000",
                display: "flex",
                alignItems: "center",
              }}
            >
              Max File Size:&nbsp;
              <strong style={{ fontWeight: 500 }}>10MB</strong>
            </span>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            width: "41.06%",
            height: "clamp(7.56rem, 11.81vw, 14.17rem)",
            left: "45.75%",
            top: "clamp(0.62rem, 0.97vw, 1.17rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(0.76rem, 1.18vw, 1.42rem)",
          }}
        >
          <h4
            style={{
              width: "100%",
              height: "clamp(1.11rem, 1.74vw, 2.08rem)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)",
              lineHeight: "clamp(1.11rem, 1.74vw, 2.08rem)",
              color: "#000000",
              margin: 0,
            }}
          >
            Uploaded Files
          </h4>

          <div
            className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar"
            style={{
              height: "clamp(5.69rem, 8.89vw, 10.67rem)",
              gap: "clamp(0.44rem, 0.69vw, 0.83rem)",
            }}
          >
            {files.length === 0 ? (
              <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1">No files uploaded yet.</span>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="relative w-full shrink-0"
                  style={{
                    height: "clamp(2.62rem, 4.1vw, 4.92rem)",
                    background: "#F6F9E2",
                    borderRadius: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "clamp(1.29rem, 2.01vw, 2.42rem)",
                      height: "clamp(1.29rem, 2.01vw, 2.42rem)",
                      left: "clamp(0.4rem, 0.63vw, 0.75rem)",
                      top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#FFFFFF",
                    }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                      }}
                    >
                      <path d="M12 2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h8c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 9H5v-1h6v1zm0-2H5V8h6v1zm0-2H5V6h6v1z" fill="#BDD327"/>
                    </svg>
                  </div>

                  <div
                    className="flex flex-col justify-center"
                    style={{
                      position: "absolute",
                      left: "clamp(2.04rem, 3.19vw, 3.83rem)",
                      top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                      width: "50%",
                      height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                    }}
                  >
                    <span
                      className="truncate text-black"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
                        lineHeight: "clamp(0.76rem, 1.18vw, 1.42rem)",
                        display: "block",
                      }}
                    >
                      {file.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: "clamp(0.36rem, 0.56vw, 0.67rem)",
                        lineHeight: "clamp(0.44rem, 0.69vw, 0.83rem)",
                        color: "rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      {file.size}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); deleteHandler?.(file.id); }}
                    className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                    style={{
                      position: "absolute",
                      width: "clamp(1.11rem, 1.74vw, 2.08rem)",
                      height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                      right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                      top: "clamp(0.67rem, 1.04vw, 1.25rem)",
                      borderRadius: "2px",
                      border: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        color: "rgba(0, 0, 0, 0.82)",
                      }}
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
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "clamp(27.46rem, 42.91vw, 51.49rem)",
          height: "clamp(9.96rem, 15.56vw, 18.68rem)",
          boxSizing: "border-box",
        }}
      >
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
            lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
            color: "#000000",
            display: "block",
            marginBottom: "clamp(0.58rem, 0.91vw, 1.09rem)",
          }}
        >
          Add Comments
        </span>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(8.04rem, 12.56vw, 15.08rem)",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              background: "rgba(230, 238, 173, 0.15)",
              border: "1px solid #E6EEAD",
              borderRadius: "18px",
              zIndex: 0,
            }}
          />

          <textarea
            value={commentVal}
            onChange={(e) => changeHandler?.(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: "absolute",
              width: "91.59%",
              height: "clamp(3.73rem, 5.83vw, 7.0rem)",
              left: "4.21%",
              top: "clamp(1.07rem, 1.67vw, 2.0rem)",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
              lineHeight: "clamp(0.93rem, 1.46vw, 1.75rem)",
              zIndex: 1,
              background: "transparent",
              resize: "none",
              border: "none",
              outline: "none",
              color: "#000000",
            }}
          />

          <button
            type="button"
            onClick={handleSurveyVoiceInput}
            className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
              isListening ? "bg-red-600 animate-pulse" : ""
            }`}
            style={{
              position: "absolute",
              width: "clamp(1.42rem, 2.22vw, 2.67rem)",
              height: "clamp(1.42rem, 2.22vw, 2.67rem)",
              right: "clamp(0.62rem, 0.97vw, 1.17rem)",
              top: "clamp(6.0rem, 9.38vw, 11.25rem)",
              background: isListening ? "#dc2626" : "#2D3509",
              border: "none",
              zIndex: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                color: "#FFFFFF",
              }}
            >
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
    <div
      className={`absolute rounded-[24px] box-border bg-white select-none ${className}`}
      style={{
        left: "clamp(1.77rem, 2.78vw, 3.33rem)",
        right: "clamp(1.77rem, 2.78vw, 3.33rem)",
        top: "clamp(26rem, 40.63vw, 48.75rem)",
        height: activeTabLabel === "Survey Report"
          ? (surveyReportTypeValue === "both"
              ? "clamp(64rem, 43.875rem + 31.25vw, 81.5rem)"
              : "clamp(43.5rem, 24rem + 30.4vw, 60.5rem)")
          : "clamp(19.68rem, 30.76vw, 36.91rem)",
        ...style,
      }}
    >
      {/* ── Choose Image Type Modal for Land Images ── */}
      {showChooseImageModal && (
        <div
          onClick={() => setShowChooseImageModal(false)}
          className="z-[99999] fixed inset-0 bg-black/40 flex items-center justify-center select-none"
        >
          {/* Modal content: Frame 2147239896 */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              boxSizing: "border-box",
              position: "relative",
              width: "clamp(27rem, 42.19vw, 50.625rem)",
              height: "clamp(16.75rem, 26.17vw, 31.41rem)",
              background: "#FFFFFF",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              boxShadow: "0px 0px 12.5px rgba(0, 0, 0, 0.1)",
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "clamp(1rem, 1.56vw, 1.875rem)",
            }}
          >
            {/* Title: Choose upload Image */}
            <h3
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.06rem, 1.66vw, 1.99rem)",
                lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                color: "#000000",
                margin: 0,
                alignSelf: "flex-start",
                paddingLeft: "clamp(0.8rem, 1.25vw, 1.5rem)",
                marginBottom: "clamp(1.5rem, 2.34vw, 2.81rem)",
              }}
            >
              Choose upload Image
            </h3>

            {/* Grid container for left and right cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "clamp(1.5rem, 2.34vw, 2.81rem)",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {/* Left card: Cover Image */}
              <div
                style={{
                  boxSizing: "border-box",
                  width: "clamp(10.6rem, 16.56vw, 19.875rem)",
                  height: "clamp(10rem, 15.63vw, 18.75rem)",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 7.3px rgba(0, 0, 0, 0.08)",
                  borderRadius: "12px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Title: Cover Image */}
                <span
                  style={{
                    position: "absolute",
                    top: "clamp(1.5rem, 2.34vw, 2.81rem)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.88rem, 1.38vw, 1.65rem)",
                    lineHeight: "clamp(1.1rem, 1.72vw, 2.06rem)",
                    color: "#000000",
                  }}
                >
                  Cover Image
                </span>

                {/* Icon Stack */}
                <div
                  style={{
                    position: "absolute",
                    width: "clamp(2.14rem, 3.34vw, 4.01rem)",
                    height: "clamp(2.14rem, 3.34vw, 4.01rem)",
                    top: "clamp(4.1rem, 6.41vw, 7.69rem)",
                    borderRadius: "6030.65px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#E6EEAD",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(1.72rem, 2.69vw, 3.23rem)",
                      height: "clamp(1.72rem, 2.69vw, 3.23rem)",
                      background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                      boxShadow: "0px 6px 9px -1.8px rgba(0, 0, 0, 0.15)",
                      borderRadius: "6030.65px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        height: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        color: "#FFFFFF",
                      }}
                    >
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => coverImageInputRef.current?.click()}
                  className="hover:scale-105 active:scale-95 transition-all"
                  style={{
                    position: "absolute",
                    width: "clamp(7rem, 10.93vw, 13.125rem)",
                    height: "clamp(1.69rem, 2.63vw, 3.16rem)",
                    bottom: "clamp(0.8rem, 1.25vw, 1.5rem)",
                    top: "168px",
                    background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                    boxShadow: "0px 4px 27.1px rgba(0, 0, 0, 0.05)",
                    borderRadius: "57px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.62rem, 0.97vw, 1.16rem)",
                      color: "#FFFFFF",
                    }}
                  >
                    Upload
                  </span>
                </button>
              </div>

              {/* Right card: Land Images */}
              <div
                style={{
                  boxSizing: "border-box",
                  width: "clamp(10.6rem, 16.56vw, 19.875rem)",
                  height: "clamp(10rem, 15.63vw, 18.75rem)",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Title: Land Images */}
                <span
                  style={{
                    position: "absolute",
                    top: "clamp(1.5rem, 2.34vw, 2.81rem)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(0.88rem, 1.38vw, 1.65rem)",
                    lineHeight: "clamp(1.1rem, 1.72vw, 2.06rem)",
                    color: "rgba(0, 0, 0, 0.82)",
                  }}
                >
                  Land Images
                </span>

                {/* Icon Stack */}
                <div
                  style={{
                    position: "absolute",
                    width: "clamp(2.14rem, 3.34vw, 4.01rem)",
                    height: "clamp(2.14rem, 3.34vw, 4.01rem)",
                    top: "clamp(4.1rem, 6.41vw, 7.69rem)",
                    borderRadius: "6030.65px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#E6EEAD",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(1.72rem, 2.69vw, 3.23rem)",
                      height: "clamp(1.72rem, 2.69vw, 3.23rem)",
                      background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                      boxShadow: "0px 6px 9px -1.8px rgba(0, 0, 0, 0.15)",
                      borderRadius: "6030.65px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        width: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        height: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        color: "#FFFFFF",
                      }}
                    >
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => landImagesInputRef.current?.click()}
                  className="hover:scale-105 active:scale-95 transition-all"
                  style={{
                    position: "absolute",
                    width: "clamp(7rem, 10.93vw, 13.125rem)",
                    height: "clamp(1.69rem, 2.63vw, 3.16rem)",
                    bottom: "clamp(0.8rem, 1.25vw, 1.5rem)",
                    top: "168px",
                    background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                    boxShadow: "0px 4px 27.1px rgba(0, 0, 0, 0.05)",
                    borderRadius: "57px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.62rem, 0.97vw, 1.16rem)",
                      color: "#FFFFFF",
                    }}
                  >
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
        <h3
          style={{
            position: "absolute",
            width: "13.38%",
            height: "clamp(1.33rem, 2.08vw, 2.5rem)",
            left: "52.65%",
            top: "clamp(1.33rem, 2.08vw, 2.5rem)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
            lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
            margin: 0,
            display: "flex",
            alignItems: "center",
            color: "#000000",
            whiteSpace: "nowrap",
          }}
        >
          Add Comments
        </h3>
      )}

      {activeTabLabel === "Survey Report" ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "clamp(1.33rem, 2.08vw, 2.5rem)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "clamp(0.93rem, 1.46vw, 1.75rem)",
              width: "100%",
              marginBottom: "clamp(2.5rem, 3.91vw, 4.69rem)",
            }}
          >
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                color: "#000000",
              }}
            >
              Select Survey Report Type
            </span>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "clamp(1.42rem, 2.22vw, 2.67rem)",
                flexWrap: "wrap",
              }}
            >
              {/* Private Survey Report Pill */}
              <button type="button" onClick={() => onSurveyReportTypeChange?.("private")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "10px", width: "auto", minWidth: "clamp(9.07rem, 14.17vw, 17rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: surveyReportTypeValue === "private" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: surveyReportTypeValue === "private" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: surveyReportTypeValue === "private" ? "#BDD327" : "#FFFFFF", border: surveyReportTypeValue === "private" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: surveyReportTypeValue === "private" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                  Private Survey Report
                </span>
              </button>

              {/* Government Survey Report Pill */}
              <button type="button" onClick={() => onSurveyReportTypeChange?.("government")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "10px", width: "auto", minWidth: "clamp(10.76rem, 16.8vw, 20.17rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: surveyReportTypeValue === "government" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: surveyReportTypeValue === "government" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: surveyReportTypeValue === "government" ? "#BDD327" : "#FFFFFF", border: surveyReportTypeValue === "government" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: surveyReportTypeValue === "government" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                  Government Survey Report
                </span>
              </button>

              {/* Both Survey Reports Pill */}
              <button type="button" onClick={() => onSurveyReportTypeChange?.("both")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "10px", width: "auto", minWidth: "clamp(8.71rem, 13.61vw, 16.33rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: surveyReportTypeValue === "both" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: surveyReportTypeValue === "both" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: surveyReportTypeValue === "both" ? "#BDD327" : "#FFFFFF", border: surveyReportTypeValue === "both" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: surveyReportTypeValue === "both" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                  Both Survey Reports
                </span>
              </button>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(1.5rem, 2.34vw, 2.81rem)",
              overflow: "visible",
              paddingBottom: "clamp(4rem, 6.25vw, 7.5rem)",
            }}
          >
            {(surveyReportTypeValue === "private" || surveyReportTypeValue === "both") && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "clamp(0.75rem, 1.17vw, 1.41rem)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: "1 1 clamp(28rem, 43.75vw, 52.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.62rem, 0.97vw, 1.17rem)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                      lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                      color: "#000000",
                    }}
                  >
                    Private Survey Report
                  </span>
                  {renderUploaderBox("private")}
                </div>

                {renderCommentBox("private")}
              </div>
            )}

            {(surveyReportTypeValue === "government" || surveyReportTypeValue === "both") && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: "clamp(0.75rem, 1.17vw, 1.41rem)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    flex: "1 1 clamp(28rem, 43.75vw, 52.5rem)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.62rem, 0.97vw, 1.17rem)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                      lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                      color: "#000000",
                    }}
                  >
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
          <h3
            style={{
              position: "absolute",
              width: "9.56%",
              height: "clamp(1.33rem, 2.08vw, 2.5rem)",
              left: "2.21%",
              top: "clamp(1.33rem, 2.08vw, 2.5rem)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
              lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
              margin: 0,
              display: "flex",
              alignItems: "center",
              color: "#000000",
              whiteSpace: "nowrap",
            }}
          >
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
            <div ref={dropdownRef} style={{ position: "absolute", width: "47.06%", height: activeTabLabel === "Water and Electricity Facility" ? "clamp(16.5rem, 23vw, 25rem)" : activeTabLabel === "Any Existing Trees" ? treesAvailabilityValue === "available" ? "clamp(12.5rem, 18.5vw, 20rem)" : "clamp(6.5rem, 10vw, 12rem)" : isBoundaryTab ? boundaryTypeValue === "Land" ? "clamp(17.5rem, 26.5vw, 30rem)" : boundaryTypeValue === "Road" ? "clamp(14.5rem, 22.5vw, 26rem)" : boundaryTypeValue === "Tress" ? "clamp(10rem, 14.5vw, 17rem)" : "clamp(4.5rem, 7.5vw, 9rem)" : "clamp(4rem, 6.74vw, 6.0625rem)", left: "1.32%", top: "clamp(1.33rem, 2.08vw, 2.5rem)", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", zIndex: 100, }} >
              {isBoundaryTab ? (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(0.6rem, 0.94vw, 1.125rem)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "clamp(0.4rem, 0.63vw, 0.75rem)",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                        lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                        color: "#000000",
                      }}
                    >
                      {activeTabLabel}
                    </span>
 
                    <div style={{ position: "relative", width: "100%" }}>
                      <button
                        type="button"
                        onClick={() => setIsBoundaryDropdownOpen(!isBoundaryDropdownOpen)}
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          height: "clamp(2.25rem, 3.52vw, 4.22rem)",
                          background: "#FFFFFF",
                          border: "1px solid rgba(0, 0, 0, 0.15)",
                          borderRadius: "8px",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingLeft: "clamp(0.6rem, 0.94vw, 1.13rem)",
                          paddingRight: "clamp(0.6rem, 0.94vw, 1.13rem)",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)", color: boundaryTypeValue ? "#000000" : "rgba(0,0,0,0.4)", }} >
                          {boundaryTypeValue || ("What is on the " + activeTabLabel.toLowerCase().split(' ')[0] + " side?")}
                        </span>
                        <svg
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            color: "#363434",
                            width: "clamp(0.5rem, 0.78vw, 0.94rem)",
                            height: "auto",
                          }}
                        >
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
 
                      {isBoundaryDropdownOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            right: 0,
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                            borderRadius: "12px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                            zIndex: 1010,
                            marginTop: "4px",
                          }}
                        >
                          {["Land", "Road", "Water Body", "Tress", "Other"].map((opt) => (
                            <div key={opt} onClick={() => { onBoundaryTypeChange?.(opt); setIsBoundaryDropdownOpen(false); }} style={{ padding: "clamp(0.5rem, 0.83vw, 1rem) clamp(0.6rem, 1.25vw, 1.25rem)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.65rem, 0.97vw, 1rem)", color: "#1A1C1E", cursor: "pointer", transition: "background 0.2s", background: boundaryTypeValue === opt ? "#E5F1F9" : "transparent", }} onMouseEnter={(e) => { if (boundaryTypeValue !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (boundaryTypeValue !== opt) e.currentTarget.style.background = "transparent"; }} >
                              {opt === "Tress" ? "Trees" : opt}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {boundaryTypeValue === "Land" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(0.5rem, 0.78vw, 0.94rem)",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                          lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                          color: "#000000",
                        }}
                      >
                        Owner details of land
                      </span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "clamp(0.3rem, 0.47vw, 0.56rem)",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                            lineHeight: "clamp(0.9rem, 1.41vw, 1.69rem)",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          Name
                        </span>
                        <div
                          style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "clamp(2.25rem, 3.52vw, 4.22rem)",
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="Krishna"
                            value={boundaryOwnerNameValue}
                            onChange={(e) => onBoundaryOwnerNameChange?.(e.target.value)}
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "transparent",
                              border: "none",
                              paddingLeft: "clamp(0.6rem, 0.94vw, 1.13rem)",
                              paddingRight: "clamp(0.6rem, 0.94vw, 1.13rem)",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "clamp(0.3rem, 0.47vw, 0.56rem)",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                            lineHeight: "clamp(0.9rem, 1.41vw, 1.69rem)",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          Age
                        </span>
                        <div
                          style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "clamp(2.25rem, 3.52vw, 4.22rem)",
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="43"
                            value={boundaryOwnerAgeValue}
                            onChange={(e) => onBoundaryOwnerAgeChange?.(e.target.value)}
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "transparent",
                              border: "none",
                              paddingLeft: "clamp(0.6rem, 0.94vw, 1.13rem)",
                              paddingRight: "clamp(0.6rem, 0.94vw, 1.13rem)",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {boundaryTypeValue === "Road" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(0.5rem, 0.78vw, 0.94rem)",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                          lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                          color: "#000000",
                        }}
                      >
                        Type of Road
                      </span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                          width: "100%",
                        }}
                      >
                        <button type="button" onClick={() => onBoundaryRoadTypeChange?.("Private Road")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.4rem, 0.6vw, 0.8rem) clamp(0.8rem, 1.25vw, 1.5rem)", borderRadius: "33px", cursor: "pointer", border: boundaryRoadTypeValue === "Private Road" ? "1px solid #2780C4" : "1px solid rgba(0, 0, 0, 0.26)", background: boundaryRoadTypeValue === "Private Road" ? "#2780C4" : "transparent", outline: "none", transition: "all 0.2s", }} >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div style={{ boxSizing: "border-box", width: "12px", height: "12px", background: "#FFFFFF", border: "2px solid " + (boundaryRoadTypeValue === "Private Road" ? "#FFFFFF" : "#85BFE5"), borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", }} >
                              {boundaryRoadTypeValue === "Private Road" && (
                                <div
                                  style={{
                                    width: "4px",
                                    height: "4px",
                                    background: "#2780C4",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}
                            </div>
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.65rem, 0.97vw, 1.1rem)", color: boundaryRoadTypeValue === "Private Road" ? "#FFFFFF" : "#000000", }} >
                              Private Road
                            </span>
                          </div>
                        </button>

                        <button type="button" onClick={() => onBoundaryRoadTypeChange?.("Government Road")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.4rem, 0.6vw, 0.8rem) clamp(0.8rem, 1.25vw, 1.5rem)", borderRadius: "33px", cursor: "pointer", border: boundaryRoadTypeValue === "Government Road" ? "1px solid #2780C4" : "1px solid rgba(0, 0, 0, 0.26)", background: boundaryRoadTypeValue === "Government Road" ? "#2780C4" : "transparent", outline: "none", transition: "all 0.2s", }} >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <div style={{ boxSizing: "border-box", width: "12px", height: "12px", background: "#FFFFFF", border: "2px solid " + (boundaryRoadTypeValue === "Government Road" ? "#FFFFFF" : "#85BFE5"), borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", }} >
                              {boundaryRoadTypeValue === "Government Road" && (
                                <div
                                  style={{
                                    width: "4px",
                                    height: "4px",
                                    background: "#2780C4",
                                    borderRadius: "50%",
                                  }}
                                />
                              )}
                            </div>
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.65rem, 0.97vw, 1.1rem)", color: boundaryRoadTypeValue === "Government Road" ? "#FFFFFF" : "#000000", }} >
                              Government Road
                            </span>
                          </div>
                        </button>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          gap: "clamp(0.3rem, 0.47vw, 0.56rem)",
                          width: "100%",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                            lineHeight: "clamp(0.9rem, 1.41vw, 1.69rem)",
                            color: "rgba(0, 0, 0, 0.6)",
                          }}
                        >
                          Width of the Road <span style={{ color: "rgba(0, 0, 0, 0.4)" }}>(in Feet)</span>
                        </span>
                        <div
                          style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "clamp(2.25rem, 3.52vw, 4.22rem)",
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                          }}
                        >
                          <input
                            type="text"
                            placeholder="100"
                            value={boundaryRoadWidthValue}
                            onChange={(e) => onBoundaryRoadWidthChange?.(e.target.value)}
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "transparent",
                              border: "none",
                              paddingLeft: "clamp(0.6rem, 0.94vw, 1.13rem)",
                              paddingRight: "clamp(0.6rem, 0.94vw, 1.13rem)",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                              outline: "none",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {boundaryTypeValue === "Tress" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(0.5rem, 0.78vw, 0.94rem)",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(0.75rem, 1.17vw, 1.41rem)",
                          lineHeight: "clamp(0.9rem, 1.41vw, 1.69rem)",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Trees Count
                      </span>

                      <div style={{ position: "relative", width: "100%" }}>
                        <button
                          type="button"
                          onClick={() => setIsBoundaryTreesDropdownOpen(!isBoundaryTreesDropdownOpen)}
                          style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "clamp(2.25rem, 3.52vw, 4.22rem)",
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: "clamp(0.6rem, 0.94vw, 1.13rem)",
                            paddingRight: "clamp(0.6rem, 0.94vw, 1.13rem)",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)", color: boundaryTreesCountValue ? "#000000" : "rgba(0,0,0,0.4)", }} >
                            {boundaryTreesCountValue || "1 - 10"}
                          </span>
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              color: "#363434",
                              width: "clamp(0.5rem, 0.78vw, 0.94rem)",
                              height: "auto",
                            }}
                          >
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>

                        {isBoundaryTreesDropdownOpen && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              background: "#FFFFFF",
                              border: "1px solid rgba(0, 0, 0, 0.1)",
                              borderRadius: "12px",
                              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                              zIndex: 1010,
                              marginTop: "4px",
                            }}
                          >
                            {["1 - 10", "11 - 50", "51 - 100", "100+"].map((opt) => (
                              <div key={opt} onClick={() => { onBoundaryTreesCountChange?.(opt); setIsBoundaryTreesDropdownOpen(false); }} style={{ padding: "clamp(0.5rem, 0.83vw, 1rem) clamp(0.6rem, 1.25vw, 1.25rem)", fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.65rem, 0.97vw, 1rem)", color: "#1A1C1E", cursor: "pointer", transition: "background 0.2s", background: boundaryTreesCountValue === opt ? "#E5F1F9" : "transparent", }} onMouseEnter={(e) => { if (boundaryTreesCountValue !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (boundaryTreesCountValue !== opt) e.currentTarget.style.background = "transparent"; }} >
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
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(1.24rem, 1.94vw, 2.33rem)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                        lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                        color: "#000000",
                      }}
                    >
                      Any Existing Tress available surrounding land?
                    </span>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "clamp(1.11rem, 1.73vw, 2.08rem)",
                      }}
                    >
                      <button type="button" onClick={() => { onTreesAvailabilityChange?.("available"); }} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(5.33rem, 8.33vw, 10.0rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: treesAvailabilityValue === "available" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: treesAvailabilityValue === "available" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                        <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: treesAvailabilityValue === "available" ? "#BDD327" : "#FFFFFF", border: treesAvailabilityValue === "available" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: treesAvailabilityValue === "available" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                          Available
                        </span>
                      </button>

                      <button type="button" onClick={() => { onTreesAvailabilityChange?.("not-available"); onTreesCountChange?.(""); }} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(6.53rem, 10.2vw, 12.25rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: treesAvailabilityValue === "not-available" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: treesAvailabilityValue === "not-available" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                        <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: treesAvailabilityValue === "not-available" ? "#BDD327" : "#FFFFFF", border: treesAvailabilityValue === "not-available" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: treesAvailabilityValue === "not-available" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                          Not Available
                        </span>
                      </button>
                    </div>
                  </div>

                  {treesAvailabilityValue === "available" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "clamp(0.36rem, 0.56vw, 0.68rem)",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(0.71rem, 1.1vw, 1.3rem)",
                          lineHeight: "clamp(0.89rem, 1.39vw, 1.67rem)",
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Trees count
                      </span>

                      <div style={{ position: "relative", width: "100%" }}>
                        <button
                          type="button"
                          onClick={() => setIsTreesCountDropdownOpen(!isTreesCountDropdownOpen)}
                          style={{
                            boxSizing: "border-box",
                            width: "100%",
                            height: "clamp(2.4rem, 3.75vw, 4.5rem)",
                            background: "#FFFFFF",
                            border: "1px solid rgba(0, 0, 0, 0.15)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingLeft: "clamp(0.71rem, 1.1vw, 1.3rem)",
                            paddingRight: "clamp(0.71rem, 1.1vw, 1.3rem)",
                            cursor: "pointer",
                            outline: "none",
                          }}
                        >
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "clamp(0.71rem, 1.1vw, 1.3rem)", color: treesCountValue ? "#000000" : "rgba(0,0,0,0.4)", }} >
                            {treesCountValue === "1-5" ? "1 - 5 trees" :
                             treesCountValue === "6-10" ? "6 - 10 trees" :
                             treesCountValue === "11-20" ? "11 - 20 trees" :
                             treesCountValue === "20+" ? "20+ trees" :
                             "Select tree count..."}
                          </span>
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                              color: "#363434",
                              width: "clamp(0.5rem, 0.78vw, 0.94rem)",
                              height: "auto",
                            }}
                          >
                            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>

                        {isTreesCountDropdownOpen && (
                          <div
                            style={{
                              position: "absolute",
                              top: "100%",
                              left: 0,
                              right: 0,
                              background: "#FFFFFF",
                              border: "1px solid rgba(0, 0, 0, 0.1)",
                              borderRadius: "12px",
                              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                              zIndex: 1010,
                              marginTop: "4px",
                            }}
                          >
                            {[
                              { label: "1 - 5 trees", value: "1-5" },
                              { label: "6 - 10 trees", value: "6-10" },
                              { label: "11 - 20 trees", value: "11-20" },
                              { label: "20+ trees", value: "20+" },
                            ].map((opt) => (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  onTreesCountChange?.(opt.value);
                                  setIsTreesCountDropdownOpen(false);
                                }}
                                style={{
                                  padding: "clamp(0.5rem, 0.83vw, 1rem) clamp(0.71rem, 1.1vw, 1.3rem)",
                                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                                  fontSize: "clamp(0.71rem, 1.1vw, 1.3rem)",
                                  color: "#1A1C1E",
                                  cursor: "pointer",
                                  transition: "background 0.2s",
                                  background: treesCountValue === opt.value ? "#E5F1F9" : "transparent",
                                }}
                                onMouseEnter={(e) => {
                                  if (treesCountValue !== opt.value) e.currentTarget.style.background = "#F9FAFB";
                                }}
                                onMouseLeave={(e) => {
                                  if (treesCountValue !== opt.value) e.currentTarget.style.background = "transparent";
                                }}
                              >
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
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "clamp(1.33rem, 2.08vw, 2.5rem)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        lineHeight: "clamp(1.11rem, 1.73vw, 2.08rem)",
                        color: "#000000",
                      }}
                    >
                      Select availability Facility
                    </span>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                      }}
                    >
                      <button type="button" onClick={() => onFacilityAvailabilityChange?.("water")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(6.67rem, 10.42vw, 12.5rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: facilityAvailabilityValue === "water" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: facilityAvailabilityValue === "water" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                        <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: facilityAvailabilityValue === "water" ? "#BDD327" : "#FFFFFF", border: facilityAvailabilityValue === "water" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: facilityAvailabilityValue === "water" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                          Water Facility
                        </span>
                      </button>

                      <button type="button" onClick={() => onFacilityAvailabilityChange?.("electricity")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(7.91rem, 12.36vw, 14.83rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: facilityAvailabilityValue === "electricity" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: facilityAvailabilityValue === "electricity" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                        <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: facilityAvailabilityValue === "electricity" ? "#BDD327" : "#FFFFFF", border: facilityAvailabilityValue === "electricity" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: facilityAvailabilityValue === "electricity" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                          Electricity Facility
                        </span>
                      </button>

                      <button type="button" onClick={() => onFacilityAvailabilityChange?.("both")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(4.04rem, 6.32vw, 7.58rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: facilityAvailabilityValue === "both" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: facilityAvailabilityValue === "both" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                        <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: facilityAvailabilityValue === "both" ? "#BDD327" : "#FFFFFF", border: facilityAvailabilityValue === "both" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: facilityAvailabilityValue === "both" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                          Both
                        </span>
                      </button>
                    </div>
                  </div>

                  {(facilityAvailabilityValue === "water" || facilityAvailabilityValue === "both") && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)",
                          lineHeight: "clamp(1.11rem, 1.73vw, 2.08rem)",
                          color: "#000000",
                        }}
                      >
                        Select Water Facility
                      </span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        }}
                      >
                        <button type="button" onClick={() => onWaterFacilityChange?.("bore")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(4.04rem, 6.32vw, 7.58rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: waterFacilityValue === "bore" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: waterFacilityValue === "bore" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                          <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: waterFacilityValue === "bore" ? "#BDD327" : "#FFFFFF", border: waterFacilityValue === "bore" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: waterFacilityValue === "bore" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                            Bore
                          </span>
                        </button>

                        <button type="button" onClick={() => onWaterFacilityChange?.("municipal")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(5.33rem, 8.33vw, 10.0rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: waterFacilityValue === "municipal" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: waterFacilityValue === "municipal" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                          <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: waterFacilityValue === "municipal" ? "#BDD327" : "#FFFFFF", border: waterFacilityValue === "municipal" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: waterFacilityValue === "municipal" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                            Muncipal
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {(facilityAvailabilityValue === "electricity" || facilityAvailabilityValue === "both") && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        width: "100%",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)",
                          lineHeight: "clamp(1.11rem, 1.73vw, 2.08rem)",
                          color: "#000000",
                        }}
                      >
                        Select Electricity Facility
                      </span>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: "clamp(0.8rem, 1.25vw, 1.5rem)",
                        }}
                      >
                        <button type="button" onClick={() => onElectricityFacilityChange?.("2phase")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(4.88rem, 7.64vw, 9.17rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: electricityFacilityValue === "2phase" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: electricityFacilityValue === "2phase" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                          <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: electricityFacilityValue === "2phase" ? "#BDD327" : "#FFFFFF", border: electricityFacilityValue === "2phase" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: electricityFacilityValue === "2phase" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                            2 Phase
                          </span>
                        </button>

                        <button type="button" onClick={() => onElectricityFacilityChange?.("3phase")} style={{ boxSizing: "border-box", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", padding: "clamp(0.44rem, 0.69vw, 0.83rem) clamp(0.8rem, 1.25vw, 1.5rem)", gap: "clamp(0.44rem, 0.69vw, 0.83rem)", width: "auto", minWidth: "clamp(4.93rem, 7.71vw, 9.25rem)", height: "clamp(1.69rem, 2.64vw, 3.17rem)", border: electricityFacilityValue === "3phase" ? "1px solid #2D3409" : "1px solid rgba(0, 0, 0, 0.26)", borderRadius: "33px", background: electricityFacilityValue === "3phase" ? "#2D3409" : "#FFFFFF", cursor: "pointer", transition: "all 0.2s ease", }} >
                          <div style={{ boxSizing: "border-box", width: "clamp(0.53rem, 0.83vw, 1.0rem)", height: "clamp(0.53rem, 0.83vw, 1.0rem)", borderRadius: "50%", background: electricityFacilityValue === "3phase" ? "#BDD327" : "#FFFFFF", border: electricityFacilityValue === "3phase" ? "2px solid #FFFFFF" : "2px solid #BDD327", }} />
                          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", color: electricityFacilityValue === "3phase" ? "#FFFFFF" : "#000000", whiteSpace: "nowrap", }} >
                            3 Phase
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <span
                    style={{
                      width: "100%",
                      height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "clamp(1.07rem, 1.67vw, 2.01rem)",
                      lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)",
                      color: "#000000",
                    }}
                  >
                    Shape of the Land
                  </span>

                  <div style={{ position: "relative", width: "100%" }}>
                    <button
                      type="button"
                      onClick={() => setIsLandShapeDropdownOpen(!isLandShapeDropdownOpen)}
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "clamp(2.25rem, 3.52vw, 4.22rem)",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.15)",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: "clamp(0.6rem, 1vw, 1.5rem)",
                        paddingRight: "clamp(0.6rem, 1vw, 1.5rem)",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)", color: landShapeValue ? "#000000" : "rgba(0,0,0,0.4)", }} >
                        {landShapeValue || "Select shape..."}
                      </span>
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          color: "#363434",
                          width: "clamp(0.5rem, 0.78vw, 0.94rem)",
                          height: "auto",
                        }}
                      >
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {isLandShapeDropdownOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          background: "#FFFFFF",
                          border: "1px solid rgba(0, 0, 0, 0.1)",
                          borderRadius: "12px",
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                          zIndex: 1010,
                          marginTop: "4px",
                        }}
                      >
                        {["Square", "Rectangle", "Triangle", "Trapezoid", "Irregular"].map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              onLandShapeChange?.(opt);
                              setIsLandShapeDropdownOpen(false);
                            }}
                            style={{
                              padding: "clamp(0.5rem, 0.83vw, 1rem) clamp(0.6rem, 1vw, 1.5rem)",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                              color: "#1A1C1E",
                              cursor: "pointer",
                              transition: "background 0.2s",
                              background: landShapeValue === opt ? "#E5F1F9" : "transparent",
                            }}
                            onMouseEnter={(e) => {
                              if (landShapeValue !== opt) e.currentTarget.style.background = "#F9FAFB";
                            }}
                            onMouseLeave={(e) => {
                              if (landShapeValue !== opt) e.currentTarget.style.background = "transparent";
                            }}
                          >
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
            <div
              style={{
                position: "absolute",
                width: "50.15%",
                height: "clamp(15.78rem, 24.65vw, 29.58rem)",
                left: "1.32%",
                top: "clamp(3.24rem, 5.07vw, 6.08rem)",
                boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.15)",
                borderRadius: "24px",
                boxSizing: "border-box",
                background: "#FFFFFF",
              }}
            >
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={triggerUploadClick}
                className="transition-all cursor-pointer"
                style={{
                  boxSizing: "border-box",
                  position: "absolute",
                  width: "41.2%",
                  height: "clamp(14.53rem, 22.7vw, 27.24rem)",
                  left: "1.76%",
                  top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                  borderRadius: "12px",
                  border: "2px dashed #BDD327",
                  background: dragActive ? "rgba(243, 244, 241, 0.6)" : "rgba(242, 244, 246, 0.5)",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                />

                <div
                  style={{
                    position: "absolute",
                    width: "clamp(2.14rem, 3.34vw, 4.01rem)",
                    height: "clamp(2.14rem, 3.34vw, 4.01rem)",
                    left: "calc(50% - clamp(2.14rem, 3.34vw, 4.01rem)/2)",
                    top: "clamp(2.58rem, 4.03vw, 4.83rem)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#E6EEAD",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "clamp(1.72rem, 2.69vw, 3.22rem)",
                      height: "clamp(1.72rem, 2.69vw, 3.22rem)",
                      left: "calc(50% - clamp(1.72rem, 2.69vw, 3.22rem)/2)",
                      top: "calc(50% - clamp(1.72rem, 2.69vw, 3.22rem)/2)",
                      background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                      boxShadow: "0px 6px 9px -1.8px rgba(0, 0, 0, 0.25)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        position: "absolute",
                        width: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        height: "clamp(0.89rem, 1.39vw, 1.67rem)",
                        color: "#FFFFFF",
                      }}
                    >
                      <line x1="12" y1="15" x2="12" y2="3" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="5" y1="21" x2="19" y2="21" />
                    </svg>
                  </div>
                </div>

                <span
                  style={{
                    position: "absolute",
                    width: "clamp(2.84rem, 4.44vw, 5.33rem)",
                    height: "clamp(1.02rem, 1.6vw, 1.92rem)",
                    left: "calc(50% - clamp(2.84rem, 4.44vw, 5.33rem)/2)",
                    top: "clamp(5.39rem, 8.42vw, 10.1rem)",
                    fontSize: "clamp(0.8rem, 1.25vw, 1.5rem)",
                    lineHeight: "clamp(1.02rem, 1.6vw, 1.92rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    color: "#1A1C1D",
                    textAlign: "center",
                  }}
                >
                  Upload
                </span>

                <span
                  style={{
                    position: "absolute",
                    width: "80%",
                    height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                    left: "10%",
                    top: "clamp(6.72rem, 10.5vw, 12.6rem)",
                    fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)",
                    lineHeight: "clamp(0.67rem, 1.04vw, 1.25rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    color: "#414755",
                    textAlign: "center",
                  }}
                >
                  Drag and drop your files here or click to browse your computer.
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerUploadClick();
                  }}
                  className="hover:scale-105 active:scale-95 transition-all"
                  style={{
                    position: "absolute",
                    width: "clamp(4.44rem, 6.94vw, 8.33rem)",
                    height: "clamp(1.69rem, 2.64vw, 3.17rem)",
                    left: "calc(50% - clamp(4.44rem, 6.94vw, 8.33rem)/2)",
                    top: "clamp(9.33rem, 14.58vw, 17.5rem)",
                    background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                    boxShadow: "0px 4px 27.1px rgba(0, 0, 0, 0.12)",
                    borderRadius: "57px",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)", color: "#FFFFFF" }}>
                    Choose File
                  </span>
                </button>

                <div
                  style={{
                    position: "absolute",
                    width: "clamp(3.29rem, 5.14vw, 6.17rem)",
                    height: "clamp(0.53rem, 0.83vw, 1.0rem)",
                    left: "clamp(0.89rem, 1.39vw, 1.67rem)",
                    top: "clamp(13.29rem, 20.76vw, 24.92rem)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    style={{
                      width: "clamp(0.44rem, 0.63vw, 0.83rem)",
                      height: "clamp(0.44rem, 0.63vw, 0.83rem)",
                      color: "#000000",
                    }}
                  >
                    <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                    <path d="M8.5 1.5v3h3" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(0.44rem, 0.63vw, 0.83rem)",
                      lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Format:&nbsp;
                    <strong style={{ fontWeight: 500 }}>PDF</strong>
                  </span>
                </div>

                <div
                  style={{
                    position: "absolute",
                    width: "clamp(4.18rem, 6.53vw, 7.83rem)",
                    height: "clamp(0.53rem, 0.83vw, 1.0rem)",
                    right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                    top: "clamp(13.2rem, 20.63vw, 24.75rem)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(0.44rem, 0.63vw, 0.83rem)",
                      lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)",
                      color: "#000000",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Max File Size:&nbsp;
                    <strong style={{ fontWeight: 500 }}>10MB</strong>
                  </span>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  width: "41.06%",
                  height: "clamp(7.56rem, 11.81vw, 14.17rem)",
                  left: "45.75%",
                  top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "clamp(0.76rem, 1.18vw, 1.42rem)",
                }}
              >
                <h4
                  style={{
                    width: "100%",
                    height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)",
                    lineHeight: "clamp(1.11rem, 1.74vw, 2.08rem)",
                    color: "#000000",
                    margin: 0,
                  }}
                >
                  Uploaded Files
                </h4>

                <div
                  className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar"
                  style={{
                    height: "clamp(5.69rem, 8.89vw, 10.67rem)",
                    gap: "clamp(0.44rem, 0.69vw, 0.83rem)",
                  }}
                >
                  {activeTabLabel === "Land Images" ? (
                    <div className="w-full flex flex-col gap-2">
                      <div>
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 500,
                            color: "#6b7280",
                            display: "block",
                            marginBottom: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Cover image
                        </span>
                        {uploadedFiles.filter((f) => f.imageType === "cover").length === 0 ? (
                          <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1 mb-2">No cover image uploaded yet.</span>
                        ) : (
                          uploadedFiles
                            .filter((f) => f.imageType === "cover")
                            .map((file) => (
                              <div
                                key={file.id}
                                className="relative w-full shrink-0"
                                style={{
                                  height: "clamp(2.62rem, 4.1vw, 4.92rem)",
                                  background: "#F6F9E2",
                                  borderRadius: "12px",
                                  marginBottom: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    width: "clamp(1.29rem, 2.01vw, 2.42rem)",
                                    height: "clamp(1.29rem, 2.01vw, 2.42rem)",
                                    left: "clamp(0.4rem, 0.63vw, 0.75rem)",
                                    top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#FFFFFF",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                      width: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                      height: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                    }}
                                  >
                                    <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                                    <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                                    <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                                    <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                                    <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                                    <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                                  </svg>
                                </div>
                                <div
                                  className="flex flex-col justify-center"
                                  style={{
                                    position: "absolute",
                                    left: "clamp(2.04rem, 3.19vw, 3.83rem)",
                                    top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                    width: "50%",
                                    height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                                  }}
                                >
                                  <span
                                    className="truncate text-black"
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      fontWeight: 400,
                                      fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                      lineHeight: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                      display: "block",
                                    }}
                                  >
                                    {file.name}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      fontWeight: 400,
                                      fontSize: "clamp(0.36rem, 0.56vw, 0.67rem)",
                                      lineHeight: "clamp(0.44rem, 0.69vw, 0.83rem)",
                                      color: "rgba(0, 0, 0, 0.7)",
                                    }}
                                  >
                                    {file.size}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onFileDelete(file.id)}
                                  className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                                  style={{
                                    position: "absolute",
                                    width: "clamp(1.11rem, 1.74vw, 2.08rem)",
                                    height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                                    right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                                    top: "clamp(0.67rem, 1.04vw, 1.25rem)",
                                    borderRadius: "2px",
                                    border: "none",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                      width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                                      height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                                      color: "rgba(0, 0, 0, 0.82)",
                                    }}
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  </svg>
                                </button>
                              </div>
                            ))
                        )}
                      </div>

                      <div>
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 500,
                            color: "#6b7280",
                            display: "block",
                            marginBottom: "4px",
                            marginTop: "4px",
                            fontSize: "12px",
                          }}
                        >
                          Uploaded images
                        </span>
                        {uploadedFiles.filter((f) => f.imageType === "land").length === 0 ? (
                          <span className="text-gray-400 font-['Inter',_sans-serif] text-[10px] block pl-1">No uploaded images yet.</span>
                        ) : (
                          uploadedFiles
                            .filter((f) => f.imageType === "land")
                            .map((file) => (
                              <div
                                key={file.id}
                                className="relative w-full shrink-0"
                                style={{
                                  height: "clamp(2.62rem, 4.1vw, 4.92rem)",
                                  background: "#F6F9E2",
                                  borderRadius: "12px",
                                  marginBottom: "4px",
                                }}
                              >
                                <div
                                  style={{
                                    position: "absolute",
                                    width: "clamp(1.29rem, 2.01vw, 2.42rem)",
                                    height: "clamp(1.29rem, 2.01vw, 2.42rem)",
                                    left: "clamp(0.4rem, 0.63vw, 0.75rem)",
                                    top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                    borderRadius: "4px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: "#FFFFFF",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                      width: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                      height: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                    }}
                                  >
                                    <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                                    <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                                    <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                                    <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                                    <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                                    <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                                  </svg>
                                </div>
                                <div
                                  className="flex flex-col justify-center"
                                  style={{
                                    position: "absolute",
                                    left: "clamp(2.04rem, 3.19vw, 3.83rem)",
                                    top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                    width: "50%",
                                    height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                                  }}
                                >
                                  <span
                                    className="truncate text-black"
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      fontWeight: 400,
                                      fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                      lineHeight: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                      display: "block",
                                    }}
                                  >
                                    {file.name}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: "'Inter', sans-serif",
                                      fontWeight: 400,
                                      fontSize: "clamp(0.36rem, 0.56vw, 0.67rem)",
                                      lineHeight: "clamp(0.44rem, 0.69vw, 0.83rem)",
                                      color: "rgba(0, 0, 0, 0.7)",
                                    }}
                                  >
                                    {file.size}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onFileDelete(file.id)}
                                  className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                                  style={{
                                    position: "absolute",
                                    width: "clamp(1.11rem, 1.74vw, 2.08rem)",
                                    height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                                    right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                                    top: "clamp(0.67rem, 1.04vw, 1.25rem)",
                                    borderRadius: "2px",
                                    border: "none",
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{
                                      width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                                      height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                                      color: "rgba(0, 0, 0, 0.82)",
                                    }}
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
                  ) : (
                    uploadedFiles.length === 0 ? (
                      <span className="text-gray-400 font-['Inter',_sans-serif] text-xs">No files uploaded yet.</span>
                    ) : (
                      uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="relative w-full shrink-0"
                          style={{
                            height: "clamp(2.62rem, 4.1vw, 4.92rem)",
                            background: "#F6F9E2",
                            borderRadius: "12px",
                            marginBottom: "4px",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              width: "clamp(1.29rem, 2.01vw, 2.42rem)",
                              height: "clamp(1.29rem, 2.01vw, 2.42rem)",
                              left: "clamp(0.4rem, 0.63vw, 0.75rem)",
                              top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background: "#FFFFFF",
                            }}
                          >
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                width: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                height: "clamp(0.76rem, 1.18vw, 1.42rem)",
                              }}
                            >
                              <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                              <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                              <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                              <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                              <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                              <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                            </svg>
                          </div>

                          <div
                            className="flex flex-col justify-center"
                            style={{
                              position: "absolute",
                              left: "clamp(2.04rem, 3.19vw, 3.83rem)",
                              top: "clamp(0.62rem, 0.97vw, 1.17rem)",
                              width: "50%",
                              height: "clamp(1.33rem, 2.08vw, 2.5rem)",
                            }}
                          >
                            <span
                              className="truncate text-black"
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
                                lineHeight: "clamp(0.76rem, 1.18vw, 1.42rem)",
                                display: "block",
                              }}
                            >
                              {file.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 400,
                                fontSize: "clamp(0.36rem, 0.56vw, 0.67rem)",
                                lineHeight: "clamp(0.44rem, 0.69vw, 0.83rem)",
                                color: "rgba(0, 0, 0, 0.7)",
                              }}
                            >
                              {file.size}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onFileDelete(file.id)}
                            className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                            style={{
                              position: "absolute",
                              width: "clamp(1.11rem, 1.74vw, 2.08rem)",
                              height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                              right: "clamp(0.67rem, 1.04vw, 1.25rem)",
                              top: "clamp(0.67rem, 1.04vw, 1.25rem)",
                              borderRadius: "2px",
                              border: "none",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                                height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                                color: "rgba(0, 0, 0, 0.82)",
                              }}
                            >
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
        <div
          style={{
            position: "absolute",
            width: "45.44%",
            height: "clamp(8.04rem, 12.56vw, 15.08rem)",
            left: "52.65%",
            top: "clamp(3.24rem, 5.07vw, 6.08rem)",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              background: "rgba(230, 238, 173, 0.15)",
              border: "1px solid #E6EEAD",
              borderRadius: "18px",
              zIndex: 0,
            }}
          />

          <textarea
            value={commentValue}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            style={{
              position: "absolute",
              width: "91.59%",
              height: "clamp(3.73rem, 5.83vw, 7.0rem)",
              left: "4.21%",
              top: "clamp(1.07rem, 1.67vw, 2.0rem)",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
              lineHeight: "clamp(0.93rem, 1.46vw, 1.75rem)",
              zIndex: 1,
              background: "transparent",
              resize: "none",
              border: "none",
              outline: "none",
              color: "#000000",
            }}
          />

          <button
            type="button"
            onClick={handleVoiceInput}
            className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
              isListening ? "bg-red-600 animate-pulse" : ""
            }`}
            style={{
              position: "absolute",
              width: "clamp(1.42rem, 2.22vw, 2.67rem)",
              height: "clamp(1.42rem, 2.22vw, 2.67rem)",
              left: "92.56%",
              top: "clamp(6.0rem, 9.38vw, 11.25rem)",
              background: isListening ? "#dc2626" : "#2D3509",
              border: "none",
              zIndex: 1,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "clamp(0.8rem, 1.25vw, 1.5rem)",
                height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                color: "#FFFFFF",
              }}
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div
        className="absolute"
        style={{
          width: "15.59%",
          height: "clamp(1.69rem, 2.64vw, 3.17rem)",
          left: "auto",
          right: "1.91%",
          top: activeTabLabel === "Survey Report"
            ? surveyReportTypeValue === "both"
              ? "clamp(61.16rem, 41.035rem + 31.25vw, 78.66rem)"
              : "clamp(40.66rem, 21.16rem + 30.4vw, 57.66rem)"
            : "clamp(16.84rem, 26.32vw, 31.58rem)",
          boxSizing: "border-box",
          borderRadius: "24px",
          background: "#FFFFFF",
        }}
      >
        <button
          type="button"
          onClick={onPrevTab}
          className="hover:bg-red-50/20 active:scale-95 transition-all"
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "47.17%",
            height: "100%",
            left: 0,
            top: 0,
            borderRadius: "33px",
            fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)",
            lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 500,
            color: "rgba(0, 0, 0, 0.8)",
            border: "1px solid rgba(205, 0, 0, 0.27)",
            cursor: "pointer",
          }}
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNextTab}
          className="hover:scale-105 active:scale-95 transition-all"
          style={{
            position: "absolute",
            width: "47.17%",
            height: "100%",
            left: "52.83%",
            top: 0,
            background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
            borderRadius: "57px",
            fontSize: "clamp(0.58rem, 0.9vw, 1.09rem)",
            lineHeight: "clamp(0.71rem, 1.1vw, 1.33rem)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 400,
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
