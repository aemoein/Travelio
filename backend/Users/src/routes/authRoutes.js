// userRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authController = require('../controllers/authController');
const preferencesController = require('../controllers/preferencesController')

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/signup', authController.logout);
router.post('/userInfoSignUp', upload.single('profilePic'), authController.userInfoSignUp);
router.post('/quiz', preferencesController.quiz);
router.post('/setUserPreferences', preferencesController.setUserPreferences);

module.exports = router;
