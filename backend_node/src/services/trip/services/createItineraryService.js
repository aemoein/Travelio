const Itinerary = require('../models/Itinerary');
const Trip = require('../models/Trip');

const createItinerary = async (itineraryData, tripId) => {
    let createdItinerary;

    try {
        console.log("data: ", itineraryData)
        for (let i = 0; i < itineraryData.length; i++) {
            itineraryData[i].day = i + 1;
        }

        console.log('Creating itinerary with data:', itineraryData);

        createdItinerary = await Itinerary.create(itineraryData);

        console.log('Created itinerary:', createdItinerary);

        const trip = await Trip.findById(tripId);
        if (!trip) {
            console.error(`Trip with ID ${tripId} not found`);
            throw new Error('Trip not found');
        }

        console.log('Found trip:', trip);

        if (!trip.itinerary) {
            trip.itinerary = [];
        }

        trip.itinerary.push(createdItinerary._id);

        await trip.save();

        console.log('Successfully created itinerary and associated with trip:', tripId);
        return tripId;

    } catch (err) {
        if (createdItinerary) {
            await Itinerary.findByIdAndDelete(createdItinerary._id);
        }
        console.error('Error creating itinerary and associating with trip:', err);
        throw new Error('Failed to create itinerary and associate with trip');
    }
};

module.exports = {
    createItinerary
};