import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';
import DesCard from '../../Components/Card/DesCard';
import DestinationHero from '../../Components/Hero/DestinationHero';
import Navbar from '../../Components/Navbar/Navbar';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import Footer from '../../Components/Footer/Footer';

const Destinations = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [naturalAreas, setNaturalAreas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('countries');
    const destinationsPerPage = 12;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const responseCountries = await axios.get('http://localhost:7777/destinations');
                const responseCities = await axios.get('http://localhost:7777/destinations/city/cities');
                //const responseNatural = await axios.get('http://localhost:3002/natural');

                console.log('Countries Response:', responseCountries.data);
                console.log('Cities Response:', responseCities.data);
                //console.log('Natural Areas Response:', responseNatural.data);

                setCountries(responseCountries.data);
                setCities(responseCities.data);
                //setNaturalAreas(responseNatural.data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    let filteredDestinations = [];
    if (selectedCategory === 'countries') {
        filteredDestinations = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedRegion === '' || country.region === selectedRegion) &&
            (selectedContinent === '' || country.continent === selectedContinent)
        );
    } else if (selectedCategory === 'cities') {
        filteredDestinations = cities.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedRegion === '' || city.region === selectedRegion)
        );
    }

    const indexOfLastDestination = currentPage * destinationsPerPage;
    const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
    const currentDestinations = filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);

    const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setCurrentPage(1);
    };

    const handleContinentChange = (event) => {
        setSelectedContinent(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const getButtonStyles = (page) => ({
        margin: 1,
        borderRadius: 10,
        fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
        textTransform: 'uppercase',
        fontFamily: 'Poppins',
        fontWeight: '700',
        border: currentPage === page ? '2px solid ' : '2px solid',
        backgroundImage: currentPage === page ? 'linear-gradient(to right, #6b778d, #ff6b6b)' : 'none',
        color: currentPage === page ? 'white' : '#A9A9A9',
        backgroundColor: currentPage === page ? 'transparent' : 'none',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: '#ffffff',
            border: 'none',
        },
    });

    const buttonStyles = {
        mb: 2,
        width: '100%',
        padding: '10px',
        borderRadius: 10,
        fontWeight: '900',
        fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
        textTransform: 'uppercase',
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        backgroundColor: '#ffffff',
        color: '#aaaaaa',
        border: '1px solid #bbbbbb',
        '&:hover': {
            border: '2px solid',
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: 'white',
            backgroundColor: 'transparent',
        },
    };

    const activeButtonStyles = {
        ...buttonStyles,
        border: '2px solid',
        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
        color: 'white',
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: '#ffffff',
            border: 'none',
        },
    };

    const arrowButtonStyles = {
        color: '#A9A9A9',
        font: 'Poppins',
        border: '2px solid',
        borderRadius: 10,
        textTransform: 'none',
        fontWeight: '900',
        fontSize: '1.5vw',
        margin: 1,
        transition: 'background-image 0.8s, color 0.2s',
        '&:hover': {
            backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
            color: '#ffffff',
            border: 'none',
        },
    };

    const handleCardClick = (id, type) => {
        if (type === 'country') {
            navigate(`/country/${id}`);
        } else if (type === 'city') {
            navigate(`/city/${id}`);
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ height: 50 }} />
            <DestinationHero />
            <Box sx={{ maxWidth: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, margin: 'auto', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                <Box sx={{ pt: 4 }}>
                    <Box 
                        sx={{ 
                            maxWidth: '100%',
                            width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                            mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw'}
                        }}
                    >
                        <Typography align="left" 
                            sx={{
                                fontFamily: 'Merriweather',
                                fontWeight: '900',
                                fontSize: { xs: '16px', sm: '24px', md: '28px', lg: '28px' },
                                lineHeight: '1.2',
                                width: 'fit-content',
                                backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent',
                            }}>
                            Explore
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' }, fontFamily: 'Poppins', fontWeight: '600' }}>
                            Destinations
                        </Typography>
                    </Box>
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        gap={2} // This adds 16px spacing between buttons
                        sx={{ 
                            width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' },
                            mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw'}
                        }}
                    >
                        <Button
                            sx={selectedCategory === 'countries' ? activeButtonStyles : buttonStyles}
                            onClick={() => handleCategoryChange('countries')}
                        >
                            COUNTRIES
                        </Button>
                        <Button
                            sx={selectedCategory === 'cities' ? activeButtonStyles : buttonStyles}
                            onClick={() => handleCategoryChange('cities')}
                        >
                            CITIES
                        </Button>
                        <Button
                            sx={selectedCategory === 'natural' ? activeButtonStyles : buttonStyles}
                            onClick={() => handleCategoryChange('natural')}
                        >
                            NATURE
                        </Button>
                    </Box>
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="space-evenly"
                        sx={{ 
                            width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                            mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw'},
                            mb: 2,
                        }}
                    >
                        <TextField
                            label="Search destinations"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleSearchChange}
                            InputProps={{ sx: { borderRadius: '40px' } }}
                            InputLabelProps={{ sx: { pl: 1.7 } }}
                            sx={{maxWidth: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }}}
                        /> 
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center" 
                        sx={{ 
                            width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' }, 
                            mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw'},
                        }}
                    >
                        <Select
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            variant="outlined"
                            fullWidth
                            displayEmpty
                            sx={{ mb: 2, mr: 2, borderRadius: '40px', '& .MuiSelect-select': { paddingLeft: '1.7em', }, }}
                        >
                            <MenuItem value="">All Regions</MenuItem>
                            <MenuItem value="North America">North America</MenuItem>
                            <MenuItem value="Central America & Caribbean">Central America & Caribbean</MenuItem>
                            <MenuItem value="South America">South America</MenuItem>
                            <MenuItem value="Northern Europe">Northern Europe</MenuItem>
                            <MenuItem value="Western Europe">Western Europe</MenuItem>
                            <MenuItem value="Southern Europe">Southern Europe</MenuItem>
                            <MenuItem value="Eastern Europe">Eastern Europe</MenuItem>
                            <MenuItem value="Russia and Caucasus">Russia and Caucasus</MenuItem>
                            <MenuItem value="Central Asia">Central Asia</MenuItem>
                            <MenuItem value="Middle East">Middle East</MenuItem>
                            <MenuItem value="North Africa">North Africa</MenuItem>
                            <MenuItem value="West Africa">West Africa</MenuItem>
                            <MenuItem value="Central Africa">Central Africa</MenuItem>
                            <MenuItem value="East Africa">East Africa</MenuItem>
                            <MenuItem value="Southern Africa">Southern Africa</MenuItem>
                            <MenuItem value="South Asia">South Asia</MenuItem>
                            <MenuItem value="Southeast Asia">Southeast Asia</MenuItem>
                            <MenuItem value="East Asia">East Asia</MenuItem>
                            <MenuItem value="Oceania">Oceania</MenuItem>
                            <MenuItem value="The Arctic and Antarctica">The Arctic and Antarctica</MenuItem>
                        </Select>
                        <Select
                            value={selectedContinent}
                            onChange={handleContinentChange}
                            variant="outlined"
                            fullWidth
                            displayEmpty
                            sx={{ mb: 2, borderRadius: '40px', '& .MuiSelect-select': { paddingLeft: '1.7em', }, }}
                        >
                            <MenuItem value="">All Continents</MenuItem>
                            <MenuItem value="North America">North America</MenuItem>
                            <MenuItem value="South America">South America</MenuItem>
                            <MenuItem value="Europe">Europe</MenuItem>
                            <MenuItem value="Asia">Asia</MenuItem>
                            <MenuItem value="Africa">Africa</MenuItem>
                            <MenuItem value="Australia">Australia</MenuItem>
                            <MenuItem value="Antarctica">Antarctica</MenuItem>
                        </Select>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Grid container justifyContent="center" spacing={1} sx={{ width: { xs: '90vw', sm: '80vw', md: '80vw', lg: '80vw' },  mx: { xs: '5vw', sm: '10vw', md: '10vw', lg: '10vw'},}}>
                            {currentDestinations.map((destination, index) => (
                                <Grid item xs={6} sm={4} md={4} lg={3} key={index}>
                                    <DesCard
                                        country={destination.region}
                                        city={destination.name}
                                        imageUrl={destination.picture}
                                        onClick={() => handleCardClick(destination._id, selectedCategory === 'countries' ? 'country' : 'city')}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: 4,
                        }}
                    >
                        <Button
                            onClick={() => handleClick(1)}
                            disabled={currentPage === 1}
                            sx={arrowButtonStyles}
                        >
                            <KeyboardDoubleArrowLeftOutlinedIcon />
                        </Button>
                        <Button
                            onClick={() => handleClick(currentPage - 1)}
                            disabled={currentPage === 1}
                            sx={arrowButtonStyles}
                        >
                            <ArrowBackIosNewOutlinedIcon />
                        </Button>
                        {currentPage > 2 && (
                            <Button
                                onClick={() => handleClick(currentPage - 1)}
                                sx={getButtonStyles(currentPage - 1)}
                            >
                                {currentPage - 1}
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            sx={getButtonStyles(currentPage)}
                        >
                            {currentPage}
                        </Button>
                        {currentPage < totalPages && (
                            <Button
                                onClick={() => handleClick(currentPage + 1)}
                                sx={getButtonStyles(currentPage + 1)}
                            >
                                {currentPage + 1}
                            </Button>
                        )}
                        <Button
                            onClick={() => handleClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            sx={arrowButtonStyles}
                        >
                            <ArrowForwardIosOutlinedIcon />
                        </Button>
                        <Button
                            onClick={() => handleClick(totalPages)}
                            disabled={currentPage === totalPages}
                            sx={arrowButtonStyles}
                        >
                            <KeyboardDoubleArrowRightOutlinedIcon />
                        </Button>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Destinations;