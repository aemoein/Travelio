import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Grid } from "@mui/material";
import CityCard from "../../Components/Challenge/CityCard";
import Navbar from "../../Components/Navbar/Navbar";

const Global = () => {
  const { type } = useParams(); 
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        let response;
        if (type === "photochallenge") {
          response = await fetch("http://localhost:3008/api/cc/photo");
        } else if (type === "darechallenge") {
          response = await fetch("http://localhost:3008/api/cc/dare");
        } else if (type === "puzzle") {
          response = await fetch("http://localhost:3008/api/cc/puzzle");
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

  const styles = {
    body: {
      fontFamily: '"Poppins", sans-serif',
      background: "#530358",
      color: "white",
      minHeight: '100vh'
    },
  };

  return (
    <>
    <Navbar/>
    <Box className="bodychallenge" sx={styles.body}>
      <Box className="App" sx={{ py: 10, width: '70vw', mx: '15vw'}}>
        <Typography sx={{ textAlign: "center", mt: 2, fontFamily: 'Poppins', fontWeight: '900', fontSize: '40px' }}>
          🔭 Explore the Wonders of the World 🗺️
        </Typography>
        <Typography variant="h4" sx={{ textAlign: "center", mt: 2, fontFamily: 'Poppins', fontWeight: '900' }}>
          Choose Your Next Adventure!
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            mx: "auto",
            maxWidth: "1200px",
            padding: "0 1rem",
          }}
        >
          {cities.map((city, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Link
                to={`/challengegame/global/${type}/${city.city}`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                  textAlign: "center",
                }}
              >
                <CityCard 
                  city={city.city} 
                  imageUrl={city.photoLink} 
                  onClick={() => console.log(`Clicked on ${city.city}`)}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
};

export default Global;
