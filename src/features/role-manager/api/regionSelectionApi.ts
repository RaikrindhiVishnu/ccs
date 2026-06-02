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
      providesTags: ["Region"],
    }),
    getDistrictsByStateId: builder.query<any, { state_id: number }>({
      query: (body) => ({
        url: "master/get_districts_by_state_id",
        method: "POST",
        body,
      }),
    }),
    createRegion: builder.mutation<
      any,
      {
        regionName: string;
        regionCode: string;
        roleManagerId?: number;
        regionalOfficerId?: number;
        inteligenceOfficerId?: number;
        district_ids: number[];
        stateId?: number;
      }
    >({
      query: (body) => ({
        url: "region/create_region",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Region"],
    }),
    assignOfficers: builder.mutation<
      any,
      {
        region_id: number;
        regionalOfficerId: number;
        inteligenceOfficerId?: number;
      }
    >({
      query: (body) => ({
        url: "region/assign_officers",
        method: "POST",
        body,
      }),
    }),
    createArea: builder.mutation<
      any,
      {
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
      }
    >({
      query: (body) => ({
        url: "areas/create_area",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Area"],
    }),

    assignFieldOfficer: builder.mutation<
      any,
      {
        area_id: number;
        field_officer_id: number;
        regional_officer_id: number;
      }
    >({
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
      providesTags: ["Area"],
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
      regionCode?: string;
      district_ids: number[];
      stateId?: number;
      regionalOfficerId?: number | null;
      inteligenceOfficerId?: number | null;
      regional_officer_id?: number | null;
      intelligence_officer_id?: number | null;
    }>({
      query: (body) => ({
        url: "region/edit_region",
        method: "POST",
        body: {
          region_id: body.region_id,
          regionName: body.regionName,
          regional_officer_id: body.regional_officer_id !== undefined ? body.regional_officer_id : (body.regionalOfficerId ?? null),
          intelligence_officer_id: body.intelligence_officer_id !== undefined ? body.intelligence_officer_id : (body.inteligenceOfficerId ?? null),
          district_ids: body.district_ids,
        },
      }),
      invalidatesTags: ["Region", "Area"],
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
    getAreaGeoJson: builder.query<any, { area_id: number }>({
      query: (body) => ({
        url: "areas/get_area_geojson",
        method: "POST",
        body,
      }),
    }),

    getAreaById: builder.query<any, { area_id: number }>({
      query: (body) => ({
        url: "areas/get_area_by_id",
        method: "POST",
        body,
      }),
    }),

    // ─── Update Area ──────────────────────────────────────────────────────────
    updateArea: builder.mutation<
      any,
      {
        area_id: number;
        areaName: string;
        field_officer_id?: number | null;
        assignments: { district_id: number; mandal_id: number }[];
        // Optional extra fields (kept for backward compatibility, not sent to API)
        area_code?: string;
        region_id?: number;
        regional_officer_id?: number | null;
        intelligence_officer_id?: number | null;
      }
    >({
      query: ({ area_id, areaName, field_officer_id, assignments }) => ({
        url: "areas/edit_area",
        method: "POST",
        body: {
          area_id,
          areaName,
          field_officer_id: field_officer_id ?? null,
          assignments,
        },
      }),
      invalidatesTags: ["Area"],
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
      providesTags: ["Region"],
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
  useLazyGetRegionGeoJsonQuery,
  // ─── Placeholder hooks (wire to real APIs when available) ─────────────────
  useGetAllRegionsQuery,
  useGetRegionByIdQuery,
  useUpdateRegionMutation,
  useGetAllAreasQuery,
  useGetAreaByIdQuery,
  useUpdateAreaMutation,
  useGetAreaGeoJsonQuery,
} = regionSelectionApi;
