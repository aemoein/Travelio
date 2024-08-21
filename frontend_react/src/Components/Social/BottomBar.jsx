import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';

const BottomBar = () => {
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(`/social/${route}`);
  };

  // Define bottom bar items with their corresponding icons
  const bottomBarItems = [
    { route: '', icon: <HomeIcon /> },
    { route: 'create', icon: <AddCircleOutlineIcon /> },
    { route: 'search', icon: <SearchIcon /> },
    { route: 'explore', icon: <ExploreIcon /> },
    { route: 'notifications', icon: <NotificationsIcon /> },
    { route: 'profile', icon: <PersonIcon /> },
  ];

  return (
    <Box
      sx={{
        display: { xs: 'block', sm: 'none' }, // Show only on mobile
        position: 'fixed',
        bottom: 0,
        width: '100%',
        bgcolor: '#f4f4f4',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
      }}
    >
      <BottomNavigation
        showLabels
        sx={{ bgcolor: '#f4f4f4' }}
      >
        {bottomBarItems.map(({ route, icon }, index) => (
          <BottomNavigationAction
            key={index}
            icon={icon}
            onClick={() => handleNavigation(route)}
            sx={{
              minWidth: '0',
              '& .MuiBottomNavigationAction-label': {
                display: 'none', // Hide labels on mobile
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;