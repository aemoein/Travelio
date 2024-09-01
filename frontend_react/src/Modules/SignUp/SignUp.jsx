import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link, CircularProgress, IconButton, InputAdornment, Checkbox, FormControlLabel } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import apiUrl from '../../Config/config';

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
  email: Yup.string().email('Invalid email address').required('Email is required'),
  username: Yup.string().required('Username is required'),
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
  terms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/users/auth/signup`, values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 201) {
        throw new Error(response.data.message);
      }

      const { userId } = response.data;

      localStorage.setItem('signUpToken', response.data.token);

      await axios.post(`${apiUrl}/social/create`, { userId }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await axios.post(`${apiUrl}/challenges/profiles`, {
        withCredentials: true,
        username: values.username,
      });

      navigate(`/signUpInfo`);
    } catch (error) {
      setErrors({ api: 'An error occurred during signup' });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: 'linear-gradient(to right, #a2c2e4, #f2a5b0)',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Box sx={{ minWidth: '40vw' }}>
          <Container component="main" maxWidth="xs" sx={{
            backgroundColor: 'white',
            borderRadius: 5,
            boxShadow: 3,
            padding: 4,
            textAlign: 'center',
          }}>
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontFamily: 'Poppins', fontWeight: 'bold', fontSize: '2rem' }}
              >
                Welcome To TRVLO
              </Typography>
              <Typography
                component="h2"
                variant="h5"
                sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 4 }}
              >
                Sign Up
              </Typography>
            </Box>
            <Formik
              initialValues={{
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                terms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form noValidate>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="given-name"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    autoComplete="new-password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        color="primary"
                        onChange={handleChange}
                        checked={values.terms}
                        error={touched.terms && Boolean(errors.terms)}
                      />
                    }
                    label="I agree to the Terms and Conditions"
                  />
                  {errors.terms && touched.terms && (
                    <Typography color="error" variant="body2">{errors.terms}</Typography>
                  )}
                  {errors.api && (
                    <Typography color="error" variant="body2">{errors.api}</Typography>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, fontFamily: 'Poppins', fontWeight: 'bold', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}
                    disabled={loading || isSubmitting}
                  >
                    {loading || isSubmitting ? <CircularProgress size={24} /> : 'Continue'}
                  </Button>
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
                </Form>
              )}
            </Formik>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignUpPage;