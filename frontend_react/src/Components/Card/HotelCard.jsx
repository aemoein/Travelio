import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const customMarkerIcon = L.divIcon({
    html: '<div><svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C5.59678 0 0 5.59678 0 12.5C0 18.5941 3.71992 25.3982 9.05714 33.1947C10.4573 34.961 12.1152 36.9579 12.5 37.4991C12.8848 36.9579 14.5427 34.961 15.9429 33.1947C21.2801 25.3982 25 18.5941 25 12.5C25 5.59678 19.4032 0 12.5 0ZM12.5 18C10.0147 18 8 15.9853 8 13.5C8 11.0147 10.0147 9 12.5 9C14.9853 9 17 11.0147 17 13.5C17 15.9853 14.9853 18 12.5 18Z" fill="#1976D2"/></svg></div>',
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const HotelCard = ({ hotel, tripId, cityName, arrivalDate, departureDate, adults }) => {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchAddress = async () => {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${hotel.latitude}&lon=${hotel.longitude}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data && data.address) {
                    setAddress(data.display_name);
                }
            } catch (error) {
                console.error('Error fetching address:', error);
            }
        };

        fetchAddress();
    }, [hotel.latitude, hotel.longitude]);

    const handleBookHotel = async () => {
        const token = localStorage.getItem('token');
        const url = 'http://localhost:7777/trip/hotels';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    hotel,
                    tripId
                })
            });

            if (response.ok) {
                console.log('Hotel booked successfully!');
                alert('Hotel booked successfully!');
                
                // Redirect to itinerary planning page and pass data
                navigate('/planning/itinerary', {
                    state: {
                        bookedHotel: {
                            name: hotel.name,
                            cityName,
                            arrivalDate,
                            departureDate,
                            adults
                        },
                        tripId: tripId
                    }
                });
            } else {
                throw new Error('Failed to book hotel');
            }
        } catch (error) {
            console.error('Error booking hotel:', error);
            alert('Failed to book hotel');
        }
    };

    const latitude = parseFloat(hotel.latitude);
    const longitude = parseFloat(hotel.longitude);

    return (
        <>
            <Card sx={{ minWidth: 275, mb: 2, pl: 3, pr: 3, border: '1px solid #ccc', borderRadius: '10px' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px' }}>
                        {hotel.name}
                    </Typography>
                    <Grid container alignItems="center" sx={{ mt: 2 }}>
                        <Grid item xs={1}>
                            <LocationOnIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                                {address || 'Address Not Found'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ height: '300px', mt: 2 }}>
                        <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
                                <Popup>{hotel.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px' }}>
                            {`Price: ${hotel.offers[0]?.price.base || 'N/A'} ${hotel.offers[0]?.price.currency || ''}`}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={{ mt: 0 }}>
                            More Info
                        </Button>
                    </Box>
                    <Button variant="contained" onClick={handleBookHotel} sx={{ mt: 2, width: '100%', fontFamily: 'Poppins', fontWeight: '700', fontSize:'25px', borderRadius: '20px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}>
                        Book
                    </Button>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2">
                        Hotel Details
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {`Room Type: ${hotel.offers[0]?.roomType || 'N/A'}`}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        {`Description: ${hotel.offers[0]?.description || 'N/A'}`}
                    </Typography>
                    <Button onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default HotelCard;