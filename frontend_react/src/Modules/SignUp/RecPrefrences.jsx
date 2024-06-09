import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Container, Typography, Button, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import GenreCard from '../../Components/Card/GenreCard2';
import categoriesData from '../../Components/Data/categories.json';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const RecommendedPreference = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const responseData = location.state?.preferences || [];
    const [categories, setCategories] = useState(categoriesData.genres);

    console.log(responseData);

    const preferredGenres = categories.filter(genre => responseData.includes(genre.genre));

    console.log(preferredGenres);


    const handleSavePreferences = async () => {
        try {
            const response = await axios.post(
                `http://localhost:3001/auth/setUserPreferences`,
                { preferences: responseData },
                { withCredentials: true }
            );
            console.log(response.data);
            if (response.data.message === 'User preferences updated successfully') {
                alert("User preferences updated successfully");
                navigate(`/`);
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
            <Container>
                <Typography gutterBottom sx={{ marginTop: '70px', fontWeight: '700', fontSize: '50px', fontFamily: 'Poppins' }}>
                    Your Recommended Preferences
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {preferredGenres.map((category, index) => (
                        <GenreCard
                            key={index}
                            genre={category.genre}
                            description={category.description}
                            imageUrl={category.imageUrl}
                            destinations={category.destinations}
                            width="47vw"
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
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
                </div>
                {error && <Typography variant="body2" color="error">{error}</Typography>}
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default RecommendedPreference;