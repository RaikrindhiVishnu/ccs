import { ccsApi } from "./ccsApi";
import type {
  DashboardFarmlandDetails,
  PipelineStatus,
  User,
  ScreeningOutcome,
  RecentActivityResponse
} from "../types/ccsApiTypes";

export const dashboardApi = ccsApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardAllFarmlandDetails: builder.mutation<DashboardFarmlandDetails, void | any>({
      query: (body) => ({
        url: "/dashboard/get-all-farmland-details",
        method: "POST",
        body: body || {},
      }),
    }),
    getDashboardPipelineStatus: builder.mutation<PipelineStatus, void | any>({
      query: (body) => ({
        url: "/dashboard/pipeline-status",
        method: "POST",
        body: body || {},
      }),
    }),
    getDashboardUser: builder.mutation<User, { user_id: number }>({
      query: (body) => ({
        url: "/dashboard/get-user-by-id",
        method: "POST",
        body,
      }),
    }),
    getDashboardScreeningOutcomes: builder.mutation<ScreeningOutcome, void | any>({
      query: (body) => ({
        url: "/dashboard/screening-outcomes",
        method: "POST",
        body: body || {},
      }),
    }),
    getDashboardRecentActivities: builder.mutation<RecentActivityResponse, void | any>({
      query: (body) => ({
        url: "/dashboard/recent-activities",
        method: "POST",
        body: body || {},
      }),
    }),
  }),
});

export const {
  useGetDashboardAllFarmlandDetailsMutation,
  useGetDashboardPipelineStatusMutation,
  useGetDashboardUserMutation,
  useGetDashboardScreeningOutcomesMutation,
  useGetDashboardRecentActivitiesMutation,
} = dashboardApi;