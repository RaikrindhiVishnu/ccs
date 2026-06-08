import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { SatelliteMap } from "@/features/satellite-history/components/SatelliteMap";
import { useWaybackSource } from "@/features/satellite-history/hooks/useWaybackSource";
import "@/features/satellite-history/satellite-history.css";

// ─── Icons ────────────────────────────────────────────────────────────────────

function SoilHealthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 21" fill="none" className={cn("shrink-0", className)}>
      <circle
        cx="10.5"
        cy="10.5"
        r="9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 13c1-3 4-5 5-8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 14c1-2 3-3 4-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SatelliteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={cn("shrink-0", className)}>
      <rect
        x="7"
        y="7"
        width="8"
        height="8"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 4l4 4M18 4l-4 4M4 18l4-4M18 18l-4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="11" cy="11" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TopographyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 25 14" fill="none" className={cn("shrink-0", className)}>
      <path
        d="M2 12L7 4L12 8L17 2L22 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function YieldHistoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 23" fill="none" className={cn("shrink-0", className)}>
      <path
        d="M3 20V8M8 20V12M13 20V5M18 20V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 8c2-3 5-3 7 0s5 3 8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoundariesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 21 23" fill="none" className={cn("shrink-0", className)}>
      <path
        d="M4 6l7-3 6 3v10l-6 3-7-3V6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 6l6 3m1 0l6-3M11 9v11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={cn("shrink-0", className)}>
      <rect
        x="3"
        y="4"
        width="16"
        height="15"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 9h16M8 2v4M14 2v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 22" fill="none" className={cn("shrink-0", className)}>
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 7v4l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ForwardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 14" fill="none" className={cn("shrink-0", className)}>
      <path
        d="M1 7h20M15 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 16" fill="none" className={cn("shrink-0", className)}>
      <path
        d="M2 2l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Year = "2011" | "2014" | "2017" | "2020" | "2023" | "2026";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

// ─── Temporal Ribbon ──────────────────────────────────────────────────────────

const YEARS: { year: Year; icon: React.ReactNode }[] = [
  {
    year: "2011",
    icon: (
      <ClockIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    ),
  },
  {
    year: "2014",
    icon: (
      <CalendarIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    ),
  },
  {
    year: "2017",
    icon: (
      <ClockIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    ),
  },
  {
    year: "2020",
    icon: (
      <CalendarIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    ),
  },
  {
    year: "2023",
    icon: (
      <ClockIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    ),
  },
  {
    year: "2026",
    icon: (
      <ForwardIcon className="w-[1.3rem] h-[0.8rem] lg:w-[1.4rem] lg:h-[0.85rem] xl:w-[1.45rem] xl:h-[0.9rem] 2xl:w-[1.55rem] 2xl:h-[0.95rem]" />
    ),
  },
];

