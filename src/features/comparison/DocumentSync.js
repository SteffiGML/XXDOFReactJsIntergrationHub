import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

// Your doc mapping
const documents = [
  {
    sectionID: "hr_letters",
    sectionAtt: "confirmation_hr_letters",
    docType: "Employment Contract",
  },
  {
    sectionID: "hr_letters",
    sectionAtt: "employee_separation_related_hr_letters",
    docType: "Reference",
  },
  {
    sectionID: "hr_letters",
    sectionAtt: "employment_related_hr_letters",
    docType: "Employment Letter",
  },
  {
    sectionID: "hr_letters",
    sectionAtt: "offer_letters",
    docType: "Recruiting Job Offer",
  },
  {
    sectionID: "hr_letters",
    sectionAtt: "offer_proposal_letters",
    docType: "Recruiting Job Offer",
  },
  {
    sectionID: "hr_letters",
    sectionAtt: "payslips_hr_letters",
    docType: "Historical Payslip",
  },
  {
    sectionID: "misc",
    sectionAtt: "a6746e1356ef63",
    docType: "Security Clearance",
  },
  {
    sectionID: "personal_documents",
    sectionAtt: "driving_licence",
    docType: "Drivers License",
  },
  {
    sectionID: "personal_documents",
    sectionAtt: "employment_documents",
    docType: "Other Employment",
  },
  {
    sectionID: "personal_documents",
    sectionAtt: "passport",
    docType: "Passport",
  },
  {
    sectionID: "personal_documents",
    sectionAtt: "emirates_card",
    docType: "Emirates ID",
  },
  {
    sectionID: "personal_documents",
    sectionAtt: "a6698c10b7d306",
    docType: "Visa and Permit",
  },
  {
    sectionID: "visa",
    sectionAtt: "a6698ab05d4632",
    docType: "Visa and Permit",
  },
];

const DocumentSyncPage = () => {
  const [userId, setUserId] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!userId || !selectedDoc) {
      setResult({
        success: false,
        message: "Please provide User ID and select a document.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const payload = {
        userID: userId,
        sectionID: selectedDoc.sectionID,
        sectionAtt: selectedDoc.sectionAtt,
        docType: selectedDoc.docType,
      };
      console.log(payload);
      // // Call your backend API integration here
      // const res = await fetch("/api/runIntegration", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      // const data = await res.json();

      // if (res.ok) {
      //   setResult({
      //     success: true,
      //     message: data.message || "Integration successful!",
      //   });
      // } else {
      //   setResult({
      //     success: false,
      //     message: data.error || "Integration failed!",
      //   });
      // }
    } catch (err) {
      setResult({ success: false, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Run Document Integration
      </Typography>

      <TextField
        fullWidth
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        margin="normal"
      />

      <TextField
        select
        fullWidth
        label="Select Document"
        value={
          selectedDoc
            ? `${selectedDoc.sectionID}-${selectedDoc.sectionAtt}`
            : ""
        }
        onChange={(e) => {
          const doc = documents.find(
            (d) => `${d.sectionID}-${d.sectionAtt}` === e.target.value
          );
          setSelectedDoc(doc || null);
        }}
        margin="normal"
      >
        {documents.map((doc, idx) => (
          <MenuItem key={idx} value={`${doc.sectionID}-${doc.sectionAtt}`}>
            {doc.docType} ({doc.sectionID})
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress size={24} /> : "Run Integration"}
        </Button>
      </Box>

      {result && (
        <Alert severity={result.success ? "success" : "error"} sx={{ mt: 2 }}>
          {result.message}
        </Alert>
      )}
    </Container>
  );
};

export default DocumentSyncPage;
