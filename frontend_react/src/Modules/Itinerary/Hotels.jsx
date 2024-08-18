import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HotelCard from '../../Components/Card/HotelCard';
import airports from '../../Components/Data/airports.json';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from '../../Components/Navbar/Navbar';

const HotelsPage = () => {
    const location = useLocation();
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const response = await fetch(`https://travelio-production.up.railway.app/trip/hotels?adults=${adults}&roomQuantity=1&checkOutDate=${departureDate}&checkInDate=${arrivalDate}&cityCode=${cityCode}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch hotels');
                }
                const data = await response.json();
                console.log('Fetched hotels:', data);
                setHotels(data || []);
            } catch (error) {
                console.error('Error fetching hotels:', error.message);
                setHotels([]);
            } finally {
                setLoading(false);
            }
        };

        if (cityCode) {
            fetchHotels();
        } else {
            setLoading(false);
            console.error('City code not found for:', cityName);
        }
    }, [cityCode, arrivalDate, departureDate, adults]);

    return (
        <>
            <Navbar />
            <Box sx={{ mt: 10, width: '80vw', mr: '10vw', ml: '10vw' }}>
                <Typography align="left" sx={{ mb: 1, fontFamily: 'Poppins', fontWeight: '700', fontSize: '40px' }}>
                    Hotel Results in {name}:
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {loading ? (
                        <CircularProgress />
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