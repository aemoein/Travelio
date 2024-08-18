// controllers/imageController.js

const { predictImage } = require('../models/model');

const classIndices = {
  '0': 'BIG_BEN',
  '1': 'COLOSSEUM',
  '2': 'EIFFLE_TOWER',
  '3': 'GIZA_PYRAMIDS',
  '4': 'KHALIFA_TOWER',
  '5': 'LIBERTY_STATUE',
  '6': 'PISA_TOWER'
};

const predict = async (req, res) => {
  try {
    const imgBuffer = req.file.buffer;
    const classIdx = await predictImage(imgBuffer);

    const predictedClass = classIndices[classIdx] || 'Unknown';
    res.json({ predicted_class: predictedClass });
  } catch (error) {
    res.status(500).send(error.toString());
  }
};

const testConnection = (req, res) => {
  res.send('Connection is established successfully!');
};

module.exports = {
  predict,
  testConnection
};