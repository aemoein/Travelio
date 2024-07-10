import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../../Components/Card/ReviewFlightCard';
import HotelCard from '../../Components/Card/ReviewHotelCard';
import ActivityCard from '../../Components/Card/ActivityCard';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const ReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
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

    const handlePayNow = async () => {
        const token = localStorage.getItem('token');
        const tripId = location.state.tripId;
        const destination = location.state.destination;
        const totalPrice = tripData.totalPrice;

        const url = 'http://localhost:3005/payment';
        const body = JSON.stringify({
            tripId,
            destination,
            totalPrice
        });

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body
            });

            if (response.ok) {
                // Payment successful, handle response accordingly
                console.log('Payment successful!');
                navigate('/planning/checkout'); // Navigate to checkout page or handle success flow
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            console.error('Error making payment:', error);
            // Handle payment error, show error message, etc.
        }
    };

    const handleSaveAndPayLater = () => {
        navigate('/');
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
        <Box>
            {tripData && (
                <Box sx={{ mt: 10, maxWidth: '70vw', mx: '15vw'}}>
                    <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'center' }}>
                        Review Trip Details
                    </Typography>

                    <Typography variant="h4" sx={{ mb: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'left', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', maxWidth: 'fit-content', }}>
                        Flight
                    </Typography>
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

                    <Typography variant="h4" sx={{ my: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'left', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', maxWidth: 'fit-content',  }}>
                        Hotel
                    </Typography>
                    {tripData.hotels && tripData.hotels.length > 0 && (
                        <Grid container spacing={2}>
                            {tripData.hotels.map((hotel, index) => (
                                <Grid item xs={12} sm={12} key={index}>
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

                    <Typography variant="h4" sx={{ my: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'left', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', maxWidth: 'fit-content',  }}>
                        Itinerary
                    </Typography>
                    {tripData.itinerary[0].itinerary && tripData.itinerary[0].itinerary.length > 0 ? (
                        tripData.itinerary[0].itinerary.map((day, index) => (
                            <Box key={index} sx={{ mb: 4 }}>
                                <Typography sx={{ mb: 3, width: '100%', textAlign: 'center', fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px' }}>
                                    Day {index + 1} - {day.description}
                                </Typography>
                                <Grid container spacing={3}>
                                    {day.activities.map((activity, idx) => (
                                        <Grid item xs={12} sm={12} key={idx}>
                                            <ActivityCard activity={activity} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="body1">No itinerary found.</Typography>
                    )}
                    <Typography variant="h4" sx={{ my: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px', width: '100%', textAlign: 'left', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', color: 'transparent', maxWidth: 'fit-content',  }}>
                        Total Price: {tripData.totalPrice.toFixed(2)} USD
                    </Typography>
                    <Box sx={{ textAlign: 'center', mt: 4, width: '100%', mb: 3 }}>
                        <Button variant="contained" color="primary" onClick={handlePayNow} sx={{ mr: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '25px', borderRadius: '20px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)'}}>
                            Pay Now
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleSaveAndPayLater} sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '25px', borderRadius: '20px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}>
                            Save and Pay Later
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
        <Footer />
        </>
    );
};

export default ReviewPage;