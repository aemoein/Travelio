const Challenge = require('../models/Challenge');

// Get all challenges
exports.getAllChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.find().populate('city');
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get challenge by ID
exports.getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate('city');
    if (challenge == null) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new challenge
exports.createChallenge = async (req, res) => {
  const challenge = new Challenge({
    title: req.body.title,
    description: req.body.description,
    points: req.body.points,
    photo: req.body.photo,
    tasks: req.body.tasks,
    targets: req.body.targets,
    city: req.body.city
  });

  try {
    const newChallenge = await challenge.save();
    res.status(201).json(newChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a challenge
exports.updateChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (challenge == null) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    if (req.body.title != null) challenge.title = req.body.title;
    if (req.body.description != null) challenge.description = req.body.description;
    if (req.body.points != null) challenge.points = req.body.points;
    if (req.body.photo != null) challenge.photo = req.body.photo;
    if (req.body.tasks != null) challenge.tasks = req.body.tasks;
    if (req.body.targets != null) challenge.targets = req.body.targets;
    if (req.body.city != null) challenge.city = req.body.city;

    const updatedChallenge = await challenge.save();
    res.json(updatedChallenge);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a challenge
exports.deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (challenge == null) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    await challenge.remove();
    res.json({ message: 'Challenge deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
