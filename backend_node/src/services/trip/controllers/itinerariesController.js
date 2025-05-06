const itinerariesService = require('../services/itinerariesService');
const createItineraryService = require('../services/createItineraryService');

async function create(req, res) {
    try {
        const { destination, start_date, end_date, interests, adults, hotel } = req.body;
        const tripRequest = { destination, start_date, end_date, interests, adults, hotel };

        // Generate itinerary from the service
        const itinerary = await itinerariesService.generateItinerary(tripRequest);

        // Return itinerary in JSON format
        res.json(itinerary);
    } catch (error) {
        console.error("Error creating itinerary:", error);
        // If it's a validation or specific error, respond with 400
        res.status(500).json({ error: error.message });
    }
}

async function saveItinerary(req, res) { 
    try {
        const { itineraryData, tripId } = req.body; // Destructure body for readability

        if (!itineraryData || !tripId) {
            return res.status(400).json({ error: "Missing required fields: itineraryData or tripId" });
        }

        // Save the itinerary via service
        const createdTripId = await createItineraryService.createItinerary(itineraryData, tripId);
        res.status(201).json({ tripId: createdTripId });
    } catch (error) {
        console.error("Error saving itinerary:", error);
        // You might want to send specific error codes based on error types (400, 500, etc.)
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    create,
    saveItinerary
};