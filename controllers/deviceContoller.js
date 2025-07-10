const Device = require('../models/Device');
const logger = require('../utils/logger');

// Register a new device
exports.registerDevice = async (req, res) => {
  try {
    const { deviceId, name, location, type } = req.body;
    const owner = req.userId;

    const device = new Device({
      deviceId,
      name,
      location,
      type,
      owner
    });

    await device.save();
    res.status(201).json(device);
  } catch (error) {
    logger.error(`Error registering device: ${error.message}`);
    res.status(500).json({ message: 'Error registering device' });
  }
};

// Get user's devices
exports.getUserDevices = async (req, res) => {
  try {
    const devices = await Device.find({ owner: req.userId });
    res.json(devices);
  } catch (error) {
    logger.error(`Error getting user devices: ${error.message}`);
    res.status(500).json({ message: 'Error getting devices' });
  }
};

// Update device thresholds
exports.updateDeviceThresholds = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { thresholdSettings } = req.body;

    const device = await Device.findOneAndUpdate(
      { deviceId, owner: req.userId },
      { thresholdSettings },
      { new: true }
    );

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.json(device);
  } catch (error) {
    logger.error(`Error updating device thresholds: ${error.message}`);
    res.status(500).json({ message: 'Error updating thresholds' });
  }
};

// Get device details
exports.getDeviceDetails = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const device = await Device.findOne({ deviceId, owner: req.userId });

    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.json(device);
  } catch (error) {
    logger.error(`Error getting device details: ${error.message}`);
    res.status(500).json({ message: 'Error getting device details' });
  }
};