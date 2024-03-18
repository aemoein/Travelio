import React from 'react';
import { Typography } from '@mui/material';

const GradientText = ({ text }) => {
  return (
    <Typography
      sx={{
        display: 'inline-block',
        fontSize: '6.5vw',
        fontWeight: '900',
        fontFamily: 'Roboto Condensed, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        lineHeight: '0.8',
      }}
    >
      {text}
    </Typography>
  );
};

export default GradientText;
