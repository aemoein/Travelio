const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  location: { type: String },
  birthday: { type: Date },
  profilePic: { type: String },
  bio: { type: String },
  preferences: { type: [String] },
  nationality: { type: String },
  mobileNumber: { type: String }
});

const User = mongoose.model('User', userSchema);

module.exports = User;