import { roleManagerApi } from "./roleManagerApi";
import type {
  CreateAgentRequest,
  AgentOnboardingVelocityRequest,
  AgentOnboardingVelocityResponse,
  RegionCreationVelocityResponse,
  RoleCreationOverviewResponse,
} from "../types/agent";

export const agentApi = roleManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        createAgent: builder.mutation<any, CreateAgentRequest>({
            query: (body) => ({
                url: "/agents/createAgent",
                method: "POST",
                body,
            }),
        }),
  endpoints: (builder) => ({
    createAgent: builder.mutation<any, CreateAgentRequest>({
      query: (body) => ({
        url: "/agent/createAgent",
        method: "POST",
        body,
      }),
    }),
    getAgentOnboardingVelocity: builder.query<
      AgentOnboardingVelocityResponse,
      AgentOnboardingVelocityRequest
    >({
      query: (body) => ({
        url: "/dashboard/get-agent-onboarding-velocity",
        method: "POST",
        body,
      }),
    }),
    getRegionCreationVelocity: builder.query<
      RegionCreationVelocityResponse,
      AgentOnboardingVelocityRequest
    >({
      query: (body) => ({
        url: "/dashboard/get-region-creation-velocity",
        method: "POST",
        body,
      }),
    }),
    getRoleCreationOverview: builder.query<
      RoleCreationOverviewResponse,
      AgentOnboardingVelocityRequest
    >({
      query: (body) => ({
        url: "/dashboard/get-role-creation-overview",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateAgentMutation,
  useGetAgentOnboardingVelocityQuery,
  useGetRegionCreationVelocityQuery,
  useGetRoleCreationOverviewQuery,
} = agentApi;
