const stripe = require('stripe')(require('../utils/stripe').stripeSecretKey);
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
const Payment = require('../models/paymentModel');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    try {
        const { tripId, destination, totalPrice } = req.body;
        const userId = req.user.id;

        console.log("tripId: " + tripId);
        console.log("destination: " + destination);
        console.log("totalPrice: " + totalPrice);
        console.log("userId: " + userId);

        const successUrl = `http://localhost:3005/payment/success?tripId=${tripId}&destination=${encodeURIComponent(destination)}&totalPrice=${totalPrice}&userId=${userId}`;
        const cancelUrl = `http://localhost:3000/planning/review?tripId=${tripId}&destination=${encodeURIComponent(destination)}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: req.user.email,
            client_reference_id: tripId,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: destination + ' Trip',
                    },
                    unit_amount: parseInt(totalPrice) * 100,
                },
                quantity: 1,
            }],
            mode: 'payment'
        });

        res.status(200).json({
            status: 'success',
            session
        });
    } catch (error) {
        console.error('Error in getCheckoutSession:', error.message);
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
});

exports.paymentSuccess = catchAsync(async (req, res, next) => {
    try {
        const { tripId, destination, totalPrice, userId } = req.query;

        const newPayment = await Payment.create({
            tripId,
            destination,
            totalPrice,
            userId
        });

        res.redirect(`http://localhost:3000/payment/success?tripId=${tripId}&destination=${encodeURIComponent(destination)}&totalPrice=${totalPrice}&userId=${userId}`);
    } catch (error) {
        console.error('Error in paymentSuccess:', error.message);
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
});