import { roleManagerApi } from "./roleManagerApi";
import type { GeoMasterData } from "../types/masterDataTypes";
import { transformTable } from "../utils/utils";

export const masterDataApi = roleManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGeoMasterData: builder.query<GeoMasterData, void>({
      query: () => ({
        url: "master/get_all_geo_master_data",
        method: "POST",
        body: {},
      }),
      transformResponse: (response: any): GeoMasterData => {
        const payload = response?.data ? response.data : response;
        return {
          countries: transformTable(payload?.countrys),
          states: transformTable(payload?.states),
          districts: transformTable(payload?.districts),
          mandals: transformTable(payload?.mandals),
        };
      },
    }),
    getAllRegionsByStateId: builder.mutation<any, { state_id: string | number }>({
      query: (body) => ({
        url: "master/get_all_regions_by_state_id",
        method: "POST",
        body,
      }),
    }),
    getAllMasterData: builder.query<any, void>({
  query: () => ({
    url: "master/get_all_master_data",
    method: "POST",
    body: {},
  }),
}),
  }),
});

export const { useGetAllGeoMasterDataQuery, useGetAllRegionsByStateIdMutation, useGetAllMasterDataQuery, } = masterDataApi;
