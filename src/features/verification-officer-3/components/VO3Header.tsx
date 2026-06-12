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
    <div className="flex flex-col select-none w-[clamp(23.82rem,37.22vw,44.19rem)] h-[clamp(2.84rem,4.44vw,5.28rem)] gap-[clamp(0.27rem,0.42vw,0.79rem)]">
      {/* Title */}
      <h1 className="font-sans font-bold text-[var(--text-primary)] text-[clamp(1.156rem,1.8vw,2.14rem)] leading-[clamp(1.78rem,2.78vw,3.3rem)] tracking-[clamp(-0.074rem,-0.0625vw,-0.04rem)] m-0 flex items-center">
        {title}
      </h1>
      {/* Subtitle */}
      <p className="font-sans font-normal text-[var(--text-subtle)] text-[clamp(0.71rem,1.11vw,1.32rem)] leading-[clamp(0.8rem,1.25vw,1.49rem)] m-0">
        {subtitle}
      </p>
    </div>
  );
};

export default VO3Header;
