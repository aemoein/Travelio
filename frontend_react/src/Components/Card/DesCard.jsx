import React from 'react';
import { Box, Typography } from '@mui/material';

const DesCard = ({ country, city, imageUrl, onClick }) => {
  return (
    <Box 
      sx={{
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          cursor: 'pointer',
        }
      }}
      onClick={onClick}
    >
      <Box sx={{ textAlign: 'center', ml: 0 }}>
        <Box
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: { xs: '200px', sm: '200px', md: '300px', lg: '350px' },
            margin: '0 auto', 
            borderRadius: '5%', 
          }}
        />
        <Typography 
          align="left" 
          sx={{ 
            marginTop: '10px',
            marginLeft: '1.0vw',
            fontFamily: 'Merriweather',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {country}
        </Typography>
        <Typography 
          align="left" 
          sx={{ 
            marginBottom: '10px', 
            marginLeft: '1.0vw', 
            lineHeight: '1.0',
            fontFamily: 'Poppins',
            fontWeight: '900',
            fontSize: { xs: '16px', sm: '12px', md: '14px', lg: '16px' },
          }}
        >
          {city}
        </Typography>
      </Box>
    </Box>
  );
};

export default DesCard;