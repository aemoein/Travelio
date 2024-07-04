const axios = require('axios');
const https = require('https');
const config = require('../config/config');

const agent = new https.Agent({
    rejectUnauthorized: false // Ignore SSL certificate errors
});

async function getFlights(params) {
    const url = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
    const headers = {
        'Authorization': `Bearer ${config.accessToken}`,
    };

    // Add max and currencyCode parameters
    const updatedParams = {
        ...params,
        max: 10,
        currencyCode: 'USD'
    };

    try {
        const response = await axios.get(url, { headers, params: updatedParams, httpsAgent: agent });

        // Parse and transform the response
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

                console.log('Carrier:', {
                    code: segment.carrierCode,
                    name: carriers[segment.carrierCode] || `Unknown Carrier (${segment.carrierCode})`
                });
                console.log('Baggage:', {
                    description: baggageDescription,
                    quantity: baggageQuantity
                });
                console.log('Flight Number:', `${segment.carrierCode}${segment.number}`);

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

module.exports = {
    getFlights
};