import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const tripId = queryParams.get('tripId');
    const destination = queryParams.get('destination');
    const totalPrice = queryParams.get('totalPrice');
    const userId = queryParams.get('userId');

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Payment Successful!
            </Typography>
            <Typography variant="body1">
                Trip ID: {tripId}
            </Typography>
            <Typography variant="body1">
                Destination: {destination}
            </Typography>
            <Typography variant="body1">
                Total Price: ${totalPrice}
            </Typography>
            <Typography variant="body1">
                User ID: {userId}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleHomeClick} sx={{ mt: 3 }}>
                Go to Home
            </Button>
        </Box>
    );
};

export default SuccessPage;