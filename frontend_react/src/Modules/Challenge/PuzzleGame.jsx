import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const PuzzleGame = ({ word, reattempts, handleReward }) => {
  const history = useNavigate();
  const maxAttempts = 5; // Maximum attempts allowed
  const [currentWord, setCurrentWord] = useState("");
  const [displayWord, setDisplayWord] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(maxAttempts);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [gameOver, setGameOver] = useState(false); // State to handle game over popup
  const [remainingReattempts, setRemainingReattempts] = useState(reattempts); // State to manage reattempts
  const [win, setWin] = useState(false);

  // Function to start a new game
  const startNewGame = () => {
    const newWord = word[0];
    setCurrentWord(newWord);
    setDisplayWord("_ ".repeat(newWord.length).trim()); // Initialize display word with underscores
    setAttemptsLeft(maxAttempts);
    setSelectedLetters([]);
    setIncorrectLetters([]);
    setGameOver(false); // Reset game over state
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Function to handle letter selection
  const handleLetterSelect = (letter) => {
    if (selectedLetters.includes(letter) || incorrectLetters.includes(letter)) {
      // Letter already selected
      return;
    }

    if (currentWord.includes(letter)) {
      // Update display word with correctly guessed letter
      const newDisplayWord = currentWord
        .split("")
        .map((char, index) =>
          selectedLetters.includes(char) || char === letter ? char : "_"
        )
        .join(" ");
      setDisplayWord(newDisplayWord);
      setSelectedLetters([...selectedLetters, letter]);

      // Check if all letters guessed correctly
      if (!newDisplayWord.includes("_")) {
        setWin(true);
      }
    } else {
      // Incorrect guess
      setIncorrectLetters([...incorrectLetters, letter]);
      setAttemptsLeft(attemptsLeft - 1);

      // Check if no attempts left
      if (attemptsLeft === 1) {
        setGameOver(true); // Set game over state
      }
    }
  };

  // Function to handle game over
  const handleGameOver = () => {
    if (remainingReattempts > 1) {
      setRemainingReattempts(remainingReattempts - 1);
      startNewGame();
    } else {
      history("/challenge"); // Redirect to /challenge page
    }
  };

  // Render alphabet buttons
  const renderAlphabetButtons = () => {
    return Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    ).map((letter) => {
      const lowerCaseLetter = letter.toLowerCase();
      let buttonClass = "";
      if (selectedLetters.includes(lowerCaseLetter)) {
        buttonClass = "selected";
      } else if (incorrectLetters.includes(lowerCaseLetter)) {
        buttonClass = "wrong";
      }
      return (
        <Button
          key={letter}
          onClick={() => handleLetterSelect(lowerCaseLetter)}
          disabled={
            selectedLetters.includes(lowerCaseLetter) ||
            incorrectLetters.includes(lowerCaseLetter)
          }
          className={buttonClass}
          sx={{ textTransform: "uppercase", m: 1 }}
        >
          {letter}
        </Button>
      );
    });
  };

  return (
    <Box className="bodychallenge">
      <Box className="puzzle-game">
        <Typography variant="h2" sx={{ textAlign: "center", mt: 2 }}>
          Puzzle Game
        </Typography>
        <Box className="word-display" sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h4">{displayWord}</Typography>
        </Box>
        <Box className="attempts-left" sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1">Attempts left: {attemptsLeft}</Typography>
        </Box>
        <Box className="reattempts-left" sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body1">
            Remaining Reattempts: {remainingReattempts}
          </Typography>
        </Box>
        <Box className="letter-buttons" sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          {renderAlphabetButtons()}
        </Box>
        {gameOver && (
          <Box className="popup" sx={{ textAlign: "center", mt: 2 }}>
            <Box className="popup-content">
              <Typography variant="body1">
                <b>Game Over. Try again!</b>
              </Typography>
              {remainingReattempts > 1 ? (
                <Button variant="contained" onClick={handleGameOver} sx={{ mt: 1 }}>
                  RESTART
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => history("/challenge")}
                  sx={{ mt: 1 }}
                >
                  Go to Challenges
                </Button>
              )}
            </Box>
          </Box>
        )}
        {win && (
          <Box className="popup" sx={{ textAlign: "center", mt: 2 }}>
            <Box className="popup-content">
              <Typography variant="body1">
                <b>Congratulations, you Won!!</b>
              </Typography>
              <Button
                variant="contained"
                onClick={handleReward}
                sx={{ mt: 1 }}
              >
                Go to Challenges
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PuzzleGame;