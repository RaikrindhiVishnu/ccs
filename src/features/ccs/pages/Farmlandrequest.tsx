import { useState, useMemo } from "react";
import { Search, Bell, Clock, ListFilter, X as CloseIcon } from "lucide-react";
import { Typography } from "@/components/ui/typography";

import FarmlandRequestCard from "@/features/ccs/components/Farmlandrequestcard";
import { farmlandRequestDummyData } from "@/features/ccs/data/Farmlandrequestdata";
import { FARMLAND_DETAILS } from "@/features/ccs/data/FarmlandDetailData";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import DummyMap from "@/features/ccs/components/satellite-map/DummyMap";
import HistoricalAgronomyAnalysis from "@/features/ccs/components/satellite-map/Historicalagronomyanalysis";
import DecisionGateway from "@/features/ccs/components/satellite-map/DecisionGateway";
import GatewayApproved from "@/features/ccs/components/satellite-map/GatewayApproved";
import PaymentEngine from "@/features/ccs/components/satellite-map/PaymentEngine";
import FiltersModal, { type FilterState } from "@/features/ccs/components/FiltersModal";

/* ── Page ── */
export default function FarmlandRequest() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showDecisionGateway, setShowDecisionGateway] = useState(false);
  const [showGatewayApproved, setShowGatewayApproved] = useState(false);
  const [showPaymentEngine, setShowPaymentEngine] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    state: "",
    region: "",
    area: "",
    priority: "",
  });

  const detail = selectedId ? FARMLAND_DETAILS[selectedId] ?? null : null;

  const activeFilterEntries = [
    { key: "state", value: activeFilters.state },
    { key: "region", value: activeFilters.region },
    { key: "area", value: activeFilters.area },
    { key: "priority", value: activeFilters.priority },
  ].filter((f) => f.value);

  const filteredData = useMemo(() => {
    return farmlandRequestDummyData.filter((item) => {
      if (activeFilters.priority && item.priority !== activeFilters.priority) return false;
      if (activeFilters.area && !item.location.toLowerCase().includes(activeFilters.area.toLowerCase())) return false;
      if (activeFilters.state && !item.location.toLowerCase().includes(activeFilters.state.toLowerCase())) return false;
      if (activeFilters.region && !item.location.toLowerCase().includes(activeFilters.region.toLowerCase())) return false;
      return true;
    });
  }, [activeFilters]);

  return (
    <div className="relative h-full overflow-hidden">
      <FiltersModal 
        isOpen={filtersOpen} 
        onClose={() => setFiltersOpen(false)} 
        initialFilters={activeFilters}
        onApply={(newFilters) => setActiveFilters(newFilters)}
      />

      {/* ── HISTORICAL AGRONOMY ANALYSIS ── */}
      {showAnalysis && (
        <div className="fixed inset-0 z-[100] w-screen h-screen bg-white">
          <HistoricalAgronomyAnalysis 
            onBack={() => {
              setShowAnalysis(false);
              setPanelOpen(true);
            }} 
            onAuthorize={() => {
              setShowAnalysis(false);
              setShowDecisionGateway(true);
            }}
          />
        </div>
      )}

      {/* ── DECISION GATEWAY ── */}
      {showDecisionGateway && (
        <div className="absolute inset-0 z-[90]">
          <DecisionGateway 
            onClose={() => {
              setShowDecisionGateway(false);
              setPanelOpen(true);
            }}
            onAccept={() => {
              setShowDecisionGateway(false);
              setShowGatewayApproved(true);
            }}
            onReject={() => {
              setShowDecisionGateway(false);
              setPanelOpen(false);
            }}
          />
        </div>
      )}

      {/* ── GATEWAY APPROVED ── */}
      {showGatewayApproved && (
        <div className="absolute inset-0 z-[110]">
          <GatewayApproved 
            onBack={() => {
              setShowGatewayApproved(false);
              setShowDecisionGateway(true);
            }}
            onProceed={() => {
              setShowGatewayApproved(false);
              setShowPaymentEngine(true);
            }}
          />
        </div>
      )}

      {/* ── PAYMENT ENGINE ── */}
      {showPaymentEngine && (
        <div className="absolute inset-0 z-[120]">
          <PaymentEngine 
            onBack={() => {
              setShowPaymentEngine(false);
              setShowGatewayApproved(true);
            }}
            onSendRequest={() => {
              setShowPaymentEngine(false);
              setPanelOpen(false); // Back to list or whatever success flow
            }}
          />
        </div>
      )}

      {/* LIST — hidden when panel is open, map takes over */}
      {!panelOpen && !showAnalysis && !showDecisionGateway && !showGatewayApproved && !showPaymentEngine && (
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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
            {/* LEFT — icon + title */}
            <div className="flex items-center gap-[7px]">
              <Clock className="w-[19px] h-[19px] text-[#000000]" strokeWidth={2.5} />
              <Typography
                variant="h4"
                className="text-[#000000] text-[16px] font-normal leading-[25px]"
              >
                Farmland Request
              </Typography>
            </div>

            {/* RIGHT — search + filter + bell */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-[8px] w-full md:w-auto">
              {/* SEARCH BAR */}
              <div className="flex flex-1 sm:flex-none items-center gap-[8px] rounded-[60px] bg-[#FFFFFF] px-[20px] h-[52px] w-full sm:w-[312px] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] border border-transparent hover:border-gray-100 transition-colors">
                <Search className="h-[24px] w-[24px] shrink-0 text-[#5C5C5C] opacity-50" strokeWidth={1.5} />
                <input
                  placeholder="Search by GLC ID, Agent....."
                  className="w-full bg-transparent text-[16px] font-normal text-[#5C5C5C] opacity-50 outline-none placeholder:text-[#5C5C5C] placeholder:opacity-50"
                />
              </div>

              {/* FILTER */}
              <button 
                onClick={() => setFiltersOpen(true)}
                className="flex shrink-0 h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors"
              >
                <ListFilter className="h-[24px] w-[24px] text-[#000000]" strokeWidth={2} />
              </button>

              {/* BELL */}
              <button className="relative shrink-0 flex h-[52px] w-[52px] items-center justify-center rounded-[40px] bg-[#FFFFFF] shadow-[0px_4px_10px_rgba(0,0,0,0.03)] hover:bg-gray-50 transition-colors">
                <span className="absolute right-[16px] top-[14px] h-[5px] w-[5px] rounded-full bg-[#EF4646]" />
                <Bell className="h-[24px] w-[24px] text-[#2C2C2C]" strokeWidth={1.5} />
                <span className="sr-only">Notifications</span>
              </button>
            </div>
          </div>

          {/* ── ACTIVE FILTERS CHIPS ── */}
          {activeFilterEntries.length > 0 && (
            <div className="flex flex-wrap gap-[12px] mb-6">
              {activeFilterEntries.map((filter) => (
                <div 
                  key={filter.key} 
                  onClick={() => setActiveFilters(prev => ({ ...prev, [filter.key]: "" }))} 
                  className="h-[42px] px-[20px] bg-[#FFFFFF] border border-[rgba(39,128,196,0.5)] shadow-[0px_8px_32px_rgba(31,38,135,0.03)] backdrop-blur-[12px] rounded-full flex items-center gap-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[20px] text-[#2780C4]">
                    {filter.value}
                  </span>
                  <CloseIcon className="w-[15px] h-[15px] text-[#2780C4]" strokeWidth={2.5} />
                </div>
              ))}
            </div>
          )}

          {/* ── CARD GRID ── */}
          <div
            className="
              grid grid-cols-1 content-start gap-3
              lg:grid-cols-2 lg:gap-4
              xl:gap-[1.125rem]
              2xl:grid-cols-3 2xl:gap-5
            "
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <FarmlandRequestCard
                  key={item.id}
                  item={item}
                  onClick={(id) => {
                    setSelectedId(id);
                    setPanelOpen(true);
                  }}
                />
              ))
            ) : (
              <div className="col-span-full py-12 flex items-center justify-center text-gray-500 font-medium">
                No farmland requests match the selected filters.
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAP VIEW */}
      <div 
        className={`fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#FFFFFF] transition-opacity duration-300 z-[100] ${
          panelOpen && !showAnalysis ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative w-full h-full overflow-hidden bg-[#E5E7EB]">
          {/* The Map */}
          {panelOpen && !showAnalysis && <DummyMap />}

          {/* The Detail Panel */}
          <FarmlandDetailPanel
            detail={detail}
            open={panelOpen && !showAnalysis}
            onClose={() => {
              setPanelOpen(false);
              setSelectedId(null);
            }}
            onHistoricalAnalysis={() => {
              setPanelOpen(false);
              setShowAnalysis(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}