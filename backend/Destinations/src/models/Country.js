const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  population: { type: Number, required: true },
  language: { type: String, required: true },
  currency: { type: String, required: true },
  Contienent: { type: String, required: true },
  region: { type: String, required: true },
  timezone: { type: String, required: true },
  capital: { type: String, required: true },
  funfacts: [{ type: String, required: true }],
  gallery: [{ type: String, required: false }],
});

module.exports = mongoose.model('Country', CountrySchema);