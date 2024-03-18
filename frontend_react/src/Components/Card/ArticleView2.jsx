import React from 'react';
import { Typography, Box } from '@mui/material';
import ArticleCard from './ArticleCard';

const ArticleView = ({ articles }) => {
  return (
    <Box sx={{ marginLeft: '7.5vw', marginRight: '7vw', padding: '1.2vw', maxWidth: '85vw'}}>
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