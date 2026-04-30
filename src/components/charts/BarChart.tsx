import React from "react";

export interface BarDataItem {
  label: string;
  value: number;
}

interface Props {
  data: BarDataItem[];
  activeLabel?: string;
  yMax?: number;
}

function ceilTo100(n: number): number {
  return Math.ceil(n / 100) * 100;
}

function buildYLabels(yMax: number): { value: string; pct: number }[] {
  const steps = yMax / 100;
  return Array.from({ length: steps + 1 }, (_, i) => ({
    value: String(yMax - i * 100),
    pct: (i / steps) * 100,
  }));
}

const BarChart: React.FC<Props> = ({ data, activeLabel, yMax: yMaxProp }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  const yMax = yMaxProp ?? ceilTo100(maxValue);
  const yLabels = buildYLabels(yMax);
  const activeLbl = activeLabel ?? data.find((d) => d.value === maxValue)?.label;

  return (
    <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 0 }}>

      {/* Y-axis */}
      <div style={{ width: 27, position: "relative", flexShrink: 0 }}>
        {yLabels.map(({ value, pct }) => (
          <span
            key={value}
            style={{
              position: "absolute",
              right: 0,
              top: `${pct}%`,
              transform: "translateY(-50%)",
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "110%",
              color: "var(--muted-strong)",
              whiteSpace: "nowrap",
              textAlign: "right",
            }}
          >
            {value}
          </span>
        ))}
      </div>

      {/* Bars + grid */}
      <div style={{ flex: 1, position: "relative", minHeight: 0, minWidth: 0 }}>

        {/* Grid lines */}
        {yLabels.map(({ pct }, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${pct}%`,
              borderTop: "1px dashed var(--border)",
            }}
          />
        ))}

        {/* Columns */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-around",
            paddingTop: "clamp(20px, 3vh, 40px)",
            boxSizing: "border-box",
          }}
        >
          {data.map((col, i) => {
            const hPct = (col.value / yMax) * 100;
            const isActive = col.label === activeLbl;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "flex-end",
                  gap: "clamp(2px, 0.25vh, 3px)",
                  flex: 1,
                }}
              >
                {isActive ? (
                  <>
                    {/* Value badge */}
                    <div
                      style={{
                        boxSizing: "border-box",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 46,
                        height: 28,
                        background: "var(--tooltip-bg)",
                        border: "1px solid var(--border-medium)",
                        borderRadius: "var(--radius-lg)",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 600,
                          fontSize: 14,
                          lineHeight: "18px",
                          color: "var(--foreground)",
                        }}
                      >
                        {col.value}
                      </span>
                    </div>

                    {/* Top dot */}
                    <div
                      style={{
                        width: 11,
                        height: 11,
                        background: "var(--primary)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        zIndex: 3,
                        position: "relative",
                        marginBottom: "-5px",
                      }}
                    />

                    {/* Active capsule bar — gradient inline, no wrapper div */}
                    <div
                      style={{
                        width: "clamp(44px, 5vw, 54px)",
                        height: `${hPct}%`,
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexShrink: 0,
                        zIndex: 2,
                        overflow: "hidden",
                         borderRadius: "71.77px",
                      background: "linear-gradient(180deg, #ffffff 0%, rgba(124, 171, 218, 0.77) 100%)",
                      }}
                    >
                      {/* Center vertical line */}
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          top: 0,
                          bottom: 40,
                          width: 1.26,
                          background: "var(--primary)",
                          transform: "translateX(-50%)",
                          zIndex: 1,
                        }}
                      />

                      {/* Day label circle */}
                      <div
                        style={{
                          width: 35.88,
                          height: 35.88,
                          background: "var(--primary)",
                          borderRadius: 23.33,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                          zIndex: 3,
                          position: "relative",
                          marginBottom: "clamp(4px, 0.5vw, 7px)",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontWeight: 500,
                            fontSize: 10.77,
                            lineHeight: "18px",
                            color: "var(--sidebar-text)",
                            textAlign: "center",
                          }}
                        >
                          {col.label}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Top dot */}
                    <div
                      style={{
                        width: 11,
                        height: 11,
                        background: "var(--primary)",
                        borderRadius: "50%",
                        flexShrink: 0,
                        zIndex: 2,
                        position: "relative",
                        marginBottom: "-4px",
                      }}
                    />

                    {/* Thin line */}
                    <div
                      style={{
                        height: `${hPct}%`,
                        width: 1.4,
                        background: "var(--border)",
                        flexShrink: 0,
                      }}
                    />

                    {/* Day label circle */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        background: "var(--background)",
                        borderRadius: 26,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontWeight: 500,
                          fontSize: 12,
                          lineHeight: "20px",
                          color: "var(--foreground)",
                          textAlign: "center",
                        }}
                      >
                        {col.label}
                      </span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BarChart;