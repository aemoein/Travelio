import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Paper
} from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import Clock from '../../Components/Props/Clock';
import Weather from '../../Components/Props/Weather';
import FactText from '../../Components/Text/FactText';
import GeneralInfo from '../../Components/Props/GeneralInfo';
import ItemCard from '../../Components/Card/ItemCard';
import Footer from '../../Components/Footer/Footer';
import Gallery from '../../Components/Gallery/Gallery';
import apiUrl from '../../Config/config';

const City = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(`${apiUrl}/destinations/city/cities/${id}`);
        // Format population number
        const formattedPopulation = response.data.population.toLocaleString();
        // Update city object with formatted population
        const updatedCity = {
          ...response.data,
          population: formattedPopulation
        };
        setCity(updatedCity);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
  
    fetchCity();
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return city && <CityPage city={city} />;
};

const CityPage = ({ city }) => {
    return (
      <>
        <Navbar/>
        <Box sx={{ height: '64px' }} />
            <Box
                sx={{
                    backgroundImage: `url(${city.hero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 'calc(100vh - 64px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    color: 'white',
                }}
            />
            <Box maxWidth="100vw" sx={{pl: "10vw", pr: "10vw"}}>
                <Box>
                    <Typography sx={{fontFamily: "Poppins", fontWeight: "700", fontSize: { xs: '32px', sm: '38px', md: '42px', lg: '48px' }, lineHeight: '1.0', mt: 2}}>
                        {city.name}
                    </Typography>
                    <Typography gutterBottom sx={{fontFamily: "Poppins", fontWeight: "700", fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '28px' }, lineHeight: '1.0'}}>
                        {city.region}, {city.country}
                    </Typography>
                    <Typography paragraph mt={2} sx={{fontFamily: "Poppins", fontWeight: "400", fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' }, }}>
                        {city.description}
                    </Typography>
                </Box>
                <Box sx={{padding: 2, border: 'solid 2px #333333', borderRadius: '10px' }}>
                    <FactText city={city.name} population={city.population} />
                </Box>
                <Box mt={4}>
                    <Grid container spacing={1}>
                        {/* Clock Component */}
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                            <Clock city={city.name} country={city.country} />
                        </Grid>

                        {/* GeneralInfo Component */}
                        <Grid item xs={6} sm={6} md={6} lg={4}>
                        <GeneralInfo language={city.language} currency={city.currency} region={city.region}/>
                        </Grid>

                        {/* Weather Component */}
                        <Grid item xs={12} sm={12} md={12} lg={4}>
                        <Weather cityName={city.name} />
                        </Grid>
                    </Grid>
                </Box>

    
                <Box sx={{maxWidth: '82vw', mt: 4}}>
                    <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },}}>
                        Famous Foods
                    </Typography>
                    <Grid container spacing={1} sx={{maxWidth: '82vw'}}>
                        {city.foods.map((food) => (
                            <Grid item key={food._id} xs={6} sm={6} md={4} lg={4}>
                                    <ItemCard
                                        imageUrl={food.picture}
                                        title={food.name}
                                        description={food.description}
                                        link={food.link}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{maxWidth: '82vw', mt: 4}}>
                    <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },}}>
                        Top Restaurants
                    </Typography>
                    <Grid container spacing={1} sx={{maxWidth: '82vw'}}>
                        {city.restaurants.map((restaurant) => (
                            <Grid item key={restaurant._id} xs={6} sm={6} md={4} lg={4}>
                                <ItemCard
                                    imageUrl={restaurant.picture}
                                    title={restaurant.name}
                                    description={restaurant.description}
                                    link={restaurant.link}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{maxWidth: '82vw', mt: 4}}>
                    <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },}}>
                        Best Hotels
                    </Typography>
                    <Grid container spacing={1} sx={{maxWidth: '82vw'}}>
                        {city.hotels.map((hotel) => (
                            <Grid item key={hotel._id} xs={6} sm={6} md={4} lg={4}>
                                <ItemCard
                                    imageUrl={hotel.picture}
                                    title={hotel.name}
                                    description={hotel.description}
                                    link={hotel.link}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{maxWidth: '82vw', mt: 4}}>
                    <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },}}>
                        Transportation
                    </Typography>
                    <Grid container spacing={1} sx={{maxWidth: '82vw'}}>
                        {city.transportation.map((transport) => (
                            <Grid item key={transport._id} xs={6} sm={6} md={4} lg={4}>
                                    <ItemCard
                                        imageUrl={transport.picture}
                                        title={transport.name}
                                        description={transport.description}
                                        link={transport.link}
                                    />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
    
                <Box sx={{mt: 4, mb: 4}}>
                    <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px' },}}>
                        Gallery
                    </Typography>
                    <Gallery images={city.gallery} />
                </Box>
            </Box>
            <Footer/>
        </>
    );
  };

export default City;