import { VO3_FARMLANDS } from '../data/farmlandsMockData';
import { VerificationOfficer3Card } from '../components/VerificationOfficer3Card';
import { useNavigate } from 'react-router-dom';

export const VerificationOfficer3Dashboard = () => {
  const navigate = useNavigate();
  
  // Stats
  const total = VO3_FARMLANDS.length;
  const assigned = VO3_FARMLANDS.filter(f => f.status === 'Assigned').length;
  const inProgress = VO3_FARMLANDS.filter(f => f.status === 'In-Progress').length;
  const completed = VO3_FARMLANDS.filter(f => f.status === 'Completed').length;

  // High priority cases
  const highPriorityCases = VO3_FARMLANDS.filter(f => f.priority === 'HIGH' && f.status !== 'Completed');

  return (
    <div className="w-full flex flex-col gap-8 pb-12 animate-fadeIn">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col gap-2 mt-4">
        <h1 className="font-plus-jakarta font-extrabold text-[28px] md:text-[34px] tracking-tight text-[#191B1C]">
          VERIFICATION OFFICER 3 WORKSPACE
        </h1>
        <p className="font-plus-jakarta font-medium text-sm md:text-base text-[#626C70]">
          Review and audit regional agricultural estates, manage verification progress and finalize land boundaries.
        </p>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat 1 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[rgba(225,226,237,0.5)] flex flex-col justify-between h-[140px] transition-all hover:-translate-y-1 hover:shadow-md">
          <span className="text-[#626C70] font-medium text-[14px] uppercase tracking-wider">Total Farmlands</span>
          <div className="flex justify-between items-baseline mt-4">
            <span className="text-[36px] font-bold text-[#191B1C]">{total}</span>
            <span className="text-[12px] bg-[#EAF3FA] text-[#2780C4] px-3 py-1 rounded-full font-semibold">Active Cycle</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[rgba(225,226,237,0.5)] flex flex-col justify-between h-[140px] transition-all hover:-translate-y-1 hover:shadow-md">
          <span className="text-[#626C70] font-medium text-[14px] uppercase tracking-wider">Assigned Cases</span>
          <div className="flex justify-between items-baseline mt-4">
            <span className="text-[36px] font-bold text-[#191B1C]">{assigned}</span>
            <button 
              onClick={() => navigate('/verification-officer-3/assigned-farmlands')}
              className="text-[12px] text-[#2780C4] hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              View List
            </button>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[rgba(225,226,237,0.5)] flex flex-col justify-between h-[140px] transition-all hover:-translate-y-1 hover:shadow-md">
          <span className="text-[#626C70] font-medium text-[14px] uppercase tracking-wider">In-Progress audits</span>
          <div className="flex justify-between items-baseline mt-4">
            <span className="text-[36px] font-bold text-[#191B1C]">{inProgress}</span>
            <button 
              onClick={() => navigate('/verification-officer-3/in-progress-farmlands')}
              className="text-[12px] text-[#2780C4] hover:underline font-semibold bg-transparent border-none cursor-pointer"
            >
              Resume
            </button>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[rgba(225,226,237,0.5)] flex flex-col justify-between h-[140px] transition-all hover:-translate-y-1 hover:shadow-md">
          <span className="text-[#626C70] font-medium text-[14px] uppercase tracking-wider">Completed</span>
          <div className="flex justify-between items-baseline mt-4">
            <span className="text-[36px] font-bold text-[#16A34A]">{completed}</span>
            <span className="text-[12px] bg-[#EAFBEF] text-[#16A34A] px-3 py-1 rounded-full font-semibold">100% Verified</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Action Queue */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-plus-jakarta font-bold text-[22px] text-[#191B1C]">
            Priority Action Queue
          </h2>
          <span className="text-[#EF4646] font-semibold text-sm bg-red-50 px-3 py-1 rounded-full animate-pulse">
            Attention Needed
          </span>
        </div>

        {/* Queue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highPriorityCases.length > 0 ? (
            highPriorityCases.map((farmland) => (
              <VerificationOfficer3Card key={farmland.id} farmland={farmland} />
            ))
          ) : (
            <div className="col-span-full bg-white border border-[rgba(225,226,237,0.5)] rounded-[24px] p-12 text-center text-[#626C70] font-medium shadow-sm">
              All high priority audits are current. No immediate actions required.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationOfficer3Dashboard;
