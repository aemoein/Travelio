import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import LoadingPopup from "./LoadingPopup";
import FileUploadSection from "./FileUploadSection";
import { formatPrediction } from "./ChallengeGame";

export default function Task({
  challenge,
  currentTask,
  handleFileChange,
  handleSubmit,
  loading,
  prediction,
  currentTarget,
  currentTaskIndex,
  handleNextTask,
  handleReward,
  error,
}) {
  return (
    <Paper sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", color: "#530358", padding: "16px", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
      <Box sx={{ flex: 1, marginBottom: "16px", color: "#86117b", border: "2px solid #c169b8", padding: "16px", borderRadius: "8px" }}>
        <Typography variant="h1">🔭{challenge.title}🗺️</Typography>
        <Typography>{challenge.description}</Typography>
        <Typography variant="body1"><b>Task: {currentTask}</b></Typography>
      </Box>

      <Box sx={{ flex: 1, display: "grid", flexDirection: "column", alignItems: "flex-start", border: "2px solid #c169b8", padding: "16px", borderRadius: "8px" }}>
        <FileUploadSection handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
        {loading && <LoadingPopup />}
        {prediction && (
          prediction === currentTarget ? (
            <Box>
              <Typography sx={{ color: "green", fontWeight: "bold", fontStyle: "italic" }}>
                Well done Adventurous, it is {formatPrediction(prediction)}
              </Typography>
              {currentTaskIndex < challenge.tasks.length - 1 ? (
                <Button onClick={handleNextTask}>Next Task</Button>
              ) : (
                <Button onClick={handleReward}>Remain the Title🏅</Button>
              )}
            </Box>
          ) : (
            <Typography sx={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}>
              WRONG ANSWER, Try again
            </Typography>
          )
        )}
        {error && <Typography>Error: {error}</Typography>}
      </Box>
    </Paper>
  );
}