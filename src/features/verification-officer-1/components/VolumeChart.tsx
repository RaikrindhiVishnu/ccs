import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { MOCK_VOLUME_DATA } from "../data/dashboardMockData";

// Custom Month tick rendered as a dark rounded pill badge with white text
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x={-20}
        y={12}
        width={40}
        height={22}
        rx={11}
        fill="#1A1C1D"
      />
      <text
        x={0}
        y={26}
        dy={0}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize={10}
        fontFamily="Plus Jakarta Sans"
        fontWeight={700}
      >
        {payload.value}
      </text>
    </g>
  );
};

export const VolumeChart: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full mt-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="font-plus-jakarta font-extrabold text-[20px] text-[#1A1C1D]">
          Monthly Verification Volume
        </h2>
        
        {/* Custom Chart Legends */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-t from-[#2780C4] to-[#BDD327]" />
            <span className="font-plus-jakarta text-xs md:text-sm font-semibold text-[#5D6B6B]">
              Acres Approved
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-3.5 h-3.5 rounded-xs border border-[#2780C4]/30"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, #E6F0FA, #E6F0FA 2px, #BDD1E5 2px, #BDD1E5 4px)'
              }}
            />
            <span className="font-plus-jakarta text-xs md:text-sm font-semibold text-[#5D6B6B]">
              Monthly Target (Acres)
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Volume Chart */}
      <div className="w-full h-[320px] relative mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={MOCK_VOLUME_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 25 }}
            barGap={-44} // Overlap background & foreground bars completely
          >
            <defs>
              {/* Crosshatch Pattern for target bars */}
              <pattern id="target-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#E6F0FA" strokeWidth="3" />
                <line x1="0" y1="0" x2="0" y2="8" stroke="#BDD1E5" strokeWidth="1.5" opacity="0.4" />
              </pattern>

              {/* Approved bar gradient: green top to blue bottom */}
              <linearGradient id="approved-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BDD327" />
                <stop offset="100%" stopColor="#2780C4" />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E5EAEB"
            />
            
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
            />

            <YAxis
              domain={[0, 600]}
              tickCount={4}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#5D6B6B",
                fontSize: 12,
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600
              }}
            />

            {/* Custom tooltip matching design */}
            <Tooltip 
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border border-[#E5EAEB] p-3 rounded-2xl shadow-xl flex flex-col gap-1">
                      <span className="font-plus-jakarta font-bold text-xs text-[#1E1E1E]">
                        {payload[0].payload.month}
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-plus-jakarta text-xs text-[#2780C4]">
                          Target: <span className="font-semibold">{payload[1]?.value} Acres</span>
                        </span>
                        <span className="font-plus-jakarta text-xs text-[#9CB624] font-bold">
                          Approved: <span className="font-extrabold">{payload[0]?.value} Acres</span>
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Background Target Bar */}
            <Bar
              dataKey="target"
              fill="url(#target-stripes)"
              radius={[22, 22, 22, 22]}
              barSize={44}
              isAnimationActive={false}
            />

            {/* Foreground Approved Bar */}
            <Bar
              dataKey="approved"
              fill="url(#approved-grad)"
              radius={[22, 22, 22, 22]}
              barSize={44}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default VolumeChart;
