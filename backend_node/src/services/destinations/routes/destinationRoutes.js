const express = require('express');
const destinationsController = require('../controllers/destinationsController');

const router = express.Router();

router.get('/destinations', destinationsController.fetchDestinations);

module.exports = router;