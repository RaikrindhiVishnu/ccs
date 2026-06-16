import { useParams, useNavigate } from "react-router-dom";
import DecisionGateway from "@/features/ccs/components/satellite-map/DecisionGateway";

export default function FarmlandRequestGateway() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[90]">
        <DecisionGateway 
          onClose={() => navigate(`/farmland-request/map/${id}`)}
          onAccept={() => navigate(`/farmland-request/gateway-approved/${id}`)}
          onReject={() => navigate('/farmland-request')}
        />
      </div>
    </div>
  );
}
