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
    console.log(`Loading cities from JSON file: ${name}`);
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

async function addFoodToCity(cityId, foodData) {
  try {
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error('City not found');
    }
    city.foods.push(foodData);
    await city.save();
    return city;
  } catch (error) {
    throw new Error(`Failed to add food: ${error.message}`);
  }
}

// Function to add restaurant to a city
async function addRestaurantToCity(cityId, restaurantData) {
  try {
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error('City not found');
    }
    city.restaurants.push(restaurantData);
    await city.save();
    return city;
  } catch (error) {
    throw new Error(`Failed to add restaurant: ${error.message}`);
  }
}

// Function to add hotel to a city
async function addHotelToCity(cityId, hotelData) {
  try {
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error('City not found');
    }
    city.hotels.push(hotelData);
    await city.save();
    return city;
  } catch (error) {
    throw new Error(`Failed to add hotel: ${error.message}`);
  }
}

// Function to add transportation to a city
async function addTransportationToCity(cityId, transportationData) {
  try {
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error('City not found');
    }
    city.transportation.push(transportationData);
    await city.save();
    return city;
  } catch (error) {
    throw new Error(`Failed to add transportation: ${error.message}`);
  }
}

//loadCityDataFromFile('paris').then((result) => console.log(result.message)).catch((error) => console.error(error.message));

module.exports = {
  getAllCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
  loadCityDataFromFile,
  addFoodToCity,
  addRestaurantToCity,
  addHotelToCity,
  addTransportationToCity,
};
