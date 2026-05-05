import React from "react";
import {
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export interface BarDataItem {
  label: string;
  value: number;
}

interface Props {
  data: BarDataItem[];
  activeLabel?: string;
  yMax?: number;
}

const CustomBar = (props: any) => {
  const { x, y, width, height, value, label, activeLabel } = props;
  const isActive = label === activeLabel;

  const thinLineWidth = 1.4;
  const centerX = x + width / 2;

  if (isActive) {
    const capsuleWidth = 54;
    const capsuleX = centerX - capsuleWidth / 2;

    return (
      <g>
        {/* Value Badge (Tooltip on top) */}
        <foreignObject x={centerX - 23} y={y - 45} width={46} height={28}>
          <div 
            className="flex justify-center items-center rounded-[24px] border border-[rgba(0,0,0,0.24)] bg-[rgba(0,0,0,0.08)] h-7 w-11.5 shadow-none"
          >
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] text-[#000000] leading-none">
              {value}
            </span>
          </div>
        </foreignObject>

        {/* Top Dot */}
        <circle cx={centerX} cy={y - 5.5} r={5.5} fill="#2780C4" />

        {/* Capsule Bar with Gradient */}
        <defs>
          <linearGradient id="activeCapsuleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(223, 232, 200, 0)" />
            <stop offset="100%" stopColor="rgba(124, 171, 218, 0.77)" />
          </linearGradient>
        </defs>
        <rect
          x={capsuleX}
          y={y - 10}
          width={capsuleWidth}
          height={height + 55}
          rx={27}
          fill="url(#activeCapsuleGradient)"
        />

        {/* Center vertical line (Primary) */}
        <line
          x1={centerX}
          y1={y}
          x2={centerX}
          y2={y + height}
          stroke="#2780C4"
          strokeWidth={1.26}
        />

        {/* Active Day label circle */}
        <foreignObject x={centerX - 18} y={y + height - 2} width={36} height={36}>
          <div className="w-[36px] h-[36px] bg-[#2780C4] rounded-full flex justify-center items-center shadow-sm">
            <span className="font-['Plus_Jakarta_Sans'] font-medium text-[10.7px] text-white">
              {label}
            </span>
          </div>
        </foreignObject>
      </g>
    );
  }

  return (
    <g>
      {/* Top Dot */}
      <circle cx={centerX} cy={y - 4} r={5.5} fill="#2780C4" />

      {/* Thin line (Inactive) */}
      <rect
        x={centerX - thinLineWidth / 2}
        y={y}
        width={thinLineWidth}
        height={height}
        fill="#2C2C2C"
        opacity={0.16}
      />

      {/* Inactive Day label circle */}
      <foreignObject x={centerX - 20} y={y + height - 2} width={40} height={40}>
        <div className="w-10 h-10 bg-[#F2F2F2] rounded-full flex justify-center items-center">
          <span className="font-['Plus_Jakarta_Sans'] font-medium text-[12px] text-[#000000]">
            {label}
          </span>
        </div>
      </foreignObject>
    </g>
  );
};

const BarChart: React.FC<Props> = ({ data, activeLabel, yMax: yMaxProp }) => {
  const domainMax = yMaxProp ?? 300; 

  const activeLbl = activeLabel ?? "We"; 

  return (
    <div className="w-full h-full min-h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBar
          data={data}
          margin={{ top: 50, right: 10, left: 10, bottom: 45 }}
          barGap={0}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="1 1"
            stroke="#2C2C2C"
            strokeOpacity={0.1}
          />
          <XAxis
            dataKey="label"
            hide
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, domainMax]}
            ticks={[0, 100, 200, 300]}
            width={40}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#000000",
              fontSize: 12,
              opacity: 0.5,
              fontFamily: "Plus Jakarta Sans",
            }}
          />
          <Bar
            dataKey="value"
            shape={(props: any) => (
              <CustomBar
                {...props}
                activeLabel={activeLbl}
                label={data[props.index].label}
              />
            )}
            isAnimationActive={false}
          />
        </RechartsBar>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;