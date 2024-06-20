const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./src/middleware/authMiddleware');//`${__dirname}/middleware/authMiddleware`
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure: true in production with HTTPS
}));
app.use(extractToken);
app.use(authMiddleware);
app.use(errorMiddleware);

// Connect to MongoDB
const DB = process.env.MONGO_URI_REMOTE;
mongoose.connect(DB).then(()=> {
    console.log('DB connection successfully');
}).catch(err => {
    console.log(err);
    console.log('DB connection failed');
    process.exit(1);
});

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
