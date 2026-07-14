import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { SatelliteMap } from "@/features/satellite-history/components/SatelliteMap";
import type { SatelliteMapHandle } from "@/features/satellite-history/components/SatelliteMap";
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
    <svg viewBox="0 0 24 24" fill="none" className={cn("shrink-0", className)}>
      <path
        d="M6 7 L12 12 L6 17 Z M13 7 L19 12 L13 17 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
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

type Year = string;

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const YEARS: { year: Year; icon: React.ReactNode }[] = Array.from({ length: 22 }, (_, i) => {
  const year = String(2005 + i);
  const isClock = i % 2 === 0;
  const isLast = i === 21;
  return {
    year,
    icon: isLast ? (
      <ForwardIcon className="w-[1.3rem] h-[0.8rem] lg:w-[1.4rem] lg:h-[0.85rem] xl:w-[1.45rem] xl:h-[0.9rem] 2xl:w-[1.55rem] 2xl:h-[0.95rem]" />
    ) : isClock ? (
      <ClockIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    ) : (
      <CalendarIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.2rem] lg:h-[1.2rem] xl:w-[1.3rem] xl:h-[1.3rem] 2xl:w-[1.4rem] 2xl:h-[1.4rem]" />
    )
  };
});

function TemporalRibbon({
  activeYear,
  onYearChange,
}: {
  activeYear: Year;
  onYearChange: (y: Year) => void;
}) {
  return (
    <div
      className="absolute bottom-[20px] md:bottom-[30px] xl:bottom-[67px] left-[20px] xl:left-1/2 xl:-translate-x-1/2 w-[calc(100%-40px)] md:w-[calc(100%-340px)] xl:w-[calc(100%-40px)] max-w-[625px] h-[80px] md:h-[90px] xl:h-[114px] z-30"
    >
      {/* Shadow layer */}
      <div className="absolute top-[0px] bottom-[0.44px] left-[0px] right-[-0.32px] bg-[#FFFFFF] rounded-[36.88px] shadow-[0px_28.81px_57.62px_-13.83px_rgba(0,0,0,0.25)] z-[-2]"></div>
      
      {/* Shell layer */}
      <div className="absolute inset-0 bg-[rgba(255,255,255,0.2)] border-[1.15px] border-[rgba(255,255,255,0.4)] backdrop-blur-[36.88px] rounded-[36.88px] z-[-1]"></div>

      {/* Scrollable Container */}
      <div className="relative flex items-center h-full w-full px-[20px] md:px-[24px] xl:px-[47px] overflow-x-auto custom-scrollbar gap-[10px] md:gap-[20px]">
        {YEARS.map(({ year, icon }) => {
        const isActive = year === activeYear;

        if (isActive) {
          return (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className="flex flex-col items-center justify-center shrink-0 w-[110px] md:w-[120px] lg:w-[135px] h-[70px] md:h-[76px] lg:h-[79px] bg-[#2780C4] rounded-[11523px] shadow-[0px_0px_0px_9.2px_rgba(255,255,255,0.4),0px_11.5px_17.3px_-3.5px_rgba(0,0,0,0.1),0px_4.6px_6.9px_-4.6px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 z-10"
            >
              <div className="w-[20px] h-[20px] md:w-[23.34px] md:h-[25.93px] text-[#FFFFFF] flex items-center justify-center mb-[4.6px]">
                {icon}
              </div>
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[12px] md:text-[13.83px] leading-[21px] tracking-[1.15px] uppercase text-[#FFFFFF]">
                {year}
              </span>
            </button>
          );
        }

        return (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className="flex flex-col items-center justify-center gap-[4.61px] shrink-0 p-[10px] md:p-[13.8px] hover:bg-white/10 rounded-xl transition-colors z-10"
          >
            <div className="w-[18px] h-[18px] md:w-[20.74px] md:h-[20.74px] text-[#A1A1AA] flex items-center justify-center">
              {icon}
            </div>
            <span className="font-['Plus_Jakarta_Sans'] font-normal text-[10px] md:text-[11.52px] leading-[17px] tracking-[1.15px] uppercase text-[#A1A1AA]">
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
    absolute z-50
    top-[1.25rem] lg:top-[1.5rem] xl:top-[1.75rem] 2xl:top-[2rem]
    right-[1.25rem] lg:right-[1.5rem] xl:right-[1.75rem] 2xl:right-[2rem]
    w-[206px] h-[184px]
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

// ─── Verification Verdict Panel ───────────────────────────────────────────────

export type VerificationVerdictItem = {
  title: string;
  subtitle: string;
  status?: boolean;
};

function VerificationVerdictPanel({ 
  onAuthorize, 
  verdicts 
}: { 
  onAuthorize?: () => void;
  verdicts?: VerificationVerdictItem[];
}) {
  const initialVerdicts = verdicts && verdicts.length > 0 ? verdicts : [
    { title: "Revenue Check", subtitle: "Documents validated via Land Bank", status: true },
    { title: "Boundary Walk", subtitle: "Geo-tagged perimeter confirmed", status: true }
  ];

  const [localVerdicts, setLocalVerdicts] = React.useState(initialVerdicts);

  // Sync with prop changes if verdicts update from API
  React.useEffect(() => {
    if (verdicts && verdicts.length > 0) {
      setLocalVerdicts(verdicts);
    }
  }, [verdicts]);

  const toggleVerdict = (index: number) => {
    const updated = [...localVerdicts];
    updated[index] = { ...updated[index], status: !(updated[index].status !== false) };
    setLocalVerdicts(updated);
  };

  return (
    <div
      className="absolute z-30 bg-[rgba(255,255,255,0.95)] backdrop-blur-md rounded-[42px] p-[28px] flex flex-col justify-between shadow-[0px_27.93px_55.86px_-13.41px_rgba(0,0,0,0.05)]"
      style={{
        width: '285px',
        height: '547px',
        maxHeight: 'calc(100vh - 270px)',
        top: '238px',
        right: '32px'
      }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex gap-[10.5px] items-center shrink-0 mb-[28px]">
          <div className="w-[34px] h-[35px] bg-[#EDEEEF] rounded-full flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#091426]">
              <path d="M18 20V10M12 20V4M6 20v-6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[15.78px] leading-[20px] text-[#091426]">Verification Verdict</span>
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-[8.77px] leading-[13px] tracking-[0.88px] uppercase text-[rgba(69,71,76,0.6)]">AUDIT REF: #9022-X</span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-[21px] flex-1 overflow-y-auto custom-scrollbar">
          {localVerdicts.map((verdict, idx) => (
            <div key={idx} className="flex items-center gap-[14px]">
              <div className="shrink-0 flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={verdict.status !== false}
                  onChange={() => toggleVerdict(idx)}
                  className="w-[20px] h-[20px] cursor-pointer rounded-[4px] border-[#00629E] text-[#00629E] focus:ring-0 focus:ring-offset-0 bg-white accent-[#00629E]"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] font-bold text-[10.52px] leading-[14px] text-[#091426]">{verdict.title}</span>
                <span className="font-['Plus_Jakarta_Sans'] font-normal text-[8.77px] leading-[13px] text-[#45474C]">{verdict.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Action */}
        <div className="shrink-0 mt-[10px]">
          <button 
            onClick={onAuthorize}
            className="w-full h-[47px] bg-[#2780C4] rounded-[28px] flex items-center justify-between px-[21px] hover:bg-[#1f669d] transition-colors"
          >
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[14px] leading-[21px] tracking-[-0.7px] text-[#FFFFFF]">Authorize Live Listing</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFFFFF]">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export type HistoricalAgronomyAnalysisProps = {
  onBack?: () => void;
  onAuthorize?: () => void;
  polygon?: any;
  coords?: { lat: number; lon: number };
  verdicts?: VerificationVerdictItem[];
};

export default function HistoricalAgronomyAnalysis({
  onBack,
  onAuthorize,
  polygon,
  coords,
  verdicts,
}: HistoricalAgronomyAnalysisProps) {
  const [activeYear, setActiveYear] = useState<Year>("2020");
  const [activeNav, setActiveNav] = useState("soil");
  const mapRef = React.useRef<SatelliteMapHandle>(null);

  const date = `${activeYear}-01-01`;
  const { sourceConfig, isLoading } = useWaybackSource(date);

  // Recenter polygon when the year changes
  React.useEffect(() => {
    if (mapRef.current) {
      mapRef.current.recenterPolygon();
    }
  }, [activeYear]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#131600]">
      {/* Map */}
      <div className="absolute inset-0 z-0">
        <SatelliteMap
          ref={mapRef}
          tileUrl={sourceConfig?.url ?? ""}
          maxzoom={sourceConfig?.maxzoom ?? 18}
          coords={coords || { lat: 17.014366, lon: 78.423866 }} // Defaulting to Hyderabad area as in the dummy map text
          polygon={polygon}
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#131600]/40 backdrop-blur-[2px] pointer-events-none transition-opacity duration-300">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2780C4] mb-3"></div>
            <span className="text-white/80 font-['Plus_Jakarta_Sans'] font-medium text-xs tracking-wide">
              Fetching historical imagery...
            </span>
          </div>
        )}

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
          top-[37px]
          left-[36px]
        "
      >
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-[8px] w-[135px] h-[52px] bg-[#FFFFFF] rounded-[60px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-[20px] h-[20px] text-[#353535]" strokeWidth={1.4} />
            <span className="font-['Inter'] font-normal text-[16px] leading-[18px] text-[#353535]">
              Go back
            </span>
          </button>
        )}
      </div>

      {/* ── Geospatial Controls — top right ── */}
      <GeospatialControlsPanel
        activeItem={activeNav}
        onItemChange={setActiveNav}
      />

      {/* ── Verification Verdict Panel — middle right ── */}
      <VerificationVerdictPanel onAuthorize={onAuthorize} verdicts={verdicts} />

      {/* ── Temporal Ribbon — bottom center ── */}
      <TemporalRibbon activeYear={activeYear} onYearChange={setActiveYear} />
    </div>
  );
}
