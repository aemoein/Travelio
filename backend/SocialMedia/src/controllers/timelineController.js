const socialProfile = require('../models/socialProfileModel');
const Post = require('../models/postModel');

// Get timeline posts for a specific user
exports.getTimeline = async (req, res) => {
    const { userId } = req.params;
    try {
        const userProfile = await SocialProfile.findOne({ userId }).populate('followings');
        if (!userProfile) {
            return res.status(404).json({
                status: 'fail',
                message: 'User profile not found'
            });
        }

        const followingIds = userProfile.followings.map(user => user._id);
        const posts = await Post.find({ author: { $in: followingIds } })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: posts
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all posts from a specific user
exports.getUserPosts = async (req, res) => {
    const { userId } = req.params;
    try {
        const posts = await Post.find({ author: userId })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        if (!posts.length) {
            return res.status(404).json({
                status: 'fail',
                message: 'No posts found for this user'
            });
        }

        res.status(200).json({
            status: 'success',
            data: posts
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};
