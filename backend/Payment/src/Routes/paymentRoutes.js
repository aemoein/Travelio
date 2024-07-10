const express = require('express');
const paymentController = require('../Controllers/paymentController');
const router = express.Router();

// Ensure `authenticateUser` and `paymentController.getCheckoutSession` are defined
router.post('/', paymentController.getCheckoutSession);

module.exports = router;
