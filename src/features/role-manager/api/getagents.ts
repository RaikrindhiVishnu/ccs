import { roleManagerApi } from "./roleManagerApi";

export interface GetAgentsRequest {
  is_verified: number;
}

export interface AgentResponse {
  id: string;
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  location?: string;
  city?: string;
  address?: string;
  avatar?: string;
  profile_image?: string;
}

export interface GetAgentsApiResponse {
  data: AgentResponse[];
}

export interface GetAgentByIdResponse {
  data: {
    id: number;

    first_name?: string;
    last_name?: string;

    email?: string;
    phone?: string;
    dob?: string;

    address?: string;
    city?: string;
    pincode?: string;

    account_number?: string;
    ifsc_code?: string;
    bank_name?: string;

    avatar?: string;
    profile_image?: string;

    id_proof_front_url?: string;
    pan_card_url?: string;
  };
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

    getAgentProfile: builder.query<
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
      providesTags: ["Agent"],
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
  useGetAgentProfileQuery,
  useUpdateAgentVerificationMutation,
} = getAgentsApi;