const mongoose = require('mongoose');
const { Schema } = mongoose;

const segmentSchema = new Schema({
    departure: {
        airportCode: String,
        terminal: String,
        time: Date
    },
    arrival: {
        airportCode: String,
        terminal: String,
        time: Date
    },
    carrier: {
        code: String,
        name: String,
    },
    flightNumber: String,
    aircraft: String,
    baggage: {
        description: String,
        quantity: Number
    }
});

const itinerarySchema = new Schema({
    segments: [segmentSchema]
});

const flightSchema = new Schema({
    id: String,
    price: {
        currency: String,
        total: Number
    },
    itineraries: [itinerarySchema]
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;