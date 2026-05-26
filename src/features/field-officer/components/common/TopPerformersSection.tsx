import PerformerCard from "../cards/PerformerCard";
import { TOP_PERFORMERS } from "../../data/performersData";

export default function TopPerformersSection() {
  return (
    <div className="w-full h-full bg-white rounded-[24px] 2xl:rounded-[32px] shadow-sm flex flex-col overflow-hidden min-h-[341px] 2xl:min-h-[454px]">
      <div className="flex justify-between items-end px-[clamp(1rem,3vw,2.5rem)] 2xl:px-[53px] pt-[clamp(1.5rem,4vh,2.5rem)] 2xl:pt-[53px] pb-[clamp(1rem,3vh,2rem)] 2xl:pb-[42px]">
        <div className="flex flex-col">
          <p className="text-[#00696B] font-semibold text-[0.75rem] 2xl:text-[1rem] uppercase tracking-wider">
            Performance report
          </p>

          <h2 className="text-[#1A1C1D] font-semibold text-[1.5rem] 2xl:text-[2rem]">
            Top Performers
          </h2>
        </div>

        <div className="relative">
          <select className="appearance-none bg-white border border-black/10 rounded-full h-[38px] 2xl:h-[50px] px-4 2xl:px-6 pr-8 2xl:pr-10 text-[#3D4949] text-sm 2xl:text-[1.125rem] focus:outline-none hover:bg-gray-50 cursor-pointer">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <svg 
            className="w-4 h-4 opacity-60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#3D4949]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-[clamp(1rem,3vw,2.5rem)] pb-[clamp(1.5rem,4vh,2.5rem)]">
        {TOP_PERFORMERS.map((person, idx) => (
          <PerformerCard key={idx} {...person} />
        ))}
      </div>
    </div>
  );
}
