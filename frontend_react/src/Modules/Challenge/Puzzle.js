import AdventureCard from "./AdventureCard";
import PuzzleGame from "./PuzzleGame";

import "./Challenge.css";
/*const challenge = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Napoli Chef!",
  description:
    "Do you think you have a good taste? then answer the Napoli Chef!",
  points: 100,
  type: "PHOTO", // replace with the actual string representation of ChallengeType
  tasks: ["What is the dish created in napoli and contains everything?"],
  targets: ["pizza"],
  nextChallengedur: 86400000,
  multiplier: 2,
  city: "Pisa",
  attempts: 3,
  locationType: "GLOBAL",
};*/

export default function Puzzle({ challenge, city, user, handleReward }) {
  return (
    <div>
      <h1>🤠 Unlock the mystery and reveal the magic! 🌟</h1>
      <div className="challenge-game-grid">
        <div className="game">
          <div className="task">
            <h1>🔭{challenge.title}🗺️</h1>
            <p>{challenge.description}</p>
            <b>Task: {challenge.tasks}</b>
          </div>
          <div className="solution">
            <PuzzleGame
              handleReward={handleReward}
              word={challenge.targets}
              reattempts={challenge.attempts}
            />
          </div>
        </div>
        <AdventureCard user={user} city={city} />
      </div>
    </div>
  );
}
