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

async function getPreferences(req, res) { 
  const userId = req.user.id;
  const result = await profileService.getUserPreferences(userId);
  res.status(result.status).json(result.preferences);
}

async function getProfileData(req, res) { 
  const { userId } = req.params;
  console.log("userid suii: ",userId);
  const result = await profileService.getProfileData(userId);
  res.status(result.status).json(result.profileData);
}

module.exports = {
  getProfile,
  checkLoggedIn,
  updateProfile,
  getPreferences,
  getProfileData
};