import * as React from "react";
import { X as CloseIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type DecisionGatewayProps = {
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
};

export default function DecisionGateway({ onClose, onAccept, onReject }: DecisionGatewayProps) {
  const [showRejectModal, setShowRejectModal] = React.useState(false);

  return (
    <div className="relative w-full h-full bg-[#F2F2F2] md:rounded-[43px] overflow-hidden flex items-center justify-center">
      {/* Main Modal Container */}
      <div
        className={cn(
          "relative w-[90%] max-w-[672px] h-[533px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[20px] rounded-[48px] shadow-[0px_10px_40px_-10px_rgba(9,20,38,0.15),inset_0px_1px_1px_rgba(255,255,255,0.8)] flex flex-col items-center transition-all duration-300",
          showRejectModal && "scale-95 opacity-50 pointer-events-none"
        )}
      >
        {/* Modal Header */}
        <div className="flex flex-col items-center gap-[8px] mt-[48px]">
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-center tracking-[3.2px] uppercase text-[#8590A6]">
            Decision Gateway
          </span>
          <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-[36px] leading-[40px] text-center tracking-[-0.9px] text-[#131600]">
            Select Gateway Outcome
          </h1>
        </div>

        {/* The Decision Stack */}
        <div className="flex flex-col gap-[8px] w-full px-[48px] mt-[48px] relative">
          
          {/* ACCEPT CARD */}
          <button
            onClick={onAccept}
            className="
              relative w-full h-[116px] bg-[#FFFFFF] border-[2px] border-[#2780C4] rounded-[32px]
              flex items-center px-[24px] gap-[24px]
              shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]
              hover:bg-blue-50 transition-colors z-10
              text-left
            "
          >
            <div className="w-[64px] h-[64px] bg-[#2780C4] rounded-[16px] flex items-center justify-center shrink-0">
              <div className="w-[30px] h-[30px] bg-[#FFFFFF] rounded-full flex items-center justify-center">
                <Check className="w-[18px] h-[18px] text-[#2780C4]" strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-[20px] text-[#2780C4]">
                ACCEPT
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[20px] text-[#45474C]">
                Mark as Gateway Approved & Trigger Auto-Assignment.
              </span>
            </div>
          </button>

          {/* Signature Branding Element */}
          <div className="absolute left-[88px] top-[100px] w-[1px] h-[56px] bg-[#A1A1AA] opacity-50 z-0 hidden md:block"></div>

          {/* REJECT CARD */}
          <button
            onClick={() => setShowRejectModal(true)}
            className="
              w-full h-[114px] bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] rounded-[32px]
              flex items-center px-[24px] gap-[24px]
              shadow-[0px_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-[2px]
              hover:bg-white/40 transition-colors z-10 mt-[8px]
              text-left
            "
          >
            <div className="w-[64px] h-[64px] bg-[rgba(239,68,68,0.8)] rounded-[16px] flex items-center justify-center shrink-0">
              <div className="w-[30px] h-[30px] bg-[#FFFFFF] rounded-full flex items-center justify-center">
                <CloseIcon className="w-[18px] h-[18px] text-[#EF4444]" strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col gap-[4px] opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[20px] leading-[20px] text-[#131600]">
                REJECT
              </span>
              <span className="font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[20px] text-[#45474C]">
                Case Entirely Dismissed due to high risk or illegality.
              </span>
            </div>
          </button>
        </div>

        {/* Modal Footer Actions */}
        <div className="absolute bottom-[56px] w-full px-[48px] flex justify-center">
          <button 
            onClick={onClose}
            className="flex items-center justify-center gap-[8px] hover:opacity-70 transition-opacity"
          >
            <div className="w-[10.5px] h-[10.5px] flex items-center justify-center">
              <CloseIcon className="w-full h-full text-[#45474C]" strokeWidth={3} />
            </div>
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[20px] text-[#45474C]">
              Cancel and Review Data
            </span>
          </button>
        </div>
      </div>

      {/* ── REJECTION CONFIRMATION MODAL ── */}
      {showRejectModal && (
        <div className="fixed z-[150] flex items-center justify-center inset-0">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[4px]" onClick={() => setShowRejectModal(false)}></div>
          <div className="relative w-[576px] max-w-[576px] h-[661px] bg-[#FFFFFF] shadow-[0px_20px_40px_rgba(0,0,0,0.15)] rounded-[24px] flex flex-col items-center">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowRejectModal(false)}
              className="absolute top-[32px] right-[32px] w-[24px] h-[24px] flex items-center justify-center text-[#45474C] hover:opacity-70"
            >
              <CloseIcon className="w-[20px] h-[20px]" strokeWidth={2} />
            </button>

            {/* Graphic & Text Container */}
            <div className="flex flex-col items-center gap-[16px] absolute top-[114px] w-[356px] left-[calc(50%-178px)]">
              
              {/* Graphic */}
              <div className="flex flex-col items-start pb-[24px]">
                <div className="relative w-[96px] h-[96px] bg-[#C03F41] rounded-full flex items-center justify-center shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
                  <div className="w-[31.2px] h-[31.2px] bg-[#FFEBE9] rounded-full flex items-center justify-center z-10">
                    <CloseIcon className="w-[18px] h-[18px] text-[#C03F41]" strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col items-center gap-[6px] w-[356px]">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-[40px] text-center tracking-[-0.32px] text-[#151C27] w-full">
                  Outcome Rejected
                </h2>
                <p className="font-['Hanken_Grotesk'] font-normal text-[16px] leading-[24px] text-center text-[#414751] w-full">
                  The farmland request has been entirely dismissed due to high risk or illegality.
                </p>
              </div>
            </div>

            {/* Add Remarks Container */}
            <div className="flex flex-col gap-[12px] absolute top-[365px] left-[28px] w-[520px] h-[175px]">
              <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[23px] text-[#737784]">
                Add Remarks
              </label>
              <textarea 
                className="w-[520px] h-[140px] bg-[rgba(255,255,255,0.7)] border border-[rgba(255,255,255,0.2)] shadow-[0px_0px_16px_rgba(0,0,0,0.08)] rounded-[12px] p-[20px] font-['Plus_Jakarta_Sans'] font-semibold text-[12px] leading-[15px] text-[#414751] placeholder:text-[rgba(115,119,132,0.6)] outline-none resize-none focus:border-[#C03F41]/30 transition-colors"
                placeholder="Write a reason..."
              />
            </div>

            {/* Reject Button */}
            <button 
              onClick={onReject}
              className="absolute top-[570px] left-[28px] w-[520px] h-[56px] bg-[#C03F41] rounded-[58px] flex items-center justify-center hover:bg-[#a63638] transition-colors"
            >
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[18px] leading-[24px] text-center text-[#FFFFFF]">
                Reject
              </span>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}
