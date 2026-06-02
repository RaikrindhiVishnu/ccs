import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import SuperAdminFarmlandCard from "@/features/super-admin/components/SuperAdminFarmlandCard";
import { mockDashboardData } from "@/features/super-admin/data/mockDashboardData";

const SuperAdminAssignedFarmlandsList: React.FC = () => {
  const navigate = useNavigate();
  // Using mock data but duplicating it slightly to show a grid of many cards like image2.png
  const data = [
    ...mockDashboardData.assignedFarmlands,
    ...mockDashboardData.assignedFarmlands.map(f => ({ ...f, id: f.id + "-copy-1", title: f.title.replace("0", "04") })),
    ...mockDashboardData.assignedFarmlands.map(f => ({ ...f, id: f.id + "-copy-2", title: f.title.replace("0", "07") })),
  ];

  return (
    <div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">
      {/* ── Page Header ── */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col gap-6">
        
        {/* Go Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-[320px]">
            <Input
              placeholder="Search By Agent"
              icon={<Search size={18} className="text-gray-400" />}
              className="rounded-full bg-white border-gray-200"
              wrapperClassName="h-10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {["Value range", "location", "Date"].map((filter) => (
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

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {data.map((farmland, idx) => (
            <SuperAdminFarmlandCard
              key={farmland.id}
              data={farmland}
              imagePosition={idx % 2 === 0 ? "top" : "bottom"}
              onViewDetails={(id) => navigate(`/super-admin/assigned-farmlands/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminAssignedFarmlandsList;
