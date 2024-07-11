import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AdventureCard from "./AdventureCard";

const ChallengeProfile = () => {
  const { user } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:3009/api/challengeProfile/getprofile?username=${user}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const profileData = await response.json();
      setProfile(profileData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      className="bodychallenge"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {profile && (
        <AdventureCard
          user={user}
          profile={profile}
          showPopup={() => {}}
          closePopup={() => {}}
        />
      )}
    </Box>
  );
};

export default ChallengeProfile;