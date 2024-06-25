const axios = require('axios');
const socialProfile = require('../models/socialModel');

// 1- create a social profile
exports.createSocialProfile = async (req, res) => {
    try{
        //check if the user is already created a social profile
        const currentSocialProfile = await socialProfile.findOne({ userId: req.body.userId });
        if (currentSocialProfile) {
            res.status(400).json({
                status: 'fail',
                message: 'Social Profile already exists'
            });
        }
        //create a new social profile
        const newSocialProfile = await socialProfile.create({ userId: req.body.userId });
        res.status(201).json({
            status:'success',
            data: newSocialProfile,
            message: 'Social Profile Created Successfully'
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 2- get all social profiles
exports.getAllSocialProfiles = async (req,res) =>{
    try{
        const socialProfiles = await socialProfile.find();
        res.status(200).json({
            status:'success',
            data: socialProfiles
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

// 3- get a social profile
exports.getSocialProfile = async (req, res) => {
    try {
        const getSocialProfile = await socialProfile.findById(req.params.id);
        if (!getSocialProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'Social Profile not found'
            });
        } else {
            return res.status(200).json({
                status: 'success',
                data: getSocialProfile
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};


// 4- delete a social profile
exports.deleteSocialProfile = async (req, res) => {
    try {
        const delSocialProfile = await socialProfile.findById(req.params.id);
        if (!delSocialProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'Social Profile not found'
            });
        }

        await socialProfile.deleteOne({ _id: req.params.id });

        return res.status(204).json({
            status: 'success',
            message: 'Social Profile Deleted Successfully'
        });
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};



// 5- follow a user
exports.followUser = async (req, res) => {
    const { currentUserProfileId, targetUserProfileId } = req.body;
    try {
        const currentUserProfile = await socialProfile.findById(currentUserProfileId);
        const targetUserProfile = await socialProfile.findById(targetUserProfileId);
        
        if (!currentUserProfile || !targetUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // Check if the user is blocked
        if (currentUserProfile.blocked.includes(targetUserProfileId) || targetUserProfile.blocked.includes(currentUserProfileId)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You cannot follow this user, This user is blocked'
            });
        }

        // Check if the user is already followed
        if (!currentUserProfile.followings.includes(targetUserProfileId)) {
            currentUserProfile.followings.push(targetUserProfileId);
            targetUserProfile.followers.push(currentUserProfileId);
            await currentUserProfile.save();
            await targetUserProfile.save();
            return res.status(200).json({
                status: 'success',
                data: {
                    currentUserProfile,
                    targetUserProfile
                },
                message: "Followed Successfully"
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Already Followed'
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};


// 6- unfollow a user
exports.unfollowUser = async (req, res) => {
    const { currentUserProfileId, targetUserProfileId } = req.body;
    try {
        const currentUserProfile = await socialProfile.findById(currentUserProfileId);
        const targetUserProfile = await socialProfile.findById(targetUserProfileId);

        if (!currentUserProfile || !targetUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (currentUserProfile.followings.includes(targetUserProfileId)) {
            currentUserProfile.followings.pull(targetUserProfileId);
            targetUserProfile.followers.pull(currentUserProfileId);
            await currentUserProfile.save();
            await targetUserProfile.save();

            return res.status(200).json({
                status: 'success',
                data: {
                    currentUserProfile,
                    targetUserProfile
                },
                message: "Unfollowed Successfully"
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'Not Following'
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};


// 7- List all followers of a user
exports.listFollowers = async (req, res) => {
    try{
        const UsersocialProfile = await socialProfile.findById(req.params.id);
        if(!UsersocialProfile){
            res.status(404).json({
                status: 'fail',
                message: 'Social Profile not found'
            });
        }
        res.status(200).json({
            status:'success',
            data: UsersocialProfile.followers
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

// 8- List all followings of a user
exports.listFollowings = async (req, res) => {
    try{
        const UsersocialProfile = await socialProfile.findById(req.params.id);
        if(!UsersocialProfile){
            res.status(404).json({
                status: 'fail',
                message: 'Social Profile not found'
            });
        }
        res.status(200).json({
            status:'success',
            data: UsersocialProfile.followings
        });
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
};

// 9- Get a follower
exports.getFollower = async (req, res) => {
    const { userProfileId, followerProfileId } = req.body;
    try {
        const userProfile = await socialProfile.findOne({ _id: userProfileId });

        if (!userProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User profile not found'
            });
        }

        if (!userProfile.followers.includes(followerProfileId)) {
            return res.status(404).json({
                status: 'fail',
                message: 'Follower not found'
            });
        }

        const followerProfile = await socialProfile.findOne({ _id: followerProfileId });

        if (!followerProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'Follower profile not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: followerProfile
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 10- Get a following
exports.getFollowing = async (req, res) => {
    const { userProfileId, followingProfileId } = req.body;
    try {
        const userProfile = await socialProfile.findOne({ _id: userProfileId });

        if (!userProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User profile not found'
            });
        }

        if (!userProfile.followings.includes(followingProfileId)) {
            return res.status(404).json({
                status: 'fail',
                message: 'Following not found...'
            });
        }

        const followingProfile = await socialProfile.findOne({ _id: followingProfileId });

        if (!followingProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'Follower profile not found??'
            });
        }
        res.status(200).json({
            status: 'success',
            data: followingProfile
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 11- Block a user
exports.blockUser = async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
    try {
        const currentUserProfile = await socialProfile.findById(currentUserId);
        const targetUserProfile = await socialProfile.findById(targetUserId);

        if (!currentUserProfile || !targetUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        // Remove target user from current user's followings and vice versa
        if (currentUserProfile.followings.includes(targetUserId)) {
            currentUserProfile.followings.pull(targetUserId);
        }
        if (targetUserProfile.followers.includes(currentUserId)) {
            targetUserProfile.followers.pull(currentUserId);
        }

        if (currentUserProfile.followers.includes(targetUserId)) {
            currentUserProfile.followers.pull(targetUserId);
        }
        if (targetUserProfile.followings.includes(currentUserId)) {
            targetUserProfile.followings.pull(currentUserId);
        }

        // Add target user to current user's blocked list if not already blocked
        if (!currentUserProfile.blocked.includes(targetUserId)) {
            currentUserProfile.blocked.push(targetUserId);
            await currentUserProfile.save();
            await targetUserProfile.save();
            return res.status(200).json({
                status: 'success',
                data: currentUserProfile,
                message: 'User blocked successfully'
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'User already blocked'
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 12- Unblock a user
exports.unblockUser = async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
    try {
        const currentUserProfile = await socialProfile.findById(currentUserId);
        const targetUserProfile = await socialProfile.findById(targetUserId);

        if (!currentUserProfile || !targetUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (currentUserProfile.blocked.includes(targetUserId)) {
            currentUserProfile.blocked.pull(targetUserId);
            await currentUserProfile.save();
            return res.status(200).json({
                status: 'success',
                data: currentUserProfile,
                message: 'User unblocked successfully'
            });
        } else {
            return res.status(400).json({
                status: 'fail',
                message: 'User is not blocked'
            });
        }
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 13- List all blocked users
exports.listBlockedUsers = async (req, res) => {
    try {
        const currentUserProfile = await socialProfile.findById(req.params.id);
        if (!currentUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status:'success',
            data: currentUserProfile.blocked
        });
    } catch (err) {
        return res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 14- Get a blocked user
exports.getBlockedUser = async (req, res) => {
    const { currentUserId, targetUserId } = req.body;
    try {
        const currentUserProfile = await socialProfile.findById(currentUserId);
        if (!currentUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        if (!currentUserProfile.blocked.includes(targetUserId)) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not blocked'
            });
        }
        const targetUserProfile = await socialProfile.findById(targetUserId);
        if (!targetUserProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status:'success',
            data: targetUserProfile
        });


    } catch (err) {
    return res.status(500).json({
        status: 'fail',
        message: err.message
    });
}
};

