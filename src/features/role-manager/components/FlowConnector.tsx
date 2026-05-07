import React from "react";

interface FlowConnectorProps {
  className?: string;
  type?: "branch" | "single";
  startOffset?: number; // 0 to 1, representing vertical start position
}

export const FlowConnector: React.FC<FlowConnectorProps> = ({ 
  className, 
  type = "branch",
  startOffset = 0.5 
}) => {
  const strokeColor = "var(--brand-500)";
  const strokeWidth = 1.2;

  // Map 0-1 offset to SVG coordinate space (40 to 280 in our 320 height viewbox)
  const yStart = 40 + (startOffset * 240);

  return (
    <div className={`flex items-center justify-center w-[clamp(40px,4vw,64px)] h-full ${className}`}>
      {type === "branch" ? (
        <svg width="100%" height="100%" viewBox="0 0 60 320" fill="none" preserveAspectRatio="none">
          {/* Main line from the left (Dynamic Y) */}
          <line x1="0" y1={yStart} x2="20" y2={yStart} stroke={strokeColor} strokeWidth={strokeWidth} />
          
          {/* Branch 1 (Top-most) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart - 10} V 50 Q 30 40 45 40`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 41 37 L 45 40 L 41 43" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Branch 2 (Top-mid) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart > 120 ? yStart - 5 : yStart + 5} V 125 Q 30 120 45 120`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 41 117 L 45 120 L 41 123" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Branch 3 (Bottom-mid) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart < 200 ? yStart + 5 : yStart - 5} V 195 Q 30 200 45 200`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 41 197 L 45 200 L 41 203" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Branch 4 (Bottom-most) */}
          <path 
            d={`M 20 ${yStart} Q 30 ${yStart} 30 ${yStart + 10} V 270 Q 30 280 45 280`} 
            stroke={strokeColor} 
            strokeWidth={strokeWidth} 
            strokeLinecap="round" 
          />
          <path d="M 41 277 L 45 280 L 41 283" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />

          {/* Connection Dot (matches design) */}
          <circle cx="2" cy={yStart} r="6" fill="var(--brand-200)" fillOpacity="0.4" />
          <circle cx="2" cy={yStart} r="2.5" fill="var(--text-heading)" />
        </svg>
      ) : (
        <svg width="100%" height="40" viewBox="0 0 60 40" fill="none">
          <line x1="0" y1="20" x2="45" y2="20" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M 41 17 L 45 20 L 41 23" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="2" cy="20" r="6" fill="var(--brand-200)" fillOpacity="0.4" />
          <circle cx="2" cy="20" r="2.5" fill="var(--text-heading)" />
        </svg>
      )}
    </div>
  );
};
