const axios = require('axios');
const https = require('https');
const config = require('../../../config/config');
const Flight = require('../models/Flight');
const Trip = require('../models/Trip');

const agent = new https.Agent({
    rejectUnauthorized: false
});

async function getFlights(params) {
    const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const headers = {
        'Authorization': `Bearer ${config.accessToken}`,
    };
    const updatedParams = {
        ...params,
        max: 10,
        currencyCode: 'USD'
    };

    try {
        const response = await axios.get(url, { headers, params: updatedParams, httpsAgent: agent });

        const parsedData = parseFlightData(response.data);
        console.log(parsedData);

        return parsedData;
    } catch (error) {
        console.error('Error fetching flights:', error.response ? error.response.status : error.message);
        throw error;
    }
}

// Function to parse and transform flight data
function parseFlightData(data) {
    const { data: flights, dictionaries } = data;
    const { locations, aircraft, carriers } = dictionaries;

    if (!flights || !Array.isArray(flights)) {
        console.error('No flights data found or invalid data format.');
        return [];
    }

    return flights.map(flight => ({
        id: flight.id,
        price: {
            currency: flight.price.currency,
            total: flight.price.total
        },
        itineraries: flight.itineraries.map(itinerary => ({
            segments: itinerary.segments.map(segment => {
                const travelerPricing = segment.travelerPricings && segment.travelerPricings.length > 0 ? segment.travelerPricings[0] : null;
                const fareDetail = travelerPricing ? travelerPricing.fareDetailsBySegment.find(fare => fare.segmentId === segment.id) : null;
                const baggageDescription = fareDetail ? fareDetail.amenities.find(amenity => amenity.amenityType === 'BAGGAGE').description : 'No baggage info';
                const baggageQuantity = fareDetail ? fareDetail.includedCheckedBags.quantity : 0;

                return {
                    departure: {
                        airportCode: segment.departure.iataCode,
                        terminal: segment.departure.terminal,
                        time: segment.departure.at
                    },
                    arrival: {
                        airportCode: segment.arrival.iataCode,
                        terminal: segment.arrival.terminal,
                        time: segment.arrival.at
                    },
                    carrier: {
                        code: segment.carrierCode,
                        name: carriers[segment.carrierCode] || `Unknown Carrier (${segment.carrierCode})`
                    },
                    flightNumber: `${segment.carrierCode}${segment.number}`,
                    aircraft: aircraft[segment.aircraft.code] || `Unknown Aircraft (${segment.aircraft.code})`,
                    baggage: {
                        description: baggageDescription,
                        quantity: baggageQuantity
                    }
                };
            })
        }))
    }));
}

async function createFlight(flightData, userId) {
    let createdFlight;
    try {
        // Create the flight
        createdFlight = await Flight.create(flightData);

        // Calculate total price of the trip
        const totalPrice = flightData.price.total;

        // Create a new trip object
        const tripData = {
            flights: [createdFlight._id],
            userId: userId,
            totalPrice: totalPrice
        };
        const createdTrip = await Trip.create(tripData);

        return createdTrip._id;
    } catch (err) {
        if (createdFlight) {
            await Flight.findByIdAndDelete(createdFlight._id);
        }
        throw new Error('Failed to create flight and associate with trip');
    }
}

module.exports = {
    getFlights,
    createFlight
};