import React from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SuperAdminHeader from "@/features/super-admin/components/SuperAdminHeader";
import SuperAdminFarmlandCard from "@/features/super-admin/components/SuperAdminFarmlandCard";
import VisitorSalesCard from "@/features/super-admin/components/VisitorSalesCard";
import FarmlandStatsCard from "@/features/super-admin/components/FarmlandStatsCard";
import { mockDashboardData } from "@/features/super-admin/data/mockDashboardData";

const SuperAdminFarmlands: React.FC = () => {
  const navigate = useNavigate();
  const data = mockDashboardData;
  
  // Ensure we have exactly 4 items for the preview grid
  const previewCards = [
    ...data.assignedFarmlands,
    { ...data.assignedFarmlands[0], id: "GLC-SOS-04", title: "GLC SOS 04" }
  ].slice(0, 4);

  return (
    <div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">
      {/* ── Header Section ── */}
      <div className="shrink-0">
        <SuperAdminHeader
          title="SUPER ADMIN"
          breadcrumb="Assigned farmlands"
        >
          {/* Visitor + Sales cards overlaid inside the header area */}
          <div className="flex items-start justify-between gap-4 mt-4 w-full h-full relative z-10">
            <div className="mt-4">
              <VisitorSalesCard
                visitors={data.visitors}
                totalSales={data.totalSales}
              />
            </div>
            <div className="mt-auto mb-6">
              <FarmlandStatsCard stats={data.farmlandStats} />
            </div>
          </div>
        </SuperAdminHeader>
      </div>

      {/* ── Assigned Farmlands Section ── */}
      <div className="mt-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="text-[1.5rem] font-bold text-[var(--text-primary)] tracking-tight">
              Assigned Farmlands
            </h2>
            <p className="text-[0.875rem] text-[var(--text-muted)] font-medium">
              Intelligence Audits Assigned to Regional Officers
            </p>
          </div>
          <Button
            onClick={() => navigate("/super-admin/assigned-farmlands")}
            className="rounded-full px-6 bg-[#2D3032] hover:bg-black text-white font-medium self-start md:self-auto flex items-center gap-2"
          >
            View all
            <ArrowUpRight size={16} />
          </Button>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 justify-between xl:items-center">
          <div className="w-full xl:w-[320px]">
            <Input
              placeholder="Search"
              icon={<Search size={18} className="text-gray-400" />}
              className="rounded-full bg-white border-gray-200"
              wrapperClassName="h-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            {["Area", "Region", "State", "Status"].map((filter) => (
              <button
                key={filter}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {filter}
                <ChevronDown size={14} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewCards.map((farmland, idx) => (
            <SuperAdminFarmlandCard
              key={farmland.id}
              data={farmland}
              imagePosition={idx % 2 === 0 ? "top" : "bottom"}
              onViewDetails={(id) => console.log("View Details:", id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminFarmlands;
