import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Clock = ({ city, country }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [UTC, setUTC] = useState('');
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
        const utc = data.utc_offset;

        let hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPm = date.getHours() >= 12 ? 'PM' : 'AM';

        const formattedTime = `${hours}:${minutes} ${amPm}`;

        setCurrentTime(formattedTime);
        setUTC(utc);
        setTimezone(data.abbreviation);
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    fetchContinent();

    if (continent && city) {
      fetchTime();
    }

    const interval = setInterval(fetchTime, 30000);

    return () => clearInterval(interval);
  }, [city, country, continent]);

  return (
    <Box sx={{width: '33%', maxWidth: '33%' ,textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', mr: '3.5%'}}>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '2.5vw', fontWeight: 400, mb: 2 }}>Local Time</Typography>
      <Typography sx={{ marginBottom: '10px', fontFamily: "Poppins", fontSize: '3vw', fontWeight: 700 }}>{city}</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '4.8vw', fontWeight: 700 }}>{currentTime}</Typography>
      <Typography sx={{ fontFamily: "Poppins", fontSize: '2vw', fontWeight: 700 }}>Timezone</Typography>
      <Box
        sx={{
              display: 'flex',
              textAlign: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontFamily: "Poppins", fontSize: '3vw', fontWeight: 700, mr: 2 }}>
              {UTC}
            </Typography>
            <Typography sx={{ fontFamily: "Poppins", fontSize: '3vw', fontWeight: 700 }}>
              {timezone}
            </Typography>
          </Box>
    </Box>
  );
};

export default Clock;