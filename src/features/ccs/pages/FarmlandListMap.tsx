import { useParams, useNavigate } from "react-router-dom";
import { FARMLAND_DETAILS } from "@/features/ccs/data/FarmlandDetailData";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import DummyMap from "@/features/ccs/components/satellite-map/DummyMap";

export default function FarmlandListMap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const detail = id ? FARMLAND_DETAILS[id] ?? null : null;

  return (
    <div className="fixed inset-0 z-[100] bg-black pointer-events-auto">
      {/* Satellite map fills the whole screen */}
      <DummyMap />

      {/* Detail panel + Go back button on top of map */}
      <FarmlandDetailPanel
        detail={detail}
        open={true}
        onClose={() => navigate('/farmland-list')}
        hideAnalysisButton={true}
      />
    </div>
  );
}
