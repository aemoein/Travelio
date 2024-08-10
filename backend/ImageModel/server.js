const express = require('express');
const cors = require('cors');
const multer = require('multer');
const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const app = express();
const port = 5555;

app.use(cors());
app.use(morgan('dev'));

// Load model architecture and weights
const loadModel = async () => {
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

// Load class indices from the dataset directory
const datasetPath = path.join(__dirname, 'CHALLNGE_DATA-SET');
const classIndices = {};

// Read the dataset directory to map class names to indices
fs.readdirSync(datasetPath).forEach((folder, index) => {
  const folderPath = path.join(datasetPath, folder);
  if (fs.statSync(folderPath).isDirectory()) {
    classIndices[index-1] = folder; // Map index to class name (starting from 0)
  }
});

// Log the class indices for debugging
console.log("Class Indices:", classIndices);

const predictImage = async (imgBuffer) => {
  const image = await Jimp.read(imgBuffer);
  image.resize(imgWidth, imgHeight); // Resize to the input size of the model
  const imgTensor = tf.browser.fromPixels(image.bitmap).div(255.0).expandDims(0); // Normalize pixel values
  
  const predictions = await model.predict(imgTensor).data(); // Get predictions
  console.log('Raw Predictions:', predictions); // Log the predictions array

  const classIdx = predictions.indexOf(Math.max(...predictions)); // Get the class index of the highest prediction
  return classIdx;
};

app.post('/api/predict/', upload.single('file'), async (req, res) => {
  try {
    const imgBuffer = req.file.buffer;
    const classIdx = await predictImage(imgBuffer);
    
    // Log the predicted class index
    console.log('Predicted Class Index:', classIdx);

    // Get the class label from the classIndices mapping
    const predictedClass = classIndices[classIdx] || 'Unknown';
    res.json({ predicted_class: predictedClass });
  } catch (error) {
    console.error("Error during prediction:", error);
    res.status(500).send(error.toString());
  }
});

app.get('/api/test/', (req, res) => {
  res.send('Connection is established successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});