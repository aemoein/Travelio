import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';
import DesCard from '../../Components/Card/DesCard';
import DesCardLarge from '../../Components/Card/DesCardLarge';
import DestinationHero from '../../Components/Hero/DestinationHero';
import Navbar from '../../Components/Navbar/Navbar';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import Footer from '../../Components/Footer/Footer';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedContinent, setSelectedContinent] = useState('');
    const destinationsPerPage = 12;

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:3002/destinations');
                setDestinations(response.data);
                console.log('Destinations:', destinations);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedRegion === '' || destination.region === selectedRegion) &&
        (selectedContinent === '' || destination.continent === selectedContinent)
    );

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

    const getButtonStyles = (page) => ({
        margin: 1,
        borderRadius: 10,
        fontSize: '1.5vw',
        font: 'Poppins',
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

    return (
        <>
            <Navbar />
            <Box sx={{ height: 50 }} />
            <DestinationHero />
            <Box sx={{ width: '80vw', margin: 'auto', justifyContent: 'center', display: 'flex', alignItems: 'center', pl: 6, pr: 6 }}>
                <Box sx={{ padding: 4 }}>
                    <Typography variant="h4" gutterBottom sx={{ ml: '1.6vw', fontFamily: 'Poppins', fontWeight: '600' }}>
                        Destinations
                    </Typography>
                    <TextField
                        label="Search destinations"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{ sx: { borderRadius: '40px' } }}
                        InputLabelProps={{ sx: { pl: 1.7 } }}
                        sx={{ mb: 2,  width: { xs: '78vw', sm: '78vw', md: '78vw', lg: '77vw' }, ml: { xs: '1.8vw', sm: '1.5vw', md: '1.2vw', lg: '0vw' } }}
                    />    
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: { xs: '78vw', sm: '78vw', md: '78vw', lg: '77vw' }, ml: { xs: '1.8vw', sm: '1.8vw', md: '1.2vw', lg: '0vw' }}}>
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
                            //ml: '-2.1vw',
                        }}
                    >
                        <Grid container justifyContent="center" spacing={4} sx={{ width: '80vw' }}>
                            {currentDestinations.map((destination, index) => (
                                <Grid item xs={4} sm={4} md={4} lg={3} key={index}>
                                    {window.innerWidth >= 1280 ? (
                                        <DesCardLarge
                                            country={destination.region}
                                            city={destination.name}
                                            imageUrl={destination.picture}
                                        />
                                    ) : (
                                        <DesCard
                                            country={destination.region}
                                            city={destination.name}
                                            imageUrl={destination.picture}
                                        />
                                    )}
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