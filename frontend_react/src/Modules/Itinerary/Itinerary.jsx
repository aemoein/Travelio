import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ActivityCard from '../../Components/Card/ActivityCard';
import apiUrl from '../../Config/config';

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const fetchCalledRef = useRef(false);

    const fetchItineraryWithRetry = useCallback(async (retryCount = 0) => {
        const maxRetries = 5;
        const token = localStorage.getItem('token');
        const url = `${apiUrl}/trip/itineraries`;

        try {
            const response = await fetch(`${apiUrl}/users/profile/preferences`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error('Failed to fetch user preferences');

            const data = await response.json();
            
            if (location.state?.bookedHotel) {
                const itineraryResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        destination: location.state.bookedHotel.cityName,
                        start_date: location.state.bookedHotel.arrivalDate,
                        end_date: location.state.bookedHotel.departureDate,
                        interests: data,
                        adults: location.state.bookedHotel.adults,
                        hotel: location.state.bookedHotel.name
                    })
                });

                if (!itineraryResponse.ok) throw new Error('Failed to fetch itinerary');

                const itineraryData = await itineraryResponse.json();
                if (itineraryData.itinerary.length > 0) {
                    setItinerary(itineraryData.itinerary);
                    setError(false);
                } else {
                    throw new Error('No itinerary found');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (retryCount < maxRetries) {
                setTimeout(() => fetchItineraryWithRetry(retryCount + 1), 2000); // Retry after 2 seconds
            } else {
                setError(true);
            }
        } finally {
            setLoading(false);
        }
    }, [location.state]);

    useEffect(() => {
        if (!fetchCalledRef.current) {
            fetchCalledRef.current = true;
            fetchItineraryWithRetry();
        }
    }, [fetchItineraryWithRetry]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const tripId = location.state.tripId;
        const url = `${apiUrl}/trip/itineraries/save`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ itinerary, tripId })
            });

            if (!response.ok) throw new Error('Failed to save itinerary');

            const destination = location.state.bookedHotel.cityName;
            navigate(`/planning/review?tripId=${encodeURIComponent(tripId)}&destination=${encodeURIComponent(destination)}`);
        } catch (error) {
            console.error('Error saving itinerary:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={styles.loadingContainer}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={styles.container}>
                <Typography variant="h4" sx={styles.title}>
                    Itinerary for {location.state.bookedHotel?.cityName}
                </Typography>

                {error ? (
                    <Typography variant="body1">Unable to fetch itinerary. Please try again later.</Typography>
                ) : itinerary.length > 0 ? (
                    itinerary.map((day, index) => (
                        <Box key={index} sx={styles.dayContainer}>
                            <Typography sx={styles.dayTitle}>
                                Day {index + 1} - {day.description}
                            </Typography>
                            <Grid container spacing={3}>
                                {day.activities.map((activity, idx) => (
                                    <Grid item key={idx} xs={12} lg={6}>
                                        <ActivityCard activity={activity} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">No itinerary found.</Typography>
                )}
            </Box>
            <Box sx={styles.saveButtonContainer}>
                <Button variant="contained" color="primary" onClick={handleSave} sx={styles.saveButton}>
                    Save
                </Button>
            </Box>
            <Footer />
        </>
    );
};

const styles = {
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    container: {
        mt: 10,
        maxWidth: '80vw',
        ml: '10vw',
        mr: '10vw'
    },
    title: {
        mb: 3,
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '28px' },
        textAlign: 'center'
    },
    dayContainer: {
        mb: 4
    },
    dayTitle: {
        mb: 3,
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '22px' },
        textAlign: 'center'
    },
    saveButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        my: 4,
        width: '80vw',
        mx: '10vw'
    },
    saveButton: {
        width: '100%',
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '20px' },
        borderRadius: '15px',
        backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)'
    }
};

export default Itinerary;