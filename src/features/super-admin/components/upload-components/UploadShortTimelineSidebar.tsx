import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={cn(
        "relative box-border bg-white rounded-[clamp(0.8rem,1.67vw,1.8rem)] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] p-[clamp(1rem,2.08vw,2.0rem)] flex flex-col justify-between select-none shrink-0 w-full lg:w-[clamp(13.67rem,28.47vw,28.0rem)] h-auto lg:h-[clamp(14.76rem,30.76vw,30.0rem)]",
        className
      )}
      style={style}
    >
      {/* ── Farmland ID Header ── */}
      <div className="flex flex-col gap-[clamp(0.13rem,0.28vw,0.5rem)]">
        <span className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(0.53rem,1.11vw,1.2rem)] leading-tight text-black">
          Farmland ID:
        </span>
        <h3 className="font-['Plus_Jakarta_Sans'] font-medium text-[clamp(1.17rem,2.43vw,2.8rem)] leading-tight text-black font-bold">
          {farmlandId}
        </h3>
      </div>

      {/* ── Center Timeline Container ── */}
      <div className="relative flex flex-col justify-between py-1 h-[clamp(4.73rem,_9.86vw,_10.5rem)] mt-[clamp(0.33rem,_0.694vw,_1rem)] mb-[clamp(0.33rem,_0.694vw,_1rem)] pl-[clamp(2.27rem,_4.72vw,_5.5rem)]">
        {/* Timeline Vertical Line (Line 495) */}
        <div className="absolute border-l border-[rgba(44,44,44,0.25)] left-[clamp(2.47rem,_5.15vw,_6rem)] top-[clamp(0.3rem,_0.625vw,_0.8rem)] h-[clamp(4.03rem,_8.4vw,_9.5rem)] w-0" />

        {/* Top Step */}
        <div className="relative flex flex-row items-center gap-[clamp(0.7rem,1.46vw,1.8rem)] z-10">
          <div className="w-[clamp(0.41rem,0.864vw,0.9rem)] h-[clamp(0.41rem,0.864vw,0.9rem)] flex items-center justify-center shrink-0 relative">
            {isTopActive ? (
              <div className="w-full h-full rounded-full box-border bg-[#2D3409] border-[clamp(1.5px,_0.144vw,_2.5px)] border-[rgba(122,_149,_28,_0.8)] shadow-[0_0_0_clamp(3px,_0.288vw,_5px)_rgba(189,_211,_39,_0.38)]" />
            ) : (
              <div className="w-full h-full rounded-full box-border bg-[#C0C2B7] border-[clamp(1.5px,_0.144vw,_2.5px)] border-[#CAD69F]" />
            )}
          </div>
          <span
            className={`font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-wider leading-none text-left ${
              isTopActive
                ? "text-[clamp(0.6rem,_1.25vw,_1.3rem)] text-[#2A3008]"
                : "text-[clamp(0.47rem,_0.972vw,_1.1rem)] text-[#5A5C5E]"
            }`}
          >
            {topStep.label}
          </span>
        </div>

        {/* Bottom Step */}
        <div className="relative flex flex-row items-center gap-[clamp(0.7rem,1.46vw,1.8rem)] z-10">
          <div className="w-[clamp(0.41rem,0.864vw,0.9rem)] h-[clamp(0.41rem,0.864vw,0.9rem)] flex items-center justify-center shrink-0 relative">
            {!isTopActive ? (
              <div className="w-full h-full rounded-full box-border bg-[#2D3409] border-[clamp(1.5px,_0.144vw,_2.5px)] border-[rgba(122,_149,_28,_0.8)] shadow-[0_0_0_clamp(3px,_0.288vw,_5px)_rgba(189,_211,_39,_0.38)]" />
            ) : (
              <div className="w-full h-full rounded-full box-border bg-[#C0C2B7] border-[clamp(1.5px,_0.144vw,_2.5px)] border-[#CAD69F]" />
            )}
          </div>
          <span
            className={`font-['Plus_Jakarta_Sans'] font-semibold uppercase tracking-wider leading-none text-left ${
              !isTopActive
                ? "text-[clamp(0.6rem,_1.25vw,_1.3rem)] text-[#2A3008]"
                : "text-[clamp(0.47rem,_0.972vw,_1.1rem)] text-[#5A5C5E]"
            }`}
          >
            {bottomStep.label}
          </span>
        </div>
      </div>

      {/* ── Footer Navigation (Frame 2147240691) ── */}
      <div className="flex flex-row justify-between items-center w-full h-[clamp(0.6rem,_1.25vw,_1.3rem)] mt-[clamp(0.33rem,_0.694vw,_1rem)]">
        {/* Previous Button */}
        <button
          type="button"
          onClick={hasPrevious ? onPrevious : undefined}
          disabled={!hasPrevious}
          className={`flex items-center gap-1 font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.47rem,0.972vw,1.1rem)] leading-none transition-all ${
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
          className="flex items-center gap-1 font-['Plus_Jakarta_Sans'] font-semibold text-[clamp(0.47rem,0.972vw,1.1rem)] leading-none text-black hover:opacity-85 cursor-pointer transition-all"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default UploadShortTimelineSidebar;
