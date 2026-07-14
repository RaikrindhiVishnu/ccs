import { useParams, useNavigate } from "react-router-dom";
import GatewayApproved from "@/features/ccs/components/satellite-map/GatewayApproved";

export default function FarmlandRequestGatewayApproved() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[110]">
        <GatewayApproved 
          onBack={() => navigate(`/farmland-request/gateway/${id}`)}
          onProceed={() => navigate(`/farmland-request/payment/${id}`)}
        />
      </div>
    </div>
  );
}
