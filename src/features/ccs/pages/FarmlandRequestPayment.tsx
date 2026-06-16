import { useNavigate } from "react-router-dom";
import PaymentEngine from "@/features/ccs/components/satellite-map/PaymentEngine";

export default function FarmlandRequestPayment() {
  const navigate = useNavigate();

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[120]">
        <PaymentEngine 
          onBack={() => navigate(-1)}
          onSendRequest={() => navigate('/farmland-request')}
        />
      </div>
    </div>
  );
}
