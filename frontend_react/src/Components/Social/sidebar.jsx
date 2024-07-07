import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(`/social/${route}`);
  };

  // Define sidebar items with their corresponding icons
  const sidebarItems = [
    { text: 'Home', route: '', icon: <HomeIcon /> },
    { text: 'Create', route: 'create', icon: <AddCircleOutlineIcon /> },
    { text: 'Search', route: 'search', icon: <SearchIcon /> },
    { text: 'Explore', route: 'explore', icon: <ExploreIcon /> },
    { text: 'Notifications', route: 'notifications', icon: <NotificationsIcon /> },
    { text: 'Profile', route: 'profile', icon: <PersonIcon /> },
  ];

  return (
    <Box
        sx={{
            width: { sm: '20vw', md: '22vw', lg: '20vw' },
            p: 2,
            pt: 10,
            bgcolor: '#f4f4f4',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            overflowY: 'auto'
        }}
    >
      <List>
        {sidebarItems.map(({ text, route, icon }) => (
          <ListItem
            key={text}
            sx={{
              p: 1,
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                cursor: 'pointer',
                background: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              },
              mb: 2
            }}
            onClick={() => handleNavigation(route)}
          >
            {icon}
            <Typography sx={{ ml: 1, fontFamily: 'Poppins', fontSize: '24px', fontWeight: '500'}}>{text}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;