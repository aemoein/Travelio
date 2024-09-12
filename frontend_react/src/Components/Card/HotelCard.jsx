import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, Modal, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../../Config/config';

const customMarkerIcon = L.divIcon({
    html: '<div><svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C5.59678 0 0 5.59678 0 12.5C0 18.5941 3.71992 25.3982 9.05714 33.1947C10.4573 34.961 12.1152 36.9579 12.5 37.4991C12.8848 36.9579 14.5427 34.961 15.9429 33.1947C21.2801 25.3982 25 18.5941 25 12.5C25 5.59678 19.4032 0 12.5 0ZM12.5 18C10.0147 18 8 15.9853 8 13.5C8 11.0147 10.0147 9 12.5 9C14.9853 9 17 11.0147 17 13.5C17 15.9853 14.9853 18 12.5 18Z" fill="#1976D2"/></svg></div>',
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const HotelCard = React.memo(({ hotel, tripId, cityName, arrivalDate, departureDate, adults }) => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [convertedPrice, setConvertedPrice] = useState(null);
    const navigate = useNavigate();

    // Fetch address data only when hotel latitude or longitude changes
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${hotel.latitude}&lon=${hotel.longitude}`);
                const data = await response.json();
                if (data?.address) {
                    setAddress(data.display_name);
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        fetchAddress();
    }, [hotel.latitude, hotel.longitude]);

    // Convert currency based on hotel offer
    useEffect(() => {
        const convertCurrency = async () => {
            const currency = hotel.offers[0]?.price.currency;
            const price = hotel.offers[0]?.price.base;

            if (currency && currency !== 'USD' && price) {
                try {
                    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
                    const rate = response.data.rates.USD;
                    setConvertedPrice((price * rate).toFixed(2));
                } catch (error) {
                    console.error('Error converting currency:', error);
                }
            } else if (currency === 'USD') {
                setConvertedPrice(price);
            }
        };

        convertCurrency();
    }, [hotel.offers]);

    // Use useCallback to memoize event handlers
    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const handleBookHotel = useCallback(async () => {
        const token = localStorage.getItem('token');
        const url = `${apiUrl}/trip/hotels`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    hotel: {
                        ...hotel,
                        offers: [
                            {
                                ...hotel.offers[0],
                                price: {
                                    ...hotel.offers[0].price,
                                    base: convertedPrice,
                                    currency: 'USD'
                                }
                            }
                        ]
                    },
                    tripId
                })
            });

            if (response.ok) {
                alert('Hotel booked successfully!');
                navigate('/planning/itinerary', {
                    state: {
                        bookedHotel: {
                            name: hotel.name,
                            cityName,
                            arrivalDate,
                            departureDate,
                            adults,
                            price: convertedPrice
                        },
                        tripId
                    }
                });
            } else {
                throw new Error('Failed to book hotel');
            }
        } catch (error) {
            console.error('Error booking hotel:', error);
            alert('Failed to book hotel');
        }
    }, [hotel, convertedPrice, tripId, navigate]);

    const latitude = parseFloat(hotel.latitude);
    const longitude = parseFloat(hotel.longitude);

    return (
        <>
            <Card sx={cardStyles}>
                <CardContent>
                    <Typography variant="h5" sx={titleStyles}>
                        {hotel.name}
                    </Typography>
                    <Grid container alignItems="center" sx={locationContainerStyles}>
                        <Grid item xs={1}>
                            <LocationOnIcon sx={iconStyles} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={addressStyles}>
                                {address || 'Address Not Found'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={mapContainerStyles}>
                        <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
                                <Popup>{hotel.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                    <Box sx={actionsContainerStyles}>
                        <Typography variant="body2" sx={priceStyles}>
                            {convertedPrice ? `$${convertedPrice} USD` : `${hotel.offers[0]?.price.base || 'N/A'} ${hotel.offers[0]?.price.currency || ''}`}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={infoButtonStyles}>
                            More Info
                        </Button>
                    </Box>
                    <Button variant="contained" onClick={handleBookHotel} sx={bookButtonStyles}>
                        Book
                    </Button>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyles}>
                    <Typography variant="h6" component="h2">
                        Hotel Details
                    </Typography>
                    <Typography sx={modalTextStyles}>
                        {`Room Type: ${hotel.offers[0]?.roomType || 'N/A'}`}
                    </Typography>
                    <Typography sx={modalTextStyles}>
                        {`Description: ${hotel.offers[0]?.description || 'N/A'}`}
                    </Typography>
                    <Button onClick={handleClose} sx={modalCloseButtonStyles}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
});

const cardStyles = {
    minWidth: 275,
    mb: 2,
    px: 1,
    border: '1px solid #ccc',
    borderRadius: '10px',
};

const titleStyles = {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '28px' },
};

const locationContainerStyles = {
    mt: 2,
};

const iconStyles = {
    ml: -0.5,
};

const addressStyles = {
    fontFamily: 'Poppins',
    fontWeight: '500',
    fontSize: { xs: '10px', sm: '14px', md: '16px', lg: '14px' },
};

const mapContainerStyles = {
    height: '300px',
    mt: 2,
};

const actionsContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    mt: 2,
};

const priceStyles = {
    mt: 0.5,
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: { xs: '22px', sm: '26px', md: '30px', lg: '26px' },
};

const infoButtonStyles = {
    mt: 0,
    borderRadius: 5,
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: { xs: '12px', sm: '16px', md: '20px', lg: '16px' },
};

const bookButtonStyles = {
    mt: 2,
    width: '100%',
    fontFamily: 'Poppins',
    fontWeight: '900',
    fontSize: { xs: '18px', sm: '22px', md: '26px', lg: '22px' },
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
};

const modalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const modalTextStyles = {
    mt: 2,
};

const modalCloseButtonStyles = {
    mt: 2,
};

export default HotelCard;