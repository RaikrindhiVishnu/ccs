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

  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-sm text-foreground/60">
        No data available
      </div>
    );
  }

  const max = Math.max(...data.map((d) => d.value));
  const roundedMax = Math.ceil(max / 100) * 100;

  return (
    <div className="
      w-full
      h-full
      bg-card
      rounded-[24px]
      p-[clamp(16px,2vw,24px)]
      shadow-sm
      flex flex-col       
    ">

      {/* HEADER */}
      <div className="flex justify-between items-start mb-[clamp(12px,1.5vh,20px)]">
        <div>
          <h3 className="text-[clamp(16px,1.3vw,20px)] font-medium text-foreground">
            {title}
          </h3>
          <p className="text-[clamp(12px,1vw,14px)] text-foreground/60 mt-1">
            {subtitle}
          </p>
        </div>

       <WeekDropdown
  options={["Week", "Month", "Quarter", "Year"]}
  defaultValue="Week"
/>
      </div>

      {/* CHART — flex-1 + min-h-0 fills remaining card height */}
      <div className="flex-1 min-h-0 w-full">

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>

            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
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
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 11 }}
            />

            <YAxis
              domain={[0, roundedMax]}
              ticks={Array.from({ length: 6 }, (_, i) => i * (roundedMax / 5))}
              axisLine={false}
              tickLine={false}
              width={40}
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 11 }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#areaGradient)"
              dot={false}
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
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="
                      bg-card px-3 py-1 rounded-full
                      text-xs shadow border border-borderStrong text-foreground
                    ">
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