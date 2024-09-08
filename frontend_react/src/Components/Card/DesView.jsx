import React, { useMemo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DestinationCard from './DestinationCard';
import GradientButton from '../Buttons/GradientButton';

// Memoize GradientButton since it won't change often
const MemoizedGradientButton = React.memo(GradientButton);

const DesView = ({ destinations }) => {
  // Limit destinations for xs screens using useMemo
  const limitedDestinations = useMemo(() => destinations.slice(0, 2), [destinations]);

  // Determine whether to show limited or full destinations using useMemo
  const isSmallScreen = window.innerWidth <= 600;
  const displayedDestinations = useMemo(
    () => (isSmallScreen ? limitedDestinations : destinations),
    [isSmallScreen, limitedDestinations, destinations]
  );

  return (
    <Box
      sx={{
        marginLeft: { xs: '3vw', sm: '4vw', md: '5vw', lg: '7.5' },
        marginRight: { xs: '3vw', sm: '4vw', md: '5vw', lg: '7.5' },
        padding: '20px',
        marginTop: '10px',
        maxWidth: { xs: '94vw', sm: '92vw', md: '90vw', lg: '85vw' },
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
          <MemoizedGradientButton text={"View More"} path="/destinations" />
        </Box>
      </Box>

      <Box>
        <Grid container spacing={0.5} sx={{ marginTop: '0px' }}>
          {displayedDestinations.map((destination, index) => (
            <Grid item xs={6} sm={4} key={index}>
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