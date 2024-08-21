import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Select, MenuItem, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import GradientText from '../../Components/Text/GradientText';
import CountriesData from '../../Components/Data/countries.json';
import apiUrl from '../../Config/config';

function SignUpInfo() {
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
  const [loading, setLoading] = useState(false); // Added loading state
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
    setLoading(true); // Start loading
    try {
      formData.mobileNumber = formData.dialingCode + formData.mobileNumber;
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      console.log("Request being sent:", formDataToSend);
      const response = await axios.post(`${apiUrl}/users/auth/userInfoSignUp`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);

      if (response.data.message === 'User information updated successfully') {
        navigate(`/preferences/select`);
      }
    } catch (error) {
      console.error('Error updating user information:', error.response.data);
      setError(error.response.data.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://efirq7mmtwd.exactdn.com/wp-content/uploads/2023/06/sunset-nature-landscape-2232548205.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 2,
            padding: 4,
            textAlign: 'center',
            boxShadow: 3,
          }}
        >
          <GradientText text='TRVLO' />
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mt: 2 }}>
            Complete Your Profile
          </Typography>
          <Box
            onClick={() => document.getElementById('profilePic').click()}
            sx={{
              height: '150px',
              width: '150px',
              marginTop: '20px',
              borderRadius: '100px',
              backgroundImage: formData.profilePic ? `url(${URL.createObjectURL(formData.profilePic)})` : 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoJsLdimrKcZIXPt2qkg3uO9aHCzaZ_5K5PuL_1HxCQ&s)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              margin: '0 auto',
              position: 'relative',
              '&:hover::after': {
                content: '"Click to select photo"',
                position: 'absolute',
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '5px 10px',
                borderRadius: '5px',
              }
            }}
          />
          <input
            type="file"
            accept="image/*"
            id="profilePic"
            name="profilePic"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
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
              <Grid item xs={4} sx={{ marginTop: '16px' }}>
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
              disabled={loading} // Disable button when loading
            >
              {loading ? <CircularProgress size={24} /> : 'Save Information'} {/* Conditionally render spinner or text */}
            </Button>
          </Box>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default SignUpInfo;