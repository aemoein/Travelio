import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Clock = ({ city, country }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [continent, setContinent] = useState('');

  useEffect(() => {
    const fetchContinent = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setContinent(data[0].region.replace('Americas', 'America'));
        } else {
          throw new Error('Country not found');
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    const fetchTime = async () => {
      try {
        const formattedCity = city.replace(/ /g, '_');
        const response = await fetch(`https://worldtimeapi.org/api/timezone/${continent}/${formattedCity}`);
        if (!response.ok) {
          throw new Error('Failed to fetch time');
        }
        const data = await response.json();
        const date = new Date(data.datetime.slice(0, -6));

        // Extract hours, minutes, and AM/PM
        let hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

        // Format the time string
        const formattedTime = `${hours}:${minutes} ${amPm}`;

        setCurrentTime(formattedTime);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchContinent();

    // Fetch time only when continent and city are set
    if (continent && city) {
      fetchTime();
    }

    // Refresh time every minute
    const interval = setInterval(fetchTime, 60000);

    return () => clearInterval(interval);
  }, [city, country, continent]);

  return (
    <Box sx={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <Typography sx={{ marginBottom: '10px', fontFamily: "Poppins", fontSize: '3vw', fontWeight: 700 }}>Current Time in {city}, {country}:</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '8vw', fontWeight: 700 }}>{currentTime}</Typography>
    </Box>
  );
};

export default Clock;