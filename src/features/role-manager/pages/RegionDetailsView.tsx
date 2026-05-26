import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Briefcase, Pencil, UserCircle, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { BackButton } from "@/components/ui/BackButton";

import { useGetAllGeoJsonDataQuery, useGetRegionsByCountryIdQuery, useGetRegionGeoJsonQuery } from "../api/regionSelectionApi";
import { decompressGeoJSON } from "../utils/utils";
import {
  useGetAllRegionalOfficersMutation,
  useGetAllIntelligenceOfficersMutation,
} from "../api/roleManagerApi";

// Mock API Hook for Region Details
const useGetRegionDetailsMockQuery = (regionId: string | undefined) => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!regionId) return;
    const timer = setTimeout(() => {
      setData({
        region_name: "Godavari",
        region_code: "GLC R00012",
        created_date: "4/18/2026",
        created_time: "10:15 PM",
        regional_officer: {
          name: "Ram Kishore",
          code: "RK-8821",
          avatar_url: "https://i.pravatar.cc/150?u=ram",
        },
        intelligence_officer: {
          name: "Sravan Kumar",
          code: "NL-0045",
          avatar_url: null, // Test fallback icon
        },
      });
      setIsLoading(false);
    }, 500); // simulate network delay

    return () => clearTimeout(timer);
  }, [regionId]);

  return { data, isLoading };
};

const getDistrictIdsFromRegion = (feature: any, masterData: any): number[] => {
  const props = feature?.properties || {};
  if (Array.isArray(props.districts)) {
    const ids = props.districts.map((d: any) => Number(d.id || d.i || d.district_id)).filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }
  if (Array.isArray(props.district_ids)) {
    const ids = props.district_ids.map(Number).filter((id: number) => !isNaN(id) && id > 0);
    if (ids.length > 0) return ids;
  }
  if (typeof props.all_districts === "string" && props.all_districts.trim() !== "" && masterData) {
    const targetNames = props.all_districts.split(",").map((n: string) => n.trim().toLowerCase());
    const matched: number[] = [];
    masterData.countries.forEach((c: any) =>
      c.states?.forEach((s: any) =>
        s.districts?.forEach((d: any) => { if (targetNames.includes(d.d.toLowerCase())) matched.push(d.i); })
      )
    );
    return matched;
  }
  return [];
};

const buildRegionFeatureFromDistricts = (rawFeature: any, masterData: any): GeoJSON.Feature | null => {
  const props = rawFeature.properties || {};
  const stateId = Number(props.state_id);
  const districtIds = getDistrictIdsFromRegion(rawFeature, masterData);
  if (districtIds.length === 0) return null;
  const stateObj = masterData.countries.flatMap((c: any) => c.states ?? []).find((s: any) => s.i === stateId);
  if (!stateObj) return null;
  const geometries: any[] = districtIds
    .map((id) => stateObj.districts?.find((d: any) => d.i === id)?.g)
    .filter((g: any) => !!g && !!g.type);
  if (geometries.length === 0) return null;
  return {
    type: "Feature",
    id: props.region_id ?? rawFeature.id,
    geometry: { type: "GeometryCollection", geometries } as any,
    properties: props,
  };
};

const getFeatureBounds = (feature: any): maplibregl.LngLatBoundsLike => {
  const bounds = new maplibregl.LngLatBounds();
  let hasValidCoords = false;
  const extendBounds = (coords: any[]) => {
    coords.forEach((c) => {
      if (Array.isArray(c[0])) extendBounds(c);
      else if (typeof c[0] === 'number' && typeof c[1] === 'number') {
        bounds.extend(c as [number, number]);
        hasValidCoords = true;
      }
    });
  };
  const g = feature.geometry;
  if (g.type === "GeometryCollection") {
    (g.geometries as any[]).forEach((geo: any) => {
      if (geo?.coordinates) extendBounds(geo.coordinates);
    });
  } else if (g?.coordinates) {
    extendBounds(g.coordinates);
  }
  return hasValidCoords ? bounds : [[68.7, 8.4], [97.2, 37.6]]; // Fallback to India bounds
};

