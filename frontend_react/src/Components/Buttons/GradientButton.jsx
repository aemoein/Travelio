import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const GradientButton = ({ text, path }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={{
        color: '#A9A9A9',
        fontFamily: 'Poppins',
        border: '2px solid',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: '900',
        fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '18px' },
        backgroundColor: 'transparent',
        padding: '10px 20px',
        transition: 'background-image 0.8s, color 0.2s',
        maxHeight: { xs: '32px', sm: '32px', md: '32px', lg: '40px' },
        mt: { xs: '-18px', sm: '-10px', md: '-10px', lg: '-10px' },
        marginRight: '10px',
        '&:hover': {
          backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
          color: '#ffffff',
          border: 'none',
        },
      }}
      onClick={() => navigate(path)}
    >
      {text}
    </Button>
  );
};

export default GradientButton;