import React, { useRef, useState, useEffect } from "react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
}

interface AgricultureReportUploadFileProps {
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

  // Agriculture specific states
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

export const AgricultureReportUploadFile: React.FC<AgricultureReportUploadFileProps> = ({
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
  const [isSoilDropdownOpen, setIsSoilDropdownOpen] = useState(false);
  const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsSoilDropdownOpen(false);
        setIsCropDropdownOpen(false);
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

  // Check if this is a custom form input tab rather than a standard upload tab
  const isCustomTab =
    activeTabLabel === "Soil Report" ||
    activeTabLabel === "Type of Crop" ||
    activeTabLabel === "Ground Water Level" ||
    activeTabLabel === "Types of Crop can be grown" ||
    activeTabLabel === "Current Yield Cost" ||
    activeTabLabel === "Current Cultivation" ||
    activeTabLabel === "Future Crops" ||
    activeTabLabel === "Maintenance" ||
    activeTabLabel === "Natural Advantages and Disadvantages";

  // Determine if standard comments box is needed
  const hasComments =
    activeTabLabel !== "Future Crops" &&
    activeTabLabel !== "Natural Advantages and Disadvantages";

  return (
    <div className={`bg-white select-none ${className} absolute left-[clamp(1.77rem,2.78vw,3.33rem)] right-[clamp(1.77rem,2.78vw,3.33rem)] top-[clamp(26rem,40.63vw,48.75rem)] h-[clamp(19.68rem,30.76vw,36.91rem)] rounded-[24px] box-border bg-white`} style={style} >
      {/* Add Comments Title */}
      {hasComments && (
        <h3 className="text-black font-semibold whitespace-nowrap absolute w-[13.38%] h-[clamp(1.33rem,2.08vw,2.5rem)] left-[52.65%] top-[clamp(1.33rem,2.08vw,2.5rem)] font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] m-0 flex items-center" >
          Add Comments
        </h3>
      )}

      {isCustomTab ? (
        <div ref={dropdownRef} className={`absolute w-[47.06%] left-[1.32%] top-[clamp(1.33rem,2.08vw,2.5rem)] flex flex-col items-start gap-[clamp(0.4rem,0.63vw,0.5625rem)] z-[100] ${activeTabLabel === "Types of Crop can be grown" ? (isDropdownOpen ? "h-[clamp(16rem,27.22vw,24.5rem)]" : "h-[clamp(4rem,6.74vw,6.0625rem)]") : (activeTabLabel === "Current Yield Cost" ? "h-[clamp(10rem,14.3vw,12.875rem)]" : (activeTabLabel === "Current Cultivation" ? "h-[clamp(16rem,23.05vw,20.75rem)]" : (activeTabLabel === "Future Crops" ? "h-[clamp(10.5rem,15.28vw,13.75rem)]" : (activeTabLabel === "Maintenance" ? "h-[clamp(11rem,16.39vw,14.75rem)]" : (activeTabLabel === "Natural Advantages and Disadvantages" ? "h-[clamp(10rem,14.3vw,12.875rem)]" : "h-[clamp(4rem,6.74vw,6.0625rem)]")))))}`} >
        {activeTabLabel === "Maintenance" ? (
          <div className="w-full flex flex-col gap-[clamp(0.8rem,1.39vw,1.25rem)]" >
            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                If Green Land Captial does the maintenace, what will be the suggested crop?
              </span>

              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <div onClick={() => setIsDropdownOpen((prev) => !prev)} className="w-full h-full bg-transparent flex items-center pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(1.5rem,3.12vw,3rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black cursor-pointer rounded-[8px] select-none" >
                  {maintenanceCropValue ? (
                    <div className="flex flex-wrap gap-[clamp(0.4rem,0.69vw,0.625rem)] items-center" >
                      {maintenanceCropValue.split(",").map((s) => s.trim()).filter(Boolean).map((crop) => (
                        <div key={crop} className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.625rem)] bg-white border-[0.09375rem] border-[#E5E385] rounded-[0.25rem] p-[clamp(0.1rem,0.14vw,0.125rem)clamp(0.3rem,0.56vw,0.5rem)clamp(0.1rem,0.14vw,0.125rem)clamp(0.2rem,0.28vw,0.25rem)]" >
                          <div className="w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)] bg-[#2D3409] border-[0.09375rem] border-[#F1F1FF] rounded-[0.125rem] flex items-center justify-center" >
                            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" className="w-[clamp(0.5rem,0.83vw,0.75rem)] h-[clamp(0.5rem,0.83vw,0.75rem)]" >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="font-sans text-[clamp(0.7rem,0.97vw,0.875rem)] text-[#5A5C5E]" >
                            {crop}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[rgba(0,0,0,0.4)]" >Select Types</span>
                  )}
                </div>

                <div className="absolute right-[4.06%] top-[50%] transform -translate-y-1/2 pointer-events-none flex items-center" >
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#363434] w-[clamp(0.5rem,0.83vw,0.75rem)] h-auto" >
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

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
                    <div onClick={(e) => e.stopPropagation()} className="box-border w-full h-[clamp(8rem,13vw,11.75rem)] border-[0.0625rem] border-[#999999] rounded-[0.5rem] bg-white p-[clamp(0.5rem,0.9vw,0.8125rem)clamp(0.75rem,1.11vw,1rem)clamp(0.75rem,1.11vw,1rem)clamp(0.75rem,1.11vw,1rem)] flex flex-col mt-[4px] shadow-[0px_4px_15px_rgba(0,0,0,0.1)] absolute top-[100%] left-0 right-0 z-[1010]" >
                      <div className="box-border w-full h-[clamp(2rem,3.06vw,2.75rem)] border-[0.0625rem] border-[#C5C1C1] rounded-[4.9375rem] relative flex items-center pl-[clamp(2rem,3.33vw,3rem)] shrink-0 mb-[clamp(0.5rem,0.8vw,1rem)]" >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-[clamp(0.75rem,1.11vw,1rem)] top-[50%] transform -translate-y-1/2 w-[clamp(0.8rem,1.39vw,1.25rem)] h-[clamp(0.8rem,1.39vw,1.25rem)]" >
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-full border-none outline-none bg-transparent font-sans text-[clamp(0.85rem,1.11vw,1rem)] text-black" / >
                      </div>

                      <div className="maintenance-crops-scrollbar flex-[1] overflow-y-auto grid grid-cols-3 gap-y-[clamp(0.6rem,1.0vw,1.25rem)] gap-x-[clamp(0.6rem,1.0vw,1.25rem)] pr-[clamp(0.35rem,0.56vw,0.5rem)]" >
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
                              <div key={idx} onClick={() => { let newList; if (isChecked) { newList = selectedList.filter((item) => item !== crop); } else { newList = [...selectedList, crop]; } if (onMaintenanceCropChange) { onMaintenanceCropChange(newList.join(", ")); } }} className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.625rem)] cursor-pointer" >
                                <div className={`box-border w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)] rounded-[0.125rem] flex items-center justify-center ${isChecked ? "bg-[#2D3409]" : "bg-[#E8FFCA]"} ${isChecked ? "border-[0.09375rem] border-[#F1F1FF]" : "border-[0.09375rem] border-[#E5E385]"}`} >
                                  {isChecked && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" className="w-[clamp(0.5rem,0.83vw,0.75rem)] h-[clamp(0.5rem,0.83vw,0.75rem)]" >
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </div>
                                <span className="font-sans text-[clamp(0.7rem,0.97vw,0.875rem)] leading-[clamp(0.9rem,1.46vw,1.3125rem)] text-[#5A5C5E] whitespace-nowrap" >
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
            </div>

            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What will be the best returns?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Amount" value={maintenanceReturnsValue} onChange={(e) => { if (onMaintenanceReturnsChange) { onMaintenanceReturnsChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>
          </div>
        ) : activeTabLabel === "Future Crops" ? (
          <div className="w-full flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)]" >
            <span className="w-[max-content] whitespace-nowrap font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
              Future crop plans suggested by{" "}
              <span className="text-[#007BFF]" >Green Land Captial</span>
            </span>

            <div className="box-border w-full h-[clamp(8.04rem,12.57vw,15.08rem)] bg-[rgba(230,238,173,0.3)] border border-[#E6EEAD] rounded-[18px] relative" >
              <textarea value={commentValue} onChange={(e) => onCommentChange(e.target.value)} placeholder="Write a comment" className="bg-transparent resize-none border-none outline-none text-black placeholder-[rgba(0,0,0,0.4)] absolute w-[91.59%] h-[clamp(3.73rem,5.83vw,7.0rem)] left-[4.21%] top-[clamp(1.07rem,1.67vw,2.0rem)] font-sans text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.93rem,1.46vw,1.75rem)] z-[1]" / >

              <button type="button" onClick={handleVoiceInput} className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${ isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90" } absolute w-[clamp(1.42rem,2.22vw,2.67rem)] h-[clamp(1.42rem,2.22vw,2.67rem)] right-[3.23%] top-[clamp(5.0rem,7.8vw,9.38rem)] bg-[#2D3509] border-none z-[1]`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(0.8rem,1.25vw,1.5rem)] h-[clamp(0.8rem,1.25vw,1.5rem)] text-white" >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                </svg>
              </button>
            </div>
          </div>
        ) : activeTabLabel === "Current Cultivation" ? (
          <div className="w-full flex flex-col gap-[clamp(0.9rem,1.6vw,1.4375rem)]" >
            <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,0.8125rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What is the Current Cultivation Type?
              </span>

              <div className="flex flex-row gap-[clamp(1.12rem,1.87vw,1.6875rem)] h-[clamp(1.58rem,2.64vw,2.375rem)]" >
                <button type="button" onClick={() => { if (onCultivationTypeChange) { onCultivationTypeChange("Self"); } }} className={`box-border flex flex-row justify-center items-center p-[clamp(0.4rem,0.69vw,0.625rem)clamp(0.7rem,1.25vw,1.125rem)] gap-[clamp(0.4rem,0.69vw,0.625rem)] w-[clamp(4rem,5.9vw,5.3125rem)] h-[clamp(1.58rem,2.64vw,2.375rem)] rounded-[33px] cursor-pointer transition-all ${cultivationTypeValue === "Self" ? "border-[2px] border-[#2D3509]" : "border border-black"} ${cultivationTypeValue === "Self" ? "bg-[#F4F7E6]" : "bg-white"}`} >
                  <div className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.625rem)]" >
                    <div className={`box-border w-[clamp(0.5rem,0.83vw,0.75rem)] h-[clamp(0.5rem,0.83vw,0.75rem)] rounded-full transition-all ${cultivationTypeValue === "Self" ? "bg-[#2D3409]" : "bg-white"} ${cultivationTypeValue === "Self" ? "border-[2px] border-[#2D3409]" : "border-[2px] border-[#85BFE5]"}`} / >
                    <span className="font-sans text-[clamp(0.65rem,0.97vw,0.875rem)] leading-[clamp(0.85rem,1.25vw,1.125rem)] text-black" >
                      Self
                    </span>
                  </div>
                </button>

                <button type="button" onClick={() => { if (onCultivationTypeChange) { onCultivationTypeChange("Lease"); } }} className={`box-border flex flex-row justify-center items-center p-[clamp(0.4rem,0.69vw,0.625rem)clamp(0.7rem,1.25vw,1.125rem)] gap-[clamp(0.4rem,0.69vw,0.625rem)] w-[clamp(4.5rem,6.8vw,6.125rem)] h-[clamp(1.58rem,2.64vw,2.375rem)] rounded-[33px] cursor-pointer transition-all ${cultivationTypeValue === "Lease" ? "border-[2px] border-[#2D3509]" : "border border-black"} ${cultivationTypeValue === "Lease" ? "bg-[#F4F7E6]" : "bg-white"}`} >
                  <div className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.625rem)]" >
                    <div className={`box-border w-[clamp(0.5rem,0.83vw,0.75rem)] h-[clamp(0.5rem,0.83vw,0.75rem)] rounded-full transition-all ${cultivationTypeValue === "Lease" ? "bg-[#2D3409]" : "bg-white"} ${cultivationTypeValue === "Lease" ? "border-[2px] border-[#2D3409]" : "border-[2px] border-[#85BFE5]"}`} / >
                    <span className="font-sans text-[clamp(0.65rem,0.97vw,0.875rem)] leading-[clamp(0.85rem,1.25vw,1.125rem)] text-black" >
                      Lease
                    </span>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.3rem,0.5vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                Name
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Name" value={cultivationNameValue} onChange={(e) => { if (onCultivationNameChange) { onCultivationNameChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.3rem,0.5vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                Contact Details
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Contact Details" value={cultivationContactValue} onChange={(e) => { if (onCultivationContactChange) { onCultivationContactChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>
          </div>
        ) : activeTabLabel === "Current Yield Cost" ? (
          <div className="w-full flex flex-col gap-[clamp(0.8rem,1.39vw,1.25rem)]" >
            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What is the current yielding cost?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Amount" value={yieldCostValue} onChange={(e) => { if (onYieldCostChange) { onYieldCostChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                Current returns from yield?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Amount" value={yieldReturnsValue} onChange={(e) => { if (onYieldReturnsChange) { onYieldReturnsChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>
          </div>
        ) : activeTabLabel === "Natural Advantages and Disadvantages" ? (
          <div className="w-full flex flex-col gap-[clamp(0.8rem,1.39vw,1.25rem)]" >
            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What are the Advantages?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter advantages" value={advantagesValue} onChange={(e) => { if (onAdvantagesChange) { onAdvantagesChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What are the Disadvantages?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter disadvantages" value={disadvantagesValue} onChange={(e) => { if (onDisadvantagesChange) { onDisadvantagesChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>
          </div>
        ) : (
          <>
            <span className="w-full h-[clamp(1.33rem,2.08vw,2.5rem)] font-sans not-italic text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
              {activeTabLabel === "Soil Report"
                ? "Soil Type"
                : activeTabLabel === "Type of Crop"
                ? "Types of Crops available present?"
                : activeTabLabel === "Types of Crop can be grown"
                ? "Types of Crop can br Grown in Future"
                : "Depth of Ground Water Level"}
            </span>

            <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
              {activeTabLabel === "Soil Report" ? (
                <>
                  <button type="button" onClick={() => setIsSoilDropdownOpen(!isSoilDropdownOpen)} className="box-border w-full h-full bg-transparent border-none outline-none flex items-center justify-between pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] cursor-pointer" >
                    <span className={`font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] ${selectedSoilType ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`} >
                      {selectedSoilType || "Select soil type..."}
                    </span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-[#363434] w-[clamp(0.5rem,0.78vw,0.94rem)] h-auto transition-all ${isSoilDropdownOpen ? "transform rotate-180" : "transform rotate-0"}`} >
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {isSoilDropdownOpen && (
                    <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-[1010] mt-[4px]" >
                      {["Red Soil", "Black Soil", "Alluvial Soil", "Laterite Soil", "Sandy Soil", "Clay Soil", "Loamy Soil"].map((opt) => (
                        <div key={opt} onClick={() => { onSoilTypeChange?.(opt); setIsSoilDropdownOpen(false); }} className={`p-[clamp(0.5rem,0.83vw,1rem)clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-[#1A1C1E] cursor-pointer transition-all ${selectedSoilType === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`} onMouseEnter={(e) => { if (selectedSoilType !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (selectedSoilType !== opt) e.currentTarget.style.background = "transparent"; }} >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : activeTabLabel === "Type of Crop" ? (
                <>
                  <button type="button" onClick={() => setIsCropDropdownOpen(!isCropDropdownOpen)} className="box-border w-full h-full bg-transparent border-none outline-none flex items-center justify-between pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] cursor-pointer" >
                    <span className={`font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] ${selectedCropType ? "text-black" : "text-[rgba(0,0,0,0.4)]"}`} >
                      {selectedCropType || "Select crop type..."}
                    </span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-[#363434] w-[clamp(0.5rem,0.78vw,0.94rem)] h-auto transition-all ${isCropDropdownOpen ? "transform rotate-180" : "transform rotate-0"}`} >
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {isCropDropdownOpen && (
                    <div className="absolute top-[100%] left-0 right-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-[12px] shadow-[0px_4px_12px_rgba(0,0,0,0.1)] z-[1010] mt-[4px]" >
                      {["Paddy", "Wheat", "Cotton", "Sugarcane", "Maize", "Groundnut", "Pulses"].map((opt) => (
                        <div key={opt} onClick={() => { onCropTypeChange?.(opt); setIsCropDropdownOpen(false); }} className={`p-[clamp(0.5rem,0.83vw,1rem)clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-[#1A1C1E] cursor-pointer transition-all ${selectedCropType === opt ? "bg-[#E5F1F9]" : "bg-transparent"}`} onMouseEnter={(e) => { if (selectedCropType !== opt) e.currentTarget.style.background = "#F9FAFB"; }} onMouseLeave={(e) => { if (selectedCropType !== opt) e.currentTarget.style.background = "transparent"; }} >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : activeTabLabel === "Types of Crop can be grown" ? (
                <div onClick={() => setIsDropdownOpen((prev) => !prev)} className="w-full h-full bg-transparent flex items-center pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(1.5rem,3.12vw,3rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black cursor-pointer rounded-[8px] select-none" >
                  {selectedFutureCrops ? (
                    <div className="flex flex-wrap gap-[clamp(0.4rem,0.69vw,0.625rem)] items-center" >
                      {selectedFutureCrops.split(",").map((s) => s.trim()).filter(Boolean).map((crop) => (
                        <div key={crop} className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.625rem)] bg-white border-[0.09375rem] border-[#E5E385] rounded-[0.25rem] p-[clamp(0.1rem,0.14vw,0.125rem)clamp(0.3rem,0.56vw,0.5rem)clamp(0.1rem,0.14vw,0.125rem)clamp(0.2rem,0.28vw,0.25rem)]" >
                          <div className="w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)] bg-[#2D3409] border-[0.09375rem] border-[#F1F1FF] rounded-[0.125rem] flex items-center justify-center" >
                            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" className="w-[clamp(0.5rem,0.83vw,0.75rem)] h-[clamp(0.5rem,0.83vw,0.75rem)]" >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                          <span className="font-sans text-[clamp(0.7rem,0.97vw,0.875rem)] text-[#5A5C5E]" >
                            {crop}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-[rgba(0,0,0,0.4)]" >Select types</span>
                  )}
                </div>
              ) : (
                <input type="text" placeholder="Enter depth" value={waterLevelValue} onChange={(e) => { if (onWaterLevelChange) { onWaterLevelChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              )}

              {activeTabLabel !== "Ground Water Level" &&
              activeTabLabel !== "Soil Report" &&
              activeTabLabel !== "Type of Crop" && (
                <div className="absolute right-[4.06%] top-[50%] transform -translate-y-1/2 pointer-events-none flex items-center" >
                  <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#363434] w-[clamp(0.5rem,0.83vw,0.75rem)] h-auto" >
                    <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </>
        )}

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
            <div className="box-border w-full h-[clamp(12rem,19.86vw,17.875rem)] border-[0.0625rem] border-[#999999] rounded-[0.5rem] bg-white p-[clamp(0.5rem,0.9vw,0.8125rem)clamp(0.75rem,1.11vw,1rem)clamp(0.75rem,1.11vw,1rem)clamp(0.75rem,1.11vw,1rem)] flex flex-col mt-[0px] shadow-[0px_4px_15px_rgba(0,0,0,0.1)]" >
              <div className="box-border w-full h-[clamp(2rem,3.06vw,2.75rem)] border-[0.0625rem] border-[#C5C1C1] rounded-[4.9375rem] relative flex items-center pl-[clamp(2rem,3.33vw,3rem)] shrink-0 mb-[clamp(0.75rem,1.11vw,1rem)]" >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-[clamp(0.75rem,1.11vw,1rem)] top-[50%] transform -translate-y-1/2 w-[clamp(0.8rem,1.39vw,1.25rem)] h-[clamp(0.8rem,1.39vw,1.25rem)]" >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full h-full border-none outline-none bg-transparent font-sans text-[clamp(0.85rem,1.11vw,1rem)] text-black" / >
              </div>

              <div className="future-crops-scrollbar flex-[1] overflow-y-auto grid grid-cols-3 gap-y-[clamp(0.8rem,1.39vw,1.25rem)] gap-x-[clamp(0.8rem,1.39vw,1.25rem)] pr-[clamp(0.35rem,0.56vw,0.5rem)]" >
                {[
                  "Rice",
                  "Sun Flower",
                  "Corn",
                  "Sugar Cane",
                  "Cotton",
                  "Wheat"
                ]
                  .filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((crop, idx) => {
                    const selectedList = selectedFutureCrops
                      ? selectedFutureCrops.split(",").map((s) => s.trim()).filter(Boolean)
                      : [];
                    const isChecked = selectedList.includes(crop);
                    return (
                      <div key={idx} onClick={() => { let newList; if (isChecked) { newList = selectedList.filter((item) => item !== crop); } else { newList = [...selectedList, crop]; } if (onFutureCropsChange) { onFutureCropsChange(newList.join(", ")); } }} className="flex flex-row items-center gap-[clamp(0.4rem,0.69vw,0.625rem)] cursor-pointer h-[clamp(0.75rem,1.25vw,1.125rem)]" >
                        <div className={`box-border w-[clamp(0.75rem,1.25vw,1.125rem)] h-[clamp(0.75rem,1.25vw,1.125rem)] rounded-[0.125rem] flex items-center justify-center ${isChecked ? "bg-[#2D3409]" : "bg-[#E8FFCA]"} ${isChecked ? "border-[0.09375rem] border-[#F1F1FF]" : "border-[0.09375rem] border-[#E5E385]"}`} >
                          {isChecked && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" className="w-[clamp(0.5rem,0.83vw,0.75rem)] h-[clamp(0.5rem,0.83vw,0.75rem)]" >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="font-sans text-[clamp(0.7rem,0.97vw,0.875rem)] leading-[clamp(0.9rem,1.46vw,1.3125rem)] text-[#5A5C5E] whitespace-nowrap" >
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
          <h3 className="text-black font-semibold whitespace-nowrap absolute w-[9.56%] h-[clamp(1.33rem,2.08vw,2.5rem)] left-[2.21%] top-[clamp(1.33rem,2.08vw,2.5rem)] font-sans text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] m-0 flex items-center" >
            Upload File
          </h3>

          <div className="bg-white absolute w-[50.15%] h-[clamp(15.78rem,24.65vw,29.58rem)] left-[1.32%] top-[clamp(3.24rem,5.07vw,6.08rem)] shadow-[0px_0px_4px_rgba(0,0,0,0.25)] rounded-[24px] box-border" >
            <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={`transition-all cursor-pointer ${ dragActive ? "bg-[#F3F4F1]/60" : "bg-[rgba(242,244,246,0.5)]" } box-border absolute w-[41.2%] h-[clamp(14.53rem,22.71vw,27.25rem)] left-[1.76%] top-[clamp(0.62rem,0.97vw,1.17rem)] border-[2px] border-dashed border-[rgba(225,229,239,0.6)] rounded-[12px]`} >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
              />

              <div className="flex items-center justify-center bg-[#E6EEAD] absolute w-[clamp(2.14rem,3.35vw,4.02rem)] h-[clamp(2.14rem,3.35vw,4.02rem)] left-[calc(50%-clamp(2.14rem,3.35vw,4.02rem)/2-0.38px)] top-[clamp(2.58rem,4.03vw,4.83rem)] rounded-[6030.65px]" >
                <div className="flex items-center justify-center absolute w-[clamp(1.72rem,2.68vw,3.22rem)] h-[clamp(1.72rem,2.68vw,3.22rem)] left-[calc(50%-clamp(1.72rem,2.68vw,3.22rem)/2)] top-[calc(50%-clamp(1.72rem,2.68vw,3.22rem)/2)] bg-[radial-gradient(circle_at_50%_50%,rgba(61,74,13,0.7812)_0%,rgba(42,48,8,0.84)_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,88,188,0.2),0px_2.4px_3.6px_-2.4px_rgba(0,88,188,0.2)] rounded-[6030.65px]" >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute w-[clamp(0.89rem,1.39vw,1.67rem)] h-[clamp(0.89rem,1.39vw,1.67rem)] text-white" >
                    <line x1="12" y1="15" x2="12" y2="3" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="5" y1="21" x2="19" y2="21" />
                  </svg>
                </div>
              </div>

              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[#1A1C1D] text-center absolute w-[clamp(2.84rem,4.44vw,5.33rem)] h-[clamp(1.02rem,1.6vw,1.92rem)] left-[calc(50%-clamp(2.84rem,4.44vw,5.33rem)/2)] top-[clamp(5.39rem,8.42vw,10.1rem)] text-[clamp(0.8rem,1.25vw,1.5rem)] leading-[clamp(1.02rem,1.6vw,1.92rem)] flex items-center justify-center" >
                Upload
              </span>

              <span className="font-['Inter',_sans-serif] font-normal text-[#414755] text-center absolute w-[80%] h-[clamp(1.33rem,2.08vw,2.5rem)] left-[10%] top-[clamp(6.72rem,10.5vw,12.6rem)] text-[clamp(0.53rem,0.83vw,1.0rem)] leading-[clamp(0.67rem,1.04vw,1.25rem)] flex items-center justify-center" >
                Drag and drop your files here or click to browse your computer.
              </span>

              <button type="button" className="flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-white cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[clamp(4.44rem,6.94vw,8.33rem)] h-[clamp(1.69rem,2.64vw,3.17rem)] left-[calc(50%-clamp(4.44rem,6.94vw,8.33rem)/2+0.5px)] top-[clamp(9.33rem,14.58vw,17.5rem)] bg-[radial-gradient(circle_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,0,0,0.12)] rounded-[57px] border-none" >
                <span className="font-sans text-[clamp(0.53rem,0.83vw,1.0rem)] leading-[clamp(0.67rem,1.04vw,1.25rem)] text-white" >
                  Choose File
                </span>
              </button>

              <div className="flex items-center gap-1 absolute w-[clamp(3.29rem,5.14vw,6.17rem)] h-[clamp(0.53rem,0.83vw,1.0rem)] left-[clamp(0.89rem,1.39vw,1.67rem)] top-[clamp(13.29rem,20.76vw,24.92rem)]" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-[clamp(0.44rem,0.63vw,0.83rem)] h-[clamp(0.44rem,0.63vw,0.83rem)] text-black" >
                  <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                  <path d="M8.5 1.5v3h3" />
                </svg>
                <span className="font-sans text-[clamp(0.44rem,0.63vw,0.83rem)] leading-[clamp(0.53rem,0.83vw,1.0rem)] text-black flex items-center" >
                  Format:&nbsp;
                  <strong className="" >PDF</strong>
                </span>
              </div>

              <div className="flex items-center gap-1 justify-end absolute w-[clamp(4.18rem,6.53vw,7.83rem)] h-[clamp(0.53rem,0.83vw,1.0rem)] right-[clamp(0.67rem,1.04vw,1.25rem)] top-[clamp(13.2rem,20.63vw,24.75rem)]" >
                <span className="font-sans text-[clamp(0.44rem,0.63vw,0.83rem)] leading-[clamp(0.53rem,0.83vw,1.0rem)] text-black flex items-center" >
                  Max File Size:&nbsp;
                  <strong className="" >10MB</strong>
                </span>
              </div>
            </div>

            <div className="absolute w-[41.06%] h-[clamp(7.56rem,11.81vw,14.17rem)] left-[45.75%] top-[clamp(0.62rem,0.97vw,1.17rem)] flex flex-col items-start gap-[clamp(0.76rem,1.18vw,1.42rem)]" >
              <h4 className="w-full h-[clamp(1.11rem,1.74vw,2.08rem)] font-sans text-[clamp(0.89rem,1.39vw,1.67rem)] leading-[clamp(1.11rem,1.74vw,2.08rem)] text-black m-0" >
                Uploaded Files
              </h4>

              <div className="flex flex-col items-start overflow-y-auto w-full custom-scrollbar h-[clamp(5.69rem,8.89vw,10.67rem)] gap-[clamp(0.44rem,0.69vw,0.83rem)]" >
                {uploadedFiles.length === 0 ? (
                  <span className="text-gray-400 font-['Inter',_sans-serif] text-xs">No files uploaded yet.</span>
                ) : (
                  uploadedFiles.map((file) => (
                    <div key={file.id} className="relative w-full shrink-0 h-[clamp(2.62rem,4.1vw,4.92rem)] bg-[#F6F9E2] rounded-[12px]" >
                      <div className="flex items-center justify-center bg-white absolute w-[clamp(1.29rem,2.01vw,2.42rem)] h-[clamp(1.29rem,2.01vw,2.42rem)] left-[clamp(0.4rem,0.63vw,0.75rem)] top-[clamp(0.62rem,0.97vw,1.17rem)] rounded-[4px]" >
                        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[clamp(0.76rem,1.18vw,1.42rem)] h-[clamp(0.76rem,1.18vw,1.42rem)]" >
                          <path d="M3 0h7.5L14 3.5V16H3V0z" fill="#E2E5E7" />
                          <path d="M10.5 0V3.5H14L10.5 0z" fill="#B0B7BD" />
                          <path d="M11 5h-6v1h6V5z" fill="#CAD1D8" />
                          <path d="M11 7h-6v1h6V7z" fill="#CAD1D8" />
                          <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                          <text x="3.5" y="13.8" fill="#FFFFFF" fontSize="3.5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
                        </svg>
                      </div>

                      <div className="flex flex-col justify-center absolute left-[clamp(2.04rem,3.19vw,3.83rem)] top-[clamp(0.62rem,0.97vw,1.17rem)] w-[50%] h-[clamp(1.33rem,2.08vw,2.5rem)]" >
                        <span className="truncate text-black font-sans text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.76rem,1.18vw,1.42rem)] block" >
                          {file.name}
                        </span>
                        <span className="font-sans text-[clamp(0.36rem,0.56vw,0.67rem)] leading-[clamp(0.44rem,0.69vw,0.83rem)] text-[rgba(0,0,0,0.7)]" >
                          {file.size}
                        </span>
                      </div>

                      <button type="button" onClick={() => onFileDelete(file.id)} className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,1.74vw,2.08rem)] h-[clamp(1.11rem,1.74vw,2.08rem)] right-[clamp(0.67rem,1.04vw,1.25rem)] top-[clamp(0.67rem,1.04vw,1.25rem)] rounded-[2px] border-none" >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(0.8rem,1.25vw,1.5rem)] h-[clamp(0.8rem,1.25vw,1.5rem)] text-[rgba(0,0,0,0.82)]" >
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

      {/* Comments Box (Only if tab has comments) */}
      {hasComments && (
        <div className="absolute w-[45.44%] h-[clamp(8.04rem,12.57vw,15.08rem)] left-[52.65%] top-[clamp(3.24rem,5.07vw,6.08rem)]" >
          <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,238,173,0.3)] border border-[#E6EEAD] rounded-[18px] z-[0]" / >

          <textarea value={commentValue} onChange={(e) => onCommentChange(e.target.value)} placeholder="Write a comment" className="bg-transparent resize-none border-none outline-none text-black placeholder-[rgba(0,0,0,0.4)] absolute w-[91.59%] h-[clamp(3.73rem,5.83vw,7.0rem)] left-[4.21%] top-[clamp(1.07rem,1.67vw,2.0rem)] font-sans text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.93rem,1.46vw,1.75rem)] z-[1]" / >

          <button type="button" onClick={handleVoiceInput} className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer ${ isListening ? "bg-red-600 animate-pulse" : "bg-[#2D3509] hover:opacity-90" } absolute w-[clamp(1.42rem,2.22vw,2.67rem)] h-[clamp(1.42rem,2.22vw,2.67rem)] left-[92.56%] top-[clamp(6.0rem,9.38vw,11.25rem)] bg-[#2D3509] border-none z-[1]`} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[clamp(0.8rem,1.25vw,1.5rem)] h-[clamp(0.8rem,1.25vw,1.5rem)] text-white" >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="absolute w-[15.59%] h-[clamp(1.69rem,2.64vw,3.17rem)] right-[1.91%] top-[clamp(16.84rem,26.32vw,31.58rem)]" >
        <button type="button" onClick={onPrevTab} className="flex items-center justify-center font-['Outfit',_sans-serif] font-medium text-[rgba(0,0,0,0.8)] border border-[rgba(205,0,0,0.27)] cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] text-[clamp(0.62rem,0.97vw,1.17rem)] leading-[clamp(0.8rem,1.25vw,1.5rem)] bg-transparent" >
          Back
        </button>

        <button type="button" onClick={onNextTab} className="flex items-center justify-center font-['Outfit',_sans-serif] font-normal text-white cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] rounded-[57px] text-[clamp(0.58rem,0.9vw,1.08rem)] leading-[clamp(0.71rem,1.11vw,1.33rem)] border-none" >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
