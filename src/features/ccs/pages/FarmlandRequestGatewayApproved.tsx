import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GatewayApproved from "@/features/ccs/components/satellite-map/GatewayApproved";
import { useGetAssignedFarmlandDetailsMutation, useGetAssignedOfficersMutation } from "@/features/ccs/api/assignedFarmlandsApi";

export default function FarmlandRequestGatewayApproved() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [getDetails, { data: apiResponse, isLoading }] = useGetAssignedFarmlandDetailsMutation();
  const [getOfficers, { data: officersResponse, isLoading: isOfficersLoading }] = useGetAssignedOfficersMutation();

  useEffect(() => {
    if (id) {
      getDetails({ farmland_id: Number(id) });
      getOfficers({ farmland_id: Number(id) });
    }
  }, [id, getDetails, getOfficers]);

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
  const farmlandDetails = extractedFarmland || actualData || {};

  // Make officer extraction extremely robust
  let extractedOfficers: any[] = [];
  const findOfficersArray = (obj: any): any[] | null => {
    if (!obj || typeof obj !== 'object') return null;
    if (Array.isArray(obj)) {
      // Check if it looks like an officer array
      if (obj.length > 0 && obj[0] && typeof obj[0] === 'object' && ('role' in obj[0] || 'name' in obj[0])) {
        return obj;
      }
    }
    if (obj.assigned_officers && Array.isArray(obj.assigned_officers)) return obj.assigned_officers;
    if (obj.officers && Array.isArray(obj.officers)) return obj.officers;
    if (obj.data && Array.isArray(obj.data)) return obj.data;
    
    for (const k in obj) {
      if (typeof obj[k] === 'object') {
        const res = findOfficersArray(obj[k]);
        if (res) return res;
      }
    }
    return null;
  };

  const foundOfficers = findOfficersArray(officersResponse);
  
  if (foundOfficers) {
    extractedOfficers = foundOfficers;
  } else if (officersResponse?.data && typeof officersResponse.data === 'object' && !Array.isArray(officersResponse.data)) {
    // If it's an object mapped by role keys like regional_officer, field_officer, district_officer
    const dataObj = officersResponse.data;
    if (dataObj.regional_officer) {
      extractedOfficers.push({
        role: 'RO',
        name: dataObj.regional_officer.ro_name || 'NA',
        profile_url: dataObj.regional_officer.ro_img
      });
    }
    if (dataObj.field_officer) {
      extractedOfficers.push({
        role: 'FO',
        name: dataObj.field_officer.fo_name || 'NA',
        profile_url: dataObj.field_officer.fo_img
      });
    }
    // backend sends district_officer
    if (dataObj.district_officer) {
      extractedOfficers.push({
        role: 'IO',
        name: dataObj.district_officer.do_name || 'NA',
        profile_url: dataObj.district_officer.do_img
      });
    }
    // Also try checking old keys just in case
    if (extractedOfficers.length === 0) {
      extractedOfficers = Object.values(officersResponse.data).filter((v: any) => v && typeof v === 'object' && (v.name || v.role));
    }
  } else if (typeof officersResponse === 'object' && officersResponse !== null) {
    extractedOfficers = Object.values(officersResponse).filter((v: any) => v && typeof v === 'object' && (v.name || v.role));
  }

  // Fallback to farmland details
  if (extractedOfficers.length === 0) {
    extractedOfficers = farmlandDetails?.assigned_officers || farmlandDetails?.officers || [];
  }

  console.log("GatewayApproved extracted officers:", extractedOfficers, "Raw response:", officersResponse);

  const combinedDetails = {
    ...farmlandDetails,
    assigned_officers: extractedOfficers
  };

  const isPageLoading = isLoading || isOfficersLoading;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-0 z-[110] bg-white">
        {!isPageLoading && (
          <GatewayApproved 
            onBack={() => navigate(`/farmland-request/gateway/${id}`)}
            onProceed={(fees) => navigate(`/farmland-request/payment/${id}`, { state: fees })}
            farmlandDetails={combinedDetails}
          />
        )}
        
        {isPageLoading && (
          <div className="flex items-center justify-center w-full h-full text-[#2780C4] font-medium gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2780C4]"></div>
            Loading details...
          </div>
        )}
      </div>
    </div>
  );
}
