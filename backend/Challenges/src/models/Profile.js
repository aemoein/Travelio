const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  rank: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  titles: {
    type: [String], // Array of titles
  },
  solvedChallenges: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  }],
  numberOfSolvedChallenges: {
    type: Number,
    default: 0
  }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
