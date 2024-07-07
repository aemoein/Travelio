const stripe = require('stripe')(require('../utils/stripe').stripeSecretKey);
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    try {
        // 1) Get the currently booked trip
        const tripId = req.params.tripId;
        //const tripResponse = await axios.get(`http://localhost:3003/api/trip/${tripId}`);
        //const trip = tripResponse.data;

        
        // 3) Create checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: 'http://yourdomain.com/success',
            cancel_url: 'http://yourdomain.com/cancel',
            customer_email: "samy@gmail.com",
            client_reference_id: tripId,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Cairo Trip',
                    },
                    unit_amount: 65000, // Amount in cents
                },
                quantity: 1,
            }],
            mode: 'payment'
        });

        // 4) Send the checkout session ID back to the client
        res.status(200).json({
            status: 'success',
            session
        });
    } catch (error) {
        console.error('Error in getCheckoutSession:', error.message);
        res.status(500).json({
            status: 'error',
            message: error//.message
        });
    }
});
