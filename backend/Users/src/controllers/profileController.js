// profileController.js
const profileService = require('../services/profileService');

async function getProfile(req, res) {
  const result = await profileService.getUserProfile(req.session.userId);
  res.status(result.status).json(result.user);
}

async function checkLoggedIn(req, res) {
  const result = await profileService.checkLoggedIn(req.session.userId);
  res.status(result.status).json(result.user);
}

module.exports = {
  getProfile,
  checkLoggedIn,
};