// routes.js
const express = require('express');
const flightsController = require('../controllers/flightsController');
const accessTokenMiddleware = require('../middleware/accessTokenMiddleware');

const router = express.Router();

// Apply the access token middleware to the flights route
router.get('/flights', flightsController.searchFlights);

module.exports = router;