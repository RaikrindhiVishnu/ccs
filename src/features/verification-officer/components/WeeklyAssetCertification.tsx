import React from 'react';
import { dashboardMockData } from '../Data/dashboardMockData';
import { Calendar } from 'lucide-react';

export const WeeklyAssetCertification = () => {
  const { totalCleared, period, selectedDayData, chartData } = dashboardMockData.weeklyAssetCertification;

  return (
    <div className="flex flex-col w-full h-[417px] relative">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-[#202020] text-2xl font-medium font-plus-jakarta capitalize max-w-[200px]">
          Weekly Asset Certification
        </h2>
        
        {/* Date Filter Pill */}
        <div className="border border-[#6F6F6F] rounded-full px-4 py-1.5 flex items-center gap-2">
          <Calendar size={16} className="text-[#202020]" />
          <span className="text-[#202020] text-base font-normal font-plus-jakarta">
            {period}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-[#202020] text-[40px] font-medium leading-[50px] font-plus-jakarta">
          {totalCleared}
        </span>
        <span className="text-[#202020] text-base font-normal leading-[17px] pb-2 font-plus-jakarta max-w-[60px]">
          Acres Cleared
        </span>
      </div>

      {/* Bar Chart Area */}
      <div className="flex-1 flex items-end justify-between px-2 relative mb-2">
        
        {/* Tooltip for the selected day */}
        <div 
          className="absolute bg-[#202020] text-white text-xs font-inter py-1 px-3 rounded-lg flex items-center justify-center pointer-events-none"
          style={{ top: '10px', left: '15px' }} // Positioned over the active bar based on mock visual
        >
          {selectedDayData.value}
        </div>

        {chartData.map((data, index) => {
          const isActive = data.day === selectedDayData.day;
          
          return (
            <div key={index} className="h-full flex flex-col items-center justify-end gap-3">
              {/* Bar */}
              <div 
                className={`w-[45px] rounded-[15px] transition-all duration-300 ${isActive ? 'bg-[#C0D545]' : ''}`}
                style={{ 
                  height: data.height,
                  backgroundColor: isActive ? undefined : 'rgba(198, 219, 131, 0.6)'
                }}
              ></div>
              {/* Day Label */}
              <span className="text-[#6F6F6F] text-base font-normal font-inter capitalize">
                {data.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyAssetCertification;
