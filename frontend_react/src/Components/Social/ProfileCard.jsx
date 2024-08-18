import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, Box, Avatar} from '@mui/material';
import axios from 'axios';

const ProfileCard = ({ profile, currentUser, followings, onFollowChange }) => {
        
    const [profileData, setProfileData] = useState({});
    const [isFollowing, setIsFollowing] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        setIsFollowing(followings.includes(profile._id));
    }, [followings, profile._id]);

    useEffect(() => {
        const fetchProfileData = async () => {
        try {
            const response = await axios.get(`http://localhost:7777/users/profile/data/${profile.userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setProfileData(response.data);
            console.log('followings array',followings);
            console.log('Profile data:', profile._id);
            console.log('Is following:', isFollowing);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
        };

        fetchProfileData();
    }, [profile.userId, token, isFollowing]);

    const handleFollow = async () => {
        try {
        const response = await axios.post(
            'http://localhost:7777/social/follow',
            { targetUserProfileId: profile._id },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        console.log('Follow response:', response.data);
        setIsFollowing(true);
        onFollowChange();
        } catch (error) {
        console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
        const response = await axios.post(
            'http://localhost:7777/social/unfollow',
            { targetUserProfileId: profile._id },
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        console.log('Unfollow response:', response.data);
        setIsFollowing(false); // Update isFollowing state
        onFollowChange(); // Notify parent component of follow change
        } catch (error) {
        console.error('Error unfollowing user:', error);
        }
    };

    if (profileData.username === currentUser?.username) {
        return null;
    }

    return (
        <Box sx={{ mt: 4, width: '100%' }}>
        <Card sx={{ maxWidth: 1000, borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={profileData.profilePic} sx={{ mr: 2, width: 100, height: 100 }} />
                    <Box>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '25px', background: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {profileData.username}
                        </Typography>
                        <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '15px', background: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            {profileData.firstName + ' ' + profileData.lastName}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                {isFollowing ? (
                    <Button variant="contained" color="secondary" onClick={handleUnfollow}>
                    Unfollow
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleFollow}>
                    Follow
                    </Button>
                )}
                </Box>
            </Box>
            </CardContent>
        </Card>
        </Box>
    );
    };

export default ProfileCard;