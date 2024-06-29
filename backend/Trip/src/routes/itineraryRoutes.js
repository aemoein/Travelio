const express = require('express');
const { getItinerary } = require('../controllers/itineraryController');

const router = express.Router();

router.post('/', getItinerary);

module.exports = router;