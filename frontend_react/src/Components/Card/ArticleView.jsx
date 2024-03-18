import React from 'react';
import { Typography, Box } from '@mui/material';
import ArticleCard from './ArticleCard';
import GradientButton from '../Buttons/GradientButton';

const ArticleView = ({ articles }) => {
  return (
    <Box sx={{ marginLeft: '7.5vw', marginRight: '7vw', padding: '1.2vw', marginTop: '10px', maxWidth: '85vw'}}>
        <Typography align="left" 
            sx={{ 
                fontFamily: 'Merriweather',
                fontWeight: '900',
                fontSize: '1.2vw',
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
                fontSize: '2vw',
                }}
            >
                Enhance Your Journey With Our Articles & Stories
            </Typography>
            <GradientButton text={"View Articles"} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {articles.map((article, index) => (
                <ArticleCard
                key={index}
                imageUrl={article.imageUrl}
                category={article.category}
                title={article.title}
                date={article.date}
                summary={article.summary}
                />
            ))}
        </Box>
    </Box>
  );
};

export default ArticleView;