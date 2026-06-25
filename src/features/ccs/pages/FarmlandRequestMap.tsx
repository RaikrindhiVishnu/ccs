import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import type { FarmlandDetail } from "@/features/ccs/components/FarmlandDetailPanel";
import DummyMap from "@/features/ccs/components/satellite-map/DummyMap";
import { useGetAssignedFarmlandDetailsMutation } from "@/features/ccs/api/assignedFarmlandsApi";

export default function FarmlandRequestMap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [getDetails, { data: apiResponse, isLoading }] = useGetAssignedFarmlandDetailsMutation();

  useEffect(() => {
    if (id) {
      getDetails({ farmland_id: id });
    }
  }, [id, getDetails]);

  // Extract the real data from the API response
  const rawData = apiResponse?.data || apiResponse;

  let detail: FarmlandDetail | null = null;

  if (rawData && !isLoading) {
    // Map backend keys to expected UI keys
    detail = {
      id: rawData.farmland_id?.toString() || id || "",
      farmlandId: rawData.farmland_code || rawData.glcId || "N/A",
      ownerName: rawData.owner_name || rawData.agent_name || rawData.ownerName || "N/A",
      number: rawData.contact_number || rawData.number || "N/A",
      email: rawData.email || "N/A",
      dateOfBirth: rawData.dob || rawData.dateOfBirth || "N/A",
      religion: rawData.religion || "N/A",
      caste: rawData.caste || "N/A",
      valuation: rawData.price_per_acre ? `₹ ${rawData.price_per_acre.toLocaleString()}/Acre` : rawData.valuation || "N/A",
      totalArea: rawData.total_acres ? `${rawData.total_acres} Acres` : rawData.totalArea || "N/A",
      assetValue: rawData.total_asset_price || rawData.assetValue || "N/A",
      status: rawData.status === "COMPLETED" ? "COMPLETED" : rawData.status === "REJECTED" ? "REJECTED" : rawData.status === "ACTIVE" ? "ACTIVE" : "PENDING",
      liveOnWebsite: rawData.live_on_website || false,
      fieldNotes: rawData.field_notes || rawData.fieldNotes || undefined,
    };
  }

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
    </div>
  );
}
