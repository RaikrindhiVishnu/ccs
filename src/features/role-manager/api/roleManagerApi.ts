import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "@/core/api/baseQueryWithReauth";
import { env } from "@/core/config/env";
import type {
  GetAgentsRequest,
  GetAgentsApiResponse,
} from "../types/agent";

export const roleManagerApi = createApi({
  reducerPath: "roleManagerApi",
  baseQuery: createBaseQueryWithReauth(env.ROLE_MANAGER_API_BASE_URL),
  tagTypes: ["Agent", "Region", "Area"],
  endpoints: (builder) => ({
    getRegionalOfficerById: builder.mutation<any, number>({
      query: (userId) => ({
        url: "/regionalOfficer/getRegionalOfficerById",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    getIntelligenceOfficerById: builder.mutation<any, number>({
      query: (userId) => ({
        url: "/regionalOfficer/getIntelligenceOfficerById",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    getFieldOfficerById: builder.mutation<any, number>({
      query: (userId) => ({
        url: "/feildOfficer/getFieldOfficerById",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    getAgentDetailsByUserId: builder.mutation<any, number>({
      query: (userId) => ({
        url: "/agent/get_agent_details_by_user_id",
        method: "POST",
        body: {
          user_id: userId,
        },
      }),
    }),
    getAllAgents: builder.mutation<GetAgentsApiResponse, GetAgentsRequest & { is_assigned?: number }>({
      query: (body) => ({
        url: "agents/getAllAgents",
        method: "POST",
        body: {
          ...body,
          is_assigned: body?.is_assigned !== undefined ? body.is_assigned : 0,
        },
      }),
    }),
    getAgentById: builder.mutation<any, any>({
      query: (userId) => ({
        url: "/agents/getAgentById",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
    
    getAllIntelligenceOfficers: builder.mutation<any, { is_assigned?: number } | void>({
      query: (body) => ({
        url: "/master/get_all_intelligence_officers",
        method: "POST",
        body: body || { is_assigned: 0 },
      }),
    }),
    getAllRegionalOfficers: builder.mutation<any, { is_assigned?: number } | void>({
      query: (body) => ({
        url: "/master/get_all_regional_officers",
        method: "POST",
        body: body || { is_assigned: 0 },
      }),
    }),
    getAllFieldOfficers: builder.mutation<any, { is_assigned?: number } | void>({
      query: (body) => ({
        url: "/master/get_all_field_officers",
        method: "POST",
        body: body || { is_assigned: 0 },
      }),
    }),
    getLocationHierarchyDetails: builder.mutation<any, { district_id: number; mandal_id: number }>({
      query: (body) => ({
        url: "/master/get_location_hierarchy_details",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAgentDetailsByUserIdMutation,
  useGetAllAgentsMutation,
  useGetAgentByIdMutation,
  useGetRegionalOfficerByIdMutation,
  useGetIntelligenceOfficerByIdMutation,
  useGetFieldOfficerByIdMutation,
  useGetAllIntelligenceOfficersMutation,
  useGetAllRegionalOfficersMutation,
  useGetAllFieldOfficersMutation,
  useGetLocationHierarchyDetailsMutation,
} = roleManagerApi;