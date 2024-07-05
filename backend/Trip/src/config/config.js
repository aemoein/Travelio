// config.js
require('dotenv').config();

module.exports = {
    mongoURIS: process.env.MONGO_URI_LOCAL,
    mongoURI: process.env.MONGO_URI_REMOTE,
    port: process.env.PORT || 3003,
    jwtSecret: process.env.JWT_SECRET,
    accessToken: '',
    clientId: process.env.CLIENT_ID,  
    clientSecret: process.env.CLIENT_SECRET,
    googleApiKey: process.env.GOOGLE_API_KEY,
};
