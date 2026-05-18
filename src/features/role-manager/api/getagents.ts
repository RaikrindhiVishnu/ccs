import { roleManagerApi } from "./roleManagerApi";

export interface GetAgentsRequest {
  is_verified: number;
  
}

export interface AgentResponse {
  id: string;
  name: string;
  full_name?: string;
  location?: string;
  city?: string;
  address?: string;
  avatar?: string;
  profile_image?: string;
}

export interface GetAgentsApiResponse {
  data: AgentResponse[];
}

export const getAgentsApi = roleManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAgents: builder.mutation<
      GetAgentsApiResponse,
      GetAgentsRequest
    >({
      query: (body) => ({
        url: "agents/getAllAgents",
        method: "POST",
        body,
      }),
    }),

    getAgentById: builder.query<
      GetAgentByIdResponse,
      number
    >({
      query: (userId) => ({
        url: "agents/getAgentById",
        method: "POST",
        body: {
          userId,
        },
      }),
    }),

    updateAgentVerification: builder.mutation<any, any>({
      query: (body) => ({
        url: "agents/updateAgent",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllAgentsMutation,
  useGetAgentByIdQuery,
  useUpdateAgentVerificationMutation,
} = getAgentsApi;