const tripService = require('../services/tripService');

function getTripById(req, res) {
    const { tripId } = req.query;

    tripService.getTripByIdWithDetails(tripId)
        .then(tripDetails => {
            res.json(tripDetails);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: err.message });
        });
}

module.exports = {
    getTripById
};
