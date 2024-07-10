import React from "react";
import { Box, Button, Input, Typography } from "@mui/material";

export default function FileUploadSection({ handleFileChange, handleSubmit }) {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      <Typography>Please upload your solution here.</Typography>
      <Input type="file" onChange={handleFileChange} accept="image/*" required />
      <Button onClick={handleSubmit} sx={{ background: "purple", color: "white" }}>Check</Button>
    </Box>
  );
}