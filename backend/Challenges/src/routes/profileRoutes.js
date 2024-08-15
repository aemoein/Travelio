const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Profile Routes
router.get('/', profileController.getAllProfiles);
router.get('/getprofile', profileController.getProfileByUsername);
router.get('/:id', profileController.getProfileById);
router.post('/', profileController.createProfile);
router.put('/:id', profileController.updateProfile);
router.delete('/:id', profileController.deleteProfile);

module.exports = router;