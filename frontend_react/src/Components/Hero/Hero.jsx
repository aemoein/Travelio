import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import GradientText from '../Text/GradientText';

function Hero() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://media.cntraveler.com/photos/6539d1998ab4257d24ee47e4/16:9/w_1920%2Cc_limit/Lenc%25CC%25A7o%25CC%2581is-Maranhenses-National-Park-marcreation-M0wxmEHpBtE-unsplash.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
      }}
    >
      <GradientText text="Welcome To TRVLO" />
      <Typography sx={{  
        display: 'inline-block',
        fontSize: { xs: '64px', md: '86px' ,lg: '168px' },
        fontWeight: '900',
        fontFamily: 'Reenie Beanie, cursive',
        color: '#e5e5e5',
        letterSpacing: 'wider',
        lineHeight: '0.0',
        marginBottom: 20,
      }}>
        create your own stories
      </Typography>
      <Button variant="contained" color="primary" size="large"
        sx={{
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            borderRadius: 10,
            fontWeight: '500',
            fontFamily: 'Montserrat, sans-serif',
        }}
      >
        Get Started
      </Button>
    </Box>
  );
}

export default Hero;
