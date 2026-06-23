import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Typography } from "@/components/ui/typography";
import RegionCreationVelocity from "@/features/role-manager/components/RegionCreationVelocity";
import RoleCreationOverviewCard from "@/features/role-manager/components/Rolecreationoverviewcard";
import DashboardGlobeMap from "@/features/role-manager/components/DashboardGlobeMap";

const RegionAndArea: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col p-[clamp(0.375rem,0.83vw,0.75rem)] pt-[clamp(0.75rem,1.5vw,1.5rem)] gap-[clamp(0.75rem,1.5vw,1.5rem)] box-border min-h-full">
      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[clamp(0.75rem,1.5vw,1.5rem)] box-border">
        {/* Left Column */}
        <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)] min-h-[clamp(21.875rem,30vw,31.25rem)]">
          <div className="bg-[var(--surface-card)] rounded-2xl shadow-sm overflow-hidden min-h-[clamp(21.875rem,30vw,31.25rem)] flex flex-col">
            <RegionCreationVelocity />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)] min-h-[clamp(21.875rem,30vw,31.25rem)]">
          <div className="bg-[var(--surface-card)] rounded-2xl shadow-sm overflow-hidden min-h-[clamp(21.875rem,30vw,31.25rem)] flex flex-col">
            <RoleCreationOverviewCard />
          </div>
        </div>
      </div>

      {/* Regions & Area Data */}
      <div className="rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Card Header */}
        <div className="flex items-center justify-between px-[clamp(0.75rem,1.5vw,1.5rem)] py-[clamp(0.625rem,1.2vw,1.125rem)] border-b border-[var(--border)] bg-white relative z-10">
          <Typography
            variant="h2"
            className="font-sans font-bold text-[clamp(24px,2.5vw,48px)] leading-[100%] tracking-[0px] text-black"
          >
            Regions &amp; Area Data
          </Typography>
          <div ref={dropdownRef} className="relative z-50">
            {/* Trigger Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-[15.5rem] h-[2.75rem] px-5 flex items-center justify-between transition-all duration-200 cursor-pointer border bg-white text-base font-medium text-[#0F172A] ${
                isDropdownOpen
                  ? "rounded-t-2xl border-[#E2E8F0] border-b-transparent shadow-[0_4px_12px_rgba(0,0,0,0.03)]"
                  : "rounded-2xl border-[#E2E8F0] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="font-[family-name:var(--font-sans)] leading-none text-[#0F172A]">
                Regions and Areas
              </span>
              {isDropdownOpen ? (
                <ChevronUp className="w-4 h-4 text-[#475569] stroke-[2.5px]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#475569] stroke-[2.5px]" />
              )}
            </button>

            {/* Dropdown Options */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-[15.5rem] bg-white border border-[#E2E8F0] border-t-0 rounded-b-2xl shadow-[0_12px_24px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col z-50">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/role-manager/create-regions-and-areas?mode=create");
                  }}
                  className="w-full text-left px-5 py-3.5 text-sm font-normal text-[#334155] hover:bg-[#F8FAFC] transition-colors border-b border-[#F1F5F9] cursor-pointer bg-transparent border-0 font-[family-name:var(--font-sans)]"
                >
                  Create Regions and Areas
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/role-manager/create-regions-and-areas?mode=view");
                  }}
                  className="w-full text-left px-5 py-3.5 text-sm font-normal text-[#334155] hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-transparent border-none font-[family-name:var(--font-sans)]"
                >
                  Edit Regions and Areas
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Globe Map Body (Replaces Cards) */}
        <div className="relative w-full h-[600px] overflow-hidden bg-[#D6E6FF] rounded-b-2xl dashboard-map-container z-0">
          <style>{`
            .dashboard-map-container > div {
              height: 100% !important;
              min-height: 100% !important;
              border-radius: 0 0 1rem 1rem;
            }
          `}</style>
          <DashboardGlobeMap />
        </div>
      </div>
    </div>
  );
};

export default RegionAndArea;
