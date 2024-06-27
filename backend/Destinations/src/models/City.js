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
  picture: { type: String, required: true },
  link: { type: String }
});

const hotelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  link: { type: String }
});

const transportationSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  link: { type: String }
});

// Define main city schema
const CitySchema = new Schema({
  name: { type: String, required: true },
  genre: [{ type: String, required: true }],
  picture: { type: String, required: true },
  hero: { type: String, required: true },
  description: { type: String, required: true },
  population: { type: Number, default: 0 },
  country: { type: String, required: true },
  region: { type: String, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
  timezone: { type: String, required: true },
  foods: [foodSchema],
  restaurants: [restaurantSchema],
  hotels: [hotelSchema],
  transportation: [transportationSchema],
  gallery: [{ type: String }]
});

CitySchema.index({ name: 1, country: 1, region: 1 }, { unique: true });

module.exports = mongoose.model('City', CitySchema);