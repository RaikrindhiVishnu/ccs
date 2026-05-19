import { roleManagerApi } from "./roleManagerApi";

export const userDirectoryApi = roleManagerApi.injectEndpoints({
    endpoints: (builder) => ({

        // 1. Region Officer Details
        getRegionOfficerDetails: builder.query<any, { state_id: string | number; region_id: string | number }>({
            query: (body) => ({
                url: "/userDirectory/regionOfficerDetails",
                method: "POST",
                body,
            }),
        }),

        // 1.1 Region Officer Details By ID (as per ChatGPT recommendation)
        regionOfficerDetails: builder.query<any, string | number>({
            query: (id) => ({
                url: `/regionalOfficerDetails/${id}`,
                method: "GET",
            }),
        }),

        // 2. Field Officer Details
        getFieldOfficerDetails: builder.query<any, { regional_officer_id: string | number; intelligence_officer_id: string | number; offset?: string }>({
            query: (body) => ({
                url: "/userDirectory/fieldOfficers",
                method: "POST",
                body: {
                    offset: "0",
                    ...body,
                },
            }),
        }),

        // 3. Agent Details
        getAgentDetails: builder.query<any, string | number>({
            query: (fieldOfficerId) => ({
                url: "/userDirectory/agentDetails",
                method: "POST",
                body: {
                    field_officer_id: fieldOfficerId,
                    offset: "0",
                    limit: 200,
                },
            }),
        }),
    }),
});

export const {
    useGetRegionOfficerDetailsQuery,
    useRegionOfficerDetailsQuery,
    useLazyRegionOfficerDetailsQuery,
    useGetFieldOfficerDetailsQuery,
    useGetAgentDetailsQuery,
    useLazyGetAgentDetailsQuery,
} = userDirectoryApi;