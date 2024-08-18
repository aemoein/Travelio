// models/model.js

const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const path = require('path');

const imgHeight = 224;
const imgWidth = 224;

let model;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('file://./model_architecture/model.json');
  }
  return model;
};

const predictImage = async (imgBuffer) => {
  const image = await Jimp.read(imgBuffer);
  image.resize(imgWidth, imgHeight);
  const imgTensor = tf.browser.fromPixels(image.bitmap).div(255.0).expandDims(0);

  const loadedModel = await loadModel();
  const predictions = await loadedModel.predict(imgTensor).data();
  const classIdx = predictions.indexOf(Math.max(...predictions));

  return classIdx;
};

module.exports = {
  predictImage
};