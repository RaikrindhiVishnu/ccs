import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import { SatelliteMap } from "@/features/satellite-history/components/SatelliteMap";
import type { SatelliteMapHandle } from "@/features/satellite-history/components/SatelliteMap";
import { useWaybackSource } from "@/features/satellite-history/hooks/useWaybackSource";
import "@/features/satellite-history/satellite-history.css";
import { motion, AnimatePresence } from 'framer-motion';

// ─── Icons ────────────────────────────────────────────────────────────────────

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

// ─── Types ────────────────────────────────────────────────────────────────────

type Year = string;

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const YEARS: { year: Year; icon: React.ReactNode }[] = Array.from({ length: 12 }, (_, i) => {
  const year = String(2015 + i);
  const isClock = i % 2 === 0;
  const isLast = i === 11;
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
  onYearHover,
}: {
  activeYear: Year;
  onYearChange: (y: Year) => void;
  onYearHover: (y: Year | null) => void;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeYear]);

  return (
    <div className="absolute bottom-[20px] md:bottom-[30px] xl:bottom-[40px] left-[10px] right-[10px] md:left-[110px] md:right-[330px] lg:left-[320px] flex justify-center pointer-events-none z-30">
      <div className="relative w-full max-w-[625px] h-[65px] md:h-[75px] xl:h-[90px] pointer-events-auto">
        {/* Shadow layer */}
        <div className="absolute top-[0px] bottom-[0px] left-[0px] right-[0px] bg-[#FFFFFF] rounded-[36.88px] shadow-[0px_28.81px_57.62px_-13.83px_rgba(0,0,0,0.25)] z-[-2]"></div>

        {/* Shell layer */}
        <div className="absolute inset-0 bg-[rgba(255,255,255,0.2)] border-[1.15px] border-[rgba(255,255,255,0.4)] backdrop-blur-[36.88px] rounded-[36.88px] z-[-1]"></div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="relative flex items-center h-full w-full px-[15px] md:px-[24px] xl:px-[47px] overflow-x-auto custom-scrollbar gap-[10px] md:gap-[20px]"
        >
          {YEARS.map(({ year, icon }) => {
            const isActive = year === activeYear;

            if (isActive) {
              return (
                <button
                  key={year}
                  data-active="true"
                  onClick={() => onYearChange(year)}
                  onMouseEnter={() => onYearHover(year)}
                  onMouseLeave={() => onYearHover(null)}
                  className="flex flex-col items-center justify-center shrink-0 w-[100px] md:w-[110px] lg:w-[125px] h-[55px] md:h-[60px] lg:h-[65px] bg-[#2780C4] rounded-[11523px] shadow-[0px_0px_0px_6px_rgba(255,255,255,0.4),0px_11.5px_17.3px_-3.5px_rgba(0,0,0,0.1),0px_4.6px_6.9px_-4.6px_rgba(0,0,0,0.1)] transition-transform hover:scale-105 z-10"
                >
                  <div className="w-[18px] h-[18px] md:w-[20px] md:h-[22px] text-[#FFFFFF] flex items-center justify-center mb-[2px]">
                    {icon}
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-[11px] md:text-[12px] leading-[18px] tracking-[1.15px] uppercase text-[#FFFFFF]">
                    {year}
                  </span>
                </button>
              );
            }

            return (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                onMouseEnter={() => onYearHover(year)}
                onMouseLeave={() => onYearHover(null)}
                className="flex flex-col items-center justify-center gap-[4.6px] shrink-0 p-[10px] md:p-[13.8px] hover:bg-black/5 rounded-xl transition-colors z-10"
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

          {/* Spacer to fix right padding in scrollable flex containers */}
          <div className="shrink-0 w-[10px] md:w-[20px] lg:w-[30px]"></div>
        </div>
      </div>
    </div>
  );
}

// ─── Geospatial Controls Panel ────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    id: "satellite",
    label: "Satellite",
    icon: (
      <SatelliteIcon className="w-[1.1rem] h-[1.1rem] lg:w-[1.15rem] lg:h-[1.15rem] xl:w-[1.2rem] xl:h-[1.2rem] 2xl:w-[1.3rem] 2xl:h-[1.3rem]" />
    ),
  }
];

function GeospatialControlsPanel() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className="w-[286px]"
    >
      <div
        className="
      flex flex-col
      rounded-[1.5rem] lg:rounded-[1.75rem] xl:rounded-[2rem] 2xl:rounded-[30px]
      bg-[rgba(255,255,255,0.95)]
      border-[1.12px] border-white/80
      backdrop-blur-[22.34px]
      shadow-[0px_27.93px_55.86px_-13.41px_rgba(0,0,0,0.05)]
      overflow-hidden
      transition-all duration-300
    "
      >
        {/* Header container (Clickable) */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-[16px] py-[16px] cursor-pointer hover:bg-black/5"
        >
          <Typography
            as="h2"
            variant="span"
            className="
          font-[family-name:var(--font-sans)]
          font-semibold
          text-[#2D3622]
          text-[0.8125rem] lg:text-[0.875rem] xl:text-[0.9375rem] 2xl:text-[18px]
          leading-[25px]
        "
          >
            Geospatial Controls
          </Typography>
          <ChevronDown className={`w-[20px] h-[20px] text-[#2D3622] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Body */}
        {isOpen && (
          <div className="w-full flex flex-col px-[16px] pb-[16px] border-t-[1.12px] border-t-black/10 pt-[16px]">
            <div
              className="
            flex items-center
            w-full
            px-[0.75rem] 2xl:px-[17.88px]
            h-[2.5rem] 2xl:h-[50px]
            rounded-[0.875rem] 2xl:rounded-[11px]
            bg-[#F9F9F9]
          "
            >
              <div className="flex items-center gap-[0.5rem] 2xl:gap-[17.88px]">
                <span className="text-[#71717A] flex items-center justify-center w-[19px] h-[19px]">
                  {NAV_ITEMS[0].icon}
                </span>

                <Typography
                  as="span"
                  variant="span"
                  className="
                font-[family-name:var(--font-sans)]
                text-[0.75rem] 2xl:text-[15.64px] leading-[22px]
                font-semibold
                text-[#71717A]
              "
                >
                  {NAV_ITEMS[0].label}
                </Typography>
              </div>
            </div>
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
  const [isOpen, setIsOpen] = React.useState(false);

  // Sync with prop changes if verdicts update from API
  React.useEffect(() => {
    if (verdicts && verdicts.length > 0) {
      setLocalVerdicts(verdicts);
    }
  }, [verdicts]);

  return (
    <div
      className="flex flex-col justify-between"
      style={{
        width: '285px',
        height: isOpen ? '547px' : 'auto',
        maxHeight: 'calc(100vh - 270px)'
      }}
    >
      <div className={`bg-[rgba(255,255,255,0.95)] backdrop-blur-md rounded-[42px] flex flex-col shadow-[0px_27.93px_55.86px_-13.41px_rgba(0,0,0,0.05)] border-[1.12px] border-white/80 overflow-hidden transition-all duration-300 ${isOpen ? 'h-full p-[28px]' : 'p-[20px]'}`}>

        {/* Header - Clickable */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between cursor-pointer hover:bg-black/5 rounded-[20px] ${isOpen ? 'mb-[28px] p-[8px] -m-[8px]' : ''}`}
        >
          <div className="flex items-center gap-[10px]">
            <div className="w-[34px] h-[35px] bg-[#EDEEEF] rounded-full flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#091426]">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-[15.78px] text-[#091426]">Verification Verdict</span>
          </div>
          <ChevronDown className={`w-[20px] h-[20px] text-[#091426] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Expandable Content */}
        {isOpen && (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* List */}
            <div className="flex flex-col gap-[21px] flex-1 overflow-y-auto custom-scrollbar mb-[20px]">
              {localVerdicts.map((verdict, idx) => (
                <div key={idx} className="flex items-center gap-[14px]">
                  <div className="shrink-0 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={verdict.status !== false}
                      readOnly
                      className="w-[20px] h-[20px] cursor-default rounded-[4px] border-[#00629E] text-[#00629E] focus:ring-0 focus:ring-offset-0 bg-white accent-[#00629E]"
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
        )}
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
  isSidebarExpanded?: boolean;
  label?: string;
};

export default function HistoricalAgronomyAnalysis({
  onBack,
  onAuthorize,
  polygon,
  coords,
  verdicts,
  isSidebarExpanded = false,
  label,
}: HistoricalAgronomyAnalysisProps) {
  const currentYear = "2026";
  const [activeYear, setActiveYear] = useState<Year>(currentYear);
  const [hoverYear, setHoverYear] = useState<Year | null>(null);

  const baseMapRef = React.useRef<SatelliteMapHandle>(null);
  const historicalMapRef = React.useRef<SatelliteMapHandle>(null);
  const clipContainerRef = React.useRef<HTMLDivElement>(null);

  const displayYear = hoverYear || activeYear;
  const activeDate = `${activeYear}-01-01`;
  const hoverDate = `${displayYear}-01-01`;

  const { sourceConfig: activeSourceConfig, isLoading: activeLoading } = useWaybackSource(activeDate);
  const { sourceConfig: hoverSourceConfig, isLoading: hoverLoading } = useWaybackSource(hoverDate);

  const isLoading = activeLoading || hoverLoading;

  // Sync Base Map -> Historical Map
  React.useEffect(() => {
    // Wait for a short tick to ensure refs are populated
    const timeoutId = setTimeout(() => {
      const baseMap = baseMapRef.current?.getMap();
      const historicalMap = historicalMapRef.current?.getMap();

      if (!baseMap || !historicalMap) return;

      const handler = () => {
        historicalMap.jumpTo({
          center: baseMap.getCenter(),
          zoom: baseMap.getZoom(),
          bearing: baseMap.getBearing(),
          pitch: baseMap.getPitch(),
        });
      };

      baseMap.on('move', handler);

      // Perform an initial sync just in case
      handler();

      return () => {
        baseMap.off('move', handler);
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [polygon]);

  // Dynamic Polygon Mask
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const historicalMap = historicalMapRef.current?.getMap();
      const container = clipContainerRef.current;
      if (!historicalMap || !polygon || !container) return;

      let coordsList: number[][] = [];
      const geom = polygon.type === 'Feature' ? polygon.geometry : polygon;
      if (geom?.type === 'Polygon' && geom.coordinates?.length > 0) {
        coordsList = geom.coordinates[0];
      } else if (geom?.type === 'MultiPolygon' && geom.coordinates?.length > 0 && geom.coordinates[0]?.length > 0) {
        coordsList = geom.coordinates[0][0];
      }

      if (coordsList.length === 0) return;

      const updateClip = () => {
        const points = coordsList.map(c => {
          const p = historicalMap.project(c as [number, number]);
          return `${p.x}px ${p.y}px`;
        });
        const path = `polygon(${points.join(', ')})`;
        container.style.clipPath = path;
        container.style.WebkitClipPath = path;
      };

      historicalMap.on('render', updateClip);
      // Run once immediately
      updateClip();

      return () => {
        historicalMap.off('render', updateClip);
      };
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [polygon]);

  // Determine standard coordinates
  const initialCoords = coords || { lat: 17.014366, lon: 78.423866 }; // Default fallback

  // Intentionally not recentering when the year changes so user doesn't lose their spot

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#131600]">
      {/* Map Layers */}
      <div className="absolute inset-0 z-0">
        {polygon ? (
          <>
            {/* 1. Base Map (Current Imagery or Active Year - fully interactive) */}
            <div className="absolute inset-0">
              <SatelliteMap
                ref={baseMapRef}
                tileUrl={activeYear === currentYear ? "" : (activeSourceConfig?.url ?? "")}
                maxzoom={activeSourceConfig?.maxzoom ?? 18}
                coords={initialCoords}
                polygon={polygon}
                label={label}
                interactive={true}
              />
              {/* Dark overlay to make the base map dim, highlighting the bright spyglass */}
              <div className={`absolute inset-0 bg-black/40 pointer-events-none z-10 transition-opacity duration-300 ${hoverYear ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* 2. Historical Map (Dynamically clipped to Polygon) */}
            {/* The drop-shadow makes the clipped polygon look like a floating glass card with dark edges */}
            <div
              className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 ${hoverYear ? 'opacity-100' : 'opacity-0'}`}
              style={{
                filter: 'drop-shadow(0px 0px 15px rgba(0,0,0,0.9)) drop-shadow(0px 10px 40px rgba(0,0,0,0.8))',
              }}
            >
              <div
                ref={clipContainerRef}
                className="w-full h-full"
              >
                <SatelliteMap
                  ref={historicalMapRef}
                  tileUrl={hoverSourceConfig?.url ?? ""}
                  maxzoom={hoverSourceConfig?.maxzoom ?? 18}
                  coords={initialCoords}
                  polygon={polygon}
                  label={label}
                  interactive={false}
                />
              </div>
            </div>

            {/* 3. Floating Date Label */}
            <div className="absolute bottom-[110px] md:bottom-[130px] left-0 right-0 pointer-events-none z-10 flex justify-center transition-all duration-500">
              <div className="bg-[#131600]/80 backdrop-blur-md px-6 py-2 rounded-full text-white/90 text-sm font-semibold tracking-wide border border-white/10 shadow-[0px_4px_20px_rgba(0,0,0,0.5)] font-['Plus_Jakarta_Sans'] flex items-center">
                 Historical View: 
                 <div className="ml-1 relative w-[40px] h-[20px] overflow-hidden">
                   <AnimatePresence mode="popLayout">
                     <motion.span
                       key={displayYear}
                       initial={{ opacity: 0, y: 15 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -15 }}
                       transition={{ duration: 0.3, ease: "easeInOut" }}
                       className="absolute left-0 inline-block"
                     >
                       {displayYear}
                     </motion.span>
                   </AnimatePresence>
                 </div>
              </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#131600]/40 backdrop-blur-[2px] pointer-events-none transition-opacity duration-300">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#2780C4] mb-3"></div>
                <span className="text-white/80 font-['Plus_Jakarta_Sans'] font-medium text-xs tracking-wide">
                  Fetching historical imagery...
                </span>
              </div>
            )}

            {/* Bottom stats overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-4 py-1 z-10 pointer-events-none">
              <span className="text-[0.6rem] text-white/70">Camera: 991 m</span>
              <span className="text-[0.6rem] text-white/70">
                17°00′51.72″N 78°25′25.92″E
              </span>
              <span className="text-[0.6rem] text-white/70">704 m</span>
            </div>

            <div className="absolute bottom-6 right-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1 z-10 pointer-events-none">
              <span className="text-[0.65rem] font-medium text-white">3D</span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F3F4F6] text-[#6B7280]">
            <div className="flex flex-col items-center gap-2 bg-white/80 p-6 rounded-[16px] shadow-sm">
              <span className="text-[16px] font-semibold">No Map Data</span>
              <span className="text-[14px]">Polygon coordinates are not available for this farmland.</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Page header — top left inside map ── */}
      <div
        className={`absolute z-30 transition-all duration-300 top-[16px] md:top-[37px] ${isSidebarExpanded ? 'left-[20px] md:left-[310px]' : 'left-[20px] md:left-[110px]'}`}
      >
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center w-[40px] h-[40px] bg-[#FFFFFF] rounded-[60px] shadow-[0px_0px_4px_rgba(0,0,0,0.12)] hover:bg-gray-50 transition-colors"
            title="Go back"
          >
            <ArrowLeft className="w-[20px] h-[20px] text-[#353535]" strokeWidth={1.4} />
          </button>
        )}
      </div>

      {/* ── Right Side Panels Container ── */}
      <div className="absolute z-50 top-[1.25rem] lg:top-[32px] right-[1.25rem] lg:right-[32px] flex flex-col gap-[20px] items-end pointer-events-none">
        <div className="pointer-events-auto">
          {polygon && <GeospatialControlsPanel />}
        </div>
        <div className="pointer-events-auto">
          <VerificationVerdictPanel onAuthorize={onAuthorize} verdicts={verdicts} />
        </div>
      </div>

      {/* ── Temporal Ribbon — bottom center ── */}
      {polygon && <TemporalRibbon activeYear={activeYear} onYearChange={setActiveYear} onYearHover={setHoverYear} />}
    </div>
  );
}
