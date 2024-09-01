import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; // Replace with your routing library if using something else

const ItemCard = ({ imageUrl, title, description, link}) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Box
        component="div"
        sx={{
          position: 'relative',
          height: { xs: '200px', sm: '200px', md: '300px', lg: '350px' },
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            padding: '10px',
            color: '#fff',
            width: '100%',
            borderRadius: '0 0 10px 10px',
          }}
        >
          <Typography sx={{ 
              fontFamily: 'Poppins',
              fontWeight: '900',
              width: 'fit-content',
              fontSize: { xs: '18px', sm: '18px', md: '24px', lg: '32px' },
              maxWidth: '90%',
              lineHeight: '1.0',
            }}>
            {title}
          </Typography>
          <Typography sx={{ 
              fontFamily: 'Poppins',
              fontWeight: '400',
              width: 'fit-content',
              fontSize: { xs: '12px', sm: '14px', md: '18px', lg: '21px' },
              lineHeight: '1.0',
              maxWidth: '90%'
            }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ItemCard;