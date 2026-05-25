import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/BackButton";
import { toast } from "sonner";
import { useAppSelector } from "@/core/hooks";
import {
  useAssignFieldOfficerMutation,
  useGetAllGeoJsonDataQuery,
} from "../api/regionSelectionApi";
import { useGetAllFieldOfficersMutation } from "../api/roleManagerApi";

// Helper to calculate bounds of geometry
const getFeatureBounds = (features: any[]): maplibregl.LngLatBoundsLike => {
  const bounds = new maplibregl.LngLatBounds();

  const extendBounds = (coords: any[]) => {
    coords.forEach((coord) => {
      if (Array.isArray(coord[0])) {
        extendBounds(coord);
      } else {
        bounds.extend(coord as [number, number]);
      }
    });
  };

  features.forEach((feature) => {
    const geometry = feature.geometry;
    if (!geometry) return;
    if (geometry.type === "GeometryCollection") {
      (geometry.geometries as any[]).forEach((g: any) => {
        if (g?.coordinates) extendBounds(g.coordinates);
      });
    } else if (geometry.coordinates) {
      extendBounds(geometry.coordinates);
    }
  });

  return bounds;
};

const AssignFieldOfficer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  // Retrieve state passed from the Success Card
  const areaState = useMemo(() => {
    const defaultData = {
      areaId: null,
      areaName: "",
      assignedId: "",
      createdDate: "",
      createdTime: "",
      selectedMandals: [] as any[],
      regionalOfficerId: null,
      roleManagerName: "",
      stateId: null,
    };
    return {
      ...defaultData,
      ...(location.state || {}),
    };
  }, [location.state]);
  const createdArea = useAppSelector((state) => state.roleManager.createdArea);
  const [fieldOfficers, setFieldOfficers] = useState<any[]>([]);
  const [selectedFieldOfficerId, setSelectedFieldOfficerId] = useState<
    number | null
  >(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Mutation and Query Hooks
  const [assignFieldOfficer, { isLoading: isAssigning }] =
    useAssignFieldOfficerMutation();
  const [getAllFieldOfficers, { isLoading: loadingField }] =
    useGetAllFieldOfficersMutation();
  const { data: allGeoJsonData } = useGetAllGeoJsonDataQuery();

  const [geoMasterData, setGeoMasterData] = useState<any | null>(null);

  // Fetch Field Officers list on mount
  useEffect(() => {
    const fetchFieldOfficers = async () => {
      try {
        const result = await getAllFieldOfficers({
          is_assigned: 1,
        }).unwrap();

        console.log("FIELD OFFICERS:", result);

        const fieldList = Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result)
            ? result
            : [];

        setFieldOfficers(fieldList);
      } catch (err) {
        console.error("Failed to load field officers:", err);
      }
    };

    fetchFieldOfficers();
  }, [getAllFieldOfficers]);

  // Fetch Full GeoJSON master data to resolve geometry outlines
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

  // Construct FeatureCollection of the area's mandals to draw on the mini-map
  const areaGeoJSON = useMemo(() => {
    if (!geoMasterData)
      return { type: "FeatureCollection", features: [] } as any;

    const selectedIds = new Set(
      areaState.selectedMandals.map((m: any) => Number(m.id ?? m.featureId)),
    );

    const matchedMandals: any[] = [];
    geoMasterData.countries.forEach((country: any) => {
      country.states?.forEach((state: any) => {
        if (Number(state.i) === Number(areaState.stateId)) {
          state.districts?.forEach((district: any) => {
            district.mandals?.forEach((mandal: any) => {
              if (selectedIds.has(Number(mandal.i))) {
                matchedMandals.push({
                  type: "Feature",
                  id: mandal.i,
                  geometry: mandal.g,
                  properties: {
                    id: mandal.i,
                    name: mandal.m,
                    districtName: district.d,
                  },
                });
              }
            });
          });
        }
      });
    });

    return {
      type: "FeatureCollection",
      features: matchedMandals,
    };
  }, [geoMasterData, areaState]);

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
            paint: {
              "background-color": "#F8FAFC",
            },
          },
        ],
      },
      center: [78.9629, 20.5937],
      zoom: 4,
      interactive: false, // Make it a clean visual display
    });

    map.current = mapInstance;

    map.current.on("style.load", () => {
      setIsMapReady(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Update map source & fit bounds when data is ready
  useEffect(() => {
    if (!map.current || !isMapReady) return;

    const features = areaGeoJSON.features;
    if (features.length === 0) return;

    try {
      // Add or update mandals source
      if (!map.current.getSource("selected-area-mandals")) {
        map.current.addSource("selected-area-mandals", {
          type: "geojson",
          data: areaGeoJSON as any,
        });

        // Fill Layer - GORGEOUS GREEN THEME matching the mockup screenshot
        map.current.addLayer({
          id: "mandals-fill",
          type: "fill",
          source: "selected-area-mandals",
          paint: {
            "fill-color": "#84cc16",
            "fill-opacity": 0.35,
          },
        });

        // Border Line Layer
        map.current.addLayer({
          id: "mandals-border",
          type: "line",
          source: "selected-area-mandals",
          paint: {
            "line-color": "#4d7c0f",
            "line-width": 1.5,
          },
        });
      } else {
        const source = map.current.getSource(
          "selected-area-mandals",
        ) as maplibregl.GeoJSONSource;
        source.setData(areaGeoJSON as any);
      }

      // Fit map view to the selected mandals bounds
      const bounds = getFeatureBounds(features);
      map.current.fitBounds(bounds, {
        padding: 40,
        animate: false,
      });
    } catch (err) {
      console.error("Error setting area bounds on mini-map:", err);
    }
  }, [areaGeoJSON, isMapReady]);

  // Submit Assign Field Officer handler
  const handleAssign = async () => {
    if (!selectedFieldOfficerId) {
      toast.error("Please select a Field Officer");
      return;
    }

    const resolvedAreaId = createdArea?.area_id ?? areaState.areaId;
    if (!resolvedAreaId) {
      toast.error("Area ID missing — please recreate the area");
      console.error("createdArea from Redux:", createdArea);
      console.error("areaState from nav:", areaState);
      return;
    }

    try {
      console.log("ASSIGN PAYLOAD", {
        area_id: Number(createdArea?.area_id || areaState.areaId),
        field_officer_id: Number(selectedFieldOfficerId),
        regional_officer_id: Number(areaState.regionalOfficerId),
      });

      const resolvedAreaId = createdArea?.area_id ?? areaState.areaId;

      if (!resolvedAreaId) {
        toast.error("Area ID missing — please recreate the area");
        console.error("createdArea from Redux:", createdArea);
        console.error("areaState from nav:", areaState);
        return;
      }

      await assignFieldOfficer({
        area_id: Number(resolvedAreaId),
        field_officer_id: Number(selectedFieldOfficerId),
        regional_officer_id: Number(
          createdArea?.regional_officer_id ?? areaState.regionalOfficerId,
        ),
      }).unwrap();

      toast.success("Field Officer assigned successfully!");

      navigate("/role-manager/region-area-dashboard");
    } catch (err) {
      console.error("Failed to assign field officer:", err);
      toast.error("Failed to assign field officer.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden bg-[#F3F4F6] font-sans p-6 sm:p-10 relative">
      {/* Back Button */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between mb-8">
        <BackButton
          onClick={() => navigate("/role-manager/region-area-dashboard")}
          size="sm"
          label="Go back to dashboard"
        />
      </div>

      {/* Main Container */}
      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-6">
        {/* Title */}
        <h1 className="text-[22px] sm:text-[28px] font-black text-slate-900 tracking-tight text-center leading-snug mb-2 font-heading">
          Assign Field Officers For The Area
        </h1>

        {/* Dual Panel Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-2">
          {/* LEFT PANEL - Area Details Card */}
          <div className="w-full flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-md p-6 sm:p-8 justify-between">
            {/* Map Container */}
            <div className="w-full aspect-[220/190] sm:h-[260px] rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative mb-6">
              <div
                ref={mapContainer}
                className="absolute inset-0 w-full h-full"
              />
              {(!isMapReady || !geoMasterData) && (
                <div className="absolute inset-0 z-10 bg-slate-50 flex items-center justify-center gap-3">
                  <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                  <span className="text-xs font-semibold text-slate-400">
                    Loading Map Geometry...
                  </span>
                </div>
              )}
            </div>

            {/* Info Grid */}
            <div className="w-full bg-[#F9FAFB] p-5 sm:p-6 rounded-2xl border border-slate-100 grid grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Area Name
                </span>
                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                  {areaState.areaName}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Assigned ID
                </span>
                <span className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                  {areaState.assignedId}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Created Date
                </span>
                <span className="text-sm font-extrabold text-slate-800">
                  {areaState.createdDate}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Created By
                </span>
                <span className="text-sm font-extrabold text-slate-800 uppercase">
                  {areaState.roleManagerName}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Assignment Form Card */}
          <div className="w-full flex flex-col bg-white rounded-[32px] border border-slate-200 shadow-md p-6 sm:p-8 justify-between relative overflow-hidden">
            {/* Form Fields */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                  Assign Officers
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Assign the officers for the area created
                </p>
              </div>

              <div className="h-px bg-slate-100 my-1 w-full" />

              {/* Field Officer Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">
                  Enter Field Officer Name
                </label>
                <div className="relative flex items-center h-12 bg-slate-50 border border-slate-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <select
                    value={selectedFieldOfficerId ?? ""}
                    onChange={(e) =>
                      setSelectedFieldOfficerId(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="w-full h-full border-none outline-none bg-transparent px-4 text-slate-800 text-sm font-semibold cursor-pointer"
                  >
                    <option value="">Select Field Officer</option>
                    {fieldOfficers.map((officer, index) => {
                      const id = officer.id ?? officer.i ?? officer.user_id;
                      const fullName =
                        `${officer.first_name || officer.fname || ""} ${officer.last_name || officer.lname || ""}`.trim();
                      const label =
                        fullName ||
                        officer.name ||
                        officer.d ||
                        officer.username ||
                        officer.email ||
                        `Field Officer ${index + 1}`;
                      return (
                        <option key={id ?? index} value={id ?? index}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="mt-8 sm:mt-12 w-full">
              <Button
                variant="primary"
                onClick={handleAssign}
                loading={isAssigning}
                disabled={loadingField}
                fullWidth
              >
                Assign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignFieldOfficer;
