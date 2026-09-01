import { useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import HistoricalAgronomyAnalysis from "@/features/ccs/components/satellite-map/Historicalagronomyanalysis";
import { useGetAssignedFarmlandDetailsMutation } from "@/features/ccs/api/assignedFarmlandsApi";

export default function FarmlandRequestAnalysis() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useOutletContext<{ isExpanded?: boolean }>();
  const isSidebarExpanded = context?.isExpanded ?? false;

  const [getDetails, { data: apiResponse, isLoading }] = useGetAssignedFarmlandDetailsMutation();

  useEffect(() => {
    if (id) {
      getDetails({ farmland_id: Number(id) as any });
    }
  }, [id, getDetails]);

  // Bulletproof extractor to find nested keys
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

  // Find the details objects no matter how deeply nested they are
  const extractedFarmland = findDeep(apiResponse, 'farmland_details');

  const responseData = apiResponse?.data || apiResponse;
  const actualData = Array.isArray(responseData) ? responseData[0] : responseData;

  const farmlandDetails = extractedFarmland || actualData;

  let normalizedPolygon: any = null;
  let initialCoords = { lat: 17.014366, lon: 78.423866 };

  if (farmlandDetails?.farmland_polygon) {
    try {
      let polyObj = farmlandDetails.farmland_polygon;
      if (typeof polyObj === 'string') {
        try {
          polyObj = JSON.parse(polyObj);
        } catch (e) {
          // Attempt to fix single-quoted JSON strings
          try {
            polyObj = JSON.parse(polyObj.replace(/'/g, '"'));
          } catch (e2) {
            console.error("Failed to parse farmland_polygon:", polyObj);
          }
        }
        if (typeof polyObj === 'string') {
          try { polyObj = JSON.parse(polyObj); } catch(e) {}
        }
      }

      if (Array.isArray(polyObj) && polyObj.length > 0) {
        let coordinates: number[][] = [];
        
        if (typeof polyObj[0] === 'string' && polyObj[0].toLowerCase() === 'polygon') {
          // Format: ["polygon", "lat1", "lon1", "lat2", "lon2", ...]
          for (let i = 1; i < polyObj.length; i += 2) {
            const lat = parseFloat(polyObj[i]);
            const lon = parseFloat(polyObj[i + 1]);
            if (!isNaN(lat) && !isNaN(lon)) {
              coordinates.push([lon, lat]);
            }
          }
        } else if (typeof polyObj[0] === 'object' && polyObj[0] !== null && ('latitude' in polyObj[0] || 'lat' in polyObj[0] || 'lng' in polyObj[0] || 'lon' in polyObj[0])) {
          // Format: [{lat: ..., lng: ...}, ...]
          coordinates = polyObj.map((point: any) => {
            const lat = parseFloat(point.latitude || point.lat);
            const lon = parseFloat(point.longitude || point.lng || point.lon);
            return [lon, lat];
          });
        }

        if (coordinates.length > 0) {
          const first = coordinates[0];
          const last = coordinates[coordinates.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) {
            coordinates.push([...first]);
          }

          normalizedPolygon = {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [coordinates]
            }
          };

          const firstCoord = coordinates[0];
          if (firstCoord) {
            initialCoords = { lat: firstCoord[1], lon: firstCoord[0] };
          }
        }
      } 
      
      if (!normalizedPolygon && polyObj && !Array.isArray(polyObj)) {
        normalizedPolygon = polyObj;
        const geom = polyObj.type === 'Feature' ? polyObj.geometry : polyObj;
        if (geom && geom.coordinates && geom.coordinates[0] && geom.coordinates[0][0]) {
          const firstCoord = Array.isArray(geom.coordinates[0][0][0])
            ? geom.coordinates[0][0][0]
            : geom.coordinates[0][0];

          if (firstCoord && firstCoord.length >= 2) {
            const [lon, lat] = firstCoord;
            initialCoords = { lat, lon };
          }
        }
      }
    } catch (e) {
      // Ignore parse errors for display
    }
  }

  // Extract verdicts dynamically from farmlandDetails if available
  let dynamicVerdicts: any[] | undefined = undefined;
  if (farmlandDetails) {
    if (Array.isArray(farmlandDetails.verification_results)) {
      dynamicVerdicts = farmlandDetails.verification_results;
    } else if (Array.isArray(farmlandDetails.verdicts)) {
      dynamicVerdicts = farmlandDetails.verdicts;
    } else if (farmlandDetails.verification && Array.isArray(farmlandDetails.verification.results)) {
      dynamicVerdicts = farmlandDetails.verification.results;
    }
  }

  // Map to the expected structure if they exist, otherwise undefined to let the child use defaults
  const mappedVerdicts = dynamicVerdicts?.map((v: any) => ({
    title: v.title || v.name || v.check_name || "Verification Check",
    subtitle: v.subtitle || v.description || v.status_text || "Details not provided",
    status: v.status !== false && v.status !== "failed" && v.is_passed !== false
  }));

  const extractedOwner = findDeep(apiResponse, 'owner_details');
  const ownerDetails = extractedOwner || actualData;

  const acres = farmlandDetails?.Total_acres || farmlandDetails?.total_acres || farmlandDetails?.totalArea || farmlandDetails?.totalAcres || ownerDetails?.total_acres || ownerDetails?.totalAcres;
  const labelText = acres ? `${acres} Acres` : undefined;

  return (
    <div className="relative h-full overflow-hidden">
      <div className="fixed inset-0 z-[100] w-screen h-screen bg-white">
        {!isLoading && actualData && (
          <HistoricalAgronomyAnalysis 
            onBack={() => navigate(`/farmland-request/map/${id}`)} 
            onAuthorize={() => navigate(`/farmland-request/gateway/${id}`)}
            polygon={normalizedPolygon}
            coords={initialCoords}
            verdicts={mappedVerdicts}
            isSidebarExpanded={isSidebarExpanded}
            label={labelText}
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