function TemporalRibbon({
  activeYear,
  onYearChange,
}: {
  activeYear: Year;
  onYearChange: (y: Year) => void;
}) {
  return (
    <div
      className="
    absolute
    bottom-[2rem] lg:bottom-[2.5rem] xl:bottom-[3rem] 2xl:bottom-[3.5rem]
    left-0 right-0
    flex justify-center
    z-30
    px-4
  "
    >
      <div
        className="
      flex items-center
      px-[0.75rem] lg:px-[1rem] xl:px-[1.25rem] 2xl:px-[1.5rem]
      h-[3.5rem] lg:h-[4rem] xl:h-[4.5rem] 2xl:h-[7.125rem]
      bg-white
      rounded-[36.88px]
      shadow-[0px_28.81px_57.62px_-13.83px_rgba(0,0,0,0.25)]
      gap-[0.0625rem] lg:gap-[0.125rem] xl:gap-[0.25rem]
    "
      >
        {YEARS.map(({ year, icon }) => {
          const isActive = year === activeYear;

          return (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={cn(
                "relative flex flex-col items-center justify-center",
                "gap-[0.2rem] lg:gap-[0.25rem]",
                "transition-all duration-300 ease-in-out",

                isActive
                  ? cn(
                      "bg-[#2780C4] text-white z-10",
                      "px-[1.1rem] lg:px-[1.35rem] xl:px-[1.6rem] 2xl:px-[1.73rem]",
                      "py-[0.35rem] lg:py-[0.4rem] xl:py-[0.5rem] 2xl:py-[0.44rem]",
                      "rounded-[11523.2px]",
                      "shadow-[0px_0px_0px_9.22px_rgba(255,255,255,0.4),0px_11.52px_17.29px_-3.46px_rgba(0,0,0,0.1),0px_4.61px_6.91px_-4.61px_rgba(0,0,0,0.1)]",
                    )
                  : cn(
                      "text-[#A1A1AA] hover:text-[#71717a]",
                      "px-[0.6rem] lg:px-[0.75rem] xl:px-[0.875rem] 2xl:px-[1rem]",
                      "py-[0.6rem] lg:py-[0.75rem] 2xl:py-[0.86rem]",
                      "rounded-[2.5rem]",
                    ),
              )}
            >
              <span>{icon}</span>

              <span
                className={cn(
                  "font-[family-name:var(--font-sans)] tracking-[1.15px] uppercase",
                  "text-[0.55rem] lg:text-[0.6rem] xl:text-[0.65rem] 2xl:text-[11.52px]",
                  isActive
                    ? "font-bold text-white 2xl:text-[13.83px]"
                    : "font-normal text-[#A1A1AA]",
                )}
              >
                {year}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Geospatial Controls Panel ────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    id: "soil",
    label: "Soil Health",
    icon: (
      <SoilHealthIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.15rem] lg:h-[1.15rem] xl:w-[1.2rem] xl:h-[1.2rem] 2xl:w-[1.3rem] 2xl:h-[1.3rem]" />
    ),
  },
  {
    id: "satellite",
    label: "Satellite",
    icon: (
      <SatelliteIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.15rem] lg:h-[1.15rem] xl:w-[1.2rem] xl:h-[1.2rem] 2xl:w-[1.3rem] 2xl:h-[1.3rem]" />
    ),
  },
  {
    id: "topography",
    label: "Topography",
    icon: (
      <TopographyIcon className="w-[1.3rem] h-[0.7rem] lg:w-[1.35rem] lg:h-[0.75rem] xl:w-[1.4rem] xl:h-[0.8rem] 2xl:w-[1.55rem] 2xl:h-[0.85rem]" />
    ),
  },
  {
    id: "yield",
    label: "Yield History",
    icon: (
      <YieldHistoryIcon className="w-[1.1rem] h-[1.2rem] lg:w-[1.15rem] lg:h-[1.25rem] xl:w-[1.2rem] xl:h-[1.3rem] 2xl:w-[1.3rem] 2xl:h-[1.4rem]" />
    ),
  },
  {
    id: "boundaries",
    label: "Boundaries",
    icon: (
      <BoundariesIcon className="w-[1.1rem] h-[1.2rem] lg:w-[1.15rem] lg:h-[1.25rem] xl:w-[1.2rem] xl:h-[1.3rem] 2xl:w-[1.3rem] 2xl:h-[1.4rem]" />
    ),
  },
];

function GeospatialControlsPanel({
  activeItem,
  onItemChange,
}: {
  activeItem: string;
  onItemChange: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="
    absolute z-30
    top-[1.25rem] lg:top-[1.5rem] xl:top-[1.75rem] 2xl:top-[2rem]
    right-[1.25rem] lg:right-[1.5rem] xl:right-[1.75rem] 2xl:right-[2rem]
    w-[12.5rem] lg:w-[13.5rem] xl:w-[15rem] 2xl:w-[286px]
  "
    >
      <div
        className="
      flex flex-col
      rounded-[1.5rem] lg:rounded-[1.75rem] xl:rounded-[2rem] 2xl:rounded-[35.75px]
      bg-white
      border-[1.12px] border-white/80
      backdrop-blur-[22.34px]
      shadow-[0px_27.93px_55.86px_-13.41px_rgba(0,0,0,0.05)]
      px-[0.875rem] lg:px-[1rem] xl:px-[1.1rem] 2xl:px-[17.88px]
      pt-[0.75rem] lg:pt-[0.875rem] xl:pt-[1rem] 2xl:pt-[16.76px]
      pb-[0.75rem] lg:pb-[0.875rem] xl:pb-[1rem] 2xl:pb-[17.88px]
    "
      >
        {/* Header */}
        <div className="flex flex-col gap-[4.47px] px-[0.4rem] 2xl:px-[8.94px] pb-[0.625rem] 2xl:pb-[17.88px]">
          <Typography
            as="h2"
            variant="span"
            className="
          font-[family-name:var(--font-sans)]
          font-semibold
          text-[#2D3622]
          text-[0.8125rem] lg:text-[0.875rem] xl:text-[0.9375rem] 2xl:text-[20.11px]
          leading-[1.25]
        "
          >
            Geospatial Controls
          </Typography>

          <Typography
            as="span"
            variant="span"
            className="
          font-[family-name:var(--font-sans)]
          font-semibold
          text-[#71717A]
          text-[0.625rem] lg:text-[0.6875rem] xl:text-[0.75rem] 2xl:text-[15.64px]
          leading-[1.43]
        "
          >
            V1.4.2 Active
          </Typography>
        </div>

        {/* Dropdown Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
        flex items-center justify-between
        w-full
        px-[0.75rem] 2xl:px-[17.88px]
        h-[2.5rem] 2xl:h-[58.75px]
        rounded-[0.875rem] 2xl:rounded-[11px]
        bg-[#F9F9F9]
        transition-all duration-200
        border-t border-t-black/5
      "
        >
          <div className="flex items-center gap-[0.5rem] 2xl:gap-[17.88px]">
            <span className="text-[#71717A]">
              {NAV_ITEMS.find((item) => item.id === activeItem)?.icon}
            </span>

            <Typography
              as="span"
              variant="span"
              className="
            font-[family-name:var(--font-sans)]
            text-[0.75rem] 2xl:text-[15.64px]
            font-semibold
            text-[#71717A]
          "
            >
              {NAV_ITEMS.find((item) => item.id === activeItem)?.label}
            </Typography>
          </div>

          <ChevronRight
            className={cn(
              "w-[0.8rem] h-[0.8rem] 2xl:w-[10px] 2xl:h-[15.63px] text-[#71717A] transition-transform duration-200",
              isOpen && "rotate-90",
            )}
          />
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="flex flex-col gap-[0.25rem] mt-[0.5rem]">
            {NAV_ITEMS.filter((item) => item.id !== activeItem).map((item) => {
              const isActive = item.id === activeItem;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemChange(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-[0.75rem] 2xl:gap-[17.88px]",
                    "w-full text-left",
                    "px-[0.75rem] 2xl:px-[17.88px]",
                    "h-[2.5rem] 2xl:h-[58.75px]",
                    "rounded-[0.875rem] 2xl:rounded-[11px]",
                    "transition-all duration-200",
                    isActive
                      ? "bg-[#F9F9F9]"
                      : "hover:bg-[#F9F9F9]",
                  )}
                >
                  <span
                    className={cn(
                      isActive
                        ? "text-[#131600]"
                        : "text-[#71717A]",
                    )}
                  >
                    {item.icon}
                  </span>

                  <Typography
                    as="span"
                    variant="span"
                    className={cn(
                      "font-[family-name:var(--font-sans)]",
                      "text-[0.75rem] 2xl:text-[15.64px]",
                      "font-semibold flex-1",
                      isActive
                        ? "text-[#131600]"
                        : "text-[#71717A]",
                    )}
                  >
                    {item.label}
                  </Typography>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export type HistoricalAgronomyAnalysisProps = {
  onBack?: () => void;
};

export default function HistoricalAgronomyAnalysis({
  onBack,
}: HistoricalAgronomyAnalysisProps) {
  const [activeYear, setActiveYear] = useState<Year>("2020");
  const [activeNav, setActiveNav] = useState("soil");

  const date = `${activeYear}-01-01`;
  const { sourceConfig } = useWaybackSource(date);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#131600]">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <SatelliteMap
          tileUrl={sourceConfig?.url ?? ""}
          maxzoom={sourceConfig?.maxzoom ?? 18}
          coords={{ lat: 17.014366, lon: 78.423866 }} // Defaulting to Hyderabad area as in the dummy map text
        />
        
        {/* Bottom stats overlay from dummy map */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-4 py-1 z-10">
          <span className="text-[0.6rem] text-white/70">Camera: 991 m</span>
          <span className="text-[0.6rem] text-white/70">
            17°00′51.72″N 78°25′25.92″E
          </span>
          <span className="text-[0.6rem] text-white/70">704 m</span>
        </div>

        <div className="absolute bottom-6 right-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 z-10">
          <span className="text-[0.65rem] font-medium text-white">3D</span>
        </div>
      </div>

      {/* ── Page header — top left inside map ── */}
      <div
        className="
          absolute z-30
          top-[1.25rem] lg:top-[1.5rem] xl:top-[1.75rem] 2xl:top-[2rem]
          left-[1.25rem] lg:left-[1.5rem] xl:left-[1.75rem] 2xl:left-[2rem]
          right-[13.5rem] lg:right-[14.5rem] xl:right-[16rem] 2xl:right-[17.5rem]
          flex items-center gap-[0.5rem] lg:gap-[0.625rem] xl:gap-[0.75rem]
        "
      >
        {onBack && (
          <button
            onClick={onBack}
            className="
              flex items-center justify-center shrink-0
              w-[1.75rem] h-[1.75rem] lg:w-[2rem] lg:h-[2rem] xl:w-[2.125rem] xl:h-[2.125rem] 2xl:w-[2.25rem] 2xl:h-[2.25rem]
              rounded-full bg-black/25 hover:bg-black/40
              text-[var(--surface-card)] transition-colors
            "
          >
            <ArrowLeft className="w-[0.75rem] h-[0.75rem] lg:w-[0.875rem] lg:h-[0.875rem] xl:w-[1rem] xl:h-[1rem]" />
          </button>
        )}
      </div>

      {/* ── Geospatial Controls — top right ── */}
      <GeospatialControlsPanel
        activeItem={activeNav}
        onItemChange={setActiveNav}
      />

      {/* ── Temporal Ribbon — bottom center ── */}
      <TemporalRibbon activeYear={activeYear} onYearChange={setActiveYear} />
    </div>
  );
}
