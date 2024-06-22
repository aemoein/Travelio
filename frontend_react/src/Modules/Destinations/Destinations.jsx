import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Grid, Typography } from '@mui/material';
import DestinationCard from '../../Components/Card/DestinationCard';
import Navbar from '../../Components/Navbar/Navbar';

const Destinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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

    const indexOfLastDestination = currentPage * destinationsPerPage;
    const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
    const currentDestinations = destinations.slice(indexOfFirstDestination, indexOfLastDestination);

    const totalPages = Math.ceil(destinations.length / destinationsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
        <Navbar />
        <Box sx={{ height: 50 }}/>
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ ml: 1.7, fontFamily: 'Poppins', fontWeight: '600'}}>
                Destinations
            </Typography>
            <Grid container spacing={4}>
                {currentDestinations.map((destination, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <DestinationCard
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
                    <Button onClick={() => handleClick(currentPage + 1)} sx={{ margin: 1}}>
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
        </>
    );
};

export default Destinations;