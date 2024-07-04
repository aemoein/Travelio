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
        if (!post.likes.includes(req.body.profileId)) {
            post.likes.push(req.body.profileId);
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
        if (post.likes.includes(req.body.profileId)) {
            post.likes.pull(req.body.profileId);
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
    const { profileId, content } = req.body;
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        post.comments.push({ user: profileId, content });
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
