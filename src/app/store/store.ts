import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../../core/api/baseApi';
import rootReducer from './rootReducer';

/**
 * Configure the Redux store with rootReducer and middleware.
 */
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if using non-serializable objects (like dates)
    }).concat(baseApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type { RootState } from './rootReducer';
