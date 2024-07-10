const express = require('express');
const paymentController = require('../Controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, paymentController.getCheckoutSession);

router.get('/success', paymentController.paymentSuccess);

module.exports = router;
