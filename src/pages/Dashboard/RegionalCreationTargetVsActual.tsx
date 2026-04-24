import React from "react";

const data = [
  { label:"Mon", target:85, actual:45 },
  { label:"Tue", target:48, actual:29 },
  { label:"Wed", target:52, actual:20 },
  { label:"Thu", target:60, actual:52 },
  { label:"Fri", target:50, actual:23 },
  { label:"Sat", target:100, actual:65 },
  { label:"Sun", target:75, actual:68 },
];
const MAX = 100;
const Y_TICKS = [100, 80, 60, 40, 20, 0];

const RegionalCreationTargetVsActual: React.FC = () => (
  <div style={{ background:"#FFFFFF", borderRadius:"clamp(12px,1.67vw,24px)", padding:"clamp(10px,1.11vw,16px) clamp(12px,1.67vw,24px)", width:"100%", flex:1, minHeight:0, boxSizing:"border-box", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    {/* Header */}
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"clamp(6px,0.83vw,12px)", flexShrink:0 }}>
      <div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:"clamp(11px,1.25vw,18px)", color:"#000" }}>Regional Creation Target vs Actual</div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize:"clamp(9px,0.83vw,12px)", color:"#000", opacity:0.6, marginTop:2 }}>Weekly overview of regional creation</div>
      </div>
      <button style={{ border:"1px solid #000", borderRadius:30, padding:"clamp(3px,0.35vw,5px) clamp(4px,0.42vw,6px)", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:3, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(8px,0.76vw,11px)", color:"#000", flexShrink:0 }}>
        Weekly
        <svg width="clamp(9px,0.97vw,14px)" height="clamp(9px,0.97vw,14px)" viewBox="0 0 16 16" fill="none" style={{ transform:"rotate(90deg)" }}>
          <path d="M6 4L10 8L6 12" stroke="#000" strokeWidth="1.125" strokeLinecap="round"/>
        </svg>
      </button>
    </div>

    {/* Chart */}
    <div style={{ display:"flex", gap:"clamp(4px,0.56vw,8px)", flex:1, minHeight:0 }}>
      {/* Y labels */}
      <div style={{ width:"clamp(16px,1.67vw,24px)", position:"relative", flexShrink:0 }}>
        {Y_TICKS.map((v, i) => (
          <span key={v} style={{ position:"absolute", right:0, top:`${(i/(Y_TICKS.length-1))*100}%`, transform:"translateY(-50%)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(6px,0.63vw,9px)", color:"#000", opacity:0.5 }}>{v}</span>
        ))}
      </div>

      {/* Bars area */}
      <div style={{ flex:1, position:"relative", minHeight:0 }}>
        {/* Grid lines */}
        {Y_TICKS.map((_, i) => (
          <div key={i} style={{ position:"absolute", left:0, right:0, top:`${(i/(Y_TICKS.length-1))*100}%`, borderTop:"1px dashed rgba(0,0,0,0.05)" }}/>
        ))}

        {/* Bar columns */}
        <div style={{ position:"absolute", inset:0, paddingBottom:"clamp(14px,1.8vw,24px)", display:"flex", alignItems:"flex-end", justifyContent:"space-around", boxSizing:"border-box" }}>
          {data.map((d, i) => {
            const tH = `${(d.target/MAX)*100}%`;
            const aH = `${(d.actual/MAX)*100}%`;
            const bw = "clamp(18px,3vw,44px)";
            return (
              <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", height:"100%", justifyContent:"flex-end" }}>
                <div style={{ position:"relative", height:"100%", width:bw, display:"flex", alignItems:"flex-end" }}>
                  {/* target bar */}
                  <div style={{ position:"absolute", bottom:0, width:"100%", height:tH, background:"#2780C4", opacity:0.12, borderRadius:"clamp(4px,0.56vw,8px)" }}/>
                  {/* actual bar */}
                  <div style={{ position:"absolute", bottom:0, width:"100%", height:aH, background:"#2780C4", borderRadius:"clamp(4px,0.56vw,8px)", zIndex:1 }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* X labels */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", justifyContent:"space-around" }}>
          {data.map((d, i) => (
            <span key={i} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(7px,0.63vw,9px)", color:"#000", opacity:0.5, textAlign:"center" }}>{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default RegionalCreationTargetVsActual;