const City = require('../models/City');

// Get all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate('challenges');
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get city by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('challenges');
    if (city == null) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new city
exports.createCity = async (req, res) => {
  const city = new City({
    cityname: req.body.cityname,
    photo: req.body.photo,
    categories: req.body.categories,
    challenges: req.body.challenges
  });

  try {
    const newCity = await city.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
