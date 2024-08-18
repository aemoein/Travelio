const Profile = require('../models/Profile');

// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate('solvedChallenges');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('solvedChallenges');
    if (profile == null) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get profile by username
exports.getProfileByUsername = async (req, res) => {
  try {
    const profile = await Profile.findOne({ username: req.query.username }).populate('solvedChallenges');
    if (profile == null) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new profile
// Create a new profile
exports.createProfile = async (req, res) => {
  const profile = new Profile({
    username: req.body.username,
  });

  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a profile
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    if (req.body.username != null) profile.username = req.body.username;
    if (req.body.rank != null) profile.rank = req.body.rank;
    if (req.body.points != null) profile.points = req.body.points;
    if (req.body.titles != null) profile.titles = req.body.titles;
    if (req.body.solvedChallenges != null) {
      profile.solvedChallenges = req.body.solvedChallenges;
      profile.numberOfSolvedChallenges = req.body.solvedChallenges.length;
    }

    const updatedProfile = await profile.save();
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    await profile.remove();
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};