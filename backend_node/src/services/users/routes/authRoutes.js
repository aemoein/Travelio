// userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../../../middleware/uploadMiddleware');
const authController = require('../controllers/authController');
const authMiddleware = require('../../../middleware/authMiddleware');
const preferencesController = require('../controllers/preferencesController')

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.post('/userInfoSignUp', authMiddleware, upload.single('profilePic'), authController.userInfoSignUp);
router.post('/quiz', preferencesController.quiz);
router.post('/setUserPreferences', authMiddleware, preferencesController.setUserPreferences);

module.exports = router;
