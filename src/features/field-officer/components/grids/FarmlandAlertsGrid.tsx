import AlertCard from "../cards/AlertCard";
import { ALERTS_DATA } from "../../data/alertsData";

type Props = {
  isExpanded?: boolean;
  onViewMore?: () => void;
};

export default function FarmlandAlertsGrid({ isExpanded = false, onViewMore }: Props) {
  // If expanded, duplicate data to show more items as seen in Figma screenshot
  const displayData = isExpanded ? [...ALERTS_DATA, ...ALERTS_DATA] : ALERTS_DATA;

  return (
    <div className="bg-[#F4F6F8] rounded-[32px] w-full mt-2 relative overflow-hidden flex flex-col">
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 2xl:gap-10 p-6 2xl:p-10 ${!isExpanded ? 'mb-[65px] 2xl:mb-[86px]' : ''}`}>
        {displayData.map((alert, idx) => (
          <AlertCard key={idx} {...alert} />
        ))}
      </div>
      
      {!isExpanded ? (
        <div className="absolute bottom-0 left-0 right-0 h-[65px] 2xl:h-[86px] flex items-center justify-center border-t border-gray-100 bg-white" style={{ background: '#ffffff', backgroundColor: '#ffffff' }}>
          <button onClick={onViewMore} className="text-[18px] 2xl:text-[24px] font-bold text-black hover:opacity-70 transition-opacity">
            View More
          </button>
        </div>
      ) : (
        <div className="w-full bg-white flex items-center justify-between px-8 py-[20px] 2xl:py-[26px]">
          <div className="text-[#3D4949] text-sm">
            Showing <span className="font-bold text-black">1 - 7</span> of <span className="font-bold text-black">1,284</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <button className="flex items-center gap-1 text-[#3D4949] hover:text-black">
              <span className="mb-[2px]">&lt;</span> Previous
            </button>
            <div className="flex items-center gap-1 mx-2">
              <button className="w-8 h-8 rounded-full bg-[#1C5F9D] text-white font-bold flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center">2</button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center">3</button>
              <span className="text-[#3D4949] px-1">...</span>
              <button className="w-10 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center">1284</button>
            </div>
            <button className="flex items-center gap-1 text-[#3D4949] hover:text-black">
              Next <span className="mb-[2px]">&gt;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
