import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Drawer,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleCard from '../Card/ArticleCard';
import TextTitle from '../Text/TextTitle';
import UserIcon from './UserIcon';
import MenuIcon from '@mui/icons-material/Menu'; // Import the Menu icon

const articles = [
  // Sample articles data
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
  const [openDialog, setOpenDialog] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for the drawer
  const navigate = useNavigate();

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
        console.log('User is logged in');
        console.log('user pic link: ');
        console.log(data.profilePicUrl);
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

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProtectedClick = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setOpenDialog(true);
    } else {
      navigate(path);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const buttonStyles = {
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
    fontFamily: 'Poppins',
    fontWeight: '900',
    marginRight: { xs: 1, sm: 2, md: 3 },
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
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#f2f2f2', zIndex: 1000, top: 0 }}>
        <Toolbar sx={{ height: '64px', display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: { xs: 'flex', sm: 'block' }, // Flex on small screens, block on larger screens
              justifyContent: { xs: 'center', sm: 'flex-start' }, // Center on small screens
              width: { xs: '100%', sm: 'fit-content', md: 'fit-content', lg: 'fit-content'},
              ml: { xs: "42px", sm: '0', md: '0', lg: '0' }
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <TextTitle text="TRVLO" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }}></Box>
          {/* Hamburger Menu Button for xs screens */}
          <IconButton 
            size="large" 
            edge="end" 
            color="black" 
            onClick={handleDrawerToggle} 
            sx={{ display: { xs: 'block', sm: 'none' } }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>
          {/* Normal buttons for larger screens */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Button color="inherit" onClick={handleMenuOpen} sx={buttonStyles}>
              Articles
            </Button>
            <Link to="/destinations" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={buttonStyles}>
                Destinations
              </Button>
            </Link>
            <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/planning')}>
              Planning
            </Button>
            <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/social')}>
              Social
            </Button>
            <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/challenge')}>
              Challenges
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
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
  <Box sx={{ width: 250 }} role="presentation">
    <Box sx={{ padding: 2 }}>
      <Button onClick={handleDrawerToggle} color="inherit" fullWidth sx={buttonStyles}>
        Close
      </Button>
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2 }}>
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
    </Box>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Button color="inherit" onClick={handleMenuOpen} sx={buttonStyles}>
        Articles
      </Button>
      <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/destinations')}>
        Destinations
      </Button>
      <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/planning')}>
        Planning
      </Button>
      <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/social')}>
        Social
      </Button>
      <Button color="inherit" sx={buttonStyles} onClick={(e) => handleProtectedClick(e, '/challenge')}>
        Challenges
      </Button>
    </Box>
  </Box>
</Drawer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>You need to be a member to access this feature</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please sign in to access this feature.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <Button color="primary" autoFocus>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;