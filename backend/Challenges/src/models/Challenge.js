const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  tasks: {
    type: [String],
    required: true
  },
  targets: {
    type: [String],
    required: true
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  }
});

const Challenge = mongoose.model('Challenge', challengeSchema);
module.exports = Challenge;
