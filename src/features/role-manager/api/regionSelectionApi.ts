import { roleManagerApi } from "./roleManagerApi";

/**
 * API endpoints for region selection and map data.
 */
export const regionSelectionApi = roleManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountryById: builder.query<any, { country_id: number }>({
      query: (body) => ({
        url: "master/get_country_by_id",
        method: "POST",
        body,
      }),
    }),
    getStatesByCountryId: builder.query<any, { country_id: number }>({
      query: (body) => ({
        url: "master/get_states_by_country_id",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetCountryByIdQuery, useGetStatesByCountryIdQuery } = regionSelectionApi;
