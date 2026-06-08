import React, { useState } from "react";
import { Search, ChevronDown, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SuperAdminHeader from "@/features/super-admin/components/SuperAdminHeader";
import VisitorSalesCard from "@/features/super-admin/components/VisitorSalesCard";
import FarmlandStatsCard from "@/features/super-admin/components/FarmlandStatsCard";
import SuperAdminUserListCard from "@/features/super-admin/components/SuperAdminUserListCard";

import { mockDashboardData } from "@/features/super-admin/data/mockDashboardData";

const SuperAdminUsersListFull: React.FC = () => {
  const data = mockDashboardData;
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("All");
  const [isOpen, setIsOpen] = useState(false);

  const filteredUsers = data.usersList.filter((user) => {
    if (filter === "All") return true;
    if (filter === "NRI") return user.type === "NRI";
    if (filter === "Local") return user.type === "Local";
    if (filter === "Subscribed") return user.isSubscribed;
    if (filter === "Non-Subscribed") return !user.isSubscribed;
    return true;
  });

  return (
    <div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">
      {/* ── Header Section ── */}
      <div className="shrink-0">
        <SuperAdminHeader
          title="SUPER ADMIN"
          breadcrumb="Assigned Farmlands"
        >
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

      {/* ── Users Section ── */}
      <div className="mt-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="text-[1.5rem] lg:text-[1.75rem] font-bold text-[var(--text-primary)] tracking-tight">
              Users
            </h2>
            <p className="text-[0.875rem] text-[var(--text-muted)] font-medium">
              Managed dossiers from premium agents
            </p>
          </div>
          <Button
            onClick={() => navigate("/super-admin/users-list/all")}
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
          
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {filter}
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-[1rem] shadow-lg border border-gray-100 py-2 z-50">
                {["All", "NRI", "Local", "Subscribed", "Non-Subscribed"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilter(option);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredUsers.slice(0, 4).map((user) => (
            <SuperAdminUserListCard
              key={user.id}
              data={user}
              onViewProfile={(id) => console.log("View Profile:", id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUsersListFull;
