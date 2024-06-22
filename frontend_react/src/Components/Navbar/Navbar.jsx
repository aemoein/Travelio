import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from '../Card/ArticleCard';
import TextTitle from '../Text/TextTitle';
import UserIcon from './UserIcon';

// Sample articles data (to be replaced with JSON data)
const articles = [
  {
    imageUrl: 'https://example.com/image1.jpg',
    category: 'Travel',
    title: 'Article 1',
    date: '2024-06-18',
    summary: 'Summary of Article 1',
  },
  {
    imageUrl: 'https://example.com/image2.jpg',
    category: 'Food',
    title: 'Article 2',
    date: '2024-06-17',
    summary: 'Summary of Article 2',
  },
  {
    imageUrl: 'https://example.com/image3.jpg',
    category: 'Adventure',
    title: 'Article 3',
    date: '2024-06-16',
    summary: 'Summary of Article 3',
  },
  {
    imageUrl: 'https://example.com/image4.jpg',
    category: 'Culture',
    title: 'Article 4',
    date: '2024-06-15',
    summary: 'Summary of Article 4',
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const checkLoggedIn = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const response = await axios.get('http://localhost:3001/profile/checkLoggedIn', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
      if (response.status === 200) {
        const data = response.data;
        setIsLoggedIn(true);
        setUserData(data);
        console.log('User is logged in');
        console.log("user pic link: ");
        console.log(data.profilePicUrl); // Use data directly from response
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

  const buttonStyles = {
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: 'Open Sans, sans-serif',
    marginRight: 3,
    color: '#000',
    transition: 'color 0.3s ease-out, background-position 0.3s ease-out',
    '&:hover': {
      backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
      WebkitBackgroundClip: 'text',
      color: 'transparent',
      transition: 'color 0.3s ease-out, background-position 0.3s ease-out',
    },
    textTransform: 'none',
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#f2f2f2', zIndex: 1000, top: 0 }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <TextTitle text="TRVLO" />
        </Link>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Button color="inherit" onClick={handleMenuOpen} sx={buttonStyles}>
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
              marginTop: '10px',
              backgroundColor: '#fff',
              color: '#000',
              padding: '10px',
              width: '60%',
              mb: 0,
            },
          }}
        >
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {articles.map((article, index) => (
              <Box key={index} sx={{ width: 'calc(50% - 5px)' }}>
                <ArticleCard
                  imageUrl={article.imageUrl}
                  category={article.category}
                  title={article.title}
                  date={article.date}
                  summary={article.summary}
                  width='100%'
                  height='150px'
                />
              </Box>
            ))}
          </Box>
          <MenuItem onClick={handleMenuClose} sx={{padding: 1, mt: 1, mb: 0, fontFamily: 'Poppins', fontWeight: 600}}>More Articles</MenuItem>
        </Menu>
        <Link to="/destinations" style={{ textDecoration: 'none' }}>
          <Button color="inherit" sx={buttonStyles}>
            Destinations
          </Button>
        </Link>
        <Button color="inherit" sx={buttonStyles}>
          Planning
        </Button>
        <Button color="inherit" sx={buttonStyles}>
          Challenges
        </Button>
        <Button color="inherit" sx={buttonStyles}>
          Social
        </Button>

        {isLoggedIn ? (
          <UserIcon
            profilePic={userData && userData.profilePicUrl}
            username={userData && userData.username}
            firstName={userData && userData.firstName}
          />
        ) : (
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{
                ...buttonStyles,
                minWidth: '100px',
                backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                color: '#fff',
                borderRadius: '25px',
              }}
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