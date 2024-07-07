import React from "react";
import { useNavigate } from "react-router-dom";

import "./Challenge.css";

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
    h1: {
      margin: "20px 0",
      fontSize: "24px",
    },
    challengeButtons: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
    button: {
      background: "#7209b7",
      border: "none",
      borderRadius: "5px",
      color: "white",
      padding: "10px 20px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "background 0.3s",
      width: "200px",
      margin: "5px",
    },
    buttonHover: {
      background: "#560bad",
    },
    localChallenge: {
      background: "#29b2f2",
    },
    tripChallenge: {
      background: "#f72585",
    },
    profile: {
      backgroundColor: "orangered",
    },
  };

  return (
    <div className="bodychallenge">
      <div style={styles.challengePage}>
        <div style={styles.header}>
          <div style={styles.mountains}>
            <div style={styles.moon}></div>
            <div style={styles.moonHollow}></div>
            <div style={{ ...styles.mountain, ...styles.mountain6 }}></div>
            <div style={{ ...styles.mountain, ...styles.mountain5 }}></div>
            <div style={{ ...styles.mountain, ...styles.mountain4 }}></div>
            <div style={{ ...styles.mountain, ...styles.mountain3 }}></div>
            <div style={{ ...styles.mountain, ...styles.mountain2 }}></div>
            <div style={{ ...styles.mountain, ...styles.mountain1 }}></div>

            <div style={{ ...styles.cloud, ...styles.cloud1 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud2 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud3 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud4 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud5 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud6 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud7 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud8 }}></div>
            <div style={{ ...styles.cloud, ...styles.cloud9 }}></div>
          </div>
        </div>
        <h1 style={styles.h1}>🌟 READY FOR THE ULTIMATE CHALLENGE? 🌟</h1>
        <div style={styles.challengeButtons}>
          <button
            style={{ ...styles.button, ...styles.localChallenge }}
            onClick={handleLocalChallenge}
          >
            🏡 Local Challenge
          </button>
          <button
            style={{ ...styles.button, ...styles.tripChallenge }}
            onClick={handleGlobalChallenge}
          >
            ✈️ Global Challenge
          </button>
          <button
            style={{ ...styles.button, ...styles.profile }}
            onClick={handleProfile}
          >
            👤Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
