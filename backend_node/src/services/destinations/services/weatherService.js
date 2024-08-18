const axios = require('axios');

const apiKey = process.env.API_KEY || '85923ecf0aee7432dd17a6656f8065e3';
const weatherBaseUrl = 'http://api.openweathermap.org/data/2.5/weather';

const fetchWeatherData = async (city) => {
  try {
    // Fetch current weather data
    const weatherResponse = await axios.get(weatherBaseUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric'
      },
    });

    // Return the entire weather response data
    return weatherResponse.data;
  } catch (error) {
    console.error('Error in fetchWeatherData:', error);
    throw new Error('Failed to fetch current weather data');
  }
};

module.exports = { fetchWeatherData };