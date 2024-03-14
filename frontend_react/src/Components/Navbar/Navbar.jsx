import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" onClick={handleMenuOpen}>
          Articles
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Article 1</MenuItem>
          <MenuItem onClick={handleMenuClose}>Article 2</MenuItem>
          <MenuItem onClick={handleMenuClose}>Article 3</MenuItem>
          <MenuItem onClick={handleMenuClose}>More Articles</MenuItem>
        </Menu>
        <Button color="inherit">Destinations</Button>
        <Button color="inherit">Planning</Button>
        <Button color="inherit">Challenges</Button>
        <Button color="inherit">Social</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;