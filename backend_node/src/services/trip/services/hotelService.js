const axios = require('axios');
const https = require('https');
const config = require('../../../config/config');
const Hotel = require('../models/Hotel');
const Trip = require('../models/Trip');

const agent = new https.Agent({
    rejectUnauthorized: false
});

const parseHotelOffers = (offers) => {
    return offers.map(hotelOffer => {
        const hotel = hotelOffer.hotel;
        const parsedHotel = {
            hotelId: hotel.hotelId,
            name: hotel.name,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            offers: hotelOffer.offers.map(offer => ({
                id: offer.id,
                checkInDate: offer.checkInDate,
                checkOutDate: offer.checkOutDate,
                rateCode: offer.rateCode,
                roomType: offer.room.type,
                description: offer.room.description.text,
                adults: offer.guests.adults,
                price: {
                    currency: offer.price.currency,
                    base: offer.price.base
                },
                paymentType: offer.policies.paymentType,
            }))
        };
        return parsedHotel;
    });
};

const getHotelsByCity = async (cityCode) => {
    try {
        const chainCodes = ['AC', 'HH', 'MC', 'HY', 'IC', 'BW', 'RD', 'SI', 'HI', 'NO', 'IB', 'WS', 'FS', 'RC', 'WY', 'CP'];

        const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city', {
            headers: {
                'Authorization': `Bearer ${config.accessToken}`,
            },
            params: {
                cityCode,
                chainCodes: chainCodes.join(','),
            },
            httpsAgent: agent
        });

        const hotelData = response.data.data; 
        const hotelIds = hotelData.slice(0, 50).map(hotel => hotel.hotelId);

        return hotelIds;
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        throw new Error('Failed to fetch hotels by city');
    }
};

const getHotelOffers = async (cityCode, adults, checkInDate, checkOutDate, roomQuantity, priceRange, currency) => {
    try {
        const hotelIds = await getHotelsByCity(cityCode);

        console.log('Sending request to Amadeus API with hotel IDs:', hotelIds);

        const response = await axios.get('https://test.api.amadeus.com/v3/shopping/hotel-offers', {
            headers: {
                'Authorization': `Bearer ${config.accessToken}`,
            },
            params: {
                hotelIds: hotelIds.join(','),
                adults,
                checkInDate,
                checkOutDate,
                roomQuantity,
                priceRange,
                currency
            },
            httpsAgent: agent
        });

        const parsedOffers = parseHotelOffers(response.data.data);
        return parsedOffers;
    } catch (error) {
        console.error('Error fetching hotel offers:', error);
        throw new Error('Failed to fetch hotel offers');
    }
};

const createHotel = async (hotelData, tripId) => {
    let createdHotel;
    try {
        // Create the hotel
        createdHotel = await Hotel.create(hotelData);
        
        // Parse and validate hotel price
        const hotelPrice = parseFloat(hotelData.offers[0].price.base);
        if (isNaN(hotelPrice)) {
            throw new Error(`Invalid price format: ${hotelData.offers[0].price.base}`);
        }

        // Log the tripId
        console.log(`Fetching trip with ID: ${tripId}`);

        const trip = await Trip.findById(tripId);
        if (!trip) {
            // Log all trips for debugging
            const allTrips = await Trip.find({});
            console.log('All trips in the database:', allTrips);

            console.error(`Trip with ID ${tripId} not found`);
            throw new Error('Trip not found');
        }

        trip.hotels.push(createdHotel._id);
        trip.totalPrice += hotelPrice;

        await trip.save();

        return trip._id;
    } catch (err) {
        if (createdHotel) {
            await Hotel.findByIdAndDelete(createdHotel._id);
        }
        console.error('Error creating hotel and associating with trip:', err);
        throw new Error('Failed to create hotel and associate with trip');
    }
};

module.exports = {
    getHotelsByCity,
    getHotelOffers,
    createHotel
};