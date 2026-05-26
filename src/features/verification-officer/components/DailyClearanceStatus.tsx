import React from 'react';
import { dashboardMockData } from '../Data/dashboardMockData';
import { MonitorPlay, CheckSquare, Calendar } from 'lucide-react'; // Fallback icons if custom ones are missing

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
    <div className="bg-white rounded-[30px] p-8 w-full max-w-[423px] h-[417px] flex flex-col shadow-sm">
      <h2 className="text-[#202020] text-2xl font-medium font-plus-jakarta mb-6">
        Daily Clearance Status
      </h2>

      <div className="flex items-end gap-2 mb-8">
        <span className="text-[#202020] text-[40px] font-medium leading-[50px]">
          {percentage}%
        </span>
        <span className="text-[#202020] text-base leading-tight pb-2">
          Total<br />Activity
        </span>
      </div>

      {/* Progress Bars */}
      <div className="flex w-full gap-4 mb-2">
        {phases.map((phase) => (
          <div key={phase.id} className="flex flex-col gap-1 flex-1">
            <div className={`h-1.5 rounded-full ${phase.color}`} style={{ width: '100%' }}></div>
            <span className="text-[#6F6F6F] text-xs font-light font-inter">
              {phase.label}
            </span>
          </div>
        ))}
      </div>

      {/* Stats Area */}
      <div className="bg-[#F1F1F1] rounded-[30px] mt-auto p-6 flex justify-between items-center relative">
        {/* Divider Lines */}
        <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-px h-16 bg-[#6F6F6F]/20"></div>
        <div className="absolute left-2/3 top-1/2 -translate-y-1/2 w-px h-16 bg-[#6F6F6F]/20"></div>

        {stats.map((stat) => (
          <div key={stat.id} className="flex flex-col items-center justify-center w-1/3 gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${stat.color}`}>
              {renderIcon(stat.id)}
            </div>
            <div className="text-center">
              <div className="text-[#202020] text-2xl font-normal leading-[30px] font-plus-jakarta">
                {stat.count}
              </div>
              <div className="text-[#202020] text-sm font-normal capitalize">
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
