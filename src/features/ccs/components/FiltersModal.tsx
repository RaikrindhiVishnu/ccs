import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, ChevronUp, Calendar, X as CloseIcon } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import CalendarPopover from "./CalendarPopover";
import { useGetAllGeoMasterDataMutation, useGetRegionsAreasByStateMutation, useGetAllMasterDataMutation } from "@/features/ccs/api/masterDataApi";
import { transformTable } from "@/features/role-manager/utils/utils";

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
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`flex flex-col gap-[8px] relative ${isOpen ? 'z-[100]' : 'z-10'}`} ref={ref}>
      <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#0F172A]">
        {label}
      </label>
      <div
        onClick={() => {
          if (!isOpen) setSearchTerm("");
          setIsOpen(!isOpen);
        }}
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
        <div data-lenis-prevent="true" className="absolute top-[calc(100%+4px)] left-0 w-full max-h-[250px] bg-[#FFFFFF] border border-[#E2E8F0] rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] z-50 overflow-y-auto py-2 flex flex-col">
          <div className="px-[12px] pb-[8px] sticky top-0 bg-[#FFFFFF]">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-[12px] py-[8px] border border-[#E2E8F0] rounded-[8px] text-[14px] font-['Plus_Jakarta_Sans'] focus:outline-none focus:border-[#2880C4]"
            />
          </div>
          {filteredOptions.length > 0 ? filteredOptions.map((opt: string) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className="px-[16px] py-[12px] cursor-pointer hover:bg-gray-50 font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[21px] text-[#0F172A] transition-colors shrink-0"
            >
              {opt}
            </div>
          )) : (
            <div className="px-[16px] py-[12px] font-['Plus_Jakarta_Sans'] font-normal text-[14px] leading-[21px] text-[#94A3B8] shrink-0 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export type FilterState = {
  state: string;
  region: string;
  area: string;
  priority?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  state_id?: number | null;
  region_id?: number | null;
  area_id?: number | null;
  status_ids?: number[] | null;
};

type FiltersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialFilters: FilterState;
  onApply: (filters: FilterState) => void;
};

