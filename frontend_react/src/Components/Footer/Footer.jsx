import React from 'react';
import { Typography, Link, Box, Button } from '@mui/material';

const Footer = () => {
  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');`}
      </style>
      <Box sx={{ display: 'flex' , fontFamily: 'Roboto Condensed, sans-serif', backgroundColor: '#333'}}>
          <Box sx={{ flex: 1, padding: '20px'}}>
              <Typography sx={{ marginLeft: 4, fontFamily: 'Roboto Condensed, sans-serif', marginTop: 1, fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0px', color: '#ffffff' }}>
                  TRVLO
              </Typography>
              <Typography sx={{ marginLeft: 4, fontFamily: 'Roboto Condensed, sans-serif', fontSize: '32px', fontWeight: 'bold', textTransform: 'none', letterSpacing: '0px', color: '#0077c2', width: 300, lineHeight: '1.0'}}>
                  Discover The Shades of The World
              </Typography>
          </Box>
          <Box sx={{ flex: 1, padding: '20px', textAlign: 'right', maxWidth: '740px', minWidth: '740px'}}>
            <Box>
                <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 10, color: '#fff', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                    Destinations
                </Button>
                <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 10, color: '#fff', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                    Planning
                </Button>
                <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 10, color: '#fff', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                    Challenges
                </Button>
                <Button color="inherit" sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'Roboto Condensed, sans-serif', marginRight: 10, color: '#fff', '&:hover': { color: '#0077C2' }, textTransform: 'none' }}>
                    Social
                </Button>
            </Box>
            <Box sx={{marginLeft: 4,  marginTop: 1, textAlign:'left'}}>
                <Typography sx={{fontFamily: 'Roboto Condensed, sans-serif', fontSize: '32px', fontWeight: 'bold', textTransform: 'none', letterSpacing: '0px', color: '#0077c2', width: 300, lineHeight: '1.0', textAlign: 'left'}}>
                    Join Now And Start Your Adventure!
                </Typography>
                <Button variant="contained" color="primary" size="medium" sx={{ fontWeight: 'bold', fontFamily: 'Trebuchet MS', marginTop: 1, backgroundColor: '#0077C2', color: '#fff', borderRadius: '25px' , textTransform: 'none'}}>
                    Create Account
                </Button>  
            </Box>
          </Box>
      </Box>
    </>
  );
};

export default Footer;
