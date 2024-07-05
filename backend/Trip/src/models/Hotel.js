const mongoose = require('mongoose');
const { Schema } = mongoose;

const hotelSchema = new Schema({
    hotelId: String,
    name: String,
    latitude: Number,
    longitude: Number,
    offers: [
        {
            id: String,
            checkInDate: Date,
            checkOutDate: Date,
            rateCode: String,
            roomType: String,
            description: String,
            adults: Number,
            price: {
                currency: String,
                base: Number
            },
            paymentType: String
        }
    ]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
