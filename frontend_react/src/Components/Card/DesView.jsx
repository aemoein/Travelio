import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DestinationCard from './DestinationCard';
import GradientButton from '../Buttons/GradientButton';

const DesView = ({ destinations }) => {
  // Slice the first 2 destinations for xs screens
  const limitedDestinations = destinations.slice(0, 2);

  return (
    <Box 
      sx={{ 
        marginLeft: { xs: '3vw', sm: '4vw', md: '5vw', lg: '7.5' }, 
        marginRight: { xs: '3vw', sm: '4vw', md: '5vw', lg: '7.5' }, 
        padding: '20px', marginTop: '10px', 
        maxWidth: { xs: '94vw', sm: '92vw', md: '90vw', lg: '85vw' } 
      }}
    >
      <Box>
        <Typography
          align="left"
          sx={{
            marginLeft: '10px',
            fontFamily: 'Merriweather',
            fontWeight: '900',
            fontSize: { xs: '12px', sm: '16px', md: '20px', lg: '22px' },
            lineHeight: '1.0',
            mb: 0,
            width: 'fit-content',
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Editor's choice
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Typography
            align="left"
            sx={{
              marginBottom: '0px',
              marginLeft: '10px',
              lineHeight: '0.7',
              fontFamily: 'Poppins',
              fontWeight: '900',
              fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '28px' },
            }}
          >
            Your Next Adventure!
          </Typography>
          <GradientButton text={"View More"} path="/destinations"/>
        </Box>
      </Box>

      <Box>
        <Grid container spacing={0.5} sx={{ marginTop: '0px' }}>
          {(window.innerWidth <= 600 ? limitedDestinations : destinations).map((destination, index) => (
            <Grid 
              item 
              xs={6}
              sm={4}
              key={index}
            >
              <DestinationCard
                country={destination.country}
                city={destination.city}
                imageUrl={destination.imageUrl}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DesView;