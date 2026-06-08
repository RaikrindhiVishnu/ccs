import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Calendar, X as CloseIcon } from "lucide-react";

function CustomSelect({
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-[8px] relative" ref={ref}>
      <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#0F172A]">
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`h-[58px] border ${isOpen ? "border-[#2880C4]" : "border-[#E2E8F0]"} rounded-[14px] flex items-center justify-between px-[16px] bg-[#FFFFFF] cursor-pointer hover:border-gray-300 transition-colors`}
      >
        <span
          className={`font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] ${value ? "text-[#0F172A]" : "text-[#94A3B8]"}`}
        >
          {value || placeholder}
        </span>
        {isOpen ? (
          <ChevronUp className="w-[16px] h-[16px] text-[#64748B]" strokeWidth={2} />
        ) : (
          <ChevronDown className="w-[16px] h-[16px] text-[#64748B]" strokeWidth={2} />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#FFFFFF] border border-[#E2E8F0] rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-2">
          {options.map((opt: string) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="px-[16px] py-[12px] cursor-pointer hover:bg-gray-50 font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[21px] text-[#0F172A] transition-colors"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export type FilterState = {
  state: string;
  region: string;
  area: string;
  priority: string;
};

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApply: (filters: FilterState) => void;
};

export default function FiltersModal({
  isOpen,
  onClose,
  initialFilters,
  onApply,
}: FiltersModalProps) {
  const [state, setState]       = useState("");
  const [region, setRegion]     = useState("");
  const [area, setArea]         = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    if (isOpen) {
      setState(initialFilters.state);
      setRegion(initialFilters.region);
      setArea(initialFilters.area);
      setPriority(initialFilters.priority);
    }
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const activeFilters = [
    { key: "state",    value: state,    setter: setState    },
    { key: "region",   value: region,   setter: setRegion   },
    { key: "area",     value: area,     setter: setArea     },
    { key: "priority", value: priority, setter: setPriority },
  ].filter((f) => f.value);

  const handleReset = () => {
    setState("");
    setRegion("");
    setArea("");
    setPriority("");
  };

  const handleApply = () => {
    onApply({ state, region, area, priority });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
    >
      <style>{`.filters-scroll::-webkit-scrollbar { display: none; }`}</style>
      {/* Modal Card — max-h so it never overflows the viewport */}
      <div
        className="
          relative w-full
          max-w-[520px]
          max-h-[calc(100vh-2rem)]
          bg-[#FFFFFF]
          shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]
          rounded-[24px]
          flex flex-col
          overflow-hidden
        "
      >
        {/* Scrollable inner content */}
        <div
          className="flex flex-col gap-[24px] px-[31px] py-[31px] overflow-y-auto flex-1 min-h-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >

          {/* ── Header ── */}
          <div className="flex items-start justify-between">
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[32px] leading-[38px] tracking-[-0.32px] text-[#0F172A]">
              Filter Location
            </h2>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-[32px] h-[32px] rounded-full hover:bg-gray-100 transition-colors mt-1"
            >
              <X className="w-[16px] h-[16px] text-[#64748B]" strokeWidth={2} />
            </button>
          </div>

          {/* ── Form Fields ── */}
          <div className="flex flex-col gap-[22px]">
            <CustomSelect
              label="Select State"
              placeholder="Choose state"
              options={["A.P.", "Telangana", "Karnataka", "Tamil Nadu"]}
              value={state}
              onChange={setState}
            />

            <CustomSelect
              label="Select Region"
              placeholder="Choose region"
              options={["Coastal Andhra", "Rayalaseema", "North Coastal", "WG"]}
              value={region}
              onChange={setRegion}
            />

            <CustomSelect
              label="Select Area"
              placeholder="Choose area"
              options={["Tanuku", "Vizag", "Vijayawada", "Guntur"]}
              value={area}
              onChange={setArea}
            />

            <CustomSelect
              label="Select Status"
              placeholder="Choose status"
              options={["ACTIVE", "COMPLETED", "PENDING", "REJECTED"]}
              value={priority}
              onChange={setPriority}
            />

            {/* Date row */}
            <div className="grid grid-cols-2 gap-[20px]">
              {/* From Date */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#0F172A]">
                  Form Date
                </label>
                <div className="h-[58px] border border-[#E2E8F0] rounded-[14px] flex items-center justify-between px-[16px] bg-[#FFFFFF] cursor-text hover:border-gray-300 transition-colors">
                  <span className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#94A3B8]">
                    DD/MM/YYYY
                  </span>
                  <Calendar className="w-[22px] h-[22px] text-[#2880C4]" strokeWidth={2} />
                </div>
              </div>

              {/* To Date */}
              <div className="flex flex-col gap-[8px]">
                <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#0F172A]">
                  Too Date
                </label>
                <div className="h-[58px] border border-[#E2E8F0] rounded-[14px] flex items-center justify-between px-[16px] bg-[#FFFFFF] cursor-text hover:border-gray-300 transition-colors">
                  <span className="font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] text-[#94A3B8]">
                    DD/MM/YYYY
                  </span>
                  <Calendar className="w-[22px] h-[22px] text-[#2880C4]" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Selected Filter Chips ── */}
          {activeFilters.length > 0 && (
            <div className="flex flex-col gap-[16px]">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[11px] leading-[12px] tracking-[1.1px] uppercase text-[#64748B]">
                SELECTED FILTERS
              </span>
              <div className="flex flex-wrap gap-[12px]">
                {activeFilters.map((filter) => (
                  <div
                    key={filter.key}
                    onClick={() => filter.setter("")}
                    className="h-[42px] px-[20px] bg-[#FFFFFF] border border-[rgba(39,128,196,0.5)] shadow-[0px_8px_32px_rgba(31,38,135,0.03)] backdrop-blur-[12px] rounded-full flex items-center gap-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-['Plus_Jakarta_Sans'] font-medium text-[14px] leading-[20px] text-[#2780C4]">
                      {filter.value}
                    </span>
                    <CloseIcon className="w-[15px] h-[15px] text-[#2780C4]" strokeWidth={2.5} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer — sticky at bottom ── */}
        <div className="flex items-center justify-between px-[31px] py-[20px] border-t border-[#F1F5F9] bg-white shrink-0">
          <button
            onClick={handleReset}
            className="font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#2880C4] px-[16px] py-[8px] hover:underline"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="w-[110px] h-[56px] bg-[#2880C4] shadow-[0px_4px_12px_rgba(37,99,235,0.25)] rounded-[45px] font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#FFFFFF] hover:bg-[#1f669d] transition-colors flex items-center justify-center"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
