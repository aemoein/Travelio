// profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getProfile);
router.put('/update', profileController.updateProfile);
router.get('/checkLoggedIn', profileController.checkLoggedIn);
router.get('/preferences', profileController.getPreferences);
router.get('/data/:userId', profileController.getProfileData);

module.exports = router;
