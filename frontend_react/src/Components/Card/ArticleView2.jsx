import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import ArticleCard from './ArticleCard';

const ArticleView = ({ articles }) => {
  const limitedArticles = articles.slice(0, 2);
  return (
    <Box sx={{ marginLeft: '7.5vw', marginRight: '7vw', padding: '1.2vw', maxWidth: '85vw'}}>
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