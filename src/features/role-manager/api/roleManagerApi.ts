import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "@/core/api/baseQueryWithReauth";
import { env } from "@/core/config/env";

/**
 * Dedicated API slice for Role Manager features.
 * Uses the ROLE_MANAGER_API_BASE_URL and includes automatic 
 * token injection and re-authentication logic.
 */
export const roleManagerApi = createApi({
    reducerPath: "roleManagerApi",
    baseQuery: createBaseQueryWithReauth(env.ROLE_MANAGER_API_BASE_URL),
    tagTypes: ["Agent", "Region", "Area"],
    endpoints: () => ({}),
});
