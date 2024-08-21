import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlightCard from '../../Components/Card/ReviewFlightCard';
import HotelCard from '../../Components/Card/ReviewHotelCard';
import ActivityCard from '../../Components/Card/ActivityCard';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import apiUrl from '../../Config/config';

const ReviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [tripData, setTripData] = useState({});
    const [loading, setLoading] = useState(true);
    const [tripId, setTripId] = useState(null); // State to store tripId
    const searchParams = new URLSearchParams(location.search);
    console.log("location.search:", location.search);  // Check what is in location.search
    const destination = searchParams.get('destination');
    console.log("destination:", destination);  // Check the value of destination


    useEffect(() => {
        const fetchTripData = async () => {
            const token = localStorage.getItem('token');
            const searchParams = new URLSearchParams(location.search);
            const fetchedTripId = searchParams.get('tripId');
            const url = `${apiUrl}/trip/trip?tripId=${fetchedTripId}`;

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
                    setTripId(fetchedTripId); // Store tripId in state
                } else {
                    throw new Error('Failed to fetch trip data');
                }
            } catch (error) {
                console.error('Error fetching trip data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (location.search) {
            fetchTripData();
        }
    }, [location.search]);

    const handlePayNow = async () => {
        const token = localStorage.getItem('token');
        const body = JSON.stringify({
            tripId: tripId,
            destination: destination,
            totalPrice: tripData.totalPrice
        });

        const url = `${apiUrl}/payment`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: body
            });

            const responseData = await response.json();

            if (response.ok) {
                console.log(responseData);

                const paymentUrl = responseData.session.url;

                console.log(paymentUrl);
                console.log('Payment successful!');

                window.location.href = paymentUrl;
            } else {
                throw new Error('Payment failed');
            }
        } catch (error) {
            console.error('Error making payment:', error);
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
                                        tripId={tripId} // Pass tripId as prop to HotelCard
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