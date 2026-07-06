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
  const responseData = apiResponse?.data || apiResponse;
  
  // Handle if responseData is an array (e.g. from a list endpoint returning one item)
  const actualData = Array.isArray(responseData) ? responseData[0] : responseData;

  // Handle the nested structure of the API response format
  const farmlandDetails = actualData?.farmland_details || actualData;

  let normalizedPolygon: any = null;
  let initialCoords = { lat: 17.014366, lon: 78.423866 };

  if (farmlandDetails?.farmland_polygon) {
    try {
      let polyObj = farmlandDetails.farmland_polygon;
      if (typeof polyObj === 'string') {
        polyObj = JSON.parse(polyObj);
        // Handle double-encoded strings just in case
        if (typeof polyObj === 'string') {
          polyObj = JSON.parse(polyObj);
        }
      }

      if (Array.isArray(polyObj) && polyObj.length > 0 && ('latitude' in polyObj[0] || 'lat' in polyObj[0])) {
        const coordinates = polyObj.map((point: any) => {
          const lat = parseFloat(point.latitude || point.lat);
          const lon = parseFloat(point.longitude || point.lng || point.lon);
          return [lon, lat];
        });
        
        if (coordinates.length > 0) {
          const first = coordinates[0];
          const last = coordinates[coordinates.length - 1];
          if (first[0] !== last[0] || first[1] !== last[1]) {
            coordinates.push([...first]);
          }
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
      } else {
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

  return (
    <div className="relative h-full overflow-hidden">
      <div className="fixed inset-0 z-[100] w-screen h-screen bg-white">
        {!isLoading && actualData && (
          <HistoricalAgronomyAnalysis 
            onBack={() => navigate(`/farmland-request/map/${id}`)} 
            onAuthorize={() => navigate(`/farmland-request/gateway/${id}`)}
            polygon={normalizedPolygon}
            coords={initialCoords}
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
