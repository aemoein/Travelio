const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./src/middleware/authMiddleware');
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
app.use(errorMiddleware);

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//Routes
app.use('/users/auth', authRoutes);
app.use('/users/profile', authMiddleware, profileRoutes);

//social routes
app.use('/social/create', createRoutes);
app.use('/social/', authMiddleware, socialRouter);
app.use('/social/posts', authMiddleware, postRouter);
app.use('/social/timeline', authMiddleware, timelineRouter);

//destination routes
app.use('/destinations/', destinationRoutes);
app.use('/destinations/city', cityRoutes);
app.use('/destinations/weather', weatherRoutes);

//trip routes
app.use('/trip', routes);

//payment routes
app.use('/payment', paymentRouter);

//challenge routes

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
