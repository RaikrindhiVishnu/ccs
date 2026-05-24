import { useNavigate, useParams } from "react-router-dom";
import TopThreeSection from "../components/leaderboard/TopThreeSection";
import ChampionshipStandingsTable from "../components/leaderboard/ChampionshipStandingsTable";

export default function TopPerformerDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="w-full max-w-[1658px] 2xl:max-w-[1900px] mx-auto px-6 xl:px-10 2xl:px-14 py-10 flex flex-col gap-6 pb-10">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between mt-2">
        <button 
          onClick={() => navigate("/field-officer/dashboard")}
          className="bg-white hover:bg-gray-50 border border-gray-200 shadow-sm text-sm font-bold text-[#3D4949] px-6 h-[46px] rounded-full flex items-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 active:translate-x-0"
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Go back to dashboard
        </button>

        {id && (
          <span className="text-[12px] bg-[#96C9ED]/20 text-[#1C5F9D] px-4 py-1.5 rounded-full font-bold uppercase tracking-wider">
            Viewing: {id}
          </span>
        )}
      </div>

      {/* Top Three Podium Section */}
      <TopThreeSection />

      {/* Championship Standings Table Section */}
      <ChampionshipStandingsTable />
    </div>
  );
}