const parseDateString = (value: string) => {
  if (!value) return null;
  const formatPattern = value.split("/")[2]?.length === 2 ? "dd/MM/yy" : "dd/MM/yyyy";
  const parsedDate = parse(value, formatPattern, new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

export default function FiltersModal({
  isOpen,
  onClose,
  initialFilters,
  onApply,
}: FiltersModalProps) {
  const [state, setState] = useState("");
  const [region, setRegion] = useState("");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [showFromCalendar, setShowFromCalendar] = useState(false);
  const [showToCalendar, setShowToCalendar] = useState(false);
  const fromDateRef = useRef<HTMLDivElement>(null);
  const toDateRef = useRef<HTMLDivElement>(null);

  const [getGeoMasterData, { data: geoDataResponse }] = useGetAllGeoMasterDataMutation();
  const [getAllMasterData, { data: masterDataResponse }] = useGetAllMasterDataMutation();
  
  const geoData = React.useMemo(() => {
    const rawGeoData = geoDataResponse?.data || geoDataResponse || {};
    return {
      states: transformTable(rawGeoData.states || []),
      districts: transformTable(rawGeoData.districts || []),
      mandals: transformTable(rawGeoData.mandals || [])
    };
  }, [geoDataResponse]);

  const [getRegionsAreas, { data: regionsAreasResp }] = useGetRegionsAreasByStateMutation();
  
  const cascadingData = React.useMemo(() => {
    const rawRegionsAreas = regionsAreasResp?.data || regionsAreasResp || {};
    return {
      districts: rawRegionsAreas.regions ? (Array.isArray(rawRegionsAreas.regions[0]) ? transformTable(rawRegionsAreas.regions) : rawRegionsAreas.regions) : null,
      mandals: rawRegionsAreas.areas ? (Array.isArray(rawRegionsAreas.areas[0]) ? transformTable(rawRegionsAreas.areas) : rawRegionsAreas.areas) : null
    };
  }, [regionsAreasResp]);

  const currentDistricts = cascadingData.districts || geoData.districts;
  const currentMandals = cascadingData.mandals || geoData.mandals;

  useEffect(() => {
    if (state && geoData.states.length > 0) {
      const selectedStateObj: any = geoData.states.find((s: any) => 
        (s.description || s.desc || s.state_name || s.name || String(s.id)) === state
      );
      if (selectedStateObj && selectedStateObj.id) {
        getRegionsAreas({ stateid: Number(selectedStateObj.id) });
      }
    }
  }, [state, geoData.states]);

  useEffect(() => {
    if (isOpen) {
      if (!geoDataResponse) {
        getGeoMasterData({});
      }
      if (!masterDataResponse) {
        getAllMasterData({});
      }
      setState(initialFilters.state);
      setRegion(initialFilters.region);
      setArea(initialFilters.area);
      setStatus(initialFilters.status ?? "");
      setFromDate(initialFilters.fromDate ?? "");
      setToDate(initialFilters.toDate ?? "");
      setSelectedStartDate(parseDateString(initialFilters.fromDate ?? ""));
      setSelectedEndDate(parseDateString(initialFilters.toDate ?? ""));
      setShowFromCalendar(false);
      setShowToCalendar(false);
    }
  }, [isOpen, initialFilters]);

  if (!isOpen) return null;

  const activeFilters = [
    { key: "state", value: state, setter: setState },
    { key: "region", value: region, setter: setRegion },
    { key: "area", value: area, setter: setArea },
    { key: "status", value: status, setter: setStatus },
    { key: "fromDate", value: fromDate, setter: setFromDate },
    { key: "toDate", value: toDate, setter: setToDate },
  ].filter((f) => f.value);

  const handleReset = () => {
    setState("");
    setRegion("");
    setArea("");
    setStatus("");
    setFromDate("");
    setToDate("");
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const handleApply = () => {
    let state_id = null;
    let region_id = null;
    let area_id = null;

    if (state && geoData.states.length > 0) {
      const selectedStateObj: any = geoData.states.find((s: any) => 
        (s.description || s.desc || s.state_name || s.name || String(s.id)) === state
      );
      if (selectedStateObj) state_id = Number(selectedStateObj.id);
    }

    if (region && currentDistricts) {
      const selectedRegionObj: any = currentDistricts.find((d: any) => 
        (d.description || d.desc || d.district_name || d.region_name || d.name || String(d.id)) === region
      );
      if (selectedRegionObj) region_id = Number(selectedRegionObj.id);
    }

    if (area && currentMandals) {
      const selectedAreaObj: any = currentMandals.find((m: any) => 
        (m.description || m.desc || m.mandal_name || m.area_name || m.name || String(m.id)) === area
      );
      if (selectedAreaObj) area_id = Number(selectedAreaObj.id);
    }

    let status_ids: number[] | null = null;
    if (status) {
      if (status.toLowerCase() === "approved") status_ids = [3];
      else if (status.toLowerCase() === "rejected") status_ids = [4, 5];
    }

    onApply({ state, region, area, status, fromDate, toDate, state_id, region_id, area_id, status_ids });
    onClose();
  };

  const handleFromDateChange = (date: Date) => {
    setSelectedStartDate(date);
    setFromDate(format(date, "dd/MM/yyyy"));
    // If the new start date is after the existing end date, clear the end date
    if (selectedEndDate && date > selectedEndDate) {
      setSelectedEndDate(null);
      setToDate("");
    }
    setShowFromCalendar(false);
  };

  const handleToDateChange = (date: Date) => {
    // If end date is before start date, swap them so the range is always valid
    if (selectedStartDate && date < selectedStartDate) {
      setSelectedEndDate(selectedStartDate);
      setToDate(format(selectedStartDate, "dd/MM/yyyy"));
      setSelectedStartDate(date);
      setFromDate(format(date, "dd/MM/yyyy"));
    } else {
      setSelectedEndDate(date);
      setToDate(format(date, "dd/MM/yyyy"));
    }
    setShowToCalendar(false);
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
          overflow-visible
        "
      >
        {/* Scrollable inner content */}
        <div
          data-lenis-prevent="true"
          className="flex flex-col gap-[24px] px-[31px] py-[31px] overflow-y-auto flex-1 min-h-0 overflow-x-visible"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >

          {/* ── Header ── */}
          <div className="flex items-start justify-between">
            <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-[32px] leading-[38px] tracking-[-0.32px] text-[#0F172A]">
              Filters
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
              options={geoData?.states?.map((s: any) => s.description || s.desc || s.state_name || s.name || String(s.id)) || ["A.P.", "Telangana", "Karnataka", "Tamil Nadu"]}
              value={state}
              onChange={(val) => {
                setState(val);
                setRegion("");
                setArea("");
              }}
            />

            {state && (
              <CustomSelect
                label="Select Region"
                placeholder="Choose region"
                options={currentDistricts?.map((d: any) => d.description || d.desc || d.district_name || d.region_name || d.name || String(d.id)) || ["Coastal Andhra", "Rayalaseema", "North Coastal", "WG"]}
                value={region}
                onChange={(val) => {
                  setRegion(val);
                  setArea("");
                }}
              />
            )}

            {region && (
              <CustomSelect
                label="Select Area"
                placeholder="Choose area"
                options={currentMandals?.map((m: any) => m.description || m.desc || m.mandal_name || m.area_name || m.name || String(m.id)) || ["Tanuku", "Vizag", "Vijayawada", "Guntur"]}
                value={area}
                onChange={setArea}
              />
            )}

            <CustomSelect
              label="Status"
              placeholder="Choose status"
              options={["Approved", "Rejected"]}
              value={status}
              onChange={setStatus}
            />

            {/* Date row */}
            <div className="relative z-[50]">
              <div className="grid grid-cols-2 gap-[20px]">
                {/* Form Date */}
                <div className="flex flex-col gap-[8px]" ref={fromDateRef}>
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#0F172A]">
                    From Date
                  </label>
                  <div
                    onClick={() => {
                      setShowFromCalendar(!showFromCalendar);
                      setShowToCalendar(false);
                    }}
                    className={`h-[58px] border rounded-[14px] flex items-center justify-between px-[16px] bg-[#FFFFFF] cursor-pointer transition-colors ${fromDate ? "border-[#2880C4]" : "border-[#E2E8F0] hover:border-gray-300"}`}
                  >
                    <span className={`font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] ${fromDate ? "text-[#0F172A] font-medium" : "text-[#94A3B8]"}`}>
                      {fromDate || "DD/MM/YYYY"}
                    </span>
                    <Calendar className="w-[22px] h-[22px] text-[#2880C4]" strokeWidth={2} />
                  </div>

                  {/* Form Date Calendar */}
                  {showFromCalendar && (
                    <CalendarPopover
                      selectedDate={selectedStartDate}
                      onChange={handleFromDateChange}
                      onClose={() => setShowFromCalendar(false)}
                      mode="start"
                      isInModal={true}
                    />
                  )}
                </div>

                {/* To Date */}
                <div className="flex flex-col gap-[8px]" ref={toDateRef}>
                  <label className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] leading-[21px] text-[#0F172A]">
                    To Date
                  </label>
                  <div
                    onClick={() => {
                      setShowToCalendar(!showToCalendar);
                      setShowFromCalendar(false);
                    }}
                    className={`h-[58px] border rounded-[14px] flex items-center justify-between px-[16px] bg-[#FFFFFF] cursor-pointer transition-colors ${toDate ? "border-[#2880C4]" : "border-[#E2E8F0] hover:border-gray-300"}`}
                  >
                    <span className={`font-['Plus_Jakarta_Sans'] font-normal text-[16px] leading-[24px] ${toDate ? "text-[#0F172A] font-medium" : "text-[#94A3B8]"}`}>
                      {toDate || "DD/MM/YYYY"}
                    </span>
                    <Calendar className="w-[22px] h-[22px] text-[#2880C4]" strokeWidth={2} />
                  </div>

                  {/* To Date Calendar */}
                  {showToCalendar && (
                    <CalendarPopover
                      selectedDate={selectedEndDate}
                      onChange={handleToDateChange}
                      onClose={() => setShowToCalendar(false)}
                      mode="end"
                      isInModal={true}
                    />
                  )}
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
        <div className="flex items-center justify-between px-[31px] py-[20px] border-t border-[#F1F5F9] bg-white rounded-b-[24px] shrink-0">
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
