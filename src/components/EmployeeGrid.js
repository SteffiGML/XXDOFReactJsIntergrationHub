import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  useGetFusionEmployeesQuery,
  useGetDarwinBoxEmployeesQuery,
} from "../api/apiSlice";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";


import APP_CONSTANT from "../constants/constant";
import { generateColumnDefs } from "../utils/appUtils";

ModuleRegistry.registerModules([AllCommunityModule]);

const EmployeeGrid = ({ source = APP_CONSTANT.FUSION }) => {
  const fusion = useGetFusionEmployeesQuery(undefined, {
    skip: source !== APP_CONSTANT.FUSION,
  });
  const darwin = useGetDarwinBoxEmployeesQuery(undefined, {
    skip: source !== APP_CONSTANT.DARWINBOX,
  });

  const data = source === APP_CONSTANT.DARWINBOX ? darwin.data : fusion.data;
  const isLoading =
    source === APP_CONSTANT.DARWINBOX ? darwin.isLoading : fusion.isLoading;
  const error = source === APP_CONSTANT.DARWINBOX ? darwin.error : fusion.error;
  const rowData = useMemo(
    () =>
      source === APP_CONSTANT.DARWINBOX
        ? data
        : data?.items || [],
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
    return (
      <div className="p-4 text-gray-700">Loading {source} employees...</div>
    );

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
        rowSelection="multiple"
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default EmployeeGrid;
