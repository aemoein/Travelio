import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress, useMediaQuery, useTheme} from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileCard from '../../Components/Social/ProfileCard';
import axios from 'axios';
import Sidebar from '../../Components/Social/sidebar';
import apiUrl from '../../Config/config';
import BottomBar from '../../Components/Social/BottomBar';

const Search = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const token = localStorage.getItem('token');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${apiUrl}/social/main/profiles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfiles(response.data.data);
        console.log('Profiles:', response.data.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchFollowings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/social/main/followings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFollowings(response.data.data.map(following => following));
        console.log('Followings:', followings);
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };

    fetchProfiles();
    fetchCurrentUser();
    fetchFollowings();
  }, [token]);

  return (
    <>
        <Navbar />
        {!isMobile && <Sidebar />}
        <Box sx={{
            mt: 10,
            ml: { xs: '10vw', sm: '35vw', md: '37.5', lg: '42.5vw' },
            mr: { xs: '10vw', sm: '15vw', md: '17.5vw', lg: '22.5vw' },
            width: { xs: '80vw', sm: '50vw', md: '45vw', lg: '35vw' },
            maxWidth: '1200px',
            mb: 10,
          }}
        >
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 0, justifyContent: 'center' }}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    profiles.length > 0 ? (
                        profiles.map((profile, index) => (
                            <ProfileCard key={index} profile={profile} currentUser={currentUser} followings={followings} />
                        ))
                    ) : (
                        <Typography variant="body1">No profiles available</Typography>
                    )
                )}
            </Box>
      </Box>
      {isMobile && <BottomBar />}
    </>
  );
};

export default Search;