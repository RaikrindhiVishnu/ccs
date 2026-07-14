import { combineReducers } from '@reduxjs/toolkit';
import { baseApi } from '../../core/api/baseApi';
import { roleManagerApi } from '../../features/role-manager/api/roleManagerApi';
import { superAdminApi } from '../../features/super-admin/api/superAdminApi';
import { ccsApi } from '../../features/ccs/api/ccsApi';
import authReducer from '../../features/auth/store/authSlice';
import roleManagerReducer from '../../features/role-manager/store/roleManagerSlice';
import superAdminReducer from '../../features/super-admin/store/superAdminSlice';
import ccsReducer from '../../features/ccs/store/ccsSlice';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [roleManagerApi.reducerPath]: roleManagerApi.reducer,
  [superAdminApi.reducerPath]: superAdminApi.reducer,
  [ccsApi.reducerPath]: ccsApi.reducer,
  auth: authReducer,
  roleManager: roleManagerReducer,
  superAdmin: superAdminReducer,
  ccs: ccsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
