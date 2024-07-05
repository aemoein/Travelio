import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const customMarkerIcon = L.divIcon({
    html: '<div><svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C5.59678 0 0 5.59678 0 12.5C0 18.5941 3.71992 25.3982 9.05714 33.1947C10.4573 34.961 12.1152 36.9579 12.5 37.4991C12.8848 36.9579 14.5427 34.961 15.9429 33.1947C21.2801 25.3982 25 18.5941 25 12.5C25 5.59678 19.4032 0 12.5 0ZM12.5 18C10.0147 18 8 15.9853 8 13.5C8 11.0147 10.0147 9 12.5 9C14.9853 9 17 11.0147 17 13.5C17 15.9853 14.9853 18 12.5 18Z" fill="#1976D2"/></svg></div>',
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const Itinerary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);
    const fetchCalledRef = useRef(false);

    useEffect(() => {
        const fetchItinerary = async () => {
            const token = localStorage.getItem('token');
            const url = 'http://localhost:3003/api/itineraries';

            try {
                const response = await fetch('http://localhost:3001/profile/preferences', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    
                    // Fetch itinerary only if location state is available
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

    useEffect(() => {
        if (itinerary.length > 0 && mapRef.current && mapRef.current.leafletElement) {
            const bounds = L.latLngBounds(
                itinerary.flatMap(day => day.activities.map(activity => [activity.latitude, activity.longitude]))
            );
            mapRef.current.leafletElement.fitBounds(bounds);
        }
    }, [itinerary]);

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        const tripId = location.state.tripId; // Assuming tripId is stored in location.state
        const url = 'http://localhost:3003/api/itineraries/save';

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

            if (response.ok) {
                console.log('Itinerary saved successfully');
                navigate('/planning/review', { state: { tripId } }); // Redirect to review page with tripId in state
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
                                Day {index + 1}
                            </Typography>
                            <Grid container spacing={3}>
                                {day.activities.map((activity, idx) => (
                                    <Grid item key={idx} xs={12} sm={12} md={12} lg= {6}>
                                        <Box sx={{ border: '1px solid #ccc', borderRadius: '10px', p: 2 }}>
                                            <Typography sx={{ fontFamily: 'Poppins',  fontWeight: '700', fontSize: '30px'  }}>
                                                {activity.name}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontFamily: 'Poppins',  fontWeight: '400', fontSize: '20px' }}>
                                                {activity.type ? activity.type.charAt(0).toUpperCase() + activity.type.slice(1) : 'Type'}
                                            </Typography>
                                            <Box sx={{ height: '300px', mt: 2 }}>
                                                <MapContainer center={[parseFloat(activity.latitude), parseFloat(activity.longitude)]} zoom={13} style={{ width: '100%', height: '100%' }} ref={mapRef}>
                                                    <TileLayer
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <Marker position={[parseFloat(activity.latitude), parseFloat(activity.longitude)]} icon={customMarkerIcon}>
                                                        <Popup>{activity.name}</Popup>
                                                    </Marker>
                                                </MapContainer>
                                            </Box>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                {activity.details}
                                            </Typography>
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                Time: {activity.time}
                                            </Typography>
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