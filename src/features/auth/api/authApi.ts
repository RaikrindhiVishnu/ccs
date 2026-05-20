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

    approveUser: builder.mutation<any, { user_id: number; role_id: number; role_code: string }>({
      query: (body) => ({
        url: "/auth/approveUser",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendIssueMailMutation,
  useApproveUserMutation,
} = authApi;