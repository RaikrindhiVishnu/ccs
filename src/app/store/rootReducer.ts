import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../../core/api/baseApi';
import authReducer from '../../features/auth/store/authSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
