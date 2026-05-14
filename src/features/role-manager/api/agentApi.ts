import { roleManagerApi } from "./roleManagerApi";
import type {
  CreateAgentRequest,
  AgentOnboardingVelocityRequest,
  AgentOnboardingVelocityResponse,
  RegionCreationVelocityResponse,
  RoleCreationOverviewResponse,
  CreateRegionalOfficerRequest,
  CreateFieldOfficerRequest,
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
    createRegionalOfficer: builder.mutation<any, CreateRegionalOfficerRequest>({
      query: (body) => ({
        url: "/regionalOfficer/createRegionalOfficer",
        method: "POST",
        body,
      }),
    }),
    createFieldOfficer: builder.mutation<any, CreateFieldOfficerRequest>({
      query: (body) => ({
        url: "/feildOfficer/createFieldOfficer",
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
  useCreateRegionalOfficerMutation,
  useCreateFieldOfficerMutation,
} = agentApi;
