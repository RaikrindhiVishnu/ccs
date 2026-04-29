import React, { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface DayData {
  label: string;  // "Mo", "Tu", "We", etc.
  value: number;  // actual count from API
}

interface Props {
  /** Pass real API data here. Falls back to demo data if undefined. */
  data?: DayData[];
  /** Which day label to treat as "active" — defaults to highest-value day */
  activeLabel?: string;
  /** Y-axis max — defaults to auto (next round-100 above max value) */
  yMax?: number;
  /** Title shown in the card header */
  title?: string;
  /** Subtitle shown below the title */
  subtitle?: string;
}

// ─── Demo / fallback data (remove once real API is wired up) ──────────────────
const DEMO_DATA: DayData[] = [
  { label: "Mo", value: 150 },
  { label: "Tu", value: 195 },
  { label: "We", value: 287 },
  { label: "Th", value: 80  },
  { label: "Fr", value: 140 },
  { label: "Sa", value: 185 },
  { label: "Su", value: 150 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Round up to the nearest multiple of 100 */
function ceilTo100(n: number): number {
  return Math.ceil(n / 100) * 100;
}

/** Build evenly spaced Y-axis labels from 0 → yMax in steps of 100 */
function buildYLabels(yMax: number): { value: string; pct: number }[] {
  const steps = yMax / 100;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const v = yMax - i * 100;          // descending: 300, 200, 100, 0
    const pct = (i / steps) * 100;     // 0% → 100%
    return { value: String(v), pct };
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

const AgentOnboardingVelocity: React.FC<Props> = ({
  data,
  activeLabel,
  yMax: yMaxProp,
  title    = "Agent Onboarding Velocity",
  subtitle = "Weekly overview of Onboarding of Agents",
}) => {
  // ── State: support async data loading ──────────────────────────────────────
  const [chartData, setChartData] = useState<DayData[]>(data ?? DEMO_DATA);

  // Sync when parent passes new data (e.g. after API resolves)
  useEffect(() => {
    if (data && data.length > 0) setChartData(data);
  }, [data]);

  // ── Derived values (all dynamic — zero hardcoding) ─────────────────────────
  const maxValue   = Math.max(...chartData.map((d) => d.value));
  const yMax       = yMaxProp ?? ceilTo100(maxValue);
  const yLabels    = buildYLabels(yMax);

  // Active bar: use prop if provided, else the day with highest value
  const activeLbl  = activeLabel ?? chartData.find((d) => d.value === maxValue)?.label;

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 24,
        padding: "24px 32px",
        width: "100%",
        flex: 1,
        minHeight: 0,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 32,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "24px",
              color: "#000000",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "18px",
              color: "#000000",
              opacity: 0.6,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Week pill */}
        <div
          style={{
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "6px 4px 6px 8px",
            width: 70,
            height: 28,
            border: "1px solid #000000",
            borderRadius: 30,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              lineHeight: "16px",
              color: "#000000",
            }}
          >
            Week
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ transform: "rotate(90deg)", flexShrink: 0 }}
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="#2C2C2C"
              strokeWidth="1.125"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Chart body ──────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 24, flex: 1, minHeight: 0 }}>

        {/* Y-axis labels — built dynamically from yMax */}
        <div style={{ width: 27, position: "relative", flexShrink: 0 }}>
          {yLabels.map(({ value, pct }) => (
            <span
              key={value}
              style={{
                position: "absolute",
                right: 0,
                top: `${pct}%`,
                transform: "translateY(-50%)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 400,
                fontSize: 12,
                lineHeight: "110%",
                color: "#000000",
                opacity: 0.5,
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

          {/* Grid lines — rendered for each Y label */}
          {yLabels.map(({ pct }, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${pct}%`,
                borderTop: "1px dashed rgba(44,44,44,0.1)",
              }}
            />
          ))}

          {/* Columns — all driven by chartData */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-around",
              paddingTop: "clamp(20px,3vh,40px)",
              boxSizing: "border-box",
            }}
          >
            {chartData.map((col, i) => {
              // ── Dynamic height calculation ──────────────────────────────
              const hPct   = (col.value / yMax) * 100;   // % of chart height
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
                    gap: "clamp(2px,0.25vh,3px)",
                    flex: 1,
                  }}
                >
                  {isActive ? (
                    /* ── Active day (highest value) ──────────────────────── */
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
                          background: "rgba(0,0,0,0.08)",
                          border: "1px solid rgba(0,0,0,0.24)",
                          borderRadius: 24,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 600,
                            fontSize: 14,
                            lineHeight: "18px",
                            color: "#000000",
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
                          background: "#2780C4",
                          borderRadius: "50%",
                          flexShrink: 0,
                          zIndex: 3,
                          position: "relative",
                          marginBottom: "-5px",
                        }}
                      />

                      {/* Capsule (gradient fill + center line) */}
                      <div
                        style={{
                          width: "clamp(44px,5vw,54px)",
                          height: `${hPct}%`,
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          flexShrink: 0,
                          zIndex: 2,
                          overflow: "hidden",
                          borderRadius: "0px 0px 71.77px 71.77px",
                        }}
                      >
                        {/* Gradient background */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            background:
                              "linear-gradient(180deg, rgba(223,232,200,0) 0%, rgba(124,171,218,0.77) 100%)",
                            borderRadius: "0px 0px 71.77px 71.77px",
                          }}
                        />

                        {/* Center vertical line */}
                        <div
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            bottom: 40,
                            width: 1.26,
                            background: "#2780C4",
                            transform: "translateX(-50%)",
                          }}
                        />

                        {/* Day label circle */}
                        <div
                          style={{
                            width: 35.88,
                            height: 35.88,
                            background: "#2780C4",
                            borderRadius: 23.33,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 0,
                            zIndex: 3,
                            position: "relative",
                            marginBottom: "clamp(4px,0.5vw,7px)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              fontWeight: 500,
                              fontSize: 10.77,
                              lineHeight: "18px",
                              color: "#FFFFFF",
                              textAlign: "center",
                            }}
                          >
                            {col.label}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* ── Normal day ──────────────────────────────────────── */
                    <>
                      {/* Top dot */}
                      <div
                        style={{
                          width: 11,
                          height: 11,
                          background: "#2780C4",
                          borderRadius: "50%",
                          flexShrink: 0,
                          zIndex: 2,
                          position: "relative",
                          marginBottom: "-4px",
                        }}
                      />

                      {/* Thin vertical line — height driven by value */}
                      <div
                        style={{
                          height: `${hPct}%`,
                          width: 1.4,
                          background: "rgba(44,44,44,0.16)",
                          flexShrink: 0,
                        }}
                      />

                      {/* Day label circle */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          background: "#F2F2F2",
                          borderRadius: 26,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontWeight: 500,
                            fontSize: 12,
                            lineHeight: "20px",
                            color: "#000000",
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
    </div>
  );
};

export default AgentOnboardingVelocity;

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO USE
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. Static / demo (no props needed — uses fallback data):
//    <AgentOnboardingVelocity />
//
// 2. With real API data:
//
//    const [weekData, setWeekData] = useState<DayData[]>([]);
//
//    useEffect(() => {
//      fetch("/api/onboarding/weekly")
//        .then(res => res.json())
//        .then((json: DayData[]) => setWeekData(json));
//    }, []);
//
//    <AgentOnboardingVelocity data={weekData} />
//
//    Expected API response shape:
//    [
//      { "label": "Mo", "value": 150 },
//      { "label": "Tu", "value": 195 },
//      { "label": "We", "value": 287 },
//      { "label": "Th", "value": 80  },
//      { "label": "Fr", "value": 140 },
//      { "label": "Sa", "value": 185 },
//      { "label": "Su", "value": 150 }
//    ]
//
// 3. Override active day and y-axis max:
//    <AgentOnboardingVelocity data={weekData} activeLabel="Fr" yMax={400} />
//
// ─────────────────────────────────────────────────────────────────────────────
// KEY CHANGES FROM STATIC VERSION
// ─────────────────────────────────────────────────────────────────────────────
//
//  REMOVED:
//    const COLS = [{ label, value, hPct, active }]   ← hardcoded Figma data
//    const Y_LABELS = [{ value, pct }]               ← hardcoded y-axis
//
//  ADDED:
//    Props interface with data, activeLabel, yMax, title, subtitle
//    ceilTo100()   — rounds max value up to nearest 100 for y-axis
//    buildYLabels() — generates y-axis ticks dynamically
//    hPct = (col.value / yMax) * 100  — height from real value
//    isActive = col.label === activeLbl  — active day from data, not hardcode
//    useEffect to sync when parent passes new API data
//
// ─────────────────────────────────────────────────────────────────────────────