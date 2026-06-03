import { dashboardMockData } from '../data/dashboardMockData';
import { Check, CheckCheck } from 'lucide-react';

export const RejectionBreakdown = () => {
  const { items } = dashboardMockData.rejectionBreakdown;

  return (
    <div className="bg-[#F8F9FA] border border-[#EBEBEB] rounded-[20px] p-6 w-full xl:max-w-[370px] flex flex-col shadow-xs">
      <h3 className="text-[#202020] text-xl font-bold font-plus-jakarta capitalize mb-4">
        Rejection Breakdown
      </h3>

      <div className="flex flex-col gap-4">
        {items.map((item, index) => {
          const isFirst = index === 0;
          return (
            <div key={item.id} className="flex items-start gap-4">
              <div className="pt-1">
                {isFirst ? (
                  <CheckCheck size={20} className="text-[#2780C4]" strokeWidth={2.5} />
                ) : (
                  <Check size={18} className="text-[#C4C4C4]" strokeWidth={3} />
                )}
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[#5D6B6B] text-sm font-semibold font-plus-jakarta capitalize">
                  {item.reason}
                </span>
                <span className="text-[#202020] text-sm font-bold font-plus-jakarta capitalize">
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
