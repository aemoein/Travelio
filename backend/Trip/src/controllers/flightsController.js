const { getFlights, createFlight } = require('../services/flightsService');

async function searchFlights(req, res) {
    try {
        const flights = await getFlights(req.query);
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createFlightControl(req, res) {
    try {
        const flightData = req.body;
        const userId = req.user.id;

        const createdTripId = await createFlight(flightData, userId);

        res.status(201).json({ tripId: createdTripId });
    } catch (error) {
        console.error('Error creating flight and associating with trip:', error);
        res.status(500).json({ error: 'Failed to create flight and associate with trip' });
    }
}

module.exports = {
    searchFlights,
    createFlightControl
};