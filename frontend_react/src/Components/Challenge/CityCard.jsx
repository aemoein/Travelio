import React from 'react';
import { Box, Typography } from '@mui/material';

const CityCard = ({ city, imageUrl, onClick }) => {
  return (
    <Box 
      sx={{
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
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
            height: '20vw', 
            margin: '0 auto', 
            borderRadius: '5%', 
          }}
        />
        <Typography 
          align="left" 
          sx={{ 
            marginBottom: '10px', 
            marginLeft: '1.0vw', 
            lineHeight: '1.0',
            fontFamily: 'Poppins',
            fontWeight: '900',
            fontSize: '30px',
            mt: 1
          }}
        >
          {city}
        </Typography>
      </Box>
    </Box>
  );
};

export default CityCard;