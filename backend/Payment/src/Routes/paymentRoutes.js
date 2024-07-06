const express = require('express');
const paymentController = require('../Controllers/paymentController');
const router = express.Router();


router.get('/checkout-session/:tripId',paymentController.getCheckoutSession);



module.exports = router;