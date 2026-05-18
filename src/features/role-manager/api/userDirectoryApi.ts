import { roleManagerApi } from "./roleManagerApi";

export const userDirectoryApi = roleManagerApi.injectEndpoints({
    endpoints: (builder) => ({

        // 1. Region Officer Details
        getRegionOfficerDetails: builder.mutation<any, { state_id: string | number; region_id: string | number }>({
            query: (body) => ({
                url: "/userDirectory/regionOfficerDetails",
                method: "POST",
                body,
            }),
        }),

        // 2. Field Officer Details
        getFieldOfficerDetails: builder.mutation<any, { regional_officer_id: string | number; intelligence_officer_id: string | number; offset?: string }>({
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
        getAgentDetails: builder.mutation<any, string | number>({
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
    useGetRegionOfficerDetailsMutation,
    useGetFieldOfficerDetailsMutation,
    useGetAgentDetailsMutation,
} = userDirectoryApi;