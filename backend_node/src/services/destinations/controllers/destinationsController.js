const { getDestinations, searchDestinations } = require('../services/destinationService');

const fetchDestinations = (req, res) => {
    try {
        const { query } = req.query; // Assuming query parameter for search
        let destinations;

        if (query) {
            destinations = searchDestinations(query);
        } else {
            destinations = getDestinations();
        }

        res.status(200).json(destinations);
    } catch (error) {
        console.error('Error fetching destinations:', error);
        res.status(500).json({ error: 'Failed to fetch destinations' });
    }
};

module.exports = {
    fetchDestinations
};