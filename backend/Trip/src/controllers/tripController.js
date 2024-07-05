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

async function getTripsByUserId(req, res) {
    const userId = req.user.id;
    try {
        const trips = await tripService.getTripsByUserId(userId);
        res.json(trips);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch trips' });
    }
}

module.exports = {
    getTripById,
    getTripsByUserId
};
