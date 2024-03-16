import React from 'react';
import { Typography } from '@mui/material';

const GradientText = ({ text }) => {
  return (
    <Typography
    variant="h4"
      sx={{
        flexGrow: 1, fontWeight: '900', fontFamily: 'Montserrat, sans-serif',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        maxWidth: '150px',
      }}
    >
      {text}
    </Typography>
  );
};

export default GradientText;