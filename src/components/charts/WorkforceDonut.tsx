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
    <div className="w-full aspect-square relative box-border overflow-hidden flex items-center justify-center">
      {/* OUTER BORDER CIRCLE — Subtle guide */}
      <div className="absolute inset-[2%] rounded-full border border-black/[0.05] box-border" />

      {/* PIE CHART SEGMENTS */}
      <div className="w-[90%] h-[90%]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.map((d) => ({ name: d.label, value: d.value }))}
              dataKey="value"
              innerRadius="75%"
              outerRadius="100%"
              paddingAngle={4}
              cornerRadius={6}
              stroke="#ffffff"
              strokeWidth={2}
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

      {/* CENTER CIRCLE — More stable text sizing */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-[3] pointer-events-none">
        <span className="font-sans font-medium text-[clamp(9px,1vw,11px)] text-[var(--text-primary)] opacity-50 uppercase tracking-wider">
          Total
        </span>
        <span className="font-sans font-bold text-[clamp(16px,1.8vw,24px)] text-[var(--text-primary)]">
          {total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}