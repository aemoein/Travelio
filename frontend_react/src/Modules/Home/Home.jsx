import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Typography, Container, CssBaseline, Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Hero from '../../Components/Hero/Hero';
import DesView from '../../Components/Card/DesView';
import ArticleView from '../../Components/Card/ArticleView';
import ArticleView2 from '../../Components/Card/ArticleView2';
import ArticleCard from '../../Components/Card/ArticleCard';
import ArticleCard2 from '../../Components/Card/ArticleCard2';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const checkLoggedIn = async () => {
        try {
            const response = await axios.get('http://localhost:3001/profile/checkLoggedIn', { withCredentials: true });
    
            if (response.status === 200) {
                const data = response.data;
                setIsLoggedIn(true);
                setUserData(data);
                console.log('user is logged in');
            }
        } catch (error) {
          console.error('Error checking if user is logged in:', error);
        }
    };
  
    useEffect(() => {
      checkLoggedIn();
    }, []);
  
  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');`}
      </style>

      <Box sx={{ backgroundColor: '#EEEEEE' }}>
        <Navbar isLoggedIn={isLoggedIn} sx={{ position: 'fixed', width: '100%', zIndex: 1000 }} />
        <Box sx={{ height: '64px' }} />
        <Hero />
        <DesView
            destinations={[
                { country: 'China', city: 'Shanghai', imageUrl: 'https://media4.giphy.com/media/M49pHLnIqvA08/giphy.webp?cid=790b76115in3e50a4gzo76jvy780mmd8devaeujz0ibfg7qc&ep=v1_gifs_search&rid=giphy.webp&ct=g' },
                { country: 'United States', city: 'New York', imageUrl: 'https://media1.giphy.com/media/8uiZLn37DZIXu/giphy.webp?cid=ecf05e47j0rd48c2wb65h60wv384djo2fayagtqz13axtybe&ep=v1_gifs_search&rid=giphy.webp&ct=g' },
                { country: 'Spain', city: 'Barcelona', imageUrl: 'https://media4.giphy.com/media/SRko8MpQH2vEZhyyVy/giphy.gif' },
            ]}
        />

        <Box
            sx={{
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%), url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXI5YnZoaGMxNzY3YjBqc20ybXd1MDUxZXlmZDAxcWpueWo2bXlqNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eMyLvZy70jv7IXBEz0/giphy.gif)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '900px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            >
            <Typography align="center"
                sx={{
                    fontFamily: 'Poppins',
                    fontWeight: '900',
                    fontSize: '5vw',
                    color: '#fff',
                    maxWidth: '70vw'
                }}
            >
                Discover a different perspective. Broaden your horizons.
            </Typography>
        </Box>

        <Box sx={{marginBottom: '30px'}}>
            <ArticleView
                articles = {[
                    {
                    imageUrl: 'https://media.cntravellerme.com/photos/64ddf530ded00705684b116b/1:1/w_3840,h_3840,c_limit/Seine%20paris%20bike-GettyImages-1161606501.jpeg',
                    category: 'Destination Guide',
                    title: 'Unveiling the Charms of the City of Light: A Guide to Paris',
                    date: 'March 16, 2024',
                    summary: 'Discover the rich history, iconic landmarks, and vibrant culture of the City of Light.'
                    },
                    {
                    imageUrl: 'https://worldlyadventurer.com/wp-content/uploads/2019/10/Peru_Hiking_Inca_Trail_Machu_Picchu.jpg',
                    category: 'Adventure Travel',
                    title: 'Trekking the Inca Trail: A Journey to Machu Picchu',
                    date: 'March 15, 2024',
                    summary: 'Embark on an unforgettable trek through the Andes Mountains to reach the ancient Incan citadel.'
                    },
                    {
                    imageUrl: 'https://media.tacdn.com/media/attractions-content--1x-1/10/29/d5/01.jpg',
                    category: 'Cultural Experiences',
                    title: 'Immersing Yourself in Japanese Tradition: A Guide to Kyoto',
                    date: 'March 13, 2024',
                    summary: 'Experience the beauty and tranquility of Kyoto as you explore its historic temples, traditional tea houses, and stunning gardens.'
                    }
                ]}          
            />

            <Box sx={{ marginLeft: '7.5vw', paddingRight: '1.2vw', paddingLeft: '1.2vw', marginBottom: '0px',}}>
                <ArticleCard2
                    imageUrl="https://media.cntraveller.com/photos/61b084327af7f164454ceb14/3:2/w_2700,h_1800,c_limit/where%20to%20go%20in%20jan.jpg"
                    category="Travel Guide"
                    title="Top 10 Destinations in 2024"
                    date="March 17, 2024"
                    summary="Explore the top travel destinations to visit in 2024, from exotic beaches to bustling cities, and start planning your next adventure!"
                    width="83vw"
                />
            </Box>

            <ArticleView2
                articles={[
                    {
                    imageUrl: 'https://images.squarespace-cdn.com/content/v1/62b16ffb12207f187a6cd209/ca013f3e-f958-494d-9946-28bbfec3c1c2/playa-northcoast-beach.jpg?format=2500w',
                    category: 'Beach Getaways',
                    title: 'Sun, Sand, and Serenity: The Best Beach Destinations',
                    date: 'March 20, 2024',
                    summary: 'Escape to paradise with our guide to the top beach destinations around the world, from tropical islands to secluded shores.'
                    },
                    {
                    imageUrl: 'https://www1.cuny.edu/mu/cunyverse/files/2022/05/37.png',
                    category: 'City Escapes',
                    title: 'Urban Adventures: Exploring the Heart of New York City',
                    date: 'March 19, 2024',
                    summary: 'Discover the vibrant energy, iconic landmarks, and diverse culture of the Big Apple on your next city escape.'
                    },
                    {
                    imageUrl: 'https://www.kuoni.co.uk/alfredand/wp-content/uploads/2023/01/iStock-1371289822.jpg',
                    category: 'Mountain Retreats',
                    title: 'Finding Peace in the Mountains: A Guide to Himalayan Treks',
                    date: 'March 18, 2024',
                    summary: 'Embark on a journey to the majestic Himalayas and experience breathtaking landscapes, ancient monasteries, and serene mountain villages.'
                    }
                ]}
            />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Home;