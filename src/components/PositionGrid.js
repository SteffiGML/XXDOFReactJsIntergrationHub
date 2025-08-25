import React, { useMemo, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  useGetFusionPositionsQuery,
  useGetDarwinBoxPositionQuery,
} from "../api/apiSlice";

import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import APP_CONSTANT from "../constants/constant";
import {
  generateColumnDefs,
  generateColumnDefsFusionPosition,
} from "../utils/appUtils";

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

const PositionGrid = ({ source = APP_CONSTANT.FUSION }) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const gridRef = useRef(null);

  const fusion = useGetFusionPositionsQuery(undefined, {
    skip: source !== APP_CONSTANT.FUSION,
  });
  const darwin = useGetDarwinBoxPositionQuery(undefined, {
    skip: source !== APP_CONSTANT.DARWINBOX,
  });

  const data = source === APP_CONSTANT.DARWINBOX ? darwin.data : fusion.data;
  const isLoading =
    source === APP_CONSTANT.DARWINBOX ? darwin.isLoading : fusion.isLoading;
  const error = source === APP_CONSTANT.DARWINBOX ? darwin.error : fusion.error;
  const rowData = useMemo(
    () => (source === APP_CONSTANT.DARWINBOX ? data?.data : data?.items || []),
    [data, source]
  );
console.log(darwin)
  const columnDefs = useMemo(
    () =>
      source === APP_CONSTANT.DARWINBOX
        ? generateColumnDefsFusionPosition(data)
        : generateColumnDefs(rowData),
    [rowData, data, source]
  );

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    }),
    []
  );
  const rowSelection = {
    mode: "multiRow",
    headerCheckbox: true,
  };
  const onSelectionChanged = useCallback(() => {
    const selected = gridRef.current?.api.getSelectedRows() || [];
    setSelectedRows(selected);
  }, []);

  if (isLoading)
    return (
      <Typography sx={{ p: 2 }}>{`Loading ${source} Positions...`}</Typography>
    );

  if (error) {
    const errMsg = error?.data?.error || "Unknown error occurred.";
    return (
      <Typography sx={{ p: 2, color: "error.main" }}>
        Error fetching {source} data: {errMsg}
      </Typography>
    );
  }

  return (
    <Box>
      {/* <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setDialogVisible(true)}
        disabled={selectedRows.length === 0}
        hidden={source == APP_CONSTANT.FUSION} //chnage when get Fusion running
      >
        Sync Selected
      </Button> */}

      <Box className="ag-theme-alpine" sx={{ height: 500, width: "100%" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={source == APP_CONSTANT.FUSION ? false : rowSelection} //chnage when get Fusion running
          pagination
          paginationPageSize={10}
          onSelectionChanged={onSelectionChanged}
          
        />
      </Box>

      <Dialog
        open={dialogVisible}
        onClose={() => setDialogVisible(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Selected Row Data</DialogTitle>
        <DialogContent dividers>
          <Box
            component="pre"
            sx={{
              maxHeight: 400,
              overflowY: "auto",
              fontSize: 12,
              bgcolor: "#f9f9f9",
              p: 2,
            }}
          >
            {JSON.stringify(selectedRows, null, 2)}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogVisible(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PositionGrid;
