import React, { useState, useEffect} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TextTitle from '../Text/TextTitle';
import UserIcon from './UserIcon';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkLoggedIn = async () => {
      try {
          const response = await axios.get('http://localhost:3001/profile/checkLoggedIn', { withCredentials: true });
  
          if (response.status === 200) {
              const data = response.data;
              setIsLoggedIn(true);
              setUserData(data);
              console.log('user is logged in');
          }
      } catch (error) {
        console.error('Error checking if user is logged in:', error);
      }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
      <AppBar position="fixed" sx={{ backgroundColor: '#f2f2f2', zIndex: 1000, top: 0 }}>
        <Toolbar>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <TextTitle text="TRVLO"/>
            </Link>
            <Box sx={{width:1500,}}></Box>
            <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{  fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 3, borderRadius: 2, color: '#000', '&:hover': {  backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', }, textTransform: 'none' }}
            >
                Articles
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleMenuClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                    borderRadius: 2,
                    marginTop: '8px',
                    backgroundColor: '#fff',
                    color: '#000',
                    '& .MuiMenuItem-root': {
                        fontWeight: 'bold',
                        '&:hover': {
                        backgroundColor: '#0077C2',
                        color: '#fff',
                        },
                    },
                    },
                }}
            >
            <MenuItem onClick={handleMenuClose}>Article 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Article 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Article 3</MenuItem>
            <MenuItem onClick={handleMenuClose}>More Articles</MenuItem>
            </Menu>
            <Button color="inherit" sx={{ width: 'fit-content', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 3, color: '#000', '&:hover': {  backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', }, textTransform: 'none' }}>
                Destinations
            </Button>
            <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 3, color: '#000', '&:hover': {  backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', }, textTransform: 'none' }}>
                Planning
            </Button>
            <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 3, color: '#000', '&:hover': {  backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', }, textTransform: 'none' }}>
                Challenges
            </Button>
            <Button color="inherit" sx={{ width: 'fit-content', padding: 0, fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 3, color: '#000', '&:hover': {  backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', }, textTransform: 'none' }}>
                Social
            </Button>

            {isLoggedIn ? (
                <UserIcon 
                    profilePic={userData.user.profilePicUrl}
                    username={userData.user.username}
                    firstName={userData.user.firstName}
                />
            ) : (
                <Link to="/signin" style={{ textDecoration: 'none' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        sx={{ fontWeight: 'bold', minWidth: '100px', fontFamily: 'IBM Plex Sans', marginRight: 2, backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', color: '#fff', borderRadius: '25px', textTransform: 'none' }}
                    >
                        Sign In
                    </Button>
                </Link>
            )}
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;