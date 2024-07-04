// flightController.js
const { getFlights } = require('../services/flightsService');

async function searchFlights(req, res) {
    try {
        const flights = await getFlights(req.query);
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    searchFlights
};