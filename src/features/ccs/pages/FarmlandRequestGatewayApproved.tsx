import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GatewayApproved from "@/features/ccs/components/satellite-map/GatewayApproved";
import { useGetAssignedFarmlandDetailsMutation } from "@/features/ccs/api/assignedFarmlandsApi";

export default function FarmlandRequestGatewayApproved() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [getDetails, { data: apiResponse, isLoading }] = useGetAssignedFarmlandDetailsMutation();

  useEffect(() => {
    if (id) {
      getDetails({ farmland_id: Number(id) });
    }
  }, [id, getDetails]);

  // Extract nested farmland_details if wrapped
  const findDeep = (obj: any, key: string): any => {
    if (!obj || typeof obj !== 'object') return null;
    if (key in obj) return obj[key];
    for (const k in obj) {
      if (typeof obj[k] === 'object') {
        const res = findDeep(obj[k], key);
        if (res) return res;
      }
    }
    return null;
  };
  const extractedFarmland = findDeep(apiResponse, 'farmland_details');
  const responseData = apiResponse?.data || apiResponse;
  const actualData = Array.isArray(responseData) ? responseData[0] : responseData;
  const farmlandDetails = extractedFarmland || actualData;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[110] bg-white">
        {!isLoading && (
          <GatewayApproved 
            onBack={() => navigate(`/farmland-request/gateway/${id}`)}
            onProceed={() => navigate(`/farmland-request/payment/${id}`)}
            farmlandDetails={farmlandDetails}
          />
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center w-full h-full text-[#2780C4] font-medium gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2780C4]"></div>
            Loading details...
          </div>
        )}
      </div>
    </div>
  );
}
