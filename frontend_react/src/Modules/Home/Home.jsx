import React from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Container, CssBaseline, Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Hero from '../../Components/Hero/Hero';

const Home = () => {
  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');`}
      </style>

      <Box sx={{ backgroundColor: '#EEEEEE' }}>
        <Navbar sx={{ position: 'fixed', width: '100%', zIndex: 1000 }} />
        <Box sx={{ height: '64px' }} />
        <Hero />
        <div style={{ marginTop: '20px', padding: '20px' }}>
          <Typography sx={{ color: '#222831', fontSize: '32px', fontFamily: 'Roboto Condensed, sans-serif', fontWeight: '900' }}>Welcome to the Home Page</Typography>
        </div>
        <Footer />
      </Box>
    </>
  );
};

export default Home;