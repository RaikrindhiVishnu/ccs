import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

type DataItem = {
  label: string;
  value: number;
  color: string;
};

type Props = {
  data: DataItem[];
};

export default function WorkforceDonut({ data }: Props) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="w-full aspect-square relative @container box-border overflow-hidden">
      {/* OUTER BORDER CIRCLE */}
      <div className="absolute inset-0 rounded-full border border-[rgba(0,0,0,0.2)] box-border" />

      {/* PIE CHART SEGMENTS */}
      <div className="absolute top-[3.37%] left-[3.37%] width-[93.26%] height-[93.26%] w-[93.26%] h-[93.26%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.map((d) => ({ name: d.label, value: d.value }))}
              dataKey="value"
              innerRadius="68%"
              outerRadius="110%"
              paddingAngle={4}
              cornerRadius={10}
              stroke="#ffffff"
              strokeWidth={3}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* CENTER CIRCLE */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-[rgba(61,74,13,0.08)] flex flex-col items-center justify-center z-3">
        <div className="font-sans font-medium text-[4.8cqi] leading-[6.25cqi] text-[var(--foreground)] opacity-60">
          Total
        </div>
        <div className="font-sans font-semibold text-[8.65cqi] leading-[11cqi] text-[var(--foreground)]">
          {total.toLocaleString()}
        </div>
      </div>
    </div>
  );
}