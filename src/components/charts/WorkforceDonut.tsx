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
    <div
      style={{
        width: "100%",
        aspectRatio: "1/1",
        position: "relative",
        // The container needs to be the context for the CQ units
        containerType: "inline-size",
        boxSizing: "border-box",
        overflow: "hidden", // Prevents content bleeding
      }}
    >
      {/* OUTER BORDER CIRCLE */}
      <div
        style={{
          position: "absolute",
          inset: "0%",
          borderRadius: "50%",
          border: "1px solid rgba(0, 0, 0, 0.2)",
          boxSizing: "border-box",
        }}
      />

      {/* PIE CHART SEGMENTS */}
      <div
        style={{
          position: "absolute",
          top: "3.37%",
          left: "3.37%",
          width: "93.26%",
          height: "93.26%",
        }}
      >
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
      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "25%",
          width: "50%",
          height: "50%",
          borderRadius: "50%",
          background: "rgba(61, 74, 13, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 3,
        }}
      >
        {/* Use container units (cqi) for perfectly proportional text */}
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 500,
            fontSize: "4.8cqi", 
            lineHeight: "6.25cqi",
            color: "#000000",
            opacity: 0.6,
          }}
        >
          Total
        </div>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            fontSize: "8.65cqi", 
            lineHeight: "11cqi",
            color: "#000000",
          }}
        >
          {total.toLocaleString()}
        </div>
      </div>
    </div>
  );
}