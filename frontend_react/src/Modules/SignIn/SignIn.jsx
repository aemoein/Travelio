import React from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

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
          backgroundImage: 'linear-gradient(to bottom right, #64b7f5, #28f8fe)',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ padding: 5,  }}>
            <Typography sx={{  
                display: 'inline-block',
                fontSize: { xs: '48px', md: '64px' ,lg: '98px' },
                fontWeight: '400',
                fontFamily: 'Montserrat, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: 'wider',
            }}>
                create your own adventure
            </Typography>
        </Box>
        <Box sx={{ 
                minWidth: '40vw',
                maxWidth: '40vw',
            }}>
            <Container
            component="main"
            maxWidth="xs"
            sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: 3,
                padding: 3,
                textAlign: 'center',
            }}
            >
            <Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
                TRVLO
                </Typography>
                <Typography component="h2" variant="h5">
                Sign in
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                </Box>
                <Typography>
                <Link component={RouterLink} to="/signup" variant="body2" sx={{textTransform: 'none'}}>
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