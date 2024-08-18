const express = require('express');
const router = express();

const socialController = require('./../controllers/socialController');

// 1- create social profile
router.post('/create', socialController.createSocialProfile);

// 18- get social profile by user id
router.get('/socialbyuser/:userId', socialController.getSocialProfileByUserId);

module.exports = router;