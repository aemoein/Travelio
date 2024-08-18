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

//Routes
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const socialRoutes = require('./routes/socialRoutes');
const postRoutes = require('./routes/postRoutes');
const timelineRoutes = require('./routes/timelineRoutes');
const createRoutes = require('./routes/createRoutes');

const cityRoutes = require('./src/routes/cityRoutes')
const config = require('./src/config/config');
const weatherRoutes = require('./src/routes/weatherRoutes');

const tripRoutes = require('./src/routes/tripRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');

const challengeRoutes = require('./src/routes/challengeRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

const imageRoutes = require('./routes/imageRoutes');

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

//user routes
app.use('/users/auth', authRoutes);
app.use('/users/profile', authMiddleware, profileRoutes);

//social routes
app.use('/social/create', createRoutes);
app.use('/social/', authMiddleware, socialRoutes);
app.use('/social/posts', authMiddleware, postRoutes);
app.use('/social/timeline', authMiddleware, timelineRoutes);

//destination routes
app.use('/destinations/', destinationRoutes);
app.use('/destinations/city', cityRoutes);
app.use('/destinations/weather', weatherRoutes);

//trip routes
app.use('/trip', tripRoutes);

//payment routes
app.use('/payment', paymentRoutes);

//challenge routes
app.use('/challenges', challengeRoutes);
app.use('/challenges/profiles', ChallengeProfileRoutes);

//image recognition routes
app.use('/image', imageRoutes);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
