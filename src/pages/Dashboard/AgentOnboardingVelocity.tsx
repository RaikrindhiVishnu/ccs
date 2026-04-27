import React from "react";

const Y_LABELS = [
  { value: "300", pct: 0 },
  { value: "200", pct: 33.3 },
  { value: "100", pct: 66.6 },
  { value: "0",   pct: 100 },
];

const COLS = [
  { label:"Mo", value:150, hPct:48 },
  { label:"Tu", value:195, hPct:63 },
  { label:"We", value:287, hPct:92, active:true },
  { label:"Th", value:80,  hPct:25 },
  { label:"Fr", value:140, hPct:45 },
  { label:"Sa", value:185, hPct:60 },
  { label:"Su", value:150, hPct:48 },
];

const AgentOnboardingVelocity: React.FC = () => (
  <div style={{
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
  }}>

    {/* Header */}
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 32,
      flexShrink: 0,
    }}>
      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {/* Title — weight:500, size:20px as per Figma */}
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 500,
          fontSize: 20,
          lineHeight: "24px",
          color: "#000000",
        }}>
          Agent Onboarding Velocity
        </div>
        {/* Subtitle — weight:400, size:14px, opacity:0.6 */}
        <div style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "18px",
          color: "#000000",
          opacity: 0.6,
        }}>
          Weekly overview of Onboarding of Agents
        </div>
      </div>

      {/* Week pill — exact Figma: 70×28, padding 6px 4px 6px 8px */}
      <div style={{
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
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 400,
          fontSize: 12,
          lineHeight: "16px",
          color: "#000000",
        }}>Week</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ transform:"rotate(90deg)", flexShrink:0 }}>
          <path d="M6 4L10 8L6 12" stroke="#2C2C2C" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>

    {/* Chart body */}
    <div style={{ display:"flex", gap:24, flex:1, minHeight:0 }}>

      {/* Y-axis — width:27px, font:12px, opacity:0.5 */}
      <div style={{ width:27, position:"relative", flexShrink:0 }}>
        {Y_LABELS.map(({ value, pct }) => (
          <span key={value} style={{
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
          }}>{value}</span>
        ))}
      </div>

      {/* Bars + grid */}
      <div style={{ flex:1, position:"relative", minHeight:0, minWidth:0 }}>

        {/* Grid lines — dashed, opacity:0.1, color:#2C2C2C */}
        {Y_LABELS.map(({ pct }, i) => (
          <div key={i} style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${pct}%`,
            borderTop: "1px dashed rgba(44,44,44,0.1)",
          }}/>
        ))}

        {/* Columns */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-around",
          paddingTop: "clamp(20px,3vh,40px)",
          boxSizing: "border-box",
        }}>
          {COLS.map((col, i) => (
            <div key={i} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              height: "100%",
              justifyContent: "flex-end",
              gap: "clamp(2px,0.25vh,3px)",
              flex: 1,
            }}>

              {col.active ? (
                <>
                  {/* Value badge — rgba(0,0,0,0.08) bg, rgba(0,0,0,0.24) border, 46×28 */}
                  <div style={{
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
                  }}>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      lineHeight: "18px",
                      color: "#000000",
                    }}>{col.value}</span>
                  </div>

                  {/* Top dot — 11×11, #2780C4, overlaps capsule */}
                  <div style={{
                    width: 11,
                    height: 11,
                    background: "#2780C4",
                    borderRadius: "50%",
                    flexShrink: 0,
                    zIndex: 3,
                    position: "relative",
                    marginBottom: "-5px",
                  }}/>

                  {/* Capsule — bottom-only radius per Figma spec */}
                  <div style={{
                    width: "clamp(44px,5vw,54px)",
                    height: `${col.hPct}%`,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexShrink: 0,
                    zIndex: 2,
                    overflow: "hidden",                        
                    borderRadius: "0px 0px 71.77px 71.77px",  
                  }}>
                    {/* Exact Figma gradient: rgba(223,232,200,0) → rgba(124,171,218,0.77) */}
                    <div style={{
                      position: "absolute",
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: "linear-gradient(180deg, rgba(223,232,200,0) 0%, rgba(124,171,218,0.77) 100%)",
                      borderRadius: "0px 0px 71.77px 71.77px",
                    }}/>

                    {/* Center line — #2780C4, 1.26px */}
                    <div style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      bottom: 40,
                      width: 1.26,
                      background: "#2780C4",
                      transform: "translateX(-50%)",
                    }}/>

                    {/* "We" circle — 35.88×35.88, radius:23.33, #2780C4 */}
                    <div style={{
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
                    }}>
                      <span style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 10.77,
                        lineHeight: "18px",
                        color: "#FFFFFF",
                        textAlign: "center",
                      }}>{col.label}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Top dot — 11×11, #2780C4, overlaps line */}
                  <div style={{
                    width: 11,
                    height: 11,
                    background: "#2780C4",
                    borderRadius: "50%",
                    flexShrink: 0,
                    zIndex: 2,
                    position: "relative",
                    marginBottom: "-4px",
                  }}/>

                  {/* Thin line — 1.4px solid, rgba(44,44,44,0.16) */}
                  <div style={{
                    height: `${col.hPct}%`,
                    width: 1.4,
                    background: "rgba(44,44,44,0.16)",
                    flexShrink: 0,
                  }}/>

                  {/* Label circle — 40×40, #F2F2F2, radius:26 */}
                  <div style={{
                    width: 40,
                    height: 40,
                    background: "#F2F2F2",
                    borderRadius: 26,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: 12,
                      lineHeight: "20px",
                      color: "#000000",
                      textAlign: "center",
                    }}>{col.label}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AgentOnboardingVelocity;