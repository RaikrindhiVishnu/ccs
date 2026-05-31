import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../../core/api/baseApi';
import { roleManagerApi } from '../../features/role-manager/api/roleManagerApi';
import authReducer from '../../features/auth/store/authSlice';
import roleManagerReducer from '../../features/role-manager/store/roleManagerSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [roleManagerApi.reducerPath]: roleManagerApi.reducer,
  auth: authReducer,
  roleManager: roleManagerReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
