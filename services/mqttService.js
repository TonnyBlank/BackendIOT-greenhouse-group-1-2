const mqtt = require('mqtt');
const Actuator = require('../models/Actuator');
const Sensor = require('../models/Sensor');
const Device = require('../models/Device');
const logger = require('../utils/logger');

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on('connect', () => {
  logger.info('Connected to MQTT broker');
  
  // Subscribe to sensor data topic
  client.subscribe('greenhouse/sensor/data', (err) => {
    if (err) {
      logger.error('Error subscribing to sensor data topic');
    }
  });
  
  // Subscribe to actuator commands topic
  client.subscribe('greenhouse/actuator/command', (err) => {
    if (err) {
      logger.error('Error subscribing to actuator command topic');
    }
  });
});

client.on('message', async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    
    if (topic === 'greenhouse/sensor/data') {
      // Handle incoming sensor data
      const { deviceId, ...sensorData } = data;
      
      // Check if device exists
      const device = await Device.findOne({ deviceId });
      if (!device) {
        return logger.error(`Received data from unknown device: ${deviceId}`);
      }
      
      // Save sensor data to MongoDB
      const newSensorData = new Sensor({
        deviceId,
        ...sensorData
      });
      
      await newSensorData.save();
      logger.info(`Saved sensor data from ${deviceId}`);
      
    } else if (topic === 'greenhouse/actuator/command') {
      // Handle actuator state updates from device
      const { deviceId, ...actuatorState } = data;
      
      // Update actuator state in MongoDB
      await Actuator.findOneAndUpdate(
        { deviceId },
        { ...actuatorState, lastUpdated: new Date() },
        { upsert: true, new: true }
      );
      
      logger.info(`Updated actuator state for ${deviceId}`);
    }
  } catch (error) {
    logger.error(`Error processing MQTT message: ${error.message}`);
  }
});

// Publish actuator command to device
exports.publishActuatorCommand = (deviceId, command) => {
  try {
    const topic = `greenhouse/actuator/${deviceId}/command`;
    client.publish(topic, JSON.stringify(command));
    logger.info(`Published command to ${topic}`);
  } catch (error) {
    logger.error(`Error publishing MQTT command: ${error.message}`);
  }
};

module.exports = client;