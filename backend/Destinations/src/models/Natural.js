const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for coordinates
const coordinateSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

// Define schema for working hours
const workingHoursSchema = new Schema({
  dayOfWeek: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true }
});

// Define main natural schema
const naturalSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: { type: coordinateSchema, required: true },
  dateEstablished: { type: Date, required: false },
  website: { type: String, required: false },
  workingHours: [workingHoursSchema],
  description: { type: String, required: true },
  highlights: { type: String, required: false },
  gallery: [{ type: String, required: false }],
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true }
});

// Export the model
module.exports = mongoose.model('Natural', naturalSchema);