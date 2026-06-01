import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../../core/api/baseApi';
import { roleManagerApi } from '../../features/role-manager/api/roleManagerApi';
import { superAdminApi } from '../../features/super-admin/api/superAdminApi';
import { rtkQueryErrorLogger } from '../../core/api/errorMiddleware';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware, roleManagerApi.middleware, superAdminApi.middleware, rtkQueryErrorLogger),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type { RootState } from './rootReducer';
