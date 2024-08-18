import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, TextField, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import countriesData from '../../Components/Data/countries.json';
import PostsGalleryCard from '../../Components/Social/PostsGalleryCard';
import Footer from '../../Components/Footer/Footer';

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

  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [socialData, setSocialData] = useState(null);

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        return;
      }

      const response = await axios.get('http://localhost:7777/users/profile/checkLoggedIn', {
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
        await fetchSocialData(token);
        await fetchPosts(token);
      }
    } catch (error) {
      console.error('Error checking if user is logged in:', error);
    }
  };

  const fetchSocialData = async (token) => {
    try {
      const response = await axios.get('http://localhost:7777/social/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSocialData(response.data.data);
        console.log('Social data:', response.data.data);
      }
    } catch (error) {
      console.error('Error fetching social data:', error);
    }
  };

  const fetchPosts = async (token) => {
    try {
      const response = await axios.get('http://localhost:7777/social/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Reverse the array of posts
      setPosts(response.data.data);
      console.log('Posts:', response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      //setLoading(false); // Set loading to false after posts are fetched
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
        'http://localhost:7777/users/profile/update',
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
    <>
    <div style={{ flexGrow: 1 }}>
      <Navbar isLoggedIn={isLoggedIn} sx={{ position: 'fixed', width: '100%', zIndex: 1000 }} />
      <Box sx={{ position: 'relative', width: '100vw', height: '33vw', overflow: 'hidden', mb: 2 }}>
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
            width: '14vw',
            height: '14vw',
            top: '75.75%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            border: '5px solid white',
          }}
        />
      </Box>
      {isEditing ? (
        <Grid container spacing={2} justifyContent="center" sx={{ padding: 5 }}>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              align="center"
              sx={{
                fontFamily: 'Poppins',
                fontSize: '50px',
                fontWeight: '600',
                padding: '0px',
                mr: 2,
                ml: 5,
                mt: -2
              }}
            >
              {userData.username}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EditIcon
                onClick={handleEditToggle}
                sx={{ cursor: 'pointer', width: '35px', height: '35px' }}
              />
            </Box>
          </Box>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '30px', marginBottom: '0px', fontWeight: '300', padding: '0px' }}>
            {userData.firstName + ' ' + userData.lastName}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '24px', marginBottom: '0px', fontWeight: '300', padding: '0px' }}>
            {userData.location}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '24px', marginBottom: '0px', fontWeight: '300', padding: '0px' }}>
            {formatDate(userData.birthday)}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '24px', marginBottom: '0px', fontWeight: '300', padding: '0px' }}>
            {countryName}
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontFamily: 'Poppins', fontSize: '24px', marginBottom: '0px', fontWeight: '300', padding: '0px' }}>
            {userData.bio}
          </Typography>
          {socialData && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography align="center" sx={{ fontFamily: 'Poppins', fontSize: '24px', marginRight: '16px' }}>
                Followers: {socialData.followers.length}
              </Typography>
              <Typography align="center" sx={{ fontFamily: 'Poppins', fontSize: '24px' }}>
                Following: {socialData.followings.length}
              </Typography>
            </Box>
          )}
          <Box sx={{px: '15vw'}}>
            <Grid container spacing={0} sx={{width: '70vw'}}>
              {posts.map((post, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <PostsGalleryCard post={post} socialId={socialData._id}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Profile;