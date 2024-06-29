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
import ItemCardLg from '../../Components/Card/ItemsCardLg';
import Footer from '../../Components/Footer/Footer';
import Gallery from '../../Components/Gallery/Gallery';

const City = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/city/cities/${id}`);
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
                <Typography sx={{fontFamily: "Poppins", fontWeight: "700", fontSize: '7vw',lineHeight: '1.0', mt: 2,}}>
                    {city.name}
                </Typography>
                <Typography gutterBottom sx={{fontFamily: "Poppins", fontWeight: "700", fontSize: '3vw', lineHeight: '1.0'}}>
                    {city.region}, {city.country}
                </Typography>
                <Typography paragraph mt={2} sx={{fontFamily: "Poppins", fontWeight: "400", fontSize: '2vw' }}>
                    {city.description}
                </Typography>
            </Box>
            <Box sx={{padding: 2, border: 'solid 2px #333333', borderRadius: '10px' }}>
                <FactText city={city.name} population={city.population} />
            </Box>
            <Box mt={4} sx={{ display: 'flex'}}>
                <Clock city={city.name} country={city.country}/>
                <Weather cityName={city.name}/>
                <GeneralInfo language={city.language} currency={city.currency}/>
            </Box>
  
            <Box sx={{maxWidth: '82vw', mt: 4}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: '4vw'}}>
                    Famous Foods
                </Typography>
                <Grid container spacing={4} sx={{maxWidth: '82vw'}}>
                    {city.foods.map((food) => (
                        <Grid item key={food._id} xs={12} sm={6} md={4} lg={3}>
                            {window.innerWidth >= 1280 ? ( 
                                <ItemCardLg
                                    imageUrl={food.picture}
                                    title={food.name}
                                    description={food.description}
                                    link={food.link}
                                />  
                            ):(
                                <ItemCard
                                    imageUrl={food.picture}
                                    title={food.name}
                                    description={food.description}
                                    link={food.link}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{maxWidth: '82vw', mt: 4}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: '4vw'}}>
                    Top Restaurants
                </Typography>
                <Grid container spacing={4} sx={{maxWidth: '82vw'}}>
                    {city.restaurants.map((restaurant) => (
                        <Grid item key={restaurant._id} xs={12} sm={6} md={4} lg={3}>
                            {window.innerWidth >= 1280 ? ( 
                                <ItemCardLg
                                    imageUrl={restaurant.picture}
                                    title={restaurant.name}
                                    description={restaurant.description}
                                    link={restaurant.link}
                                />  
                            ):(
                                <ItemCard
                                    imageUrl={restaurant.picture}
                                    title={restaurant.name}
                                    description={restaurant.description}
                                    link={restaurant.link}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{maxWidth: '82vw', mt: 4}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: '4vw'}}>
                    Best Hotels
                </Typography>
                <Grid container spacing={4} sx={{maxWidth: '82vw'}}>
                    {city.hotels.map((hotel) => (
                        <Grid item key={hotel._id} xs={12} sm={6} md={4} lg={3}>
                            {window.innerWidth >= 1280 ? ( 
                                <ItemCardLg
                                    imageUrl={hotel.picture}
                                    title={hotel.name}
                                    description={hotel.description}
                                    link={hotel.link}
                                />  
                            ):(
                                <ItemCard
                                    imageUrl={hotel.picture}
                                    title={hotel.name}
                                    description={hotel.description}
                                    link={hotel.link}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{maxWidth: '82vw', mt: 4}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: '4vw'}}>
                    Transportation
                </Typography>
                <Grid container spacing={4} sx={{maxWidth: '82vw'}}>
                    {city.transportation.map((transport) => (
                        <Grid item key={transport._id} xs={12} sm={6} md={4} lg={3}>
                            {window.innerWidth >= 1280 ? ( 
                                <ItemCardLg
                                    imageUrl={transport.picture}
                                    title={transport.name}
                                    description={transport.description}
                                    link={transport.link}
                                />  
                            ):(
                                <ItemCard
                                    imageUrl={transport.picture}
                                    title={transport.name}
                                    description={transport.description}
                                    link={transport.link}
                                />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Box>
  
            <Box sx={{mt: 4, mb: 4}}>
                <Typography sx={{fontFamily: 'Poppins', fontWeight: '700', fontSize: '4vw'}}>
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

/*
<Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2">
                  General Info
              </Typography>
              <Paper variant="outlined" p={2}>
                  <Typography>Language: {city.language}</Typography>
                  <Typography>Currency: {city.currency}</Typography>
              </Paper>
              </Grid>
  
              <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2">
                  Genres
              </Typography>
              <Paper variant="outlined" p={2}>
                  {city.genre.map((genre, index) => (
                  <Typography key={index}>{genre}</Typography>
                  ))}
              </Paper>
              </Grid>
          </Grid>
*/