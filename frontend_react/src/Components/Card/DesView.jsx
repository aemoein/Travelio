import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DestinationCard from './DestinationCard';
import GradientButton from '../Buttons/GradientButton';

const DesView = ({ destinations }) => {
  // Slice the first 2 destinations for xs screens
  const limitedDestinations = destinations.slice(0, 2);

  return (
    <Box sx={{ marginLeft: '40px', marginRight: '40px', padding: '20px', marginTop: '10px', maxWidth: '85%' }}>
      <Typography
        align="left"
        sx={{
          marginLeft: '10px',
          fontFamily: 'Merriweather',
          fontWeight: '900',
          fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px' },
          lineHeight: '1.0',
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
            fontFamily: 'Poppins',
            fontWeight: '900',
            fontSize: { xs: '18px', sm: '20px', md: '24px', lg: '28px' },
          }}
        >
          Your Next Adventure!
        </Typography>
        <GradientButton text={"View Destinations"} />
      </Box>
      
      <Grid container spacing={2} sx={{ marginTop: '0px' }}>
        {/* Display 2 cards on xs, and all cards on sm and larger */}
        {(window.innerWidth <= 600 ? limitedDestinations : destinations).map((destination, index) => (
          <Grid 
            item 
            xs={6} // 2 cards on extra small screens
            sm={4} // 3 cards on small screens and above
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
  );
};

export default DesView;