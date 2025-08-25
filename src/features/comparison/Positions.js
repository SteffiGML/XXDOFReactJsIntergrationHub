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
import { useSyncFusionDBOXPositionsMutation } from "../../api/apiSlice";

const PositionSyncPage = () => {
  const [date, setDate] = useState("");
  const [res, setRes] = useState("Positions synced successfully!");
  const [resMsg, setResMsg] = useState([]);
  const [syncFusionDBOXPositions, { isLoading, isSuccess, error }] =
    useSyncFusionDBOXPositionsMutation();

  const handleSubmit = async () => {
    if (!date) return alert("Please select a date");

    try {
      const isoDate = new Date(date).toISOString();

      const response = await syncFusionDBOXPositions({ minDate: isoDate }).unwrap();

      if (response.success) {
        setRes(response.message || "Sync completed successfully");
        if (response.details) {
          setResMsg(response.details);
        }else{
          setResMsg([response.message])
        }

        console.log("Sync successful:", response.message);
      } else {
        setResMsg([response.error])
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
        Position Sync from Fusion to Darwinbox
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
            "Sync Positions"
          )}
        </Button>

        {isSuccess &&
          resMsg.map((msg) => {
            return <Alert severity="success">{msg}</Alert>;
          })}
        {error && (
          <Alert severity="error">
            Failed to sync Positions.{error?.data.errors?.[0]?.msg}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default PositionSyncPage;
