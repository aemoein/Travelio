const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
    const { content } = req.body;
    const username = req.user.username;
    const profilePic = req.user.profilePic;
    const author = req.user.socialProfileId;

    try {
        const mediaUrl = req.file ? req.file.path : '';

        const newPost = new Post({ 
            author: author,
            username: username,
            profilePic: profilePic,
            content: content,
            mediaUrl: mediaUrl
        });
        
        const savedPost = await newPost.save();

        res.status(201).json({
            status: 'success',
            data: savedPost
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ 
            status: 'fail',
            message: err.message
        });
    }
};

// 2- Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
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

// 3- Get all posts for a specific user
exports.userPosts = async (req, res) => {
    try {
        const socialProfileId = req.user.socialProfileId;
        const posts = await Post.find({ author: socialProfileId });
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

// 4- Get a single post by ID
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: post
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 5- Update a post by ID
exports.updatePostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: post
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 6- Delete a post by ID
exports.deletePostById = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(204).json({
            status: 'success',
            message: 'Post deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 7- Like a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        if (!post.likes.includes(req.user.socialProfileId)) {
            post.likes.push(req.user.socialProfileId);
            await post.save();
            res.status(200).json({
                status: 'success',
                data: post
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Post already liked'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 8- Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        if (post.likes.includes(req.user.socialProfileId)) {
            post.likes.pull(req.user.socialProfileId);
            await post.save();
            res.status(200).json({
                status: 'success',
                data: post
            });
        } else {
            res.status(400).json({
                status: 'fail',
                message: 'Post not liked'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 9- Add a comment to a post
exports.addComment = async (req, res) => {
    const { content } = req.body;
    const profileId = req.user.socialProfileId;
    const username = req.user.username;
    const profilePic = req.user.profilePic;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        post.comments.push({ user: profileId, username: username, profilePic: profilePic, content });
        await post.save();
        res.status(201).json({
            status: 'success',
            data: post
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 10- Delete a comment from a post
exports.UnComment = async (req, res) => {
    try {
        const post = await Post.findById(req.body.postId);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        const comment = post.comments.id(req.body.commentId);
        if (!comment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Comment not found'
            });
        }
        post.comments.pull(comment);
        await post.save();
        res.status(200).json({
            status: 'success',
            message: 'Comment deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};

// 11- Get all comments for a specific post
exports.allComments = async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }

        res.status(200).json({
            status:'success',
            data: post.comments
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
};
