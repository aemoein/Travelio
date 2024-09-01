import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const GeneralInfo = ({ language, currency, region }) => {
  return (
    <Box sx={{height: { xs: '150px', sm: '150px', md: '150px', lg: '150px' }, textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <Typography sx={{ mt: 1, fontFamily: "Poppins", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, fontWeight: 700 }}>Local Language</Typography>
      <Typography sx={{ marginBottom: '10px', fontFamily: "Poppins", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, fontWeight: 400 }}>{language}</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, fontWeight: 700 }}>Local Currency</Typography>
      <Typography sx={{  marginBottom: '10px', fontFamily: "Poppins", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, fontWeight: 400 }}>{currency}</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, fontWeight: 700 }}>Local Region</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, fontWeight: 400 }}>{region}</Typography>
    </Box>
  );
};

export default GeneralInfo;