import React from "react";
import { 
  FileText, 
  AlertTriangle, 
  Hourglass, 
  ShieldCheck 
} from "lucide-react";
import { MOCK_DASHBOARD_STATS } from "../data/dashboardMockData";

export const DashboardStatsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      
      {/* Card 1: Returned to RO */}
      <div className="bg-[#FAFDF2] border border-[#EAF0D2] rounded-[24px] p-6 flex flex-col justify-between h-[145px] shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <span className="font-plus-jakarta font-extrabold text-[32px] text-[#1E1E1E] leading-none">
              {MOCK_DASHBOARD_STATS.returnedToRO} Farmland
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#F4F9DE] flex items-center justify-center text-[#9CB624] group-hover:scale-110 transition-transform shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </div>
        <span className="font-plus-jakarta font-semibold text-sm text-[#6C7A7A]">
          Returned to RO
        </span>
      </div>

      {/* Card 2: Escalated to IO */}
      <div className="bg-[#FFF5F5] border border-[#FFE3E3] rounded-[24px] p-6 flex flex-col justify-between h-[145px] shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <span className="font-plus-jakarta font-extrabold text-[32px] text-[#1E1E1E] leading-none">
              {MOCK_DASHBOARD_STATS.escalatedToIO} Farmland
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#FFEAEB] flex items-center justify-center text-[#E53E3E] group-hover:scale-110 transition-transform shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
        <span className="font-plus-jakarta font-semibold text-sm text-[#6C7A7A]">
          Escalated to IO
        </span>
      </div>

      {/* Card 3: Waiting on Field Team */}
      <div className="bg-[#F8F9FA] border border-[#ECECEC] rounded-[24px] p-6 flex flex-col justify-between h-[145px] shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <span className="font-plus-jakarta font-extrabold text-[32px] text-[#1E1E1E] leading-none">
              {MOCK_DASHBOARD_STATS.waitingOnFieldTeam} Farmland
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#EFEFEF] flex items-center justify-center text-[#737373] group-hover:scale-110 transition-transform shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
        </div>
        <span className="font-plus-jakarta font-semibold text-sm text-[#6C7A7A]">
          Waiting on Field Team
        </span>
      </div>

      {/* Card 4: Ready to Certify */}
      <div className="bg-[#F2FAFF] border border-[#E3F2FD] rounded-[24px] p-6 flex flex-col justify-between h-[145px] shadow-xs relative overflow-hidden group hover:shadow-md transition-all">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-0.5">
            <span className="font-plus-jakarta font-extrabold text-[32px] text-[#1E1E1E] leading-none">
              {MOCK_DASHBOARD_STATS.readyToCertify} Farmland
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#E3F5FF] flex items-center justify-center text-[#3182CE] group-hover:scale-110 transition-transform shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <span className="font-plus-jakarta font-semibold text-sm text-[#6C7A7A]">
          Ready to Certify
        </span>
      </div>

    </div>
  );
};

export default DashboardStatsRow;
