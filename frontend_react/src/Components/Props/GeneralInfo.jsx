import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const GeneralInfo = ({ language, currency }) => {
  return (
    <Box sx={{width: '33%', maxWidth: '33%' ,textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'}}>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '2.4vw', fontWeight: 700 }}>Local Language</Typography>
      <Typography sx={{ marginBottom: '10px', fontFamily: "Poppins", fontSize: '2.5vw', fontWeight: 400 }}>{language}</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '2.5vw', fontWeight: 700 }}>Local Currency</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '2.5vw', fontWeight: 400 }}>{currency}</Typography>
    </Box>
  );
};

export default GeneralInfo;