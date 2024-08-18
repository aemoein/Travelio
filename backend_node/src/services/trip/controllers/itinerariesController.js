const itinerariesService = require('../services/itinerariesService');
const createItineraryService = require('../services/createItineraryService');

async function create(req, res) {
    try {
        const tripRequest = req.body;
        const itinerary = await itinerariesService.generateItinerary(tripRequest);
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function saveItinerary(req, res) { 
    try {
        const itineraryData = req.body;
        const tripId = req.body.tripId;

        const createdTripId = await createItineraryService.createItinerary(itineraryData, tripId);
        res.status(201).json({ tripId: createdTripId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    saveItinerary
};