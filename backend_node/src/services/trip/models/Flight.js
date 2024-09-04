const mongoose = require('mongoose');

const SegmentSchema = new mongoose.Schema({
  id: String,
  origin: {
    flightPlaceId: String,
    displayCode: String,
    name: String,
    country: String,
  },
  destination: {
    flightPlaceId: String,
    displayCode: String,
    name: String,
    country: String,
  },
  departure: Date,
  arrival: Date,
  durationInMinutes: Number,
  flightNumber: String,
  marketingCarrier: {
    id: Number,
    name: String,
    alternateId: String,
  },
  operatingCarrier: {
    id: Number,
    name: String,
    alternateId: String,
  },
});

const LegSchema = new mongoose.Schema({
  id: String,
  origin: {
    id: String,
    name: String,
    city: String,
    country: String,
  },
  destination: {
    id: String,
    name: String,
    city: String,
    country: String,
  },
  durationInMinutes: Number,
  stopCount: Number,
  departure: Date,
  arrival: Date,
  carriers: {
    marketing: [
      {
        id: Number,
        logoUrl: String,
        name: String,
      },
    ],
  },
  segments: [SegmentSchema],
});

const flightSchema = new mongoose.Schema({
  id: String,
  price: {
    raw: Number,
    formatted: String,
    pricingOptionId: String,
  },
  legs: [LegSchema],
  isSelfTransfer: Boolean,
  farePolicy: {
    isChangeAllowed: Boolean,
    isCancellationAllowed: Boolean,
  },
  tags: [String],
  score: Number,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;