import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../../core/api/baseApi';
import authReducer from '../../features/auth/store/authSlice';

/**
 * Root reducer combining all feature slices and the base API.
 */
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  // Add other feature reducers here
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
