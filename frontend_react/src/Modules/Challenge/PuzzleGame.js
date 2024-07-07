import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Challenge.css";

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
        <button
          key={letter}
          onClick={() => handleLetterSelect(lowerCaseLetter)}
          disabled={
            selectedLetters.includes(lowerCaseLetter) ||
            incorrectLetters.includes(lowerCaseLetter)
          }
          className={buttonClass}
        >
          {letter}
        </button>
      );
    });
  };

  return (
    <div className="bodychallenge">
      <div className="puzzle-game">
        <div className="word-display">{displayWord}</div>
        <div className="attempts-left">Attempts left: {attemptsLeft}</div>
        <div className="reattempts-left">
          Remaining Reattempts: {remainingReattempts}
        </div>
        <div className="letter-buttons">{renderAlphabetButtons()}</div>
        {gameOver && (
          <div className="popup">
            <div className="popup-content">
              <div>
                <b>Game Over. Try again, kid.</b>
              </div>
              {remainingReattempts > 1 ? (
                <button onClick={handleGameOver}>RESTART</button>
              ) : (
                <button onClick={() => history("/challenge")}>
                  Go to Challenges
                </button>
              )}
            </div>
          </div>
        )}
        {win && (
          <div className="popup">
            <div className="popup-content">
              <div>
                <b>Congratulations you Won!!</b>
              </div>
              <button onClick={handleReward}>Go to Challenges</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleGame;
