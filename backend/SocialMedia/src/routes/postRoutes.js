const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// 1- create post
router.post('/create-post',postController.createPost);

// 2- get all posts
router.get('/all-posts',postController.getAllPosts);

// 3- Get all posts for a specific user
router.get('/user-posts/:id',postController.userPosts);

// 4- get post by id
router.get('/get-post/:id',postController.getPostById);

// 5- update post by id
router.patch('/update-post/:id',postController.updatePostById);

//delete post by id
router.delete('/delete-post/:id',postController.deletePostById);

//like post
router.post('/like/:id',postController.likePost);

//unlike post
router.post('/unlike/:id',postController.unlikePost);

//add comment
router.post('/comment/:id',postController.addComment);

//delete comment
router.delete('/:postId/comment/:commentId',postController.deleteComment);

module.exports = router;
