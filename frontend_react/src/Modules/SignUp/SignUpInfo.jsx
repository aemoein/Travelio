import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Select, MenuItem, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import GradientText from '../../Components/Text/GradientText';
import CountriesData from '../../Components/Data/countries.json';
import apiUrl from '../../Config/config';

function SignUpInfo() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Custom hook to get Formik's context
  const useFormikSetFieldValue = () => {
    const { setFieldValue } = useFormikContext();
    return setFieldValue;
  };

  const validationSchema = Yup.object({
    location: Yup.string().required('Location is required'),
    birthday: Yup.date().required('Birthday is required'),
    profilePic: Yup.mixed().required('Profile picture is required'),
    bio: Yup.string().required('Bio is required'),
    nationality: Yup.string().required('Nationality is required'),
    mobileNumber: Yup.string().required('Mobile number is required').matches(/^\d+$/, 'Must be a valid number'),
    dialingCode: Yup.string().required('Dialing code is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setLoading(true);
    try {
      values.mobileNumber = values.dialingCode + values.mobileNumber;
      const formDataToSend = new FormData();
      for (const key in values) {
        formDataToSend.append(key, values[key]);
      }
      const response = await axios.post(`${apiUrl}/users/auth/userInfoSignUp`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.message === 'User information updated successfully') {
        navigate(`/preferences/select`);
      }
    } catch (error) {
      console.error('Error updating user information:', error.response?.data || error.message);
      setErrors({ api: error.response?.data?.message || 'An error occurred' });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Fetch location data and set Formik fields
  const FetchLocation = () => {
    const setFieldValue = useFormikSetFieldValue();

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

                setFieldValue('location', `${city}, ${country}`);
                const selectedCountry = CountriesData.find(countryData => countryData.code === country);
                if (selectedCountry) {
                  setFieldValue('dialingCode', selectedCountry.dial_code);
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
    }, [setFieldValue]);

    return null;
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(to right, #a2c2e4, #f2a5b0)'
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 5,
            padding: 4,
            textAlign: 'center',
            boxShadow: 3,
          }}
        >
          <GradientText text='TRVLO' />
          <Typography variant="h4" component="h1" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', mt: 2 }}>
            Complete Your Profile
          </Typography>

          <Formik
            initialValues={{
              location: '',
              birthday: '',
              profilePic: null,
              bio: '',
              preferences: '',
              nationality: '',
              mobileNumber: '',
              dialingCode: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, setFieldValue, isSubmitting }) => (
              <Form noValidate>
                <FetchLocation />
                <Box
                  onClick={() => document.getElementById('profilePic').click()}
                  sx={{
                    height: '150px',
                    width: '150px',
                    my: 4,
                    borderRadius: '100px',
                    backgroundImage: values.profilePic ? `url(${URL.createObjectURL(values.profilePic)})` : 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIoJsLdimrKcZIXPt2qkg3uO9aHCzaZ_5K5PuL_1HxCQ&s)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    mx: 'auto',
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
                  onChange={(event) => setFieldValue('profilePic', event.currentTarget.files[0])}
                  style={{ display: 'none' }}
                />
                {errors.profilePic && touched.profilePic && (
                  <Typography color="error" variant="body2">{errors.profilePic}</Typography>
                )}

                <TextField
                  margin="normal"
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="location"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ fontFamily: 'Poppins' }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="birthday"
                  label="Birthday"
                  name="birthday"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={values.birthday}
                  onChange={handleChange}
                  error={touched.birthday && Boolean(errors.birthday)}
                  helperText={touched.birthday && errors.birthday}
                  sx={{ fontFamily: 'Poppins' }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="bio"
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={values.bio}
                  onChange={handleChange}
                  error={touched.bio && Boolean(errors.bio)}
                  helperText={touched.bio && errors.bio}
                  sx={{ fontFamily: 'Poppins' }}
                />
                <Select
                  fullWidth
                  margin="normal"
                  id="nationality"
                  name="nationality"
                  label="Nationality"
                  value={values.nationality}
                  onChange={handleChange}
                  error={touched.nationality && Boolean(errors.nationality)}
                  sx={{ fontFamily: 'Poppins' }}
                >
                  {CountriesData.map((country, index) => (
                    <MenuItem key={index} value={country.code}>{country.name}</MenuItem>
                  ))}
                </Select>
                {errors.nationality && touched.nationality && (
                  <Typography color="error" variant="body2">{errors.nationality}</Typography>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={4} sx={{ marginTop: '16px' }}>
                    <Select
                      fullWidth
                      margin="normal"
                      id="dialingCode"
                      name="dialingCode"
                      label="Dialing Code"
                      value={values.dialingCode}
                      onChange={handleChange}
                      error={touched.dialingCode && Boolean(errors.dialingCode)}
                      sx={{ fontFamily: 'Poppins' }}
                    >
                      {CountriesData.map((country, index) => (
                        <MenuItem key={index} value={country.dial_code}>{`${country.dial_code}`}</MenuItem>
                      ))}
                    </Select>
                    {errors.dialingCode && touched.dialingCode && (
                      <Typography color="error" variant="body2">{errors.dialingCode}</Typography>
                    )}
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
                      value={values.mobileNumber}
                      onChange={handleChange}
                      error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                      helperText={touched.mobileNumber && errors.mobileNumber}
                      sx={{ fontFamily: 'Poppins' }}
                    />
                  </Grid>
                </Grid>

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
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUpInfo;