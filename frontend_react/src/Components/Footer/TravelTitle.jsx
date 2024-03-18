import React from 'react';
import { Typography } from '@mui/material';

const TravelTitle = () => {
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        display: 'inline-block',
        fontSize: { xs: 'text-sm', lg: 'text-base' },
        fontFamily: 'monospace',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
    >
      Travel stories and news
    </Typography>
  );
};

export default TravelTitle;