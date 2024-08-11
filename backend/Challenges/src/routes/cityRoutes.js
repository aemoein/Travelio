const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// City Routes
router.get('/', cityController.getAllCities);
router.get('/:id', cityController.getCityById);
router.post('/', cityController.createCity);

module.exports = router;
