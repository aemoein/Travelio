import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import ActivityCard from '../../Components/Card/ActivityCard';

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchCalledRef = useRef(false);

    useEffect(() => {
        const fetchItinerary = async () => {
            const token = localStorage.getItem('token');
            const url = 'http://localhost:7777/trip/itineraries';

            try {
                const response = await fetch('http://localhost:7777/users/profile/preferences', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    if (location.state && location.state.bookedHotel) {
                        try {
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

                            if (itineraryResponse.ok) {
                                const itineraryData = await itineraryResponse.json();
                                setItinerary(itineraryData.itinerary);
                            } else {
                                throw new Error('Failed to fetch itinerary');
                            }
                        } catch (error) {
                            console.error('Error fetching itinerary:', error);
                        } finally {
                            setLoading(false);
                        }
                    } else {
                        setLoading(false);
                    }
                } else {
                    throw new Error('Failed to fetch user preferences');
                }
            } catch (error) {
                console.error('Error fetching user preferences:', error);
            }
        };

        if (!fetchCalledRef.current) {
            fetchCalledRef.current = true;
            fetchItinerary();
        }
    }, [location.state]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const tripId = location.state.tripId;
        const url = 'http://localhost:7777/trip/itineraries/save';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    itinerary,
                    tripId
                })
            });
    
            const destination = location.state.bookedHotel.cityName;
    
            if (response.ok) {
                console.log('Itinerary saved successfully');
                const encodedTripId = encodeURIComponent(tripId);
                const encodedDestination = encodeURIComponent(destination);
                navigate(`/planning/review?tripId=${encodedTripId}&destination=${encodedDestination}`);
            } else {
                throw new Error('Failed to save itinerary');
            }
        } catch (error) {
            console.error('Error saving itinerary:', error);
        }
    };    

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ mt: 10, maxWidth: '80vw', ml: '10vw', mr: '10vw'}}>
                <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Poppins',  fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'center' }}>
                    Itinerary for {location.state.bookedHotel.cityName}
                </Typography>

                {itinerary.length > 0 ? (
                    itinerary.map((day, index) => (
                        <Box key={index} sx={{ mb: 4 }}>
                            <Typography sx={{ mb: 3, width: '100%', textAlign: 'center', fontFamily: 'Poppins',  fontWeight: '700', fontSize: '40px'}}>
                                Day {index + 1} - {day.description}
                            </Typography>
                            <Grid container spacing={3}>
                                {day.activities.map((activity, idx) => (
                                    <Grid item key={idx} xs={12} sm={12} md={12} lg= {6}>
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
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, width: '80vw' , mx: '10vw'}}>
                <Button variant="contained" color="primary" onClick={handleSave} sx={{width: '100%', fontFamily: 'Poppins', fontWeight: '700', fontSize:'20px', borderRadius: '15px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)'}}>
                    Save
                </Button>
            </Box>
            <Footer />
        </>
    );
};

export default Itinerary;