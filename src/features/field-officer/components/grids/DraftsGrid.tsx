import DraftCard from "../cards/DraftCard";
import { DRAFTS_DATA } from "../../data/draftsData";
type Props = {
  isExpanded?: boolean;
  onViewMore?: () => void;
};

export default function DraftsGrid({ isExpanded = false, onViewMore }: Props) {
  // If expanded, duplicate data to show more items as seen in Figma screenshot
  const displayData = isExpanded ? [...DRAFTS_DATA, ...DRAFTS_DATA] : DRAFTS_DATA;

  return (
    <div className="w-full flex flex-col bg-[#F4F6F8] rounded-[32px] overflow-hidden">
      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[40px] 2xl:gap-[53px] p-[24px] xl:p-[32px] 2xl:p-[42px]">
        {displayData.map((draft, index) => (
          <DraftCard key={index} {...draft} isExpanded={isExpanded} />
        ))}
      </div>

      {!isExpanded ? (
        <div className="w-full bg-white flex items-center justify-center py-[20px] 2xl:py-[26px]">
          <button onClick={onViewMore} className="text-[16px] 2xl:text-[21px] font-bold text-[#1A1C1D] hover:opacity-60 transition-opacity">
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