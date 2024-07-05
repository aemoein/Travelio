const SocialProfile = require('../models/socialProfileModel');
const Post = require('../models/postModel');



exports.postsTimeline = async (req, res) => {
    try {
        const currentUser = await SocialProfile.findById(req.params.id);
        if (!currentUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const userPosts = await Post.find({ author: currentUser.userId });
        
        const followingPostsPromises = currentUser.followings.map((friendId) => {
            return Post.find({ author: friendId });
        });

        const timelinePosts = await Promise.all(followingPostsPromises);

        const mergedPosts = userPosts.concat(...timelinePosts);

        return res.status(200).json({
            status: 'success',
            data: mergedPosts
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};



/*exports.postsTimeline = async (req, res) => {
    const profileId = req.params.id;
    try {
        const currentUserPosts = await Post.findById(profileId);
        if (!currentUserPosts) {
            return res.status(404).json({
                status: 'fail',
                message: 'User posts not found'
            });
        }
        const followingPosts = await socialProfile.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(profileId)
                },
                $lookup: {
                    from: 'posts',
                    localField: 'followings',
                    foreignField: '_id',
                    as: 'followingPosts'
                },
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        return res.status(200).json({
            status:'success',
            data: currentUserPosts.concat(followingPosts)
        });
    }catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};*/

/*
// Get timeline posts for a specific user
exports.getTimeline = async (req, res) => {
    const { userId } = req.params;
    try {
        const userProfile = await socialProfile.findOne({ userId }).populate('followings');
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
*/