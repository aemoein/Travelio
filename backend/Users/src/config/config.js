// config.js
require('dotenv').config();

console.log('MONGO_URI_LOCAL:', process.env.MONGO_URI_LOCAL);
console.log('MONGO_URI_REMOTE:', process.env.MONGO_URI_REMOTE);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

module.exports = {
    // MongoDB connection URLs
    mongoURIS: process.env.MONGO_URI_LOCAL,
    mongoURI: process.env.MONGO_URI_REMOTE,

    // Port for the server to listen on
    port: process.env.PORT || 3001,

    // JWT Secret Key
    jwtSecret: process.env.JWT_SECRET
};