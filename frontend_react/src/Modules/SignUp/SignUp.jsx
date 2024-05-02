import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
    try {
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const { username } = formData;
      console.log('User signed up successfully:', username);
      navigate(`/signUpInfo/${username}`);
    } catch (error) {
      console.error('Error signing up:', error);
      setError('An error occurred during signup');
    }
  };  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(https://www.boat-tahoe.com/wp-content/uploads/2023/03/Sequence-01.00_00_08_17.Still001.jpg)',
          height: '100vh',
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
            Create your own stories
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
                >
                  Continue
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