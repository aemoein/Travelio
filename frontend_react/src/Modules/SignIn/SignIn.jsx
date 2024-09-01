import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import apiUrl from '../../Config/config';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077C2',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      // First, log in the user
      const loginResponse = await axios.post(`${apiUrl}/users/auth/login`, values, {
        withCredentials: true
      });
  
      if (loginResponse.status === 200 && loginResponse.data.token) {
        // Save the token in local storage
        localStorage.setItem('token', loginResponse.data.token);
        localStorage.setItem('username', loginResponse.data.username);
        localStorage.setItem('loggedin', 'true');
  
        // Optionally, set a cookie manually
        // You may want to do this in a different context or only if necessary
        // For demonstration, let's use the '/set-cookie' route
        await axios.get(`${apiUrl}/set-cookie`, {
          withCredentials: true
        });
  
        // Redirect or update the UI as needed
        navigate(`/`);
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'An unexpected error occurred' });
    } finally {
      setSubmitting(false);
    }
  };  

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page for the application" />
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'linear-gradient(to right, #a2c2e4, #f2a5b0)', // Gradient background
          padding: 2,
          position: 'relative',
        }}
      >
        <Container component="main" maxWidth="xs" sx={{
          backgroundColor: 'white',
          borderRadius: 5,
          boxShadow: 3,
          padding: 4,
          textAlign: 'center',
        }}>
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>
            Log in to see more
          </Typography>
          <Typography component="h2" variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 4 }}>
            Welcome Back!
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  helperText={<ErrorMessage name="username" />}
                  error={!!errors.username}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText={<ErrorMessage name="password" />}
                  error={!!errors.password}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 2, borderRadius: 10, fontFamily: 'Poppins', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}
                >
                  Log In
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }}>
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
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
