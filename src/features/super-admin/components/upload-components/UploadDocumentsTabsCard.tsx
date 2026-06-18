import React from "react";

interface TabItem {
  id: string;
  label: string;
}

interface UploadDocumentsTabsCardProps {
  tabs: TabItem[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
  isTabComplete: (tabId: string) => boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const UploadDocumentsTabsCard: React.FC<UploadDocumentsTabsCardProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  isTabComplete,
  className = "",
  style,
}) => {
  return (
    <div
      className={`bg-white rounded-[clamp(1rem,_1.67vw,_2rem)] shadow-[0px_20px_40px_rgba(0,_49,_50,_0.06)] flex flex-col justify-start w-full select-none shrink-0 h-[clamp(20rem,_30.76vw,_35rem)] pt-[clamp(1.2rem,_2vw,_3rem)] pb-[clamp(1.2rem,_2vw,_3rem)] pl-[clamp(1rem,_1.6vw,_2.5rem)] pr-[clamp(1rem,_1.6vw,_2.5rem)] box-border ${className}`}
      style={style}
    >
      {/* ── Auto Layout Grid container (Frame 2147240708) ── */}
      <div className="flex flex-wrap items-start justify-start w-full content-start gap-[clamp(0.8rem,_1.875vw,_2.5rem)]">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isUploaded = isTabComplete(tab.id);

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabSelect(tab.id)}
              className={`flex flex-row items-center cursor-pointer transition-all duration-200 shrink-0 select-none box-border h-[clamp(2rem,_2.86vw,_3.5rem)] pt-[clamp(0.4rem,_0.8vw,_1rem)] pb-[clamp(0.4rem,_0.8vw,_1rem)] pl-[clamp(0.8rem,_1.53vw,_2rem)] pr-[clamp(0.8rem,_1.53vw,_2rem)] gap-[clamp(0.5rem,_1.39vw,_1.8rem)] rounded-[clamp(1.5rem,_5.04vw,_6rem)] shadow-[0px_42px_17px_rgba(0,_0,_0,_0.01)] ${isActive ? "bg-white border-[clamp(0.5px,_0.05vw,_1.5px)] border-[#BDD327]" : "bg-[#F9F9F9] border-[clamp(0.5px,_0.05vw,_1.5px)] border-transparent"}`.trim()}
            >
              {/* Indicator Dot / Checkmark Badge */}
              {isUploaded ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] text-[#BDD327] shrink-0"
                >
                  <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              ) : (
                <div
                  className={`rounded-full shrink-0 flex items-center justify-center box-border w-[clamp(0.8rem,_1.25vw,_1.5rem)] h-[clamp(0.8rem,_1.25vw,_1.5rem)] ${isActive ? "bg-[#E6EEAD]" : "bg-[#E1E5EF]"}`.trim()}
                >
                  <div
                    className={`rounded-full w-[40%] h-[40%] ${isActive ? "bg-[#2D3409]" : "bg-[#C0C2B7]"}`.trim()}
                  />
                </div>
              )}

              {/* Tab Label (Amount) */}
              <span
                className={`font-['Plus_Jakarta_Sans'] font-semibold leading-none text-left tracking-wide whitespace-nowrap text-[clamp(0.75rem,_0.972vw,_1.2rem)] ${isActive ? "text-[#2D3409]" : "text-[#5A5C5E]"}`.trim()}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UploadDocumentsTabsCard;
