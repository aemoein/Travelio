const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const authMiddleware = require('./src/middleware/authMiddleware');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');
const profileRoutes = require('./src/routes/profileRoutes');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config({ path: path.join(process.cwd(), "..", ".env") });

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
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

app.use('/Assets/ProfilePics', express.static('../../assets/ProfilePics'));

console.log('MongoDB local URI:', config.mongoURIS);
console.log('MongoDB remote URI:', config.mongoURI);
console.log('Server port:', config.port);
console.log('JWT Secret Key:', config.jwtSecret);

// Connect to MongoDB
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  
//Routes
app.use('/auth', authRoutes);
app.use('/profile', authMiddleware, profileRoutes);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
