const Actuator = require('../models/Actuator');
const logger = require('../utils/logger'); // Optional: if you don't have this, you can use console.log instead

// Get current actuator state
exports.getActuatorState = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const state = await Actuator.findOne({ deviceId });

    if (!state) {
      return res.status(404).json({ message: 'Actuator state not found' });
    }

    res.json(state);
  } catch (error) {
    logger?.error?.(`Error getting actuator state: ${error.message}`) || console.error(error);
    res.status(500).json({ message: 'Error getting actuator state' });
  }
};

// Update actuator state
exports.updateActuatorState = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { waterPump, fan, growLights, manualOverride } = req.body;

    let actuator = await Actuator.findOne({ deviceId });

    if (!actuator) {
      actuator = new Actuator({ deviceId });
    }

    if (waterPump !== undefined) actuator.waterPump = waterPump;
    if (fan !== undefined) actuator.fan = fan;
    if (growLights !== undefined) actuator.growLights = growLights;
    if (manualOverride !== undefined) actuator.manualOverride = manualOverride;

    actuator.lastUpdated = new Date();

    await actuator.save();

    // Here you could emit to an MQTT topic or socket if desired

    res.json({ message: 'Actuator updated', data: actuator });
  } catch (error) {
    logger?.error?.(`Error updating actuator state: ${error.message}`) || console.error(error);
    res.status(500).json({ message: 'Error updating actuator state' });
  }
};

// Get actuator history within a time window
exports.getActuatorHistory = async (req, res) => {
  try {
    const { deviceId, hours } = req.params;
    const timeAgo = new Date(Date.now() - hours * 60 * 60 * 1000);

    const history = await Actuator.find({
      deviceId,
      lastUpdated: { $gte: timeAgo }
    }).sort({ lastUpdated: 1 });

    res.json(history);
  } catch (error) {
    logger?.error?.(`Error getting actuator history: ${error.message}`) || console.error(error);
    res.status(500).json({ message: 'Error getting actuator history' });
  }
};
