import React, { useRef, useState, useEffect } from "react";
import { Mic } from "lucide-react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
}

interface UploadFilesDocumentProps {
  activeTabLabel: string;
  uploadedFiles: UploadedFileItem[];
  commentValue: string;
  onCommentChange: (val: string) => void;
  onFileUpload: (files: FileList) => void;
  onFileDelete: (fileId: string) => void;
  onPrevTab: () => void;
  onNextTab: () => void;
  isFinishStep: boolean;
  className?: string;
  style?: React.CSSProperties;
  selectedSoilType?: string;
  onSoilTypeChange?: (val: string) => void;
  selectedCropType?: string;
  onCropTypeChange?: (val: string) => void;
  waterLevelValue?: string;
  onWaterLevelChange?: (val: string) => void;
  selectedFutureCrops?: string;
  onFutureCropsChange?: (val: string) => void;
  yieldCostValue?: string;
  onYieldCostChange?: (val: string) => void;
  yieldReturnsValue?: string;
  onYieldReturnsChange?: (val: string) => void;
  cultivationTypeValue?: string;
  onCultivationTypeChange?: (val: string) => void;
  cultivationNameValue?: string;
  onCultivationNameChange?: (val: string) => void;
  cultivationContactValue?: string;
  onCultivationContactChange?: (val: string) => void;
  maintenanceCropValue?: string;
  onMaintenanceCropChange?: (val: string) => void;
  maintenanceReturnsValue?: string;
  onMaintenanceReturnsChange?: (val: string) => void;
  advantagesValue?: string;
  onAdvantagesChange?: (val: string) => void;
  disadvantagesValue?: string;
  onDisadvantagesChange?: (val: string) => void;
}

