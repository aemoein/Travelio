import React from 'react';
import { Box, Typography } from '@mui/material';

// Correct way to memoize the component
const DestinationCard = ({ country, city, imageUrl }) => {
  return (
    <Box sx={cardContainerStyle}>
      <Box sx={cardInnerStyle}>
        <Box
          component="div"
          sx={{ ...imageBoxStyle, backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={`Image of ${city}, ${country}`}
        />
        <Typography align="left" sx={countryTextStyle}>
          {country}
        </Typography>
        <Typography align="left" sx={cityTextStyle}>
          {city}
        </Typography>
      </Box>
    </Box>
  );
};

// Wrap the component with React.memo correctly
export default React.memo(DestinationCard);

// Styles defined outside the component to improve performance and maintainability
const cardContainerStyle = {
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

const cardInnerStyle = {
  padding: '10px',
  textAlign: 'center',
};

const imageBoxStyle = {
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: { xs: '220px', sm: '200px', md: '300px', lg: '350px' },
  margin: '0 auto',
  borderRadius: '5%',
};

const countryTextStyle = {
  marginTop: '10px',
  marginLeft: '1.0vw',
  fontFamily: 'Merriweather',
  fontWeight: '900',
  width: 'fit-content',
  fontSize: { xs: '12px', sm: '12px', md: '14px', lg: '16px' },
  backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
};

const cityTextStyle = {
  marginBottom: '10px',
  marginLeft: '1.0vw',
  lineHeight: '1.0',
  fontFamily: 'Poppins',
  fontWeight: '900',
  fontSize: { xs: '16px', sm: '16px', md: '18px', lg: '21px' },
};