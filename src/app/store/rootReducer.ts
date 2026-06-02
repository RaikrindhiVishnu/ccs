import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../../core/api/baseApi';
import { roleManagerApi } from '../../features/role-manager/api/roleManagerApi';
import { superAdminApi } from '../../features/super-admin/api/superAdminApi';
import authReducer from '../../features/auth/store/authSlice';
import roleManagerReducer from '../../features/role-manager/store/roleManagerSlice';
import superAdminReducer from '../../features/super-admin/store/superAdminSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [roleManagerApi.reducerPath]: roleManagerApi.reducer,
  [superAdminApi.reducerPath]: superAdminApi.reducer,
  auth: authReducer,
  roleManager: roleManagerReducer,
  superAdmin: superAdminReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
