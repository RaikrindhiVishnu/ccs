import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "@/core/api/baseQueryWithReauth";
import { env } from "@/core/config/env";


export const ccsApi = createApi({
  reducerPath: "ccsApi",
  // Ensure the env.CCS_API_BASE_URL is added to env.ts
  baseQuery: createBaseQueryWithReauth(env.CCS_API_BASE_URL as string),
  tagTypes: ["Farmland", "MasterData", "Dashboard"],
  endpoints: () => ({}),
});
