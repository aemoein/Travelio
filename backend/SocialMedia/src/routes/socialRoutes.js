const express = require('express');
const router = express();

const socialController = require('./../controllers/socialController');

router.post('/follow', socialController.follwoUser);
router.post('/unfollow',socialController.unfollowUser);

module.exports = router;