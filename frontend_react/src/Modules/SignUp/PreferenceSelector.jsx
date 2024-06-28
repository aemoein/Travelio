import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

const PreferenceSelector = () => {
    return (
        <Box>
            <Container>
                <Box sx={{ width: '100vw', height: '100vh', backgroundImage: `url(https://media.cntraveler.com/photos/6539d1998ab4257d24ee47e4/16:9/w_1920%2Cc_limit/Lenc%25CC%25A7o%25CC%2581is-Maranhenses-National-Park-marcreation-M0wxmEHpBtE-unsplash.jpg)`, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundPosition: 'center', backgroundSize: 'cover',}}>
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
                    }}>
                        <Typography sx={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: '900', mb: 3, ml: 2 }}>
                            Choose how you want to select your preferences
                        </Typography>
                        <Box style={{ display: 'flex', gap: '30px', marginBottom: '10px' }}>
                            <Button variant="contained" color="primary" component={Link} to="/quiz" sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '900', width: '250px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', borderRadius: 5 }}>
                                Take Quiz
                            </Button>
                            <Button variant="contained" color="primary" component={Link} to="/preferences" sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: '900', width: '250px', height: '100px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', borderRadius: 5}}>
                                Select Preferences
                            </Button>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </Box>
    );
};

export default PreferenceSelector;
