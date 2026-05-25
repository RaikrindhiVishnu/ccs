import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Briefcase, Pencil, UserCircle, Layers } from "lucide-react";
import { useGetAllFieldOfficersMutation } from "../api/roleManagerApi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { BackButton } from "@/components/ui/BackButton";

import {
  useGetAreaByIdQuery,
  useGetAllAreasByRegionIdQuery,
  useGetAreaGeoJsonQuery,
} from "../api/regionSelectionApi";

const AreaDetailsView: React.FC = () => {
  const { areaId } = useParams<{ areaId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [getAllFieldOfficers, { data: fieldOfficersData }] =
    useGetAllFieldOfficersMutation();
  const { data: areaGeoJson } = useGetAreaGeoJsonQuery(
    { area_id: Number(areaId) },
    { skip: !areaId },
  );
  // Queries
  const { data: areaDetailsData } = useGetAreaByIdQuery(
    { area_id: Number(areaId) },
    { skip: !areaId },
  );

  useEffect(() => {
    getAllFieldOfficers({
      is_assigned: 1,
    });
  }, []);
  // Dynamically resolve real backend area details using regionId & get_all_areas_by_region_id
  const regionId =
    areaDetailsData?.data?.regionId || areaDetailsData?.data?.region_id;
  const { data: regionAreasData } = useGetAllAreasByRegionIdQuery(
    { region_id: Number(regionId) },
    { skip: !regionId },
  );

  // Match the dynamic area from either location state or fetched region list
  const matchedArea = useMemo(() => {
    if (location.state?.areaDetails) {
      return location.state.areaDetails;
    }
    if (regionAreasData?.data) {
      return regionAreasData.data.find(
        (a: any) => Number(a.id) === Number(areaId),
      );
    }
    return null;
  }, [location.state?.areaDetails, regionAreasData, areaId]);
  const svgPaths = useMemo(() => {
    const geoFeatures =
      areaGeoJson?.data?.features || areaGeoJson?.features || [];

    if (!geoFeatures.length) return [];

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    const polygons: any[] = [];

    geoFeatures.forEach((feature: any) => {
      if (!feature?.geometry) return;

      const geo = feature.geometry;

      const processCoords = (rings: any[][]) => {
        rings.forEach((ring) => {
          const coords: any[] = [];

          ring.forEach((c: any) => {
            if (!Array.isArray(c)) return;

            const x = c[0];
            const y = c[1];

            minX = Math.min(minX, x);
            maxX = Math.max(maxX, x);
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);

            coords.push([x, y]);
          });

          if (coords.length) {
            polygons.push({
              name: feature.properties?.name || "Area",
              coords,
            });
          }
        });
      };

      if (geo.type === "Polygon") {
        processCoords(geo.coordinates);
      }

      if (geo.type === "MultiPolygon") {
        geo.coordinates.forEach((poly: any) => {
          processCoords(poly);
        });
      }
    });

    if (!polygons.length) return [];

    const width = 300;
    const height = 180;
    const pad = 20;

    const deltaX = maxX - minX;
    const deltaY = maxY - minY;

    const scale = Math.min(
      (width - pad * 2) / (deltaX || 1),
      (height - pad * 2) / (deltaY || 1),
    );

    const offsetX = (width - deltaX * scale) / 2 - minX * scale;

    const offsetY = (height - deltaY * scale) / 2 - minY * scale;

    return polygons.map((poly) => {
      const points = poly.coords.map((c: any) => {
        const x = c[0] * scale + offsetX;
        const y = height - (c[1] * scale + offsetY);

        return `${x.toFixed(1)},${y.toFixed(1)}`;
      });

      return {
        mandalName: poly.name,
        pathString: `M ${points.join(" L ")} Z`,
      };
    });
  }, [areaGeoJson]);
  const firstFeature =
    areaGeoJson?.features?.[0] || areaGeoJson?.data?.features?.[0];

  const geoProps = firstFeature?.properties || {};
  const matchedFieldOfficer = useMemo(() => {
    const officers = fieldOfficersData?.data || [];
    return officers.find(
      (officer: any) =>
        String(officer.area_name).trim().toLowerCase() ===
        String(geoProps?.name).trim().toLowerCase(),
    );
  }, [fieldOfficersData, geoProps]);
  fieldOfficersData?.data?.forEach((o: any) => {
    console.log("OFFICER OBJECT", o);
  });
  const cachedArea = (window as any).__areaCache?.[Number(areaId)];
  const areaName =
    geoProps?.name ||
    matchedArea?.area_name ||
    matchedArea?.areaName ||
    areaDetailsData?.data?.areaName ||
    `Area_${areaId}`;
  const areaCode =
    geoProps?.area_code ||
    matchedArea?.area_code ||
    matchedArea?.areaCode ||
    areaDetailsData?.data?.areaCode ||
    `AREA-CODE-${areaId}`;
  const createdOn = geoProps?.created_on;

  const formattedDate = createdOn
    ? new Date(createdOn).toLocaleDateString()
    : "—";

  const formattedTime = createdOn
    ? new Date(createdOn).toLocaleTimeString()
    : "—";

  const fieldOfficer = {
    name: matchedFieldOfficer
      ? `${matchedFieldOfficer.first_name} ${matchedFieldOfficer.last_name || ""}`
      : "Unassigned",

    code: matchedFieldOfficer?.code || "—",

    avatar_url: null,
  };

  const handleEditClick = () => {
    navigate(`/role-manager/region-area-edit?editAreaId=${areaId}`);
  };

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
          {/* Left Column: Outline Graphic & Metadata */}
          <div className="flex flex-col gap-6">
            {/* Outline Boundaries Graphic */}
            <div className="w-full h-[240px] sm:h-[280px] bg-[#F8FAFC] rounded-[20px] border border-[#E2E8F0] relative overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner">
              {/* Background dot grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#2563eb 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />

              {svgPaths.length === 0 ? (
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Layers className="w-8 h-8 animate-pulse text-slate-300" />
                  <span className="text-xs font-semibold">
                    Generating boundaries outline...
                  </span>
                </div>
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <svg
                    viewBox="0 0 300 180"
                    className="w-full h-full max-h-[220px]"
                  >
                    <g>
                      {svgPaths.map((poly, idx) => (
                        <path
                          key={idx}
                          d={poly.pathString}
                          fill="#3b82f6"
                          fillOpacity="0.08"
                          stroke="#2563eb"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      ))}
                    </g>
                  </svg>

                  <div className="absolute bottom-2 right-2 text-[10px] font-bold text-[#64748b] bg-white border border-[#E2E8F0] px-2.5 py-1 rounded-full shadow-sm">
                    {svgPaths.length} Connected{" "}
                    {svgPaths.length === 1 ? "Mandal" : "Mandals"}
                  </div>
                </div>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mt-2">
              <div>
                <Typography
                  variant="span"
                  className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block"
                >
                  Area Name
                </Typography>
                <Typography
                  variant="h4"
                  className="text-[#0F172A] font-bold text-[16px]"
                >
                  {areaName}
                </Typography>
              </div>

              <div>
                <Typography
                  variant="span"
                  className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block"
                >
                  Assigned ID
                </Typography>
                <Typography
                  variant="h4"
                  className="text-[#0F172A] font-bold uppercase font-mono tracking-tight text-[16px]"
                >
                  {areaCode}
                </Typography>
              </div>

              <div>
                <Typography
                  variant="span"
                  className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block"
                >
                  Created Date
                </Typography>
                <Typography
                  variant="p"
                  className="text-[#1E293B] font-bold text-[15px]"
                >
                  {formattedDate}
                </Typography>
              </div>

              <div>
                <Typography
                  variant="span"
                  className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-1.5 block"
                >
                  Created Time
                </Typography>
                <Typography
                  variant="p"
                  className="text-[#1E293B] font-bold text-[15px]"
                >
                  {formattedTime}
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
              <Typography
                variant="h4"
                className="text-[#0F172A] font-bold text-[18px]"
              >
                Assigned Personnel
              </Typography>
            </div>

            <div className="flex flex-col gap-8">
              {/* Field Officer */}
              <div>
                <Typography
                  variant="span"
                  className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-4 block"
                >
                  Field Officer
                </Typography>
                <div className="flex items-center gap-4">
                  {fieldOfficer?.avatar_url ? (
                    <img
                      src={fieldOfficer.avatar_url}
                      alt="Field Officer"
                      className="w-12 h-12 rounded-full object-cover border border-[#E2E8F0] shadow-sm"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-[#E2E8F0]">
                      <UserCircle className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <Typography
                      variant="p"
                      className="text-[#0F172A] font-bold text-[16px] mb-0.5"
                    >
                      {fieldOfficer.name || "Unassigned"}
                    </Typography>
                    <Typography
                      variant="span"
                      className="text-[#64748B] font-medium text-[13px]"
                    >
                      Officer Code: {fieldOfficer.code || "—"}
                    </Typography>
                  </div>
                </div>
              </div>
              <div>
                <Typography
                  variant="span"
                  className="text-[#94A3B8] font-bold uppercase tracking-[0.08em] text-[10px] mb-4 block"
                >
                  Mandals
                </Typography>

                <Typography
                  variant="p"
                  className="text-[#0F172A] font-medium text-[14px] leading-6"
                >
                  {geoProps?.mandal || "—"}
                </Typography>
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
          Edit Area Details
        </Button>
      </Card>
    </div>
  );
};

export default AreaDetailsView;
