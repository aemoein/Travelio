const mongoose = require('mongoose');
const { Schema } = mongoose;
const Flight = require('./Flight');
const Hotel = require('./Hotel');
const Itinerary = require('./itinerary');

const tripSchema = new Schema({
    flights: [{ type: Schema.Types.ObjectId, ref: 'Flight' }],
    hotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }],
    itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice: Number,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
