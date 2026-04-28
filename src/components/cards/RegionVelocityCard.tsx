import { useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import WeekDropdown from "@/components/ui/WeekDropdown";

type ChartData = {
  day: string;
  value: number;
};

type Props = {
  data: ChartData[];
  title?: string;
  subtitle?: string;
};

export default function RegionVelocityCard({
  data,
  title = "Region Creation Velocity",
  subtitle = "Weekly overview of Region Creation Velocity",
}: Props) {
  const [activeDay, setActiveDay] = useState<string | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-sm text-foreground/60">No data available</div>
    );
  }

  const max = Math.max(...data.map((d) => d.value));
  const roundedMax = Math.ceil(max / 100) * 100;
  const maxIndex = data.findIndex((d) => d.value === max);
  const tickCount = roundedMax / 100;
  const CustomDot = (props: any) => {
    const { cx, cy, index } = props;
    if (index !== maxIndex) return null;

    const bubbleW = 56;
    const bubbleH = 26;
    const bubbleX = cx - bubbleW / 2;
    const bubbleY = cy - bubbleH - 16;

    return (
      <g>
        <line
          x1={cx}
          y1={bubbleY + bubbleH}
          x2={cx}
          y2={cy - 10}
          stroke="#cbd5e1"
          strokeWidth={1}
          strokeDasharray="2 2"
        />
        <rect
          x={bubbleX}
          y={bubbleY}
          width={bubbleW}
          height={bubbleH}
          rx={13}
          fill="var(--background)"
          stroke="var(--border-strong)"
          strokeWidth={1.2}
          filter="url(#bubbleShadow)"
        />
        <text
          x={cx}
          y={bubbleY + 17}
          textAnchor="middle"
          fontSize={13}
          fontWeight={700}
          fill="#0f172a"
        >
          {data[index].value}
        </text>
        <circle cx={cx} cy={cy} r={14} fill="#bfdbfe" opacity={0.45} />
        <circle cx={cx} cy={cy} r={9} fill="white" stroke="#93c5fd" strokeWidth={2} />
        <circle cx={cx} cy={cy} r={4} fill="#93c5fd" />
      </g>
    );
  };

  return (
    <div className="w-full h-full bg-card rounded-[24px] p-[clamp(16px,2vw,24px)] shadow-sm flex flex-col">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-[clamp(12px,1.5vh,20px)]">
        <div>
          <h3 className="text-[clamp(16px,1.3vw,20px)] font-medium text-foreground">
            {title}
          </h3>
          <p
            className="text-[clamp(12px,1vw,14px)] text-foreground/60 mt-1"
            style={{ color: "var(--muted)" }}
          >
            {subtitle}
          </p>
        </div>
        <WeekDropdown
          options={["Week", "Month", "Quarter", "Year"]}
          defaultValue="Week"
        />
      </div>

      {/* CHART */}
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 42, right: 8, bottom: 0, left: 0 }}
            onMouseMove={(state: any) => {
              if (state?.activePayload?.length) {
                setActiveDay(state.activePayload[0].payload.day);
              }
            }}
            onMouseLeave={() => setActiveDay(null)}
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.65} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
              <filter id="bubbleShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#00000018" />
              </filter>
            </defs>

            <CartesianGrid
              stroke="var(--grid)"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={(props: any) => {
                const { x, y, payload } = props;
                const isPeak = payload.value === data[maxIndex].day;
                const isActive = payload.value === activeDay;
                return (
                  <text
                    x={x}
                    y={y + 10}
                    textAnchor="middle"
                    fontSize={11}
                    fontWeight={isPeak || isActive ? 700 : 400}
                    fill={isPeak || isActive ? "#0f172a" : "rgba(0,0,0,0.5)"}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

          // In YAxis:
            <YAxis
              domain={[0, roundedMax]}
              ticks={Array.from({ length: tickCount + 1 }, (_, i) => i * 100)}
              axisLine={false}
              tickLine={false}
              width={40}
              allowDataOverflow={false}
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 11 }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={<CustomDot />}
              activeDot={{
                r: 6,
                fill: "var(--primary)",
                stroke: "var(--primary-light)",
                strokeWidth: 6,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "var(--primary-light)",
                strokeWidth: 20,
                opacity: 0.25,
              }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const isPeak = label === data[maxIndex].day;
                  return (
                    <div
                      style={{
                        background: isPeak ? "var(--primary)" : "white",
                        color: isPeak ? "white" : "#0f172a",
                        border: isPeak ? "none" : "1px solid #e2e8f0",
                        borderRadius: "999px",
                        padding: "4px 14px",
                        fontSize: 12,
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                      }}
                    >
                      {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}