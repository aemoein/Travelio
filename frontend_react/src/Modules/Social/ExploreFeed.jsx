import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, useMediaQuery, useTheme} from '@mui/material';
import Sidebar from '../../Components/Social/sidebar';
import PostCard from '../../Components/Social/postCard';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import apiUrl from '../../Config/config';
import BottomBar from '../../Components/Social/BottomBar';

const ExploreFeed = () => {
  const [posts, setPosts] = useState([]);
  const [socialId, setSocialId] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/social/timeline/explore`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Reverse the array of posts
        setPosts(response.data.data.reverse());
        setSocialId(response.data.socialId);
        console.log('Posts:', response.data.data);
        console.log('response:', response.data.socialId);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', fontFamily: 'Poppins, sans-serif', mt: 6 }}>
        {!isMobile && <Sidebar />}
        <Box
          sx={{
            mt: 4,
            ml: { xs: '10vw', sm: '35vw', md: '37.5', lg: '42.5vw' },
            mr: { xs: '10vw', sm: '15vw', md: '17.5vw', lg: '22.5vw' },
            width: { xs: '80vw', sm: '50vw', md: '45vw', lg: '35vw' },
            maxWidth: '1200px',
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {posts.length > 0 ? (
                posts.map((post, index) => <PostCard key={index} post={post} socialId={socialId} />)
              ) : (
                <Typography variant="body1">No posts available</Typography>
              )}
            </>
          )}
        </Box>
        {isMobile && <BottomBar />}
      </Box>
    </>
  );
};

export default ExploreFeed;