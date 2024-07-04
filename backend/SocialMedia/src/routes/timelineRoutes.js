const express = require('express');
const timelineController = require('../controllers/timelineController');
const router = express.Router();

// 1- create a new timeline
router.get('/timeline/:id', timelineController.postsTimeline);

module.exports = router;
