import farmlandCard from "@/assets/dashboard/farmland-card.png";
import avatars from "@/assets/dashboard/avatars.png";

type Props = {
  status: string;
  statusColor: string;
  agent: string;
  value: string;
  alertId: string;
  farmlandId: string;
  createdTime: string;
  publishedTime: string;
  faceIdx: number;
};

export default function AlertCard({
  status,
  statusColor,
  agent,
  value,
  alertId,
  farmlandId,
  createdTime,
  publishedTime,
  faceIdx,
}: Props) {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col w-full aspect-[424/628]">
      {/* Image flush to top edges */}
      <div className="relative w-full h-[45%] shrink-0">
        <img
          src={farmlandCard}
          className="h-full w-full object-cover"
          alt="Farmland"
        />
        <div className={`absolute top-4 right-4 2xl:top-5 2xl:right-5 px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-full ${statusColor} text-white`}>
          <span className="text-[10px] 2xl:text-[13px] font-bold uppercase tracking-wider">
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 2xl:px-6 2xl:py-5 flex flex-col justify-between flex-1 relative">
        {/* Avatar overlapping image and content */}
        <div className="absolute -top-6 left-5 flex items-center gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden border-[3px] border-white shadow-sm">
            <img 
              src={avatars} 
              className="w-full h-full object-cover" 
              style={{ objectPosition: `${(faceIdx % 2) * 100}% ${Math.floor(faceIdx / 2) * 50}%` }} 
              alt={agent}
            />
          </div>
          <div className="bg-white px-3 py-1 rounded-md shadow-sm border border-gray-100 text-xs font-bold text-gray-800">
            {agent}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[#A0AEC0] text-[10px] 2xl:text-[13px] font-bold uppercase tracking-wider mb-1">
            ESTIMATED VALUE
          </p>
          <h2 className="text-[#1A202C] text-[24px] 2xl:text-[32px] font-extrabold leading-none">
            {value}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-[#A0AEC0] text-[9px] 2xl:text-[12px] font-bold uppercase tracking-wider mb-1">ALERT ID</p>
            <p className="text-[#1A202C] text-[12px] 2xl:text-[16px] font-bold">{alertId}</p>
          </div>
          <div>
            <p className="text-[#A0AEC0] text-[9px] 2xl:text-[12px] font-bold uppercase tracking-wider mb-1">FARMLAND ID</p>
            <p className="text-[#1A202C] text-[12px] 2xl:text-[16px] font-bold">{farmlandId}</p>
          </div>
          <div>
            <p className="text-[#A0AEC0] text-[9px] 2xl:text-[12px] font-bold uppercase tracking-wider mb-1">CREATED TIME</p>
            <p className="text-[#1A202C] text-[11px] 2xl:text-[14px] font-medium">{createdTime}</p>
          </div>
          <div>
            <p className="text-[#A0AEC0] text-[9px] 2xl:text-[12px] font-bold uppercase tracking-wider mb-1">PUBLISHED TIME</p>
            <p className="text-[#1A202C] text-[11px] 2xl:text-[14px] font-medium">{publishedTime}</p>
          </div>
        </div>

        <div className="mt-auto pt-6">
          <button className="w-full bg-[#96C9ED] h-[44px] 2xl:h-[58px] rounded-full font-bold text-black hover:brightness-95 transition-all uppercase tracking-wider text-sm 2xl:text-[18px]">
            VIEW
          </button>
        </div>
      </div>
    </div>
  );
}
