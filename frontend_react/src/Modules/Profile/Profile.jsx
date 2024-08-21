import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import countriesData from '../../Components/Data/countries.json';
import PostsGalleryCard from '../../Components/Social/PostsGalleryCard';
import Footer from '../../Components/Footer/Footer';
import apiUrl from '../../Config/config';
import EditProfileModal from './EditProfileModal'; // Import the new component

const Profile = () => {
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
      if (!token) return;
      const response = await axios.get(`${apiUrl}/users/profile/checkLoggedIn`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = response.data;
        setIsLoggedIn(true);
        setUserData(data);
        setEditData(data);
        await fetchSocialData(token);
        await fetchPosts(token);
      }
    } catch (error) {
      console.error('Error checking if user is logged in:', error);
    }
  };

  const fetchSocialData = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/social/main/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.status === 200) {
        setSocialData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching social data:', error);
    }
  };

  const fetchPosts = async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/social/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

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
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${apiUrl}/users/profile/update`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setUserData(editData);
        setIsEditing(false);
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            align="center"
            sx={{
              fontFamily: 'Poppins',
              fontSize: { xs: '28px', sm: '32px', md: '36px', lg: '42px' },
              fontWeight: '600',
              padding: '0px',
              mt: -2
            }}
          >
            {userData.username}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onClick={() => setIsEditing(true)}
            variant="contained"
            sx={{ 
              borderRadius: 2, 
              fontFamily: 'Poppins', 
              fontWeight: '900', 
              backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', 
              color: 'white',
              textTransform: 'none',
            }}
          >
            Edit Profile
          </Button>
        </Box>
        <Typography align="center" gutterBottom 
          sx={{ 
            fontFamily: 'Poppins', 
            fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
            mt: 2,
            marginBottom: '0px', 
            fontWeight: '300', 
            padding: '0px' 
          }}
        >
          {userData.firstName + ' ' + userData.lastName}
        </Typography>
        <Typography align="center" gutterBottom 
          sx={{ 
            fontFamily: 'Poppins', 
            fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
            marginBottom: '0px', 
            fontWeight: '300', 
            padding: '0px' 
          }}
        >
          {userData.location}
        </Typography>
        <Typography align="center" gutterBottom 
          sx={{ 
            fontFamily: 'Poppins', 
            fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
            marginBottom: '0px', 
            fontWeight: '300', 
            padding: '0px' 
          }}
        >
          {formatDate(userData.birthday)}
        </Typography>
        <Typography align="center" gutterBottom 
          sx={{ 
            fontFamily: 'Poppins', 
            fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
            marginBottom: '0px', 
            fontWeight: '300', 
            padding: '0px' 
          }}
        >
          {countryName}
        </Typography>
        <Typography align="center" gutterBottom 
          sx={{ 
            fontFamily: 'Poppins', 
            fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
            marginBottom: '0px', 
            fontWeight: '300', 
            padding: '0px' 
          }}
        >
          {userData.bio}
        </Typography>
        {socialData && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Typography align="center" gutterBottom 
              sx={{ 
                fontFamily: 'Poppins', 
                fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
                mr: 2,
                marginBottom: '0px',
                fontWeight: '600',
                padding: '0px' 
              }}
            >
              Followers: {socialData.followers.length}
            </Typography>
            <Typography align="center" gutterBottom 
              sx={{ 
                fontFamily: 'Poppins', 
                fontSize: { xs: '18px', sm: '32px', md: '36px', lg: '42px' },
                marginBottom: '0px', 
                fontWeight: '600', 
                padding: '0px' 
              }}
            >
              Following: {socialData.followings.length}
            </Typography>
          </Box>
        )}
        <Box sx={{px: '0vw'}}>
          <Grid container spacing={0} sx={{width: '100vw'}}>
            {posts.map((post, index) => (
              <Grid item key={index} xs={4} sm={4} md={4} lg={3}>
                <PostsGalleryCard post={post} socialId={socialData._id}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <Footer/>
      <EditProfileModal
        open={isEditing}
        handleClose={() => setIsEditing(false)}
        editData={editData}
        handleInputChange={handleInputChange}
        handleSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default Profile;