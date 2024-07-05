const mongoose = require('mongoose');

// Define schema for activities within an itinerary
const activitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    details: { type: String, required: true },
    time: { type: String, required: true }
});

const itinerarySchema = new mongoose.Schema({
    day: { type: String, required: true },
    description: { type: String, required: true },
    activities: [activitySchema] 
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;