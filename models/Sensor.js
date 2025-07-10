const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  humidity: {
    type: Number,
    required: true,
  },
  soilMoisture: {
    type: Number,
    required: true,
  },
  lightIntensity: {
    type: Number,
    required: true,
  },
  batteryLevel: {
    type: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sensor', sensorSchema);