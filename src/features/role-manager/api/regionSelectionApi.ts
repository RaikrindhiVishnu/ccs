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
      regionalOfficerId: number;
      inteligenceOfficerId: number;
      district_ids: number[];
      stateId?: number;
    }>({
      query: (body) => ({
        url: "region/create_region",
        method: "POST",
        body,
      }),
    }),
    createArea: builder.mutation<any, {
      areaName: string;
      area_code: string;
      field_officer_id: number;
      regional_officer_id?: number | null;
      intelligence_officer_id?: number | null;
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
  }),
});

export const { 
  useGetCountryByIdQuery, 
  useGetStatesByCountryIdQuery,
  useGetRegionsByCountryIdQuery,
  useGetDistrictsByStateIdQuery,
  useCreateRegionMutation,
  useCreateAreaMutation,
  useGetAllGeoJsonDataQuery,
  useGetAllAreasByRegionIdQuery,
} = regionSelectionApi;
