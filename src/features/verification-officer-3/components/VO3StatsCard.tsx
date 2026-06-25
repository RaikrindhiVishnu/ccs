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
      className={`flex flex-col justify-start select-none w-full min-h-[clamp(6.4688rem,13.47vw,24.0rem)] rounded-[clamp(0.525rem,1.11vw,2.0rem)] p-[clamp(0.795rem,1.67vw,3.0rem)] transition-all duration-300 hover:shadow-md ${cardBgClass} ${cardBorderClass}`}
    >
      {/* Title */}
      <h3 className="font-sans font-semibold text-[var(--text-primary)] text-[clamp(0.6675rem,1.39vw,2.5rem)] leading-[clamp(0.8325rem,1.74vw,3.0rem)] tracking-tight capitalize m-0 mb-[clamp(0.795rem,1.67vw,3.0rem)]">
        {title}
      </h3>

      {/* Metric Value */}
      <div className="font-sans font-bold text-[var(--text-strong)] text-[clamp(0.93rem,1.94vw,3.5rem)] leading-[clamp(1.17rem,2.43vw,4.0rem)] tracking-tight capitalize mb-[clamp(0.795rem,1.67vw,3.0rem)]">
        {value}
      </div>

      {/* Description */}
      <p className="font-sans font-normal text-[var(--text-subtle)] text-[clamp(0.5325rem,1.11vw,2.0rem)] leading-[clamp(0.6675rem,1.39vw,2.5rem)] capitalize m-0 mt-auto">
        {description}
      </p>
    </div>
  );
};

export default VO3StatsCard;
