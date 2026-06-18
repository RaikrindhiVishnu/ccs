import React, { useRef, useState } from "react";

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: "uploading" | "completed";
  imageType?: "cover" | "land";
}

interface ValuationUploadFileProps {
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

  boundaryRoadTypeValue?: string;
  onBoundaryRoadTypeChange?: (val: string) => void;
  boundaryRoadWidthValue?: string;
  onBoundaryRoadWidthChange?: (val: string) => void;

  recentTransactionTypeValue?: string;
  onRecentTransactionTypeChange?: (val: string) => void;
  valuationPerAcreValue?: string;
  onValuationPerAcreChange?: (val: string) => void;
  localMarketPriceValue?: string;
  onLocalMarketPriceChange?: (val: string) => void;

  geologicalAdvantagesTypeValue?: string;
  onGeologicalAdvantagesTypeChange?: (val: string) => void;

  upcomingInfrastructuresValue?: string;
  onUpcomingInfrastructuresChange?: (val: string) => void;

  railwayConnectivityTypeValue?: string;
  onRailwayConnectivityTypeChange?: (val: string) => void;
  railwayDistanceValue?: string;
  onRailwayDistanceChange?: (val: string) => void;

  airportConnectivityTypeValue?: string;
  onAirportConnectivityTypeChange?: (val: string) => void;
  airportDistanceValue?: string;
  onAirportDistanceChange?: (val: string) => void;
}

