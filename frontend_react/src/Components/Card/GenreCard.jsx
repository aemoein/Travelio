import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

const GenreCard = ({ genre, description, imageUrl, destinations, width, isSelected, onToggleSelection }) => {
  const [isClicked, setIsClicked] = useState(true);

  const handleToggleClick = () => {
    setIsClicked(!isClicked);
    onToggleSelection();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: width ? width : '47vw',
        height: '27vw',
        marginBottom: '20px',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onClick={handleToggleClick}
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
      {/* Overlay */}
      {isClicked && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        />
      )}
      {/* Content */}
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
            fontSize: '3vw',
          }}
        >
          {genre}
        </Typography>
        <Typography
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '400',
            width: 'fit-content',
            fontSize: '1.0vw',
            maxWidth: '25vw'
          }}
        >
          {description}
        </Typography>
        <Typography
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: '1.4vw',
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
                fontSize: '1.2vw',
                maxWidth: '25vw',
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