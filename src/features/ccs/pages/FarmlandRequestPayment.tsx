import { useNavigate, useOutletContext } from "react-router-dom";
import PaymentEngine from "@/features/ccs/components/satellite-map/PaymentEngine";

export default function FarmlandRequestPayment() {
  const navigate = useNavigate();
  const context = useOutletContext<{ isExpanded?: boolean }>();
  const isSidebarExpanded = context?.isExpanded ?? false;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[120]">
        <PaymentEngine 
          onBack={() => navigate(-1)}
          onSendRequest={() => navigate('/farmland-request')}
          isSidebarExpanded={isSidebarExpanded}
        />
      </div>
    </div>
  );
}
