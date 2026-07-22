import { ccsApi } from "./ccsApi";
import type {
  SuccessResponse,
  PaginatedFarmlandResponse,
  ApproveFarmlandRequest
} from "../types/ccsApiTypes";

export const assignedFarmlandsApi = ccsApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignedFarmlandDetails: builder.mutation<any, { farmland_id: number }>({
      query: (body) => ({
        url: "/assigned-farmlands/get-farmland-details",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farmland"],
    }),
    getAllAssignedFarmlands: builder.mutation<PaginatedFarmlandResponse, any>({
      query: (body) => ({
        url: "/assigned-farmlands/get-all-farmlands",
        method: "POST",
        body: body || {},
      }),
      invalidatesTags: ["Farmland"],
    }),
    approveAssignedFarmland: builder.mutation<SuccessResponse<any>, ApproveFarmlandRequest>({
      query: (body) => ({
        url: "/assigned-farmlands/approve-farmland",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farmland", "Dashboard"],
    }),
    rejectAssignedFarmland: builder.mutation<SuccessResponse<any>, ApproveFarmlandRequest>({
      query: (body) => ({
        url: "/assigned-farmlands/approve-farmland",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farmland", "Dashboard"],
    }),
    getAssignedOfficers: builder.mutation<any, { farmland_id: number }>({
      query: (body) => ({
        url: "/assigned-farmlands/get-assigned-officers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Farmland"],
    }),
  }),
});

export const {
  useGetAssignedFarmlandDetailsMutation,
  useGetAllAssignedFarmlandsMutation,
  useApproveAssignedFarmlandMutation,
  useRejectAssignedFarmlandMutation,
  useGetAssignedOfficersMutation,
} = assignedFarmlandsApi;
