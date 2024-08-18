const express = require('express');
const destinationsController = require('../controllers/destinationsController');

const router = express.Router();

router.get('/', destinationsController.fetchDestinations);

module.exports = router;