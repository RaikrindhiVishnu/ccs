import React from "react";

interface VO3HeaderProps {
  title?: string;
  subtitle?: string;
}

export const VO3Header: React.FC<VO3HeaderProps> = ({
  title = "Verification Officer Dashboard",
  subtitle = "Next-generation platform infrastructure for scaling sustainable estates.",
}) => {
  return (
    <div className="flex flex-col select-none w-[clamp(17.865rem,37.22vw,60.0rem)] h-[clamp(2.13rem,4.44vw,8.0rem)] gap-[clamp(0.2025rem,0.42vw,1.5rem)]">
      {/* Title */}
      <h1 className="font-sans font-bold text-[var(--text-primary)] text-[clamp(0.867rem,1.8vw,3.0rem)] leading-[clamp(1.335rem,2.78vw,4.5rem)] tracking-[clamp(-0.0555rem,-0.0625vw,-0.04rem)] m-0 flex items-center">
        {title}
      </h1>
      {/* Subtitle */}
      <p className="font-sans font-normal text-[var(--text-subtle)] text-[clamp(0.5325rem,1.11vw,2.0rem)] leading-[clamp(0.6rem,1.25vw,2.5rem)] m-0">
        {subtitle}
      </p>
    </div>
  );
};

export default VO3Header;
