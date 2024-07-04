const axios = require('axios');
const https = require('https');
const config = require('../config/config');

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
        const chainCodes = ['HH', 'HY', 'IC', 'SI', 'HI', 'NO', 'IB', 'WS', 'RC', 'WY', 'CP'];

        const chainCodes2 = ['AC', 'HH', 'MC', 'HY', 'IC', 'BW', 'RD', 'SI', 'HI', 'NO', 'IB', 'WS', 'FS', 'RC', 'WY', 'CP'];


        const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city', {
            headers: {
                'Authorization': `Bearer ${config.accessToken}`,
            },
            params: {
                cityCode,
                chainCodes: chainCodes2.join(','),
            },
            httpsAgent: agent
        });

        const hotelData = response.data.data; 
        const hotelIds = hotelData.slice(0, 50).map(hotel => hotel.hotelId);

        return hotelIds;
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        throw error;
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
        throw error;
    }
};

module.exports = {
    getHotelsByCity,
    getHotelOffers
};