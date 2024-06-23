const cityService = require('../services/cityService');

// Get all cities
const getAllCities = async (req, res) => {
  try {
    const cities = await cityService.getAllCities();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities', error });
  }
};

// Get a single city by ID
const getCityById = async (req, res) => {
  try {
    const city = await cityService.getCityById(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching city', error });
  }
};

// Create a new city
const createCity = async (req, res) => {
  try {
    const city = await cityService.createCity(req.body);
    res.status(201).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error creating city', error });
  }
};

// Update an existing city by ID
const updateCity = async (req, res) => {
  try {
    const city = await cityService.updateCity(req.params.id, req.body);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error updating city', error });
  }
};

// Delete a city by ID
const deleteCity = async (req, res) => {
  try {
    const city = await cityService.deleteCity(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting city', error });
  }
};

// Load city data from JSON file
const loadCityDataFromFile = async (req, res) => {
  try {
    const result = await cityService.loadCityDataFromFile(req.params.name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error loading city data from JSON file', error });
  }
};

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  loadCityDataFromFile
};
