const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../resources/countries.json');
let destinations = [];

// Function to load destinations from JSON file
const loadDestinations = () => {
    console.log('Loading destinations from JSON file...');
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        destinations = JSON.parse(data);
        console.log(`Loaded ${destinations.length} destinations`);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
    }
};

// Function to get all destinations
const getDestinations = (searchQuery = '') => {
    if (searchQuery.trim() === '') {
        return destinations;
    } else {
        return searchDestinations(searchQuery);
    }
};

// Function to search destinations based on search query
const searchDestinations = (searchQuery) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return destinations.filter(destination => {
        // Customize this filtering logic based on your requirements
        return (
            destination.region.toLowerCase().includes(normalizedQuery) ||
            destination.name.toLowerCase().includes(normalizedQuery)
            // Add more fields if needed
        );
    });
};

// Call loadDestinations when the server starts
loadDestinations();

module.exports = {
    getDestinations,
    searchDestinations
};