import { useParams, useNavigate } from "react-router-dom";
import HistoricalAgronomyAnalysis from "@/features/ccs/components/satellite-map/Historicalagronomyanalysis";

export default function FarmlandRequestAnalysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden">
      <div className="fixed inset-0 z-[100] w-screen h-screen bg-white">
        <HistoricalAgronomyAnalysis 
          onBack={() => navigate(`/farmland-request/map/${id}`)} 
          onAuthorize={() => navigate(`/farmland-request/gateway/${id}`)}
        />
      </div>
    </div>
  );
}
