import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const PreferenceSelector = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url(https://media.cntraveler.com/photos/6539d1998ab4257d24ee47e4/16:9/w_1920%2Cc_limit/Lenc%25CC%25A7o%25CC%2581is-Maranhenses-National-Park-marcreation-M0wxmEHpBtE-unsplash.jpg)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 1,
        }}>
            <Container maxWidth="sm" sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                padding: 3,
                height: 'fit-content',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                '@media (max-width:600px)': {
                    width: '100%',
                    padding: 2,
                },
                mx: '5vw',
                width: '90vw',
            }}>
                <Typography sx={{
                    fontFamily: 'Poppins',
                    fontSize: { xs: '20px', sm: '24px', md: '30px' },
                    fontWeight: '900',
                    mb: 3,
                }}>
                    Choose how you want to select your preferences
                </Typography>
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '20px', 
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <Button variant="contained" color="primary" component={Link} to="/quiz" sx={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: '900',
                        width: { xs: '100%', sm: '200px' },
                        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                        borderRadius: 5,
                        padding: '10px',
                    }}>
                        Take Quiz
                    </Button>
                    <Button variant="contained" color="primary" component={Link} to="/preferences" sx={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: '900',
                        width: { xs: '100%', sm: '200px' },
                        height: { xs: 'auto', sm: '100px' },
                        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                        borderRadius: 5,
                        padding: '10px',
                    }}>
                        Select Preferences
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default PreferenceSelector;