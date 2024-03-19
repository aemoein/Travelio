import React from 'react';
import { Box, Typography } from '@mui/material';
import DestinationCard from './DestinationCard';
import GradientButton from '../Buttons/GradientButton';

const DesView = ({ destinations }) => {
  return (
    <Box sx={{ marginLeft: '6.5vw', marginRight: '6.5vw', padding: '1.2vw', marginTop: '10px', maxWidth: '85vw'}}>
        <Typography align="left" 
            sx={{ 
                marginLeft: '1.5vw',
                fontFamily: 'Merriweather',
                fontWeight: '900',
                fontSize: '1.2vw',
                lineHeight: '1.0',
                width: 'fit-content',
                backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
            }}>
            Editor's choice
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
            <Typography
                align="left"
                sx={{
                marginBottom: '10px',
                marginLeft: '1.5vw',
                fontFamily: 'Poppins',
                fontWeight: '900',
                fontSize: '2vw',
                }}
            >
                Your Next Adventure!
            </Typography>
            <GradientButton text={"View Destinations"} />
        </Box>
      
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {destinations.map((destination, index) => (
            <DestinationCard
                key={index}
                country={destination.country}
                city={destination.city}
                imageUrl={destination.imageUrl}
            />
            ))}
        </Box>
    </Box>
  );
};

export default DesView;