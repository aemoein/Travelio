const SocialProfile = require('../models/socialProfileModel');
const Post = require('../models/postModel');

// after fetching the posts check if the user is followed. 
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
        
        //edit here
        const followingPostsPromises = currentUser.followings.map((friendId) => {
            return Post.find({ author: friendId });
        });

        const followingPosts = await Promise.all(followingPostsPromises);

        const mergedPosts = userPosts.concat(...followingPosts);
        //sort after merging by createdAt to show the posts from the newest posts to the oldest
        const sortedPosts = mergedPosts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        

        return res.status(200).json({
            status: 'success',
            data: sortedPosts,
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