export const ValuationUploadFile: React.FC<ValuationUploadFileProps> = ({
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
  boundaryRoadTypeValue = "",
  onBoundaryRoadTypeChange,
  boundaryRoadWidthValue = "",
  onBoundaryRoadWidthChange,
  recentTransactionTypeValue = "",
  onRecentTransactionTypeChange,
  valuationPerAcreValue = "",
  onValuationPerAcreChange,
  localMarketPriceValue = "",
  onLocalMarketPriceChange,
  geologicalAdvantagesTypeValue = "",
  onGeologicalAdvantagesTypeChange,
  upcomingInfrastructuresValue = "",
  onUpcomingInfrastructuresChange,
  railwayConnectivityTypeValue = "",
  onRailwayConnectivityTypeChange,
  railwayDistanceValue = "",
  onRailwayDistanceChange,
  airportConnectivityTypeValue = "",
  onAirportConnectivityTypeChange,
  airportDistanceValue = "",
  onAirportDistanceChange,
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

  const isImageTab = activeTabLabel === "Village Map or Naksha";

  return (
    <div
      className={`absolute left-[clamp(1.77rem,_2.78vw,_3.33rem)] right-[clamp(1.77rem,_2.78vw,_3.33rem)] top-[clamp(26rem,_40.63vw,_48.75rem)] h-[clamp(19.68rem,_30.76vw,_36.91rem)] rounded-[24px] box-border bg-white select-none ${className}`.trim()}
      style={style}
    >
      {activeTabLabel !== "Future Plans" && activeTabLabel !== "Validating Disadvantages" && (
        <h3 className="absolute w-[13.38%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[52.65%] top-[clamp(1.33rem,_2.08vw,_2.5rem)] font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1.07rem,_1.67vw,_2.01rem)] leading-[clamp(1.33rem,_2.08vw,_2.5rem)] m-0 flex items-center text-black whitespace-nowrap">
          Add Comments
        </h3>
      )}

      {activeTabLabel === "Road Approach" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1.17rem,_1.94vw,_2.33rem)] w-[50.15%] h-[clamp(8.17rem,_13.61vw,_16.33rem)] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Frame 2147239912 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.75rem,_1.25vw,_1.5rem)] w-full h-[clamp(3.58rem,_5.97vw,_7.17rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
              Type of Road Approach
            </span>
            {/* Frame 2147239911 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.04rem,_1.74vw,_2.08rem)] w-[clamp(15.29rem,_25.49vw,_30.58rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239876 */}
              <button
                type="button"
                onClick={() => onBoundaryRoadTypeChange?.("Private Road")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(5.96rem,_9.93vw,_11.92rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  boundaryRoadTypeValue === "Private Road"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      boundaryRoadTypeValue === "Private Road"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      boundaryRoadTypeValue === "Private Road" ? "text-white" : "text-black"
                    }`}
                  >
                    Private Road
                  </span>
                </div>
              </button>

              {/* Frame 2147239878 */}
              <button
                type="button"
                onClick={() => onBoundaryRoadTypeChange?.("Government Road")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(8.29rem,_13.82vw,_16.58rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  boundaryRoadTypeValue === "Government Road" || boundaryRoadTypeValue === "Governement Road"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      boundaryRoadTypeValue === "Government Road" || boundaryRoadTypeValue === "Governement Road"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      boundaryRoadTypeValue === "Government Road" || boundaryRoadTypeValue === "Governement Road" ? "text-white" : "text-black"
                    }`}
                  >
                    Governement Road
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Frame 2147239910 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.33rem,_0.56vw,_0.67rem)] w-full h-[clamp(3.42rem,_5.69vw,_6.83rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.83rem,_1.39vw,_1.67rem)] text-[rgba(0,_0,_0,_0.92)]">
              Width of the Road (in Feet)
            </span>
            <input
              type="text"
              value={boundaryRoadWidthValue}
              onChange={(e) => onBoundaryRoadWidthChange?.(e.target.value)}
              placeholder="Enter width"
              className="box-border w-full max-w-[clamp(22.33rem,_37.22vw,_44.67rem)] h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-white border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-4 outline-none text-black font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.67rem,_1.11vw,_1.33rem)]"
            />
          </div>
        </div>
      ) : activeTabLabel === "Recent Transactions" ? (
        <div className={`absolute flex flex-col items-start p-0 gap-[clamp(1.17rem,_1.94vw,_2.33rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)] transition-all ${
          recentTransactionTypeValue === "Available"
            ? "h-[clamp(12.75rem,_21.25vw,_25.5rem)]"
            : "h-[clamp(3.58rem,_5.97vw,_7.17rem)]"
        }`}>
          {/* Frame 2147239912 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.75rem,_1.25vw,_1.5rem)] w-full h-[clamp(3.58rem,_5.97vw,_7.17rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
              Any recent transaction in surrounding lands?
            </span>
            {/* Frame 2147239911 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.04rem,_1.74vw,_2.08rem)] w-[clamp(12.79rem,_21.32vw,_25.58rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239878 */}
              <button
                type="button"
                onClick={() => onRecentTransactionTypeChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(5.63rem,_9.38vw,_11.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  recentTransactionTypeValue === "Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      recentTransactionTypeValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      recentTransactionTypeValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239876 */}
              <button
                type="button"
                onClick={() => onRecentTransactionTypeChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  recentTransactionTypeValue === "Not Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      recentTransactionTypeValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      recentTransactionTypeValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>

          {recentTransactionTypeValue === "Available" && (
            <>
              {/* Frame 2147239910 */}
              <div className="flex flex-col items-start p-0 gap-[clamp(0.33rem,_0.56vw,_0.67rem)] w-full h-[clamp(3.42rem,_5.69vw,_6.83rem)]">
                <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.83rem,_1.39vw,_1.67rem)] text-[rgba(0,_0,_0,_0.92)]">
                  Valuation Per Acre
                </span>
                <input
                  type="text"
                  value={valuationPerAcreValue}
                  onChange={(e) => onValuationPerAcreChange?.(e.target.value)}
                  placeholder="Enter valuation"
                  className="box-border w-full max-w-[clamp(22.33rem,_37.22vw,_44.67rem)] h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-white border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-4 outline-none text-black font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.67rem,_1.11vw,_1.33rem)]"
                />
              </div>

              {/* Frame 2147239913 */}
              <div className="flex flex-col items-start p-0 gap-[clamp(0.33rem,_0.56vw,_0.67rem)] w-full h-[clamp(3.42rem,_5.69vw,_6.83rem)]">
                <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.67rem,_1.11vw,_1.33rem)] leading-[clamp(0.83rem,_1.39vw,_1.67rem)] text-[rgba(0,_0,_0,_0.92)]">
                  Locall Market Acre Price
                </span>
                <input
                  type="text"
                  value={localMarketPriceValue}
                  onChange={(e) => onLocalMarketPriceChange?.(e.target.value)}
                  placeholder="Enter price"
                  className="box-border w-full max-w-[clamp(22.33rem,_37.22vw,_44.67rem)] h-[clamp(2.25rem,_3.75vw,_4.5rem)] bg-white border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-4 outline-none text-black font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.67rem,_1.11vw,_1.33rem)]"
                />
              </div>
            </>
          )}
        </div>
      ) : activeTabLabel === "Geological Advantages" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1.17rem,_1.94vw,_2.33rem)] w-[50.15%] h-[clamp(3.58rem,_5.97vw,_7.17rem)] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Frame 2147239912 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(0.75rem,_1.25vw,_1.5rem)] w-full h-full">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
              Any Surrounding Mines & Geological Advantages?
            </span>
            {/* Frame 2147239911 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.04rem,_1.74vw,_2.08rem)] w-[clamp(12.79rem,_21.32vw,_25.58rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239878 */}
              <button
                type="button"
                onClick={() => onGeologicalAdvantagesTypeChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(5.63rem,_9.38vw,_11.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  geologicalAdvantagesTypeValue === "Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      geologicalAdvantagesTypeValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      geologicalAdvantagesTypeValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239876 */}
              <button
                type="button"
                onClick={() => onGeologicalAdvantagesTypeChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  geologicalAdvantagesTypeValue === "Not Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      geologicalAdvantagesTypeValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      geologicalAdvantagesTypeValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (activeTabLabel === "Future Plans" || activeTabLabel === "Validating Disadvantages") ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(1rem,_1.56vw,_1.88rem)] w-[50.15%] h-[clamp(11.12rem,_17.38vw,_20.85rem)] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
            {activeTabLabel === "Future Plans"
              ? "Future Plans of Geological Advantages"
              : "Validating the Disadvantages of the Land"}
          </span>
          <div className="relative w-full h-[clamp(8.04rem,_12.56vw,_15.08rem)]">
            <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,_238,_173,_0.15)] border border-[#E6EEAD] rounded-[18px] z-0" />
            <textarea
              value={commentValue}
              onChange={(e) => onCommentChange(e.target.value)}
              placeholder="Write a comment"
              className="absolute w-[91.59%] h-[clamp(3.73rem,_5.83vw,_7.0rem)] left-[4.21%] top-[clamp(1.07rem,_1.67vw,_2.0rem)] font-['Poppins',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.93rem,_1.46vw,_1.75rem)] z-1 bg-transparent resize-none border-none outline-none text-black"
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer absolute w-[clamp(1.42rem,_2.22vw,_2.67rem)] h-[clamp(1.42rem,_2.22vw,_2.67rem)] right-[clamp(0.62rem,_0.97vw,_1.17rem)] top-[clamp(6.0rem,_9.38vw,_11.25rem)] border-none z-1 ${
                isListening ? "bg-red-600 animate-pulse bg-[#dc2626]" : "bg-[#2D3509] hover:opacity-90"
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
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </button>
          </div>
        </div>
      ) : activeTabLabel === "Upcoming Infrastrucutres" ? (
        <div className="absolute flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-[50.15%] h-[clamp(4.04rem,_6.74vw,_8.08rem)] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)]">
          {/* Frame 2147239873 */}
          <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
            Upcoming Infrastructures
          </span>
          {/* Frame 2147239871 */}
          <div className="relative w-full max-w-[clamp(22.33rem,_37.22vw,_44.67rem)] h-[clamp(2.25rem,_3.75vw,_4.5rem)]">
            <select
              value={upcomingInfrastructuresValue}
              onChange={(e) => onUpcomingInfrastructuresChange?.(e.target.value)}
              className="appearance-none box-border w-full h-full bg-white border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-4 outline-none text-black font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.67rem,_1.11vw,_1.33rem)] pr-10 cursor-pointer"
            >
              <option value="" disabled hidden></option>
              <option value="Available">IT COMPANIES</option>
              <option value="Not Available">Not Available</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <svg
                className="w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] text-[#363434]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      ) : activeTabLabel === "Railway Track Connectivity" ? (
        <div
          className={`absolute flex flex-col items-start p-0 gap-[clamp(1.42rem,_2.36vw,_2.83rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)] transition-all ${
            railwayConnectivityTypeValue === "Available"
              ? "h-[clamp(9.29rem,_15.49vw,_18.58rem)]"
              : "h-[clamp(3.83rem,_6.39vw,_7.67rem)]"
          }`}
        >
          {/* Frame 2147239912 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(1rem,_1.67vw,_2rem)] w-full h-[clamp(3.83rem,_6.39vw,_7.67rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
              Any Railway Track Connectivity?
            </span>
            {/* Frame 2147239912 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.04rem,_1.74vw,_2.08rem)] w-[clamp(12.17rem,_20.28vw,_24.33rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239880 */}
              <button
                type="button"
                onClick={() => onRailwayConnectivityTypeChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(5rem,_8.33vw,_10rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  railwayConnectivityTypeValue === "Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      railwayConnectivityTypeValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      railwayConnectivityTypeValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239876 */}
              <button
                type="button"
                onClick={() => onRailwayConnectivityTypeChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  railwayConnectivityTypeValue === "Not Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      railwayConnectivityTypeValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      railwayConnectivityTypeValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>

          {railwayConnectivityTypeValue === "Available" && (
            <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(4.04rem,_6.74vw,_8.08rem)]">
              {/* Frame 2147239872 */}
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
                Select distance
              </span>
              {/* Frame 2147239871 */}
              <div className="relative w-full max-w-[clamp(22.33rem,_37.22vw,_44.67rem)] h-[clamp(2.25rem,_3.75vw,_4.5rem)]">
                <select
                  value={railwayDistanceValue}
                  onChange={(e) => onRailwayDistanceChange?.(e.target.value)}
                  className="appearance-none box-border w-full h-full bg-white border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-4 outline-none text-black font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.67rem,_1.11vw,_1.33rem)] pr-10 cursor-pointer"
                >
                  <option value="" disabled hidden></option>
                  <option value="0 - 10 kms">0 - 10 kms</option>
                  <option value="10 - 20 kms">10 - 20 kms</option>
                  <option value="20+ kms">20+ kms</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <svg
                    className="w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] text-[#363434]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : activeTabLabel === "Airport Connectivity" ? (
        <div
          className={`absolute flex flex-col items-start p-0 gap-[clamp(1.42rem,_2.36vw,_2.83rem)] w-[50.15%] left-[1.32%] top-[clamp(1.25rem,_2.08vw,_2.5rem)] transition-all ${
            airportConnectivityTypeValue === "Available"
              ? "h-[clamp(9.29rem,_15.49vw,_18.58rem)]"
              : "h-[clamp(3.83rem,_6.39vw,_7.67rem)]"
          }`}
        >
          {/* Frame 2147239912 */}
          <div className="flex flex-col items-start p-0 gap-[clamp(1rem,_1.67vw,_2rem)] w-full h-[clamp(3.83rem,_6.39vw,_7.67rem)]">
            <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
              Any Airpot Connectivity?
            </span>
            {/* Frame 2147239912 */}
            <div className="flex flex-row items-center p-0 gap-[clamp(1.04rem,_1.74vw,_2.08rem)] w-[clamp(12.17rem,_20.28vw,_24.33rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)]">
              {/* Frame 2147239880 */}
              <button
                type="button"
                onClick={() => onAirportConnectivityTypeChange?.("Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(5rem,_8.33vw,_10rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  airportConnectivityTypeValue === "Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      airportConnectivityTypeValue === "Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      airportConnectivityTypeValue === "Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Available
                  </span>
                </div>
              </button>

              {/* Frame 2147239876 */}
              <button
                type="button"
                onClick={() => onAirportConnectivityTypeChange?.("Not Available")}
                className={`box-border flex flex-row justify-center items-center py-[clamp(0.42rem,_0.69vw,_0.83rem)] px-[clamp(0.75rem,_1.25vw,_1.5rem)] gap-[10px] w-[clamp(6.13rem,_10.21vw,_12.25rem)] h-[clamp(1.58rem,_2.64vw,_3.17rem)] border rounded-[33px] cursor-pointer transition-all ${
                  airportConnectivityTypeValue === "Not Available"
                    ? "border-[#22252A] bg-[#22252A]"
                    : "border-[rgba(0,_0,_0,_0.26)] bg-white"
                }`}
              >
                <div className="flex flex-row items-center p-0 gap-[10px] w-full h-full justify-center">
                  <div
                    className={`box-border w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] rounded-full flex items-center justify-center transition-all ${
                      airportConnectivityTypeValue === "Not Available"
                        ? "border-[2px] border-white bg-[#BDD327]"
                        : "border-[2px] border-[#BDD327] bg-white"
                    }`}
                  />
                  <span
                    className={`font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(0.58rem,_0.97vw,_1.17rem)] leading-[clamp(0.75rem,_1.25vw,_1.5rem)] whitespace-nowrap transition-all ${
                      airportConnectivityTypeValue === "Not Available" ? "text-white" : "text-black"
                    }`}
                  >
                    Not Available
                  </span>
                </div>
              </button>
            </div>
          </div>

          {airportConnectivityTypeValue === "Available" && (
            <div className="flex flex-col items-start p-0 gap-[clamp(0.54rem,_0.9vw,_1.08rem)] w-full h-[clamp(4.04rem,_6.74vw,_8.08rem)]">
              {/* Frame 2147239872 */}
              <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-semibold text-[clamp(1rem,_1.67vw,_2rem)] leading-[clamp(1.25rem,_2.08vw,_2.5rem)] text-black">
                Select distance
              </span>
              {/* Frame 2147239871 */}
              <div className="relative w-full max-w-[clamp(22.33rem,_37.22vw,_44.67rem)] h-[clamp(2.25rem,_3.75vw,_4.5rem)]">
                <select
                  value={airportDistanceValue}
                  onChange={(e) => onAirportDistanceChange?.(e.target.value)}
                  className="appearance-none box-border w-full h-full bg-white border border-[rgba(0,_0,_0,_0.4)] rounded-[8px] px-4 outline-none text-black font-['Plus_Jakarta_Sans',_sans-serif] text-[clamp(0.67rem,_1.11vw,_1.33rem)] pr-10 cursor-pointer"
                >
                  <option value="" disabled hidden></option>
                  <option value="0 - 10 kms">0 - 10 kms</option>
                  <option value="10 - 20 kms">10 - 20 kms</option>
                  <option value="20+ kms">20+ kms</option>
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <svg
                    className="w-[clamp(0.5rem,_0.83vw,_1rem)] h-[clamp(0.5rem,_0.83vw,_1rem)] text-[#363434]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
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
              className={`transition-all cursor-pointer box-border absolute w-[41.2%] h-[clamp(14.53rem,_22.7vw,_27.24rem)] left-[1.76%] top-[clamp(0.62rem,_0.97vw,_1.17rem)] border-[2px] border-dashed border-[rgba(225,_229,_239,_0.6)] rounded-[12px] ${
                dragActive ? "bg-[rgba(243,_244,_241,_0.6)]" : "bg-[rgba(242,_244,_246,_0.5)]"
              }`.trim()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                accept={isImageTab ? ".png,.jpg,.jpeg" : ".pdf"}
              />

              <div className="absolute w-[clamp(2.14rem,_3.34vw,_4.01rem)] h-[clamp(2.14rem,_3.34vw,_4.01rem)] left-[calc(50%_-_clamp(2.14rem,_3.34vw,_4.01rem)/2)] top-[clamp(2.58rem,_4.03vw,_4.84rem)] rounded-full flex items-center justify-center bg-[#E6EEAD]">
                <div className="absolute w-[clamp(1.72rem,_2.69vw,_3.23rem)] h-[clamp(1.72rem,_2.69vw,_3.23rem)] left-[calc(50%_-_clamp(1.72rem,_2.69vw,_3.23rem)/2)] top-[calc(50%_-_clamp(1.72rem,_2.69vw,_3.23rem)/2)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_6px_9px_-1.8px_rgba(0,_0,_0,_0.15)] rounded-full flex items-center justify-center">
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

              <span className="absolute w-[clamp(2.84rem,_4.44vw,_5.33rem)] h-[clamp(1.02rem,_1.59vw,_1.91rem)] left-[calc(50%_-_clamp(2.84rem,_4.44vw,_5.33rem)/2)] top-[clamp(5.39rem,_8.42vw,_10.1rem)] flex items-center justify-center font-['Plus_Jakarta_Sans',_sans-serif] font-bold text-[clamp(0.8rem,_1.25vw,_1.5rem)] leading-[clamp(1.02rem,_1.59vw,_1.91rem)] text-[#1A1C1D] text-center">
                Upload
              </span>

              <span className="absolute w-[80%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] left-[10%] top-[clamp(6.72rem,_10.5vw,_12.6rem)] flex items-center justify-center font-['Inter',_sans-serif] font-normal text-[clamp(0.53rem,_0.83vw,_1.0rem)] leading-[clamp(0.67rem,_1.04vw,_1.25rem)] text-[#414755] text-center">
                Drag and drop your files here or click to browse your computer.
              </span>

              <button
                type="button"
                className="absolute hover:scale-105 active:scale-95 transition-all w-[clamp(4.44rem,_6.94vw,_8.33rem)] h-[clamp(1.69rem,_2.64vw,_3.17rem)] left-[calc(50%_-_clamp(4.44rem,_6.94vw,_8.33rem)/2)] top-[clamp(9.33rem,_14.58vw,_17.5rem)] bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] shadow-[0px_4px_27.1px_rgba(0,_0,_0,_0.05)] rounded-[57px] border-none flex items-center justify-center cursor-pointer"
              >
                <span className="font-['Plus_Jakarta_Sans',_sans-serif] font-medium text-[clamp(0.53rem,_0.83vw,_1.0rem)] leading-[clamp(0.67rem,_1.04vw,_1.25rem)] text-white">
                  Choose File
                </span>
              </button>

              <div className="absolute w-[clamp(3.29rem,_5.14vw,_6.17rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] left-[clamp(0.89rem,_1.39vw,_1.67rem)] top-[clamp(13.29rem,_20.76vw,_24.92rem)] flex items-center gap-[4px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 15 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="w-[clamp(0.44rem,_0.69vw,_0.83rem)] h-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[#000000]"
                >
                  <path d="M3.5 1.5h5l3 3v9a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1z" />
                  <path d="M8.5 1.5v3h3" />
                </svg>
                <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.69vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
                  Format:&nbsp;
                  <strong className="font-medium">{isImageTab ? "PDF" : "PDF"}</strong>
                </span>
              </div>

              <div className="absolute w-[clamp(4.18rem,_6.53vw,_7.83rem)] h-[clamp(0.53rem,_0.83vw,_1.0rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(13.2rem,_20.63vw,_24.75rem)] flex items-center gap-[4px] justify-end">
                <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.44rem,_0.69vw,_0.83rem)] leading-[clamp(0.53rem,_0.83vw,_1.0rem)] text-black flex items-center">
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
                {uploadedFiles.length === 0 ? (
                  <span className="font-['Inter',_sans-serif] font-normal text-xs text-[#9ca3af]">
                    No files uploaded yet.
                  </span>
                ) : (
                  uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="relative w-full shrink-0 h-[clamp(2.62rem,_4.1vw,_4.92rem)] bg-[#F6F9E2] rounded-[12px] mb-[4px]"
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
                          <path d="M1 10h14v5H1v-5z" fill="#F15642" />
                          <text
                            x="3.5"
                            y="13.8"
                            fill="#FFFFFF"
                            fontSize="3.5"
                            fontWeight="bold"
                            fontFamily="sans-serif"
                          >
                            PDF
                          </text>
                        </svg>
                      </div>

                      <div className="absolute left-[clamp(2.04rem,_3.19vw,_3.83rem)] top-[clamp(0.62rem,_0.97vw,_1.17rem)] w-[50%] h-[clamp(1.33rem,_2.08vw,_2.5rem)] flex flex-col justify-center">
                        <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.76rem,_1.18vw,_1.42rem)] block overflow-hidden text-ellipsis white-space-nowrap text-black">
                          {file.name}
                        </span>
                        <span className="font-['Inter',_sans-serif] font-normal text-[clamp(0.36rem,_0.56vw,_0.67rem)] leading-[clamp(0.44rem,_0.69vw,_0.83rem)] text-[rgba(0,_0,_0,_0.7)]">
                          {file.size}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onFileDelete(file.id)}
                        className="flex items-center justify-center bg-white cursor-pointer hover:bg-red-50 hover:text-red-500 rounded transition-colors absolute w-[clamp(1.11rem,_1.74vw,_2.08rem)] h-[clamp(1.11rem,_1.74vw,_2.08rem)] right-[clamp(0.67rem,_1.04vw,_1.25rem)] top-[clamp(0.67rem,_1.04vw,_1.25rem)] rounded-[2px] border-none"
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

      {activeTabLabel !== "Future Plans" && activeTabLabel !== "Validating Disadvantages" && (
        <div className="absolute w-[45.44%] h-[clamp(8.04rem,_12.56vw,_15.08rem)] left-[52.65%] top-[clamp(3.24rem,_5.07vw,_6.08rem)]">
          <div className="box-border absolute w-full h-full left-0 top-0 bg-[rgba(230,_238,_173,_0.15)] border border-[#E6EEAD] rounded-[18px] z-0" />

          <textarea
            value={commentValue}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Write a comment"
            className="absolute w-[91.59%] h-[clamp(3.73rem,_5.83vw,_7.0rem)] left-[4.21%] top-[clamp(1.07rem,_1.67vw,_2.0rem)] font-['Poppins',_sans-serif] font-normal text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.93rem,_1.46vw,_1.75rem)] z-1 bg-transparent resize-none border-none outline-none text-black"
          />

          <button
            type="button"
            onClick={handleVoiceInput}
            className={`flex items-center justify-center text-white rounded-full transition-all cursor-pointer absolute w-[clamp(1.42rem,_2.22vw,_2.67rem)] h-[clamp(1.42rem,_2.22vw,_2.67rem)] right-[clamp(0.62rem,_0.97vw,_1.17rem)] top-[clamp(6.0rem,_9.38vw,_11.25rem)] border-none z-1 ${
              isListening ? "bg-red-600 animate-pulse bg-[#dc2626]" : "bg-[#2D3509] hover:opacity-90"
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
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </button>
        </div>
      )}

      <div className="absolute w-[15.59%] h-[clamp(1.69rem,_2.64vw,_3.17rem)] right-[1.91%] top-[clamp(16.84rem,_26.3vw,_31.58rem)]">
        <button
          type="button"
          onClick={onPrevTab}
          className="flex items-center justify-center bg-transparent cursor-pointer hover:bg-red-50/20 active:scale-95 transition-all box-border absolute w-[47.17%] h-full left-0 top-0 rounded-[33px] font-['Outfit',_sans-serif] font-medium text-[clamp(0.62rem,_0.97vw,_1.17rem)] leading-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[rgba(0,_0,_0,_0.8)] border border-[rgba(205,_0,_0,_0.27)]"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onNextTab}
          className="flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all absolute w-[47.17%] h-full left-[52.83%] top-0 bg-[radial-gradient(circle_at_50%_50%,_#3D4A0D_0%,_#2A3008_100%)] rounded-[57px] border-none font-['Outfit',_sans-serif] font-normal text-[clamp(0.58rem,_0.91vw,_1.09rem)] leading-[clamp(0.71rem,_1.11vw,_1.33rem)] text-white"
        >
          {isFinishStep ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};
