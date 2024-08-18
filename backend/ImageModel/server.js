const express = require('express');
const cors = require('cors');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan'); // Import Morgan

const app = express();
const port = 5555;

app.use(cors());
app.use(morgan('dev')); // Use Morgan for logging

// Load model architecture and weights
const loadModel = async () => {
  // Update the path to point to the correct directory
  const model = await tf.loadLayersModel('file://./model_architecture/model.json');
  return model;
};

const imgHeight = 224;
const imgWidth = 224;

// Middleware to handle file uploads
const upload = multer();

// Load the model
let model;
loadModel().then((loadedModel) => {
  model = loadedModel;
}).catch(err => {
  console.error("Error loading model:", err);
});

const predictImage = async (imgBuffer) => {
  const image = await Jimp.read(imgBuffer);
  image.resize(imgWidth, imgHeight);
  const imgTensor = tf.browser.fromPixels(image.bitmap).div(255.0).expandDims(0);
  
  const predictions = await model.predict(imgTensor).data();
  const classIdx = predictions.indexOf(Math.max(...predictions));
  
  return classIdx;
};

app.post('/api/predict/', upload.single('file'), async (req, res) => {
  try {
    const imgBuffer = req.file.buffer;
    const classIdx = await predictImage(imgBuffer);
    
    // Map class index to class label
    const classIndices = {
      '0': 'BIG_BEN',
      '1': 'COLOSSEUM',
      '2': 'EIFFLE_TOWER',
      '3': 'GIZA_PYRAMIDS',
      '4': 'KHALIFA_TOWER',
      '5': 'LIBERTY_STATUE',
      '6': 'PISA_TOWER'
    };
    
    const predictedClass = classIndices[classIdx] || 'Unknown';
    res.json({ predicted_class: predictedClass });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get('/api/test/', (req, res) => {
  res.send('Connection is established successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});