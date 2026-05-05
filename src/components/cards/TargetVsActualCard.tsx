import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { WeekDropdown } from "@/components/ui/Dropdown";

type DataType = {
  day: string;
  target: number;
  actual: number;
};

type Props = {
  data: DataType[];
  title?: string;
  subtitle?: string;
};

export default function TargetVsActualCard({
  data,
  title = "Regional Creation Target vs Actual",
  subtitle = "Weekly overview of regional creation",
}: Props) {
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
      <div className="flex justify-between items-start mb-[clamp(12px,1.5vh,20px)] text-heading">
        <div>
          <h3 className="text-[clamp(16px,1.3vw,20px)] font-medium text-foreground">
            {title}
          </h3>
          <p className="text-[clamp(12px,1vw,14px)] text-foreground/60 mt-1"
            style={{
              color: "var(--muted)"
            }}>
            {subtitle}
          </p>
        </div>

       <WeekDropdown
  options={["Weekly", "Monthly", "Quarterly", "Yearly"]}
  defaultValue="Weekly"  
/>
      </div>

      {/* CHART — flex-1 + min-h-0 fills remaining card height */}
      <div className="flex-1 min-h-0 w-full">

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="22%"
            barGap={-40}
          >

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
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              axisLine={false}
              tickLine={false}
              width={40}
              tick={{ fill: "rgba(0,0,0,0.5)", fontSize: 11 }}
            />

            <Bar
              dataKey="target"
              barSize={40}
              radius={[14, 14, 0, 0]}
              fill="var(--outerbar)"
            />

            <Bar
              dataKey="actual"
              barSize={40}
              radius={[14, 14, 0, 0]}
              label={false}
              shape={(props: any) => {
                const { x, y, width, height, payload } = props;
                const centerX = x + width / 2;

                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      rx={14}
                      fill="var(--primary)"
                    />
                    <circle
                      cx={centerX}
                      cy={y + 2}
                      r={Math.max(10, width * 0.25)}
                      fill="var(--primary-light)"
                      opacity={0.9}
                    />
                    <text
                      x={centerX}
                      y={y + 5}
                      textAnchor="middle"
                      fontSize={Math.max(9, width * 0.2)}
                      fontWeight="600"
                      fill="var(--foreground)"
                    >
                      {payload.actual}
                    </text>
                  </g>
                );
              }}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}