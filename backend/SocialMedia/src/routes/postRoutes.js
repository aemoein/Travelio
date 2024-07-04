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

// 6- delete post by id
router.delete('/delete-post/:id',postController.deletePostById);

// 7- like post
router.post('/like/:id',postController.likePost);

// 8- unlike post
router.post('/unlike/:id',postController.unlikePost);

// 9- add comment
router.post('/comment/:id',postController.addComment);

// 10- delete comment
router.post('/uncomment',postController.UnComment);

// 11- get all comments for a specific post
router.get('/all-comments/:id',postController.allComments);

module.exports = router;
