const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityname: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  challenges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  }],
  cityRef: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'City'
  }
});

const City = mongoose.model('City', citySchema);
module.exports = City;