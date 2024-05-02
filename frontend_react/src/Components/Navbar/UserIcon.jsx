import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Popover,
  Typography
} from '@mui/material';

const UserIcon = ({ profilePic, username, firstName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const visitProfile = () => {
    // Placeholder function for visiting user profile
    console.log("Visiting user profile");
  };

  const signOut = () => {
    // Placeholder function for signing out
    console.log("Signing out");
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Avatar alt={username} src={profilePic} onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <Typography variant="h6">{username}</Typography>
          <Avatar alt={username} src={profilePic} sx={{ width: 100, height: 100, margin: 'auto', marginTop: 2 }} />
          <Typography variant="body1" align="center">Hi, {firstName}!</Typography>
          <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={visitProfile}>Visit Profile</Button>
            <Button variant="outlined" color="primary" onClick={signOut} sx={{ marginLeft: 1 }}>Sign Out</Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default UserIcon;