import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import DesCard from '../../Components/Card/DesCard';
import DestinationHero from '../../Components/Hero/DestinationHero';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import apiUrl from '../../Config/config';
import ExploreSection from '../../Components/Destinations/SearchSection';

const Destinations = () => {
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
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
                const [responseCountries, responseCities] = await Promise.all([
                    axios.get(`${apiUrl}/destinations`),
                    axios.get(`${apiUrl}/destinations/city/cities`)
                ]);

                setCountries(responseCountries.data);
                setCities(responseCities.data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
            }
        };

        fetchDestinations();
    }, []);

    const filteredDestinations = selectedCategory === 'countries'
        ? countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedRegion === '' || country.region === selectedRegion) &&
            (selectedContinent === '' || country.continent === selectedContinent)
        )
        : cities.filter(city =>
            city.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedRegion === '' || city.region === selectedRegion)
        );

    const indexOfLastDestination = currentPage * destinationsPerPage;
    const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
    const currentDestinations = filteredDestinations.slice(indexOfFirstDestination, indexOfLastDestination);

    const totalPages = Math.ceil(filteredDestinations.length / destinationsPerPage);

    const handlePageChange = (event, pageNumber) => setCurrentPage(pageNumber);

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

    const buttonStyles = {
        mb: 2,
        width: '100%',
        padding: '10px',
        borderRadius: 10,
        fontWeight: '900',
        fontSize: { xs: '10px', sm: '12px', md: '14px', lg: '16px' },
        textTransform: 'capitalize',
        fontFamily: 'Poppins',
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

    const handleCardClick = (id, type) => {
        navigate(type === 'country' ? `/country/${id}` : `/city/${id}`);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ height: 50 }} />
            <DestinationHero />
            <Box sx={{ maxWidth: '80vw', margin: 'auto', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ pt: 4 }}>
                    <ExploreSection
                        selectedCategory={selectedCategory}
                        handleCategoryChange={handleCategoryChange}
                        activeButtonStyles={activeButtonStyles}
                        buttonStyles={buttonStyles}
                        searchTerm={searchTerm}
                        handleSearchChange={handleSearchChange}
                        selectedRegion={selectedRegion}
                        handleRegionChange={handleRegionChange}
                        selectedContinent={selectedContinent}
                        handleContinentChange={handleContinentChange}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid container justifyContent="center" spacing={1} sx={{ width: '80vw', mx: '10vw' }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="secondary"
                            shape="rounded"
                            size="medium"
                            siblingCount={1}
                            boundaryCount={1}
                            showFirstButton
                            showLastButton
                            sx={{ '.MuiPaginationItem-root': { mx: 0.5, fontFamily: 'Poppins', fontWeight: '900' }, mb: 2 }}
                        />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default Destinations;