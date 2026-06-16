import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Landmark, CircleDollarSign, Target, DollarSign, Users } from "lucide-react";
import { mockDashboardData } from "@/features/super-admin/data/mockDashboardData";

const SuperAdminPoolDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Use first pool details as default for any id
  const poolDetail = mockDashboardData.poolDetails["POOL-001"];
  const investors = poolDetail?.investors || [];

  return (
    <div className="box-border flex min-h-full flex-col gap-[clamp(12px,0.5vw,16px)] p-[clamp(6px,0.83vw,12px)] py-[clamp(16px,1.5vw,32px)]">
      <div className="bg-[#F6F7F6] rounded-[24px] p-6 lg:p-8 flex flex-col gap-6 min-h-screen">

        {/* Go Back */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-[var(--text-primary)] hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} />
            Go back
          </button>
        </div>

        {/* Title */}
        <h1 className="text-[1.75rem] font-bold text-[var(--text-primary)] tracking-tight">
          Pool Buying – {poolDetail?.farmlandId || id}
        </h1>

        {/* Map + Pool Summary Row */}
<div className="flex flex-col xl:flex-row gap-6 items-stretch">
            {/* Aerial Map */}
<div className="flex-1 bg-white rounded-[20px] border border-gray-200 overflow-hidden relative h-[550px]">            {/* Legend */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 flex flex-col gap-1.5 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="font-inter text-[0.6875rem] text-[var(--text-primary)] font-medium">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#86EFAC]" />
                <span className="font-inter text-[0.6875rem] text-[var(--text-primary)] font-medium">Available</span>
              </div>
            </div>

            {/* Map Image with grid overlay */}
            <div className="relative w-full h-full ">
              <img
                src={poolDetail?.mapImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80"}
                alt="Aerial View"
                className="w-full h-full object-cover"
              />

              {/* Grid overlay with plot labels */}
              <div className="absolute inset-0">
                {/* Grid lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
                  {/* Vertical lines */}
                  {[16.6, 33.3, 50, 66.6, 83.3].map((pct, i) => (
                    <line key={`v-${i}`} x1={`${pct}%`} y1="0" x2={`${pct}%`} y2="100%" stroke="white" strokeWidth="1.5" />
                  ))}
                  {/* Horizontal lines */}
                  {[20, 40, 60, 80].map((pct, i) => (
                    <line key={`h-${i}`} x1="0" y1={`${pct}%`} x2="100%" y2={`${pct}%`} stroke="white" strokeWidth="1.5" />
                  ))}
                </svg>

                {/* Plot markers with + icons */}
                {[
                  { top: "10%", left: "25%", show: false },
                  { top: "10%", left: "50%", show: false },
                  { top: "30%", left: "16%", show: false },
                  { top: "30%", left: "42%", show: false },
                  { top: "30%", left: "75%", show: false },
                  { top: "50%", left: "25%", show: false },
                  { top: "50%", left: "58%", show: false },
                  { top: "70%", left: "16%", show: false },
                  { top: "70%", left: "42%", show: false },
                  { top: "70%", left: "75%", show: false },
                  { top: "90%", left: "25%", show: false },
                  { top: "90%", left: "58%", show: false },
                ].map((marker, i) => (
                  <div
                    key={i}
                    className="absolute w-5 h-5 flex items-center justify-center"
                    style={{ top: marker.top, left: marker.left, transform: "translate(-50%, -50%)" }}
                  >
                    <span className="text-white text-lg font-light">+</span>
                  </div>
                ))}

                {/* Investor labels on the map */}
                {investors.slice(0, 7).map((inv, i) => {
                  const positions = [
                    { top: "22%", left: "35%" },
                    { top: "18%", left: "55%" },
                    { top: "18%", left: "72%" },
                    { top: "28%", left: "20%" },
                    { top: "45%", left: "45%" },
                    { top: "55%", left: "30%" },
                    { top: "75%", left: "70%" },
                  ];
                  const pos = positions[i];
                  return (
                    <div
                      key={inv.id}
                      className="absolute bg-white/95 rounded-lg px-2 py-1 shadow-sm flex items-center gap-1.5 cursor-pointer hover:bg-white transition-colors"
                      style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)" }}
                      onClick={() => navigate(`/super-admin/pool-buying/${id || "POOL-001"}/investor/${inv.id}`)}
                    >
                      <img src={inv.avatar} alt={inv.name} className="w-4 h-4 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="font-inter text-[0.5rem] font-semibold text-[var(--text-primary)] leading-tight whitespace-nowrap">{inv.name}</span>
                        <span className="font-inter text-[0.45rem] text-[var(--text-muted)] leading-tight">{inv.landAllocated}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pool Summary Card */}
           <div className="w-full xl:w-[300px] shrink-0 bg-white rounded-[20px] border border-gray-200 p-6 flex flex-col gap-5 h-[550px]">            
            <h3 className="font-inter font-bold text-[1.125rem] text-[var(--text-primary)] mb-4">
              Pool Summary
            </h3>

            {/* Summary Items */}
            {[
              { icon: <Landmark size={18} className="text-[#1B3A2D]" />, label: "Total Land Area", value: poolDetail?.totalLandArea, bg: "bg-[#F0F7E4]" },
              { icon: <CircleDollarSign size={18} className="text-[#1B3A2D]" />, label: "Raised Amount", value: poolDetail?.raisedAmount, bg: "bg-[#F0F7E4]" },
              { icon: <Target size={18} className="text-[#1B3A2D]" />, label: "Target Amount", value: poolDetail?.targetAmount, bg: "bg-[#F0F7E4]" },
              { icon: <DollarSign size={18} className="text-[#1B3A2D]" />, label: "Total Investment", value: poolDetail?.totalInvestment, bg: "bg-[#F0F7E4]" },
              { icon: <Users size={18} className="text-[#1B3A2D]" />, label: "Total Investors", value: String(poolDetail?.totalInvestors), bg: "bg-[#F0F7E4]" },
             ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3   ">
                <div className={`w-9 h-9 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-inter text-[0.6875rem] text-[var(--text-muted)]">
                    {item.label}
                  </span>
                  <span className="font-inter font-bold text-[1rem] text-[var(--text-primary)]">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Table */}
        <div className="bg-white rounded-[20px] border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 font-inter font-semibold text-[0.625rem] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  Investor Name
                </th>
                <th className="text-left px-6 py-4 font-inter font-semibold text-[0.625rem] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  Invested Amount
                </th>
                <th className="text-left px-6 py-4 font-inter font-semibold text-[0.625rem] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  Land Allocated
                </th>
                <th className="text-left px-6 py-4 font-inter font-semibold text-[0.625rem] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  Ownership%
                </th>
                <th className="text-left px-6 py-4 font-inter font-semibold text-[0.625rem] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  Location
                </th>
                <th className="text-left px-6 py-4 font-inter font-semibold text-[0.625rem] text-[var(--text-muted)] uppercase tracking-[0.1em]">
                  Invested On
                </th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor) => (
                <tr
                  key={investor.id}
                  className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/super-admin/pool-buying/${id || "POOL-001"}/investor/${investor.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={investor.avatar}
                        alt={investor.name}
                        className="w-9 h-9 rounded-full object-cover border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(investor.name)}&background=random`;
                        }}
                      />
                      <span className="font-inter font-medium text-[0.875rem] text-[var(--text-primary)]">
                        {investor.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-inter font-medium text-[0.875rem] text-[var(--text-primary)]">
                    {investor.investedAmount}
                  </td>
                  <td className="px-6 py-4 font-inter font-medium text-[0.875rem] text-[var(--text-primary)]">
                    {investor.landAllocated}
                  </td>
                  <td className="px-6 py-4 font-inter font-medium text-[0.875rem] text-[var(--text-primary)]">
                    {investor.ownershipPercent}
                  </td>
                  <td className="px-6 py-4 font-inter font-medium text-[0.875rem] text-[var(--text-primary)]">
                    {investor.location}
                  </td>
                  <td className="px-6 py-4 font-inter font-medium text-[0.875rem] text-[var(--text-muted)]">
                    {investor.investedOn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminPoolDetails;
