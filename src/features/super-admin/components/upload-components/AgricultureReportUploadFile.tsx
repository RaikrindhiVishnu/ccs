import React, { useRef, useState, useEffect } from "react";
import { UploadFile, type UploadedFileItem } from "./UploadFile";
import { Comments } from "./Comments";

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
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
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
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What will be the best returns?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Amount" value={maintenanceReturnsValue} onChange={(e) => { if (onMaintenanceReturnsChange) { onMaintenanceReturnsChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>
          </div>
        ) : activeTabLabel === "Future Crops" ? (
          <div className="w-full flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)]" >
            <span className="w-[max-content] whitespace-nowrap font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
              Future crop plans suggested by{" "}
              <span className="text-[#007BFF]" >Green Land Captial</span>
            </span>

            <div className="box-border w-full h-[clamp(8.04rem,12.57vw,15.08rem)] relative" >
              <Comments
                commentValue={commentValue}
                onCommentChange={onCommentChange}
                activeTabLabel={activeTabLabel}
              />
            </div>
          </div>
        ) : activeTabLabel === "Current Cultivation" ? (
          <div className="w-full flex flex-col gap-[clamp(0.9rem,1.6vw,1.4375rem)]" >
            <div className="flex flex-col gap-[clamp(0.5rem,0.9vw,0.8125rem)] w-full" >
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
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
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                Name
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Name" value={cultivationNameValue} onChange={(e) => { if (onCultivationNameChange) { onCultivationNameChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.3rem,0.5vw,0.5625rem)] w-full" >
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
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
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What is the current yielding cost?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter Amount" value={yieldCostValue} onChange={(e) => { if (onYieldCostChange) { onYieldCostChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
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
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What are the Advantages?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter advantages" value={advantagesValue} onChange={(e) => { if (onAdvantagesChange) { onAdvantagesChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>

            <div className="flex flex-col gap-[clamp(0.4rem,0.63vw,0.5625rem)] w-full" >
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
                What are the Disadvantages?
              </span>
              <div className="box-border w-full h-[clamp(2.25rem,3.75vw,3.375rem)] bg-white border border-[rgba(0,0,0,0.4)] rounded-[8px] relative" >
                <input type="text" placeholder="Enter disadvantages" value={disadvantagesValue} onChange={(e) => { if (onDisadvantagesChange) { onDisadvantagesChange(e.target.value); } }} className="w-full h-full bg-transparent border-none outline-none pl-[clamp(0.6rem,1.25vw,1.25rem)] pr-[clamp(0.6rem,1.25vw,1.25rem)] font-sans text-[clamp(0.75rem,1.11vw,1.25rem)] text-black rounded-[8px]" / >
              </div>
            </div>
          </div>
        ) : (
          <>
            <span className="w-full h-[clamp(1.33rem,2.08vw,2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold not-italic text-[clamp(1.07rem,1.67vw,2rem)] leading-[clamp(1.33rem,2.08vw,2.5rem)] text-black" >
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
            <UploadFile
              uploadedFiles={uploadedFiles}
              onFileUpload={onFileUpload}
              onFileDelete={onFileDelete}
            />
          </div>
        </>
      )}

      {/* Comments Box (Only if tab has comments) */}
      {hasComments && (
        <div className="absolute w-[45.44%] h-[clamp(8.04rem,12.57vw,15.08rem)] left-[52.65%] top-[clamp(3.24rem,5.07vw,6.08rem)]" >
          <Comments
            commentValue={commentValue}
            onCommentChange={onCommentChange}
            activeTabLabel={activeTabLabel}
          />
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
