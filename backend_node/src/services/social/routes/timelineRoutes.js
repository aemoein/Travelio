const express = require('express');
const timelineController = require('../controllers/timelineController');
const router = express.Router();

// 1- create a new timeline
router.get('/', timelineController.postsTimeline);

// 2- get explore timeline
router.get('/explore', timelineController.exploreTimeline);

module.exports = router;
