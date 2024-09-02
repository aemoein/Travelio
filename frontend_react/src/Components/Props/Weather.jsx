import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const WeatherComponent = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '85923ecf0aee7432dd17a6656f8065e3';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [cityName, apiKey]);

  if (!weatherData) return <div>Loading...</div>;

  const now = Math.floor(Date.now() / 1000);
  const isNight = now < weatherData.sys.sunrise || now > weatherData.sys.sunset;
  const boxStyle = {
    backgroundColor: isNight ? '#0a0d2b' : '#0198ef',
    color: '#fff',
    padding: '20px',
    textAlign: 'left',
    borderRadius: '10px',
    height: { xs: '150px', sm: '160px', md: '200px', lg: '200px' },
  };

  // Function to round temperature to integers
  const roundTemperature = (temperature) => {
    return Math.round(temperature);
  };

  return (
    <>
    <Box sx={boxStyle}>
      <Typography sx={{ fontFamily: 'Poppins', textAlign: 'center', fontWeight: 700, fontSize: { xs: '28px', sm: '32px', md: '38px', lg: '42px' }, mb: 0.5, lineHeight:1.0 }}>{weatherData.name}</Typography>
      <Box 
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
       <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '50%', 
            mx: 'auto'
          }}
        >
          <Box
            component="img"
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
            sx={{
              width: { xs: '80px', sm: '90px', md: '100px', lg: '90px' },
              height: { xs: '80px', sm: '90px', md: '100px', lg: '90px' },
              mb: -1,
              mt: -2,
            }}
          />
          <Typography 
            sx={{ 
              fontFamily: 'Poppins', 
              fontWeight: 700, 
              fontSize: { xs: '32px', sm: '36px', md: '40px', lg: '36px' }, 
              lineHeight: 1.0, 
              textAlign: 'center',
              ml: 2,
            }}
          >
            {roundTemperature(weatherData.main.temp)}°
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: { xs: '12px', sm: '14px', md: '18px', lg: '14px' }, }}>
            {weatherData.weather[0].main} - {weatherData.weather[0].description}
          </Typography>
        </Box>
        <Box sx={{mt:1 , pl: 2}}>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '20px' }, }}>
            Feels like: {roundTemperature(weatherData.main.feels_like)}°C
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '20px' }, }}>
            Low: {roundTemperature(weatherData.main.temp_min)}°C - High: {roundTemperature(weatherData.main.temp_max)}°C
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '20px' }, }}>
            Humidity: {weatherData.main.humidity}%
          </Typography>
          <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: { xs: '16px', sm: '20px', md: '24px', lg: '20px' }, }}>
            Wind: {weatherData.wind.speed} m/s
          </Typography>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default WeatherComponent;