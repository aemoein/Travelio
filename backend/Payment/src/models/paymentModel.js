const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    tripId: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
