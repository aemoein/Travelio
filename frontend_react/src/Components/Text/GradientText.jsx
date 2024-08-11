import React from 'react';
import { Typography } from '@mui/material';

const GradientText = ({ text }) => {
  return (
    <Typography
      sx={{
        display: 'inline-block',
        fontSize: { xs: '46px', sm: '52px', md: '64px', lg : '84px'},
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
