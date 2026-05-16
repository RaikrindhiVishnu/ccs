import { roleManagerApi } from "./roleManagerApi";

export interface GetAgentsRequest {
  is_verified: number;
}

export interface AgentResponse {
  id: number;

  name?: string;
  full_name?: string;

  first_name?: string;
  last_name?: string;

  email?: string;
  phone?: string;
  dob?: string;

  location?: string;
  city?: string;
  address?: string;
  pincode?: string;

  avatar?: string;
  profile_image?: string;

  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;

  id_proof_front_url?: string;
  pan_card_url?: string;
}

export interface GetAgentsApiResponse {
  data: AgentResponse[];
}

export interface GetAgentByIdResponse {
  data: AgentResponse;
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
  }),
});

export const {
  useGetAllAgentsMutation,
  useGetAgentByIdQuery,
} = getAgentsApi;