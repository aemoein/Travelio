// profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/profile', profileController.getProfile);
router.get('/checkLoggedIn', profileController.checkLoggedIn);

module.exports = router;
