import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type UploadStepId =
  | "customer-information"
  | "legal-documents"
  | "agriculture-report"
  | "land-boundaries"
  | "valuation"
  | "local-intelligence";

interface UploadShortTimelineSidebarProps {
  farmlandId: string;
  activeStep: UploadStepId;
  onPrevious?: () => void;
  onNext?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

const PIPELINE_STEPS: { id: UploadStepId; label: string }[] = [
  { id: "customer-information", label: "Customer Information" },
  { id: "legal-documents", label: "Legal Documents" },
  { id: "agriculture-report", label: "Agriculture Report" },
  { id: "land-boundaries", label: "Land & Boundaries" },
  { id: "valuation", label: "Valuation" },
  { id: "local-intelligence", label: "Local Intelligence" },
];

export const UploadShortTimelineSidebar: React.FC<UploadShortTimelineSidebarProps> = ({
  farmlandId,
  activeStep,
  onPrevious,
  onNext,
  style,
  className = "",
}) => {
  // Find current step index
  const currentIndex = PIPELINE_STEPS.findIndex((s) => s.id === activeStep);
  const isFirstStep = currentIndex <= 0;

  // Determine top and bottom items to show in the short sidebar
  let topStep = PIPELINE_STEPS[0];
  let bottomStep = PIPELINE_STEPS[1];
  let isTopActive = false;

  if (isFirstStep) {
    topStep = PIPELINE_STEPS[0];
    bottomStep = PIPELINE_STEPS[1];
    isTopActive = true;
  } else {
    topStep = PIPELINE_STEPS[currentIndex - 1];
    bottomStep = PIPELINE_STEPS[currentIndex];
    isTopActive = false;
  }

  const hasPrevious = currentIndex > 0;

  return (
    <div
      className={`bg-white rounded-[clamp(1rem,1.67vw,1.8rem)] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] p-[clamp(1.25rem,2.08vw,2rem)] flex flex-col justify-between select-none shrink-0 w-full lg:w-[clamp(20rem,28.47vw,28rem)] h-auto lg:h-[clamp(22rem,30.76vw,30rem)] ${className}`}
      style={{
        position: "relative",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── Farmland ID Header ── */}
      <div className="flex flex-col gap-[clamp(0.2rem,0.28vw,0.5rem)]">
        <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.8rem,1.11vw,1.2rem)] leading-tight text-black">
          Farmland ID:
        </span>
        <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(1.8rem,2.43vw,2.8rem)] leading-tight text-black font-bold">
          {farmlandId}
        </h3>
      </div>

      {/* ── Center Timeline Container ── */}
      <div 
        className="relative flex flex-col justify-between py-1"
        style={{
          height: "clamp(6.5rem, 9.86vw, 10.5rem)",
          marginTop: "clamp(0.5rem, 0.694vw, 1rem)",
          marginBottom: "clamp(0.5rem, 0.694vw, 1rem)",
          paddingLeft: "clamp(3rem, 4.72vw, 5.5rem)"
        }}
      >
        {/* Timeline Vertical Line (Line 495) */}
        <div
          className="absolute border-l border-[rgba(44,44,44,0.25)]"
          style={{
            left: "clamp(3.5rem, 5.15vw, 6rem)",
            top: "clamp(0.4rem, 0.625vw, 0.8rem)",
            height: "clamp(5.5rem, 8.4vw, 9.5rem)",
            width: "0px",
          }}
        />

        {/* Top Step */}
        <div className="relative flex flex-row items-center gap-[clamp(0.9rem,1.46vw,1.8rem)] z-10">
          <div className="w-[clamp(0.6rem,0.864vw,0.9rem)] h-[clamp(0.6rem,0.864vw,0.9rem)] flex items-center justify-center shrink-0 relative">
            {isTopActive ? (
              <div
                className="w-full h-full rounded-full"
                style={{
                  boxSizing: "border-box",
                  backgroundColor: "#2D3409",
                  border: "clamp(1.5px, 0.144vw, 2.5px) solid rgba(122, 149, 28, 0.8)",
                  boxShadow: "0px 0px 0px clamp(3px, 0.288vw, 5px) rgba(189, 211, 39, 0.38)",
                }}
              />
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{
                  boxSizing: "border-box",
                  backgroundColor: "#C0C2B7",
                  border: "clamp(1.5px, 0.144vw, 2.5px) solid #CAD69F",
                }}
              />
            )}
          </div>
          <span
            className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-wider leading-none text-left"
            style={{
              fontSize: isTopActive ? "clamp(0.95rem, 1.25vw, 1.3rem)" : "clamp(0.75rem, 0.972vw, 1.1rem)",
              color: isTopActive ? "#2A3008" : "#5A5C5E",
            }}
          >
            {topStep.label}
          </span>
        </div>

        {/* Bottom Step */}
        <div className="relative flex flex-row items-center gap-[clamp(0.9rem,1.46vw,1.8rem)] z-10">
          <div className="w-[clamp(0.6rem,0.864vw,0.9rem)] h-[clamp(0.6rem,0.864vw,0.9rem)] flex items-center justify-center shrink-0 relative">
            {!isTopActive ? (
              <div
                className="w-full h-full rounded-full"
                style={{
                  boxSizing: "border-box",
                  backgroundColor: "#2D3409",
                  border: "clamp(1.5px, 0.144vw, 2.5px) solid rgba(122, 149, 28, 0.8)",
                  boxShadow: "0px 0px 0px clamp(3px, 0.288vw, 5px) rgba(189, 211, 39, 0.38)",
                }}
              />
            ) : (
              <div
                className="w-full h-full rounded-full"
                style={{
                  boxSizing: "border-box",
                  backgroundColor: "#C0C2B7",
                  border: "clamp(1.5px, 0.144vw, 2.5px) solid #CAD69F",
                }}
              />
            )}
          </div>
          <span
            className="font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-wider leading-none text-left"
            style={{
              fontSize: !isTopActive ? "clamp(0.95rem, 1.25vw, 1.3rem)" : "clamp(0.75rem, 0.972vw, 1.1rem)",
              color: !isTopActive ? "#2A3008" : "#5A5C5E",
            }}
          >
            {bottomStep.label}
          </span>
        </div>
      </div>

      {/* ── Footer Navigation (Frame 2147240691) ── */}
      <div 
        className="flex flex-row justify-between items-center w-full"
        style={{
          height: "clamp(0.9rem, 1.25vw, 1.3rem)",
          marginTop: "clamp(0.5rem, 0.694vw, 1rem)"
        }}
      >
        {/* Previous Button */}
        <button
          type="button"
          onClick={hasPrevious ? onPrevious : undefined}
          disabled={!hasPrevious}
          className={`flex items-center gap-1 font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.75rem,0.972vw,1.1rem)] leading-none transition-all ${
            hasPrevious 
              ? "text-black hover:opacity-85 cursor-pointer" 
              : "text-[rgba(0,0,0,0.22)] cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.75rem,0.972vw,1.1rem)] leading-none text-black hover:opacity-85 cursor-pointer transition-all"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default UploadShortTimelineSidebar;
