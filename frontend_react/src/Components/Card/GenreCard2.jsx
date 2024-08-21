import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const GenreCard = ({ genre, description, imageUrl, destinations }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '220px', sm: '200px', md: '300px', lg: '350px' },
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          padding: '10px',
          color: '#fff',
          width: '100%',
          borderRadius: '0 0 10px 10px',
        }}
      >
        <Typography
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: { xs: '28px', sm: '28px', md: '32px', lg: '38px' },
          }}
        >
          {genre}
        </Typography>
        <Typography
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '600',
            width: '90%',
            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '22px' },
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: { xs: '12px', sm: '16px', md: '18px', lg: '22px' },
            marginTop: '10px'
          }}
        >
          Popular Destinations:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {destinations.map((destination, index) => (
            <Typography
              key={index}
              sx={{ 
                fontFamily: 'Poppins',
                fontWeight: '400',
                fontSize: { xs: '12px', sm: '16px', md: '18px', lg: '22px' },
                marginRight: '10px',
                marginTop: '5px'
              }}
            >
              {destination.cityName}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default GenreCard;