const RegionDetailsView: React.FC = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const [geoMasterData, setGeoMasterData] = useState<any | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoadingOfficers, setIsLoadingOfficers] = useState(true);

  // Queries to fetch the same master data already cached in the app
  const { data: allGeoJsonData, isLoading: isLoadingGeoJson } = useGetAllGeoJsonDataQuery();
  const { data: regionsByCountryData } = useGetRegionsByCountryIdQuery(
    { country_id: 1 },
    { skip: !geoMasterData }
  );

  // Call the region/get_region_geojson API dynamically based on route param
  const { data: regionGeoJsonData, isLoading: isLoadingRegionGeo } = useGetRegionGeoJsonQuery(
    { region_id: Number(regionId) },
    { skip: !regionId }
  );

  const isPageLoading = isLoadingRegionGeo || isLoadingOfficers || !regionGeoJsonData;

  useEffect(() => {
    if (regionGeoJsonData) {
      console.log(
        `[RegionDetailsView] get_region_geojson response for region_id ${regionId}:`,
        regionGeoJsonData
      );
    }
  }, [regionGeoJsonData, regionId]);

  const { data: mockData } = useGetRegionDetailsMockQuery(regionId);

  // Fetch officer lists to match IDs with name & code
  const [getAllRegionalOfficers] = useGetAllRegionalOfficersMutation();
  const [getAllIntelligenceOfficers] = useGetAllIntelligenceOfficersMutation();
  const [regionalOfficersList, setRegionalOfficersList] = useState<any[]>([]);
  const [intelligenceOfficersList, setIntelligenceOfficersList] = useState<any[]>([]);

  useEffect(() => {
    const fetchOfficers = async () => {
      try {
        setIsLoadingOfficers(true);
        const regRes = await getAllRegionalOfficers({ is_assigned: 1 }).unwrap();
        const regData = Array.isArray(regRes?.data) ? regRes.data : Array.isArray(regRes) ? regRes : [];
        setRegionalOfficersList(regData);

        const intRes = await getAllIntelligenceOfficers({ is_assigned: 1 }).unwrap();
        const intData = Array.isArray(intRes?.data) ? intRes.data : Array.isArray(intRes) ? intRes : [];
        setIntelligenceOfficersList(intData);
      } catch (err) {
        console.error("Failed to load officers directories:", err);
      } finally {
        setIsLoadingOfficers(false);
      }
    };
    fetchOfficers();
  }, [getAllRegionalOfficers, getAllIntelligenceOfficers]);

  // Fetch geo master data
  useEffect(() => {
    if (!allGeoJsonData?.success || !allGeoJsonData?.data) return;
    const fetchGeoData = async () => {
      try {
        const response = await fetch(allGeoJsonData.data);
        if (response.ok) {
          const parsed = await response.json();
          setGeoMasterData(parsed);
        }
      } catch (err) {
        console.error("Failed to fetch Master GeoJSON data:", err);
      }
    };
    fetchGeoData();
  }, [allGeoJsonData]);

  // Parse the geojson response whether it is nested inside "data" or raw
  const geojsonObj = useMemo(() => {
    if (!regionGeoJsonData) return null;
    if (regionGeoJsonData.type === "FeatureCollection" || regionGeoJsonData.type === "Feature") {
      return regionGeoJsonData;
    }
    if (regionGeoJsonData.data?.type === "FeatureCollection" || regionGeoJsonData.data?.type === "Feature" || regionGeoJsonData.data?.features) {
      return regionGeoJsonData.data;
    }
    return regionGeoJsonData;
  }, [regionGeoJsonData]);

  // Extract the decompressed regions and reconstruct full geometry
  const resolvedFeature = useMemo(() => {
    // 1. Try to use the dynamic GeoJSON feature from geojsonObj first!
    if (geojsonObj?.features?.[0]) {
      return geojsonObj.features[0];
    }
    // 2. Try to find region in decompressed data
    if (regionsByCountryData && geoMasterData && regionId) {
      try {
        const decompressed = decompressGeoJSON(regionsByCountryData);
        const targetId = Number(regionId);
        const rawRegion = decompressed.features?.find((f: any) => {
          const id = f.properties?.region_id || f.id;
          return Number(id) === targetId;
        });
        if (rawRegion) {
          const fullFeature = buildRegionFeatureFromDistricts(rawRegion, geoMasterData);
          if (fullFeature) return fullFeature;
        }
      } catch (err) {
        console.error("Failed to reconstruct full region geometry:", err);
      }
    }
    // 3. Fallback to router state feature
    return location.state?.feature || null;
  }, [geojsonObj, regionsByCountryData, geoMasterData, regionId, location.state]);

  const apiProperties = geojsonObj?.features?.[0]?.properties;


  const regionName = apiProperties?.name || mockData?.region_name || resolvedFeature?.properties?.region_name || resolvedFeature?.properties?.regionName || "Loading...";
  const regionCode = apiProperties?.region_code || mockData?.region_code || resolvedFeature?.properties?.region_code || resolvedFeature?.properties?.regionCode || "—";

  // Parse created_on
  const createdDateVal = useMemo(() => {
    if (apiProperties?.created_on) {
      try {
        const d = new Date(apiProperties.created_on);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });
        }
      } catch {}
    }
    // return mockData?.created_date || "—";
  }, [apiProperties?.created_on, mockData?.created_date]);

  const createdTimeVal = useMemo(() => {
    if (apiProperties?.created_on) {
      try {
        const d = new Date(apiProperties.created_on);
        if (!isNaN(d.getTime())) {
          return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
        }
      } catch {}
    }
    // return mockData?.created_time || "—";
  }, [apiProperties?.created_on, mockData?.created_time]);

  const districtNames = apiProperties?.district || resolvedFeature?.properties?.district || resolvedFeature?.properties?.districts || "";

  // Resolve assigned officer details
  const regOfficer = useMemo(() => {
    const rawId = apiProperties?.regional_officer_id;
    const hasId = rawId && Number(rawId) !== 0 && String(rawId) !== "null";
    
    if (hasId) {
      const matched = regionalOfficersList.find(o => Number(o.id) === Number(rawId));
      if (matched) {
        const fullName = `${matched.first_name || ""} ${matched.last_name || ""}`.trim();
        const officerCode = matched.code && matched.id ? `${matched.code}-${matched.id}` : `RO-${matched.id}`;
        return {
          name: fullName || "Unnamed Officer",
          code: officerCode,
          avatar_url: matched.avatar_url || null,
        };
      }
    }
    
    // if (mockData?.regional_officer) {
    //   return mockData.regional_officer;
    // }

    return {
      name: "Unassigned",
      code: "—",
      avatar_url: null,
    };
  }, [apiProperties?.regional_officer_id, regionalOfficersList, mockData?.regional_officer]);

  const intelOfficer = useMemo(() => {
    const rawId = apiProperties?.intelligence_officer_id;
    const hasId = rawId && Number(rawId) !== 0 && String(rawId) !== "null";
    
    if (hasId) {
      const matched = intelligenceOfficersList.find(o => Number(o.id) === Number(rawId));
      if (matched) {
        const fullName = `${matched.first_name || ""} ${matched.last_name || ""}`.trim();
        const officerCode = matched.code && matched.id ? `${matched.code}-${matched.id}` : `IO-${matched.id}`;
        return {
          name: fullName || "Unnamed Officer",
          code: officerCode,
          avatar_url: matched.avatar_url || null,
        };
      }
    }
    
    // if (mockData?.intelligence_officer) {
    //   return mockData.intelligence_officer;
    // }

    return {
      name: "Unassigned",
      code: "—",
      avatar_url: null,
    };
  }, [apiProperties?.intelligence_officer_id, intelligenceOfficersList, mockData?.intelligence_officer]);

  // Initialize MapLibre Mini Map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const mapInstance = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {},
        layers: [
          {
            id: "background",
            type: "background",
            paint: { "background-color": "#D6E6FF" }, // Premium water color
          },
        ],
      },
      interactive: false,
    });

    map.current = mapInstance;

    const handleStyleLoad = () => {
      setMapLoaded(true);
    };

    if (mapInstance.isStyleLoaded()) {
      handleStyleLoad();
    } else {
      mapInstance.on("style.load", handleStyleLoad);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [isPageLoading]);

  // Update map source & layer when style is loaded and resolvedFeature is ready
  useEffect(() => {
    if (!map.current || !mapLoaded || !resolvedFeature) return;

    try {
      // Add or update the region source
      if (!map.current.getSource("region-source")) {
        map.current.addSource("region-source", {
          type: "geojson",
          data: resolvedFeature,
        });

        map.current.addLayer({
          id: "region-fill",
          type: "fill",
          source: "region-source",
          paint: {
            "fill-color": "#93c5fd", // Light blue matching Figma
            "fill-opacity": 0.8,
          },
        });

        map.current.addLayer({
          id: "region-line",
          type: "line",
          source: "region-source",
          paint: {
            "line-color": "#3b82f6",
            "line-width": 2,
          },
        });
      } else {
        const source = map.current.getSource("region-source") as maplibregl.GeoJSONSource;
        source.setData(resolvedFeature);
      }

      // Fit map view to the selected region bounds
      map.current.resize();
      setTimeout(() => {
        try {
          if (map.current && resolvedFeature) {
            const bounds = getFeatureBounds(resolvedFeature);
            map.current.fitBounds(bounds, { padding: 40, animate: false, maxZoom: 7 });
          }
        } catch (err) {
          console.error("Error setting region bounds on mini-map:", err);
        }
      }, 50);
    } catch (err) {
      console.error("Failed to render region on mini-map:", err);
    }
  }, [resolvedFeature, mapLoaded]);



  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-12 h-12 text-[#217bc4] animate-spin" />
        <span className="text-sm font-semibold text-slate-500">Loading region details...</span>
      </div>
    );
  }

  const handleEditClick = () => {
    navigate(`/role-manager/region-area-edit?editRegionId=${regionId}`);
  };

  const isMapInitializing = !mapLoaded || !resolvedFeature;

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-8 relative font-sans">
      
      {/* Floating Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <BackButton 
          label="Back" 
          size="sm" 
          className="!w-auto !px-5 !h-10 text-[13px]"
          onClick={() => navigate(-1)} 
        />
      </div>

      {/* Main Card */}
      <Card className="w-full max-w-[850px] p-6 sm:p-8 md:p-10 flex flex-col gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] bg-white border-0 mt-20 md:mt-12 lg:mt-8">
        
        {/* Top Section: Map & Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-10">
          
          {/* Left Column: Map & Metadata */}
          <div className="flex flex-col gap-6">
            
            {/* Map Container */}
            <div className="w-full h-[240px] sm:h-[280px] bg-[#F8F9FA] rounded-[16px] overflow-hidden relative">
              <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
              {isMapInitializing && (
                <div className="absolute inset-0 z-10 bg-slate-50 flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                  <span className="text-xs font-semibold text-slate-400">Loading Map Geometry...</span>
                </div>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-2">
              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block">
                  Region Name
                </Typography>
                <Typography variant="h4" className="text-[#0F172A] font-bold text-[16px]">
                  {regionName}
                </Typography>
              </div>
              
              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block">
                  Assigned ID
                </Typography>
                <Typography variant="h4" className="text-[#0F172A] font-bold uppercase font-mono tracking-tight text-[16px]">
                  {regionCode}
                </Typography>
              </div>

              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block">
                  Created Date
                </Typography>
                <Typography variant="p" className="text-[#1E293B] font-bold text-[15px]">
                  {createdDateVal}
                </Typography>
              </div>

              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block">
                  Created Time
                </Typography>
                <Typography variant="p" className="text-[#1E293B] font-bold text-[15px]">
                  {createdTimeVal}
                </Typography>
              </div>

              {districtNames && (
                <div className="col-span-2">
                  <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block">
                    Assigned Districts
                  </Typography>
                  <Typography variant="p" className="text-[#1E293B] font-bold text-[15px]">
                    {districtNames}
                  </Typography>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Assigned Officers */}
          <div className="flex flex-col pt-0 md:pt-2">
            
            <div className="flex items-center gap-3 bg-[#F8FAFC] px-4 py-3 rounded-[12px] border border-[#F1F5F9] w-max mb-8">
              <div className="bg-[#E0E7FF] p-2 rounded-lg text-[#4338CA]">
                <Briefcase className="w-5 h-5" />
              </div>
              <Typography variant="h4" className="text-[#0F172A] font-bold text-[18px]">
                Assigned Officers
              </Typography>
            </div>

            <div className="flex flex-col gap-8">
              {/* Regional Officer */}
              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-4 block">
                  Regional Officer
                </Typography>
                <div className="flex items-center gap-4">
                  {regOfficer?.avatar_url ? (
                    <img 
                      src={regOfficer.avatar_url} 
                      alt="Regional Officer"
                      className="w-12 h-12 rounded-full object-cover border border-[#E2E8F0] shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-[#E2E8F0]">
                      <UserCircle className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <Typography variant="p" className="text-[#0F172A] font-bold text-[16px] mb-0.5">
                      {regOfficer?.name || "Unassigned"}
                    </Typography>
                    <Typography variant="span" className="text-[#64748B] font-medium text-[13px]">
                      Officer Code: {regOfficer?.code || "—"}
                    </Typography>
                  </div>
                </div>
              </div>

              {/* Separator Line */}
              <div className="w-full h-px bg-[#F1F5F9]"></div>

              {/* Intelligence Officer */}
              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-4 block">
                  Intelligence Officer
                </Typography>
                <div className="flex items-center gap-4">
                  {intelOfficer?.avatar_url ? (
                    <img 
                      src={intelOfficer.avatar_url} 
                      alt="Intelligence Officer"
                      className="w-12 h-12 rounded-full object-cover border border-[#E2E8F0] shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#94A3B8] border border-[#E2E8F0]">
                      <UserCircle className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <Typography variant="p" className="text-[#0F172A] font-bold text-[16px] mb-0.5">
                      {intelOfficer?.name || "Unassigned"}
                    </Typography>
                    <Typography variant="span" className="text-[#64748B] font-medium text-[13px]">
                      Officer Code: {intelOfficer?.code || "—"}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Button */}
        <Button
          onClick={handleEditClick}
          className="w-full mt-2 bg-[#217bc4] hover:bg-[#1a66a3] text-white py-6 rounded-full flex items-center justify-center gap-2 font-bold text-[15px] shadow-[0_4px_14px_rgba(33,123,196,0.39)] transition-all"
        >
          <Pencil className="w-4 h-4" />
          Edit Region Details
        </Button>
        
      </Card>
    </div>
  );
};

export default RegionDetailsView;
