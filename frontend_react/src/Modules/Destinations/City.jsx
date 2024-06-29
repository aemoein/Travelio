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
                <Typography sx={{fontFamily: "Poppins", fontWeight: "700", fontSize: '4vw',lineHeight: '1.0', mt: 2,}}>
                    {city.name}
                </Typography>
                <Typography gutterBottom sx={{fontFamily: "Poppins", fontWeight: "700", fontSize: '1.5vw', lineHeight: '1.0'}}>
                    {city.region}, {city.country}
                </Typography>
                <Typography paragraph mt={2} sx={{fontFamily: "Poppins", fontWeight: "400", fontSize: '1.5vw' }}>
                    {city.description}
                </Typography>
          </Box>
          <FactText city={city.name} population={city.population} />
          <Clock city={city.name} country={city.country} />
          <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
              <Typography variant="h6" component="h2">
                  General Info
              </Typography>
              <Paper variant="outlined" p={2}>
                  <Typography>Language: {city.language}</Typography>
                  <Typography>Currency: {city.currency}</Typography>
                  <Typography>Timezone: {city.timezone}</Typography>
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
  
          <Box mt={4}>
              <Typography variant="h5" component="h2" gutterBottom>
              Famous Foods
              </Typography>
              <Grid container spacing={4}>
              {city.foods.map((food) => (
                  <Grid item key={food._id} xs={12} sm={6} md={4}>
                  <Card>
                      <CardActionArea>
                      <CardMedia
                          component="img"
                          height="140"
                          image={food.picture}
                          alt={food.name}
                      />
                      <CardContent>
                          <Typography variant="h6" component="h3">
                          {food.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                          {food.description}
                          </Typography>
                      </CardContent>
                      </CardActionArea>
                  </Card>
                  </Grid>
              ))}
              </Grid>
          </Box>
  
          <Box mt={4}>
              <Typography variant="h5" component="h2" gutterBottom>
              Top Restaurants
              </Typography>
              <Grid container spacing={4}>
              {city.restaurants.map((restaurant) => (
                  <Grid item key={restaurant._id} xs={12} sm={6} md={4}>
                  <Card>
                      <CardActionArea component="a" href={restaurant.link} target="_blank">
                      <CardMedia
                          component="img"
                          height="140"
                          image={restaurant.picture}
                          alt={restaurant.name}
                      />
                      <CardContent>
                          <Typography variant="h6" component="h3">
                          {restaurant.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                          {restaurant.description}
                          </Typography>
                      </CardContent>
                      </CardActionArea>
                  </Card>
                  </Grid>
              ))}
              </Grid>
          </Box>
  
          <Box mt={4}>
              <Typography variant="h5" component="h2" gutterBottom>
              Best Hotels
              </Typography>
              <Grid container spacing={4}>
              {city.hotels.map((hotel) => (
                  <Grid item key={hotel._id} xs={12} sm={6} md={4}>
                  <Card>
                      <CardActionArea component="a" href={hotel.link} target="_blank">
                      <CardMedia
                          component="img"
                          height="140"
                          image={hotel.picture}
                          alt={hotel.name}
                      />
                      <CardContent>
                          <Typography variant="h6" component="h3">
                          {hotel.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                          {hotel.description}
                          </Typography>
                      </CardContent>
                      </CardActionArea>
                  </Card>
                  </Grid>
              ))}
              </Grid>
          </Box>
  
          <Box mt={4}>
              <Typography variant="h5" component="h2" gutterBottom>
              Transportation
              </Typography>
              <Grid container spacing={4}>
              {city.transportation.map((transport) => (
                  <Grid item key={transport._id} xs={12} sm={6} md={4}>
                  <Card>
                      <CardActionArea component="a" href={transport.link} target="_blank">
                      <CardMedia
                          component="img"
                          height="140"
                          image={transport.picture}
                          alt={transport.name}
                      />
                      <CardContent>
                          <Typography variant="h6" component="h3">
                          {transport.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                          {transport.description}
                          </Typography>
                      </CardContent>
                      </CardActionArea>
                  </Card>
                  </Grid>
              ))}
              </Grid>
          </Box>
  
          <Box mt={4}>
              <Typography variant="h5" component="h2" gutterBottom>
              Gallery
              </Typography>
              <Grid container spacing={4}>
              {city.gallery.map((image, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                      <CardMedia
                      component="img"
                      height="140"
                      image={image}
                      alt={`Gallery image ${index + 1}`}
                      />
                  </Card>
                  </Grid>
              ))}
              </Grid>
          </Box>
      </Box>
      </>
    );
  };

export default City;