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
    jwtSecret: process.env.JWT_SECRET,

    // Cloudinary credentials
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,

    // Amadeus credentials
    accessToken: '',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,

    // Google API Key
    googleApiKey: process.env.GOOGLE_API_KEY,

    host: process.env.HOST,
    frontend: process.env.FRONTEND,
};