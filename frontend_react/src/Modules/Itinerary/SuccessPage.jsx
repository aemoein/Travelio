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
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            textAlign: 'center', 
            p: 2,
            backgroundColor: '#f0f4f8' 
        }}>
            <Typography 
                variant="h4" 
                sx={{ 
                    mb: 3, 
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },
                    color: '#1976D2'
                }}
            >
                Payment Successful!
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 1, 
                    fontFamily: 'Poppins', 
                    fontWeight: '500', 
                    fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                    color: '#333'
                }}
            >
                <strong>Trip ID:</strong> {tripId}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 1, 
                    fontFamily: 'Poppins', 
                    fontWeight: '500', 
                    fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                    color: '#333'
                }}
            >
                <strong>Destination:</strong> {destination}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{ 
                    mb: 1, 
                    fontFamily: 'Poppins', 
                    fontWeight: '500', 
                    fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                    color: '#333'
                }}
            >
                <strong>Total Price:</strong> ${totalPrice}
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleHomeClick} 
                sx={{ 
                    mt: 2, 
                    fontFamily: 'Poppins', 
                    fontWeight: '700', 
                    fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '24px' },
                    borderRadius: '15px',
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    padding: '10px 20px'
                }}
            >
                Go to Home
            </Button>
        </Box>
    );
};

export default SuccessPage;