import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Hero from '../../Components/Hero/Hero';
import DesView from '../../Components/Card/DesView';
import ArticleView from '../../Components/Card/ArticleView';
import ArticleView2 from '../../Components/Card/ArticleView2';
import ArticleCard2 from '../../Components/Card/ArticleCard2';
import homeData from '../../Components/Data/home_data.json';

const Home = () => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isDesViewVisible, setIsDesViewVisible] = useState(false);
    const [isArticleViewVisible, setIsArticleViewVisible] = useState(false);

    const contentRef = useRef(null);
    const desViewRef = useRef(null);
    const articleViewRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsContentVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Intersection observer for DesView
    useEffect(() => {
        const desViewObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsDesViewVisible(true);
                    desViewObserver.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (desViewRef.current) {
            desViewObserver.observe(desViewRef.current);
        }

        return () => desViewObserver.disconnect();
    }, []);

    // Intersection observer for ArticleView Box
    useEffect(() => {
        const articleViewObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsArticleViewVisible(true);
                    articleViewObserver.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (articleViewRef.current) {
            articleViewObserver.observe(articleViewRef.current);
        }

        return () => articleViewObserver.disconnect();
    }, []);

    return (
        <>
            <Box sx={{ backgroundColor: '#EEEEEE' }}>
                <Navbar />
                <Box sx={{ height: '64px' }} />
                <Hero />
                <Box
                    ref={desViewRef}
                    sx={{
                        opacity: isDesViewVisible ? 1 : 0,
                        transform: isDesViewVisible ? 'translateY(0)' : 'translateY(100px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                    }}
                >
                    <DesView destinations={homeData.destinations} />
                </Box>

                <Box
                    sx={{
                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%), url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXI5YnZoaGMxNzY3YjBqc20ybXd1MDUxZXlmZDAxcWpueWo2bXlqNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eMyLvZy70jv7IXBEz0/giphy.gif)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '100%',
                        height: { xs: '500px', sm: '500px', md: '600px', lg: '900px' },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: isContentVisible ? 1 : 0,
                        transform: isContentVisible ? 'translateY(0)' : 'translateY(100px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                    }}
                    ref={contentRef}
                >
                    <Typography
                        align="center"
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: '900',
                            fontSize: { xs: '36px', sm: '46px', md: '52px', lg: '90px' },
                            color: '#fff',
                            maxWidth: '70vw'
                        }}
                    >
                        Discover a different perspective. Broaden your horizons.
                    </Typography>
                </Box>

                <Box
                    ref={articleViewRef}
                    sx={{
                        marginBottom: '30px',
                        opacity: isArticleViewVisible ? 1 : 0,
                        transform: isArticleViewVisible ? 'translateY(0)' : 'translateY(100px)',
                        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                    }}
                >
                    <ArticleView articles={homeData.articles} />

                    <Box sx={{ marginLeft: '7.5vw', paddingRight: '1.2vw', paddingLeft: '1.2vw', marginBottom: '0px' }}>
                        <ArticleCard2
                            imageUrl={homeData.featuredArticle.imageUrl}
                            category={homeData.featuredArticle.category}
                            title={homeData.featuredArticle.title}
                            date={homeData.featuredArticle.date}
                            summary={homeData.featuredArticle.summary}
                            width="83vw"
                        />
                    </Box>

                    <ArticleView2 articles={homeData.additionalArticles} />
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default Home;