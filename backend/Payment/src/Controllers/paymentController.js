const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');


exports.getCheckoutSession = catchAsync(async (req,res,next) => {
    // 1) Get the the currently booked trips
    const tripId = req.params.tripId;
    const tour = await axios.get(`localhost - endpoint from the trip service that take tripId as parameter and response with the trip`);
    //2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        paymnet_method_types:['cards'],
        success_url: `url to the home page `,
        cancel_url: `url to the home page`,
        customer_email: "get the email from the user service",
        client_refrence_id: req.params.tourId,
        line_items: [{
            name: tour.data.name,
            amount: tour.data.amount * 100,
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