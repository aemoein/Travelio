import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";

const Local = () => {
  const { type } = useParams(); 
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        let response;
        if (type === "photochallenge") {
          response = await fetch("http://localhost:5005/api/cc/photo");
        } else if (type === "puzzle") {
          response = await fetch("http://localhost:5005/api/cc/puzzle");
        } else {
          throw new Error("Invalid type");
        }

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, [type]);

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

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="bodychallenge">
      <Box className="App">
        <Typography variant="h1" sx={{ textAlign: "center", mt: 2 }}>
          🔭 Explore the Wonders of the World - Choose Your Next Adventure! 🗺️
        </Typography>
        <Box
          className="grid-container"
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
            mt: 4,
            mx: "auto",
            maxWidth: "1200px",
            padding: "0 1rem",
          }}
        >
          {cities.map((city, index) => (
            <Box key={index} className="grid-item">
              <Link
                key={index}
                to={`/challengegame/local/${type}/${city.city}`}
                className="grid-item"
                sx={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                }}
              >
                <img
                  src={city.photoLink}
                  alt={city.city}
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                />
                <Typography variant="h2" sx={{ mt: 2 }}>
                  {city.city}
                </Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Local;