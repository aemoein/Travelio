import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import GradientText from '../../Components/Text/GradientText';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077C2',
    },
  },
  typography: {
    fontFamily: [
      'Roboto Condensed',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:7777/users/auth/login', formData, {
            withCredentials: true
        });
        console.log(response.data.message);

        if (response.status === 200 && response.data.token) {
            // Save the token in local storage
            localStorage.setItem('token', response.data.token);

            console.log('username: ' + response.data.username);
            localStorage.setItem('username', response.data.username);
            

            // Set loggedin flag to true
            localStorage.setItem('loggedin', 'true');

            // Redirect to the home page
            navigate(`/`);
        }
    } catch (error) {
        console.error('Error:', error.response.data.message); 
        alert('Error: username or password wrong');
    }
};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(https://efirq7mmtwd.exactdn.com/wp-content/uploads/2023/06/sunset-nature-landscape-2232548205.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ paddingLeft: '15vw', }}>
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
            The Sky is Your limit
          </Typography>
        </Box>
        <Box sx={{
          minWidth: '40vw',
          paddingRight: '15vw',
        }}>
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
                Log in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, fontFamily: 'Poppins', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}
                >
                  Log In
                </Button>
              </Box>
              <Typography>
                <Link component={RouterLink} to="/signup" variant="body2"
                  sx={{
                    textTransform: 'none',
                    fontFamily: 'Poppins', fontWeight: 'bold',
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}>
                  Don't have an account? Sign Up
                </Link>
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;