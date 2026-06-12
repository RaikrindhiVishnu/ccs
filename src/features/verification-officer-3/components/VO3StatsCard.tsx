import React from "react";

export type VO3StatsCardType = "assigned" | "verified" | "rejected" | "pending";

interface VO3StatsCardProps {
  type: VO3StatsCardType;
  title: string;
  value: string | number;
  description: string;
}

export const VO3StatsCard: React.FC<VO3StatsCardProps> = ({
  type,
  title,
  value,
  description,
}) => {
  // Map type to Figma CSS backgrounds and borders
  let cardBgClass = "";
  let cardBorderClass = "";

  switch (type) {
    case "assigned":
      cardBgClass = "bg-[rgba(189,228,255,0.62)]";
      cardBorderClass = "border-none";
      break;
    case "verified":
      cardBgClass = "bg-[rgba(200,222,82,0.55)]";
      cardBorderClass = "border border-[#B8D327]/50 shadow-[0px_0px_2px_#B8D327]";
      break;
    case "rejected":
      cardBgClass = "bg-[#CEE6F7]";
      cardBorderClass = "border border-[#3D9FD1]/50 shadow-[0px_0px_2px_#3D9FD1]";
      break;
    case "pending":
      cardBgClass = "bg-[#D8E497]";
      cardBorderClass = "border border-[#B8D327]/50 shadow-[0px_0px_2px_#B8D327]";
      break;
  }

  return (
    <div
      className={`flex flex-col justify-start select-none w-full min-h-[clamp(8.625rem,13.47vw,16.0rem)] rounded-[clamp(0.7rem,1.11vw,1.31rem)] p-[clamp(1.06rem,1.67vw,1.98rem)] transition-all duration-300 hover:shadow-md ${cardBgClass} ${cardBorderClass}`}
    >
      {/* Title */}
      <h3 className="font-sans font-semibold text-[var(--text-primary)] text-[clamp(0.89rem,1.39vw,1.65rem)] leading-[clamp(1.11rem,1.74vw,2.06rem)] tracking-tight capitalize m-0 mb-[clamp(1.06rem,1.67vw,1.98rem)]">
        {title}
      </h3>

      {/* Metric Value */}
      <div className="font-sans font-bold text-[var(--text-strong)] text-[clamp(1.24rem,1.94vw,2.31rem)] leading-[clamp(1.56rem,2.43vw,2.89rem)] tracking-tight capitalize mb-[clamp(1.06rem,1.67vw,1.98rem)]">
        {value}
      </div>

      {/* Description */}
      <p className="font-sans font-normal text-[var(--text-subtle)] text-[clamp(0.71rem,1.11vw,1.32rem)] leading-[clamp(0.89rem,1.39vw,1.65rem)] capitalize m-0 mt-auto">
        {description}
      </p>
    </div>
  );
};

export default VO3StatsCard;
