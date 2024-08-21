import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Button, ThemeProvider, Box, Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import GenreCard from '../../Components/Card/GenreCard2';
import categoriesData from '../../Components/Data/categories.json';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import apiUrl from '../../Config/config';

const RecommendedPreference = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const responseData = location.state?.preferences || [];
    const [categories] = useState(categoriesData.genres);

    // Filter categories based on user preferences
    const preferredGenres = categories.filter(genre => responseData.includes(genre.genre));

    // Handle saving preferences to the server
    const handleSavePreferences = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/users/auth/setUserPreferences`,
                { preferences: responseData },
                { withCredentials: true }
            );
            if (response.data.message === 'User preferences updated successfully') {
                alert("User preferences updated successfully");
                navigate(`/signin`);
            }
            setError('');
        } catch (error) {
            console.error(error);
            setError('Error updating preferences. Please try again later.');
        }
    };

    const theme = createTheme({
        typography: {
            fontFamily: ['Poppins'].join(','),
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Container maxWidth="lg" sx={{ padding: { xs: '2vw', sm: '4vw' }, marginTop: '70px' }}>
                <Typography gutterBottom sx={{ fontWeight: '700', fontSize: { xs: '30px', sm: '40px', md: '50px' } }}>
                    Your Recommended Preferences
                </Typography>
                <Grid container spacing={2}>
                    {preferredGenres.map((category, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <GenreCard
                                genre={category.genre}
                                description={category.description}
                                imageUrl={category.imageUrl}
                                destinations={category.destinations}
                                width="100%"
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginY: '20px' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSavePreferences}
                        sx={{
                            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                            borderRadius: 10,
                            fontWeight: '500',
                            fontFamily: 'Montserrat, sans-serif',
                        }}
                    >
                        Save Preferences
                    </Button>
                </Box>
                {error && <Typography variant="body2" color="error">{error}</Typography>}
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default RecommendedPreference;