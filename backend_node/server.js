const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const authMiddleware = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');
const cron = require('node-cron');
const { fetchAccessToken } = require('./src/middleware/accessTokenMiddleware');

// Routes
const authRoutes = require('./src/services/users/routes/authRoutes');
const profileRoutes = require('./src/services/users/routes/profileRoutes');
const socialRoutes = require('./src/services/social/routes/socialRoutes');
const postRoutes = require('./src/services/social/routes/postRoutes');
const timelineRoutes = require('./src/services/social/routes/timelineRoutes');
const createRoutes = require('./src/services/social/routes/createRoutes');
const cityRoutes = require('./src/services/destinations/routes/cityRoutes');
const destinationRoutes = require('./src/services/destinations/routes/destinationRoutes');
const weatherRoutes = require('./src/services/destinations/routes/weatherRoutes');
const tripRoutes = require('./src/services/trip/routes/tripRoutes');
const paymentRoutes = require('./src/services/payment/routes/paymentRoutes');
const challengeRoutes = require('./src/services/challenges/routes/challengeRoutes');
const challengeProfileRoutes = require('./src/services/challenges/routes/profileRoutes');
const imageRoutes = require('./src/services/imgrec/routes/imageRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://travelio-production.up.railway.app',
  'https://travelio-gold.vercel.app'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle OPTIONS requests
app.options('*', cors());

// Log the origin of each request
app.use((req, res, next) => {
  console.log(`Request Origin: ${req.headers.origin}`);
  next();
});

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

fetchAccessToken();

cron.schedule('*/15 * * * *', () => {
  fetchAccessToken();
});

// ROUTES
app.use('/users/auth', authRoutes);
app.use('/users/profile', authMiddleware, profileRoutes);
app.use('/social/create', createRoutes);
app.use('/social/main', authMiddleware, socialRoutes);
app.use('/social/posts', authMiddleware, postRoutes);
app.use('/social/timeline', authMiddleware, timelineRoutes);
app.use('/destinations', destinationRoutes);
app.use('/destinations/city', cityRoutes);
app.use('/destinations/weather', weatherRoutes);
app.use('/trip', tripRoutes);
app.use('/payment', paymentRoutes);
app.use('/challenges', challengeRoutes);
app.use('/challenges/profiles', challengeProfileRoutes);
app.use('/image', imageRoutes);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});