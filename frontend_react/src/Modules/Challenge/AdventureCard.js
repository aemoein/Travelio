import React, { useState, useEffect } from "react";
import { formatPrediction } from "./ChallengeGame";
import "./Challenge.css";

export default function AdventureCard({ city, user }) {
  const [profile, setProfile] = useState(null); // State to hold the rank image URL
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:11169/api/challengeProfile/getprofile?username=${user}`
          //`http://localhost:11169/api/challengeProfile/getprofile?username=abdrhx}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await response.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchProfile();
  }, []);

  const showTitles = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // If profile data is still being fetched, show a loading message
  if (!profile) {
    return (
      <div className="adventure-card">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="adventure-card">
      <div className="image-container">
        <img
          src={`http://localhost:11169/images/ranks/${profile.rank}.png`} // Display the fetched rank image
          alt="Rank"
          className="rank-image"
        />
      </div>
      <b>
        <p>
          Username:
          {" @"}
          <i>{profile.userName}</i>
        </p>
        <p>
          Rank: <i>{formatPrediction(profile.rank)}</i>{" "}
        </p>
        <p>Adventure points: {profile.points}</p>
        <p>Challenges solved: {profile.numberOfSolvedChallenges}</p>
        {city && <p>City: {city}</p>}
      </b>
      {!showPopup && <button onClick={showTitles}>Titles🏅</button>}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🏅 Titles Won 🏅</h2>
            <ul>
              {profile.titles.map((title, index) => (
                <li key={index}>🏅 {title}</li>
              ))}
            </ul>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
