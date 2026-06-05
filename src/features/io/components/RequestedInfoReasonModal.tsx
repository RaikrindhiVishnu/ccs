import React from "react";
import { X } from "lucide-react";

interface RequestedInfoReasonModalProps {
  onClose: () => void;
  rejectedBy?: string;
  reasonParagraph1?: string;
  reasonParagraph2?: string;
}

export const RequestedInfoReasonModal: React.FC<RequestedInfoReasonModalProps> = ({
  onClose,
  rejectedBy = "Verification Officer Sravan",
  reasonParagraph1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  reasonParagraph2 = "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}) => {
  return (
    <div 
      className="
        fixed inset-0 z-50 
        flex items-center justify-center 
        bg-black/45 backdrop-blur-[4px]
        animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      {/* Rejection Reason Card */}
      <div
        className="
          relative 
          bg-white 
          shadow-[0px_20px_40px_rgba(0,49,50,0.06)] 
          rounded-[clamp(1.5rem,2.22vw,2rem)] 
          border border-[#BCC9C9]/15
          w-[clamp(28rem,46.66vw,42rem)] 
          h-auto
          md:h-[clamp(28rem,35.4vw,31.875rem)]
          flex flex-col
          overflow-hidden
          animate-in zoom-in-95 duration-200
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex flex-row justify-between items-center 
            px-[clamp(1.5rem,2.22vw,2rem)] 
            h-[clamp(4.5rem,5.55vw,5rem)] 
            border-b border-[#F3F3F5]
            bg-white
          "
        >
          <h2
            className="
              font-semibold text-[#1A1C1D] tracking-[-0.6px]
              font-[family-name:var(--font-heading)]
              text-[clamp(1.25rem,1.67vw,1.5rem)]
              leading-[clamp(1.75rem,2.22vw,2rem)]
            "
          >
            Rejection Reason
          </h2>
          <button
            onClick={onClose}
            className="
              text-[#3D4949] hover:text-[#1A1C1D] 
              transition-colors p-1.5 rounded-full hover:bg-[#F3F3F5]
            "
          >
            <X className="w-[clamp(1.1rem,1.5vw,1.35rem)] h-[clamp(1.1rem,1.5vw,1.35rem)]" />
          </button>
        </div>

        {/* Body */}
        <div
          className="
            flex flex-col flex-1
            px-[clamp(1.5rem,2.22vw,2rem)] 
            pt-[clamp(1rem,1.67vw,1.5rem)]
            pb-[clamp(1rem,1.67vw,1.5rem)]
            gap-[clamp(1rem,1.67vw,1.5rem)]
            overflow-y-auto
          "
        >
          {/* Meta Info */}
          <div className="flex flex-row items-center gap-2 font-[family-name:var(--font-sans)]">
            <span
              className="
                text-[#3D4949] font-normal
                text-[clamp(0.75rem,0.97vw,0.875rem)]
                leading-[clamp(1rem,1.39vw,1.25rem)]
              "
            >
              Rejected by:
            </span>
            <span
              className="
                text-[#1A1C1D] font-medium
                text-[clamp(0.75rem,0.97vw,0.875rem)]
                leading-[clamp(1rem,1.39vw,1.25rem)]
              "
            >
              {rejectedBy}
            </span>
          </div>

          {/* Text Area / Reason Content */}
          <div
            className="
              flex flex-col gap-4
              bg-[#F3F3F5] 
              border border-[#BCC9C9] 
              rounded-[clamp(0.75rem,1.11vw,1rem)]
              p-[clamp(1rem,1.67vw,1.5rem)]
              flex-1
              overflow-y-auto
            "
          >
            <p
              className="
                text-[#1A1C1D] font-normal
                font-[family-name:var(--font-heading)]
                text-[clamp(0.875rem,1.11vw,1rem)]
                leading-[clamp(1.25rem,1.8vw,1.625rem)]
              "
            >
              {reasonParagraph1}
            </p>
            <p
              className="
                text-[#1A1C1D] font-normal
                font-[family-name:var(--font-sans)]
                text-[clamp(0.875rem,1.11vw,1rem)]
                leading-[clamp(1.25rem,1.8vw,1.625rem)]
              "
            >
              {reasonParagraph2}
            </p>
          </div>
        </div>

        {/* Footer / Actions */}
        <div
          className="
            flex items-center justify-end
            px-[clamp(1.5rem,2.22vw,2rem)]
            h-[clamp(4.5rem,6.38vw,5.75rem)]
            border-t border-[#F3F3F5]
            bg-white
          "
        >
          <button
            onClick={onClose}
            className="
              flex items-center justify-center
              bg-[#2780C4] hover:bg-[#1f6da9]
              rounded-[33px]
              w-[clamp(6.5rem,8.4vw,7.56rem)]
              h-[clamp(2.1rem,2.63vw,2.375rem)]
              font-[family-name:var(--font-heading)]
              font-semibold text-white
              text-[clamp(0.75rem,0.97vw,0.875rem)]
              leading-[clamp(1rem,1.25vw,1.125rem)]
              transition-colors
              cursor-pointer
            "
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
