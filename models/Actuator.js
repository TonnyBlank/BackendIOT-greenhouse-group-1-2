const mongoose = require('mongoose');

const actuatorSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  waterPump: {
    type: Boolean,
    default: false,
  },
  fan: {
    type: Boolean,
    default: false,
  },
  growLights: {
    type: Boolean,
    default: false,
  },
  manualOverride: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Actuator', actuatorSchema);