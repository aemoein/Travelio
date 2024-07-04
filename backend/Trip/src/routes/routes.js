// routes.js
const express = require('express');
const flightsController = require('../controllers/flightsController');
const hotelController = require('../controllers/hotelController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/flights', flightsController.searchFlights);
router.get('/hotels', hotelController.getHotels);
router.post('/flights', authMiddleware ,flightsController.createFlightControl);
//router.post('/hotels/:tripId', hotelController.bookHotel);

module.exports = router;