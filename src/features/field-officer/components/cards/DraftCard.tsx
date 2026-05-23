import { useNavigate } from "react-router-dom";
import farmlandCard from "@/assets/dashboard/farmland-card.png";

type Props = {
  name: string;
  farmId: string;
  amount: string;
  createdOn: string;
  isExpanded?: boolean;
};

export default function DraftCard({ name, farmId, amount, createdOn, isExpanded = false }: Props) {
  const navigate = useNavigate();

  // Extract pure ID suffix (e.g. "ID -4401" -> "4401")
  const idValue = farmId.replace(/[^0-9]/g, "") || "8472";

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col w-full aspect-[308/380]">
      {/* Image flush to top edges */}
      <div className="relative w-full h-[45%] shrink-0">
        <img
          src={farmlandCard}
          className="h-full w-full object-cover"
          alt="Farmland"
        />
        <div className="absolute top-4 left-4 2xl:top-5 2xl:left-5 bg-white/90 backdrop-blur-sm px-3 py-1 2xl:px-4 2xl:py-1.5 rounded-full">
          <span className="text-[10px] 2xl:text-[13px] font-bold text-[#00696B] uppercase tracking-wider">
            Draft
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 2xl:px-6 2xl:py-5 flex flex-col justify-between flex-1">
        <div>
          <div className="flex justify-between items-start mb-1">
            <div>
              <h3 className="font-bold text-[15px] 2xl:text-[20px] text-[#1A1C1D] flex items-center gap-1">
                {name}{" "}
                <span className="text-[10px] 2xl:text-[13px] font-normal text-gray-400 uppercase tracking-wide">
                  Agent
                </span>
              </h3>
              <p className="text-xs 2xl:text-[16px] text-gray-500 mt-1">Farmland {farmId}</p>
            </div>
            <p className="font-bold text-[#00696B] text-[15px] 2xl:text-[20px]">{amount}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 2xl:gap-5 mt-auto">
          <div className="flex justify-between items-center text-xs 2xl:text-[16px]">
            <span className="text-gray-400">Created On</span>
            <span className="text-[#3D4949] font-medium">{createdOn}</span>
          </div>

          <button 
            onClick={() => navigate(`/field-officer/draft-details/${idValue}`)}
            className={`w-full ${isExpanded ? 'bg-[#E2E8F0] hover:bg-gray-300' : 'bg-[#96C9ED] hover:brightness-95'} h-[44px] 2xl:h-[58px] rounded-full font-bold text-black transition-all uppercase tracking-wider text-sm 2xl:text-[18px] cursor-pointer`}
          >
            VIEW
          </button>
        </div>
      </div>
    </div>
  );
}