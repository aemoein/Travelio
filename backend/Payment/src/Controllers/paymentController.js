const stripe = require('stripe')(require('../utils/stripe').stripeSecretKey);
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');


exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    try {
        const tripId = req.body.tripId;
        const destination = req.body.destination;
        const price = req.body.price;

        console.log("tripId: ", tripId);
        console.log("destination: ", destination);
        console.log("price: ", price);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url: 'http://yourdomain.com/success',
            cancel_url: 'http://yourdomain.com/cancel',
            customer_email: req.user.email,
            client_reference_id: tripId,
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Trip',
                    },
                    unit_amount: parseInt(req.body.price)/100,
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
