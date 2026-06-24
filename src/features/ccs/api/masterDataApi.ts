import { ccsApi } from "./ccsApi";
import type { SuccessResponse, MasterData, GeoMasterData } from "../types/ccsApiTypes";

export const masterDataApi = ccsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMasterData: builder.mutation<SuccessResponse<MasterData>, void | any>({
      query: (body) => ({
        url: "/master/get-all-master-data",
        method: "POST",
        body: body || {},
      }),
    }),
    getAllGeoMasterData: builder.mutation<GeoMasterData, void | any>({
      query: (body) => ({
        url: "/master/get-all-geo-master-data",
        method: "POST",
        body: body || {},
      }),
    }),
  }),
});

export const {
  useGetAllMasterDataMutation,
  useGetAllGeoMasterDataMutation,
} = masterDataApi;
