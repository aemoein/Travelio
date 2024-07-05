const Trip = require('../models/Trip');
const Flight = require('../models/Flight');
const Hotel = require('../models/Hotel');
const Itinerary = require('../models/Itinerary');

function getTripByIdWithDetails(tripId) {
    return Trip.findById(tripId)
        .populate('flights')
        .populate('hotels')
        .populate('itinerary')
        .exec()
        .then(trip => {
            if (!trip) {
                throw new Error('Trip not found');
            }

            const flightIds = trip.flights.map(flight => flight._id);
            const hotelIds = trip.hotels.map(hotel => hotel._id);
            const itineraryIds = trip.itinerary.map(itinerary => itinerary._id);

            return Promise.all([
                Flight.find({ _id: { $in: flightIds } }).exec(),
                Hotel.find({ _id: { $in: hotelIds } }).exec(),
                Itinerary.find({ _id: { $in: itineraryIds } }).exec()
            ]).then(([flights, hotels, itinerary]) => {
                const totalPrice = trip.totalPrice;

                return {
                    trip,
                    flights,
                    hotels,
                    itinerary,
                    totalPrice
                };
            });
        });
}

async function getTripsByUserId(userId) {
    try {
        const trips = await Trip.find({ userId: userId }).exec();
        return trips;
    } catch (error) {
        throw new Error('Failed to fetch trips for user');
    }
}

module.exports = {
    getTripByIdWithDetails,
    getTripsByUserId
};
