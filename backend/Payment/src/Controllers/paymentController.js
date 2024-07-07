const stripe = require('stripe')(require('../utils/stripe').stripeSecretKey);
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');


exports.getCheckoutSession = catchAsync(async (req,res,next) => {
    // 1) Get the the currently booked trips
    const tripId = req.params.tripId;
    const trip = await axios.get(`localhost:3003/api/trip/${tripId}`);
    const user = await axios.get("localhost:3001/checkLoggedIn")
    //2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        paymnet_method_types:['cards'],
        success_url: `url to the home page `,
        cancel_url: `url to the home page`,
        customer_email: user.email,
        client_refrence_id: req.params.tripId,
        line_items: [{
            name: trip.data.name,
            amount: tripId.data.totalPrice * 100,
            currency: 'usd',
            quantity: 1
        }],
    })

    // 3) Send the checkout session ID back to the client
    res.status(200).json({
        status: 'success',
        session
    })
});