import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import Navbar from '../../Components/Navbar/Navbar';
import ProfileCard from '../../Components/Social/ProfileCard';
import axios from 'axios';
import Sidebar from '../../Components/Social/sidebar';

const Search = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:7777/social/profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfiles(response.data.data);
        console.log('Profiles:', response.data.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      } finally {
        setLoading(false); // Set loading to false after profiles are fetched
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:7777/users/profile', {
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
        const response = await axios.get('http://localhost:7777/social/followings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log('Followings:', response.data.data);
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
        <Sidebar />
        <Box sx={{
            mt: 10,
            width: { sm: '50vw', md: '45vw', lg: '45vw' },
            mr: { sm: '15vw', md: '17.5vw', lg: '17.5vw' },
            ml: { sm: '35vw', md: '37.5vw', lg: '37.5vw' },
            mr: '17.5vw',
            ml: '37.5vw',
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
    </>
  );
};

export default Search;