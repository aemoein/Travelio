import { useEffect, useState } from "react";
import AdventureCard from "./AdventureCard";
import { useParams } from "react-router-dom";

import "./Challenge.css";

export default function ChallengeProfile() {
  const { user } = useParams();
  const [profile, setProfile] = useState(null); // State to hold the rank image URL
  const [showPopup, setShowPopup] = useState(false);

  const formatPrediction = (prediction) => {
    return prediction
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const showTitles = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:11169/api/challengeProfile/getprofile?username=aemoein`
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

    console.log(user);
    fetchProfile();
  }, []);

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bodychallenge">
      <div className="popup">
        <div className="popup-content">
          <AdventureCard user={user} />
        </div>
      </div>
    </div>
  );
}
