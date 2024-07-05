// models/Itinerary.js
const mongoose = require('mongoose');

// Define schema for itinerary
const itinerarySchema = new mongoose.Schema({
    itinerary: [{
        day: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        activities: [{
            name: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            details: {
                type: String,
                required: true
            },
            time: {
                type: String,
                required: true
            },
            location: {
                type: String,
                required: true
            },
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        }]
    }]
});

// Create model based on schema
const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;