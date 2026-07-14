import React from "react";

interface VO3SectionHeaderProps {
  title?: string;
  showViewAll?: boolean;
  viewAllText?: string;
  onViewAll?: () => void;
}

export const VO3SectionHeader: React.FC<VO3SectionHeaderProps> = ({
  title = "Immediate Action Queue",
}) => {
  return (
    <div className="flex items-center justify-between select-none w-full h-[clamp(1.335rem,2.78vw,5.0rem)]">
      {/* Title */}
      <h2 className="font-sans font-semibold text-[var(--text-primary)] text-[clamp(0.867rem,1.8vw,3.0rem)] leading-[clamp(1.335rem,2.78vw,4.5rem)] tracking-[clamp(-0.0555rem,-0.0625vw,-0.04rem)] m-0 flex items-center">
        {title}
      </h2>

    </div>
  );
};

export default VO3SectionHeader;
