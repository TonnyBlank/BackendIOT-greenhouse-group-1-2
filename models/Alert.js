const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['temperature', 'humidity', 'soilMoisture', 'light', 'system'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
  },
  threshold: {
    type: Number,
  },
  resolved: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Alert', alertSchema);