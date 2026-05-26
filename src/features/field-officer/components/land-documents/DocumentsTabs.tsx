import { Check } from "lucide-react";
import { documentTabs } from "../../data/landDocumentsData";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DocumentsTabs = ({
  activeTab,
  setActiveTab,
}: Props) => {
  return (
    <div
      className="
        flex
        flex-wrap
        content-start
        gap-[14px]
      "
    >
      {documentTabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`
              h-[40px]
              px-[18px]
              whitespace-nowrap
              rounded-full
              border
              flex
              items-center
              gap-[8px]
              transition-all
              cursor-pointer
              ${
                isActive
                  ? `
                    border-[#2E8FFF]
                    text-[#2E8FFF]
                    bg-white
                  `
                  : `
                    border-[#D8E4B2]
                    text-[#6B6B6B]
                    bg-white
                  `
              }
            `}
          >
            {/* Active Dot */}
            {isActive && (
              <div
                className="
                  w-[10px]
                  h-[10px]
                  rounded-full
                  bg-[#2E8FFF]
                "
              />
            )}

            {/* Tab Name */}
            <span
              className="
                text-[14px]
                font-medium
                whitespace-nowrap
                font-plus-jakarta
              "
            >
              {tab.name}
            </span>

            {/* Verified Tick */}
            {tab.verified && (
              <div
                className="
                  w-[14px]
                  h-[14px]
                  rounded-full
                  bg-[#2E8FFF]
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <Check
                  size={10}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DocumentsTabs;
