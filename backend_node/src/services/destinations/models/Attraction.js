const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

const workingHoursSchema = new Schema({
  dayOfWeek: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true }
});

const attractionSchema = new Schema({
  name: { type: String, required: true },
  picture: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: { type: coordinateSchema, required: true },
  dateOpened: { type: Date, required: false },
  website: { type: String, required: false },
  workingHours: [workingHoursSchema],
  description: { type: String, required: true },
  history: { type: String, required: false },
  gallery: [{ type: String, required: false }],
  city: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true }
});

module.exports = mongoose.model('Attraction', attractionSchema);