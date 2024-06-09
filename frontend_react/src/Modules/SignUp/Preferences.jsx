import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../../Components/Data/categories.json';
import GenreCard from '../../Components/Card/GenreCard';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const PreferencePage = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(categoriesData.genres);

  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(selectedGenre => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleSavePreferences = async () => {
    if (selectedGenres.length === 0) {
      setError('Please select at least one preference.');
      return;
    }
  
    try {
      const response = await axios.post(`http://localhost:3001/auth/setUserPreferences`, {
        preferences: selectedGenres
      }, {
        withCredentials: true,
      });
  
      console.log(response.data);
  
      if (response.data.message === 'User preferences updated successfully') {
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
        <Container>
        <Typography variant="h4" gutterBottom style={{ fontFamily: 'Poppins', marginTop: '70px', fontWeight: '700' }}>
            select your preferred destinations
        </Typography>
        <div style={{ marginTop: '20px' }}>
            <Typography variant="h5" gutterBottom style={{ fontFamily: 'Poppins', fontWeight: '700' }}>
                Selected Genres:
            </Typography>
            <div>
                {selectedGenres.map((genre, index) => (
                    <Chip key={index} label={genre} style={{ marginRight: '10px', marginBottom: '10px' }} />
                ))}
            </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {categories.map((category, index) => (
            <GenreCard
                key={index}
                genre={category.genre}
                description={category.description}
                imageUrl={category.imageUrl}
                destinations={category.destinations}
                width="47vw" 
                isSelected={selectedGenres.includes(category.genre)}
                onToggleSelection={() => handleGenreClick(category.genre)}
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

export default PreferencePage;