const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

// Define routes and associate them with controller functions
router.get('/cities', cityController.getAllCities);
router.get('/cities/:id', cityController.getCityById);
router.post('/cities', cityController.createCity);
router.put('/cities/:id', cityController.updateCity);
router.delete('/cities/:id', cityController.deleteCity);

// Route to load city data from JSON file
router.post('/loadCities/:name', cityController.loadCityDataFromFile);

module.exports = router;