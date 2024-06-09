const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: { type: String, default: '' },
  birthday: { type: Date },
  profilePic: { type: String, default: '' },
  bio: { type: String, default: '' },
  preferences: { type: [String], default: [] },
  nationality: { type: String, default: '' },
  mobileNumber: { type: String, default: '' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;