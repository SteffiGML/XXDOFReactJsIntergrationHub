import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_PATHS from "../constants/apiPaths";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_NODE_BASE_URL,
  }),
  endpoints: (builder) => ({
    getFusionEmployees: builder.query({
      query: () => API_PATHS.EMPLOYEES,
    }),
    getFusionJobs: builder.query({
      query: () => API_PATHS.JOBS,
    }),
    getFusionPositions: builder.query({
      query: () => API_PATHS.POSITIONS,
    }),
    getDarwinBoxEmployees: builder.query({
      query: () => API_PATHS.DARWINBOX_EMPLOYEES,
    }),
    getDarwinBoxPosition: builder.query({
      query: () => API_PATHS.DARWINBOX_POSITION,
    }),
    getDarwinBoxJobs: builder.query({
      query: () => API_PATHS.DARWINBOX_JOBS,
    }),
    getDarwinBoxDesignations: builder.query({
      query: () => API_PATHS.DARWINBOX_DESIGNATION,
    }),
    syncFusionDBOXJobs: builder.mutation({
      query: (minDate) => ({
        url: API_PATHS.SYNC_FUSION_DBOX_JOBS,
        method: "POST",
        body: minDate,
      }),
    }),
    syncFusionDBOXPositions: builder.mutation({
      query: (minDate) => ({
        url: API_PATHS.SYNC_FUSION_DBOX_POSITIONS,
        method: "POST",
        body: minDate,
      }),
    }),
      syncFusionDBOXEmployees: builder.mutation({
      query: (date) => ({
        url: API_PATHS.SYNC_DBOX_FUSION_EMPLOYEE,
        method: "POST",
        body: date,
      }),
    }),
        syncFusionDBOXGrades: builder.mutation({
      query: (minDate) => ({
        url: API_PATHS.SYNC_FUSION_DBOX_GRADES,
        method: "POST",
        body: minDate,
      }),
    }),
      syncFusionDBOXDepartments: builder.mutation({
      query: (minDate) => ({
        url: API_PATHS.SYNC_FUSION_DBOX_DEPARTMENTS,
        method: "POST",
        body: minDate,
      }),
    }),
    // more endpoints here
  }),
});

export const {
  useGetFusionEmployeesQuery,
  useGetFusionJobsQuery,
  useGetFusionPositionsQuery,
  useGetDarwinBoxEmployeesQuery,
  useGetDarwinBoxPositionQuery,
  useGetDarwinBoxJobsQuery,
  useGetDarwinBoxDesignationsQuery,
  useSyncFusionDBOXJobsMutation,
  useSyncFusionDBOXPositionsMutation,
  useSyncFusionDBOXEmployeesMutation,
    useSyncFusionDBOXGradesMutation,
    useSyncFusionDBOXDepartmentsMutation
} = apiSlice;
