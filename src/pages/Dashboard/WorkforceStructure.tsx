import React from "react";
import WorkforceDonut from "@/components/charts/WorkforceDonut";

type DataItem = {
  label: string;
  value: number;
  color: string;
  border?: string;
};

type Props = {
  data?: DataItem[];
};

const fallbackData: DataItem[] = [
  { label: "R.O.", value: 202, color: "#1D5E9C" },
  { label: "I.O.", value: 202, color: "#3D93D1" },
  { label: "F.O.", value: 366, color: "#D7EBF7", border: "1px solid #b0c8da" },
  { label: "Agents", value: 482, color: "#85BFE5" },
];

const WorkforceStructure: React.FC<Props> = ({ data = fallbackData }) => {
  // const total = data.reduce((sum, item) => sum + item.value, 0);

  // const getItem = (label: string) =>
  //   data.find((item) => item.label === label) ??
  //   fallbackData.find((item) => item.label === label);

  // const ro = getItem("R.O.");
  // const io = getItem("I.O.");
  // const fo = getItem("F.O.");
  // const agents = getItem("Agents");

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "clamp(12px,1.67vw,24px)",
        padding: "clamp(10px,1.11vw,16px) clamp(12px,1.67vw,24px)",
        width: "100%",
        flex: 1,
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "clamp(6px,0.83vw,12px)",
          flexShrink: 0,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 500,
              fontSize: "clamp(11px,1.25vw,18px)",
              color: "#000",
            }}
          >
            Workforce Structure
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 400,
              fontSize: "clamp(9px,0.83vw,12px)",
              color: "#000",
              opacity: 0.6,
              marginTop: 2,
            }}
          >
            Yearly overview of employee statuses
          </div>
        </div>

        <div
          style={{
            border: "1px solid #000",
            borderRadius: 30,
            padding: "clamp(3px,0.35vw,5px) clamp(4px,0.42vw,6px)",
            display: "flex",
            alignItems: "center",
            gap: 3,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "clamp(8px,0.76vw,11px)",
              color: "#000",
            }}
          >
            2026
          </span>
          <svg
            width="clamp(9px,0.97vw,14px)"
            height="clamp(9px,0.97vw,14px)"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: "rotate(90deg)" }}
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="#000"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          minHeight: 0,
          gap: "clamp(8px,1.11vw,16px)",
        }}
      >
        {/* Pie */}
<div
  style={{
    flexShrink: 0,
    width: "min(clamp(80px,14vh,150px), 40%)",
    aspectRatio: "1",
  }}
>
  <WorkforceDonut data={data} />
</div>

        {/* Legend */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "clamp(6px,0.83vw,12px)",
          }}
        >
          {data.map((item) => (
            <div
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: 6 }}
            >
              <div
                style={{
                  width: "clamp(6px,0.56vw,8px)",
                  height: "clamp(6px,0.56vw,8px)",
                  borderRadius: "50%",
                  background: item.color,
                  border: item.border ?? "none",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(8px,0.69vw,10px)",
                  color: "#000",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </span>
              <div
                style={{
                  flex: 1,
                  borderTop: "1px dashed rgba(44,44,44,0.08)",
                  margin: "0 4px",
                  minWidth: 4,
                }}
              />
              <span
                style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(10px,0.97vw,14px)",
                  color: "#000",
                  flexShrink: 0,
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkforceStructure;