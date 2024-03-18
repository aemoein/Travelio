import React from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import GradientText from '../../Components/Text/GradientText';

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
            <Box sx={{paddingLeft: '15vw',}}>
                <GradientText text='TRVLO'/>
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
                    create your own stories
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
                        <Typography component="h2" variant="h5"  sx={{ fontFamily: 'Poppins', fontWeight: 'bold', marginBottom: 4 }}>
                        Log in
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, fontFamily: 'Poppins', fontWeight: 'bold', }}
                            
                        >
                            Continue
                        </Button>
                        </Box>
                        <Typography>
                        <Link component={RouterLink} to="/signup" variant="body2" sx={{textTransform: 'none', fontFamily: 'Poppins', fontWeight: 'bold',}}>
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