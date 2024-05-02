import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Select, MenuItem, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GradientText from '../../Components/Text/GradientText';
import CountriesData from '../../Components/Data/countries.json';

function SignUpInfo() {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    location: '',
    birthday: '',
    profilePic: null,
    bio: '',
    preferences: '',
    nationality: '',
    mobileNumber: '',
    dialingCode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=85923ecf0aee7432dd17a6656f8065e3`);
              const data = await response.json();
              const city = data[0].name;
              const country = data[0].country;
              
              setFormData(prevState => ({ ...prevState, location: `${city}, ${country}` }));
              const selectedCountry = CountriesData.find(countryData => countryData.code === country);
              if (selectedCountry) {
                setFormData(prevState => ({
                  ...prevState,
                  dialingCode: selectedCountry.dial_code
                }));
              }
            } catch (error) {
              console.error('Error fetching location:', error);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };
  
    getLocation();
  }, []);  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'profilePic' ? files[0] : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.mobileNumber = formData.dialingCode + formData.mobileNumber;
      const formDataToSend = new FormData();
      formDataToSend.append('username', username); 
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      console.log("Request being sent:", formDataToSend); // Log the request
      const response = await axios.post('http://localhost:3001/userInfoSignUp', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      
      if (response.data.message === 'User information updated successfully') {
        navigate(`/preferences/${username}`);
      }
    } catch (error) {
      console.error('Error updating user information:', error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <GradientText text='TRVLO' />
        <Typography variant="h4" component="h1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mt: 2 }}>
          Complete Your Profile
        </Typography>
        <Box
            sx={{
              height: '150px',
              width: '150px',
              marginTop: '20px',
              borderRadius: '100px',
              backgroundImage: formData.profilePic ? `url(${URL.createObjectURL(formData.profilePic)})` : 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoJsLdimrKcZIXPt2qkg3uO9aHCzaZ_5K5PuL_1HxCQ&s)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <input
            type="file"
            accept="image/*"
            id="profilePic"
            name="profilePic"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="profilePic">
            <Button
              variant="contained"
              component="span"
              sx={{ mt: 2 }}
            >
              Upload Profile Picture
            </Button>
          </label>
          <TextField
            margin="normal"
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            value={formData.location}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="birthday"
            label="Birthday"
            name="birthday"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.birthday}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="bio"
            label="Bio"
            name="bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
          /> 
          <Select
            fullWidth
            margin="normal"
            id="nationality"
            name="nationality"
            label="Nationality"
            value={formData.nationality}
            onChange={handleChange}
          >
            {CountriesData.map((country, index) => (
              <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
            ))}
          </Select>
          <Grid container spacing={2}>
            <Grid item xs={4} sx={{ marginTop: '16px'}}>
              <Select
                fullWidth
                margin="normal"
                id="dialingCode"
                name="dialingCode"
                label="Dialing Code"
                value={formData.dialingCode}
                onChange={handleChange}
              >
                {CountriesData.map((country, index) => (
                  <MenuItem key={index} value={country.dial_code}>{`${country.dial_code}`}</MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={8}>
              <TextField
                margin="normal"
                fullWidth
                id="mobileNumber"
                label="Mobile Number"
                name="mobileNumber"
                type="tel"
                autoComplete="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Information
          </Button>
        </Box>
        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default SignUpInfo;