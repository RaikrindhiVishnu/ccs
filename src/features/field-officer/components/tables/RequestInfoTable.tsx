import avatars from "../../../../assets/dashboard/avatars.png";
import { TABLE_DATA } from "../../data/farmlandsData";

type Props = {
  isExpanded?: boolean;
  onViewMore?: () => void;
};

export default function RequestInfoTable({ isExpanded = false, onViewMore }: Props) {
  return (
    <div className="bg-white shadow-[0px_20px_40px_rgba(0,105,107,0.06)] w-full overflow-hidden rounded-[24px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-[rgba(243,243,245,0.5)] h-[60px]">
              {["Agent Name", "Alert ID", "Created Time", "Amount", "Project Status", "Farmland ID", "Published Time", "Actions"].map((head, i) => (
                <th key={i} className="px-8 text-[12px] font-bold text-[#3D4949] uppercase tracking-[0.7px]">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E2E4]/30">
            {TABLE_DATA.map((row, idx) => (
              <tr key={idx} className="h-[88.5px] hover:bg-gray-50 transition-colors">
                <td className="px-8">
                  <div className="flex items-center gap-3">
                    <img 
                      src={avatars} 
                      className="w-10 h-10 rounded-full object-cover" 
                      style={{ objectPosition: `${(row.faceIdx % 2) * 100}% ${Math.floor(row.faceIdx / 2) * 50}%` }} 
                      alt={row.agent}
                    />
                    <span className="font-bold text-[#1A1C1D]">{row.agent}</span>
                  </div>
                </td>
                <td className="px-8 text-[#3D4949]">{row.id}</td>
                <td className="px-8 text-[#3D4949]">{row.time}</td>
                <td className="px-8 font-bold text-[#1A1C1D]">{row.amount}</td>
                <td className="px-8">
                  <span className="bg-[#B45309] text-white px-3 py-1 rounded-full text-[12px] font-bold">
                    Returned
                  </span>
                </td>
                <td className="px-8 text-[#3D4949] font-medium">{row.farmId}</td>
                <td className="px-8 text-[#3D4949]">{row.pubTime}</td>
                <td className="px-8">
                  <button className="bg-[#96C9ED] text-black text-[12px] font-bold px-4 py-1.5 rounded-full hover:brightness-90 transition-all uppercase">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {!isExpanded ? (
        <div className="h-[65px] flex items-center justify-center border-t border-gray-100 bg-white">
          <button onClick={onViewMore} className="text-[18px] font-bold hover:opacity-70 transition-opacity">
            View More
          </button>
        </div>
      ) : (
        <div className="h-[65px] flex items-center justify-between border-t border-gray-100 bg-white px-8">
          <div className="text-[#3D4949] text-sm">
            Showing <span className="font-bold text-black">1 - 7</span> of <span className="font-bold text-black">1,284</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <button className="flex items-center gap-1 text-[#3D4949] hover:text-black">
              <span className="mb-[2px]">&lt;</span> Previous
            </button>
            <div className="flex items-center gap-1 mx-2">
              <button className="w-8 h-8 rounded-full bg-[#96C9ED] text-black font-bold flex items-center justify-center">1</button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center">2</button>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center">3</button>
              <span className="text-[#3D4949] px-1">...</span>
              <button className="w-10 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center">1284</button>
            </div>
            <button className="flex items-center gap-1 text-[#3D4949] hover:text-black">
              Next <span className="mb-[2px]">&gt;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
