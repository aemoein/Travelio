// config.js
require('dotenv').config();

module.exports = {
    // MongoDB connection URLs
    mongoURIS: process.env.MONGO_URI_LOCAL,
    mongoURI: process.env.MONGO_URI_REMOTE,

    // Port for the server to listen on
    port: process.env.PORT || 3001,

    // JWT Secret Key
    jwtSecret: process.env.JWT_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    clientId: process.env.CLIENT_ID,  
    clientSecret: process.env.CLIENT_SECRET,
    googleApiKey: process.env.GOOGLE_API_KEY,
};
