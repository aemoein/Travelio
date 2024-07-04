const Post = require('../models/postModel');


// 1- Create a new post
exports.createPost = async (req, res) => {
    const { author, content, mediaUrl} = req.body;
    try {
        const newPost = new Post({ author, content, mediaUrl});
        const savedPost = await newPost.save();
        res.status(201).json({
            status: 'success',
            data: savedPost
        });
    } catch (err) {
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
        const socialProfileId = req.params.id;
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

// Update a post by ID
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

// Delete a post by ID
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

// Like a post
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        if (!post.likes.includes(req.body.userId)) {
            post.likes.push(req.body.userId);
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

// Unlike a post
exports.unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        if (post.likes.includes(req.body.userId)) {
            post.likes.pull(req.body.userId);
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

// Add a comment to a post
exports.addComment = async (req, res) => {
    const { userId, content } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        post.comments.push({ user: userId, content });
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

// Delete a comment from a post
exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        const comment = post.comments.id(req.params.commentId);
        if (!comment) {
            return res.status(404).json({
                status: 'fail',
                message: 'Comment not found'
            });
        }
        comment.remove();
        await post.save();
        res.status(204).json({
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
