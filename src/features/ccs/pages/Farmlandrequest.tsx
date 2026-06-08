import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Typography } from "@/components/ui/typography";

import FarmlandRequestCard from "@/features/ccs/components/Farmlandrequestcard";
import { farmlandRequestDummyData } from "@/features/ccs/data/Farmlandrequestdata";
import { FARMLAND_DETAILS } from "@/features/ccs/data/FarmlandDetailData";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import DummyMap from "@/features/ccs/components/satellite-map/DummyMap";
import HistoricalAgronomyAnalysis from "@/features/ccs/components/satellite-map/Historicalagronomyanalysis";

/* ── Page ── */
export default function FarmlandRequest() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const detail = selectedId ? FARMLAND_DETAILS[selectedId] ?? null : null;

  return (
    <div className="relative h-full overflow-hidden">
      {/* ── HISTORICAL AGRONOMY ANALYSIS ── */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[100] w-screen h-screen bg-white">
          <HistoricalAgronomyAnalysis onBack={() => {
            setShowAnalysis(false);
            setPanelOpen(true);
          }} />
        </div>
      )}

      {/* MAP — only visible when panel is open */}
      {panelOpen && !showAnalysis && <DummyMap />}

      {/* LIST — hidden when panel is open, map takes over */}
      {!panelOpen && !showAnalysis && (
        <div
          className="
            h-full overflow-y-auto
            px-5 py-5
            lg:px-7 lg:py-6
            xl:px-9 xl:py-7
            2xl:px-11 2xl:py-9
          "
        >
          {/* ── HEADER ── */}
          <div className="flex items-center justify-between">
            {/* LEFT — icon + title */}
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/farm.svg"
                alt=""
                className="h-[1rem] w-[1rem] lg:h-[1.125rem] lg:w-[1.125rem] xl:h-[1.25rem] xl:w-[1.25rem]"
              />
              <Typography
                variant="h4"
                className="text-[var(--text-primary)] text-[0.9375rem] font-normal leading-tight lg:text-[1rem] xl:text-[1.125rem]"
              >
                Farmland Request
              </Typography>
            </div>

            {/* RIGHT — search + bell */}
            <div className="flex items-center gap-2">
              {/* SEARCH BAR */}
              <div className="flex items-center gap-2 rounded-[3.75rem] bg-[var(--surface-card)] px-4 py-[0.875rem] lg:px-5 lg:py-[0.9375rem]">
                <Search
                  className="h-5 w-5 shrink-0 text-[var(--text-subtle)]"
                  strokeWidth={1.6}
                />
                <input
                  placeholder="Search..."
                  className="w-[7rem] bg-transparent text-[0.9375rem] font-normal leading-[110%] text-[var(--text-subtle)] outline-none placeholder:text-[var(--text-subtle)] lg:w-[10rem] lg:text-base xl:w-[13rem] 2xl:w-[16rem]"
                />
              </div>

              {/* BELL — icon-only circle */}
              <button className="relative flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full bg-[var(--surface-card)] transition-colors hover:bg-[var(--brand-tint)] xl:h-[3.25rem] xl:w-[3.25rem]">
                <span className="absolute right-[0.75rem] top-[0.625rem] h-[0.3125rem] w-[0.3125rem] rounded-full bg-[var(--status-danger)]" />
                <Bell
                  className="h-5 w-5 text-[var(--surface-sidebar)]"
                  strokeWidth={1.5}
                />
                <span className="sr-only">Notifications</span>
              </button>
            </div>
          </div>

          {/* ── CARD GRID ── */}
          <div
            className="
              mt-4 lg:mt-5 xl:mt-6
              grid grid-cols-1 content-start gap-3
              lg:grid-cols-2 lg:gap-4
              xl:gap-[1.125rem]
              2xl:grid-cols-3 2xl:gap-5
            "
          >
            {farmlandRequestDummyData.map((item) => (
              <FarmlandRequestCard
                key={item.id}
                item={item}
                onClick={(id) => {
                  setSelectedId(id);
                  setPanelOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* DETAIL PANEL — slides over the map */}
      {!showAnalysis && (
        <FarmlandDetailPanel
          detail={detail}
          open={panelOpen}
          onClose={() => {
            setPanelOpen(false);
            setSelectedId(null);
          }}
          onHistoricalAnalysis={() => {
            setPanelOpen(false);
            setShowAnalysis(true);
          }}
        />
      )}
    </div>
  );
}