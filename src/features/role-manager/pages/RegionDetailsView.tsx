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

  // Queries to fetch the same master data already cached in the app
  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();
  const { data: regionsByCountryData } = useGetRegionsByCountryIdQuery(
    { country_id: 1 },
    { skip: !geoMasterData }
  );

  // Call the region/get_region_geojson API dynamically based on route param
  const { data: regionGeoJsonData } = useGetRegionGeoJsonQuery(
    { region_id: Number(regionId) },
    { skip: !regionId }
  );

  useEffect(() => {
    if (regionGeoJsonData) {
      console.log(
        `[RegionDetailsView] get_region_geojson response for region_id ${regionId}:`,
        regionGeoJsonData
      );
    }
  }, [regionGeoJsonData, regionId]);

  const { data: mockData } = useGetRegionDetailsMockQuery(regionId);

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

  // Extract the decompressed regions and reconstruct full geometry
  const resolvedFeature = useMemo(() => {
    // 1. Try to find region in decompressed data
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
    // 2. Fallback to router state feature
    return location.state?.feature || null;
  }, [regionsByCountryData, geoMasterData, regionId, location.state]);

  const regionName = mockData?.region_name || resolvedFeature?.properties?.region_name || resolvedFeature?.properties?.regionName || "Loading...";
  const regionCode = mockData?.region_code || resolvedFeature?.properties?.region_code || resolvedFeature?.properties?.regionCode || "—";

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

    mapInstance.on("style.load", () => {
      // Add world land layer for context
      mapInstance.addSource("world-land", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson",
      });
      mapInstance.addLayer({
        id: "world-land-fill",
        type: "fill",
        source: "world-land",
        paint: {
          "fill-color": "#F0EEF0",
          "fill-opacity": 1,
        },
      });

      setMapLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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
                  {mockData?.created_date || "—"}
                </Typography>
              </div>

              <div>
                <Typography variant="span" className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block">
                  Created Time
                </Typography>
                <Typography variant="p" className="text-[#1E293B] font-bold text-[15px]">
                  {mockData?.created_time || "—"}
                </Typography>
              </div>
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
                  {mockData?.regional_officer?.avatar_url ? (
                    <img 
                      src={mockData.regional_officer.avatar_url} 
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
                      {mockData?.regional_officer?.name || "Unassigned"}
                    </Typography>
                    <Typography variant="span" className="text-[#64748B] font-medium text-[13px]">
                      Officer Code: {mockData?.regional_officer?.code || "—"}
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
                  {mockData?.intelligence_officer?.avatar_url ? (
                    <img 
                      src={mockData.intelligence_officer.avatar_url} 
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
                      {mockData?.intelligence_officer?.name || "Unassigned"}
                    </Typography>
                    <Typography variant="span" className="text-[#64748B] font-medium text-[13px]">
                      Officer Code: {mockData?.intelligence_officer?.code || "—"}
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
