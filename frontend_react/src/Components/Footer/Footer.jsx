import React from 'react';
import { Typography, Link, Box, Button } from '@mui/material';
import GradientText from '../Text/TextTitle';
import FooterMenu from './FooterMenu';

const Footer = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('loggedin') === 'true';

  return (
    <Box sx={{ fontFamily: 'Roboto Condensed, sans-serif', backgroundColor: '#000'}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px',
          marginLeft: '20px',
          marginRight: '20px',
          paddingRight: '4px' 
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: '900',
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 'wider',
              backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '4vw',
              maxWidth: 'fit-content',
              lineHeight: '1.0',
              display: { xs: 'none', sm: 'none', md: 'block' } // Hide on xs and sm
            }}
          >
            TRVLO
          </Typography>

          <Typography
            sx={{
              fontWeight: '900',
              fontFamily: 'Montserrat, sans-serif',
              textTransform: 'uppercase',
              letterSpacing: 'wider',
              backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontSize: '3vw',
              maxWidth: '25vw',
              lineHeight: '1.0',
              paddingRight: '2vw',
              display: { xs: 'none', sm: 'none', md: 'block' } // Hide on xs and sm
            }}
          >
            Create your own stories
          </Typography>
          
          {!isLoggedIn && (
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                borderRadius: 10,
                fontWeight: '900',
                fontsize: { xs: '10px', sm: '10px', md: '10px', lg: '10px' },
                fontFamily: 'Montserrat, sans-serif',
                minWidth: 'fit-content',
                mt: 1,
                display: { xs: 'none', sm: 'none', md: 'block' } // Hide on xs and sm
              }}
            >
              Join Us
            </Button>
          )}
        </Box>

        <Box></Box>

        <Box
          sx={{
            display: 'flex',
            marginLeft: { xs: '0px', sm: '10px', md: '10px', lg: '10px' },
            paddingBottom: '20px',
          }}
        >
          <FooterMenu
            title="DISCOVER"
            buttons={[
              'Destinations',
              'Categories',
              'Planning',
              'Articles',
              'Challenges',
              'Social'
            ]}
          />

          <FooterMenu
            title="LEARN"
            buttons={[
              'Destinations',
              'Categories',
              'Planning',
              'Articles',
              'Challenges',
              'Social'
            ]}
          />

          <FooterMenu
            title="CONNECT"
            buttons={[
              'Contact',
              'Newsletter',
              'Social',
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;