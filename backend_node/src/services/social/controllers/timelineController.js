const SocialProfile = require('../models/socialProfileModel');
const Post = require('../models/postModel');

exports.postsTimeline = async (req, res) => {
    try {
        const currentUser = await SocialProfile.findById(req.user.socialProfileId);
        if (!currentUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const userPosts = await Post.find({ author: req.user.socialProfileId });
        
        const followingPostsPromises = currentUser.followings.map((friendId) => {
            return Post.find({ author: friendId });
        });

        const followingPosts = await Promise.all(followingPostsPromises);

        const mergedPosts = userPosts.concat(...followingPosts);

        return res.status(200).json({
            status: 'success',
            data: mergedPosts,
            socialId: req.user.socialProfileId
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};

exports.exploreTimeline = async (req, res) => {
    try {
        const currentUser = await SocialProfile.findById(req.user.socialProfileId);
        if (!currentUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const userFollowings = currentUser.followings;

        // Find all posts by users not followed by the current user
        const explorePosts = await Post.find({ author: { $nin: [...userFollowings, req.user.socialProfileId] } });

        return res.status(200).json({
            status: 'success',
            data: explorePosts
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};