const itinerariesService = require('../services/itinerariesService');

async function create(req, res) {
    try {
        const tripRequest = req.body;
        const itinerary = await itinerariesService.generateItinerary(tripRequest);
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    create,
};