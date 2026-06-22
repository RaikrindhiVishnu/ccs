import React from "react";
import { Plus, Minus, User } from "lucide-react";

interface UploadFamilyTreeTabProps {
  setActiveTab: (tab: "owner" | "family" | "land") => void;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  fatherName: string;
  fatherPhoto: string | null;
  isFatherFilled: boolean;
  motherName: string;
  motherPhoto: string | null;
  isMotherFilled: boolean;
  ownerName: string;
  ownerPhoto: string | null;
  isOwnerFilled: boolean;
  spouseName: string;
  spousePhoto: string | null;
  isSpouseFilled: boolean;
  handleEditClick: (role: "father" | "mother" | "spouse" | "owner" | "custom", currentName: string) => void;
}

export const UploadFamilyTreeTab: React.FC<UploadFamilyTreeTabProps> = ({
  setActiveTab,
  zoomLevel,
  setZoomLevel,
  fatherName,
  fatherPhoto,
  isFatherFilled,
  motherName,
  motherPhoto,
  isMotherFilled,
  ownerName,
  ownerPhoto,
  isOwnerFilled,
  spouseName,
  spousePhoto,
  isSpouseFilled,
  handleEditClick,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-start items-center relative w-full mt-4 animate-in fade-in duration-300">
      
      {/* Main dashed container box - Frame 2147240187 */}
      <div 
        className="box-sizing-border-box border border-dashed border-[rgba(0,0,0,0.24)] rounded-[25px] relative overflow-hidden bg-white select-none w-full max-w-[862px] aspect-[862/676] shrink-0 transition-all duration-300"
      >
        {/* Viewport Frame - Frame 2147240188 */}
        <div 
          className="absolute"
          style={{
            width: "88.05%",
            height: "72.48%",
            left: "6.03%",
            top: "8.13%",
          }}
        >
          
          {/* Pedigree lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 759 490" preserveAspectRatio="none">
            {/* Father to Owner connector (Vector) */}
            <path 
              d="M 242,132 L 242,155 Q 242,165 252,165 L 428,165 Q 438,165 438,175 L 438,202" 
              fill="none" 
              stroke="#C2C6D8" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Mother to Owner connector (Vector) */}
            <path 
              d="M 631,132 L 631,155 Q 631,165 621,165 L 448,165 Q 438,165 438,175" 
              fill="none" 
              stroke="#C2C6D8" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Owner to Spouse connector (Vector) */}
            <path 
              d="M 293,301 L 138,301 Q 128,301 128,311 L 128,400" 
              fill="none" 
              stroke="#C2C6D8" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          {/* CARD 1: Father (Frame 2147240183) */}
          <div 
            className="absolute flex flex-col items-center justify-between"
            style={{ 
              left: "15.02%", 
              top: "0%", 
              width: "33.73%", 
              height: "26.94%" 
            }}
          >
            {/* Relationship Label badge */}
            <div 
              className="box-sizing-border-box flex flex-col items-center px-3 py-1 bg-[#E6EEAD] border border-[#E6EEAD] rounded-[9999px] justify-center shrink-0 w-fit h-[18.18%]"
            >
              <span className="font-['Hanken_Grotesk'] font-bold text-[clamp(0.38rem,0.8vw,0.95rem)] leading-none tracking-[1.1px] text-black uppercase">
                FATHER
              </span>
            </div>
            {/* Card Content Box */}
            <div 
              onClick={() => handleEditClick("father", fatherName)}
              className="box-sizing-border-box flex flex-row items-center gap-[clamp(0.4rem,1.5vw,0.8rem)] p-[clamp(0.4rem,1.5vw,1rem)] w-full h-[68.18%] bg-white/70 border border-white/50 backdrop-blur-md rounded-2xl shadow-[0px_-1px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] cursor-pointer hover:border-gray-300 transition-all select-none shrink-0"
            >
              <div className="border border-[#C2C6D8] rounded-full flex items-center justify-center bg-[#E6E8EA] shrink-0 h-[62.2%] aspect-square overflow-hidden">
                {fatherPhoto ? (
                  <img src={fatherPhoto} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-[#6E7B6C] w-1/2 h-1/2" />
                )}
              </div>
              <div className="flex flex-col justify-center items-start overflow-hidden w-full">
                {isFatherFilled ? (
                  <>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.58rem,1.2vw,0.95rem)] text-[#3E4A3D] truncate w-full">
                      {fatherName}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.38rem,0.8vw,0.65rem)] text-gray-400">
                      Click to edit
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[#3E4A3D] font-semibold text-[clamp(0.58rem,1.2vw,0.95rem)]">
                    <Plus className="w-3.5 h-3.5 text-[#6E7B6C]" />
                    <span>Add Father</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 2: Mother (Frame 2147240182) */}
          <div 
            className="absolute flex flex-col items-center justify-between"
            style={{ 
              left: "66.27%", 
              top: "0%", 
              width: "33.73%", 
              height: "26.94%" 
            }}
          >
            {/* Relationship Label badge */}
            <div 
              className="box-sizing-border-box flex flex-col items-center px-3 py-1 bg-[#E6EEAD] border border-[#E6EEAD] rounded-[9999px] justify-center shrink-0 w-fit h-[18.18%]"
            >
              <span className="font-['Hanken_Grotesk'] font-bold text-[clamp(0.38rem,0.8vw,0.95rem)] leading-none tracking-[1.1px] text-black uppercase">
                MOTHER
              </span>
            </div>
            {/* Card Content Box */}
            <div 
              onClick={() => handleEditClick("mother", motherName)}
              className="box-sizing-border-box flex flex-row items-center gap-[clamp(0.4rem,1.5vw,0.8rem)] p-[clamp(0.4rem,1.5vw,1rem)] w-full h-[68.18%] bg-white/70 border border-white/50 backdrop-blur-md rounded-2xl shadow-[0px_-1px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] cursor-pointer hover:border-gray-300 transition-all select-none shrink-0"
            >
              <div className="border border-[#C2C6D8] rounded-full flex items-center justify-center bg-[#E6E8EA] shrink-0 h-[62.2%] aspect-square overflow-hidden">
                {motherPhoto ? (
                  <img src={motherPhoto} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-[#6E7B6C] w-1/2 h-1/2" />
                )}
              </div>
              <div className="flex flex-col justify-center items-start overflow-hidden w-full">
                {isMotherFilled ? (
                  <>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.58rem,1.2vw,0.95rem)] text-[#3E4A3D] truncate w-full">
                      {motherName}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.38rem,0.8vw,0.65rem)] text-gray-400">
                      Click to edit
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[#3E4A3D] font-semibold text-[clamp(0.58rem,1.2vw,0.95rem)]">
                    <Plus className="w-3.5 h-3.5 text-[#6E7B6C]" />
                    <span>Add Mother</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 3: Owner (Primary Root) */}
          <div 
            className="absolute"
            style={{ 
              left: "38.60%", 
              top: "41.22%", 
              width: "37.94%", 
              height: "40.40%" 
            }}
          >
            <div 
              onClick={() => handleEditClick("owner", ownerName)}
              className="box-sizing-border-box flex flex-col items-center justify-center gap-[clamp(0.2rem,1.5vw,1.5rem)] p-[clamp(0.2rem,1.5vw,1.2rem)] w-full h-full bg-gradient-to-br from-white/90 to-[#E6EEAD] border border-[#3D92D0] backdrop-blur-[10px] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] cursor-pointer hover:border-blue-400 transition-all select-none relative"
            >
              <div className="border border-[#C2C6D8] rounded-full flex items-center justify-center bg-white shrink-0 h-[28.2%] aspect-square overflow-hidden">
                {ownerPhoto ? (
                  <img src={ownerPhoto} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-[#6E7B6C] w-1/2 h-1/2" />
                )}
              </div>
              <div className="flex flex-col items-center text-center w-full">
                {isOwnerFilled ? (
                  <>
                    <span className="font-['Plus_Jakarta_Sans'] font-bold text-[clamp(0.67rem,1.4vw,1.1rem)] text-[#3E4A3D] leading-tight truncate w-full">
                      {ownerName}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.38rem,0.8vw,0.65rem)] text-gray-400 mt-0.5">
                      Click to edit
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[#3E4A3D] font-semibold text-[clamp(0.67rem,1.4vw,1.1rem)]">
                    <Plus className="w-4 h-4 text-[#6E7B6C]" />
                    <span>Add Owner</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CARD 4: Spouse */}
          <div 
            className="absolute flex flex-col items-center justify-between"
            style={{ 
              left: "0%", 
              top: "81.63%", 
              width: "33.73%", 
              height: "26.94%" 
            }}
          >
            {/* Relationship Label badge */}
            <div 
              className="box-sizing-border-box flex flex-col items-center px-3 py-1 bg-[#E6EEAD] border border-[#E6EEAD] rounded-[9999px] justify-center shrink-0 w-fit h-[18.18%]"
            >
              <span className="font-['Hanken_Grotesk'] font-bold text-[clamp(0.38rem,0.8vw,0.95rem)] leading-none tracking-[1.1px] text-black uppercase">
                SPOUSE
              </span>
            </div>
            {/* Card Content Box */}
            <div 
              onClick={() => handleEditClick("spouse", spouseName)}
              className="box-sizing-border-box flex flex-row items-center gap-[clamp(0.4rem,1.5vw,0.8rem)] p-[clamp(0.4rem,1.5vw,1rem)] w-full h-[68.18%] bg-white/70 border border-white/50 backdrop-blur-md rounded-2xl shadow-[0px_-1px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] cursor-pointer hover:border-gray-300 transition-all select-none shrink-0"
            >
              <div className="border border-[#C2C6D8] rounded-full flex items-center justify-center bg-[#E6E8EA] shrink-0 h-[62.2%] aspect-square overflow-hidden">
                {spousePhoto ? (
                  <img src={spousePhoto} className="w-full h-full object-cover" />
                ) : (
                  <User className="text-[#6E7B6C] w-1/2 h-1/2" />
                )}
              </div>
              <div className="flex flex-col justify-center items-start overflow-hidden w-full">
                {isSpouseFilled ? (
                  <>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.58rem,1.2vw,0.95rem)] text-[#3E4A3D] truncate w-full">
                      {spouseName}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.38rem,0.8vw,0.65rem)] text-gray-400">
                      Click to edit
                    </span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-[#3E4A3D] font-semibold text-[clamp(0.58rem,1.2vw,0.95rem)]">
                    <Plus className="w-3.5 h-3.5 text-[#6E7B6C]" />
                    <span>Add Spouse</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Add Member button (Frame 2147240168) */}
        <button
          type="button"
          onClick={() => handleEditClick("custom", "")}
          className="box-sizing-border-box flex flex-row items-center justify-center gap-2 bg-[#2E3509] hover:bg-[#1D2206] text-white rounded-[clamp(0.96rem,2vw,2.0rem)] shadow-[0px_2px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-1px_rgba(0,0,0,0.06)] transition-all cursor-pointer absolute"
          style={{
            width: "16.59%",
            height: "7.10%",
            left: "calc(50% - 16.59% / 2)",
            top: "88.31%",
          }}
        >
          <div className="w-[clamp(0.72rem,1.5vw,1.4rem)] h-[clamp(0.72rem,1.5vw,1.4rem)] rounded-full bg-white flex items-center justify-center shrink-0">
            <Plus className="w-[clamp(0.43rem,0.9vw,0.8rem)] h-[clamp(0.43rem,0.9vw,0.8rem)] text-[#6E7B6C]" />
          </div>
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.43rem,0.9vw,0.8rem)] text-white whitespace-nowrap">
            Add Member
          </span>
        </button>

        {/* Zoom Controls (Frame 2147240190) */}
        <div 
          className="absolute flex flex-row items-center justify-end gap-3"
          style={{
            width: "8.70%",
            height: "10.65%",
            right: "3.25%",
            bottom: "5.62%",
          }}
        >
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-[clamp(0.43rem,0.9vw,1.1rem)] text-[rgba(0,0,0,0.48)] select-none">
            {zoomLevel}%
          </span>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(150, prev + 10))}
              className="w-[clamp(1.01rem,2.1vw,1.875rem)] h-[clamp(1.06rem,2.2vw,2.0rem)] bg-[#FAFAFA] hover:bg-gray-100 rounded flex items-center justify-center cursor-pointer shadow-[0px_1px_4px_rgba(0,0,0,0.12)] active:scale-95 transition-all text-[#716E6E]"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(20, prev - 10))}
              className="w-[clamp(1.01rem,2.1vw,1.875rem)] h-[clamp(1.06rem,2.2vw,2.0rem)] bg-[#FAFAFA] hover:bg-gray-100 rounded flex items-center justify-center cursor-pointer shadow-[0px_0px_4px_rgba(0,0,0,0.12)] active:scale-95 transition-all text-[#716E6E]"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ── Footer CTAs (Frame 2147240686) ── */}
      <div 
        className="flex flex-row justify-end items-center gap-[clamp(0.8rem,1.67vw,2.5rem)] pt-[clamp(0.72rem,1.5vw,1.5rem)] border-t border-gray-100 mt-[clamp(0.72rem,1.5vw,1.5rem)] w-full"
        style={{
          maxWidth: "clamp(28.73rem, 59.86vw, 71.83rem)"
        }}
      >
        <button
          type="button"
          onClick={() => setActiveTab("owner")}
          className="font-['Plus_Jakarta_Sans'] font-medium text-black hover:opacity-75 uppercase cursor-pointer tracking-wider text-[clamp(0.47rem,0.97vw,0.875rem)] flex items-center justify-center"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("land")}
          className="flex items-center justify-center text-white rounded-[57px] shadow-lg hover:scale-105 active:scale-95 cursor-pointer font-['Plus_Jakarta_Sans'] font-normal w-[clamp(3.36rem,7vw,6.25rem)] h-[clamp(1.56rem,3.26vw,2.9375rem)]"
          style={{
            background: "radial-gradient(50% 50% at 50% 50%, #3D4A0D 0%, #2A3008 100%)"
          }}
        >
          <span className="font-['Plus_Jakarta_Sans'] font-normal text-white text-[clamp(0.6rem,1.25vw,1.125rem)]">
            Next
          </span>
        </button>
      </div>

    </div>
  );
};
