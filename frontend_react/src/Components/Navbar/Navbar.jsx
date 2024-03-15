import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');`}
      </style>
      <AppBar position="static" sx={{ backgroundColor: '#fff' }}>
        <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: '900', color: '#0077C2', fontFamily: 'Roboto Condensed, sans-serif' }}>
                TRVLO
            </Typography>
            <Button
                color="inherit"
                onClick={handleMenuOpen}
                sx={{  fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 2, borderRadius: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}
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
            <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                Destinations
            </Button>
            <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                Planning
            </Button>
            <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                Challenges
            </Button>
            <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '16px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                Social
            </Button>
            <Button variant="contained" color="primary" size="medium" sx={{ fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginRight: 2, backgroundColor: '#0077C2', color: '#fff', borderRadius: '25px' , textTransform: 'none'}}>
               Sign In
            </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;