import { baseApi } from "../../../core/api/baseApi";
import type { LoginRequest, LoginResponse } from "../types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    sendIssueMail: builder.mutation({
      query: (body) => ({
        url: "/mail/send",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendIssueMailMutation,
} = authApi;