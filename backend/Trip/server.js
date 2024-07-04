const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const extractToken = require('./src/middleware/extractToken');
const config = require('./src/config/config');
const routes = require('./src/routes/routes');
const cron = require('node-cron');
const { fetchAccessToken } = require('./src/middleware/accessTokenMiddleware');

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
    cookie: { secure: false }
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

app.use('/api', routes);

// Start the server
const PORT = config.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
