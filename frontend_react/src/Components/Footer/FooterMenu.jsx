import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const FooterMenu = ({ title, buttons }) => {
  return (
    <Box sx={{ marginRight: '20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography sx={{
            color: '#666666',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '900',
            marginLeft: '8px',
            fontsize: { xs: '8px', sm: '12px', md: '14px', lg : '18px'},
            letterSpacing: 'large',
        }}>
            {title}
        </Typography>
      
      {buttons.map((button, index) => (
        <Button key={index} sx={{
            color: '#d3d3d3',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            letterSpacing: 'large',
            fontsize: '6px',
            lineHeight: '1.1',
        }}>
            {button}
        </Button>
      ))}
    </Box>
  );
}

export default FooterMenu;