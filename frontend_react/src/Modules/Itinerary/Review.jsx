import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import FlightCard from '../../Components/Card/FlightCard';
import HotelCard from '../../Components/Card/HotelCard';

const ReviewPage = () => {
    const location = useLocation();
    const [tripData, setTripData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTripData = async () => {
            const token = localStorage.getItem('token');
            const tripId = location.state.tripId;
            const url = `http://localhost:3003/api/trip?tripId=${tripId}`;
    
            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
    
                if (response.ok) {
                    const tripData = await response.json();
                    console.log(tripData.trip.itinerary[0].itinerary);
                    setTripData(tripData.trip);
                } else {
                    throw new Error('Failed to fetch trip data');
                }
            } catch (error) {
                console.error('Error fetching trip data:', error);
            } finally {
                setLoading(false);
            }
        };
    
        if (location.state && location.state.tripId) {
            fetchTripData();
        }
    }, [location.state]);    

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {tripData && (
                <Box sx={{ mt: 10, maxWidth: '80vw', ml: '10vw', mr: '10vw'}}>
                    <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'center' }}>
                        Review Trip Details
                    </Typography>

                    {/* Display Flight Cards */}
                    {tripData.flights && tripData.flights.length > 0 && (
                        <Grid container spacing={2}>
                            {tripData.flights.map((flight, index) => (
                                <Grid item xs={12} key={index}>
                                    <FlightCard
                                        flight={flight}
                                        cityName={tripData.destinationLocationCode}
                                        arrivalDate={tripData.departureDate}
                                        departureDate={tripData.returnDate}
                                        adults={tripData.adults}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Display Hotel Cards */}
                    {tripData.hotels && tripData.hotels.length > 0 && (
                        <Grid container spacing={2}>
                            {tripData.hotels.map((hotel, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <HotelCard
                                        hotel={hotel}
                                        tripId={location.state.tripId}
                                        cityName={hotel.name}
                                        arrivalDate={tripData.departureDate}
                                        departureDate={tripData.returnDate}
                                        adults={tripData.adults}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Display Itinerary */}
                    {tripData.itinerary[0].itinerary && tripData.itinerary[0].itinerary.length > 0 ? (
                        tripData.itinerary[0].itinerary.map((day, index) => (
                            <Box key={index} sx={{ mb: 4 }}>
                                <Typography sx={{ mb: 3, width: '100%', textAlign: 'center', fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px' }}>
                                    Day {index + 1}
                                </Typography>
                                <Grid container spacing={3}>
                                    {day.activities.map((activity, idx) => (
                                        <Grid item xs={12} sm={6} key={idx}>
                                            <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', p: 2 }}>
                                                <Typography sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px' }}>
                                                    {activity.name}
                                                </Typography>
                                                <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: '20px' }}>
                                                    {activity.type ? activity.type.charAt(0).toUpperCase() + activity.type.slice(1) : 'Type'}
                                                </Typography>
                                                {/* Add map and other activity details */}
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1">No itinerary found.</Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ReviewPage;