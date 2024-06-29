const { fetchWeatherData } = require('../services/weatherService');

const getWeather = async (req, res) => {
  const city = req.params.city;  // Changed from req.query.city to req.params.city
  if (!city) {
    return res.status(400).send({ error: 'City is required' });
  }

  try {
    const data = await fetchWeatherData(city);
    res.send(data);
  } catch (error) {
    console.error('Error in getWeather:', error);
    res.status(500).send({ error: 'Error fetching weather data' });
  }
};

module.exports = { getWeather };