const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for foods, restaurants, hotels, and transportation
const foodSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true }
});

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true }
});

const hotelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true }
});

const transportationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true }
});

// Define main city schema
const CitySchema = new Schema({
  cityName: { type: String, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  population: { type: Number, required: false },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  region: { type: String, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
  timezone: { type: String, required: true },
  foods: [foodSchema],
  restaurants: [restaurantSchema],
  hotels: [hotelSchema],
  transportation: [transportationSchema],
  gallery: [{ type: String, required: false }],
});

// Export the model
module.exports = mongoose.model('City', CitySchema);