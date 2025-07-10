const twilio = require('twilio');
const User = require('../models/User');
const logger = require('../utils/logger');

const twilioClient = process.env.TWILIO_SID ? 
  twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN) : null;

// Send notification based on user preferences
exports.sendNotification = async (deviceId, message) => {
  try {
    // Find device and then its owner
    const device = await Device.findOne({ deviceId }).populate('owner');
    if (!device || !device.owner) return;

    const user = device.owner;
    const { notificationPreferences, phone, email } = user;
    
    if (notificationPreferences.email && email) {
      await sendEmailNotification(email, message);
    }
    
    if (notificationPreferences.sms && phone && twilioClient) {
      await sendSmsNotification(phone, message);
    }
    
    logger.info(`Notifications sent for device ${deviceId}`);
  } catch (error) {
    logger.error(`Error sending notifications: ${error.message}`);
  }
};

async function sendEmailNotification(email, message) {
  // Implement email sending logic (using Nodemailer, etc.)
  logger.info(`Email notification sent to ${email}: ${message}`);
}

async function sendSmsNotification(phone, message) {
  try {
    await twilioClient.messages.create({
      body: `Greenhouse Alert: ${message}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    logger.info(`SMS sent to ${phone}`);
  } catch (error) {
    logger.error(`Error sending SMS: ${error.message}`);
  }
}