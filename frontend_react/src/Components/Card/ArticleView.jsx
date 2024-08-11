import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import ArticleCard from './ArticleCard';
import GradientButton from '../Buttons/GradientButton2';

const ArticleView = ({ articles }) => {
    const limitedArticles = articles.slice(0, 2);
    return (
        <Box sx={{ marginLeft: '7.5vw', marginRight: '7vw', padding: '1.2vw', marginTop: '10px', maxWidth: '85vw'}}>
            <Typography align="left" 
                sx={{ 
                    fontFamily: 'Merriweather',
                    fontWeight: '900',
                    fontSize: { xs: '10px', sm: '16px', md: '20px', lg: '22px' },
                    lineHeight: '1.0',
                    width: 'fit-content',
                    backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                }}>
                Travel Articles And News
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    align="left"
                    sx={{
                    marginBottom: '10px',
                    fontFamily: 'Poppins',
                    fontWeight: '900',
                    fontSize: { xs: '15px', sm: '20px', md: '24px', lg: '28px' },
                    }}
                >
                The Latest Stories & News
                </Typography>
                <GradientButton text={"View More"} />
            </Box>
            <Grid container spacing={0.5} sx={{ marginTop: '0px' }}>
            {(window.innerWidth <= 600 ? limitedArticles : articles).map((article, index) => (
            <Grid 
                item 
                xs={6}
                sm={4}
                key={index}
            >
                <ArticleCard
                        key={index}
                        imageUrl={article.imageUrl}
                        category={article.category}
                        title={article.title}
                        date={article.date}
                        summary={article.summary}
                    />
            </Grid>
            ))}
        </Grid>
        </Box>
    );
};

export default ArticleView;