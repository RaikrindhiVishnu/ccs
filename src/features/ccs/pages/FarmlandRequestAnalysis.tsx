import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HistoricalAgronomyAnalysis from "@/features/ccs/components/satellite-map/Historicalagronomyanalysis";
import { useGetAssignedFarmlandDetailsMutation } from "@/features/ccs/api/assignedFarmlandsApi";

export default function FarmlandRequestAnalysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [getDetails, { data: apiResponse, isLoading }] = useGetAssignedFarmlandDetailsMutation();

  useEffect(() => {
    if (id) {
      getDetails({ farmland_id: id });
    }
  }, [id, getDetails]);

  // Extract the real data from the API response
  const rawData = apiResponse?.data?.farmland_details || apiResponse?.farmland_details || apiResponse?.data || apiResponse;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="fixed inset-0 z-[100] w-screen h-screen bg-white">
        {!isLoading && rawData && (
          <HistoricalAgronomyAnalysis 
            onBack={() => navigate(`/farmland-request/map/${id}`)} 
            onAuthorize={() => navigate(`/farmland-request/gateway/${id}`)}
            polygon={rawData?.farmland_polygon}
          />
        )}
        
        {isLoading && (
          <div className="absolute inset-0 z-[110] bg-white/50 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-[#2780C4] font-medium gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2780C4]"></div>
              Loading details...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
