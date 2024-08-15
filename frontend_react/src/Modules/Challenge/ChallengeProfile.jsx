import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import AdventureCard from "./AdventureCard";
import Navbar from "../../Components/Navbar/Navbar";

const ChallengeProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    const user = localStorage.getItem('username');

    setUser(user);

    console.log("user: ", user)
    try {
      const response = await fetch(
        `http://localhost:3100/profiles/getprofile?username=${user}`
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
  }, []);

  const styles = {
    body: {
      margin: 0,
      fontFamily: '"Poppins", sans-serif',
      background: "#530358",
      color: "white",
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      display: "flex",
    },
  };

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
    <>
    <Navbar/>
    <Box
      className="bodychallenge"
      sx={styles.body}
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
    </>
  );
};

export default ChallengeProfile;