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
      className={`bg-white rounded-[clamp(1rem,1.67vw,2rem)] shadow-[0px_20px_40px_rgba(0,49,50,0.06)] flex flex-col justify-start w-full select-none shrink-0 ${className}`}
      style={{
        height: "clamp(20rem, 30.76vw, 35rem)",
        paddingTop: "clamp(1.2rem, 2vw, 3rem)",
        paddingBottom: "clamp(1.2rem, 2vw, 3rem)",
        paddingLeft: "clamp(1rem, 1.6vw, 2.5rem)",
        paddingRight: "clamp(1rem, 1.6vw, 2.5rem)",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {/* ── Auto Layout Grid container (Frame 2147240708) ── */}
      <div 
        className="flex flex-wrap items-start justify-start w-full content-start"
        style={{
          gap: "clamp(0.8rem, 1.875vw, 2.5rem)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          const isUploaded = isTabComplete(tab.id);

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabSelect(tab.id)}
              className="flex flex-row items-center cursor-pointer transition-all duration-200 shrink-0 select-none box-border"
              style={{
                height: "clamp(2rem, 2.86vw, 3.5rem)",
                paddingTop: "clamp(0.4rem, 0.8vw, 1rem)",
                paddingBottom: "clamp(0.4rem, 0.8vw, 1rem)",
                paddingLeft: "clamp(0.8rem, 1.53vw, 2rem)",
                paddingRight: "clamp(0.8rem, 1.53vw, 2rem)",
                gap: "clamp(0.5rem, 1.39vw, 1.8rem)",
                borderRadius: "clamp(1.5rem, 5.04vw, 6rem)",
                backgroundColor: isActive ? "#FFFFFF" : "#F9F9F9",
                border: isActive
                  ? "clamp(0.5px, 0.05vw, 1.5px) solid #BDD327"
                  : "clamp(0.5px, 0.05vw, 1.5px) solid transparent",
                boxShadow: isActive 
                  ? "0px 42px 17px rgba(0, 0, 0, 0.01)" 
                  : "0px 42px 17px rgba(0, 0, 0, 0.01)",
              }}
            >
              {/* Indicator Dot (checklist 2 & 3) */}
              <div
                className="rounded-full shrink-0 transition-colors duration-200"
                style={{
                  boxSizing: "border-box",
                  width: "clamp(0.6rem, 1.25vw, 1.5rem)",
                  height: "clamp(0.6rem, 1.25vw, 1.5rem)",
                  backgroundColor: isActive ? "#2D3409" : (isUploaded ? "#5A6C0B" : "#C0C2B7"),
                  border: "clamp(2px, 0.28vw, 5px) solid #E6EEAD",
                }}
              />

              {/* Tab Label (Amount) */}
              <span
                className="font-['Plus_Jakarta_Sans'] font-semibold leading-none text-left tracking-wide whitespace-nowrap"
                style={{
                  fontSize: "clamp(0.75rem, 0.972vw, 1.2rem)",
                  color: isActive ? "#2D3409" : "#5A5C5E",
                }}
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
