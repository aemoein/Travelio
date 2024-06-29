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
    maxWidth: '33%',
    width: '33%',
    marginRight: '3.5%'
  };

  // Function to round temperature to integers
  const roundTemperature = (temperature) => {
    return Math.round(temperature);
  };

  return (
    <Box sx={boxStyle}>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '4vw', lineHeight:1.0 }}>{weatherData.name}</Typography>
      <Box sx={{ display: 'flex', ml: -2.0 }}>
        <img
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
          alt={weatherData.weather[0].description}
          width="30%"
        />
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '6vw', mt: '8px', lineHeight: 1.0 }}>
          {roundTemperature(weatherData.main.temp)}°C
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 900, fontSize: '1.5vw' }}>
        {weatherData.weather[0].main} - {weatherData.weather[0].description}
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.8vw' }}>
        Feels like: {roundTemperature(weatherData.main.feels_like)}°C
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.8vw' }}>
        Low: {roundTemperature(weatherData.main.temp_min)}°C - High: {roundTemperature(weatherData.main.temp_max)}°C
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.8vw' }}>
        Humidity: {weatherData.main.humidity}%
      </Typography>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 700, fontSize: '1.8vw' }}>
        Wind: {weatherData.wind.speed} m/s
      </Typography>
    </Box>
  );
};

export default WeatherComponent;