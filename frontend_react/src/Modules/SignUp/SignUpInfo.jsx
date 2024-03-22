import React, { useState } from 'react';
import { Typography, Container, Box, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GradientText from '../../Components/Text/GradientText';

function SignUpInfo() {
  const { username } = useParams();
  const [formData, setFormData] = useState({
    location: '',
    birthday: '',
    profilePic: '',
    bio: '',
    preferences: '',
    nationality: '',
    mobileNumber: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/userInfoSignUp', { ...formData, username });
      console.log(response.data);
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
            id="profilePic"
            label="Profile Picture URL"
            name="profilePic"
            autoComplete="profilePic"
            value={formData.profilePic}
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
          <TextField
            margin="normal"
            fullWidth
            id="preferences"
            label="Preferences"
            name="preferences"
            multiline
            rows={4}
            value={formData.preferences}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="nationality"
            label="Nationality"
            name="nationality"
            autoComplete="nationality"
            value={formData.nationality}
            onChange={handleChange}
          />
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