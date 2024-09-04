// routes.js
const express = require('express');
//const flightsController = require('../controllers/flightsController');
const flightController = require('../controllers/flightController');
const hotelController = require('../controllers/hotelController');
const itinerariesController = require('../controllers/itinerariesController');
const tripController = require('../controllers/tripController');
const authMiddleware = require('../../../middleware/authMiddleware');

const router = express.Router();

//router.get('/flights', flightsController.searchFlights);
router.get('/flights', flightController.getFlights);
router.get('/hotels', hotelController.getHotels);
//router.post('/flights', authMiddleware, flightsController.createFlightControl);
router.post('/flights', authMiddleware, flightController.createFlightControl);
router.post('/hotels', authMiddleware, hotelController.createHotelControl);
router.post('/itineraries', itinerariesController.create);
router.post('/itineraries/save', itinerariesController.saveItinerary);
router.get('/trip', authMiddleware, tripController.getTripById);
router.get('/my-trips', authMiddleware, tripController.getTripById)

module.exports = router;