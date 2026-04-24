import React from "react";

const data = [
  { label:"Mon", value:280 },
  { label:"Tue", value:180 },
  { label:"Wed", value:499 },
  { label:"Thu", value:340 },
  { label:"Fri", value:300 },
  { label:"Sat", value:280 },
  { label:"Sun", value:310 },
];
const MAX = 500;
const Y_TICKS = [500, 400, 300, 200, 100, 0];
const PEAK_IDX = 2;

const RegionCreationVelocity: React.FC = () => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [dims, setDims] = React.useState({ w: 400, h: 120 });

  React.useLayoutEffect(() => {
    const observe = () => {
      if (svgRef.current) {
        const r = svgRef.current.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) setDims({ w: r.width, h: r.height });
      }
    };
    observe();
    const ro = new ResizeObserver(observe);
    if (svgRef.current) ro.observe(svgRef.current);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dims;
  const getX = (i: number) => (i / (data.length - 1)) * w;
  const getY = (v: number) => h - (v / MAX) * h;
  const pts = data.map((d, i) => ({ x: getX(i), y: getY(d.value), ...d }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${pts[pts.length-1].x},${h} L${pts[0].x},${h} Z`;
  const peak = pts[PEAK_IDX];

  return (
    <div style={{ background:"#FFFFFF", borderRadius:"clamp(12px,1.67vw,24px)", padding:"clamp(10px,1.39vw,20px) clamp(12px,1.67vw,24px)", width:"100%", flex:1, minHeight:"clamp(160px,20vh,280px)", boxSizing:"border-box", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"clamp(6px,0.83vw,12px)", flexShrink:0 }}>
        <div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:"clamp(11px,1.25vw,18px)", color:"#000" }}>Region Creation Velocity</div>
          <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize:"clamp(9px,0.83vw,12px)", color:"#000", opacity:0.6, marginTop:2 }}>Weekly overview of Region Creation Velocity</div>
        </div>
        <button style={{ border:"1px solid #000", borderRadius:30, padding:"clamp(3px,0.35vw,5px) clamp(4px,0.42vw,6px)", background:"transparent", cursor:"pointer", display:"flex", alignItems:"center", gap:3, fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(8px,0.76vw,11px)", color:"#000", flexShrink:0 }}>
          Week
          <svg width="clamp(9px,0.97vw,14px)" height="clamp(9px,0.97vw,14px)" viewBox="0 0 16 16" fill="none" style={{ transform:"rotate(90deg)" }}>
            <path d="M6 4L10 8L6 12" stroke="#000" strokeWidth="1.125" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Chart row */}
      <div style={{ display:"flex", gap:"clamp(4px,0.56vw,8px)", flex:1, minHeight:0 }}>
        {/* Y labels */}
        <div style={{ width:"clamp(16px,1.67vw,24px)", position:"relative", flexShrink:0 }}>
          {Y_TICKS.map((v, i) => (
            <span key={v} style={{ position:"absolute", right:0, top:`${(i/(Y_TICKS.length-1))*100}%`, transform:"translateY(-50%)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(6px,0.63vw,9px)", color:"#000", opacity:0.5 }}>{v}</span>
          ))}
        </div>

        <div style={{ flex:1, position:"relative", display:"flex", flexDirection:"column", minWidth:0, minHeight:0 }}>
          {/* Peak pill */}
          {w > 0 && (
            <div style={{ position:"absolute", left:`${(peak.x/w)*100}%`, top:0, transform:"translateX(-50%)", background:"rgba(0,0,0,0.08)", border:"1px solid rgba(44,44,44,0.6)", borderRadius:24, padding:"clamp(2px,0.28vw,4px) clamp(6px,0.69vw,10px)", fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:600, fontSize:"clamp(8px,0.83vw,12px)", color:"#2C2C2C", zIndex:10, whiteSpace:"nowrap" }}>499</div>
          )}

          <svg ref={svgRef} viewBox={`0 0 ${w} ${h}`} width="100%" height="100%" style={{ display:"block", flex:1, overflow:"visible", marginTop:"clamp(16px,1.67vw,24px)" }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="rcvGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2780C4" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
              </linearGradient>
            </defs>
            {Y_TICKS.map((_, i) => (
              <line key={i} x1={0} y1={(i/(Y_TICKS.length-1))*h} x2={w} y2={(i/(Y_TICKS.length-1))*h} stroke="#2C2C2C" strokeOpacity="0.1" strokeWidth="1"/>
            ))}
            <path d={area} fill="url(#rcvGrad2)"/>
            <path d={line} fill="none" stroke="#2780C4" strokeWidth="2" strokeOpacity="0.5"/>
            {w > 0 && <ellipse cx={peak.x} cy={peak.y} rx={10} ry={10} fill="rgba(174,214,239,0.3)" stroke="#AED6EF" strokeWidth="3"/>}
            {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={3} fill="#2780C4"/>)}
          </svg>

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"clamp(2px,0.28vw,4px)", flexShrink:0 }}>
            {data.map((d, i) => (
              <span key={i} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(7px,0.69vw,10px)", color:"#000", opacity:i===3?1:0.5, fontWeight:i===3?600:400, textAlign:"center", flex:1 }}>{d.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionCreationVelocity;