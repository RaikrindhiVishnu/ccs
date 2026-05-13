import { roleManagerApi } from "./roleManagerApi";
import type { GeoMasterData, GeoMasterDataRaw } from "../types/masterDataTypes";
import { transformTable } from "../utils/utils";

export const masterDataApi = roleManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGeoMasterData: builder.query<GeoMasterData, void>({
      query: () => ({
        url: "master/get_all_geo_master_data",
        method: "POST",
        body: {},
      }),
      transformResponse: (response: GeoMasterDataRaw): GeoMasterData => {
        return {
          countries: transformTable(response.countrys),
          states: transformTable(response.states),
          districts: transformTable(response.districts),
          mandals: transformTable(response.mandals),
        };
      },
    }),
  }),
});

export const { useGetAllGeoMasterDataQuery } = masterDataApi;
