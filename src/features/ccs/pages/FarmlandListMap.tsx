import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FarmlandDetailPanel from "@/features/ccs/components/FarmlandDetailPanel";
import type { FarmlandDetail } from "@/features/ccs/components/FarmlandDetailPanel";
import { SatelliteMap } from "@/features/satellite-history/components/SatelliteMap";
import { useWaybackSource } from "@/features/satellite-history/hooks/useWaybackSource";
import { useGetAssignedFarmlandDetailsMutation, useGetAllAssignedFarmlandsMutation } from "@/features/ccs/api/assignedFarmlandsApi";
import "@/features/satellite-history/satellite-history.css";

export default function FarmlandListMap() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [getDetails, { data: apiResponse, isLoading }] = useGetAssignedFarmlandDetailsMutation();
  const [getAllFarmlands, { data: allFarmlandsData }] = useGetAllAssignedFarmlandsMutation();

  useEffect(() => {
    if (id) {
      getDetails({ farmland_id: Number(id) });
      getAllFarmlands({ status_ids: [1, 2, 3, 4, 5, 6], limit: 500, offset: 0 }); // Fallback to grab field notes missing from getDetails
    }
  }, [id, getDetails, getAllFarmlands]);

  const allFarmlandsList = (allFarmlandsData as any)?.farmlands || (allFarmlandsData as any)?.data || [];
  const matchingFarmlandFromList = allFarmlandsList.find((f: any) => String(f.farmland_id) === String(id) || String(f.id) === String(id));

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
  const extractedOwner = findDeep(apiResponse, 'owner_details');

  const rawData = apiResponse?.data || apiResponse;
  const actualData = Array.isArray(rawData) ? rawData[0] : rawData;

  const farmlandDetails = extractedFarmland || actualData;
  const ownerDetails = extractedOwner || actualData;

  // Use a default date to fetch the satellite tile URL for the background, exactly as in Analysis
  const { sourceConfig } = useWaybackSource("2020-01-01");
  let initialCoords = { lat: 17.014366, lon: 78.423866 }; // default fallback

  // Helper to format coordinates to DMS (Degrees, Minutes, Seconds)
  const formatDMS = (lat: number, lon: number) => {
    const toDMS = (deg: number, isLat: boolean) => {
      const absolute = Math.abs(deg);
      const degrees = Math.floor(absolute);
      const minutesNotTruncated = (absolute - degrees) * 60;
      const minutes = Math.floor(minutesNotTruncated);
      const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
      const direction = isLat ? (deg >= 0 ? "N" : "S") : (deg >= 0 ? "E" : "W");
      return `${degrees}°${minutes}′${seconds}″${direction}`;
    };
    return `${toDMS(lat, true)} ${toDMS(lon, false)}`;
  };

  let displayCoords = "17°00′51.72″N 78°25′25.92″E"; // default fallback
  let normalizedPolygon: any = null;

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

        // Use centroid (average of all vertices) as the map center,
        // not just the first corner of the polygon.
        if (coordinates.length > 0) {
          const sumLon = coordinates.reduce((s: number, c: number[]) => s + c[0], 0);
          const sumLat = coordinates.reduce((s: number, c: number[]) => s + c[1], 0);
          const centLon = sumLon / coordinates.length;
          const centLat = sumLat / coordinates.length;
          initialCoords = { lat: centLat, lon: centLon };
          displayCoords = formatDMS(centLat, centLon);
        }
      } else {
        normalizedPolygon = polyObj;
        const geom = polyObj.type === 'Feature' ? polyObj.geometry : polyObj;
        if (geom && geom.coordinates && geom.coordinates[0] && geom.coordinates[0].length > 0) {
          // For Polygon: geom.coordinates[0] is the ring array of [lon, lat] pairs
          // For MultiPolygon: geom.coordinates[0][0] is the ring
          const ring: number[][] = Array.isArray(geom.coordinates[0][0][0])
            ? geom.coordinates[0][0] as number[][]      // MultiPolygon
            : geom.coordinates[0] as number[][];        // Polygon

          if (ring.length > 0) {
            // Compute centroid of the ring for a correct map center
            const sumLon = ring.reduce((s, c) => s + c[0], 0);
            const sumLat = ring.reduce((s, c) => s + c[1], 0);
            const centLon = sumLon / ring.length;
            const centLat = sumLat / ring.length;
            initialCoords = { lat: centLat, lon: centLon };
            displayCoords = formatDMS(centLat, centLon);
          }
        }
      }
    } catch (e) {
      // Ignore parse errors for display
    }
  }

  let detail: FarmlandDetail | null = null;

  if (rawData && !isLoading) {
    // Map backend keys to expected UI keys
    detail = {
      id: farmlandDetails.farmland_id?.toString() || id || "",
      farmlandId: farmlandDetails.farmland_code || farmlandDetails.glcId || "N/A",
      ownerName: ownerDetails.owner_name || ownerDetails.agent_name || ownerDetails.ownerName || "N/A",
      number: ownerDetails["phone number"] || ownerDetails.contact_number || ownerDetails.number || "N/A",
      email: ownerDetails["Email address"] || ownerDetails.email || "N/A",
      dateOfBirth: ownerDetails.dob || ownerDetails.dateOfBirth || "N/A",
      religion: ownerDetails.religion || "N/A",
      caste: ownerDetails.caste || "N/A",
      valuation: (() => {
        let rawVal = farmlandDetails.per_acre_value || farmlandDetails.price_per_acre || farmlandDetails.valuation || ownerDetails.per_acre_value || ownerDetails.price_per_acre;
        let finalVal = "N/A";
        
        if (rawVal && Number(rawVal) !== 0) {
          const num = Number(String(rawVal).replace(/[^0-9.-]+/g, ""));
          if (!isNaN(num) && num > 0) {
             finalVal = `₹ ${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })}/Acre`;
          }
        }
        
        if (finalVal === "N/A") {
          const asset = farmlandDetails.Assest_value || farmlandDetails.total_asset_price || farmlandDetails.assetValue || ownerDetails.total_asset_price || ownerDetails.assetValue;
          const acres = farmlandDetails.Total_acres || farmlandDetails.total_acres || farmlandDetails.totalArea || farmlandDetails.totalAcres || ownerDetails.total_acres || ownerDetails.totalAcres;
          if (asset && acres) {
            const numAsset = Number(String(asset).replace(/[^0-9.-]+/g, ""));
            const numAcres = Number(String(acres).replace(/[^0-9.-]+/g, ""));
            if (!isNaN(numAsset) && !isNaN(numAcres) && numAcres > 0) {
              finalVal = `₹ ${(numAsset / numAcres).toLocaleString('en-IN', { maximumFractionDigits: 2 })}/Acre`;
            }
          }
        }
        return finalVal;
      })(),
      totalArea: farmlandDetails.Total_acres ? `${farmlandDetails.Total_acres} Acres` : farmlandDetails.total_acres ? `${farmlandDetails.total_acres} Acres` : farmlandDetails.totalArea || "N/A",
      assetValue: farmlandDetails.Assest_value || farmlandDetails.total_asset_price || farmlandDetails.assetValue || "N/A",
      status: (farmlandDetails.status_id === 5 || farmlandDetails.status_id === 4 || farmlandDetails.mile_stone_status_id === 4 || farmlandDetails.status === "REJECTED") ? "REJECTED" : (farmlandDetails.status_id === 3 || farmlandDetails.status_id === 2 || farmlandDetails.status === "APPROVED" || farmlandDetails.status === "ACTIVE") ? "ACTIVE" : (farmlandDetails.status_id === 1 || farmlandDetails.status === "PENDING") ? "PENDING" : farmlandDetails.status === "COMPLETED" ? "COMPLETED" : "PENDING",
      liveOnWebsite: farmlandDetails.live_on_website || false,
      fieldNotes: farmlandDetails.field_notes || matchingFarmlandFromList?.field_notes || matchingFarmlandFromList?.fieldNotes || actualData.field_notes || actualData.fieldNotes || farmlandDetails.fieldNotes || farmlandDetails.remarks || farmlandDetails.notes || ownerDetails.field_notes || ownerDetails.fieldNotes || ownerDetails.remarks || ownerDetails.notes || undefined,
    };
  }

  return (
    <div className="relative h-full overflow-hidden">
      <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#FFFFFF] z-[100] opacity-100 pointer-events-auto">
        <div className="relative w-full h-full overflow-hidden bg-[#131600]">
          {/* The Map */}
          {!isLoading && farmlandDetails && (
            <div className="absolute inset-0 z-0">
              {normalizedPolygon ? (
                <>
                  <SatelliteMap
                    tileUrl={sourceConfig?.url ?? ""}
                    maxzoom={sourceConfig?.maxzoom ?? 18}
                    coords={initialCoords}
                    interactive={true}
                    polygon={normalizedPolygon}
                    label={farmlandDetails.total_acres ? `${farmlandDetails.total_acres} Acres` : undefined}
                  />

                  {/* Map controls (bottom right) */}
                  <div className="absolute bottom-6 right-4 flex flex-col items-center gap-1 z-10 pointer-events-none">
                    <div className="flex items-center gap-1 rounded-full bg-black/50 px-3 py-1">
                      <span className="text-[0.65rem] font-medium text-white">3D</span>
                    </div>
                  </div>

                  {/* Bottom stats overlay for coordinates */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-black/40 px-4 py-1 z-10 pointer-events-none">
                    <span className="text-[0.6rem] text-white/70">Camera: 991 m</span>
                    <span className="text-[0.6rem] text-white/70">{displayCoords}</span>
                    <span className="text-[0.6rem] text-white/70">704 m</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#F3F4F6] text-[#6B7280]">
                  <div className="flex flex-col items-center gap-2 bg-white/80 p-6 rounded-[16px] shadow-sm">
                    <span className="text-[16px] font-semibold">No Map Data</span>
                    <span className="text-[14px]">Polygon coordinates are not available for this farmland.</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* The Detail Panel */}
          <FarmlandDetailPanel
            detail={detail}
            open={true}
            onClose={() => navigate('/farmland-list')}
            onHistoricalAnalysis={() => navigate(`/farmland-request/analysis/${id}`)}
            hideAnalysisButton={true}
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
