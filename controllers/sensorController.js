// controllers/sensorController.js

const Sensor = require('../models/Sensor');

// Handler to store sensor data
const storeSensorData = async (req, res) => {
  try {
    const {
      deviceId,
      temeperature,
      humudity,
      soilMoisture,
      lightIntensity,
      batteryLeve
    } = req.body;

    if (
      !deviceId ||
      !temeperature ||
      !humudity ||
      !soilMoisture ||
      !lightIntensity ||
      !batteryLeve
    ) {
      return res.status(422).json({ message: 'Fill in all fields' });
    }

    const newData = await Sensor.create({
      deviceId,
      temeperature,
      humudity,
      soilMoisture,
      lightIntensity,
      batteryLeve
    });

    res.status(201).json({
      message: 'Sensor data stored successfully',
      data: newData
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Placeholder for other handlers
const getLatestSensorData = (req, res) => {
  res.send('Latest sensor data endpoint');
};

const getSensorHistory = (req, res) => {
  res.send('Sensor history endpoint');
};

// ✅ Export all handlers
module.exports = {
  storeSensorData,
  getLatestSensorData,
  getSensorHistory
};
