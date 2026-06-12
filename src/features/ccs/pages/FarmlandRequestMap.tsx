import { useParams, useNavigate } from "react-router-dom";
import { FARMLAND_DETAILS } from "@/features/ccs/data/FarmlandDetailData";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import DummyMap from "@/features/ccs/components/satellite-map/DummyMap";

export default function FarmlandRequestMap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const detail = id ? FARMLAND_DETAILS[id] ?? null : null;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#FFFFFF] z-[100] opacity-100 pointer-events-auto">
        <div className="relative w-full h-full overflow-hidden bg-[#E5E7EB]">
          {/* The Map */}
          <DummyMap />

          {/* The Detail Panel */}
          <FarmlandDetailPanel
            detail={detail}
            open={true}
            onClose={() => navigate('/farmland-request')}
            onHistoricalAnalysis={() => navigate(`/farmland-request/analysis/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
