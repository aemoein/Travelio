import React from 'react';
import { Typography } from '@mui/material';

const GradientText = ({ text }) => {
  return (
    <Typography
      sx={{
        display: 'inline-block',
        fontSize: { xs: '64px', md: '86px' ,lg: '128px' },
        fontWeight: '900',
        fontFamily: 'Roboto Condensed, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        lineHeight: '1.0',
      }}
    >
      {text}
    </Typography>
  );
};

export default GradientText;
