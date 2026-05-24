import { useNavigate } from "react-router-dom";
import avatars from "../../../../assets/dashboard/avatars.png";

interface StandingRow {
  rank: number;
  agent: string;
  farmlands: number;
  saleReports: number;
  faceIdx: number;
}

export default function ChampionshipStandingsTable() {
  const navigate = useNavigate();
  const standings: StandingRow[] = [
    { rank: 4, agent: "Harman Rao", farmlands: 35, saleReports: 12, faceIdx: 3 },
    { rank: 5, agent: "Brij Mohan", farmlands: 33, saleReports: 10, faceIdx: 4 },
    { rank: 6, agent: "Ramesh Oberoi", farmlands: 31, saleReports: 15, faceIdx: 0 },
    { rank: 7, agent: "Lakshaman G.", farmlands: 28, saleReports: 9, faceIdx: 1 },
    { rank: 8, agent: "Rakesh Walia", farmlands: 25, saleReports: 14, faceIdx: 2 },
    { rank: 9, agent: "Ram Varma", farmlands: 22, saleReports: 8, faceIdx: 3 },
    { rank: 10, agent: "Kishan S.", farmlands: 20, saleReports: 11, faceIdx: 4 }
  ];

  return (
    <div className="bg-white shadow-[0px_20px_40px_rgba(0,105,107,0.06)] w-full overflow-hidden rounded-[24px]">
      <div className="px-8 py-6 border-b border-[#E2E2E4]/30">
        <h3 className="text-[#1A1C1D] text-[1.25rem] font-bold">Championship Standings</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[rgba(243,243,245,0.5)] h-[60px]">
              {["Rank", "Agent", "Farmlands", "Sale Reports", "Action"].map((head, i) => (
                <th 
                  key={i} 
                  className={`px-8 text-[12px] font-bold text-[#7D8A8A] uppercase tracking-[0.7px] ${
                    head === "Action" ? "text-right" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E2E4]/30">
            {standings.map((row) => (
              <tr key={row.rank} className="h-[80px] hover:bg-gray-50/50 transition-colors">
                <td className="px-8 font-semibold text-[#1A1C1D] w-[100px]">
                  {row.rank}
                </td>
                <td className="px-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 flex-none">
                      <img 
                        src={avatars} 
                        className="w-full h-full object-cover" 
                        style={{ objectPosition: `${(row.faceIdx % 2) * 100}% ${Math.floor(row.faceIdx / 2) * 50}%` }} 
                        alt={row.agent}
                      />
                    </div>
                    <span className="font-bold text-[#1A1C1D]">{row.agent}</span>
                  </div>
                </td>
                <td className="px-8 text-[#3D4949]">
                  {row.farmlands}
                </td>
                <td className="px-8 text-[#3D4949] font-medium">
                  {row.saleReports}
                </td>
                <td className="px-8 text-right">
                  <button 
                    onClick={() => navigate(`/field-officer/agent-details/${row.agent.split(" ")[0].toLowerCase()}`)}
                    className="bg-transparent border border-[#96C9ED] text-[#1C5F9D] hover:bg-[#96C9ED]/10 text-[12px] font-bold px-5 py-1.5 rounded-full transition-all uppercase cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="h-[65px] flex items-center justify-center border-t border-[#E2E2E4]/30 bg-white">
        <div className="flex items-center gap-4 text-sm font-medium">
          <button className="text-[#7D8A8A] hover:text-[#1A1C1D] transition-colors cursor-pointer flex items-center justify-center w-8 h-8 rounded-full">
            &lt;
          </button>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-[#1C5F9D] text-white font-bold flex items-center justify-center cursor-pointer shadow-sm shadow-[#1C5F9D]/20">
              1
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center cursor-pointer transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center cursor-pointer transition-colors">
              3
            </button>
            <span className="text-[#7D8A8A] px-1 select-none">...</span>
            <button className="w-8 h-8 rounded-full hover:bg-gray-100 text-[#3D4949] flex items-center justify-center cursor-pointer transition-colors">
              8
            </button>
          </div>
          <button className="text-[#7D8A8A] hover:text-[#1A1C1D] transition-colors cursor-pointer flex items-center justify-center w-8 h-8 rounded-full">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
