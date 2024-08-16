import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import ImageProcessing from "./ImageProcessing";

export default function LoadingPopup({ imageUrl }) {
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.386)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
      <Paper sx={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px", width: "40%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)", maxWidth: "80%", maxHeight: "80%", overflowY: "auto" }}>
        <ImageProcessing imageUrl={imageUrl} />
        <Typography sx={{ color: "black" }}>Please wait...</Typography>
      </Paper>
    </Box>
  );
}
