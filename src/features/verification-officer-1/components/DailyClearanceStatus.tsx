import { dashboardMockData } from '../data/dashboardMockData';
import { MonitorPlay, CheckSquare, Calendar } from 'lucide-react';

export const DailyClearanceStatus = () => {
  const { percentage, phases, stats } = dashboardMockData.dailyClearanceStatus;

  const renderIcon = (id: string) => {
    switch (id) {
      case 'active': return <MonitorPlay size={20} className="text-white" />;
      case 'cleared': return <CheckSquare size={20} className="text-white" />;
      case 'pending': return <Calendar size={20} className="text-white" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-[30px] p-6 md:p-8 w-full md:max-w-[423px] h-auto min-h-[417px] flex flex-col shadow-xs border border-[#EBEBEB]">
      <h2 className="text-[#202020] text-2xl font-bold font-plus-jakarta mb-6">
        Daily Clearance Status
      </h2>

      <div className="flex items-end gap-2 mb-8">
        <span className="text-[#202020] text-[40px] font-extrabold leading-[50px]">
          {percentage}%
        </span>
        <span className="text-[#202020] text-xs font-semibold leading-tight pb-2 uppercase tracking-wider">
          Total<br />Activity
        </span>
      </div>

      {/* Progress Bars */}
      <div className="flex w-full gap-4 mb-2">
        {phases.map((phase) => (
          <div key={phase.id} className="flex flex-col gap-1 flex-1">
            <div className={`h-1.5 rounded-full ${phase.color}`} style={{ width: '100%' }}></div>
            <span className="text-[#6F6F6F] text-xs font-bold font-inter">
              {phase.label}
            </span>
          </div>
        ))}
      </div>

      {/* Stats Area */}
      <div className="bg-[#F8F9FA] rounded-[30px] mt-auto p-4 md:p-6 flex justify-between items-center relative divide-x divide-gray-200 border border-gray-100">
        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center justify-center w-1/3 gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${stat.color} shadow-xs`}>
              {renderIcon(stat.id)}
            </div>
            <div className="text-center">
              <div className="text-[#202020] text-xl font-extrabold leading-tight font-plus-jakarta">
                {stat.count}
              </div>
              <div className="text-[#5D6B6B] text-[11px] font-bold uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyClearanceStatus;
