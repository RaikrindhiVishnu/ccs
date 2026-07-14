import { useNavigate } from 'react-router-dom';
import { dashboardMockData } from '../data/dashboardMockData';

export const ImmediateActionQueue = () => {
  const navigate = useNavigate();
  const queue = dashboardMockData.immediateActionQueue;

  return (
    <div className="bg-white rounded-[30px] p-6 md:p-8 w-full h-auto min-h-[384px] xl:max-w-[876px] shadow-xs flex flex-col border border-[#EBEBEB]">
      <h2 className="text-[#202020] text-2xl font-bold font-plus-jakarta text-left mb-8">
        Immediate Action Queue
      </h2>

      <div className="flex flex-col md:flex-row gap-[18px] w-full flex-1">
        {queue.map((task) => (
          <div 
            key={task.id} 
            onClick={() => navigate(`/verification-officer-1/assigned-farmlands-owner-details/${encodeURIComponent(task.id)}`)}
            className={`flex-1 rounded-[30px] p-6 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all border border-[#ECECEC] ${task.bgColor}`}
          >
            {/* Top Area */}
            <div className="flex flex-col gap-10">
              <span className="text-[#6F6F6F] text-sm font-semibold font-plus-jakarta">
                {task.assetId}
              </span>
              
              <h3 className="text-[#202020] text-base font-bold leading-[22px] font-plus-jakarta pr-4">
                {task.taskDescription}
              </h3>
            </div>

            {/* Bottom Area - Assignee */}
            <div className="flex items-center gap-3 mt-8">
              <div className="w-11 h-11 rounded-full border border-white overflow-hidden bg-gray-300 shrink-0">
                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  {task.assignee.name.charAt(0)}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[#202020] text-sm font-bold font-plus-jakarta capitalize leading-tight">
                  {task.assignee.name}
                </span>
                <span className="text-[#5D6B6B] text-xs font-semibold font-plus-jakarta capitalize mt-0.5">
                  {task.assignee.role}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImmediateActionQueue;
