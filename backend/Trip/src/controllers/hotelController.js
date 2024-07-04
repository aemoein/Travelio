const hotelService = require('../services/hotelService');

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

module.exports = {
    getHotels
};