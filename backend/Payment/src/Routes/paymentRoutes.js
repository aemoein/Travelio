const express = require('express');
const paymentController = require('../Controllers/paymentController');
const authenticateUser = require('../middleware/authenticateUser');
const router = express.Router();

// Ensure `authenticateUser` and `paymentController.getCheckoutSession` are defined
router.get('/:tripId', authenticateUser, paymentController.getCheckoutSession);

module.exports = router;
