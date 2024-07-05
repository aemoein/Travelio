const express = require('express');
const router = express();
const socialController = require('./../controllers/socialController');

// 1- create social profile
router.post('/create-profile',socialController.createSocialProfile);

// 2- get All social profiles
router.get('/social-profiles',socialController.getAllSocialProfiles);

// 3- get social profile by id
router.get('/social-profile/:id',socialController.getSocialProfile);

// 4- delete social profile
router.delete('/social-profile/:id',socialController.deleteSocialProfile);

// 5- follow user 
router.post('/follow', socialController.followUser);

// 6- unfollow user
router.post('/unfollow',socialController.unfollowUser);

// 7- List all followers of a user (take the user id parameter)
router.get('/list-followers/:id', socialController.listFollowers);

// 8- List all followings of a user (take the user id parameter)
router.get('/list-followings/:id', socialController.listFollowings);

// 9- Get a follower
router.get('/follower', socialController.getFollower);

// 10- Get a following
router.get('/following', socialController.getFollowing)

// 11- Block a user
router.post('/block', socialController.blockUser)

// 12- Unblock a user
router.post('/unblock', socialController.unblockUser)

// 13- List all blocked users
router.get('/blocked-users/:id', socialController.listBlockedUsers)

// 14- Get a blocked user
router.get('/blocked-user', socialController.getBlockedUser)

// 15- save post
router.post('/save', socialController.savePost);

// 16- save post
router.post('/unsave', socialController.unsavePost);

// 17- list all saved posts
 router.get('/saved-posts/:id', socialController.listSavedPosts);



module.exports = router;