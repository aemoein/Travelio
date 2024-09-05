import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HotelCard from '../../Components/Card/HotelCard';
import airports from '../../Components/Data/airports.json';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import apiUrl from '../../Config/config';

const HotelsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hotelName, setHotelName] = useState('');

    const query = new URLSearchParams(location.search);
    const cityName = query.get('cityName');
    const tripId = query.get('trip');
    const arrivalDate = query.get('arrivalDate');
    const departureDate = query.get('departureDate');
    const adults = query.get('adults');

    const getCityCode = (airportCode) => {
        const city = airports.find((airport) => airport.Airport.toLowerCase() === airportCode.toLowerCase());
        return city ? city.cityCode : null;
    };

    const getCity = (airportCode) => {
        const city = airports.find((airport) => airport.Airport.toLowerCase() === airportCode.toLowerCase());
        return city ? city.city : null;
    };

    const cityCode = getCityCode(cityName);
    const name = getCity(cityName);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch(`${apiUrl}/trip/hotels?adults=${adults}&roomQuantity=1&checkOutDate=${departureDate}&checkInDate=${arrivalDate}&cityCode=${cityCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                console.log('Fetched hotels:', data);

                // Filter out hotels with missing latitude, longitude, or offers
                const filteredHotels = data.filter(hotel => 
                    hotel.latitude &&
                    hotel.longitude &&
                    hotel.offers && 
                    hotel.offers.length > 0
                );

                setHotels(filteredHotels);
                setError(false);
            } catch (error) {
                console.error('Error fetching hotels:', error.message);
                setHotels([]);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (cityCode) {
            fetchHotels();
        } else {
            setLoading(false);
            setError(true);
            console.error('City code not found for:', cityName);
        }
    }, [cityCode, arrivalDate, departureDate, adults]);

    const handleBookingRedirect = () => {
        const bookingUrl = `https://www.booking.com/searchresults.en-gb.html?ss=${encodeURIComponent(cityName)}&ssne=${encodeURIComponent(cityName)}&dest_type=city&checkin=${arrivalDate}&checkout=${departureDate}&group_adults=${adults}&no_rooms=1&group_children=0`;
        window.open(bookingUrl, '_blank');
    };

    const handleHotelSelection = () => {
        if (hotelName.trim() !== '') {
            navigate('/planning/itinerary', {
                state: {
                    bookedHotel: {
                        name: hotelName,
                        cityName,
                        arrivalDate,
                        departureDate,
                        adults
                    },
                    tripId: tripId
                }
            });
        }
    };

    return (
        <>
            <Navbar />
            <Box sx={{ mt: 10, width: '80vw', mr: '10vw', ml: '10vw' }}>
                <Typography align="left" sx={{ mb: 1, fontFamily: 'Poppins', fontWeight: '900', fontSize: { xs: '24px', sm: '32px', md: '36px', lg: '42px' },}}>
                    Hotel Results in {name}:
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {loading ? (
                        <CircularProgress sx={{mt: 10}}/>
                    ) : error ? (
                        <>
                            <Typography variant="h6" color="error">
                                No hotels found for the specified city and dates. Please try another service.
                            </Typography>
                            <Button onClick={handleBookingRedirect} variant="contained" color="primary" sx={{ mt: 2 }}>
                                Search on Booking.com
                            </Button>
                            <TextField
                                label="Enter Hotel Name"
                                value={hotelName}
                                onChange={(e) => setHotelName(e.target.value)}
                                sx={{ mt: 2 }}
                            />
                            <Button onClick={handleHotelSelection} variant="contained" color="primary" sx={{ mt: 2 }}>
                                Confirm Hotel Booking
                            </Button>
                        </>
                    ) : (
                        hotels.length > 0 ? (
                            hotels.map((hotel, index) => (
                                <Grid item key={index} xs={12} sm={12} md={12} lg={6}>
                                    <HotelCard
                                        hotel={hotel}
                                        tripId={tripId}
                                        cityName={name}
                                        arrivalDate={arrivalDate}
                                        departureDate={departureDate}
                                        adults={adults}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Typography>No hotels available for the specified city and dates</Typography>
                        )
                    )}
                </Grid>
            </Box>
        </>
    );
};

export default HotelsPage;