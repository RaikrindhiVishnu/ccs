import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "@/core/api/baseQueryWithReauth";
import { env } from "@/core/config/env";
import type {
  GetAgentsRequest,
  GetAgentsApiResponse,
  GetAgentByIdResponse,
} from "../types/agent";

export const roleManagerApi = createApi({
  reducerPath: "roleManagerApi",
  baseQuery: createBaseQueryWithReauth(env.ROLE_MANAGER_API_BASE_URL),
  tagTypes: ["Agent", "Region", "Area"],
  endpoints: (builder) => ({
    getRegionalOfficerById: builder.mutation<any, number>({
      query: (userId) => ({
        url: `/regionalOfficer/getRegionalOfficerById/${userId}`,
        method: "POST",
      }),
    }),
    getFieldOfficerById: builder.mutation<any, number>({
      query: (userId) => ({
        url: `/feildOfficer/getFieldOfficerById/${userId}`,
        method: "POST",
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
    getAllAgents: builder.mutation<GetAgentsApiResponse, GetAgentsRequest>({
      query: (body) => ({
        url: "agents/getAllAgents",
        method: "POST",
        body,
      }),
    }),
    getAgentById: builder.query<GetAgentByIdResponse, number>({
      query: (userId) => ({
        url: "/agent/getAgentById",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),
  }),
});

export const {
    useGetRegionalOfficerByIdMutation,
    useGetFieldOfficerByIdMutation,
    useGetAgentDetailsByUserIdMutation,
    useGetAllAgentsMutation,
    useGetAgentByIdQuery,
} = roleManagerApi;