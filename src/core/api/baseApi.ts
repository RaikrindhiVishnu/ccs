import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

/**
 * Base API service definition.
 * All feature-specific APIs should inject their endpoints here.
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth'], // Add global tags here
  endpoints: () => ({}),
});
