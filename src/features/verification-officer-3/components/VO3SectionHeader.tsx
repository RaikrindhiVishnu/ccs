import React from "react";

interface VO3SectionHeaderProps {
  title?: string;
  showViewAll?: boolean;
  viewAllText?: string;
  onViewAll?: () => void;
}

export const VO3SectionHeader: React.FC<VO3SectionHeaderProps> = ({
  title = "Immediate Action Queue",
  showViewAll = true,
  viewAllText = "View all",
  onViewAll,
}) => {
  return (
    <div className="flex items-center justify-between select-none w-full h-[clamp(1.78rem,2.78vw,5.0rem)]">
      {/* Title */}
      <h2 className="font-sans font-semibold text-[var(--text-primary)] text-[clamp(1.156rem,1.8vw,3.0rem)] leading-[clamp(1.78rem,2.78vw,4.5rem)] tracking-[clamp(-0.074rem,-0.0625vw,-0.04rem)] m-0 flex items-center">
        {title}
      </h2>

      {/* View All Action */}
      {showViewAll && (
        <button
          onClick={onViewAll}
          className="bg-transparent border-none p-0 cursor-pointer font-sans font-bold text-[#005BC0] text-[clamp(0.8rem,1.25vw,2.0rem)] leading-[clamp(0.89rem,1.39vw,2.5rem)] hover:opacity-85 transition-opacity"
        >
          {viewAllText}
        </button>
      )}
    </div>
  );
};

export default VO3SectionHeader;
