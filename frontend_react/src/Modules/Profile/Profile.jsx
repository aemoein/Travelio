import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import countriesData from '../../Components/Data/countries.json';

const Profile = () => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const response = await axios.get('http://localhost:3001/profile/checkLoggedIn', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        setIsLoggedIn(true);
        setUserData(data);
        setEditData(data);
        console.log('User is logged in');
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
    if (userData && userData.nationality) {
      const country = countriesData.find((country) => country.code === userData.nationality);
      if (country) {
        setCountryName(country.name);
      }
    }
  }, [userData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:3001/profile/update',
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUserData(editData);
        setIsEditing(false);
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <Navbar isLoggedIn={isLoggedIn} sx={{ position: 'fixed', width: '100%', zIndex: 1000 }} />
      <Box style={{ position: 'relative', width: '100vw', height: '33vw', overflow: 'hidden' }}>
        <Box
          style={{
            backgroundImage: 'url(https://pbs.twimg.com/profile_banners/1387553922152386562/1659343923/1500x500)',
            width: '100%',
            height: '25vw',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1,
          }}
        />
        <Avatar
          alt="Profile Picture"
          src={userData.profilePicUrl}
          sx={{
            position: 'absolute',
            width: '16vw',
            height: '16vw',
            top: '75.75%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            border: '5px solid white',
          }}
        />
      </Box>
      {isEditing ? (
        <Grid container spacing={2} justifyContent="center" sx={{padding: 5}}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={editData.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={editData.firstName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={editData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={editData.location}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Birthday"
              name="birthday"
              value={editData.birthday}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Nationality"
              name="nationality"
              value={editData.nationality}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={editData.bio}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleEditToggle} style={{ marginLeft: '8px' }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '5vw', marginBottom: '0px', fontWeight: '600', padding: '0px', height: '5.5vw' }}>
            {userData.username}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2.8vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '3.5vw' }}>
            {userData.firstName + ' ' + userData.lastName}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
            {userData.location}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
            {formatDate(userData.birthday)}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
            {countryName}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '2vw', marginBottom: '0px', fontWeight: '300', padding: '0px', height: '2.8vw' }}>
            {userData.bio}
          </Typography>
          <Box textAlign="center" sx={{mt: 5}}>
            <EditIcon onClick={handleEditToggle} sx={{cursor: 'pointer', position: 'absolute', right: '35vw', top: '36vw'}}/>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Profile;