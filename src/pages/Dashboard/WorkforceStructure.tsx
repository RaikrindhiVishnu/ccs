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
  { label: "R.O.", value: 202, color: "var(--pie-3)" },
  { label: "I.O.", value: 202, color: "var(--pie-2)" },
  { label: "F.O.", value: 366, color: "var(--pie-4)", border: "1px solid var(--primary-light)" },
  { label: "Agents", value: 482, color: "var(--pie-1)" },
];

const WorkforceStructure: React.FC<Props> = ({ data = fallbackData }) => {
  return (
    <div
      className="card"
      style={{
        containerType: "inline-size",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-card-sm)",
        padding: "clamp(12px, 4cqi, 24px) clamp(14px, 5cqi, 28px)",
        width: "100%",
        flex: 1,
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "clamp(8px, 3cqi, 16px)",
          flexShrink: 0,
          gap: 8,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "clamp(14px, 4cqi, 20px)",
              lineHeight: 1.4,
              color: "var(--foreground)",
            }}
          >
            Workforce Structure
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "clamp(11px, 2.8cqi, 14px)",
              lineHeight: 1.4,
              color: "var(--muted)",
              marginTop: 2,
            }}
          >
            Yearly overview of employee statuses
          </div>
        </div>

        {/* Year pill */}
        <div
          style={{
            border: "1px solid var(--border-strong)",
            borderRadius: "var(--btn-radius-pill)",
            padding: "5px 4px 5px 8px",
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "clamp(10px, 2.5cqi, 12px)",
              lineHeight: "16px",
              color: "var(--foreground)",
            }}
          >
            2026
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: "rotate(90deg)", flexShrink: 0 }}
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="var(--foreground)"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
          minHeight: 0,
          gap: "clamp(10px, 4cqi, 20px)",
        }}
      >
        {/* Donut */}
        <div
          style={{
            flexShrink: 0,
            width: "clamp(64px, 28cqi, 140px)",
            aspectRatio: "1 / 1",
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
            gap: "clamp(5px, 2cqi, 12px)",
          }}
        >
          {data.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "clamp(4px, 1.5cqi, 8px)",
              }}
            >
              {/* Color dot */}
              <div
                style={{
                  width: "clamp(6px, 1.5cqi, 9px)",
                  height: "clamp(6px, 1.5cqi, 9px)",
                  borderRadius: "50%",
                  background: item.color,
                  border: item.border ?? "none",
                  flexShrink: 0,
                }}
              />

              {/* Label */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "clamp(9px, 2.2cqi, 11px)",
                  lineHeight: 1.3,
                  color: "var(--foreground)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {item.label}
              </span>

              {/* Dotted line */}
              <div
                style={{
                  flex: 1,
                  borderTop: "1px dashed var(--grid)",
                  minWidth: 4,
                }}
              />

              {/* Value */}
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 500,
                  fontSize: "clamp(11px, 3cqi, 15px)",
                  lineHeight: 1.3,
                  color: "var(--foreground)",
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