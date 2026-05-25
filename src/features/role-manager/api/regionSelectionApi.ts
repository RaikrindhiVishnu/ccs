import { roleManagerApi } from "./roleManagerApi";

/**
 * API endpoints for region selection and map data.
 */
export const regionSelectionApi = roleManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountryById: builder.query<any, { country_id: number }>({
      query: (body) => ({
        url: "master/get_country_by_id",
        method: "POST",
        body,
      }),
    }),
    getStatesByCountryId: builder.query<any, { country_id: number }>({
      query: (body) => ({
        url: "master/get_states_by_country_id",
        method: "POST",
        body,
      }),
    }),
    getRegionsByCountryId: builder.query<any, { country_id: number }>({
      query: (body) => ({
        url: "master/get_regions_by_country_id",
        method: "POST",
        body,
      }),
    }),
    getDistrictsByStateId: builder.query<any, { state_id: number }>({
      query: (body) => ({
        url: "master/get_districts_by_state_id",
        method: "POST",
        body,
      }),
    }),
    createRegion: builder.mutation<any, {
      regionName: string;
      regionCode: string;
      roleManagerId?: number;
      regionalOfficerId?: number;
      inteligenceOfficerId?: number;
      district_ids: number[];
      stateId?: number;
    }>({
      query: (body) => ({
        url: "region/create_region",
        method: "POST",
        body,
      }),
    }),
    assignOfficers: builder.mutation<any, {
      region_id: number;
      regionalOfficerId: number;
      inteligenceOfficerId: number;
    }>({
      query: (body) => ({
        url: "region/assign_officers",
        method: "POST",
        body,
      }),
    }),
    createArea: builder.mutation<any, {
      areaName: string;
      area_code: string;
      field_officer_id?: number | null;
      regional_officer_id?: number | null;
      intelligence_officer_id?: number | null;
      region_id?: number;
      roleManagerId?: number;
      assignments: {
        district_id: number;
        mandal_id: number;
      }[];
    }>({
      query: (body) => ({
        url: "areas/create_area",
        method: "POST",
        body,
      }),
    }),
    assignFieldOfficer: builder.mutation<any, {
      area_id: number;
      field_officer_id: number;
      regional_officer_id: number;
    }>({
      query: (body) => ({
        url: "areas/assign_fo",
        method: "POST",
        body,
      }),
    }),
    getAllGeoJsonData: builder.query<any, void>({
      query: () => ({
        url: "master/get_all_geo_json_data",
        method: "POST",
        body: {},
      }),
    }),
    getAllAreasByRegionId: builder.query<any, { region_id: number }>({
      query: (body) => ({
        url: "region/get_all_areas_by_region_id",
        method: "POST",
        body,
      }),
    }),

    // ─── PLACEHOLDER: Get All Regions ─────────────────────────────────────────
    // TODO: Replace url with actual backend endpoint when available.
    // Expected response: Array of region objects with id, name, code, district_ids, officer info.
    // Example: GET /region/get_all_regions
    getAllRegions: builder.query<any, void>({
      query: () => ({
        url: "region/get_all_regions", // TODO: confirm endpoint with backend
        method: "POST",
        body: {},
      }),
    }),

    // ─── PLACEHOLDER: Get Region By ID ────────────────────────────────────────
    // TODO: Replace url with actual backend endpoint when available.
    // Expected response: Single region object with id, name, code, district_ids, assigned_officer etc.
    // Example: POST /region/get_region_by_id { region_id: number }
    getRegionById: builder.query<any, { region_id: number }>({
      query: (body) => ({
        url: "region/get_region_by_id", // TODO: confirm endpoint with backend
        method: "POST",
        body,
      }),
    }),

    updateRegion: builder.mutation<any, {
      region_id: number;
      regionName: string;
      regionCode: string;
      district_ids: number[];
      stateId?: number;
      regionalOfficerId?: number | null;
      inteligenceOfficerId?: number | null;
    }>({
      async queryFn(body) {
        console.log("Mocked updateRegion mutation called with body:", body);
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
          data: {
            success: true,
            message: "Region updated successfully (Mock)",
            data: body,
          },
        };
      },
    }),

    // ─── PLACEHOLDER: Get All Areas ───────────────────────────────────────────
    // TODO: Replace url with actual backend endpoint when available.
    // Expected response: Array of area objects with id, name, code, region_id, mandal assignments.
    // Example: POST /areas/get_all_areas
    getAllAreas: builder.query<any, void>({
      query: () => ({
        url: "areas/get_all_areas", // TODO: confirm endpoint with backend
        method: "POST",
        body: {},
      }),
    }),

    // ─── PLACEHOLDER: Get Area By ID ──────────────────────────────────────────
    getAreaById: builder.query<any, { area_id: number }>({
      async queryFn(body) {
        console.log("Mocked getAreaById called with:", body);
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        // Dynamic lookup from global cache populated by real backend loads
        const cache = (window as any).__areaCache || {};
        const cached = cache[Number(body.area_id)];

        let areaName = cached?.area_name || cached?.areaName || `Area_${body.area_id}`;
        let areaCode = cached?.area_code || cached?.areaCode || `AREA-CODE-00${body.area_id}`;
        let regionId = cached?.region_id || cached?.regionId || 1;
        let regionName = cached?.regionName || "AP - North";
        let districtId = cached?.district_id || 1;
        
        let mandalIds = [101, 102];
        if (cached?.assignments) {
          mandalIds = cached.assignments.map((a: any) => Number(a.mandal_id || a.mandalId));
        } else if (cached?.mandal_ids || cached?.mandalIds) {
          mandalIds = (cached.mandal_ids || cached.mandalIds).map(Number);
        } else {
          // Fallbacks for known IDs
          if (body.area_id === 2) {
            areaName = "Guntur East Zone";
            areaCode = "GNT-E-002";
            regionId = 2;
            regionName = "AP - South";
            districtId = 2;
            mandalIds = [201, 202];
          } else if (body.area_id === 3) {
            areaName = "Kakinada Coastal Area";
            areaCode = "KKD-C-003";
            regionId = 3;
            regionName = "AP - East";
            districtId = 3;
            mandalIds = [301, 302];
          } else if (body.area_id === 6) {
            areaName = "Area_2";
            areaCode = "AREA-002";
            regionId = 2;
            regionName = "AP - South";
            districtId = 2;
            mandalIds = [203, 204];
          } else {
            regionId = (body.area_id % 3) + 1;
            regionName = regionId === 1 ? "AP - North" : regionId === 2 ? "AP - South" : "AP - East";
            districtId = regionId;
            mandalIds = [101 + body.area_id * 10, 102 + body.area_id * 10];
          }
        }

        const assignments = mandalIds.map(mId => ({ district_id: districtId, mandal_id: mId }));

        return {
          data: {
            success: true,
            data: {
              id: body.area_id,
              areaName,
              areaCode,
              regionId,
              regionName,
              regional_officer_id: cached?.regional_officer_id || 11,
              intelligence_officer_id: cached?.intelligence_officer_id || 12,
              field_officer_id: cached?.field_officer_id || 13,
              state_id: 1,
              district_id: districtId,
              mandal_ids: mandalIds,
              mandalIds: mandalIds,
              assignments,
              fieldOfficer: {
                name: "Anil Reddy",
                code: "AR-9931",
                avatar_url: "https://i.pravatar.cc/150?u=anil",
              }
            }
          }
        };
      }
    }),

    // ─── PLACEHOLDER: Update Area ─────────────────────────────────────────────
    updateArea: builder.mutation<any, {
      area_id: number;
      areaName: string;
      area_code: string;
      region_id: number;
      assignments: { district_id: number; mandal_id: number }[];
      field_officer_id?: number | null;
      regional_officer_id?: number | null;
      intelligence_officer_id?: number | null;
    }>({
      async queryFn(body) {
        console.log("Mocked updateArea mutation called with body:", body);
        await new Promise((resolve) => setTimeout(resolve, 800));
        return {
          data: {
            success: true,
            message: "Area updated successfully (Mock)",
            data: body,
          },
        };
      },
    }),
    getAllRegionsByStateId: builder.mutation<any, { state_id: number }>({
      query: (body) => ({
        url: "master/get_all_regions_by_state_id",
        method: "POST",
        body,
      }),
    }),
    getRegionsByStateId: builder.query<any, { state_id: number }>({
      query: (body) => ({
        url: "master/get_all_regions_by_state_id",
        method: "POST",
        body,
      }),
    }),
    getRegionGeoJson: builder.query<any, { region_id: number }>({
      query: (body) => ({
        url: "region/get_region_geojson",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { 
  useGetCountryByIdQuery, 
  useGetStatesByCountryIdQuery,
  useGetRegionsByCountryIdQuery,
  useGetDistrictsByStateIdQuery,
  useCreateRegionMutation,
  useAssignOfficersMutation,
  useCreateAreaMutation,
  useAssignFieldOfficerMutation,
  useGetAllGeoJsonDataQuery,
  useGetAllAreasByRegionIdQuery,
  useGetAllRegionsByStateIdMutation,
  useGetRegionsByStateIdQuery,
  useGetRegionGeoJsonQuery,
  // ─── Placeholder hooks (wire to real APIs when available) ─────────────────
  useGetAllRegionsQuery,
  useGetRegionByIdQuery,
  useUpdateRegionMutation,
  useGetAllAreasQuery,
  useGetAreaByIdQuery,
  useUpdateAreaMutation,
} = regionSelectionApi;
