const fs = require('fs');
const path = require('path');

const getDestinations = () => {
    const filePath = path.join(__dirname, '../../countries.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
};

module.exports = {
    getDestinations
};