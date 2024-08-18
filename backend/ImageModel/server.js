// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const imageRoutes = require('./src/routes/imageRoutes');

const app = express();
const port = 5555;

app.use(cors());
app.use(morgan('dev'));
app.use('/api', imageRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});