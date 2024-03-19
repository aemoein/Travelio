import React from 'react';
import { Button } from '@mui/material';

const GradientButton = ({ text }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        color: '#A9A9A9',
        font: 'Poppins',
        border: '2px solid',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: '900',
        fontSize: '1vw',
        backgroundColor: 'transparent',
        padding: '10px 20px',
        transition: 'background-image 0.8s, color 0.2s',
        maxHeight: '2.5vw',
        marginRight: '0.7vw',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: '#ffffff', 
            border:'none',
        },
      }}
    >
      {text}
    </Button>
  );
};

export default GradientButton;
