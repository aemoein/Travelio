import React, { useState, useEffect } from 'react';
import ReactWeather, { useOpenWeather } from 'react-open-weather';


const Weather = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchWeatherData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=YOUR-API-KEY&units=metric`
      );
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [cityName]);

  if (isLoading) return <p>Loading...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData && (
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={weatherData}
          lang="en"
          locationLabel={cityName}
          unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
          showForecast
        />
      )}
    </div>
  );
};

export default Weather;