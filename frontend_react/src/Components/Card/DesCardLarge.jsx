import React from 'react';
import { Box, Typography } from '@mui/material';

const DesCardLarge = ({ country, city, imageUrl }) => {
  return (
    <Box sx={{
      width: '17vw',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      }
    }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '17vw',
            height: '21.25vw', 
            margin: '0 auto', 
            borderRadius: '5%', 
          }}
        />
        <Typography align="left" 
          sx={{ 
            marginTop: '10px',
            marginLeft: '1.0vw',
            fontFamily: 'Merriweather',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: '1.0vw',
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
          {country}
        </Typography>
        <Typography align="left" 
          sx={{ 
            marginBottom: '10px', 
            marginLeft: '1.0vw', 
            lineHeight: '1.0',
            fontFamily: 'Poppins',
            fontWeight: '900',
            fontSize: '2vw',
          }}>
          {city}
        </Typography>
      </Box>
    </Box>
  );
};

export default DesCardLarge;
