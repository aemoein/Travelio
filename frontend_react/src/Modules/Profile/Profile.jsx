import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Grid } from '@mui/material'
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import countriesData from '../../Components/Data/countries.json'

const Profile = ({ coverPhoto, pfp, username, email, firstName, lastName, location, birthday, bio, nationality }) => {
  const coverPhotoStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const avatarStyle = {
    width: '150px',
    height: '150px',
    margin: '8px',
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [countryName, setCountryName] = useState(null);

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get('http://localhost:3001/profile/checkLoggedIn', { withCredentials: true });

      if (response.status === 200) {
        const data = response.data;
        setIsLoggedIn(true);
        setUserData(data);
        console.log('user is logged in');
        console.log(userData);
      }
    } catch (error) {
      console.error('Error checking if user is logged in:', error);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    if (userData && userData.user.nationality) {
      const country = countriesData.find(country => country.code === userData.user.nationality);
      if (country) {
        setCountryName(country.name);
      }
    }
  }, [userData]);

  if (!userData) {
    return null;
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Navbar isLoggedIn={isLoggedIn} sx={{ position: 'fixed', width: '100%', zIndex: 1000 }} />
      <Box style={{ position: 'relative', width: '100vw', height: '33vw', overflow: 'hidden' }}>
        <Box style={{ backgroundImage: 'url(https://pbs.twimg.com/profile_banners/1387553922152386562/1659343923/1500x500)', width: '100%', height: '25vw', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 1 }} />
        <Avatar alt="Profile Picture" src={userData.user.profilePicUrl} sx={{ position: 'absolute', width: '16vw', height: '16vw', top: '75.75%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 2, border: '5px solid white', }} />
      </Box>
      <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '5vw', marginBottom: '0px', fontWeight: '600', padding: '0px', height: '5.5vw' }}>
        {userData.user.username}
      </Typography>
      <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2.8vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '3.5vw' }}>
        {userData.user.firstName + " " + userData.user.lastName}
      </Typography>
      <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
        {userData.user.location}
      </Typography>
      <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
        {formatDate(userData.user.birthday)}
      </Typography>
      <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
        {countryName}
      </Typography>
      <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
        {userData.user.bio}
      </Typography>
    </div>
  );
};

export default Profile;