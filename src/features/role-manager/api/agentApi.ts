import { roleManagerApi } from "./roleManagerApi";
import type { CreateAgentRequest } from "../types/agent";

export const agentApi = roleManagerApi.injectEndpoints({
    endpoints: (builder) => ({
        createAgent: builder.mutation<any, CreateAgentRequest>({
            query: (body) => ({
                url: "/agents/createAgent",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useCreateAgentMutation } = agentApi;
