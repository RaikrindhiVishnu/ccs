import React from "react";

interface FlowConnectorProps {
  className?: string;
  type?: "branch" | "single";
  startOffset?: number; // 0 to 1, representing vertical start position
  targetsCount?: number;
}

export const FlowConnector: React.FC<FlowConnectorProps> = ({ 
  className, 
  type = "branch",
  startOffset = 0.5,
  targetsCount: _targetsCount
}) => {
  const strokeColor = "var(--brand-500)";
  const strokeWidth = 1.2;

  // Map 0-1 offset to SVG coordinate space (40 to 280 in our 320 height viewbox)
  const yStart = 40 + (startOffset * 240);

  return (
    <div className={`flex items-center self-center shrink-0 justify-center w-[clamp(40px,4vw,64px)] h-[320px] ${className}`}>
      {type === "branch" ? (
        <svg width="100%" height="100%" viewBox="0 0 60 320" fill="none" preserveAspectRatio="none">
          {/* Main line from the left (Dynamic Y) */}
          <line x1="0" y1={yStart} x2="20" y2={yStart} stroke={strokeColor} strokeWidth={strokeWidth} />
          
          {/* Branch 1 (Top-most) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart - 10} V 50 Q 30 40 60 40`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 56 37 L 60 40 L 56 43" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Branch 2 (Top-mid) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart > 120 ? yStart - 5 : yStart + 5} V 125 Q 30 120 60 120`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 56 117 L 60 120 L 56 123" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Branch 3 (Bottom-mid) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart < 200 ? yStart + 5 : yStart - 5} V 195 Q 30 200 60 200`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 56 197 L 60 200 L 56 203" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Branch 4 (Bottom-most) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart + 10} V 270 Q 30 280 60 280`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 56 277 L 60 280 L 56 283" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Connection Dot (matches design) */}
          <circle cx="2" cy={yStart} r="6" fill="var(--brand-200)" fillOpacity="0.4" />
          <circle cx="2" cy={yStart} r="2.5" fill="var(--text-heading)" />
        </svg>
      ) : (
        <svg width="100%" height="40" viewBox="0 0 60 40" fill="none">
          <line x1="0" y1="20" x2="60" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M 56 17 L 60 20 L 56 23" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="2" cy="20" r="6" fill="var(--brand-200)" fillOpacity="0.4" />
          <circle cx="2" cy="20" r="2.5" fill="var(--text-heading)" />
        </svg>
      )}
    </div>
  );
};
