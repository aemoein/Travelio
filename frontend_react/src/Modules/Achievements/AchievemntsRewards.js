import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Achievements.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

const AchievementsRewards = () => {
  const [viewMode, setViewMode] = useState("achievements"); // Default view mode
  const [achievementsData, setAchievementsData] = useState([]);
  const [myRewardsData, setMyRewardsData] = useState([]);
  const [rewardsData, setRewardsData] = useState([]);
  const [userPoints, setUserPoints] = useState({
    userId: "1",
    username: "",
    points: 0,
    challengePoints: 0,
  });
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pointsResponse = await axios.get(
          `http://localhost:11130/api/points-management/${userPoints.userId}`
        );
        setUserPoints(pointsResponse.data);
        setLoading(false); // Set loading to false only after successful fetch

        // Fetch achievements data for the user
        const achievementsResponse = await axios.get(
          `http://localhost:9090/api/achievements/user/${pointsResponse.data.username}`
        );
        setAchievementsData(achievementsResponse.data || []);

        // Fetch my rewards data for the user
        const myRewardsResponse = await axios.get(
          `http://localhost:11177/api/rewards/user/${pointsResponse.data.username}`
        );
        setMyRewardsData(myRewardsResponse.data || []);

        // Fetch all rewards data
        const rewardsResponse = await axios.get(
          `http://localhost:11177/api/rewards`
        );
        setRewardsData(rewardsResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    if (loading) {
      fetchData();
    }
  }, [loading, userPoints.userId]);

  const handleShowAchievements = () => {
    setViewMode("achievements");
  };

  const handleShowRewards = () => {
    setViewMode("rewards");
  };

  const handleShowMyRewards = () => {
    setViewMode("myRewards");
  };

  const handleGetReward = (rewardId) => {
    const { username, points } = userPoints;
    axios
      .post(
        `http://localhost:11170/api/rewards/redeem/${rewardId}/${username}?points=${points}`
      )
      .then((response) => {
        console.log("Reward redeemed successfully:", response.data);
        // Update myRewardsData after redemption
        axios
          .get(`http://localhost:11177/api/rewards/user/${username}`)
          .then((response) => {
            setMyRewardsData(response.data || []);
          })
          .catch((error) => {
            console.error("Error fetching updated rewards:", error);
          });
      })
      .catch((error) => {
        console.error("Error redeeming reward:", error);
      });
  };

  // Render loading state or data based on viewMode
  return (
    <>
    <Navbar/>
    <div className="achievements-rewards-container" style={{minHeight: '100vh', marginTop: '100px'}}>
      <div className="data-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {viewMode === "achievements" && (
              <div className="achievements-container">
                <h2>Achievements</h2>
                {achievementsData.map((achievement) => (
                  <div key={achievement.id} className="achievement">
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                    <p>Category: {achievement.category}</p>
                    <p>Difficulty: {achievement.difficulty}</p>
                    <p>Points: {achievement.points}</p>
                    <p>Status: {achievement.active ? "Active" : "Inactive"}</p>
                  </div>
                ))}
              </div>
            )}
            {viewMode === "rewards" && (
              <div className="rewards-container">
                <h2>Rewards</h2>
                {rewardsData.map((reward) => (
                  <div key={reward.id} className="reward">
                    <h3>{reward.name}</h3>
                    <p>{reward.description}</p>
                    <p>User Points Required: {reward.userPoints}</p>
                    <p>Challenge Points Required: {reward.challengePoints}</p>
                    <p>Type: {reward.type}</p>
                    <p>Redemption Criteria: {reward.redemptionCriteria}</p>
                    <button
                      className="get-reward"
                      onClick={() => handleGetReward(reward.id)}
                    >
                      Get Reward
                    </button>
                  </div>
                ))}
              </div>
            )}
            {viewMode === "myRewards" && (
              <div className="rewards-container">
                <h2>My Rewards</h2>
                {myRewardsData.map((reward) => (
                  <div key={reward.id} className="reward">
                    <h3>{reward.name}</h3>
                    <p>{reward.description}</p>
                    <p>User Points Required: {reward.userPoints}</p>
                    <p>Challenge Points Required: {reward.challengePoints}</p>
                    <p>Type: {reward.type}</p>
                    <p>Redemption Criteria: {reward.redemptionCriteria}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {/* User Info Box */}
      <div className="user-info-box">
        <h2>TRVLO</h2>
        <p>Username: @{userPoints.username}</p>
        <p>Points: {userPoints.points}</p>
        <p>Challenge Points: {userPoints.challengePoints}</p>
        <div className="view-mode-buttons">
          <button onClick={handleShowAchievements}>Show Achievements</button>
          <button onClick={handleShowRewards}>Show Rewards</button>
          <button onClick={handleShowMyRewards}>Show My Rewards</button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AchievementsRewards;
