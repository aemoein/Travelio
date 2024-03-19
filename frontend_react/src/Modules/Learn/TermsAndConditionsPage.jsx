import React from 'react';
import { Typography, Container, Box, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

// Theme definition
const theme = createTheme({
  typography: {
    fontFamily: ['Poppins'].join(','),
  },
});

function TermsAndConditionsPage() {
  return (
    <ThemeProvider theme={theme}>
        <Navbar />
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 , marginTop: '5vw', marginBottom: '3vw',}}>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{
            fontWeight: '900',
          }}>
            Terms and Conditions
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          These Terms and Conditions ("Terms", "Terms of Service") govern your use of our website (the "Service") operated by [TRVLO] ("us", "we", or "our").
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Accounts:</strong> When you create an account with us, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account, and you must keep your account password secure. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Content:</strong> Our Service allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through the Service, including its legality, reliability, and appropriateness.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          By posting Content on or through the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Links To Other Web Sites:</strong> Our Service may contain links to third-party web sites or services that are not owned or controlled by [Your Company Name]. [Your Company Name] has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that [Your Company Name] shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Changes:</strong> We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          <strong>Contact Us:</strong> If you have any questions about these Terms, please contact us at <Link href="mailto:contact@example.com">contact@example.com</Link>.
        </Typography>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default TermsAndConditionsPage;