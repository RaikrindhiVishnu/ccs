import { useParams, useNavigate } from "react-router-dom";
import DecisionGateway from "@/features/ccs/components/satellite-map/DecisionGateway";
import { 
  useApproveAssignedFarmlandMutation,
  useRejectAssignedFarmlandMutation
} from "@/features/ccs/api/assignedFarmlandsApi";

export default function FarmlandRequestGateway() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [approveFarmland] = useApproveAssignedFarmlandMutation();
  const [rejectFarmland] = useRejectAssignedFarmlandMutation();

  const handleAccept = async () => {
    try {
      if (id) {
        await approveFarmland({
          farmland_id: Number(id),
          mile_stone_status_id: 3,
          mile_store_stage_id: 1,
          // @ts-ignore
          remarks: "Approved from Gateway"
        }).unwrap();
      }
    } catch (e) {
      console.error("Failed to approve farmland", e);
    } finally {
      navigate(`/farmland-request/gateway-approved/${id}`);
    }
  };

  const handleReject = async () => {
    try {
      if (id) {
        await rejectFarmland({
          farmland_id: Number(id),
          mile_stone_status_id: 5, // 5 is Rejected
          mile_store_stage_id: 1,
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
