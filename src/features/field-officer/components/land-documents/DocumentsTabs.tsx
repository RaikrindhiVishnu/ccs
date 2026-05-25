import { documentsTabs } from "../../data/landDocumentsData";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DocumentsTabs = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="flex flex-wrap gap-3 2xl:gap-4.5 bg-white">
      {documentsTabs.map((tab) => {
        const isActive = tab === activeTab;
        
        return (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              flex items-center gap-2 rounded-full border transition-all duration-300 font-medium font-plus-jakarta cursor-pointer
              px-5 py-2.5 2xl:px-7 2xl:py-3.5
              text-[14px] 2xl:text-[18px]
              ${
                isActive
                  ? "border-[#1C5F9D] bg-[#F0F6FC] text-[#1C5F9D]"
                  : "border-[#E2E2E4] bg-white text-[#3D4949] hover:bg-gray-50"
              }
            `}
          >
            {/* Left dot if active */}
            {isActive && (
              <span className="w-2 h-2 rounded-full bg-[#1C5F9D] inline-block flex-shrink-0" />
            )}

            <span>{tab}</span>

            {/* Right checkmark if inactive (representing uploaded status) */}
            {!isActive && (
              <span className="w-4.5 h-4.5 2xl:w-6 2xl:h-6 rounded-full bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center text-[10px] 2xl:text-[13px] font-bold flex-shrink-0">
                ✓
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DocumentsTabs;
