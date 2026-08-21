import { useParams, useNavigate } from "react-router-dom";
import DecisionGateway from "@/features/ccs/components/satellite-map/DecisionGateway";
import { 
  useRejectAssignedFarmlandMutation
} from "@/features/ccs/api/assignedFarmlandsApi";
import { useAppSelector } from "@/core/hooks";
import { selectCurrentUser } from "@/features/auth/store/authSlice";

export default function FarmlandRequestGateway() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rejectFarmland] = useRejectAssignedFarmlandMutation();
  const currentUser = useAppSelector(selectCurrentUser);

  const handleAccept = async () => {
    navigate(`/farmland-request/gateway-approved/${id}`);
  };

  const handleReject = async () => {
    try {
      if (id) {
        await rejectFarmland({
          farmland_id: Number(id),
          mile_stone_status_id: 4, // 4 is REJCTD (Rejected)
          mile_store_stage_id: 1,
          // @ts-ignore
          userId: currentUser?.id,
          // @ts-ignore
          remarks: "Rejected from Gateway"
        }).unwrap();
      }
    } catch (e) {
      console.error("Failed to reject farmland", e);
    } finally {
      navigate('/farmland-request');
    }
  };

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[90]">
        <DecisionGateway 
          onClose={() => navigate(`/farmland-request/map/${id}`)}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}
