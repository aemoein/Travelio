const express = require('express');
const { fetchDestinations } = require('../controllers/destinationsController');

const router = express.Router();

router.get('/destinations', fetchDestinations);

module.exports = router;