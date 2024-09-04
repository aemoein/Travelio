const { searchFlights, createFlight } = require('../services/flightService');

const getFlights = async (req, res) => {
  try {
    const params = req.query;

    const flightData = await searchFlights(params);
    res.json(flightData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flight data', error: error.message });
  }
};

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
};

module.exports = { getFlights, createFlightControl };