const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const { uploadSingleImage } = require('../middleware/uploadImageMiddleware');
 

// 1- create post
router.post('/create', uploadSingleImage('media'), postController.createPost);

// 2- get all posts
router.get('/all',postController.getAllPosts);

// 3- Get all posts for a specific user
router.get('/:id',postController.userPosts);

// 4- get post by id //unused
router.get('/get/:id',postController.getPostById);

// 5- update post by id //unused
router.patch('/update/:id',postController.updatePostById);

// 6- delete post by id
router.delete('/delete/:id',postController.deletePostById);

// 7- like post 
router.post('/like/:id',postController.likePost);

// 8- unlike post
router.post('/unlike/:id',postController.unlikePost);

// 9- add comment
router.post('/comment/:id',postController.addComment);

// 10- delete comment
router.delete('/uncomment',postController.UnComment);

// 11- get all comments for a specific post
router.get('/comments/:id',postController.allComments);


// Helper function to upload image buffer to Cloudinary
const uploadToCloudinary = (buffer, folder, publicId) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          public_id: publicId,
          transformation: [
            { width: 2000, height: 1333, crop: "limit" },
            { format: 'jpeg', quality: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      );
  
      stream.end(buffer);
    });
  };
module.exports = router;


