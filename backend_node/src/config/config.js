// config.js
require('dotenv').config();

const config = {
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
    accessToken: 'giYBImlXAyvg5KGy8MJoB62IAYRM', // Replace with env variable if it's sensitive
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,

    // Google API Key
    googleApiKey: process.env.GOOGLE_API_KEY,

    host: process.env.HOST,
    frontend: process.env.FRONTEND,
};

// Log the configuration values
console.log('Configuration values:');
console.log(`Mongo URI Local: ${config.mongoURIS}`);
console.log(`Mongo URI Remote: ${config.mongoURI}`);
console.log(`Port: ${config.port}`);
console.log(`JWT Secret: ${config.jwtSecret}`);
console.log(`Cloudinary API Key: ${config.cloudinaryApiKey}`);
console.log(`Cloudinary API Secret: ${config.cloudinaryApiSecret}`);
console.log(`Cloudinary Cloud Name: ${config.cloudinaryCloudName}`);
console.log(`Access Token: ${config.accessToken}`);
console.log(`Client ID: ${config.clientId}`);
console.log(`Client Secret: ${config.clientSecret}`);
console.log(`Google API Key: ${config.googleApiKey}`);
console.log(`Host: ${config.host}`);
console.log(`Frontend: ${config.frontend}`);

module.exports = config;