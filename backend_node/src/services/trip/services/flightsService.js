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

    console.log(`Requesting flights with parameters: ${JSON.stringify(updatedParams)}`);

    try {
        const response = await axios.get(url, { headers, params: updatedParams, httpsAgent: agent });

        console.log(`API Response Status: ${response.status}`);
        console.log(`API Response Data: ${JSON.stringify(response.data)}`);

        if (response.status !== 200) {
            throw new Error(`Unexpected response status: ${response.status}`);
        }

        const parsedData = parseFlightData(response.data);
        console.log(`Parsed Flight Data: ${JSON.stringify(parsedData)}`);

        return parsedData;
    } catch (error) {
        if (error.response) {
            console.error(`API Error Response Status: ${error.response.status}`);
            console.error(`API Error Response Data: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error(`Request Error: ${error.message}`);
        }

        console.error('Detailed Error Stack:', error.stack);
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

    return flights.map(flight => {
        try {
            return {
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
            };
        } catch (error) {
            console.error('Error parsing flight data:', error.message);
            console.error('Flight Data:', JSON.stringify(flight));
            return null;
        }
    }).filter(flight => flight !== null);
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
            try {
                await Flight.findByIdAndDelete(createdFlight._id);
            } catch (deleteError) {
                console.error('Error deleting flight after failure:', deleteError.message);
            }
        }
        console.error('Failed to create flight and associate with trip:', err.message);
        throw new Error('Failed to create flight and associate with trip');
    }
}

module.exports = {
    getFlights,
    createFlight
};