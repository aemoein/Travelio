const fs = require('fs');
const City = require('../models/City');
const path = require('path');

// Fetch all cities
const getAllCities = async () => {
  return await City.find({});
};

// Fetch a single city by ID
const getCityById = async (id) => {
  return await City.findById(id);
};

// Create a new city with duplicate validation
const createCity = async (cityData) => {
  const { cityName, country, region } = cityData;
  
  const existingCity = await City.findOne({ cityName, country, region });
  if (existingCity) {
    throw new Error('City with the same name, country, and region already exists');
  }
  
  const newCity = new City(cityData);
  return await newCity.save();
};

// Update an existing city by ID
const updateCity = async (id, cityData) => {
  return await City.findByIdAndUpdate(id, cityData, { new: true });
};

// Delete a city by ID
const deleteCity = async (id) => {
  return await City.findByIdAndDelete(id);
};

// Load city data from JSON file and create cities with validation
const loadCityDataFromFile = async (name) => {
  try {
    name = name.toLowerCase().replace(' ', '-');
    const filePath = path.join(__dirname, `../../cities/${name}.json`); // Using path.join for file path
    const data = fs.readFileSync(filePath, 'utf8');
    const cities = JSON.parse(data);
    for (let city of cities) {
      await createCity(city);
    }
    return { message: 'Cities loaded successfully from JSON file' };
  } catch (error) {
    throw new Error('Error loading city data from JSON file: ' + error.message);
  }
};

//loadCityDataFromFile('paris').then((result) => console.log(result.message)).catch((error) => console.error(error.message));

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  loadCityDataFromFile
};
