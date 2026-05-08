import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

import FarmlandListCard from "@/components/ccs/Farmlandlistcard";
import FarmlandDetailPanel from "@/components/ccs/FarmlandDetailPanel";
import DummyMap from "@/components/ccs/DummyMap";
import HistoricalAgronomyAnalysis from "@/components/ccs/Historicalagronomyanalysis"; {/* ← ADD */}
import { useFarmlandList } from "@/core/hooks/Usefarmlandlist";
import { useFarmlandDetail } from "@/core/hooks/useFarmlandDetail";

/* ── skeleton ── */
function SkeletonCard() {
  return (
    <div className="flex animate-pulse overflow-hidden rounded-[1.5rem] bg-[var(--surface-card)] shadow-[var(--shadow-card)] xl:rounded-[2rem]">
      <div className="h-[11rem] w-full bg-[var(--input)] lg:h-auto lg:w-[13rem] xl:w-[15rem]" />
      <div className="flex flex-1 flex-col gap-3 p-4 xl:p-5">
        <div className="h-5 w-[7rem] rounded bg-[var(--input)]" />
        <div className="h-3 w-[5rem] rounded bg-[var(--input)]" />
        <div className="mt-2 grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-2 w-[3rem] rounded bg-[var(--input)]" />
              <div className="h-4 w-[5rem] rounded bg-[var(--input)]" />
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div className="h-6 w-[6rem] rounded-full bg-[var(--input)]" />
          <div className="h-8 w-[6rem] rounded-full bg-[var(--input)]" />
        </div>
      </div>
    </div>
  );
}

/* ── page ── */
export default function FarmlandList() {
  const { data, loading, error, refetch } = useFarmlandList();

  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false); {/* ← ADD */}
  const { detail, loading: detailLoading } = useFarmlandDetail(selectedId);

  return (
    <div className="relative h-full overflow-hidden">

      {/* ── HISTORICAL AGRONOMY ANALYSIS ── */} {/* ← ADD */}
     {showAnalysis && (
  <div className="absolute inset-0 z-50 w-full h-full">
    <HistoricalAgronomyAnalysis onBack={() => setShowAnalysis(false)} />
  </div>
)}

      {/* MAP — only visible when panel is open */}
      {panelOpen && !showAnalysis && <DummyMap />}

      {/* LIST — hidden when panel is open, map takes over */}
      {!panelOpen && !showAnalysis && (
        <div
          className="
            h-full overflow-y-auto
            px-6 py-6
            lg:px-8 lg:py-7
            xl:px-10 xl:py-8
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
                Farmland List
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

              {/* BELL BUTTON */}
              <button className="relative flex h-[3.125rem] w-[3.125rem] items-center justify-center rounded-full bg-[var(--surface-card)] transition-colors hover:bg-[var(--brand-tint)] xl:h-[3.25rem] xl:w-[3.25rem]">
                <span className="absolute right-[0.75rem] top-[0.625rem] h-[0.3125rem] w-[0.3125rem] rounded-full bg-[var(--status-danger)]" />
                <Bell className="h-5 w-5 text-[var(--surface-sidebar)]" strokeWidth={1.5} />
                <span className="sr-only">Notifications</span>
              </button>
            </div>
          </div>

          {/* ── LIST ── */}
          <div className="mt-5 flex flex-col gap-3 xl:mt-6 xl:gap-4">
            {/* ERROR */}
            {error && (
              <div className="flex items-center justify-between rounded-[1rem] bg-[var(--status-danger-soft)] px-5 py-3">
                <Typography
                  variant="p"
                  className="text-[var(--status-danger)] text-[0.875rem] font-medium"
                >
                  {error}
                </Typography>
                <Button
                  variant="outline-danger"
                  onClick={refetch}
                  className="underline"
                >
                  Try again
                </Button>
              </div>
            )}

            {loading
              ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
              : data.map((item) => (
                  <FarmlandListCard
                    key={item.id}
                    item={item}
                    onViewDetails={(id) => {
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
          detail={detailLoading ? null : detail}
          open={panelOpen}
          onClose={() => {
            setPanelOpen(false);
            setSelectedId(null);
          }}
          onHistoricalAnalysis={() => { {/* ← CHANGE */}
            setPanelOpen(false);
            setShowAnalysis(true);
          }}
        />
      )}

    </div>
  );
}