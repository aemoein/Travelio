// routes.js
const express = require('express');
const flightsController = require('../controllers/flightsController');
const hotelController = require('../controllers/hotelController');
const itinerariesController = require('../controllers/itinerariesController');
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/flights', flightsController.searchFlights);
router.get('/hotels', hotelController.getHotels);
router.post('/flights', authMiddleware, flightsController.createFlightControl);
router.post('/hotels/', authMiddleware, hotelController.createHotelControl);
router.post('/itineraries', itinerariesController.create)
router.post('/itineraries/save', itinerariesController.saveItinerary);
router.get('/trip', tripController.getTripById)

module.exports = router;