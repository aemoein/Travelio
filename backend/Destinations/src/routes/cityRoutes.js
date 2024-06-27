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

router.post('/:cityId/food', cityController.addFood);
router.post('/:cityId/restaurant', cityController.addRestaurant);
router.post('/:cityId/hotel', cityController.addHotel);
router.post('/:cityId/transportation', cityController.addTransportation);

module.exports = router;