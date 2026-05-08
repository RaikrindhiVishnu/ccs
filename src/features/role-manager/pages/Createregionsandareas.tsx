import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import regionImg from "@/assets/region.svg";
import areasImg from "@/assets/areas.svg";
import arrowLeftIcon from "@/assets/arrow.svg";
// ─── Back Button ──────────────────────────────────────────────────────────────

const GoBackButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "inline-flex flex-row items-center gap-2 self-start",
      "bg-[var(--surface-card)] rounded-[var(--btn-radius-pill)]",
      // Padding — scales from mobile → 2xl
      "px-4 lg:px-5",
      // Height — scales across all laptop sizes up to 2xl
      "h-10 lg:h-11 xl:h-[3.25rem] 2xl:h-[3.5rem]",
      "shadow-[0px_0px_4px_rgba(0,0,0,0.12)]",
      "transition-all duration-150 hover:opacity-80 active:scale-[0.97]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)]",
      "cursor-pointer border-0",
    )}
    aria-label="Go Back to Dashboard"
  >
    <span className="flex items-center justify-center shrink-0 w-5 h-5 lg:w-6 lg:h-6">
      <img src={arrowLeftIcon} alt="Back Arrow" className="w-5 h-5 shrink-0" />
    </span>

    <Typography
      as="span"
      variant="span"
      className={cn(
        "font-[family-name:var(--font-sans)] font-normal",
        "text-[var(--text-primary)]",
        // Text scales: 14px → 15px → 16px → 17px
        "text-[0.875rem] lg:text-[0.9375rem] xl:text-[1rem] 2xl:text-[1.0625rem]",
        "leading-[110%] whitespace-nowrap",
      )}
    >
      Go Back to Dashboard
    </Typography>
  </button>
);

// ─── Info Card ────────────────────────────────────────────────────────────────

interface InfoCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col",
        "bg-[var(--surface-card)] rounded-[1.5rem]",
        "shadow-[0px_0px_8.4px_rgba(0,0,0,0.06)]",
        "w-full overflow-hidden",
        "h-[20rem] lg:h-[21.25rem] xl:h-[23.75rem] 2xl:h-[26rem]",
      )}
    >
      {/* ── Title + Description ──────────────────────────────── */}
      <div
        className={cn(
          "flex flex-col shrink-0",
          // Gap scales: 10px → 12px → 12px → 14px
          "gap-2.5 lg:gap-3 2xl:gap-3.5",
          // Padding scales
          "px-4 lg:px-5 xl:px-5 2xl:px-6",
          "pt-4 lg:pt-5 xl:pt-5 2xl:pt-6",
        )}
      >
        <Typography
          as="h3"
          variant="span"
          className={cn(
            "font-[family-name:var(--font-sans)] font-medium",
            "text-[var(--text-primary)]",
            "tracking-[-0.01em] leading-6",
            // Title scales: 16px → 17px → 19px → 20px
            "text-[1rem] lg:text-[1.0625rem] xl:text-[1.1875rem] 2xl:text-[1.25rem]",
          )}
        >
          {title}
        </Typography>

        <Typography
          as="p"
          variant="span"
          className={cn(
            "font-[family-name:var(--font-sans)] font-normal",
            "text-[var(--text-primary)] opacity-60",
            "tracking-[-0.01em]",
            // Line height scales
            "leading-[1.1rem] lg:leading-[1.125rem] 2xl:leading-5",
            // Description scales: 12.5px → 13px → 14px → 14px
            "text-[0.78125rem] lg:text-[0.8125rem] xl:text-[0.875rem] 2xl:text-[0.875rem]",
          )}
        >
          {description}
        </Typography>
      </div>

      {/* ── Illustration area ────────────────────────────────── */}
      {/* No background — image floats freely matching Figma */}
      <div
        className={cn(
          "relative flex-1 min-h-0",
          "mx-4 lg:mx-5 2xl:mx-6",
          "mt-3 lg:mt-4 2xl:mt-5",
          "mb-4 lg:mb-5 2xl:mb-6",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const CreateRegionsAndAreas: React.FC = () => {
  return (
    <div
      className={cn(
        "min-h-screen bg-[var(--surface-page)]",
        "flex items-center justify-center",
        // Page padding scales smoothly
        "px-6 lg:px-10 xl:px-16 2xl:px-24",
        "py-8 lg:py-10 xl:py-16 2xl:py-20",
      )}
    >
      {/* Content column — max-width scales from 1024 to 1900+ */}
      <div
        className={cn(
          "flex flex-col w-full",
          // Gap between back button and card
          "gap-5 lg:gap-[1.375rem] xl:gap-[1.625rem] 2xl:gap-8",
          // Max-width: 704 → 768 → 786 → 896 → uncapped center
          "max-w-[44rem] lg:max-w-[48rem] xl:max-w-[49.125rem] 2xl:max-w-[56rem]",
        )}
      >
        {/* ── Back button ──────────────────────────────────── */}
        <GoBackButton />

        {/* ── White container card ─────────────────────────── */}
        <Card
          className={cn(
            "w-full bg-[var(--surface-card)]",
            "rounded-[1.5rem]",
            "shadow-[var(--shadow-card)]",
            "overflow-hidden",
          )}
        >
          {/* Title — scales from 1024 to 1900+ */}
          <div
            className={cn(
              "flex items-center justify-center px-4",
              "pt-6 lg:pt-7 xl:pt-8 2xl:pt-10",
              "pb-0",
            )}
          >
            <Typography
              as="h2"
              variant="span"
              className={cn(
                "font-[family-name:var(--font-sans)] font-bold",
                "text-[var(--text-primary)] text-center",
                // Title: 20px → 22px → 24px → 26px
                "text-[1.25rem] lg:text-[1.375rem] xl:text-[1.5rem] 2xl:text-[1.625rem]",
                "leading-[1.875rem]",
              )}
            >
              Create Regions and Areas
            </Typography>
          </div>

          {/* Two-column grid */}
          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2",
              // Gap: tighter at 1024, wider at 1440+
              // 1024=16px | 1280=24px | 1440=32px | 1900+=60px
              "gap-4 lg:gap-6 xl:gap-8 2xl:gap-[3.75rem]",
              // Padding: smooth increase across breakpoints
              // 1024=20px | 1280=32px | 1440=40px | 1900+=55px
              "px-4 lg:px-8 xl:px-10 2xl:px-[3.4375rem]",
              // Top padding
              "pt-5 lg:pt-6 xl:pt-8 2xl:pt-[2.0625rem]",
              "pb-5 lg:pb-8 xl:pb-10 2xl:pb-[3.4375rem]",
            )}
          >
            <InfoCard
              title="Region"
              description="A broad strategic territory managed by the Regional Officer, comprising multiple operational clusters."
              imageSrc={regionImg}
              imageAlt="Region illustration"
            />

            <InfoCard
              title="Area"
              description="A specific locality or zone within a Region where daily land sourcing operations take place."
              imageSrc={areasImg}
              imageAlt="Area illustration"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateRegionsAndAreas;