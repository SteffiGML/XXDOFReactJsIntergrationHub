import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useSyncFusionDBOXEmployeesMutation } from "../../api/apiSlice";

const EmployeesSyncPage = () => {
  const [date, setDate] = useState("");
  const [res, setRes] = useState("Employees synced successfully!");
  const [resMsg, setResMsg] = useState([]);
  const [syncFusionDBOXEmployees, { isLoading, isSuccess, error }] =
    useSyncFusionDBOXEmployeesMutation();

  const handleSubmit = async () => {
    if (!date) return alert("Please select a date");

    try {
      const isoDate = new Date(date).toLocaleDateString().replaceAll("/", "-");
      console.log();
      const response = await syncFusionDBOXEmployees({
        date: isoDate,
      }).unwrap();

      if (response.success) {
        setRes(response.message || "Sync completed successfully");
        if (response.details) {
          setResMsg(response.details);
        } else {
          setResMsg([response.message]);
          setResMsg([response.messages]);
        }

        console.log("Sync successful:", response.message);
      } else {
        setResMsg([response.error]);
        setRes(response.error || "An unknown error occurred");
      }
    } catch (err) {
      const errorMsg = err.data?.errors?.[0]?.msg;

      console.error("Sync failed:", errorMsg || err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        Employee Sync from Darwinbox to Fusion
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Select Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
          
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Basic date time picker"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sync Employees"
          )}
        </Button>

        {isSuccess &&
          resMsg.map((msg) => {
            return <Alert severity="success">{msg}</Alert>;
          })}
        {error && (
          <Alert severity="error">
            Failed to sync Employees.{error?.data.errors?.[0]?.msg}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default EmployeesSyncPage;
