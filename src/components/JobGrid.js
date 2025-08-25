import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  useGetFusionJobsQuery,
  useGetDarwinBoxJobsQuery,
} from "../api/apiSlice";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import APP_CONSTANT from "../constants/constant";
import { generateColumnDefs } from "../utils/appUtils";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

const JobGrid = ({ source = APP_CONSTANT.FUSION }) => {
  const fusion = useGetFusionJobsQuery(undefined, {
    skip: source !== APP_CONSTANT.FUSION,
  });
  const darwin = useGetDarwinBoxJobsQuery(undefined, {
    skip: source !== APP_CONSTANT.DARWINBOX,
  });

  const data = source === APP_CONSTANT.DARWINBOX ? darwin.data : fusion.data;
  const isLoading =
    source === APP_CONSTANT.DARWINBOX ? darwin.isLoading : fusion.isLoading;
  const error = source === APP_CONSTANT.DARWINBOX ? darwin.error : fusion.error;
  const rowData = useMemo(
    () => (source === APP_CONSTANT.DARWINBOX ? data : data?.items || []),
    [data]
  );

  const columnDefs = useMemo(() => generateColumnDefs(rowData), [rowData]);
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    }),
    []
  );

  if (isLoading)
    return <Typography sx={{ p: 2 }}>{`Loading ${source} JObs...`}</Typography>;
  if (error) {
    const errMsg = error?.data?.error || "Unknown error occurred.";
    return (
      <div className="p-4 text-red-500">
        Error fetching {source} data: {errMsg}
      </div>
    );
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        loading={isLoading}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default JobGrid;
