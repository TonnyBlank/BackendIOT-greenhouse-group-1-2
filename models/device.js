const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  type: {
    type: String,
    enum: ['greenhouse', 'field', 'indoor'],
    default: 'greenhouse'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  thresholdSettings: {
    temperatureMin: { type: Number, default: 15 },
    temperatureMax: { type: Number, default: 30 },
    humidityMin: { type: Number, default: 40 },
    humidityMax: { type: Number, default: 80 },
    soilMoistureMin: { type: Number, default: 30 },
    lightIntensityMin: { type: Number, default: 200 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Device', deviceSchema);