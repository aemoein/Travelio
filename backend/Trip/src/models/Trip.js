const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new Schema({
    flights: [{ type: Schema.Types.ObjectId, ref: 'Flight' }],
    hotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }],
    itinerary: [{ type: Schema.Types.ObjectId, ref: 'Itinerary' }], // Change to array of ObjectId
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    totalPrice: Number,
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;