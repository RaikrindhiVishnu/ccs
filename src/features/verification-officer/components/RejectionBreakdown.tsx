import React from 'react';
import { dashboardMockData } from '../Data/dashboardMockData';
import { Check, CheckCheck } from 'lucide-react';

export const RejectionBreakdown = () => {
  const { items } = dashboardMockData.rejectionBreakdown;

  return (
    <div className="bg-[#F1F1F1] rounded-[20px] p-6 w-full max-w-[370px] flex flex-col shadow-sm">
      <h3 className="text-[#202020] text-xl font-medium font-plus-jakarta capitalize mb-4">
        Rejection Breakdown
      </h3>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          // The first item uses a blue checkmark based on design
          const isFirst = index === 0;
          return (
            <div key={item.id} className="flex items-start gap-4">
              {/* Checkmark Icon */}
              <div className="pt-1">
                {isFirst ? (
                  <CheckCheck size={20} className="text-[#2780C4]" strokeWidth={2.5} />
                ) : (
                  <Check size={18} className="text-[#C4C4C4]" strokeWidth={3} />
                )}
              </div>
              
              {/* Text Content */}
              <div className="flex flex-col gap-1">
                <span className="text-[#6F6F6F] text-base font-normal font-plus-jakarta capitalize">
                  {item.reason}
                </span>
                <span className="text-[#202020] text-base font-medium font-plus-jakarta capitalize">
                  {item.countText}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RejectionBreakdown;
