import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import AdventureCard from "./AdventureCard";
import Puzzle from "./Puzzle";
import Header from "./Header";
import Task from "./Task";

export const formatPrediction = (prediction) => {
  return prediction
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function ChallengeGame() {
  const { location, type, city } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 2500);

      try {
        let endpoint = `http://localhost:3006/api/Challenge/${location}/${type}?city=${city}`;

        const response = await fetch(endpoint, { signal: controller.signal });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setChallenge(data);
      } catch (err) {
        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else {
          setError(err.message);
        }
      }
    };

    fetchChallenge();
  }, [location, type, city]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("http://localhost:5555/api/predict/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPrediction(data.predicted_class);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReward = async () => {
    const user = localStorage.getItem('username');

    setUser(user);
    try {
      const responseTitle = await fetch(
        `http://localhost:3009/api/challengeProfile/titles?username=${user}&title=${challenge.title}`,
        { method: "PUT" }
      );

      if (!responseTitle.ok) {
        throw new Error("Failed to update the title");
      }

      const responsePoints = await fetch(
        `http://localhost:3009/api/challengeProfile/points?username=${user}&points=${challenge.points * challenge.multiplier}`,
        { method: "PUT" }
      );

      if (!responsePoints.ok) {
        throw new Error("Failed to update the points");
      }

      const responseSolved = await fetch(
        `http://localhost:3009/api/challengeProfile/solved?username=${user}`,
        { method: "PUT" }
      );

      if (!responseSolved.ok) {
        throw new Error("Failed to update the solved status");
      }

      const responseLog = await fetch(
        `http://localhost:3007/api/logs/record/aemoein/${challenge.id}/${challenge.nextChallengedur}`,
        { method: "POST" }
      );

      if (!responseLog.ok) {
        throw new Error("Failed to log the activity");
      }

      navigate("/challenge");
    } catch (error) {
      console.error("Error updating the challenge profile:", error.message);
    }
  };

  const handleNextTask = () => {
    setFile(null);
    setPrediction(null);
    setCurrentTaskIndex(currentTaskIndex + 1);
  };

  if (!challenge) {
    return <Typography>Loading...</Typography>;
  }

  const currentTask = challenge.tasks[currentTaskIndex];
  const currentTarget = challenge.targets
    ? challenge.targets[currentTaskIndex]
    : null;

  return (
    <Box sx={{ fontFamily: "Poppins, sans-serif", background: "#530358", color: "white", display: "block", justifyContent: "center", alignItems: "center", height: "110vh" }}>
      <Header />
      {type !== "puzzle" && (
        <Grid container spacing={3} sx={{ gridTemplateRows: "1fr auto", gridTemplateColumns: "3fr 2fr", gap: "20px", padding: "20px" }}>
          <Task
            challenge={challenge}
            currentTask={currentTask}
            currentTarget={currentTarget}
            file={file}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            loading={loading}
            prediction={prediction}
            error={error}
            currentTaskIndex={currentTaskIndex}
            handleNextTask={handleNextTask}
            handleReward={handleReward}
          />
          <AdventureCard city={city} user={"aemoein"} />
        </Grid>
      )}
      {type === "puzzle" && (
        <Puzzle
          challenge={challenge}
          city={city}
          user="aemoein"
          handleReward={handleReward}
        />
      )}
    </Box>
  );
}