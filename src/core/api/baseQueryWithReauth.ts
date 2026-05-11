import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';
import { env } from '../config/env';
import { logOut, updateTokens } from '../../features/auth/store/authSlice';
import type { LoginResponse } from '../../features/auth/types';

interface AuthState {
  auth: {
    accessToken: string | null;
    refreshToken: string | null;
  };
}

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as AuthState).auth.accessToken;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = (api.getState() as AuthState).auth.refreshToken;

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: '/auth/refreshToken',
              method: 'POST',
              body: { token: refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            const data = refreshResult.data as LoginResponse;
            api.dispatch(
              updateTokens({
                accessToken: data.token,
                refreshToken: data.refreshToken,
              })
            );
            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(logOut());
          }
        } else {
          api.dispatch(logOut());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};