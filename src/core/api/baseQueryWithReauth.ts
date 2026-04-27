import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { env } from '../config/env';
import { logOut, updateTokens } from '../../features/auth/store/authSlice';

// Create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = (api.getState() as any).auth.refreshToken;
        
        if (refreshToken) {
          // Perform refresh logic
          const refreshResult = await baseQuery(
            {
              url: '/auth/refresh',
              method: 'POST',
              body: { refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            // Update tokens in Redux
            api.dispatch(updateTokens(refreshResult.data as { accessToken: string; refreshToken: string }));
            
            // Retry the original request
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logOut());
          }
        } else {
          api.dispatch(logOut());
        }
      } finally {
        // Release must be called once the mutex should be released
        release();
      }
    } else {
      // Wait until the mutex is available and retry the original request
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
