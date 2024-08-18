import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Modal, Box } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { format } from 'date-fns';

const FlightCard = ({ flight, cityName, arrivalDate, departureDate, adults }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const formatTime = (dateTime) => format(new Date(dateTime), 'hh:mm a');

    const handleBookFlight = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await fetch('https://travelio-production.up.railway.app/trip/flights', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(flight), 
                withCredentials: true
            });

            if (!response.ok) {
                throw new Error('Failed to book flight');
            }

            const data = await response.json();
            console.log('Booking successful. Trip ID:', data.tripId);
            alert('Booking successful');

            navigate(`/planning/hotels?cityName=${cityName}&trip=${data.tripId}&arrivalDate=${arrivalDate}&departureDate=${departureDate}&adults=${adults}`);
        } catch (error) {
            console.error('Error booking flight:', error.message);
        }
    };

    return (
        <>
            <Card sx={{ minWidth: 275, mb: 2, pl: 3, pr: 3, border: '1px solid #ccc', borderRadius: '10px' }}>
                <CardContent>
                    {flight.itineraries?.length > 0 ? (
                        flight.itineraries.map((itinerary, idx) => (
                            <div key={idx}>
                                {idx === 0 ? (
                                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '35px' }}>
                                        Departure
                                    </Typography>
                                ) : (
                                    <Typography sx={{ mt: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '35px' }}>
                                        Return
                                    </Typography>
                                )}

                                {itinerary.segments?.length > 0 ? (
                                    itinerary.segments.map((segment, index) => (
                                        <Grid container alignItems="center" key={index} sx={{ mb: 1 }}>
                                            <Typography component="div" sx={{ fontFamily: 'Poppins', width: '100%', fontWeight: '500' }}>
                                                {`Airline Carrier: ${segment.carrier?.name || 'N/A'}`}
                                            </Typography>
                                            <Grid item xs={5}>
                                                <Typography sx={{ textAlign: 'center' }}>
                                                    {`${segment.departure.airportCode}`}
                                                </Typography>
                                                <Typography sx={{ textAlign: 'center' }}>
                                                    {`${formatTime(segment.departure.time)}`}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                                    {`Terminal: ${segment.departure.terminal || 'N/A'}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                                <FlightIcon />
                                                <ArrowForwardIcon />
                                            </Grid>
                                            <Grid item xs={5}>
                                                <Typography sx={{ textAlign: 'center' }}>
                                                    {`${segment.arrival.airportCode}`}
                                                </Typography>
                                                <Typography sx={{ textAlign: 'center' }}>
                                                    {`${formatTime(segment.arrival.time)}`}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                                                    {`Terminal: ${segment.arrival.terminal || 'N/A'}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography>No segments available</Typography>
                                )}
                            </div>
                        ))
                    ) : (
                        <Typography>No itineraries available</Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' , pl: 0, pr: 2}}>
                        <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px' }}>
                            {`Price: ${flight.price?.total || 'N/A'} ${flight.price?.currency || ''}`}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={{ mt: 2 }}>
                            More Info
                        </Button>
                    </Box>
                    <Button variant="contained" onClick={handleBookFlight} sx={{ mt: 2, width: '100%', fontFamily: 'Poppins', fontWeight: '700', fontSize:'25px', borderRadius: '20px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)'}}>
                        Book
                    </Button>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography variant="h6" component="h2">
                        Flight Details
                    </Typography>
                    {flight.itineraries?.length > 0 && flight.itineraries[0].segments?.length > 0 && (
                        <Typography sx={{ mt: 2 }}>
                            {`Booking Class: ${flight.itineraries[0].segments[0].travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.cabin || 'N/A'}`}
                        </Typography>
                    )}
                    {flight.itineraries?.length > 0 && flight.itineraries[0].segments?.length > 0 && (
                        <Typography sx={{ mt: 2 }}>
                            {`Baggage Allowance: ${flight.itineraries[0].segments[0].travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.includedCheckedBags?.quantity || 0} piece(s)`}
                        </Typography>
                    )}
                    {flight.itineraries?.length > 0 && flight.itineraries[0].segments?.length > 0 && (
                        <Typography sx={{ mt: 2 }}>
                            {`Amenities: ${flight.itineraries[0].segments[0].travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.amenities?.map(amenity => amenity.description).join(', ') || 'N/A'}`}
                        </Typography>
                    )}
                    <Button onClick={handleClose} sx={{ mt: 2 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default FlightCard;