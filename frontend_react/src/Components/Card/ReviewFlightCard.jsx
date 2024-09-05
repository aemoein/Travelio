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

    return (
        <>
            <Card sx={{ minWidth: 275, mb: 2, px: 0.5, border: '1px solid #ccc', borderRadius: '10px' }}>
                <CardContent>
                    {flight.itineraries?.length > 0 ? (
                        flight.itineraries.map((itinerary, idx) => (
                            <div key={idx}>
                                {idx === 0 ? (
                                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '28px' }, }}>
                                        Departure
                                    </Typography>
                                ) : (
                                    <Typography sx={{ mt: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '28px' }, }}>
                                        Return
                                    </Typography>
                                )}

                                {itinerary.segments?.length > 0 ? (
                                    itinerary.segments.map((segment, index) => (
                                        <Grid container alignItems="center" key={index} sx={{ mb: 1 }}>
                                            <Typography component="div" sx={{ fontFamily: 'Poppins', width: '100%', fontWeight: '500'}}>
                                                {`Airline Carrier: ${segment.carrier?.name || 'N/A'}`}
                                            </Typography>
                                            <Grid item xs={5}>
                                                <Typography sx={{ textAlign: 'center' , fontFamily: 'Poppins', fontWeight: '900', fontSize: { xs: '18px', sm: '18px', md: '20px', lg: '22px' } }}>
                                                    {`${segment.departure.airportCode}`}
                                                </Typography>
                                                <Typography sx={{ textAlign: 'center' , fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '18px', sm: '18px', md: '20px', lg: '22px' } }}>
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
                                                <Typography sx={{ textAlign: 'center' , fontFamily: 'Poppins', fontWeight: '900', fontSize: { xs: '18px', sm: '18px', md: '20px', lg: '22px' } }}>
                                                    {`${segment.arrival.airportCode}`}
                                                </Typography>
                                                <Typography sx={{ textAlign: 'center' , fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '18px', sm: '18px', md: '20px', lg: '22px' } }}>
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body2" sx={{ mt: 2, fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '22px', sm: '26px', md: '32px', lg: '26px' } }}>
                            {`${flight.price?.total || 'N/A'} ${flight.price?.currency || ''}`}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={{ mt: 0, borderRadius: 5, fontFamily: 'Poppins', fontWeight: '900', fontSize: { xs: '12px', sm: '16px', md: '20px', lg: '16px' } }}>
                            More Info
                        </Button>
                    </Box>
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