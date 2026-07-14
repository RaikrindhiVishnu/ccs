import avatars from "../../../../assets/dashboard/avatars.png";

type PodiumUserProps = {
  rank: 1 | 2 | 3;
  name: string;
  role: string;
  farms: number;
  sales: string;
  faceIdx: number;
};

function Crown({ rank, className = "" }: { rank: 1 | 2 | 3; className?: string }) {
  const color = {
    1: "text-[#F4B740]",
    2: "text-[#B2C7D9]",
    3: "text-[#D2895C]"
  }[rank];

  return (
    <svg className={`${className} ${color} drop-shadow-sm`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 22h20v-2H2v2zm1-4h18V10l-4 4-5-8-5 8-4-4v8z" />
    </svg>
  );
}

function PodiumColumn({ rank, name, role, farms, sales, faceIdx }: PodiumUserProps) {
  const config = {
    1: {
      heightClass: "h-[320px] 2xl:h-[360px]",
      widthClass: "w-[260px] 2xl:w-[300px]",
      borderColor: "border-[#F4B740]",
      barColor: "bg-[#E28A12]",
      containerOrder: "order-2 z-10",
    },
    2: {
      heightClass: "h-[220px] 2xl:h-[260px]",
      widthClass: "w-[210px] 2xl:w-[250px]",
      borderColor: "border-[#B2C7D9]",
      barColor: "bg-[#98A2B3]",
      containerOrder: "order-1",
    },
    3: {
      heightClass: "h-[200px] 2xl:h-[240px]",
      widthClass: "w-[210px] 2xl:w-[250px]",
      borderColor: "border-[#D2895C]",
      barColor: "bg-[#D25B13]",
      containerOrder: "order-3",
    }
  }[rank];

  return (
    <div className={`flex flex-col items-center ${config.widthClass} ${config.containerOrder}`}>
      {/* Crown */}
      <div className="mb-2 flex justify-center">
        <Crown className="w-6 h-6 2xl:w-8 2xl:h-8" rank={rank} />
      </div>

      {/* Avatar Container */}
      <div className="relative mb-3 flex justify-center">
        <div className={`overflow-hidden rounded-[12px] border-[3px] ${config.borderColor} w-[72px] h-[72px] 2xl:w-[88px] 2xl:h-[88px] shadow-sm`}>
          <img 
            src={avatars} 
            className="w-full h-full object-cover" 
            style={{ 
              objectPosition: `${(faceIdx % 2) * 100}% ${Math.floor(faceIdx / 2) * 50}%`,
              transform: "scale(1.15)" 
            }} 
            alt={name}
          />
        </div>
      </div>

      {/* Name and Role */}
      <div className="text-center mb-5 min-h-[44px] 2xl:min-h-[56px] flex flex-col justify-center">
        <h3 className="text-[16px] 2xl:text-[20px] font-semibold text-[#111827] leading-tight tracking-tight">{name}</h3>
        <p className="text-[12px] 2xl:text-[14px] text-[#6B7280] font-medium mt-0.5">{role}</p>
      </div>

      {/* Trapezium 3D Column */}
      <div className="relative w-full flex flex-col">
        {/* Top trapezium slanted cap */}
        <div className="absolute -top-[16px] left-[12px] right-[12px] h-[16px] bg-[#E8E8E8] skew-x-[-25deg] rounded-t-[4px] border-t border-l border-r border-[#E3E3E3] z-0" />
        
        {/* Main card front face */}
        <div className={`w-full ${config.heightClass} bg-[#F5F5F5] rounded-b-[18px] rounded-t-[6px] border border-[#E3E3E3] shadow-[0_8px_24px_rgba(0,0,0,0.06)] flex flex-col justify-between p-6 2xl:p-8 z-10`}>
          
          {/* Stats Box */}
          <div className="w-full flex justify-between gap-1 mt-2 2xl:mt-4">
            <div className="flex flex-col">
              <span className="text-[11px] 2xl:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">Farms</span>
              <span className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] leading-none mt-2">{farms}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[11px] 2xl:text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">Sales</span>
              <span className="text-[24px] 2xl:text-[32px] font-semibold text-[#111827] leading-none mt-2">{sales}</span>
            </div>
          </div>

          {/* Bottom Progress Line */}
          <div className="w-full mt-auto pb-1">
            <div className="h-[6px] rounded-full bg-[#D9D9D9] overflow-hidden">
              <div className={`h-full w-[70%] ${config.barColor} rounded-full`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopThreeSection() {
  const topThreeData: PodiumUserProps[] = [
    {
      rank: 1,
      name: "Kishore Moore",
      role: "Agent",
      farms: 58,
      sales: "₹5.8Cr",
      faceIdx: 2
    },
    {
      rank: 2,
      name: "Laakhan Rai",
      role: "Agent",
      farms: 42,
      sales: "₹3.2Cr",
      faceIdx: 0
    },
    {
      rank: 3,
      name: "Lakshya Chaubey",
      role: "Agent",
      farms: 39,
      sales: "₹2.9Cr",
      faceIdx: 1
    }
  ];

  return (
    <div className="bg-white shadow-[0px_20px_40px_rgba(0,105,107,0.06)] rounded-[46px] min-h-[720px] 2xl:min-h-[850px] px-10 py-16 flex flex-col items-center justify-center">
      <div className="flex items-end justify-center gap-14 xl:gap-20 2xl:gap-28 w-full max-w-6xl py-6 overflow-x-auto no-scrollbar pt-24">
        {topThreeData.map((performer) => (
          <PodiumColumn key={performer.rank} {...performer} />
        ))}
      </div>
    </div>
  );
}
