const hotelService = require('../services/hotelService');
const Trip = require('../models/Trip'); // Assuming Trip model is defined

const getHotels = async (req, res) => {
    try {
        const { cityCode, adults, checkInDate, checkOutDate, roomQuantity, priceRange, currency } = req.query;

        const hotels = await hotelService.getHotelOffers(cityCode, adults, checkInDate, checkOutDate, roomQuantity, priceRange, currency);

        res.json(hotels);
    } catch (error) {
        console.error('Error in getHotels controller:', error);
        res.status(500).json({ error: "Failed to fetch hotel data" });
    }
};

const createHotelControl = async (req, res) => {
    try {
        console.log(req.body);
        const hotelData = req.body.hotel;
        const tripId = req.body.tripId;

        const createdTripId = await hotelService.createHotel(hotelData, tripId);

        res.status(201).json({ tripId: createdTripId });
    } catch (error) {
        console.error('Error creating hotel and associating with trip:', error);
        res.status(500).json({ error: 'Failed to create hotel and associate with trip' });
    }
};

module.exports = {
    getHotels,
    createHotelControl
};