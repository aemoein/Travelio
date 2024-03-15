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
    <AppBar position="static" sx={{ backgroundColor: '#fff' }}>
      <Toolbar>
        <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#0077C2', fontFamily: 'Trebuchet MS' }}>
          TRVLO
        </Typography>
        <Button
          color="inherit"
          onClick={handleMenuOpen}
          sx={{  fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginRight: 2, borderRadius: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}
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
        <Button color="inherit" sx={{ fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
          Destinations
        </Button>
        <Button color="inherit" sx={{ fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
          Planning
        </Button>
        <Button color="inherit" sx={{ fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
          Challenges
        </Button>
        <Button color="inherit" sx={{ fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginRight: 2, color: '#000', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
          Social
        </Button>
        <IconButton color="inherit" sx={{ marginLeft: 'auto' }} aria-label="account of current user">
          <AccountCircle sx={{ color: '#000' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;