const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const { verifyToken } = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');
const profileRoutes = require('./src/routes/profileRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(session({
    secret: config.jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(extractToken);
app.use(errorMiddleware);

app.use('/Assets/ProfilePics', express.static(path.join(__dirname, '../../assets/ProfilePics')));

console.log('MongoDB local URI:', config.mongoURIS);
console.log('MongoDB remote URI:', config.mongoURI);
console.log('Server port:', config.port);
console.log('JWT Secret Key:', config.jwtSecret);

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

//Routes
app.use('/auth', authRoutes);
app.use('/profile', verifyToken, profileRoutes);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
