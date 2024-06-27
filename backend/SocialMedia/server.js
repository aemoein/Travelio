const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const authMiddleware = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');
const socialRouter = require('./src/routes/socialRoutes');
const postRouter = require('./src/routes/postRoutes');

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
app.use(helmet());
app.use(extractToken);
//app.use(authMiddleware);
app.use(errorMiddleware);

//Routes
app.use('/social',socialRouter);
app.use('/posts', postRouter);

// Connect to MongoDB
const DB_URL = process.env.MONGO_URI_REMOTE;
mongoose.connect(DB_URL).then(()=> {
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
const PORT = config.port || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
