import { roleManagerApi } from "./roleManagerApi";

export const userDirectoryApi = roleManagerApi.injectEndpoints({
    endpoints: (builder) => ({

        // 1. Region Officer Details
        getRegionOfficerDetails: builder.mutation<any, void>({
            query: () => ({
                url: "/userDirectory/regionOfficerDetails",
                method: "POST",
                body: {
                    state_id: 1,
                    region_id: 6,
                },
            }),
        }),

        // 2. Field Officer Details
        getFieldOfficerDetails: builder.mutation<any, void>({
            query: () => ({
                url: "/userDirectory/fieldOfficers",
                method: "POST",
                body: {
                    regional_officer_id: 2,
                    intelligence_officer_id: 3,
                    offset: "0",
                },
            }),
        }),

        // 3. Agent Details
        getAgentDetails: builder.mutation<any, void>({
            query: () => ({
                url: "/userDirectory/agentDetails",
                method: "POST",
                body: {
                    field_officer_id: 46,
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