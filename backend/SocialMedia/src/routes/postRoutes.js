const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();

// 1- create post
router.post('/create-post',postController.createPost);

// 2- get all posts
router.get('/all-posts',postController.getAllPosts);

// 3- get post by id
router.get('/get-post/:id',postController.getPostById);

// 4- update post by id
router.patch('/update-post/:id',postController.updatePostById);

// 5- delete post by id
router.delete('/delete-post',postController.deletePostById);

// 6- like post
router.post('/like/:id',postController.likePost);

// 7- unlike post
router.post('/unlike/:id',postController.unlikePost);

// 8- add comment
router.post('/comment/:id',postController.addComment);

// 9- delete comment
router.delete('/:postId/comment/:commentId',postController.deleteComment);

module.exports = router;
