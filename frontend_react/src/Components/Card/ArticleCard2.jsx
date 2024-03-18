import React from 'react';
import { Box, Typography } from '@mui/material';

const ArticleCard = ({ imageUrl, category, title, date, summary, width }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: width ? width : '27vw',
        height: '27vw',
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
        <Typography
          sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: '1.4vw',
          }}>
          {category}
        </Typography>
        <Typography sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: '2.2vw',
          }}>
          {title}
        </Typography>
        <Typography  sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '900',
            width: 'fit-content',
            fontSize: '1.2vw',
          }}>
          {date}
        </Typography>
        <Typography sx={{ 
            fontFamily: 'Poppins',
            fontWeight: '400',
            width: 'fit-content',
            fontSize: '1.2vw',
          }}>
          {summary}
        </Typography>
      </Box>
    </Box>
  );
};

export default ArticleCard;