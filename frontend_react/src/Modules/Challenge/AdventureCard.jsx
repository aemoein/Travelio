import React, { useState, useEffect } from "react";
import { formatPrediction } from "./ChallengeGame";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function AdventureCard({ city, user }) {
  const [profile, setProfile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3100/profiles/getprofile?username=${user}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await response.json();
        console.log("Fetched profile:", profileData);
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

  if (!profile) {
    return (
      <Card sx={{ margin: 2, padding: 2 }}>
        <Typography>Loading profile...</Typography>
      </Card>
    );
  }

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={`http://localhost:3009/images/ranks/${profile.rank}.png`}
        alt="Rank"
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body1" component="b">
          <p>
            Username:
            {" @"}
            <i>{profile.username}</i>
          </p>
          <p>
            Rank: <i>{formatPrediction(profile.rank)}</i>{" "}
          </p>
          <p>Adventure points: {profile.points}</p>
          <p>Challenges solved: {profile.numberOfSolvedChallenges}</p>
          {city && <p>City: {city}</p>}
        </Typography>
        {!showPopup && (
          <Button variant="contained" color="primary" onClick={showTitles}>
            Titles🏅
          </Button>
        )}
        {showPopup && (
          <Modal open={showPopup} onClose={closePopup}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 300,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2">
                🏅 Titles Won 🏅
              </Typography>
              <List>
                {profile.titles.map((title, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`🏅 ${title}`} />
                  </ListItem>
                ))}
              </List>
              <Button variant="contained" color="secondary" onClick={closePopup}>
                Close
              </Button>
            </Box>
          </Modal>
        )}
      </CardContent>
    </Card>
  );
}