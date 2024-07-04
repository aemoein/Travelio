const mongoose = require('mongoose');
const { Schema } = mongoose;

const attractionSchema = new Schema({
    name: String,
    description: String
});

const restaurantSchema = new Schema({
    name: String,
    cuisine: String,
    rating: Number
});

const activitySchema = new Schema({
    name: String,
    description: String
});

const itineraryDaySchema = new Schema({
    date: Date,
    attractions: [attractionSchema],
    restaurants: [restaurantSchema],
    activities: [activitySchema]
});

const Itinerary = mongoose.model('Itinerary', itineraryDaySchema);

module.exports = Itinerary;
