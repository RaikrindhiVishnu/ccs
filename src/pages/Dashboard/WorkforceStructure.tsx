import React from "react";

const LEGEND = [
  { label:"R.O.", value:202, color:"#1D5E9C" },
  { label:"I.O.", value:202, color:"#3D93D1" },
  { label:"F.O.", value:366, color:"#D7EBF7", border:"1px solid #b0c8da" },
  { label:"Agents", value:482, color:"#85BFE5" },
];

const WorkforceStructure: React.FC = () => (
  <div style={{ background:"#FFFFFF", borderRadius:"clamp(12px,1.67vw,24px)", padding:"clamp(10px,1.11vw,16px) clamp(12px,1.67vw,24px)", width:"100%", flex:1, minHeight:0, boxSizing:"border-box", display:"flex", flexDirection:"column", overflow:"hidden" }}>
    {/* Header */}
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"clamp(6px,0.83vw,12px)", flexShrink:0 }}>
      <div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:"clamp(11px,1.25vw,18px)", color:"#000" }}>Workforce Structure</div>
        <div style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:400, fontSize:"clamp(9px,0.83vw,12px)", color:"#000", opacity:0.6, marginTop:2 }}>Yearly overview of employee statuses</div>
      </div>
      <div style={{ border:"1px solid #000", borderRadius:30, padding:"clamp(3px,0.35vw,5px) clamp(4px,0.42vw,6px)", display:"flex", alignItems:"center", gap:3, cursor:"pointer", flexShrink:0 }}>
        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:"clamp(8px,0.76vw,11px)", color:"#000" }}>2026</span>
        <svg width="clamp(9px,0.97vw,14px)" height="clamp(9px,0.97vw,14px)" viewBox="0 0 16 16" fill="none" style={{ transform:"rotate(90deg)" }}>
          <path d="M6 4L10 8L6 12" stroke="#000" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>

    {/* Body */}
    <div style={{ display:"flex", flexDirection:"row", alignItems:"center", flex:1, minHeight:0, gap:"clamp(8px,1.11vw,16px)" }}>
      {/* Pie */}
      <div style={{ flexShrink:0, width:"min(clamp(80px,14vh,150px), 40%)", aspectRatio:"1" }}>
        <svg viewBox="0 0 208 208" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow:"visible" }}>
          <circle cx="104" cy="104" r="103.5" stroke="black" strokeOpacity="0.2" strokeWidth="1" fill="none"/>
          <path d="M169.318 103.692C170.873 99.5567 175.504 97.4347 179.498 99.3248C198.727 108.425 214.505 123.638 224.29 142.694C234.075 161.75 237.242 183.437 233.433 204.367C232.642 208.714 228.218 211.241 223.951 210.095L201.932 204.178C197.665 203.032 195.195 198.642 195.746 194.258C197.199 182.695 195.153 170.893 189.774 160.416C184.395 149.94 175.996 141.4 165.752 135.843C161.868 133.736 159.741 129.17 161.295 125.034L169.318 103.692Z" fill="#D7EBF7" transform="translate(-34,-83)"/>
          <path d="M49.0071 188.123C44.5892 188.179 40.9282 184.637 41.2366 180.229C42.0992 167.9 45.3122 155.824 50.7282 144.66C56.1443 133.497 63.6407 123.498 72.7902 115.19C76.0611 112.22 81.109 112.903 83.7997 116.407L97.6847 134.492C100.375 137.996 99.6682 142.984 96.5655 146.129C92.1151 150.641 88.4187 155.862 85.6369 161.596C82.8552 167.33 81.042 173.465 80.2529 179.753C79.7028 184.137 76.2232 187.78 71.8053 187.835L49.0071 188.123Z" fill="#1D5E9C" transform="translate(-34,-83)"/>
          <path d="M88.6139 112.959C86.1622 109.284 87.1404 104.285 91.0056 102.144C101.172 96.5135 112.288 92.7451 123.828 91.0408C135.368 89.3365 147.099 89.7309 158.459 92.1822C162.778 93.1141 165.16 97.617 163.875 101.844L157.246 123.66C155.962 127.887 151.494 130.214 147.131 129.521C141.307 128.596 135.361 128.558 129.497 129.424C123.633 130.291 117.952 132.045 112.644 134.614C108.667 136.539 103.717 135.603 101.266 131.927L88.6139 112.959Z" fill="#3D93D1" transform="translate(-34,-83)"/>
          <path d="M222.678 214.399C226.881 215.759 229.217 220.286 227.515 224.364C219.849 242.732 206.684 258.364 189.739 269.049C170.53 281.162 147.68 286.151 125.17 283.148C102.66 280.144 81.918 269.338 66.5572 252.612C53.0065 237.857 44.4015 219.32 41.8196 199.584C41.2465 195.203 44.6876 191.447 49.1009 191.237L71.8751 190.151C76.2883 189.941 79.9808 193.368 80.7939 197.711C82.7885 208.364 87.7313 218.306 95.1343 226.367C104.351 236.403 116.796 242.886 130.302 244.689C143.808 246.491 157.518 243.497 169.043 236.23C178.301 230.392 185.678 222.094 190.396 212.336C192.319 208.358 196.781 206.02 200.985 207.38L222.678 214.399Z" fill="#85BFE5" transform="translate(-34,-83)"/>
          <circle cx="104" cy="104" r="52" fill="white" fillOpacity="0.92"/>
          <text x="104" y="100" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="500" fontSize="10" fill="#000">Total</text>
          <text x="104" y="116" textAnchor="middle" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600" fontSize="18" fill="#000">1247</text>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column", justifyContent:"center", gap:"clamp(6px,0.83vw,12px)" }}>
        {LEGEND.map((item) => (
          <div key={item.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:"clamp(6px,0.56vw,8px)", height:"clamp(6px,0.56vw,8px)", borderRadius:"50%", background:item.color, border:item.border ?? "none", flexShrink:0 }}/>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:"clamp(8px,0.69vw,10px)", color:"#000", whiteSpace:"nowrap" }}>{item.label}</span>
            <div style={{ flex:1, borderTop:"1px dashed rgba(44,44,44,0.08)", margin:"0 4px", minWidth:4 }}/>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:500, fontSize:"clamp(10px,0.97vw,14px)", color:"#000", flexShrink:0 }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WorkforceStructure;