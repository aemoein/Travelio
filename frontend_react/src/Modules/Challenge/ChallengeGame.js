import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdventureCard from "./AdventureCard";
import Puzzle from "./Puzzle";
import PuzzleGame from "./PuzzleGame";
import "./Challenge.css";

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

  useEffect(() => {
    const fetchChallenge = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 2500);

      try {
        let endpoint = `http://localhost:33507/api/Challenge/${location}/${type}?city=${city}`;

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
    try {
      // Update the title
      const responseTitle = await fetch(
        `http://localhost:11169/api/challengeProfile/titles?username=aemoein&title=${challenge.title}`,
        {
          method: "PUT",
        }
      );

      if (!responseTitle.ok) {
        throw new Error("Failed to update the title");
      }

      // Update the points
      const responsePoints = await fetch(
        `http://localhost:11169/api/challengeProfile/points?username=aemoein&points=${
          challenge.points * challenge.multiplier
        }`,
        {
          method: "PUT",
        }
      );

      if (!responsePoints.ok) {
        throw new Error("Failed to update the points");
      }

      // Update the solved status
      const responseSolved = await fetch(
        `http://localhost:11169/api/challengeProfile/solved?username=aemoein`,
        {
          method: "PUT",
        }
      );

      if (!responseSolved.ok) {
        throw new Error("Failed to update the solved status");
      }

      // Log the activity if the solved status update is successful
      const responseLog = await fetch(
        `http://localhost:9000/api/logs/record/aemoein/${challenge.id}/${challenge.nextChallengedur}`,
        {
          method: "POST",
        }
      );

      if (!responseLog.ok) {
        throw new Error("Failed to log the activity");
      }

      // Navigate to the "/challenge" page
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
    return <p>Loading...</p>;
  }

  const currentTask = challenge.tasks[currentTaskIndex];
  const currentTarget = challenge.targets
    ? challenge.targets[currentTaskIndex]
    : null;

  return (
    <div className="bodychallenge">
      <h1>Let the Adventure begin!!👒</h1>

      {type !== "puzzle" && (
        <div className="challenge-game-grid">
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
        </div>
      )}
      {type === "puzzle" && (
        <Puzzle
          challenge={challenge}
          city={city}
          user="aemoein"
          handleReward={handleReward}
        />
      )}
    </div>
  );
}

function Task({
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
    <div className="game">
      <div className="task">
        <h1>🔭{challenge.title}🗺️</h1>
        <p>{challenge.description}</p>
        <b>Task: {currentTask}</b>
      </div>

      <div className="solution">
        <div>
          <p>Please upload your solution here.</p>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div>
          <button onClick={handleSubmit} className="check-challenge">
            Check
          </button>
          {loading && <p>Loading...</p>}
          {prediction &&
            (prediction === currentTarget ? (
              <div>
                <p
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  Well done Adventurous, it is {formatPrediction(prediction)}
                </p>
                {currentTaskIndex < challenge.tasks.length - 1 ? (
                  <button onClick={handleNextTask}>Next Task</button>
                ) : (
                  <button onClick={handleReward}>Remain the Title🏅</button>
                )}
              </div>
            ) : (
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                WRONG ANSWER, Try again
              </p>
            ))}
          {error && <p>Error: {error}</p>}
        </div>
      </div>
    </div>
  );
}
