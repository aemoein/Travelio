import React from "react";
import AdventureCard from "./AdventureCard";
import PuzzleGame from "./PuzzleGame";
import { Box, Typography } from "@mui/material";

const Puzzle = ({ challenge, city, user, handleReward }) => {
  return (
    <Box>
      <Typography variant="h1" sx={{ textAlign: "center", mt: 2 }}>
        🤠 Unlock the mystery and reveal the magic! 🌟
      </Typography>
      <Box className="challenge-game-grid">
        <Box className="game" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Box className="task">
            <Typography variant="h2" sx={{ textAlign: "center", mt: 2 }}>
              🔭 {challenge.title} 🗺️
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {challenge.description}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              <b>Task: {challenge.tasks}</b>
            </Typography>
          </Box>
          <Box className="solution">
            <PuzzleGame
              handleReward={handleReward}
              word={challenge.targets}
              reattempts={challenge.attempts}
            />
          </Box>
        </Box>
        <AdventureCard user={user} city={city} />
      </Box>
    </Box>
  );
};

export default Puzzle;