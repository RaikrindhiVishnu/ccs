import React from 'react';
import { dashboardMockData } from '../Data/dashboardMockData';

export const ActiveReviewCard = () => {
  const { title, subtitle, assignee, progress, buttonText } = dashboardMockData.activeReview;

  return (
    <div className="bg-[#F7F8FA] rounded-[30px] p-8 w-full max-w-[423px] h-[417px] flex flex-col shadow-sm relative">
      {/* Top Labels */}
      <div className="flex gap-3 mb-8">
        <div className="bg-[#E6FFEC] text-[#00801F] text-[15px] font-medium font-poppins px-4 py-2 rounded-full">
          Regional Officer Audit
        </div>
        <div className="bg-[#EF4646]/20 text-[#EF4646] text-[15px] font-normal font-poppins px-4 py-2 rounded-full">
          High Priority
        </div>
      </div>

      {/* Main Content */}
      <div className="mb-8">
        <h2 className="text-[#202020] text-2xl font-medium font-plus-jakarta capitalize mb-2">
          {title}
        </h2>
        <p className="text-[#6F6F6F] text-sm font-normal font-plus-jakarta max-w-[85%]">
          {subtitle}
        </p>
      </div>

      {/* Audit Info Cards */}
      <div className="flex gap-4 mb-auto">
        {/* Assignee Card */}
        <div className="bg-[#F1F1F1] rounded-[15px] p-4 flex-1 flex flex-col gap-2">
          <span className="text-[#6E6E6E] text-sm font-normal font-inter">
            {assignee.role}
          </span>
          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-10 rounded-full border border-white overflow-hidden bg-gray-300 shrink-0">
              {/* Fallback avatar if image fails to load */}
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-800 text-sm font-bold">
                {assignee.name.charAt(0)}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-black text-sm font-normal font-inter leading-tight">
                {assignee.name}
              </span>
              <span className="text-black text-sm font-normal font-inter leading-tight">
                ID : {assignee.id}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <div className="bg-[#F1F1F1] rounded-[15px] p-4 flex-1 flex flex-col justify-between">
          <span className="text-[#6E6E6E] text-sm font-normal font-inter">
            RO Document Audit
          </span>
          <div className="bg-[#C6DB83]/60 rounded-[10px] w-full h-8 flex relative overflow-hidden mt-2">
            <div 
              className="bg-[#C0D545] h-full absolute left-0 top-0 rounded-[10px] flex items-center px-3"
              style={{ width: `${progress}%` }}
            >
              <span className="text-[#202020] text-base font-normal font-inter relative z-10">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Button */}
      <button className="w-full h-[45px] mt-6 bg-[radial-gradient(50%_50%_at_50%_50%,#3D4A0D_0%,#2A3008_100%)] rounded-[25px] flex justify-center items-center text-white text-base font-normal font-plus-jakarta hover:opacity-90 transition-opacity">
        {buttonText}
      </button>
    </div>
  );
};

export default ActiveReviewCard;
