import React from 'react';
import { Typography, Link, Box, Button } from '@mui/material';
import GradientText from '../Text/TextTitle';
import { Block, Height } from '@mui/icons-material';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <Box sx={{ fontFamily: 'Roboto Condensed, sans-serif', backgroundColor: '#000'}}>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px',
            marginLeft: '20px',
            marginRight: '20px',
            paddingRight: '4px' 
        }}
        >
            <Box>
                <Typography
                sx={{
                    fontWeight: '900',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: 'wider',
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '4vw',
                    maxWidth: 'fit-content',
                    lineHeight: '1.0',
                }}
                >
                TRVLO
                </Typography>

                <Typography
                sx={{
                    fontWeight: '900',
                    fontFamily: 'Montserrat, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: 'wider',
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '3vw',
                    maxWidth: '25vw',
                    lineHeight: '1.0',
                    paddingRight: '2vw',
                }}
                >
                Create your own stories
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    borderRadius: 10,
                    fontWeight: '900',
                    fontsize: '3vw',
                    fontFamily: 'Montserrat, sans-serif',
                    marginTop: '20px',
                    width: '15vw',
                    height: '3vw',
                    }}
                >
                    Join Now
                </Button>
                </Typography>
            </Box>

            <Box>
            </Box>

            <Box
            sx={{
                display: 'flex',
                marginLeft: '25px',
                paddingBottom: '20px',
            }}
            >
            <FooterMenu
            title="DISCOVER"
            buttons={[
                'Destinations',
                'Categories',
                'Planning',
                'Articles & Stories',
                'Challenges',
                'Social'
            ]}
            />

            <FooterMenu
            title="LEARN"
            buttons={[
                'Destinations',
                'Categories',
                'Planning',
                'Articles & Stories',
                'Challenges',
                'Social'
            ]}
            />

            <FooterMenu
            title="CONNECT"
            buttons={[
                'Contact',
                'Newsletter',
                'Social',
            ]}
            />
        </Box>
        </Box>

    </Box>
  );
};

export default Footer;
