import { useNavigate } from "react-router-dom";

type Props = {
  id: string;
  rank: number;
  name: string;
  role: string;
  deals: number;
};

export default function PerformerCard({
  id,
  rank,
  name,
  role,
  deals,
}: Props) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/field-officer/top-performer/${id}`)}
      className="bg-[#F9F9FB] rounded-[16px] 2xl:rounded-[21px] p-[clamp(0.75rem,1.5vw,1.25rem)] 2xl:p-[26px] flex items-center h-[90px] 2xl:h-[120px] cursor-pointer hover:bg-gray-100 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
      <div className="w-10 h-10 2xl:w-[53px] 2xl:h-[53px] bg-[#D7EBF7] rounded-full flex items-center justify-center flex-none mr-4 2xl:mr-6">
        <span className="font-bold text-black 2xl:text-[1.25rem]">{rank}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-[1.125rem] 2xl:text-[1.5rem] truncate">
          {name}
        </h4>

        <p className="text-sm 2xl:text-[1.125rem] text-[#3D4949] truncate">
          {role}
        </p>
      </div>

      <div className="text-right flex-none">
        <div className="font-bold text-[1.5rem] 2xl:text-[2rem] leading-none">
          {deals}
        </div>

        <div className="text-[0.75rem] 2xl:text-[1rem] text-[#3D4949] uppercase tracking-wider mt-1 2xl:mt-2">
          Deals
        </div>
      </div>
    </div>
  );
}
