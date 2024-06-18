// profileController.js
const profileService = require('../services/profileService');

async function getProfile(req, res) {
  const result = await profileService.getUserProfile(req.user.id);
  res.status(result.status).json(result.user);
}

async function checkLoggedIn(req, res) {
  const result = await profileService.checkLoggedIn(req);
  res.status(result.status).json(result.user);
}

async function updateProfile(req, res) {
  const userId = req.user.id;
  const updatedData = req.body;
  const result = await profileService.updateProfile(userId, updatedData);
  res.status(result.status).json(result.user);
}

module.exports = {
  getProfile,
  checkLoggedIn,
  updateProfile,
};