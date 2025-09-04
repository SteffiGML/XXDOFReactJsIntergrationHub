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
import { useSyncFusionDBOXGradesMutation } from "../../api/apiSlice";

const GradeSyncPage = () => {
  const [date, setDate] = useState("");
  const [res, setRes] = useState("Grades synced successfully!");
  const [resMsg, setResMsg] = useState([]);
  const [syncFusionDBOXGrades, { isLoading, isSuccess, error }] =
    useSyncFusionDBOXGradesMutation();

  const handleSubmit = async () => {
    if (!date) return alert("Please select a date");

    try {
      console.log(date);
      const isoDate = new Date(date).toISOString();

      const response = await syncFusionDBOXGrades({ minDate: isoDate }).unwrap();
      if (response.success) {
        setRes(response.message || "Sync completed successfully");
        if (response.details) {
          setResMsg(response.details);
        }else{
          setResMsg([response.message])
        }

        console.log("Sync successful:", response.message);
      } else {
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
        Grade Sync from Fusion to Darwinbox
      </Typography>

      <Box display="flex" flexDirection="column" gap={3}>
        <TextField
          label="Select Date"
          type="datetime-local"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Sync Grades"
          )}
        </Button>

        {isSuccess &&
          resMsg.map((msg) => {
            return <Alert severity="success">{msg}</Alert>;
          })}
        {error && (
          <Alert severity="error">
            Failed to sync Grades.{error?.data.errors?.[0]?.msg}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default GradeSyncPage;
