const axios = require('axios');
const Flight = require('../legacy/Flight');
const Trip = require('../models/Trip');

const searchFlights = async (params) => {
  try {
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      travelClass,
      nonStop
    } = params;

    const translatedParams = {
      fromEntityId: originLocationCode,
      toEntityId: destinationLocationCode,
      departDate: departureDate,
      returnDate: returnDate,
      stops: nonStop === 'false' ? 'direct,1stop,2stops' : 'direct',
      adults: parseInt(adults, 10),
      cabinClass: travelClass.toLowerCase()
    };

    const response = await axios.get('https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip', {
      headers: {
        'X-Rapidapi-Key': '261c5895d4mshc41a587b49bb01ap18a48cjsn83eb753477fd',
        'X-Rapidapi-Host': 'sky-scanner3.p.rapidapi.com'
      },
      params: translatedParams
    });

    formattedResponse = formatFlightData(response.data.data.itineraries);
    console.log(formattedResponse);

    return formattedResponse;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw error;
  }
};

const formatFlightData = (itinerariesJson) => {
    const mapSegment = (segment) => ({
      id: segment.id,
      origin: {
        flightPlaceId: segment.origin.flightPlaceId,
        displayCode: segment.origin.displayCode,
        name: segment.origin.name,
        country: segment.origin.country,
      },
      destination: {
        flightPlaceId: segment.destination.flightPlaceId,
        displayCode: segment.destination.displayCode,
        name: segment.destination.name,
        country: segment.destination.country,
      },
      departure: new Date(segment.departure),
      arrival: new Date(segment.arrival),
      durationInMinutes: segment.durationInMinutes,
      flightNumber: segment.flightNumber,
      marketingCarrier: {
        id: segment.marketingCarrier.id,
        name: segment.marketingCarrier.name,
        alternateId: segment.marketingCarrier.alternateId,
      },
      operatingCarrier: {
        id: segment.operatingCarrier.id,
        name: segment.operatingCarrier.name,
        alternateId: segment.operatingCarrier.alternateId,
      },
    });
  
    const mapLeg = (leg) => ({
      id: leg.id,
      origin: {
        id: leg.origin.id,
        name: leg.origin.name,
        city: leg.origin.city,
        country: leg.origin.country,
      },
      destination: {
        id: leg.destination.id,
        name: leg.destination.name,
        city: leg.destination.city,
        country: leg.destination.country,
      },
      durationInMinutes: leg.durationInMinutes,
      stopCount: leg.stopCount,
      departure: new Date(leg.departure),
      arrival: new Date(leg.arrival),
      carriers: {
        marketing: leg.carriers.marketing.map((carrier) => ({
          id: carrier.id,
          logoUrl: carrier.logoUrl,
          name: carrier.name,
        })),
      },
      segments: leg.segments.map(mapSegment),
    });
  
    const mapItinerary = (itinerary) => ({
      id: itinerary.id,
      price: {
        raw: itinerary.price.raw,
        formatted: itinerary.price.formatted,
        pricingOptionId: itinerary.price.pricingOptionId,
      },
      legs: itinerary.legs.map(mapLeg),
      isSelfTransfer: itinerary.isSelfTransfer,
      farePolicy: {
        isChangeAllowed: itinerary.farePolicy.isChangeAllowed,
        isCancellationAllowed: itinerary.farePolicy.isCancellationAllowed,
      },
      tags: itinerary.tags,
      score: itinerary.score,
    });

    return itinerariesJson.map(mapItinerary);
};

async function createFlight(flightData, userId) {
  let createdFlight;
  try {
      // Create the flight
      createdFlight = await Flight.create(flightData);

      // Calculate total price of the trip
      const totalPrice = flightData.price.raw;

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
  
module.exports = { searchFlights, createFlight };