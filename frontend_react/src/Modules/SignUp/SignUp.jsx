import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GradientText from '../../Components/Text/GradientText';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077C2',
    },
  },
  typography: {
    fontFamily: ['Roboto Condensed', 'Arial', 'sans-serif'].join(','),
  },
});

function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        console.log('Starting signup process...');
        const response = await axios.post('http://localhost:3001/auth/signup', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 201) {
            throw new Error(response.data.message);
        }

        console.log('Signup successful, response data:', response.data);
        const { userId } = response.data;
        const { username } = formData;

        console.log('Sending create request to /create endpoint with userId:', userId);
        const createResponse = await axios.post('http://localhost:3004/create', { userId }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (createResponse.status !== 201) {
            throw new Error(createResponse.data.message);
        }

        console.log('Create request successful, response data:', createResponse.data);

        // Send challenge profile creation request with username as a URL parameter
        console.log('Sending create request to /api/challengeProfile/new with username:', username);
        const challengeResponse = await axios.post(`http://localhost:3009/api/challengeProfile/new?username=${encodeURIComponent(username)}`);

        console.log('Challenge profile creation successful, response data:', challengeResponse.data);
        
        // Navigate to the signUpInfo page
        navigate(`/signUpInfo`);
    } catch (error) {
        console.error('Error during signup process:', error);
        setError('An error occurred during signup');
    } finally {
        setLoading(false);
    }
 };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(https://efirq7mmtwd.exactdn.com/wp-content/uploads/2023/06/sunset-nature-landscape-2232548205.jpg)',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >

        <Box sx={{ paddingLeft: '15vw' }}>
          <GradientText text='TRVLO' />
          <Typography align="left" sx={{
            display: 'inline-block',
            fontSize: '5vw',
            fontWeight: '900',
            fontFamily: 'Poppins',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: '#fff',
            lineHeight: '1.0',
            width: '40vw',
          }}>
           The sky is your limit
          </Typography>
        </Box>

        <Box sx={{ minWidth: '40vw', paddingRight: '15vw' }}>
          <Container component="main" maxWidth="xs" sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: 3,
            padding: 3,
            textAlign: 'center',
          }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
                Welcome To TRVLO
              </Typography>

              <Typography component="h2" variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 4 }}>
                Sign Up
              </Typography>

              <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'left', fontFamily: 'Poppins' }}>
                  <input type="checkbox" id="terms" name="terms" />
                  <label htmlFor="terms" sx={{ ml: 2 }}>
                    I agree to the <Link component={RouterLink} to="/termsAndConditions" color="primary">Terms and Conditions</Link>
                  </label>
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontFamily: 'Poppins', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Continue'}
                </Button>
              </form>

              <Typography>
                <Link component={RouterLink} to="/signin" variant="body2"
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                  Already a Member? Log in
                </Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignUpPage;