import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import Navbar from "../../Components/Navbar/Navbar";

const ChallengePage = ({ user }) => {
  const navigate = useNavigate();

  const handleLocalChallenge = () => {
    navigate("/local/choose");
  };

  const handleGlobalChallenge = () => {
    navigate("/global/choose");
  };

  const handleProfile = () => {
    navigate(`/User/${user}`);
  };

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
    },
    challengePage: {
      textAlign: "center",
      width: "100%",
    },
    header: {
      width: "100%",
      height: "450px",
      background: "linear-gradient(to bottom, #86117b, #c169b8)",
      position: "relative",
      overflow: "hidden",
    },
    mountains: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "100%",
    },
    mountain: {
      position: "absolute",
      bottom: 0,
      borderRadius: "19px",
      width: "459px",
      height: "419px",
      transformOrigin: "left",
    },
    mountain1: {
      left: "599.92px",
      top: "152.38px",
      background: "#81067d",
      transform: "rotate(46deg)",
    },
    mountain2: {
      left: "923.53px",
      top: "211.77px",
      background: "#7c0774",
      transform: "rotate(56deg)",
    },
    mountain3: {
      left: "285.55px",
      top: "215.44px",
      background: "#7c0774",
      transform: "rotate(30deg)",
    },
    mountain4: {
      left: "890.3px",
      top: "132.57px",
      background: "#6b0072",
      transform: "rotate(43deg)",
    },
    mountain5: {
      left: "225.31px",
      top: "129px",
      background: "#6b0072",
      transform: "rotate(37deg)",
    },
    mountain6: {
      left: "485.68px",
      top: "32.57px",
      background: "#530358",
      transform: "rotate(37deg)",
    },
    moon: {
      position: "absolute",
      top: "150px",
      left: "55%",
      width: "100px",
      height: "100px",
      background: "#ffd8fb",
      borderRadius: "50%",
      clipPath: "circle(50% at 50% 50%)",
    },
    moonHollow: {
      position: "absolute",
      top: "150px",
      left: "54.7%",
      width: "96px",
      height: "96px",
      background: "linear-gradient(to bottom, #972b8d, #a33d9a)",
      borderRadius: "50%",
      clipPath: "circle(50% at 50% 50%)",
    },
    cloud: {
      position: "absolute",
      background: "white",
      borderRadius: "10px",
      opacity: 0.3,
    },
    cloud1: {
      width: "150px",
      height: "20px",
      top: "120px",
      left: "200px",
    },
    cloud2: {
      width: "250px",
      height: "20px",
      top: "320px",
      left: "320px",
    },
    cloud3: {
      width: "160px",
      height: "20px",
      top: "220px",
      left: "520px",
    },
    cloud4: {
      width: "95px",
      height: "20px",
      top: "125px",
      left: "825px",
    },
    cloud5: {
      width: "130px",
      height: "20px",
      top: "300px",
      left: "707px",
    },
    cloud6: {
      width: "170px",
      height: "20px",
      top: "350px",
      left: "1160px",
    },
    cloud7: {
      width: "160px",
      height: "20px",
      top: "175px",
      left: "1024px",
    },
    cloud8: {
      width: "70px",
      height: "20px",
      top: "62px",
      left: "413px",
    },
    cloud9: {
      width: "120px",
      height: "20px",
      top: "260px",
      left: "859px",
    },
  };

  return (
    <>
      <Navbar />
      <Box sx={{mt: 6}}>
        <Box sx={styles.body}>
          <Box sx={styles.challengePage}>
            <Box sx={styles.header}>
              <Box sx={styles.mountains}>
                <Box sx={styles.moon}></Box>
                <Box sx={styles.moonHollow}></Box>
                <Box sx={{ ...styles.mountain, ...styles.mountain6 }}></Box>
                <Box sx={{ ...styles.mountain, ...styles.mountain5 }}></Box>
                <Box sx={{ ...styles.mountain, ...styles.mountain4 }}></Box>
                <Box sx={{ ...styles.mountain, ...styles.mountain3 }}></Box>
                <Box sx={{ ...styles.mountain, ...styles.mountain2 }}></Box>
                <Box sx={{ ...styles.mountain, ...styles.mountain1 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud1 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud2 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud3 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud4 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud5 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud6 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud7 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud8 }}></Box>
                <Box sx={{ ...styles.cloud, ...styles.cloud9 }}></Box>
              </Box>
            </Box>
            <Typography variant="h1" sx={{ margin: "20px 0", fontSize: "24px", fontFamily: "Poppins", fontWeight: "900" }}>
              🌟 READY FOR THE ULTIMATE CHALLENGE? 🌟
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <Button
                sx={{
                  background: "#29b2f2",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background 0.3s",
                  width: "300px",
                  margin: "5px",
                  fontFamily: "Poppins", fontWeight: "900",
                  '&:hover': { background: "#0d99db" },
                }}
                onClick={handleLocalChallenge}
              >
                🏡 Local Challenge
              </Button>
              <Button
                sx={{
                  background: "#f72585",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background 0.3s",
                  width: "300px",
                  margin: "5px",
                  fontFamily: "Poppins", fontWeight: "900",
                  '&:hover': { background: "#e9096f" },
                }}
                onClick={handleGlobalChallenge}
              >
                ✈️  Global Challenge
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ff4500",
                  border: "none",
                  borderRadius: "5px",
                  color: "white",
                  padding: "10px 20px",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background 0.3s",
                  width: "300px",
                  margin: "5px",
                  fontFamily: "Poppins", fontWeight: "900",
                  '&:hover': { background: "#d93b00" },
                }}
                onClick={handleProfile}
              >
                👤  Profile
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChallengePage;