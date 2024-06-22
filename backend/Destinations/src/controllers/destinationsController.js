const { getDestinations } = require('../services/destinationsService');

const fetchDestinations = (req, res) => {
    try {
        const destinations = getDestinations();
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
};

module.exports = {
    fetchDestinations
};
