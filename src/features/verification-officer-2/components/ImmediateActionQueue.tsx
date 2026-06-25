import { dashboardMockData } from '../Data/dashboardMockData';

export const ImmediateActionQueue = () => {
  const queue = dashboardMockData.immediateActionQueue;

  return (
    <div className="bg-white rounded-[30px] p-6 md:p-8 w-full h-auto min-h-[384px] shadow-sm flex flex-col">
      <h2 className="text-[#202020] text-2xl font-medium font-plus-jakarta text-left mb-8">
        Immediate Action Queue
      </h2>

      <div className="flex flex-col md:flex-row gap-[18px] w-full flex-1">
        {queue.map((task) => (
          <div 
            key={task.id} 
            className={`flex-1 rounded-[30px] p-6 flex flex-col justify-between ${task.bgColor}`}
          >
            {/* Top Area */}
            <div className="flex flex-col gap-10">
              <span className="text-[#6F6F6F] text-base font-normal font-plus-jakarta">
                {task.assetId}
              </span>
              
              <h3 className="text-[#202020] text-xl font-medium leading-[25px] font-plus-jakarta pr-4">
                {task.taskDescription}
              </h3>
            </div>

            {/* Bottom Area - Assignee */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-white overflow-hidden bg-gray-300 shrink-0">
                {/* Fallback avatar */}
                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
                  {task.assignee.name.charAt(0)}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[#202020] text-base font-medium font-plus-jakarta capitalize">
                  {task.assignee.name}
                </span>
                <span className="text-[#202020] text-base font-normal font-plus-jakarta capitalize">
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
