import { dashboardMockData } from '../data/dashboardMockData';
import { Calendar } from 'lucide-react';

export const WeeklyAssetCertification = () => {
  const { totalCleared, period, selectedDayData, chartData } = dashboardMockData.weeklyAssetCertification;

  return (
    <div className="flex flex-col w-full h-auto min-h-[417px] relative">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-[#202020] text-2xl font-bold font-plus-jakarta capitalize max-w-[200px]">
          Weekly Asset Certification
        </h2>
        
        {/* Date Filter Pill */}
        <div className="border border-[#6F6F6F]/40 rounded-full px-4 py-1.5 flex items-center gap-2">
          <Calendar size={16} className="text-[#202020]" />
          <span className="text-[#202020] text-sm font-semibold font-plus-jakarta">
            {period}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-[#202020] text-[40px] font-extrabold leading-[50px] font-plus-jakarta">
          {totalCleared}
        </span>
        <span className="text-[#202020] text-xs font-semibold leading-tight pb-2 font-plus-jakarta max-w-[60px] uppercase tracking-wider">
          Acres Cleared
        </span>
      </div>

      {/* Bar Chart Area */}
      <div className="relative w-full">
        {/* Bars container */}
        <div className="flex items-end justify-between gap-1 w-full h-[180px] px-1">
          {chartData.map((data, index) => {
            const isActive = data.day === selectedDayData.day;
            const heightPercent = parseInt(data.height);
            const heightPx = Math.round((heightPercent / 100) * 160);

            return (
              <div key={index} className="flex flex-col items-center justify-end flex-1 h-full">
                {/* Active tooltip above bar */}
                {isActive && (
                  <div className="mb-2 bg-[#202020] text-white text-[10px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-xs">
                    {selectedDayData.value}
                  </div>
                )}
                {/* Bar */}
                <div
                  className="w-full max-w-[42px] rounded-[12px] transition-all duration-500"
                  style={{
                    height: `${heightPx}px`,
                    backgroundColor: isActive ? '#C0D545' : 'rgba(198, 219, 131, 0.55)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Day labels row */}
        <div className="flex items-center justify-between gap-1 w-full px-1 mt-3">
          {chartData.map((data, index) => (
            <span
              key={index}
              className="flex-1 text-center text-[#6F6F6F] text-xs font-bold font-inter capitalize"
            >
              {data.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyAssetCertification;
