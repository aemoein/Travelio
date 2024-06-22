const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../../Countries.json');
let destinations = []; // Initialize an empty array to store destinations

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

// Call loadDestinations when the server starts
loadDestinations();

// Function to get the first destination
const getDestinations = () => {
    return destinations;
};

module.exports = {
    getDestinations
};