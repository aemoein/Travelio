const express = require('express');
const router = express();

const socialController = require('./../controllers/socialController');

//create social profile
router.post('/:id',socialController.createSocialProfile);

//get All social profiles
router.get('/social-profile',socialController.getAllSocialProfiles);

//get social profile by id
router.get('/social-profile/:id',socialController.getSocialProfileById);

//delete social profile
router.delete('/social-profile/:id',socialController.deleteSocialProfile);

//follow user 
router.post('/follow', socialController.follwoUser);

//unfollow user
router.post('/unfollow',socialController.unfollowUser);



module.exports = router;