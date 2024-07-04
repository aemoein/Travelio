import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HotelIcon from '@mui/icons-material/Hotel';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { format } from 'date-fns';
import { getCityNameByCode } from '../Data/airports.json';

const HotelCard = ({ hotel }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const cityName = getCityNameByCode(hotel.cityCode);

    return (
        <>
            <Card sx={{ minWidth: 275, mb: 2, pl: 3, pr: 3 }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '3vw' }}>
                        {hotel.name}
                    </Typography>
                    <Grid container alignItems="center" sx={{ mt: 2 }}>
                        <Grid item xs={1}>
                            <LocationOnIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                                {cityName || 'City Name Not Found'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" sx={{ mt: 1 }}>
                        <Grid item xs={1}>
                            <HotelIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                                {`${hotel.latitude}, ${hotel.longitude}`}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '3vw' }}>
                            {`Price: ${hotel.offers[0]?.price.base || 'N/A'} ${hotel.offers[0]?.price.currency || ''}`}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={{ mt: 2 }}>
                            More Info
                        </Button>
                    </Box>
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