export const UploadFilesDocument: React.FC<UploadFilesDocumentProps> = ({
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
  selectedSoilType = "Red Soil",
  onSoilTypeChange,
  selectedCropType = "Paddy",
  onCropTypeChange,
  waterLevelValue = "",
  onWaterLevelChange,
  selectedFutureCrops = "",
  onFutureCropsChange,
  yieldCostValue = "",
  onYieldCostChange,
  yieldReturnsValue = "",
  onYieldReturnsChange,
  cultivationTypeValue = "Self",
  onCultivationTypeChange,
  cultivationNameValue = "",
  onCultivationNameChange,
  cultivationContactValue = "",
  onCultivationContactChange,
  maintenanceCropValue = "",
  onMaintenanceCropChange,
  maintenanceReturnsValue = "",
  onMaintenanceReturnsChange,
  advantagesValue = "",
  onAdvantagesChange,
  disadvantagesValue = "",
  onDisadvantagesChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
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
      className={`bg-white select-none ${className}`}
      style={{
        position: "absolute",
        left: "clamp(1.77rem, 2.78vw, 3.33rem)", // left: 40px
        right: "clamp(1.77rem, 2.78vw, 3.33rem)", // right: 40px
        top: "clamp(26rem, 40.63vw, 48.75rem)", // top: 585px
        height: "clamp(19.68rem, 30.76vw, 36.91rem)", // height: 443px
        borderRadius: "24px",
        boxSizing: "border-box",
        background: "#FFFFFF",
        ...style,
      }}
    >
      {/* Add Comments Title */}
      {activeTabLabel !== "Future Crops" && activeTabLabel !== "Natural Advantages and Disadvantages" && (
        <h3
          className="text-black font-semibold whitespace-nowrap"
          style={{
            position: "absolute",
            width: "13.38%", // width: 182px relative to parent 1360px
            height: "clamp(1.33rem, 2.08vw, 2.5rem)", // height: 30px
            left: "52.65%", // left: 716px relative to parent 1360px
            top: "clamp(1.33rem, 2.08vw, 2.5rem)", // top: 30px
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
            lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          Add Comments
        </h3>
      )}

      {activeTabLabel === "Soil Report" || activeTabLabel === "Type of Crop" || activeTabLabel === "Ground Water Level" || activeTabLabel === "Types of Crop can be grown" || activeTabLabel === "Current Yield Cost" || activeTabLabel === "Current Cultivation" || activeTabLabel === "Future Crops" || activeTabLabel === "Maintenance" || activeTabLabel === "Natural Advantages and Disadvantages" ? (
        /* Frame 2147240716 - Dropdown / Selection Card */
        <div
          ref={dropdownRef}
          style={{
            position: "absolute",
            width: "47.06%", // exactly 640px relative to parent 1360px width
            height: activeTabLabel === "Types of Crop can be grown"
              ? (isDropdownOpen ? "clamp(16rem, 27.22vw, 24.5rem)" : "clamp(4rem, 6.74vw, 6.0625rem)")
              : activeTabLabel === "Current Yield Cost"
              ? "clamp(10rem, 14.3vw, 12.875rem)"
              : activeTabLabel === "Current Cultivation"
              ? "clamp(16rem, 23.05vw, 20.75rem)"
              : activeTabLabel === "Future Crops"
              ? "clamp(10.5rem, 15.28vw, 13.75rem)" // 220px
              : activeTabLabel === "Maintenance"
              ? (isDropdownOpen ? "clamp(20rem, 32.5vw, 29rem)" : "clamp(11rem, 16.39vw, 14.75rem)") // Adjust height dynamically when dropdown is open
              : activeTabLabel === "Natural Advantages and Disadvantages"
              ? "clamp(10rem, 14.3vw, 12.875rem)"
              : "clamp(4rem, 6.74vw, 6.0625rem)", // 392px when open, 97px when closed
            left: "1.32%", // exactly 18px relative to parent 1360px
            top: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", // 9px
            zIndex: 100,
          }}
        >
          {activeTabLabel === "Natural Advantages and Disadvantages" ? (
            /* Natural Advantages and Disadvantages Layout */
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.8rem, 1.39vw, 1.25rem)", // 20px
              }}
            >
              {/* Field 1: What are the Advantages? */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  What are the Advantages?
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter advantages"
                    value={advantagesValue}
                    onChange={(e) => {
                      if (onAdvantagesChange) {
                        onAdvantagesChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>

              {/* Field 2: What are the Disadvantages? */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  What are the Disadvantages?
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter disadvantages"
                    value={disadvantagesValue}
                    onChange={(e) => {
                      if (onDisadvantagesChange) {
                        onDisadvantagesChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : activeTabLabel === "Maintenance" ? (
            /* Maintenance Layout */
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.8rem, 1.39vw, 1.25rem)", // 20px
              }}
            >
              {/* Field 1: If Green Land Captial does the maintenace, what will be the suggested crop? */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  If Green Land Captial does the maintenace, what will be the suggested crop?
                </span>
                
                {/* Custom multi-select dropdown for maintenance crop */}
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <div
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(1.5rem, 3.12vw, 3rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      cursor: "pointer",
                      borderRadius: "8px",
                      userSelect: "none",
                    }}
                  >
                    {maintenanceCropValue ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.4rem, 0.69vw, 0.625rem)", alignItems: "center" }}>
                        {maintenanceCropValue.split(",").map((s) => s.trim()).filter(Boolean).map((crop) => (
                          <div
                            key={crop}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "clamp(0.4rem, 0.69vw, 0.625rem)",
                              background: "#FFFFFF",
                              border: "0.09375rem solid #E5E385",
                              borderRadius: "0.25rem",
                              padding: "clamp(0.1rem, 0.14vw, 0.125rem) clamp(0.3rem, 0.56vw, 0.5rem) clamp(0.1rem, 0.14vw, 0.125rem) clamp(0.2rem, 0.28vw, 0.25rem)",
                            }}
                          >
                            <div
                              style={{
                                width: "clamp(0.75rem, 1.25vw, 1.125rem)",
                                height: "clamp(0.75rem, 1.25vw, 1.125rem)",
                                background: "#2D3409",
                                border: "0.09375rem solid #F1F1FF",
                                borderRadius: "0.125rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FFFFFF"
                                strokeWidth="4"
                                style={{ width: "clamp(0.5rem, 0.83vw, 0.75rem)", height: "clamp(0.5rem, 0.83vw, 0.75rem)" }}
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span
                              style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "clamp(0.7rem, 0.97vw, 0.875rem)",
                                fontWeight: 500,
                                color: "#5A5C5E",
                              }}
                            >
                              {crop}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "rgba(0, 0, 0, 0.4)" }}>Select Types</span>
                    )}
                  </div>
                  {/* Chevron Icon */}
                  <div
                    style={{
                      position: "absolute",
                      right: "4.06%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        color: "#363434",
                        width: "clamp(0.5rem, 0.83vw, 0.75rem)",
                        height: "auto",
                      }}
                    >
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Options popup */}
                {isDropdownOpen && (
                  <>
                    <style>{`
                      .maintenance-crops-scrollbar::-webkit-scrollbar {
                        width: clamp(0.2rem, 0.28vw, 0.25rem);
                      }
                      .maintenance-crops-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                      }
                      .maintenance-crops-scrollbar::-webkit-scrollbar-thumb {
                        background: #6B8218;
                        border-radius: 1.25rem;
                      }
                    `}</style>
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "clamp(8rem, 13vw, 11.75rem)", // 188px
                        border: "0.0625rem solid #999999",
                        borderRadius: "0.5rem",
                        background: "#FFFFFF",
                        padding: "clamp(0.5rem, 0.9vw, 0.8125rem) clamp(0.75rem, 1.11vw, 1rem) clamp(0.75rem, 1.11vw, 1rem) clamp(0.75rem, 1.11vw, 1rem)",
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "4px",
                        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      {/* Search box */}
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          height: "clamp(2rem, 3.06vw, 2.75rem)",
                          border: "0.0625rem solid #C5C1C1",
                          borderRadius: "4.9375rem",
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "clamp(2rem, 3.33vw, 3rem)",
                          flexShrink: 0,
                          marginBottom: "clamp(0.5rem, 0.8vw, 1rem)",
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(0, 0, 0, 0.6)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            position: "absolute",
                            left: "clamp(0.75rem, 1.11vw, 1rem)",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "clamp(0.8rem, 1.39vw, 1.25rem)",
                            height: "clamp(0.8rem, 1.39vw, 1.25rem)",
                          }}
                        >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "clamp(0.85rem, 1.11vw, 1rem)",
                            color: "#000000",
                          }}
                        />
                      </div>

                      {/* Options Grid */}
                      <div
                        className="maintenance-crops-scrollbar"
                        style={{
                          flex: 1,
                          overflowY: "auto",
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          rowGap: "clamp(0.6rem, 1.0vw, 1.25rem)",
                          columnGap: "clamp(0.6rem, 1.0vw, 1.25rem)",
                          paddingRight: "clamp(0.35rem, 0.56vw, 0.5rem)",
                        }}
                      >
                        {[
                          "Paddy",
                          "Wheat",
                          "Cotton",
                          "Sugarcane",
                          "Maize",
                          "Groundnut",
                          "Pulses"
                        ]
                          .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((crop, idx) => {
                            const selectedList = maintenanceCropValue
                              ? maintenanceCropValue.split(",").map((s) => s.trim()).filter(Boolean)
                              : [];
                            const isChecked = selectedList.includes(crop);
                            return (
                              <div
                                key={idx}
                                onClick={() => {
                                  let newList;
                                  if (isChecked) {
                                    newList = selectedList.filter((item) => item !== crop);
                                  } else {
                                    newList = [...selectedList, crop];
                                  }
                                  if (onMaintenanceCropChange) {
                                    onMaintenanceCropChange(newList.join(", "));
                                  }
                                }}
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  gap: "clamp(0.4rem, 0.69vw, 0.625rem)",
                                  cursor: "pointer",
                                }}
                              >
                                <div
                                  style={{
                                    boxSizing: "border-box",
                                    width: "clamp(0.75rem, 1.25vw, 1.125rem)",
                                    height: "clamp(0.75rem, 1.25vw, 1.125rem)",
                                    background: isChecked ? "#2D3409" : "#E8FFCA",
                                    border: isChecked ? "0.09375rem solid #F1F1FF" : "0.09375rem solid #E5E385",
                                    borderRadius: "0.125rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  {isChecked && (
                                    <svg
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#FFFFFF"
                                      strokeWidth="4"
                                      style={{ width: "clamp(0.5rem, 0.83vw, 0.75rem)", height: "clamp(0.5rem, 0.83vw, 0.75rem)" }}
                                    >
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </div>
                                <span
                                  style={{
                                    fontFamily: "'Poppins', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "clamp(0.7rem, 0.97vw, 0.875rem)",
                                    lineHeight: "clamp(0.9rem, 1.46vw, 1.3125rem)",
                                    color: "#5A5C5E",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {crop}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Field 2: What will be the best returns? */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  What will be the best returns?
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={maintenanceReturnsValue}
                    onChange={(e) => {
                      if (onMaintenanceReturnsChange) {
                        onMaintenanceReturnsChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : activeTabLabel === "Future Crops" ? (
            /* Future Crops - Comments Box on Left Layout */
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", // 9px
              }}
            >
              {/* Header: Future crop plans suggested by Green Land Captial */}
              <span
                style={{
                  width: "max-content",
                  whiteSpace: "nowrap",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                  lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                  color: "#000000",
                }}
              >
                Future crop plans suggested by{" "}
                <span style={{ color: "#007BFF" }}>Green Land Captial</span>
              </span>

              {/* Comments Box container */}
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "clamp(8.04rem, 12.57vw, 15.08rem)", // 181px
                  background: "rgba(230, 238, 173, 0.3)",
                  border: "1px solid #E6EEAD",
                  borderRadius: "18px",
                  position: "relative",
                }}
              >
                <textarea
                  value={commentValue}
                  onChange={(e) => onCommentChange(e.target.value)}
                  placeholder="Write a comment"
                  className="bg-transparent resize-none border-none outline-none text-black placeholder-[rgba(0,0,0,0.4)]"
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
                  }}
                />
                
                {/* Voice Input Microphone Button */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
                    isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90"
                  }`}
                  style={{
                    position: "absolute",
                    width: "clamp(1.42rem, 2.22vw, 2.67rem)",
                    height: "clamp(1.42rem, 2.22vw, 2.67rem)",
                    right: "3.23%", // align beautifully inside the 640px box
                    top: "clamp(5.0rem, 7.8vw, 9.38rem)", // 120px to fit inside 181px
                    background: "#2D3509",
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
                    <line x1="12" y1="19" x2="12" y2="22" />
                  </svg>
                </button>
              </div>
            </div>
          ) : activeTabLabel === "Current Cultivation" ? (
            /* Current Cultivation - Custom Form Layout */
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.9rem, 1.6vw, 1.4375rem)", // 23px
              }}
            >
              {/* Field 1: What is the Current Cultivation Type? */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.5rem, 0.9vw, 0.8125rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  What is the Current Cultivation Type?
                </span>
                
                {/* Self / Lease Radio Buttons */}
                <div style={{ display: "flex", flexDirection: "row", gap: "clamp(1.12rem, 1.87vw, 1.6875rem)", height: "clamp(1.58rem, 2.64vw, 2.375rem)" }}>
                  {/* Self Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onCultivationTypeChange) {
                        onCultivationTypeChange("Self");
                      }
                    }}
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "clamp(0.4rem, 0.69vw, 0.625rem) clamp(0.7rem, 1.25vw, 1.125rem)", // 10px 18px
                      gap: "clamp(0.4rem, 0.69vw, 0.625rem)",
                      width: "clamp(4rem, 5.9vw, 5.3125rem)", // 85px
                      height: "clamp(1.58rem, 2.64vw, 2.375rem)", // 38px
                      border: cultivationTypeValue === "Self" ? "2px solid #2D3509" : "1px solid #000000",
                      borderRadius: "33px",
                      background: cultivationTypeValue === "Self" ? "#F4F7E6" : "#FFFFFF",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(0.4rem, 0.69vw, 0.625rem)" }}>
                      {/* Radio Circle */}
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "clamp(0.5rem, 0.83vw, 0.75rem)", // 12px
                          height: "clamp(0.5rem, 0.83vw, 0.75rem)",
                          background: cultivationTypeValue === "Self" ? "#2D3509" : "#FFFFFF",
                          border: cultivationTypeValue === "Self" ? "2px solid #2D3509" : "2px solid #85BFE5",
                          borderRadius: "50%",
                          transition: "all 0.2s ease-in-out",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(0.65rem, 0.97vw, 0.875rem)", // 14px
                          lineHeight: "clamp(0.85rem, 1.25vw, 1.125rem)",
                          color: "#000000",
                        }}
                      >
                        Self
                      </span>
                    </div>
                  </button>

                  {/* Lease Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (onCultivationTypeChange) {
                        onCultivationTypeChange("Lease");
                      }
                    }}
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "clamp(0.4rem, 0.69vw, 0.625rem) clamp(0.7rem, 1.25vw, 1.125rem)",
                      gap: "clamp(0.4rem, 0.69vw, 0.625rem)",
                      width: "clamp(4.5rem, 6.8vw, 6.125rem)", // 98px
                      height: "clamp(1.58rem, 2.64vw, 2.375rem)", // 38px
                      border: cultivationTypeValue === "Lease" ? "2px solid #2D3509" : "1px solid #000000",
                      borderRadius: "33px",
                      background: cultivationTypeValue === "Lease" ? "#F4F7E6" : "#FFFFFF",
                      cursor: "pointer",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "clamp(0.4rem, 0.69vw, 0.625rem)" }}>
                      {/* Radio Circle */}
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "clamp(0.5rem, 0.83vw, 0.75rem)",
                          height: "clamp(0.5rem, 0.83vw, 0.75rem)",
                          background: cultivationTypeValue === "Lease" ? "#2D3509" : "#FFFFFF",
                          border: cultivationTypeValue === "Lease" ? "2px solid #2D3509" : "2px solid #85BFE5",
                          borderRadius: "50%",
                          transition: "all 0.2s ease-in-out",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          fontWeight: 600,
                          fontSize: "clamp(0.65rem, 0.97vw, 0.875rem)",
                          lineHeight: "clamp(0.85rem, 1.25vw, 1.125rem)",
                          color: "#000000",
                        }}
                      >
                        Lease
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Field 2: Name */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.3rem, 0.5vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  Name
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={cultivationNameValue}
                    onChange={(e) => {
                      if (onCultivationNameChange) {
                        onCultivationNameChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>

              {/* Field 3: Contact Details */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.3rem, 0.5vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  Contact Details
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Contact Details"
                    value={cultivationContactValue}
                    onChange={(e) => {
                      if (onCultivationContactChange) {
                        onCultivationContactChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : activeTabLabel === "Current Yield Cost" ? (
            /* Current Yield Cost - Two Input Fields Layout */
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(0.8rem, 1.39vw, 1.25rem)", // 20px
              }}
            >
              {/* Field 1: Current Yielding Cost */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  What is the current yielding cost?
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={yieldCostValue}
                    onChange={(e) => {
                      if (onYieldCostChange) {
                        onYieldCostChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>

              {/* Field 2: Current returns from yield */}
              <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.4rem, 0.63vw, 0.5625rem)", width: "100%" }}>
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                    lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                    color: "#000000",
                  }}
                >
                  Current returns from yield?
                </span>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.4)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={yieldReturnsValue}
                    onChange={(e) => {
                      if (onYieldReturnsChange) {
                        onYieldReturnsChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Soil Type Header Label */}
              <span
                style={{
                  width: "100%",
                  height: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontStyle: "normal",
                  fontWeight: 600,
                  fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
                  lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                  color: "#000000",
                }}
              >
                {activeTabLabel === "Soil Report"
                  ? "Soil Type"
                  : activeTabLabel === "Type of Crop"
                  ? "Types of Crops available present?"
                  : activeTabLabel === "Types of Crop can be grown"
                  ? "Types of Crop can br Grown in Future"
                  : "Depth of Ground Water Level"}
              </span>

              {/* Dropdown Container Box (Frame 2147239871) */}
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "clamp(2.25rem, 3.75vw, 3.375rem)", // 54px
                  background: "#FFFFFF",
                  border: activeTabLabel === "Types of Crop can be grown"
                    ? "1px solid rgba(0, 0, 0, 0.4)"
                    : "1px solid rgba(0, 0, 0, 0.6)",
                  borderRadius: "8px",
                  position: "relative",
                }}
              >
                {activeTabLabel === "Soil Report" ? (
                  <select
                    value={selectedSoilType}
                    onChange={(e) => {
                      if (onSoilTypeChange) {
                        onSoilTypeChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      appearance: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(1.5rem, 3.12vw, 3rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="Red Soil">Red Soil</option>
                    <option value="Black Soil">Black Soil</option>
                    <option value="Alluvial Soil">Alluvial Soil</option>
                    <option value="Laterite Soil">Laterite Soil</option>
                    <option value="Sandy Soil">Sandy Soil</option>
                    <option value="Clay Soil">Clay Soil</option>
                    <option value="Loamy Soil">Loamy Soil</option>
                  </select>
                ) : activeTabLabel === "Type of Crop" ? (
                  <select
                    value={selectedCropType}
                    onChange={(e) => {
                      if (onCropTypeChange) {
                        onCropTypeChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      appearance: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(1.5rem, 3.12vw, 3rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                  >
                    <option value="Paddy">Paddy</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Sugarcane">Sugarcane</option>
                    <option value="Maize">Maize</option>
                    <option value="Groundnut">Groundnut</option>
                    <option value="Pulses">Pulses</option>
                  </select>
                ) : activeTabLabel === "Types of Crop can be grown" ? (
                  <div
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(1.5rem, 3.12vw, 3rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      cursor: "pointer",
                      borderRadius: "8px",
                      userSelect: "none",
                    }}
                  >
                    {selectedFutureCrops ? (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(0.4rem, 0.69vw, 0.625rem)", alignItems: "center" }}>
                        {selectedFutureCrops.split(",").map((s) => s.trim()).filter(Boolean).map((crop) => (
                          <div
                            key={crop}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "clamp(0.4rem, 0.69vw, 0.625rem)",
                              background: "#FFFFFF",
                              border: "0.09375rem solid #E5E385",
                              borderRadius: "0.25rem",
                              padding: "clamp(0.1rem, 0.14vw, 0.125rem) clamp(0.3rem, 0.56vw, 0.5rem) clamp(0.1rem, 0.14vw, 0.125rem) clamp(0.2rem, 0.28vw, 0.25rem)",
                            }}
                          >
                            <div
                              style={{
                                width: "clamp(0.75rem, 1.25vw, 1.125rem)",
                                height: "clamp(0.75rem, 1.25vw, 1.125rem)",
                                background: "#2D3409",
                                border: "0.09375rem solid #F1F1FF",
                                borderRadius: "0.125rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FFFFFF"
                                strokeWidth="4"
                                style={{ width: "clamp(0.5rem, 0.83vw, 0.75rem)", height: "clamp(0.5rem, 0.83vw, 0.75rem)" }}
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span
                              style={{
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "clamp(0.7rem, 0.97vw, 0.875rem)",
                                fontWeight: 500,
                                color: "#5A5C5E",
                              }}
                            >
                              {crop}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ color: "rgba(0, 0, 0, 0.4)" }}>Select types</span>
                    )}
                  </div>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter depth"
                    value={waterLevelValue}
                    onChange={(e) => {
                      if (onWaterLevelChange) {
                        onWaterLevelChange(e.target.value);
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      paddingLeft: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      paddingRight: "clamp(0.6rem, 1.25vw, 1.25rem)",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(0.75rem, 1.11vw, 1.25rem)",
                      color: "#000000",
                      borderRadius: "8px",
                    }}
                  />
                )}
                {/* Chevron Icon SVG */}
                {activeTabLabel !== "Ground Water Level" && (
                  <div
                    style={{
                      position: "absolute",
                      right: "4.06%",
                      top: "50%",
                      transform: "translateY(-50%)",
                      pointerEvents: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="7"
                      viewBox="0 0 12 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        color: "#363434",
                        width: "clamp(0.5rem, 0.83vw, 0.75rem)",
                        height: "auto",
                      }}
                    >
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </>
          )}
          {/* Types of Crop can be grown Search and Options Popup Box (Frame 2147239874) */}
          {activeTabLabel === "Types of Crop can be grown" && isDropdownOpen && (
            <>
              <style>{`
                .future-crops-scrollbar::-webkit-scrollbar {
                  width: clamp(0.2rem, 0.28vw, 0.25rem);
                }
                .future-crops-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .future-crops-scrollbar::-webkit-scrollbar-thumb {
                  background: #6B8218;
                  border-radius: 1.25rem;
                }
              `}</style>
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  height: "clamp(12rem, 19.86vw, 17.875rem)",
                  border: "0.0625rem solid #999999",
                  borderRadius: "0.5rem",
                  background: "#FFFFFF",
                  padding: "clamp(0.5rem, 0.9vw, 0.8125rem) clamp(0.75rem, 1.11vw, 1rem) clamp(0.75rem, 1.11vw, 1rem) clamp(0.75rem, 1.11vw, 1rem)",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "0px",
                }}
              >
                {/* Search Input Bar (Frame 2147239875) */}
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "clamp(2rem, 3.06vw, 2.75rem)",
                    border: "0.0625rem solid #C5C1C1",
                    borderRadius: "4.9375rem",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "clamp(2rem, 3.33vw, 3rem)",
                    flexShrink: 0,
                    marginBottom: "clamp(0.75rem, 1.11vw, 1rem)",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(0, 0, 0, 0.6)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: "absolute",
                      left: "clamp(0.75rem, 1.11vw, 1rem)",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "clamp(0.8rem, 1.39vw, 1.25rem)",
                      height: "clamp(0.8rem, 1.39vw, 1.25rem)",
                    }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.85rem, 1.11vw, 1rem)",
                      color: "#000000",
                    }}
                  />
                </div>

                {/* Option List Grid */}
                <div
                  className="future-crops-scrollbar"
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    rowGap: "clamp(0.8rem, 1.39vw, 1.25rem)",
                    columnGap: "clamp(0.8rem, 1.39vw, 1.25rem)",
                    paddingRight: "clamp(0.35rem, 0.56vw, 0.5rem)",
                  }}
                >
                  {[
                    "Rice",
                    "Sun Flower",
                    "Sun Flower",
                    "Corn",
                    "Sugar Cane",
                    "Sugar Cane",
                    "Cotton",
                    "Sun Flower",
                    "Sun Flower",
                    "Wheat",
                    "Sugar Cane",
                    "Sugar Cane",
                    "Wheat",
                    "Sugar Cane",
                    "Sugar Cane"
                  ]
                    .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((crop, idx) => {
                      const selectedList = selectedFutureCrops
                        ? selectedFutureCrops.split(",").map((s) => s.trim()).filter(Boolean)
                        : [];
                      const isChecked = selectedList.includes(crop);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            let newList;
                            if (isChecked) {
                              newList = selectedList.filter((item) => item !== crop);
                            } else {
                              newList = [...selectedList, crop];
                            }
                            if (onFutureCropsChange) {
                              onFutureCropsChange(newList.join(", "));
                            }
                          }}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "clamp(0.4rem, 0.69vw, 0.625rem)",
                            cursor: "pointer",
                            height: "clamp(0.75rem, 1.25vw, 1.125rem)",
                          }}
                        >
                          <div
                            style={{
                              boxSizing: "border-box",
                              width: "clamp(0.75rem, 1.25vw, 1.125rem)",
                              height: "clamp(0.75rem, 1.25vw, 1.125rem)",
                              background: isChecked ? "#2D3409" : "#E8FFCA",
                              border: isChecked ? "0.09375rem solid #F1F1FF" : "0.09375rem solid #E5E385",
                              borderRadius: "0.125rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isChecked && (
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#FFFFFF"
                                strokeWidth="4"
                                style={{ width: "clamp(0.5rem, 0.83vw, 0.75rem)", height: "clamp(0.5rem, 0.83vw, 0.75rem)" }}
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 500,
                              fontSize: "clamp(0.7rem, 0.97vw, 0.875rem)",
                              lineHeight: "clamp(0.9rem, 1.46vw, 1.3125rem)",
                              color: "#5A5C5E",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {crop}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Upload File Title */}
          <h3
            className="text-black font-semibold whitespace-nowrap"
            style={{
              position: "absolute",
              width: "9.56%", // width: 130px relative to parent 1360px
              height: "clamp(1.33rem, 2.08vw, 2.5rem)", // height: 30px
              left: "2.21%", // left: 30px relative to parent 1360px
              top: "clamp(1.33rem, 2.08vw, 2.5rem)", // top: 30px
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(1.07rem, 1.67vw, 2rem)", // 24px
              lineHeight: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            Upload File
          </h3>

          {/* Left Card: Frame 2147239867 */}
          <div
            className="bg-white"
            style={{
              position: "absolute",
              width: "50.15%", // width: 682px relative to parent 1360px
              height: "clamp(15.78rem, 24.65vw, 29.58rem)", // height: 355px
              left: "1.32%", // left: 18px relative to parent 1360px
              top: "clamp(3.24rem, 5.07vw, 6.08rem)", // top: 73px
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "24px",
              boxSizing: "border-box",
            }}
          >
            {/* Dashed Upload Box: Overlay+Border */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerUploadClick}
              className={`transition-all cursor-pointer ${
                dragActive ? "bg-[#F3F4F1]/60" : "bg-[rgba(242,244,246,0.5)]"
              }`}
              style={{
                boxSizing: "border-box",
                position: "absolute",
                width: "41.2%", // width: 281px relative to left card 682px
                height: "clamp(14.53rem, 22.71vw, 27.25rem)", // height: 327px
                left: "1.76%", // left: 12px relative to left card 682px
                top: "clamp(0.62rem, 0.97vw, 1.17rem)", // top: 14px
                border: "2px dashed rgba(225, 229, 239, 0.6)",
                borderRadius: "12px",
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

              {/* Icon Stack */}
              <div
                className="flex items-center justify-center bg-[#E6EEAD]"
                style={{
                  position: "absolute",
                  width: "clamp(2.14rem, 3.35vw, 4.02rem)", // width: 48.25px
                  height: "clamp(2.14rem, 3.35vw, 4.02rem)",
                  left: "calc(50% - clamp(2.14rem, 3.35vw, 4.02rem)/2 - 0.38px)",
                  top: "clamp(2.58rem, 4.03vw, 4.83rem)", // top: 58px
                  borderRadius: "6030.65px",
                }}
              >
                {/* Background & Overlay+Shadow */}
                <div
                  className="flex items-center justify-center relative"
                  style={{
                    position: "absolute",
                    width: "clamp(1.72rem, 2.68vw, 3.22rem)", // width: 38.6px
                    height: "clamp(1.72rem, 2.68vw, 3.22rem)",
                    left: "calc(50% - clamp(1.72rem, 2.68vw, 3.22rem)/2)",
                    top: "calc(50% - clamp(1.72rem, 2.68vw, 3.22rem)/2)",
                    background: "radial-gradient(circle at 50% 50%, rgba(61, 74, 13, 0.7812) 0%, rgba(42, 48, 8, 0.84) 100%)",
                    boxShadow: "0px 6px 9px -1.8px rgba(0, 88, 188, 0.2), 0px 2.4px 3.6px -2.4px rgba(0, 88, 188, 0.2)",
                    borderRadius: "6030.65px",
                  }}
                >
                  {/* material-symbols:upload-rounded / Vector */}
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
                      width: "clamp(0.89rem, 1.39vw, 1.67rem)", // 20px
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

              {/* Upload Text */}
              <span
                className="font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[#1A1C1D] text-center"
                style={{
                  position: "absolute",
                  width: "clamp(2.84rem, 4.44vw, 5.33rem)", // width: 64px
                  height: "clamp(1.02rem, 1.6vw, 1.92rem)", // height: 23px
                  left: "calc(50% - clamp(2.84rem, 4.44vw, 5.33rem)/2)",
                  top: "clamp(5.39rem, 8.42vw, 10.1rem)", // top: 121.25px
                  fontSize: "clamp(0.8rem, 1.25vw, 1.5rem)", // 18px
                  lineHeight: "clamp(1.02rem, 1.6vw, 1.92rem)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Upload
              </span>

              {/* Drag and drop hint */}
              <span
                className="font-['Inter',_sans-serif] font-normal text-[#414755] text-center"
                style={{
                  position: "absolute",
                  width: "80%", // make width responsive to prevent box overflow
                  height: "clamp(1.33rem, 2.08vw, 2.5rem)", // height: 30px
                  left: "10%",
                  top: "clamp(6.72rem, 10.5vw, 12.6rem)", // top: 151.25px
                  fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)", // 12px
                  lineHeight: "clamp(0.67rem, 1.04vw, 1.25rem)", // 15px
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Drag and drop your files here or click to browse your computer.
              </span>

              {/* Choose File Button */}
              <button
                type="button"
                className="flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
                style={{
                  position: "absolute",
                  width: "clamp(4.44rem, 6.94vw, 8.33rem)", // width: 100px
                  height: "clamp(1.69rem, 2.64vw, 3.17rem)", // height: 38px
                  left: "calc(50% - clamp(4.44rem, 6.94vw, 8.33rem)/2 + 0.5px)",
                  top: "clamp(9.33rem, 14.58vw, 17.5rem)", // top: 210px
                  background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
                  boxShadow: "0px 4px 27.1px rgba(0, 0, 0, 0.12)",
                  borderRadius: "57px",
                  border: "none",
                }}
              >
                {/* Choose File Label */}
                <span
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(0.53rem, 0.83vw, 1.0rem)", // 12px
                    lineHeight: "clamp(0.67rem, 1.04vw, 1.25rem)", // 15px
                    color: "#FFFFFF",
                  }}
                >
                  Choose File
                </span>
              </button>

              {/* Frame 2147239850 (Format PDF) */}
              <div
                className="flex items-center gap-1"
                style={{
                  position: "absolute",
                  width: "clamp(3.29rem, 5.14vw, 6.17rem)", // width: 74px
                  height: "clamp(0.53rem, 0.83vw, 1.0rem)", // height: 12px
                  left: "clamp(0.89rem, 1.39vw, 1.67rem)", // left: 20px
                  top: "clamp(13.29rem, 20.76vw, 24.92rem)", // top: 299px
                }}
              >
                {/* teenyicons:pdf-outline */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  style={{
                    width: "clamp(0.44rem, 0.63vw, 0.83rem)", // 10px
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
                    fontSize: "clamp(0.44rem, 0.63vw, 0.83rem)", // 10px
                    lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)", // 12px
                    color: "#000000",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Format:&nbsp;
                  <strong style={{ fontWeight: 500 }}>PDF</strong>
                </span>
              </div>

              {/* Frame 2147239851 (Max File Size) */}
              <div
                className="flex items-center gap-1 justify-end"
                style={{
                  position: "absolute",
                  width: "clamp(4.18rem, 6.53vw, 7.83rem)", // width: 94px
                  height: "clamp(0.53rem, 0.83vw, 1.0rem)", // height: 12px
                  right: "clamp(0.67rem, 1.04vw, 1.25rem)", // right: 15px
                  top: "clamp(13.2rem, 20.63vw, 24.75rem)", // top: 297px
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.44rem, 0.63vw, 0.83rem)", // 10px
                    lineHeight: "clamp(0.53rem, 0.83vw, 1.0rem)", // 12px
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

            {/* Uploaded Files Section: Frame 2147239865 */}
            <div
              style={{
                position: "absolute",
                width: "41.06%", // width: 280px relative to left card 682px
                height: "clamp(7.56rem, 11.81vw, 14.17rem)", // height: 170px
                left: "45.75%", // left: 312px relative to left card 682px
                top: "clamp(0.62rem, 0.97vw, 1.17rem)", // top: 14px
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "clamp(0.76rem, 1.18vw, 1.42rem)", // gap: 17px
              }}
            >
              {/* Uploaded Files Header */}
              <h4
                style={{
                  width: "100%",
                  height: "clamp(1.11rem, 1.74vw, 2.08rem)", // height: 25px
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(0.89rem, 1.39vw, 1.67rem)", // 20px
                  lineHeight: "clamp(1.11rem, 1.74vw, 2.08rem)", // 25px
                  color: "#000000",
                  margin: 0,
                }}
              >
                Uploaded Files
              </h4>

              {/* Files List Frame: Frame 2147239864 */}
              <div
                className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar"
                style={{
                  height: "clamp(5.69rem, 8.89vw, 10.67rem)", // height: 128px
                  gap: "clamp(0.44rem, 0.69vw, 0.83rem)", // gap: 10px
                }}
              >
                {uploadedFiles.length === 0 ? (
                  <span className="text-gray-400 font-['Inter',_sans-serif] text-xs">No files uploaded yet.</span>
                ) : (
                  uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative w-full shrink-0"
                      style={{
                        height: "clamp(2.62rem, 4.1vw, 4.92rem)", // 59px height
                        background: "#F6F9E2",
                        borderRadius: "12px",
                      }}
                    >
                      {/* Rectangle 27663 (White Icon Box) */}
                      <div
                        className="flex items-center justify-center bg-white"
                        style={{
                          position: "absolute",
                          width: "clamp(1.29rem, 2.01vw, 2.42rem)", // 29px
                          height: "clamp(1.29rem, 2.01vw, 2.42rem)",
                          left: "clamp(0.4rem, 0.63vw, 0.75rem)", // 9px
                          top: "clamp(0.62rem, 0.97vw, 1.17rem)", // 14px
                          borderRadius: "4px",
                        }}
                      >
                        {/* fi_337946 PDF icon (Vector layers matching red/gray styles) */}
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            width: "clamp(0.76rem, 1.18vw, 1.42rem)", // 17px
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

                      {/* Frame 2147239852 / Frame 2147239853 (Name & Size wrapper) */}
                      <div
                        className="flex flex-col justify-center"
                        style={{
                          position: "absolute",
                          left: "clamp(2.04rem, 3.19vw, 3.83rem)", // 46px
                          top: "clamp(0.62rem, 0.97vw, 1.17rem)", // 14px
                          width: "50%", // responsive width inside container
                          height: "clamp(1.33rem, 2.08vw, 2.5rem)", // 30px
                        }}
                      >
                        <span
                          className="truncate text-black"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", // 14px
                            lineHeight: "clamp(0.76rem, 1.18vw, 1.42rem)", // 17px
                            display: "block",
                          }}
                        >
                          {file.name}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: "clamp(0.36rem, 0.56vw, 0.67rem)", // 8px
                            lineHeight: "clamp(0.44rem, 0.69vw, 0.83rem)", // 10px
                            color: "rgba(0, 0, 0, 0.7)",
                          }}
                        >
                          {file.size}
                        </span>
                      </div>

                      {/* Rectangle 27664 (White Delete Button Box) */}
                      <button
                        type="button"
                        onClick={() => onFileDelete(file.id)}
                        className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors"
                        style={{
                          position: "absolute",
                          width: "clamp(1.11rem, 1.74vw, 2.08rem)", // 25px
                          height: "clamp(1.11rem, 1.74vw, 2.08rem)",
                          right: "clamp(0.67rem, 1.04vw, 1.25rem)", // 15px
                          top: "clamp(0.67rem, 1.04vw, 1.25rem)", // 15px
                          borderRadius: "2px",
                          border: "none",
                        }}
                      >
                        {/* material-symbols:delete / Vector */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            width: "clamp(0.8rem, 1.25vw, 1.5rem)", // 18px
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
        </>
      )}

      {/* Right Card: Frame 2147239870 */}
      {activeTabLabel !== "Future Crops" && activeTabLabel !== "Natural Advantages and Disadvantages" && (
        <div
          style={{
            position: "absolute",
            width: "45.44%", // width: 618px relative to parent 1360px
            height: "clamp(8.04rem, 12.57vw, 15.08rem)", // height: 181px
            left: "52.65%", // left: 716px relative to parent 1360px
            top: "clamp(3.24rem, 5.07vw, 6.08rem)", // top: 73px
          }}
        >
          {/* Rectangle 27625 (Green background card) */}
          <div
            style={{
              boxSizing: "border-box",
              position: "absolute",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              background: "rgba(230, 238, 173, 0.3)",
              border: "1px solid #E6EEAD",
              borderRadius: "18px",
              zIndex: 0,
            }}
          />

          {/* Text Area (Write a comment - Poppins style when active/written) */}
          <textarea
            value={commentValue}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            className="bg-transparent resize-none border-none outline-none text-black placeholder-[rgba(0,0,0,0.4)]"
            style={{
              position: "absolute",
              width: "91.59%", // width: 566px relative to comments box 618px
              height: "clamp(3.73rem, 5.83vw, 7.0rem)", // height: 84px
              left: "4.21%", // left: 26px relative to comments box 618px
              top: "clamp(1.07rem, 1.67vw, 2.0rem)", // top: 24px
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", // 14px
              lineHeight: "clamp(0.93rem, 1.46vw, 1.75rem)", // 21px
              zIndex: 1,
            }}
          />

          {/* Mic Button: Frame 2147239972 */}
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${
              isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90"
            }`}
            style={{
              position: "absolute",
              width: "clamp(1.42rem, 2.22vw, 2.67rem)", // width: 32px
              height: "clamp(1.42rem, 2.22vw, 2.67rem)",
              left: "92.56%", // left: 572px relative to comments box 618px
              top: "clamp(6.0rem, 9.38vw, 11.25rem)", // top: 135px
              background: "#2D3509",
              border: "none",
              zIndex: 1,
            }}
          >
            {/* material-symbols:mic-outline-rounded / Vector */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                width: "clamp(0.8rem, 1.25vw, 1.5rem)", // 18px
                height: "clamp(0.8rem, 1.25vw, 1.5rem)",
                color: "#FFFFFF",
              }}
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
              <line x1="12" y1="19" x2="12" y2="22" />
            </svg>
          </button>
        </div>
      )}

      {/* Footer Navigation Buttons: Frame 2147239935 */}
      <div
        style={{
          position: "absolute",
          width: "15.59%", // width: 212px relative to parent 1360px
          height: "clamp(1.69rem, 2.64vw, 3.17rem)", // height: 38px
          right: "1.91%", // align relative to the right to prevent overflow clipping
          top: "clamp(16.84rem, 26.32vw, 31.58rem)", // top: 379px
        }}
      >
        {/* Back Button: Frame 2147239846 */}
        <button
          type="button"
          onClick={onPrevTab}
          className="flex items-center justify-center font-['Outfit',_sans-serif] font-medium text-[rgba(0,0,0,0.8)] border border-[rgba(205,0,0,0.27)] cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all"
          style={{
            boxSizing: "border-box",
            position: "absolute",
            width: "47.17%", // 100px relative to buttons wrapper 212px
            height: "100%",
            left: 0,
            top: 0,
            borderRadius: "33px",
            fontSize: "clamp(0.62rem, 0.97vw, 1.17rem)", // 14px
            lineHeight: "clamp(0.8rem, 1.25vw, 1.5rem)", // 18px
            background: "transparent",
          }}
        >
          Back
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNextTab}
          className="flex items-center justify-center font-['Outfit',_sans-serif] font-normal text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
          style={{
            position: "absolute",
            width: "47.17%", // 100px relative to buttons wrapper 212px
            height: "100%",
            left: "52.83%", // 112px relative to buttons wrapper 212px
            top: 0,
            background: "radial-gradient(circle at 50% 50%, #3D4A0D 0%, #2A3008 100%)",
            borderRadius: "57px",
            fontSize: "clamp(0.58rem, 0.9vw, 1.08rem)", // 13px
            lineHeight: "clamp(0.71rem, 1.11vw, 1.33rem)", // 16px
            border: "none",
          }}
        >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default UploadFilesDocument;
