import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography, TextField, Select, MenuItem } from '@mui/material';
import DestinationCard from '../../Components/Card/DestinationCard';
import DesCard from '../../Components/Card/DesCard';
import Navbar from '../../Components/Navbar/Navbar';

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
        setCurrentPage(1); // Reset to first page when search term changes
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setCurrentPage(1); // Reset to first page when region filter changes
    };

    const handleContinentChange = (event) => {
        setSelectedContinent(event.target.value);
        setCurrentPage(1); // Reset to first page when continent filter changes
    };

    return (
        <Box sx={{maxWidth: '85vw', margin: 'auto'}}>
            <Navbar />
            <Box sx={{ height: 50 }} />
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
                    InputProps={{ sx: { borderRadius: '40px' } }} // Applying borderRadius to InputProps
                    InputLabelProps={{ sx: { pl: 1.7 } }} // Adding internal padding (left margin) to the label
                    sx={{ mb: 2, width: '83vw', ml: '0.8vw' }} // Adjusting other TextField styles separately
                />
                <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '83vw', ml: '0.8vw' }}>
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
                <Grid container justifyContent="center" spacing={4} sx={{width: '85vw'}}>
                    {currentDestinations.map((destination, index) => (
                    <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                        <DesCard
                        country={destination.region}
                        city={destination.name}
                        imageUrl={destination.picture}
                        />
                    </Grid>
                    ))}
                </Grid>
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
                        sx={{ margin: 1 }}
                    >
                        &laquo;
                    </Button>
                    <Button
                        onClick={() => handleClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        sx={{ margin: 1 }}
                    >
                        &lsaquo;
                    </Button>
                    {currentPage > 2 && (
                        <Button onClick={() => handleClick(currentPage - 1)} sx={{ margin: 1 }}>
                            {currentPage - 1}
                        </Button>
                    )}
                    <Button variant="contained" sx={{ margin: 1 }}>
                        {currentPage}
                    </Button>
                    {currentPage < totalPages && (
                        <Button onClick={() => handleClick(currentPage + 1)} sx={{ margin: 1 }}>
                            {currentPage + 1}
                        </Button>
                    )}
                    <Button
                        onClick={() => handleClick(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        sx={{ margin: 1 }}
                    >
                        &rsaquo;
                    </Button>
                    <Button
                        onClick={() => handleClick(totalPages)}
                        disabled={currentPage === totalPages}
                        sx={{ margin: 1 }}
                    >
                        &raquo;
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Destinations;