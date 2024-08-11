import React from 'react';
import { Box, Typography } from '@mui/material';

const DestinationCard = ({ country, city, imageUrl }) => {
  return (
    <Box sx={{
      //width: '28vw',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      }
    }}>
      <Box sx={{ padding: '10px', textAlign: 'center' }}>
        <Box
          sx={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: { xs: '220px', sm: '200px', md: '300px', lg: '350px' },
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
            fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px' },
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
            fontSize: { xs: '16px', sm: '16px', md: '18px', lg: '21px' },
          }}>
          {city}
        </Typography>
      </Box>
    </Box>
  );
};

export default DestinationCard;
